import React from 'react';
import './App.css'
import { Route, Switch  } from 'react-router-dom';
import {LoginSignup, Nav, ProfilePage, Shop, BattleField} from './components';


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

  toggleItemInUse = (userId, itemId) => {
    let patchInventory = this.state.inventories.find(inventory => inventory.user_id === userId && inventory.item_id === parseInt(itemId))
    // console.log(patchInventory)
      fetch('http://localhost:3000/inventories/'+patchInventory.id,
    { method: "PATCH",
      headers: {accept: "application/json",
      "Content-type": "application/json"},
      body: JSON.stringify({in_use: true})})
      .then(resp => resp.json())
      .then(newInv => this.setState({inventories: this.state.inventories.map(inventory => inventory.id === patchInventory.id ? newInv : inventory)}))
    // this.setState({inventories: this.state.inventories.map(inventory => inventory.user_id === userId && inventory.item_id === itemId ? !inventory.in_use : inventory)})
  }

  unequipItem = (userId, itemId) => {
    let patchInventory = this.state.inventories.find(inventory => inventory.user_id === userId && inventory.item_id === parseInt(itemId))
    // console.log(patchInventory)
      fetch('http://localhost:3000/inventories/'+patchInventory.id,
    { method: "PATCH",
      headers: {accept: "application/json",
      "Content-type": "application/json"},
      body: JSON.stringify({in_use: false})})
      .then(resp => resp.json())
      .then(newInv => this.setState({inventories: this.state.inventories.map(inventory => inventory.id === patchInventory.id ? newInv : inventory)}))
    }

  render() {
    // console.clear() 
    console.log('App State :>> ', this.state);
    const {setCurrentUser, getUserStuff, sellItem, buyItem, decreaseBalance, toggleItemInUse, unequipItem} = this
    const {gundams, users, currentUser, userGundams, userItems, items, equipped, inventories} = this.state
    return (
      <div>
        <>
        <Nav />
        {/* <Nav currentUserId={currentUser.id} /> */}
        <Switch> 
        <Route path="/profile" render={(props) => <ProfilePage {...props} 
        currentUser={currentUser} toggleItemInUse={toggleItemInUse} 
        userItems={userItems} userGundams={userGundams} items={items} 
        getUserStuff={getUserStuff} equipped={equipped} unequipItem={unequipItem}
        inventories={inventories}/>}/>
        <Route path="/shop" render={(props) => <Shop {...props} items={items} inventories={inventories}
         setCurrentUser={setCurrentUser} currentUserId={currentUser.id} 
         getUserStuff={getUserStuff} currentUser={currentUser} 
         sellItem={sellItem} userItems={userItems}
         buyItem={buyItem} decreaseBalance={decreaseBalance}/>} /> 
        <Route path="/battlefield" render={(props) => <BattleField {...props} equipped={equipped} items={items} userGundams={userGundams} gundams={gundams} getUserStuff={getUserStuff}/>}/>
        <Route path="/" render={(props) => <LoginSignup {...props} setCurrentUser={setCurrentUser} users={users} />}/>
        </Switch>
        </>
      </div>
    );
  }
}

export default App;
