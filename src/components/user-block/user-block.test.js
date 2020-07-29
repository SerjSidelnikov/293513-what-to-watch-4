import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';

import UserBlock from './user-block';
import NameSpace from '../../reducers/name-space';
import {AuthorizationStatus} from '../../const';

const mockStore = configureStore([]);

describe(`UserBlock`, () => {
  it(`UserBlock rendered correctly (User is logged in)`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <UserBlock/>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`UserBlock rendered correctly (User is not logged in)`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <UserBlock/>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
