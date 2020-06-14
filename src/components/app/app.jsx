import React from 'react';

import Main from '../main/main';

const cardTitleHandler = () => {};

const App = (props) => {
  return (
    <Main
      {...props}
      onCardTitleClick={cardTitleHandler}
    />
  );
};

export default App;
