import React from 'react';

const AuthContext = React.createContext({auth: false, login: () =>{}});

export default AuthContext;