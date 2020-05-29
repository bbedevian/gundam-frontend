import React, { Component } from 'react';
import Item from './Item'
import StoreGundam from './StoreGundam';

//maybe we can make items show based on user wins ie after 10 wins you can buy medium rare, 20 wins rare etc

class Shop extends Component {

    state = {
        userItems: this.props.userItems,
        showItems: true
    }

    componentDidMount () {
        this.props.getUserStuff()  
    }

    

    buyItem = (item) => {
        if (this.props.currentUser.balance > item.price) {
        let newInventories = {user_id: this.props.currentUserId, item_id: item.id, in_use: false}
        let newBalance =  this.props.currentUser.balance - item.price

        fetch(`http://localhost:3000/inventories`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newInventories)
            })
            .then(response => response.json())
            .then(json => this.props.buyItem(json),
                console.log('item added to your inventory'))

        fetch(`http://localhost:3000/users/${this.props.currentUserId}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({balance: newBalance})
            })
            .then(response => response.json())
            .then(json => console.log('updated your balance', json))
            .then(this.props.changeBalance(newBalance))
        } else {alert("You cant afford this item. Win some more battles and come back!")}
    }

    buyGundam = (gundam) => {
        if (this.props.currentUser.balance > gundam.price) {
        let newUserGundam = {user_id: this.props.currentUserId, gundam_id: gundam.id}
        let newBalance =  this.props.currentUser.balance - gundam.price

        fetch(`http://localhost:3000/user_gundams`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUserGundam)
            })
            .then(response => response.json())
            .then(json => this.props.buyGundam(json),
                console.log('gundam added to your inventory'))

        fetch(`http://localhost:3000/users/${this.props.currentUserId}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({balance: newBalance})
            })
            .then(response => response.json())
            .then(json => console.log('updated your balance', json))
            .then(this.props.changeBalance(newBalance))
        } else {alert("You cant afford this Gundam! Win some more battles and come back!")}
    }

    sellItem = (item) => {
        let newBalance =  this.props.currentUser.balance + (item.price * .5)
        let itemForSale = this.props.inventories.find(userItem => userItem.item_id === item.id)
        console.log('item for sale :>> ', itemForSale);
        console.log('item :>> ', item);
        fetch(`http://localhost:3000/inventories/${itemForSale.id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            }})
            .then(this.props.sellItem(itemForSale))

        fetch(`http://localhost:3000/users/${this.props.currentUserId}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({balance: newBalance})
            })
            .then(response => response.json())
            .then(user => 
                this.props.setCurrentUser(user),
                console.log('updated your balance')
                )

    }


    toggleShow = () => {
        this.setState({showItems: !this.state.showItems})
    }
    render() {
        // console.log('shop props :>> ', this.props);
        // console.log('user :>> ', this.props.currentUser);
        const {items, userItems, currentUser, gundams} = this.props
        const {buyItem, sellItem, buyGundam} = this
        let gfs = gundams.filter(gundam => gundam.price ? gundam : null)
        return (
            <div className="shop-container">
                {/* <div className="welcome-shop">
                <h3>Welcome to the Shop</h3>
                <h3>Use your earnings to buy Upgrades for your gundam</h3>
                <h3>Or sell old parts for cash</h3>
                <h3>Your Balance: {currentUser.balance}</h3>
                </div> */}
                {this.state.showItems ? 
                <div className="store-items">
                    <h2 style={{color: "white"}}>Items for sale</h2><br></br><br></br>
                <center>
                    <button className="store-button" onClick={this.toggleShow}>{this.state.showItems ? "Show Gundams" : "Show Items"}</button>
                </center>
                    {items.map(item => <Item store={true} key={item.id} buyItem={buyItem}{...item}/>)}
                </div> 
                :
                <div className="gundam-grid">
                    <h2 style={{color: "white"}}>Gundams for sale</h2>
                <center>
                    <button className="store-button" onClick={this.toggleShow}>{this.state.showItems ? "Show Gundams" : "Show Items"}</button>
                </center>
                    {gfs.map(gundam => <StoreGundam key={gundam.id} {...gundam} buyGundam={buyGundam}/>)}
                </div>
                }      
                <div className="user-items">
                <h3 className="item-title">Your Items</h3>
                    {userItems.map(item => <Item user={true} key={item.id} sellItem={sellItem} {...item}/>)}
                </div>
                <div className="user-info">
                <h3>Welcome to the Shop</h3>
                <h3>Use your earnings to buy Upgrades for your gundam</h3>
                <h3>Or sell old parts for cash</h3>
                    <p>Balance: {currentUser.balance} credits</p>
                    
                </div>

            </div>
        );
    }
}

export default Shop;
