import React from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory} from 'react-router-dom';

const Card = (props) => {
  const {id, name, onMouseEnter, onMouseLeave, children} = props;
  const history = useHistory();

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        history.push(`/films/${id}`);
      }}
    >
      <div className="small-movie-card__image">
        {children}
      </div>
      <h3 className="small-movie-card__title">
        <Link
          to={`/films/${id}`}
          className="small-movie-card__link"
        >{name}</Link>
      </h3>
    </article>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
