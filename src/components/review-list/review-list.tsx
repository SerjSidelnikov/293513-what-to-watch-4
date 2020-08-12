import React from 'react';
import PropTypes from 'prop-types';

import Review from '../review/review';
import {reviewType} from '../../types';

const ReviewList = ({reviews}) => {
  const middle = Math.round(reviews.length / 2);
  const leftCol = reviews.slice(0, middle);
  const rightCol = reviews.slice(middle);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftCol.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </div>
      <div className="movie-card__reviews-col">
        {rightCol.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(reviewType),
};

export default ReviewList;
