import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import films from './mocks/films';
import reviews from './mocks/reviews';

const promoItem = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

ReactDOM.render(
    <App
      promoItem={promoItem}
      films={films}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
