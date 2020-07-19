const initialState = {
  reviews: [],
  isLoading: true,
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
        isLoading: false,
      });

    default:
      return state;
  }
};

const Operation = {
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadReviews(response.data));
      });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
