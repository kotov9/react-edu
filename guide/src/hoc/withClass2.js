import React from 'react';

const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} /> {/*Use this way of passing unknown props dinamically*/}
    </div>
  )
}

export default withClass;