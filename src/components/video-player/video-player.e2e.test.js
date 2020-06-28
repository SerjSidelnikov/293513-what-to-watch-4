import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import VideoPlayer from './video-player';
import {film} from '../../mocks/testMocks';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`VideoPlayer`, () => {
  it(`The component has a playback state`, () => {
    const {preview, poster} = film;

    const videoPlayer = mount(
        <VideoPlayer
          src={preview}
          poster={poster}
          isPlaying={true}
          muted={true}
        />
    );

    const state = videoPlayer.state(`isPlaying`);

    expect(state).toBe(true);
  });

  it(`The component has a pause state`, () => {
    const {preview, poster} = film;

    const videoPlayer = mount(
        <VideoPlayer
          src={preview}
          poster={poster}
          isPlaying={false}
          muted={true}
        />
    );

    const state = videoPlayer.state(`isPlaying`);

    expect(state).toBe(false);
  });
});
