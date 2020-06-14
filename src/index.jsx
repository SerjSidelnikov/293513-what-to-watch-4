import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import data from './mocks/data';

ReactDOM.render(
    <App {...data}/>,
    document.querySelector(`#root`)
);
