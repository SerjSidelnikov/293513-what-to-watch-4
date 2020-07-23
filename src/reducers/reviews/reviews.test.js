import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../api';

import {reducer, ActionType, Operation} from './reviews';
import {Status} from '../../const';

const api = createApi(() => {});

const reviews = [
  {
    "id": 1,
    "user": {
      "id": 11,
      "name": `Jack`
    },
    "rating": 4.3,
    "comment": `This movie really touched my heart, it really is the best movie of the year and everyone should see this masterpiece.`,
    "date": `2020-07-06T16:06:01.831Z`
  },
  {
    "id": 2,
    "user": {
      "id": 15,
      "name": `Kendall`
    },
    "rating": 9.3,
    "comment": `The editing is a mess, and the transitions of the plot or characters are rather strange. There is no narrative focus and the storytelling is unbalanced. I cannot really understand why such a bad movie received an overwhelming approval from the critics. `,
    "date": `2020-07-09T16:06:01.831Z`
  }
];

describe(`Reviews reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      reviews: [],
      isLoading: true,
      statusTransfer: Status.PENDING,
    });
  });

  it(`Reducer should update reviews by load comments`, () => {
    expect(reducer({
      reviews: [],
      isLoading: true,
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    })).toEqual({
      reviews,
      isLoading: false,
    });
  });

  it(`Should make a correct API GET call to /comments/id`, () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const reviewsLoader = Operation.loadReviews(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API POST call to /comments/id`, () => {
    const dispatch = jest.fn();
    const apiMock = new MockAdapter(api);
    const reviewsLoader = Operation.addReview(1, {rating: 5, comment: ``});

    apiMock
      .onPost(`/comments/1`, {rating: 5, comment: ``})
      .reply(200, [{fake: true}]);

    return reviewsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.TRANSFER_REVIEW,
          payload: Status.SUCCESS,
        });
      });
  });
});
