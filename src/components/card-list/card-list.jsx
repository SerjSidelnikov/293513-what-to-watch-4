import React from 'react';
import PropTypes from 'prop-types';

import Card from '../card/card';

class CardList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeFilm: null,
    };

    this._handleActiveFilm = this._handleActiveFilm.bind(this);
  }

  _handleActiveFilm(film) {
    this.setState({
      activeFilm: film,
    });
  }

  render() {
    const {films, onCardTitleClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <Card
            key={film.id}
            film={film}
            onActiveFilm={this._handleActiveFilm}
            onCardTitleClick={onCardTitleClick}
          />
        ))}
      </div>
    );
  }
}

CardList.propTypes = {
  films: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};

export default CardList;
