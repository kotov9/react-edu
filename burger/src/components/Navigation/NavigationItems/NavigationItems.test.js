import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

let wrapper;

beforeEach(() => {
  // 'shallow' NOT deeply renders component (content of nested components is rendered as placeholder)
  wrapper = shallow(<NavigationItems />); 
})

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // find method help to define if component has content defined as argument of find
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  })
  
  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })
  
  it('should render logout <NavigationItem /> element if authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  })
})