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

    // addItemToSlot2 = (id, itemId) => {

    // }

    // addItemToSlot2 = (id, itemId) => {

    // }

    // addItemToSlot2 = (id, itemId) => {

    // }
    //PATCH to userGundams add item id to one of 4 slots, user determines which slot to put it in

    render() {
        // console.log('Profile state :>> ', this.state.equipped);
        // need to match gundam_id with gundam_id in equipped to pass that object down. 
        const {userGundams, userItems, equipped} = this.props
        const {items} = this.props
        return (
            <div>
                {userGundams.map(gundam => 
                <ProfileGundam key={gundam.id} 
                items={items} 
                equipped={equipped} 
                {...gundam} 
                addItemToSlot1={this.addItemToSlot1}
                userItems={userItems}/>)}

                <h3>Your Items</h3>
                {userItems.map(item => <Item key={item.id} {...item}/>)}
                {/* map through useritems and return profile item */}
            </div>
        );
    }
}

export default ProfilePage;
