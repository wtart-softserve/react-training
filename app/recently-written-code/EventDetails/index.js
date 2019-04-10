import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventDetailsNavigation from './navigation';
import Location from './location';
import Description from './description';
import Speakers from './speakers';
import Registration from './registration';
import { exampleEvent, SECTIONS, SCROLL_ACTIVATION_OFFSET } from './config';

class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: SECTIONS.LOCATION 
    }
    this.scrollElements = {
      sideNavLinks: [],
      content: undefined
    }
  }

  componentDidMount() {
    this.registerScrollListener();
  }

  registerScrollListener() {
    this.scrollElements.sideNavLinks = document.querySelectorAll(".event-details nav ul li a");
    this.scrollElements.content = document.querySelectorAll(".event-details__content")[0];
    this.scrollElements.content.addEventListener('scroll', this.activateSectionOnScroll);
  }

  componentWillUnmount() {
    this.removeScrollListener();
  }

  removeScrollListener() {
    const { content } = this.scrollElements;
    content.removeEventListener('scroll', this.activateSectionOnScroll);
  }

  activateSectionOnScroll = () => {
    const { content, sideNavLinks } = this.scrollElements;
    const fromTop = content.scrollTop + SCROLL_ACTIVATION_OFFSET;

    sideNavLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (this.isScrolledOverSection(section, fromTop)) {
        this.activateSection(this.mapIdToSectionsKey(link.hash));
      }
    });
  }

  isScrolledOverSection(section, fromTop) {
    return section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
  }

  mapIdToSectionsKey(linkHash) {
    return SECTIONS[linkHash.split('#event-details__')[1].toUpperCase()];
  }

  render() {
    const { activeSection } = this.state;
    const { event } = this.props;
    return (
      <section className="event-details">
        <EventDetailsNavigation 
          activeSection={activeSection} 
          activateSection={this.activateSection}
        />
        <section className="event-details__content">
          <Location {...event} />
          <Description {...event} />
          <Speakers {...event} />
          <Registration {...event} />
        </section>
      </section>
    ); 
  }

  activateSection = (activeSection) => {
    this.setState({ activeSection });
  }
}

EventDetails.propTypes = {
  event: PropTypes.object
}

EventDetails.defaultProps = {
  event: exampleEvent
}

export default EventDetails;