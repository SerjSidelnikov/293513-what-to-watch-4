import {ratingEnum} from './const';

export const getRating = (rating) => {
  const calcRating = Math.round(rating);

  switch (calcRating) {
    case 0:
    case 1:
    case 2:
      return ratingEnum.BAD;
    case 3:
    case 4:
      return ratingEnum.NORMAL;
    case 5:
    case 6:
    case 7:
      return ratingEnum.GOOD;
    case 8:
    case 9:
      return ratingEnum.VERY_GOOD;
    case 10:
      return ratingEnum.AWESOME;
    default:
      return `No review`;
  }
};
