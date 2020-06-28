import React from 'react';

import {reviewType} from '../../types';
import {ratingFormat} from '../../utils';

const Review = ({review}) => {
  const {author, date, description, rating} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{description}</p>

        <footer className="review__details">
          <cite className="review__author">{author}r</cite>
          <time className="review__date" dateTime="2016-12-24">{date}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ratingFormat(rating)}</div>
    </div>
  );
};

Review.propTypes = {
  review: reviewType,
};

export default Review;
