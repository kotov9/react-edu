import React from 'react';

const WithClass = props => (
  <div className={props.classes}>
    {props.children}
    <p>Customized with higher order component WithClass</p>
  </div>
);


export default WithClass;