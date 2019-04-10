import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const location = ({
  address,
  category: { name: categoryName},
  city: { name: cityName },
  country: { name: countryName },
  location,
  eventDate: { start: startDate},
  thumbnail,
  title
}) => (
  <article id="event-details__location" className="event-details__location">
    <header className="event-details__location__header">
      <h1>{cityName}</h1>
      <h1>{categoryName}</h1>
    </header>
    <div style={
        {
          backgroundImage: `url(${thumbnail})`
        }
      } className="event-details__location__content">
        <div>
          <p>SART: {moment(startDate).format('HH:MM A')}</p>
          <p>DATE: {moment(startDate).format('DD/MM/YYYY')}</p>
        </div>
    </div>

    <h1>{title}</h1>

    <div style={
        {
          backgroundImage: `url(${location})`
        }
      } className="event-details__location__content">
        <p>{`${countryName}, ${cityName}, ${address}`}</p>
    </div>
  </article>
);

location.propTypes = {
  address: PropTypes.string,
  categoryName: PropTypes.string,
  cityName: PropTypes.string,
  countryName: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]), //TODO: this probably should be date
  thumbnail: PropTypes.string,
  title: PropTypes.string
}

location.defaultProps = {
  address: '985 GLEASON COMMON',
  categoryName: '',
  cityName: '',
  countryName: '',
  location: '',
  startDate: '',
  thumbnail: '',
  title: ''
}

export default location;