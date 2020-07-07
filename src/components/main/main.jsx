import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Header from '../header/header';
import CardList from '../card-list/card-list';
import GenreList from '../genre-list/genre-list';
import ButtonShowMore from '../button-show-more/button-show-more';
import {ActionCreator} from '../../reducers/reducer';

class Main extends React.PureComponent {
  componentDidMount() {
    this.props.onLoadFilms();
  }

  render() {
    const {
      promoItem,
      films,
      genres,
      isMoreFilms,
      currentGenre,
      onChangeGenre,
      onShowMore,
    } = this.props;
    const {title, genre, releaseDate} = promoItem;

    return (
      <>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img
                  src="img/the-grand-budapest-hotel-poster.jpg"
                  alt="The Grand Budapest Hotel poster"
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`/player`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenreList
              genres={genres}
              activeGenre={currentGenre}
              onChangeGenre={onChangeGenre}
            />

            <CardList films={films}/>

            {isMoreFilms && <ButtonShowMore onShowMore={onShowMore}/>}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  }
}

Main.propTypes = {
  promoItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  onLoadFilms: PropTypes.func.isRequired,
  onShowMore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) =>({
  films: state.chunkFilms,
  currentGenre: state.currentGenre,
  genres: state.genres,
  promoItem: state.promoItem,
  isMoreFilms: state.isMoreFilms,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre: (genre) => {
    dispatch(ActionCreator.changeGenreFilter(genre));
    dispatch(ActionCreator.getFilteredFilms(genre));
    dispatch(ActionCreator.loadFilms());
  },

  onLoadFilms: () => dispatch(ActionCreator.loadFilms()),
  onShowMore: () => dispatch(ActionCreator.showMore()),
});

export {Main};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
