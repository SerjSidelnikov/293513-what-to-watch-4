import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Header from '../header/header';
import {COUNT_RATING, Status} from '../../const';
import {filmType} from '../../types';
import {getFilms} from '../../reducers/data/selectors';
import {Operation} from '../../reducers/reviews/reviews';
import {getStatusTransfer} from '../../reducers/reviews/selectors';

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 1,
      comment: ``,
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(evt) {
    const name = evt.target.name;

    if (name === `rating`) {
      this.setState({
        [name]: parseInt(evt.target.value, 10),
      });
    } else {
      this.setState({
        [name]: evt.target.value,
      });
    }
  }

  _handleSubmit(evt) {
    const {rating, comment} = this.state;
    const {addReview, match} = this.props;
    const id = match.params.id;
    evt.preventDefault();

    addReview(id, {rating, comment});
  }

  render() {
    const {rating, comment} = this.state;
    const {films, match, statusTransfer} = this.props;
    const id = parseInt(match.params.id, 10);
    const film = films.find((it) => it.id === id);
    const {name, 'background_image': background, 'poster_image': poster} = film;
    const ratings = new Array(COUNT_RATING).fill(``);

    if (statusTransfer === Status.SUCCESS) {
      return <Redirect to={`/films/${id}`}/>;
    }

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={background} alt={name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header>
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="movie-card__poster movie-card__poster--small">
            <img
              src={poster}
              alt={name}
              width="218"
              height="327"
            />
          </div>
        </div>

        <div className="add-review">
          <form onSubmit={this._handleSubmit} className="add-review__form">
            <div className="rating">
              <div className="rating__stars">
                {ratings.map((it, i) => (
                  <React.Fragment key={`rating-${i}`}>
                    <input
                      onChange={this._handleChange}
                      className="rating__input"
                      id={`star-${i + 1}`}
                      type="radio"
                      name="rating"
                      value={i + 1}
                      checked={i + 1 === rating}
                    />
                    <label className="rating__label" htmlFor={`star-${i + 1}`}>Rating {i + 1}</label>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="comment"
                id="review-text"
                placeholder="Review text"
                value={comment}
                minLength={50}
                maxLength={400}
                spellCheck={true}
                onChange={this._handleChange}
              />
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={comment.length < 50 || comment.length > 400}
                >Post</button>
              </div>
            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
  films: PropTypes.arrayOf(filmType).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired
  }).isRequired,
  addReview: PropTypes.func.isRequired,
  statusTransfer: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  films: getFilms(state),
  statusTransfer: getStatusTransfer(state),
});

const mapDispatchToProps = (dispatch) => ({
  addReview: (id, formData) => {
    dispatch(Operation.addReview(id, formData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
