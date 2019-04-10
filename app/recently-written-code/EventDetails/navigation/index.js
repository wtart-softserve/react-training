import React from 'react';
import NavElement from './navElement';
import { SECTIONS } from '../config';

const eventDetailsNavigation = ({
  activeSection,
  activateSection
}) => {
  return (
    <nav className="event-details__nav">
      <ul>
        <NavElement
          activeSection={activeSection}
          activateSection={activateSection}
          section={ SECTIONS.LOCATION }
          text="LOCATION"
        />
        <NavElement
          activeSection={activeSection}
          activateSection={activateSection}
          section={ SECTIONS.DESCRIPTION }
          text="DESCRIPTION"
        />
        <NavElement
          activeSection={activeSection}
          activateSection={activateSection}
          section={ SECTIONS.SPEAKERS }
          text="SPEAKERS"
        />
        <NavElement
          activeSection={activeSection}
          activateSection={activateSection}
          section={ SECTIONS.REGISTRATION }
          text="REGISTRATION"
        />
      </ul>
    </nav>
  );
};

export default eventDetailsNavigation;