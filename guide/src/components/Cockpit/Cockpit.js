import React, { Fragment, Component } from 'react';
import styles from './Cockpit.module.css';

// Use Context to pass props deep in components tree.
import AuthContext from '../../context/AuthContext.js';


// Case of component name matters (must start with capital one)
class Cockpit extends Component {
  
  // Better way of using Context (Consumer part) in class
  // Must be "static contextType = ..."
  static contextType = AuthContext;
  
  componentDidMount() {
    console.log(this.context);
  }
  
  render() {
    const buttonStyle = [styles.Button];
    if (this.props.display) {
      buttonStyle.push(styles.Red);
    } else {
      buttonStyle.push(styles.Green);
    }
    
    return (
    <Fragment>
      <button onClick={this.context.login}>Login</button>
      <button
        onClick={this.props.clicked}
        className={buttonStyle.join(" ")}
        >Toggle display
      </button>
    </Fragment>
  )
  }


}

// React.memo helps control updating stateless component
// only if it needs to be updated (if props related were changed)
export default React.memo(Cockpit);