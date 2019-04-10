import React from 'react';
import PropTypes from 'prop-types';

const speakers = ({
  presenters
}) => (
  <article id="event-details__speakers" className="event-details__speakers">
    <h6>Speakers</h6>
    <div className="event-details__speakers__content">
      {presenters.map((partner, index) => (
        <div key={index}>
          <img src={partner.img}></img>
          <h6>{partner.name}</h6>
          <p>{partner.about}</p>
        </div>
      ))}
    </div>
  </article>
);

speakers.propTypes = {
  presenters: PropTypes.arrayOf( 
    PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
      about: PropTypes.string
    })
  )
}

speakers.defaultProps = {
  presenters: [
    {
      img: '',
      name: '',
      about: ''
    }
  ]
}

export default speakers;