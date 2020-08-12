import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ButtonShowMore from './button-show-more';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`ButtonShowMore`, () => {
  it(`Simulate click the button`, () => {
    const handleClick = jest.fn();

    const wrapper = shallow(
        <ButtonShowMore onShowMore={handleClick}/>
    );

    const button = wrapper.find(`.catalog__button`);
    button.simulate(`click`);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
