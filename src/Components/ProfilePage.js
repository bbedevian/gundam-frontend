import React, { Component } from 'react';
import ProfileGundam from './ProfileGundam'
import Item from './Item'
const userGundamUrl = 'http://localhost:3000/user_gundams'

class ProfilePage extends Component {
    componentDidMount () {
        this.props.getUserStuff()  
    }

    addItemToSlot1 = (id, itemId) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot1: itemId})
        }).then(console.log("added to slot 1"))
    }

    addItemToSlot2 = (id, itemId) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot2: itemId})
        }).then(console.log("added to slot 2"))
    }
    addItemToSlot3 = (id, itemId) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot3: itemId})
        }).then(console.log("added to slot 3"))
    }
    addItemToSlot4 = (id, itemId) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot4: itemId})
        }).then(console.log("added to slot 4"))
    }
    removeItemFromSlot1 = (id) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot1: null})
        }).then(console.log("added to slot 1"))
    }

    removeItemFromSlot2 = (id) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot2: null})
        }).then(console.log("added to slot 2"))
    }
    removeItemFromSlot3 = (id) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot3: null})
        }).then(console.log("added to slot 3"))
    }
    removeItemFromSlot4 = (id) => {
        fetch(userGundamUrl+'/'+id, {
            method: "PATCH",
            headers: {accept: "application/json",
            "Content-type": "application/json"},
            body: JSON.stringify({slot4: null})
        }).then(console.log("added to slot 4"))
    }
    //PATCH to userGundams add item id to one of 4 slots, user determines which slot to put it in

    render() {
        // console.log('Profile state :>> ', this.state.equipped);
        // need to match gundam_id with gundam_id in equipped to pass that object down. 
        const {userGundams, userItems, equipped, currentUser, inventories, items, unequipItem} = this.props
        return (
            <div>
                {userGundams.map(gundam => 
                <ProfileGundam key={gundam.id} 
                items={items} 
                equipped={equipped} 
                {...gundam} 
                currentUser={currentUser}
                addItemToSlot1={this.addItemToSlot1}
                addItemToSlot2={this.addItemToSlot2}
                addItemToSlot3={this.addItemToSlot3}
                addItemToSlot4={this.addItemToSlot4}
                removeItemFromSlot1={this.removeItemFromSlot1}
                removeItemFromSlot2={this.removeItemFromSlot2}
                removeItemFromSlot3={this.removeItemFromSlot3}
                removeItemFromSlot4={this.removeItemFromSlot4}
                toggleItemInUse={this.props.toggleItemInUse}
                inventories={inventories}
                unequipItem={unequipItem}
                userItems={userItems}/>)}
                <h3>Your Items</h3>
                {userItems.map(item => <Item key={item.id} {...item}/>)}
                {/* map through useritems and return profile item */}
            </div>
        );
    }
}

export default ProfilePage;
