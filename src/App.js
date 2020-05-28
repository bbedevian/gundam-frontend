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

  addEquippedSlot1 = (id, itemId) => {
    console.log("App equipped", this.state.equipped)
    let equipNew = this.state.equipped.find(equip => equip.id === id)
    equipNew.slot1 = parseInt(itemId)
    let newEquipped = this.state.equipped.map(equip => equip.id !== id ? equip : equipNew )
    console.log("App New equipped", newEquipped)
    this.setState({equipped: newEquipped})
  }

  addEquippedSlot2 = (id, itemId) => {
    let equipNew = this.state.equipped.find(equip => equip.id === id)
    equipNew.slot2 = parseInt(itemId)
    let newEquipped = this.state.equipped.map(equip => equip.id !== id ? equip : equipNew )
    this.setState({equipped: newEquipped})
  }

  addEquippedSlot3 = (id, itemId) => {
    let equipNew = this.state.equipped.find(equip => equip.id === id)
    equipNew.slot3 = parseInt(itemId)
    let newEquipped = this.state.equipped.map(equip => equip.id !== id ? equip : equipNew )
    this.setState({equipped: newEquipped})
  }

  addEquippedSlot4 = (id, itemId) => {
    let equipNew = this.state.equipped.find(equip => equip.id === id)
    equipNew.slot4 = parseInt(itemId)
    let newEquipped = this.state.equipped.map(equip => equip.id !== id ? equip : equipNew )
    this.setState({equipped: newEquipped})
  }

  removeEquipped = (id, slot) => {
    let equipNew = this.state.equipped.find(equip => equip.id === id)
    equipNew[slot] = null
    let newEquipped = this.state.equipped.map(equip => equip.id !== id ? equip : equipNew )
    this.setState({equipped: newEquipped})
  }

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  sellItem = (item) => {
    let newInventories = this.state.inventories.filter(userItem => userItem.id !== item.id)
    let newUserItems = this.state.userItems
    let index = newUserItems.findIndex(items => items.id === item.item_id)
    newUserItems.splice(index, 1)
    this.setState({
      inventories: newInventories,
      userItems: newUserItems
    })
  }

  buyItem = (item) => {
    let newItem = this.state.items.find(items => items.id === item.item_id)
    this.setState({
      inventories: [...this.state.inventories, item],
      userItems: [...this.state.userItems, newItem]
    })
  }

  buyGundam = (userGundam) => {
    let newGundam = this.state.gundams.find(gundam => gundam.id === userGundam.gundam_id)
    this.setState({
      equipped: [...this.state.equipped, userGundam],
      userGundams: [...this.state.userGundams, newGundam]
    })
    alert(`You just purchased ${newGundam.name} Gundam! You can view your Mobile Suit in your profile!`)
  }

  decreaseBalance = (newBalance) => {
    this.setState(prevState => ({
      ...prevState, currentUser: {
        ...prevState.currentUser,
           balance: newBalance}}))
  }

  setNewUserGundam = (value) => {
    console.log('value :>> ', value);
    console.log('this.state.gundams :>> ', this.state.gundams);
    this.setState({ 
      userGundams: [...this.state.userGundams, this.state.gundams.find(gundam => gundam.id === value.gundam_id)],
      equipped: [...this.state.equipped, value]})
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
    const {setNewUserGundam, setCurrentUser, getUserStuff, sellItem, buyItem, buyGundam, decreaseBalance, toggleItemInUse, unequipItem, removeEquipped, addEquippedSlot1,addEquippedSlot2,addEquippedSlot3,addEquippedSlot4} = this
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
        getUserStuff={getUserStuff} equipped={equipped} unequipItem={unequipItem} addEquippedSlot1={addEquippedSlot1}
        addEquippedSlot2={addEquippedSlot2} addEquippedSlot3={addEquippedSlot3} addEquippedSlot4={addEquippedSlot4}
        removeEquipped={removeEquipped}
        inventories={inventories}/>}/>

        <Route path="/shop" render={(props) => <Shop {...props} items={items} inventories={inventories}
         setCurrentUser={setCurrentUser} gundams={gundams} currentUserId={currentUser.id} 
         getUserStuff={getUserStuff} currentUser={currentUser} 
         sellItem={sellItem} userItems={userItems} buyGundam={buyGundam}
         buyItem={buyItem} decreaseBalance={decreaseBalance}/>} /> 

        <Route path="/battlefield" render={(props) => <BattleField {...props} currentUser={currentUser} equipped={equipped} items={items} userGundams={userGundams} gundams={gundams} getUserStuff={getUserStuff}/>}/>
        <Route path="/" render={(props) => <LoginSignup {...props} setNewUserGundam={setNewUserGundam} currentUser={currentUser} gundams={gundams} setCurrentUser={setCurrentUser} users={users} />}/>
        </Switch>
        </>
      </div>
    );
  }
}

export default App;
