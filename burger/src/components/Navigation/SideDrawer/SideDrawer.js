import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';


const SideDrawer = props => {
  
  let attachedClasses = [classes.SideDrawer];
  
  if (props.open) {
    attachedClasses.push(classes.Open);
  } else {
    attachedClasses.push(classes.Close);
  }
  
  return (
    <Aux>
      <Backdrop 
        show={props.open}
        hide={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
};


export default SideDrawer;