import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class Dismissible extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.registerEscPressHandler();
    this.registerClickHandler();
  }

  registerClickHandler() {
    window.addEventListener('click', this.handleClick);
  }

  registerEscPressHandler() {
    const { isEscape } = this.props;
    if (isEscape) {
      window.addEventListener('keyup', this.handleEscPress);
    }
  }

  componentWillUnmount() {
    this.removeEscPressHandler();
    this.removeClickHandler();
  }

  removeClickHandler() {
    window.removeEventListener('click', this.handleClick);
  }

  handleClick = e => {
    e.stopPropagation();
    if (this.clickedOutside(e.target)) {
      this.props.onDismiss();
    }
  }

  clickedOutside(target) {
    const domNode = ReactDOM.findDOMNode(this);
    return !domNode || !domNode.contains(target);
  }


  removeEscPressHandler() {
    const { isEscape } = this.props;
    if (isEscape) {
      window.removeEventListener('keyup', this.handleEscPress);
    }
  }

  handleEscPress = e => {
    if (e.key === 'Escape') {
      this.props.onDismiss();
    }
  }

  render() {
    return <div ref={this.ref} className="dismissible-wrapper">{this.props.children}</div>
  }
}

Dismissible.propTypes = {
  isEscape: PropTypes.bool,
  target: PropTypes.instanceOf(PropTypes.HTMLElement),
  context: PropTypes.oneOfType([
    PropTypes.instanceOf(PropTypes.element),
    PropTypes.shape({
      current: PropTypes.instanceOf(PropTypes.element)
    })
  ]),
  children: PropTypes.node.isRequired,
  onDismiss: PropTypes.func.isRequired
}

Dismissible.defaultProps = {
  isEscape: true
}

export default Dismissible;
