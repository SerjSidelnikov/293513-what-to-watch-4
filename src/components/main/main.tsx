import * as React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import withCatalog from '../../hocs/with-catalog/with-catalog';
import {Film, AuthorizationStatus} from '../../types';
import {AppRoute} from '../../const';

const CatalogWrapped = withCatalog(Catalog);

interface Props {
  promoFilm: Film,
  authorizationStatus: AuthorizationStatus,
  toggleIsFavorite: (id: number, status: number) => void,
}

const Main: React.FC<Props> = ({promoFilm, authorizationStatus, toggleIsFavorite}) => {
  const isFavorite = promoFilm[`is_favorite`];

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoFilm[`background_image`]} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo/>
          <UserBlock/>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={promoFilm[`poster_image`]}
                alt={promoFilm.name}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`${AppRoute.PLAYER}/${promoFilm.id}`} className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                {authorizationStatus === AuthorizationStatus.AUTH && (
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={() => toggleIsFavorite(promoFilm.id, Number(!isFavorite))}
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <CatalogWrapped/>

        <Footer/>
      </div>
    </>
  );
};

export default Main;
