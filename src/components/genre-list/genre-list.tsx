import * as React from 'react';

interface Props {
  genres: Array<string>,
  activeGenre: string,
  onChangeGenre: (genre: string) => void,
}

const GenreList: React.FC<Props> = ({genres, activeGenre, onChangeGenre}) => {
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li
          key={`${genre}-${index}`}
          className={`catalog__genres-item${(activeGenre === genre) ? ` catalog__genres-item--active` : ``}`}
        >
          <a
            href="#"
            className="catalog__genres-link"
            onClick={(evt) => {
              evt.preventDefault();
              onChangeGenre(genre);
            }}
          >{genre}</a>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
