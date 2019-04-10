import React from 'react';
import cx from 'classnames';
import { SECTIONS } from '../config';

const navElement = ({
  activeSection,
  section,
  activateSection,
  text
}) => {
  return (
    <li 
      onClick={ () => activateSection(section) }
    >
     <a 
        href={`#event-details__${SECTIONS[section].toLowerCase()}`}
        className={cx({'active': isActive(section)})}
      >
      { text }
     </a>
    </li>
  );

  function isActive() {
    return section === activeSection;
  }
};

export default navElement;