import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    currentUserId: null,
    userItems: [],
    userGundams: [],
  }
  render() {
    return (
      <div>
        {/* ternary based on currentuserId cant be null to show below, else show <login/signup/> */}
        {/* {<NavBar/>}
        below is the switch based on whats clicked(starts on profile) */}
      </div>
    );
  }
}

export default App;
