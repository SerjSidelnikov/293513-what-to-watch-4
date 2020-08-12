import React from 'react';
import PropTypes from 'prop-types';

const ButtonShowMore = ({onShowMore}) => {
  return (
    <div className="catalog__more">
      <button onClick={onShowMore} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ButtonShowMore.propTypes = {
  onShowMore: PropTypes.func.isRequired,
};

export default ButtonShowMore;
