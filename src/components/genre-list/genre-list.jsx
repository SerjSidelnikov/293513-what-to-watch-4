import React from 'react';
import PropTypes from 'prop-types';

const GenreList = ({genres, activeGenre, onChangeGenre}) => {
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

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeGenre: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
};

export default GenreList;
