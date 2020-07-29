import React from 'react';
import renderer from 'react-test-renderer';

import Player from './player';

const MockComponent = () => <div/>;
const history = {
  goBack: () => {}
};

describe(`Player`, () => {
  it(`Player rendered correctly`, () => {
    const tree = renderer.create(
        <Player
          isPlaying={false}
          onTogglePlaying={() => {}}
          progress={0}
          duration={0}
          name={``}
          onChangeFullScreen={() => {}}
          history={history}
        >
          <MockComponent/>
        </Player>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
