import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {filmType} from '../../types';
import {getFilms} from '../../reducers/data/selectors';
import {getStatusTransfer} from '../../reducers/reviews/selectors';
import {Operation} from '../../reducers/reviews/reviews';

const withAddReview = (Component) => {
  class WithAddReview extends React.PureComponent {
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
      const {match, films} = this.props;
      const id = parseInt(match.params.id, 10);
      const film = films.find((it) => it.id === id);

      return (
        <Component
          {...this.props}
          id={id}
          film={film}
          rating={rating}
          comment={comment}
          onChange={this._handleChange}
          onSubmitReview={this._handleSubmit}
        />
      );
    }
  }

  WithAddReview.propTypes = {
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

  return connect(mapStateToProps, mapDispatchToProps)(WithAddReview);
};

export default withAddReview;
