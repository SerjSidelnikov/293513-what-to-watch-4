import * as React from 'react';

interface Props {
  onShowMore: () => void
}

const ButtonShowMore: React.FC<Props> = ({onShowMore}) => {
  return (
    <div className="catalog__more">
      <button onClick={onShowMore} className="catalog__button" type="button">Show more</button>
    </div>
  );
};

export default ButtonShowMore;
