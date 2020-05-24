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
    userGundams: [],
    userItems: [],
    equipped: []
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

  getUserStuff = () => {
    fetch('http://localhost:3000/user_gundams')
    .then(resp => resp.json())
    .then(gundams => this.setState({ userGundams: 
        gundams.map(userGundam => userGundam.user_id === this.state.currentUserId ? 
            this.state.gundams.find(gundam => gundam.id === userGundam.gundam_id)
                : 
                null), equipped: gundams.filter(userGundam => userGundam.user_id === this.state.currentUserId)}))   

    fetch('http://localhost:3000/inventories')
    .then(resp => resp.json())
    .then(items => this.setState({ userItems: 
        items.map(userItem => userItem.user_id === this.state.currentUserId ? 
            this.state.items.find(item => item.id === userItem.item_id)
                : 
                null)}))   
  }

  render() {
    console.clear()
    console.log('App State :>> ', this.state);
    const {setCurrentUser, getUserStuff} = this
    const {users, currentUserId, userGundams, userItems, items, equipped} = this.state
    const currentUser = users.find(user => user.id === currentUserId)
    return (
      <div>
        <Nav currentUserId={currentUserId} />
        { currentUserId ? 
         <ProfilePage userItems={userItems} userGundams={userGundams} items={items} getUserStuff={getUserStuff} equipped={equipped} />
        //  <Shop items={items} currentUserId={currentUserId} currentUser={currentUser}/>
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
