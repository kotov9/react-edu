import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // 'shallow' NOT deeply renders component (content of nested components is rendered as placeholder)
    const wrapper = shallow(<NavigationItems />);
    // find method help to define if component has content defined as argument of find
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  })
  
  it('should render three <NavigationItem /> elements if authenticated', () => {
    const wrapper = shallow(<NavigationItems isAuth/>);
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  })
})