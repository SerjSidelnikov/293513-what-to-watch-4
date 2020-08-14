import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';

import {AppRoute} from '../../const';

interface Props {
  id: number,
  name: string,
  onMouseEnter: () => void,
  onMouseLeave: () => void,
}

const Card: React.FC<Props> = (props) => {
  const {id, name, onMouseEnter, onMouseLeave, children} = props;
  const history = useHistory();

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        history.push(`${AppRoute.FILMS}/${id}`);
      }}
    >
      <div className="small-movie-card__image">
        {children}
      </div>
      <h3 className="small-movie-card__title">
        <Link
          to={`${AppRoute.FILMS}/${id}`}
          className="small-movie-card__link"
        >{name}</Link>
      </h3>
    </article>
  );
};

export default Card;
