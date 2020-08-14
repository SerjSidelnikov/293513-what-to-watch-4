import * as React from 'react';

import Card from '../card/card';
import withCard from '../../hocs/with-card/with-card';
import withVideo from '../../hocs/with-video/with-video';
import {Film} from '../../types';

interface Props {
  films: Array<Film>,
}

const CardWrapped = withCard(withVideo(Card));

const CardList: React.FC<Props> = ({films}) => {
  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <CardWrapped
          key={film.id}
          id={film.id}
          name={film.name}
          src={film[`preview_video_link`]}
          poster={film[`preview_image`]}
          muted={true}
        />
      ))}
    </div>
  );
};

export default CardList;
