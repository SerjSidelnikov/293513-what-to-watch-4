import React from 'react';
import renderer from 'react-test-renderer';

import VideoPlayer from './video-player';
import {film} from '../../mocks/testMocks';

describe(`VideoPlayer`, () => {
  it(`VideoPlayer rendered correctly`, () => {
    const {preview, poster} = film;

    const tree = renderer.create(
        <VideoPlayer
          src={preview}
          poster={poster}
          isPlaying={false}
          muted={true}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
