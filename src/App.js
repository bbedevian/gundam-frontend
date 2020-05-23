import React from 'react';
import './App.css';

import LoginSignup from './components/LoginSignup';
import Nav from './components/Nav';
import ProfilePage from './components/ProfilePage';
import Shop from './components/Shop';


class App extends React.Component {

  state = {
    users: [],
    gundams: [],
    items: [],
    currentUserId: null,
  }


  componentDidMount() {
      fetch(`http://localhost:3000/users`)
      .then(resp => resp.json())
      .then(users => this.setState({ users}))

      fetch('http://localhost:3000/gundams')
      .then(resp => resp.json())
      .then(gundams => this.setState({ gundams }))

      fetch('http://localhost:3000/items')
      .then(resp => resp.json())
      .then(items => this.setState({ items }))
  }

  setCurrentUser = (user) => {
    this.setState({currentUserId: user})
  }

  render() {
    // console.log('App State :>> ', this.state);
    const {setCurrentUser} = this
    const {users, currentUserId, gundams, items} = this.state
    const currentUser = users.find(user => user.id === currentUserId)
    return (
      <div>
        <Nav currentUserId={currentUserId} />
        { currentUserId ? 
        //  <ProfilePage items={items} gundams={gundams} currentUserId={currentUserId}/>
         <Shop items={items} currentUserId={currentUserId} currentUser={currentUser}/>
         : 
        <LoginSignup setCurrentUser={setCurrentUser} users={users} />
      }

        {/* ternary based on currentuserId cant be null to show below, else show <login/signup/> */}
        {/* {<NavBar/>}
        below is the switch based on whats clicked(starts on profile) */}
      </div>
    );
  }
}

export default App;
