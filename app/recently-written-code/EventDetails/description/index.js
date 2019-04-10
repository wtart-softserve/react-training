import React from 'react';
import PropTypes from 'prop-types';

const description = ({ content }) => (
  <article id="event-details__description" className="event-details__description">
    <h6>About</h6>
    <p>{content}</p>
  </article>
);

description.propTypes = {
  content: PropTypes.string
};

description.defaultProps = {
  content: ''
};

export default description;