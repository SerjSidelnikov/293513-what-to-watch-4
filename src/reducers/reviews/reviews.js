import {Status} from '../../const';

const initialState = {
  reviews: [],
  isLoading: true,
  statusTransfer: Status.PENDING,
};

const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  TRANSFER_REVIEW: `TRANSFER_REVIEW`,
};

const ActionCreator = {
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  addReview: (status) => ({
    type: ActionType.TRANSFER_REVIEW,
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
        isLoading: false,
      });

    case ActionType.TRANSFER_REVIEW:
      return Object.assign({}, state, {
        statusTransfer: action.payload,
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
  addReview: (id, formData) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, formData)
      .then(() => {
        dispatch(ActionCreator.addReview(Status.SUCCESS));
      })
      .catch((err) => {
        dispatch(ActionCreator.addReview(Status.ERROR));
        throw err;
      });
  },
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
