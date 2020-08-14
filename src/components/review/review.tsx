import * as React from 'react';

import {Review} from '../../types';
import {ratingFormat, dateFormat} from '../../utils';

interface Props {
  review: Review,
}

const Review: React.FC<Props> = ({review}) => {
  const {user, date, comment, rating} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}r</cite>
          <time className="review__date" dateTime="2016-12-24">{dateFormat(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{ratingFormat(rating)}</div>
    </div>
  );
};

export default Review;
