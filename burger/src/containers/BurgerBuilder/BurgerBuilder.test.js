import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;
  
  beforeEach(() => {
    // add onIngredientsInit prop since it comes after rendering (and from redux)
    wrapper = shallow(<BurgerBuilder onIngredientsInit={() => {}}/>);
  })
  
  it('should render <BuildControls /> if ingredients are present', () => {
    wrapper.setProps({ings: {}})
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
})