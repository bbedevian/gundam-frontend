import React from 'react';
import './App.css';

import LoginSignup from './Components/LoginSignup';
import Nav from './components/Nav';


class App extends React.Component {

  state = {
    users: [],
    currentUserId: null,
    userItems: [],
    userGundams: [],
    userBalance: []
  }


  componentDidMount() {
      fetch(`http://localhost:3000/users`)
      .then(resp => resp.json())
      .then(users => this.setState({ users}))
  }

  setCurrentUser = (user) => {
    this.setState({currentUserId: user})
  }

  render() {
    console.log('App State :>> ', this.state);
    const {setCurrentUser} = this
    const {users, currentUserId} = this.state
    return (
      <div>
        { currentUserId ? null : 
        <LoginSignup setCurrentUser={setCurrentUser} users={users} />
      }

        <Nav currentUserId={this.state.currentUserId} />
        {/* ternary based on currentuserId cant be null to show below, else show <login/signup/> */}
        {/* {<NavBar/>}
        below is the switch based on whats clicked(starts on profile) */}
      </div>
    );
  }
}

export default App;
