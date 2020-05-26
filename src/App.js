import React from 'react';
import './App.css';
import { Route, Switch  } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import Nav from './components/Nav';
import ProfilePage from './components/ProfilePage';
import Shop from './components/Shop';
import BattleField from './components/BattleField';
// import {LoginSignup, Nav, ProfilePage, Shop, BattleField} from './components';


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

  // componentDidUpdate(prevState) {
  //   if (this.state.currentUser && this.state.currentUser !== prevState.currentUser)
  //   this.getUserStuff()
  // }

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  sellItem = (item) => {
    this.setState({
      inventories: this.state.inventories.filter(userItem => userItem.item_id !== item.id)
    })
  }

  buyItem = (item) => {
    this.setState({
      inventories: [...this.state.inventories, item],
    })
  }

  decreaseBalance = (newBalance) => {
    this.setState(prevState => ({
      ...prevState, currentUser: {
        ...prevState.currentUser,
           balance: newBalance}}))
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
    const {setCurrentUser, getUserStuff, sellItem, buyItem, decreaseBalance} = this
    const {gundams, users, currentUser, userGundams, userItems, items, equipped, inventories} = this.state
    return (
      <div>
        { currentUser ? 
        <>
        {/* <Nav currentUserId={currentUser.id} /> */}
        {/* <Switch> 
        <Route path="/profile" component={ProfilePage}/> 
        <Route path="/shop" component={Shop}/>  */}
       
        {/* </Switch> */}
          <BattleField gundams={gundams} userGundams={userGundams} getUserStuff={getUserStuff}/>
         {/* <ProfilePage key="Profile" userItems={userItems} userGundams={userGundams} items={items} getUserStuff={getUserStuff} equipped={equipped} /> */}
         {/* <Shop items={items} inventories={inventories}setCurrentUser={setCurrentUser} currentUserId={currentUser.id} getUserStuff={getUserStuff} currentUser={currentUser} userItems={userItems}/> */}

         {/* <ProfilePage userItems={userItems} userGundams={userGundams} items={items} getUserStuff={getUserStuff} equipped={equipped} /> */}
         {/* <Shop items={items} inventories={inventories}
         setCurrentUser={setCurrentUser} currentUserId={currentUser.id} 
         getUserStuff={getUserStuff} currentUser={currentUser} 
         sellItem={sellItem} userItems={userItems}
         buyItem={buyItem} decreaseBalance={decreaseBalance}/> */}

         </>
         :
         <>
          {/* <Route path="/login" component={LoginSignup}/> */}
         {/* <Nav/> */}
        <LoginSignup setCurrentUser={setCurrentUser} users={users} />
        </>
      }

    
        {/* <NavBar/> */}
      
      </div>
    );
  }
}

export default App;
