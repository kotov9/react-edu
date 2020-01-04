import React, {Component} from 'react';
import './App.css';
// Import stateless component "person"
import Person from './Person/Person';

class App extends Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          {/* Adding component just as an HTML element */}
          <Person name="Nikita" age="25"/>
          <Person name="Boba" age="23"/>
          <Person name="Banksy" age="4"/>
        </header>
      </div>
    );
  }
}

export default App;
