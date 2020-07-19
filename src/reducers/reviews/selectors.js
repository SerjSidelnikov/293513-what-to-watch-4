import NameSpace from '../name-space';

const NAME_SPACE = NameSpace.REVIEWS;

export const getReviews = (state) => {
  return state[NAME_SPACE].reviews;
};

export const getIsLoadingReviews = (state) => {
  return state[NAME_SPACE].isLoading;
};
