import * as React from 'react';

import ReviewItem from '../review/review';
import {Review} from '../../types';

interface Props {
  reviews: Array<Review>,
}

const ReviewList: React.FC<Props> = ({reviews}) => {
  const middle = Math.round(reviews.length / 2);
  const leftCol = reviews.slice(0, middle);
  const rightCol = reviews.slice(middle);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {leftCol.map((review) => (
          <ReviewItem key={review.id} review={review}/>
        ))}
      </div>
      <div className="movie-card__reviews-col">
        {rightCol.map((review) => (
          <ReviewItem key={review.id} review={review}/>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
