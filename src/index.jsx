import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import films from './mocks/films';

const promoItem = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

ReactDOM.render(
    <App
      promoItem={promoItem}
      films={films}
    />,
    document.querySelector(`#root`)
);
