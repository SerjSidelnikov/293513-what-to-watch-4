import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import * as renderer from 'react-test-renderer';

import {SignIn} from './sign-in';
import NameSpace from '../../reducers/name-space';

const mockStore = configureStore([]);
const noop = () => {};

describe(`SignIn`, () => {
  it(`SignIn rendered correctly`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        error: false,
      },
    });

    const tree = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn onSubmit={noop} error={false}/>
          </BrowserRouter>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
