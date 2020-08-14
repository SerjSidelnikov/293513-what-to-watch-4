import * as React from 'react';
import {connect} from 'react-redux';
import {Subtract} from 'utility-types';

import {getFilms} from '../../reducers/data/selectors';
import {getStatusTransfer} from '../../reducers/reviews/selectors';
import {Operation} from '../../reducers/reviews/reviews';
import {Film} from '../../types';

interface State {
  rating: number,
  comment: string,
}

interface Props {
  films: Array<Film>,
  match: {
    params: {
      id: string,
    }
  },
  addReview: () => void,
  statusTransfer: string,
}

const withAddReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, Props>;

  class WithAddReview extends React.PureComponent<T, State> {
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
          rating: parseInt(evt.target.value, 10),
        });
      } else {
        this.setState({
          comment: evt.target.value,
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
