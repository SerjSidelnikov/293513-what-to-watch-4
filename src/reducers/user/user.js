import {AuthorizationStatus, Errors} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  error: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  ERROR: `ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),

  getError: () => ({
    type: ActionType.ERROR,
    payload: true,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.ERROR:
      return Object.assign({}, state, {
        error: action.payload,
      });

    default:
      return state;
  }
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    }).then(() => {
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    }).catch((err) => {
      if (err.message === Errors.BAD_REQUEST) {
        dispatch(ActionCreator.getError());
      }
    });
  }
};

export {
  reducer,
  ActionCreator,
  ActionType,
  Operation,
};
