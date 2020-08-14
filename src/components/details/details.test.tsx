import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Details from './details';

const film = {
  "name": `Once Upon a Time in America`,
  "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
  "background_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/ones_upon_a_time_in_america.jpg`,
  "background_color": `#CBAC79`,
  "description": `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
  "rating": 9.9,
  "scores_count": 276395,
  "director": `Sergio Leone`,
  "starring": [
    `Robert De Niro`,
    `James Woods`,
    `Elizabeth McGovern`
  ],
  "run_time": 229,
  "genre": `Crime`,
  "released": 1984,
  "id": 1,
  "is_favorite": false,
  "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
}

describe(`Details`, () => {
  it(`Details rendered correctly`, () => {
    const tree = renderer.create(
        <Details film={film}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
