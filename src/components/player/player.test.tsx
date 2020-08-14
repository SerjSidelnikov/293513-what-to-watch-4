import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Player from './player';

const MockComponent = () => <div/>;
const history = {
  goBack: () => {}
};
const noop = () => {};

describe(`Player`, () => {
  it(`Player rendered correctly`, () => {
    const tree = renderer.create(
        <Player
          isPlaying={false}
          onTogglePlaying={noop}
          progress={0}
          duration={0}
          name={``}
          onChangeFullScreen={noop}
          history={history}
        >
          <MockComponent/>
        </Player>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
