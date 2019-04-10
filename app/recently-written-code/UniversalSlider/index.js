import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button';
import { UniversalSliderUI } from './universalSliderUI';

class UniversalSlider extends Component {
	constructor(props) {
    super(props);
    this.UI = new UniversalSliderUI(this.props.slides, this.props.displaySize);

    this.state = {
      activeSlides: this.UI.getActiveSlides()
    }

    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.handleMoveForward = this.handleMoveForward.bind(this);
    this.handleMoveBack = this.handleMoveBack.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  render() {
		return (
			<section className="universal-slider">
        <Button 
          iconClass="chevron-left-icon"
          modifier="btn--slider"
          className="universal-slider__navigation-left"
          action={this.handleMoveBack}
        />
        <Button
          iconClass="chevron-right-icon"
          modifier="btn--slider"
          className="universal-slider__navigation-right" 
          arria-hidden="true"
          action={this.handleMoveForward}
        />
				{ this.renderActiveSlides() }
        { this.renderInactiveSlidesNumber() }
			</section>
		);
  }
  
  renderActiveSlides() {
    const { activeSlides } = this.state;
    return activeSlides.map((slide,index) => (
      <div 
        key={index} 
        className={cx({
          'universal-slider__item': true,
          'universal-slider__item--active': !index
        })}
        onClick={() => this.handleSlideClick(slide)}
        onTouchStart={(event) => !index && this.handleTouchStart(event)}
        onTouchMove={(event) => !index && this.handleTouchMove(event)}
        onTouchEnd={(event) => !index && this.handleTouchEnd()}
      >
        {slide}
      </div>
    ));
  }

  handleSlideClick(slide) {
    const activeSlides = this.UI.makeSlideActive(slide);
    this.setState({ activeSlides });
  }

  renderInactiveSlidesNumber() {
    return !this.UI.showInactiveSlidesNumber
      ? null
      : (
        <div className="universal-slider__item universal-slider__item--inactive-number">
          <p>+{this.UI.inactiveSlidesNumber}</p>
        </div>
      );
  }

  handleTouchStart(event) {
    this.UI.setTouchPositionsInitials(event);
  }

  handleTouchMove(event) {
    this.UI.setTouchPositionsDifferences(event);
  }

  handleTouchEnd() {
    if (this.UI.isHorizontalSwipe()) {
      if (this.UI.isSwipeLeft()) {
        this.handleMoveForward();
      } else {
        this.handleMoveBack();
      }
    }
  }

  handleMoveForward() {
    const activeSlides = this.UI.getSlidesAfterMoveForward(...this.state.activeSlides);
    this.setState({ activeSlides });
  }

  handleMoveBack() {
    const activeSlides = this.UI.getSlidesAfterMoveBack(...this.state.activeSlides);
    this.setState({ activeSlides });
  }
}

UniversalSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element).isRequired,
  displaySize: PropTypes.number
}

UniversalSlider.defaultProps = {
  displaySize: 4
};

export default UniversalSlider;
