import * as React from 'react';

import Overview from '../overview/overview';
import Details from '../details/details';
import ReviewList from '../review-list/review-list';
import {Film, Review, TabsEnum} from '../../types';

interface Props {
  film: Film,
  reviews: Array<Review>,
  activeTab: TabsEnum,
  onClickTab: (tab: TabsEnum) => void,
}

const Tabs: React.FC<Props> = ({film, reviews, activeTab, onClickTab}) => {
  const renderTab = (tab) => {
    switch (tab) {
      case TabsEnum.OVERVIEW:
        return <Overview film={film}/>;
      case TabsEnum.DETAILS:
        return <Details film={film}/>;
      case TabsEnum.REVIEWS:
        return <ReviewList reviews={reviews}/>;
      default:
        return null;
    }
  };

  return (
    <>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item${activeTab === TabsEnum.OVERVIEW ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onClickTab(TabsEnum.OVERVIEW);
              }}
            >Overview</a>
          </li>
          <li className={`movie-nav__item${activeTab === TabsEnum.DETAILS ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onClickTab(TabsEnum.DETAILS);
              }}
            >Details</a>
          </li>
          <li className={`movie-nav__item${activeTab === TabsEnum.REVIEWS ? ` movie-nav__item--active` : ``}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                onClickTab(TabsEnum.REVIEWS);
              }}
            >Reviews</a>
          </li>
        </ul>
      </nav>

      {renderTab(activeTab)}
    </>
  );
};

export default Tabs;
