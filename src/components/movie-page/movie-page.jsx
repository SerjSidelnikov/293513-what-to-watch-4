import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Logo from '../logo/logo';
import UserBlock from '../../user-block/user-block';
import Tabs from '../tabs/tabs';
import CardList from '../card-list/card-list';
import {filmType, reviewType} from '../../types';
import {AppRoute, AuthorizationStatus, MORE_LIKE_FILMS} from '../../const';
import withTabs from '../../hocs/with-tabs/with-tabs';
import {getFilms} from '../../reducers/data/selectors';
import {getIsLoadingReviews, getReviews} from '../../reducers/reviews/selectors';
import {Operation as ReviewOperation} from '../../reducers/reviews/reviews';
import {Operation as DataOperation} from '../../reducers/data/data';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import Footer from '../footer/footer';

const TabsWrapped = withTabs(Tabs);

class MoviePage extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    const {loadReviews, match} = this.props;
    loadReviews(match.params.id);
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    const {loadReviews} = this.props;

    if (id !== prevProps.match.params.id) {
      window.scrollTo(0, 0);
      loadReviews(id);
    }
  }

  render() {
    const {films, reviews, match, isLoadingReviews, authorizationStatus, toggleIsFavorite} = this.props;
    const id = parseInt(match.params.id, 10);

    if (isLoadingReviews) {
      return null;
    }

    const film = films.find((it) => it.id === id);
    const {name, genre, released, 'background_image': background, 'poster_image': poster, 'is_favorite': isFavorite} = film;

    const filteredFilms = films
      .filter((filmItem) => filmItem.genre === genre)
      .slice(0, MORE_LIKE_FILMS);

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={background} alt={name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <Logo/>
              <UserBlock/>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{released}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    to={`${AppRoute.PLAYER}/${id}`}
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </Link>
                  {authorizationStatus === AuthorizationStatus.AUTH && (
                    <>
                      <button
                        className="btn btn--list movie-card__button"
                        type="button"
                        onClick={() => toggleIsFavorite(film.id, Number(!isFavorite))}
                      >
                        {isFavorite
                          ? (
                            <svg viewBox="0 0 18 14" width="18" height="14">
                              <use xlinkHref="#in-list"/>
                            </svg>
                          )
                          : (
                            <svg viewBox="0 0 19 20" width="19" height="20">
                              <use xlinkHref="#add"/>
                            </svg>
                          )
                        }
                        <span>My list</span>
                      </button>
                      <Link to={`${AppRoute.FILMS}/${id}/review`} className="btn movie-card__button">Add review</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  src={poster}
                  alt={name}
                  width="218"
                  height="327"
                />
              </div>

              <div className="movie-card__desc">
                <TabsWrapped film={film} reviews={reviews}/>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <CardList films={filteredFilms}/>
          </section>

          <Footer/>
        </div>
      </>
    );
  }
}

MoviePage.propTypes = {
  films: PropTypes.arrayOf(filmType).isRequired,
  reviews: PropTypes.arrayOf(reviewType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired
  }).isRequired,
  loadReviews: PropTypes.func.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  toggleIsFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  reviews: getReviews(state),
  isLoadingReviews: getIsLoadingReviews(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => {
    dispatch(ReviewOperation.loadReviews(id));
  },
  toggleIsFavorite: (id, status) => {
    dispatch(DataOperation.toggleIsFavorite(id, status));
  }
});

export {MoviePage};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
