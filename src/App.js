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
    currentUser: null,
    userGundams: [],
    userItems: [],
    equipped: [],
    inventories: []
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
    this.setState({currentUser: user})
  }



  getUserStuff = () => {
    fetch('http://localhost:3000/user_gundams')
    .then(resp => resp.json())
    .then(gundams =>
    this.setState({ 
      equipped: gundams.filter(userGundam => userGundam.user_id === this.state.currentUser.id),
      userGundams: gundams.filter(userGundam => userGundam.user_id === this.state.currentUser.id).map(uGundam => this.state.gundams.find(gundam => gundam.id=== uGundam.gundam_id))}))


    fetch('http://localhost:3000/inventories')
    .then(resp => resp.json())
    .then(items => 
      this.setState({
        inventories: items.filter(userItem => userItem.user_id === this.state.currentUser.id),
        userItems: items.filter(userItem => userItem.user_id === this.state.currentUser.id).map(uItem => this.state.items.find(item => item.id=== uItem.item_id))
      }))   
   
  }

  render() {
    // console.clear() 
    console.log('App State :>> ', this.state);
    const {setCurrentUser, getUserStuff} = this
    const {users, currentUser, userGundams, userItems, items, equipped, inventories} = this.state
    return (
      <div>
        { currentUser ? 
        <>
        <Nav currentUserId={currentUser.id} />
         <ProfilePage key="Profile" userItems={userItems} userGundams={userGundams} items={items} getUserStuff={getUserStuff} equipped={equipped} />
         {/* <Shop items={items} inventories={inventories}setCurrentUser={setCurrentUser} currentUserId={currentUser.id} getUserStuff={getUserStuff} currentUser={currentUser} userItems={userItems}/> */}
         </>
         :
         <>
         <Nav/>
        <LoginSignup setCurrentUser={setCurrentUser} users={users} />
        </>
      }

        {/* ternary based on currentuserId cant be null to show below, else show <login/signup/> */}
        {/* {<NavBar/>}
        below is the switch based on whats clicked(starts on profile) */}
      </div>
    );
  }
}

export default App;
