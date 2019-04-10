import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from '../../../shared/Button';

const registration = ({
  category: { name: categoryName},
  content,
  eventDate: { start },
  title,
}) => (
  <article id="event-details__registration" className="event-details__registration">
    <header className="event-details__registration__header">
      <h1 className="event-details__registration__title">{title}</h1>
      <div className="event-details__registration__dates">
      <p>SART: {moment(start).format('HH:MM A')}</p>
          <p>DATE: {moment(start).format('DD/MM/YYYY')}</p>
      </div>
      <p className="event-details__registration__category">{categoryName}</p>
    </header>
    <p>{content}</p>
    <Button 
      text="REGISTER"
      modifier="btn--red-small"
    />
  </article>
);

registration.propTypes = {
  categoryName: PropTypes.string,
  content: PropTypes.string,
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  title: PropTypes.string
}

registration.defaultProps = {
  categoryName: '',
  content: '',
  start: '',
  title: ''
}

export default registration;