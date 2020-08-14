import * as React from 'react';
import {connect} from 'react-redux';

import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import CardList from '../card-list/card-list';
import Footer from '../footer/footer';
import {getFavoriteFilms} from '../../reducers/data/selectors';
import {Operation} from '../../reducers/data/data';
import {Film} from '../../types';

interface Props {
  loadFavoriteFilms: () => void,
  films: Array<Film>,
}

class MyList extends React.PureComponent<Props, null> {
  componentDidMount() {
    const {loadFavoriteFilms} = this.props;
    loadFavoriteFilms();
  }

  render() {
    let {films} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>

          <h1 className="page-title user-page__title">My list</h1>

          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {films.length && <CardList films={films}/>}
        </section>

        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  films: getFavoriteFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms: () => {
    dispatch(Operation.loadFavoriteFilms());
  },
});

export {MyList};

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
