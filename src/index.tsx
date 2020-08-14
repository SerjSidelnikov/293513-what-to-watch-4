import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/app/app';
import reducer from './reducers/reducer';
import {createApi} from './api';
import {ActionCreator} from './reducers/user/user';
import {Operation as UserOperation} from './reducers/user/user';
import {Operation as DataOperation} from './reducers/data/data';
import {AuthorizationStatus} from './types';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
    )
);

store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadPromoFilms());
store.dispatch(DataOperation.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
