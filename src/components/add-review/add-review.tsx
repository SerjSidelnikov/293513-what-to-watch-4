import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';

import {AppRoute, COUNT_RATING, MAX_LENGTH_COMMENT, MIN_LENGTH_COMMENT, Status} from '../../const';
import {filmType} from '../../types';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

const AddReview = (props) => {
  const {film, id, statusTransfer, rating, comment, onChange, onSubmitReview} = props;
  const {name, 'background_image': background, 'poster_image': poster} = film;
  const ratings = new Array(COUNT_RATING).fill(``);

  if (statusTransfer === Status.SUCCESS) {
    return <Redirect to={`${AppRoute.FILMS}/${id}`}/>;
  }

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={background} alt={name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILMS}/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img
            src={poster}
            alt={name}
            width="218"
            height="327"
          />
        </div>
      </div>

      <div className="add-review">
        <form onSubmit={onSubmitReview} className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {ratings.map((it, i) => (
                <React.Fragment key={`rating-${i}`}>
                  <input
                    onChange={onChange}
                    className="rating__input"
                    id={`star-${i + 1}`}
                    type="radio"
                    name="rating"
                    value={i + 1}
                    checked={i + 1 === rating}
                  />
                  <label className="rating__label" htmlFor={`star-${i + 1}`}>Rating {i + 1}</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="comment"
              id="review-text"
              placeholder="Review text"
              value={comment}
              minLength={50}
              maxLength={400}
              spellCheck={true}
              onChange={onChange}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={comment.length < MIN_LENGTH_COMMENT || comment.length > MAX_LENGTH_COMMENT}
              >Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

AddReview.propTypes = {
  film: filmType,
  id: PropTypes.number,
  statusTransfer: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
};

export default AddReview;
