import React, { Component } from 'react';
import Item from './Item'

//maybe we can make items show based on user wins ie after 10 wins you can buy medium rare, 20 wins rare etc

class Shop extends Component {

    buyItem = (item) => {
        if (this.props.currentUser.balance > item.price) {
        let newInventories = {user_id: this.props.currentUserId, item_id: item.id, in_use: null}
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
            .then(json => console.log('item added to your inventory', json))

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
        } else {alert("You cant afford this item. Win some more battles and come back!")}

    }

    render() {
        const {items} = this.props
        const {buyItem} = this
        return (
            <div>
                <center>
                <h3>Welcome to the Shop</h3>
                <h3>Use your earnings to buy Upgrades for your gundam</h3>
                <h3>Or sell old parts for cash</h3>
                </center>

                <div className="split right">
                    <h4>Items for sale</h4>
                    {items.map(item => <Item store={true} key={item.id} buyItem={buyItem}{...item}/>)}
                    
                </div>

                <div className="split left">
                    <h4>Your items</h4>


                </div>


            </div>
        );
    }
}

export default Shop;
