import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import Header from './header';
import NameSpace from '../../reducers/name-space';
import {AuthorizationStatus} from '../../const';

const mockStore = configureStore([]);

describe(`Header`, () => {
  it(`Header rendered correctly`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <Header/>
          </BrowserRouter>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
