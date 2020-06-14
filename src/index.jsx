import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

const data = {
  film: {
    title: `The Grand Budapest Hotel`,
    genre: `Drama`,
    releaseDate: 2014,
  },
  movies: [
    `Fantastic Beasts`,
    `Bohemian Rhapsody`,
    `Macbeth`,
  ],
};

ReactDOM.render(
    <App {...data}/>,
    document.querySelector(`#root`)
);
