import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';


const activeLinkStyle = {
    color: "red",
    textDecoration: "none",
    padding: "10px 30px"
}

const linkStyle = {
    color: "black",
    textDecoration: "none",
    padding: "10px 30px"
}

class App extends Component {
  render () {
    return (
        <BrowserRouter>
            <div className="App">
                {/* <ol style={{textAlign: 'left'}}>
          <li>V Add Routes to load "Users" and "Courses" on different pages (by entering a URL, without Links)</li>
          <li>V Add a simple navigation with two links => One leading to "Users", one leading to "Courses"</li>
          <li>V Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)</li>
          <li>V Pass the course ID to the "Course" page and output it there</li>
          <li>V Pass the course title to the "Course" page - pass it as a param or score bonus points by passing it as query params (you need to manually parse them though!)</li>
          <li>V Load the "Course" component as a nested component of "Courses"</li>
          <li>V Add a 404 error page and render it for any unknown routes</li>
          <li>V Redirect requests to /all-courses to /courses (=> Your "Courses" page)</li>
        </ol> */}
            </div>
            <header>
                <NavLink 
                    to="/users"
                    style={linkStyle}
                    activeStyle={activeLinkStyle}>Users</NavLink>
                <NavLink 
                    to="/courses"
                    style={linkStyle}
                    activeStyle={activeLinkStyle}>Courses</NavLink>
            </header>
            <Switch>
                <Route 
                    path="/users" 
                    component={Users} />
                <Route 
                    path="/courses"
                    component={Courses} />
                <Redirect from="/all-courses" to="/courses"/>
                <Route
                    path="/"
                    render={() => <h1>Not Found</h1>} />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
