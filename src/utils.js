import {RatingEnum} from './const';

export const ratingFormat = (rating) => {
  return rating.toString().split(`.`).join(`,`);
};

export const getRatingString = (rating) => {
  const calcRating = Math.round(rating);

  switch (calcRating) {
    case 0:
    case 1:
    case 2:
      return RatingEnum.BAD;
    case 3:
    case 4:
      return RatingEnum.NORMAL;
    case 5:
    case 6:
    case 7:
      return RatingEnum.GOOD;
    case 8:
    case 9:
      return RatingEnum.VERY_GOOD;
    case 10:
      return RatingEnum.AWESOME;
    default:
      return `No rating`;
  }
};

export const timeFormat = (minutes) => {
  const hour = Math.floor(minutes / 60);
  const min = minutes - hour * 60;

  if (minutes < 60) {
    return `${minutes}m`;
  } else {
    return `${hour}h ${min}m`;
  }
};

export const dateFormat = (date) => {
  const formatter = new Intl.DateTimeFormat(`en-US`, {
    month: `long`,
    day: `2-digit`,
    year: `numeric`,
  });

  return formatter.format(new Date(date));
};

export const timeLeftFormat = (progress, duration) => {
  const current = duration - progress;
  const hour = `${Math.floor(current / 3600)}`.padStart(2, `0`);
  const min = `${Math.floor(current / 60) - (hour * 60)}`.padStart(2, `0`);
  const seconds = `${Math.floor(current % 60)}`.padStart(2, `0`);

  return `${hour}:${min}:${seconds}`;
};
