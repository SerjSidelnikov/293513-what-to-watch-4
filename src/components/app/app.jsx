import React from 'react';

import Main from '../main/main';

const handleCardTitle = () => {};

const App = (props) => {
  return (
    <Main
      {...props}
      onCardTitleClick={handleCardTitle}
    />
  );
};

export default App;
