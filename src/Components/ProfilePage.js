import React, { Component } from 'react';
import ProfileGundam from './ProfileGundam'
import Item from './Item'

class ProfilePage extends Component {


    state = {
        userGundams: [],
        userItems: [],
        equipped: []
    }

    componentDidMount () {
        this.props.getUserStuff()  
    }

    //PATCH to userGundams add item id to one of 4 slots, user determines which slot to put it in

    render() {
        // console.log('Profile state :>> ', this.state.equipped);
        // need to match gundam_id with gundam_id in equipped to pass that object down. 
        const {userGundams, userItems, equipped} = this.props
        const {items} = this.props
        return (
            <div>
                {userGundams.map(gundam => <ProfileGundam items={items} equipped={equipped} key={gundam.id} {...gundam} equipped={equipped}/>)}
                <h3>Your Items</h3>
                {userItems.map(item => <Item key={item.id} {...item}/>)}
                {/* map through useritems and return profile item */}
            </div>
        );
    }
}

export default ProfilePage;
