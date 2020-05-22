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
        fetch('http://localhost:3000/user_gundams')
        .then(resp => resp.json())
        .then(gundams => this.setState({ userGundams: 
            gundams.map(userGundam => userGundam.user_id === this.props.currentUserId ? 
                this.props.gundams.find(gundam => gundam.id === userGundam.gundam_id)
                    : 
                    null), equipped: gundams.filter(userGundam => userGundam.user_id === this.props.currentUserId)}))   

        fetch('http://localhost:3000/inventories')
        .then(resp => resp.json())
        .then(items => this.setState({ userItems: 
            items.map(userItem => userItem.user_id === this.props.currentUserId ? 
                this.props.items.find(item => item.id === userItem.item_id)
                    : 
                    null)}))   
    }



    //√ fetch to joiner where userid = usergundam id
    // √filter gundams array (from App State) and setstate for Profile userGundams 
    //fetch to joiner of inventory where userid === .....
    // filter items array (from App State) and setstate for Profile inventory 

    //PATCH to userGundams add item id to one of 4 slots, user determines which slot to put it in

    render() {
        // console.log('Profile state :>> ', this.state);
        const {userGundams, userItems, equipped} = this.state
        const {items} = this.props
        return (
            <div>
                {userGundams.map(gundam => <ProfileGundam items={items} equipped={equipped} key={gundam.id} {...gundam} />)}
                {userItems.map(item => <Item key={item.id} {...item}/>)}
                {/* map through useritems and return profile item */}
            </div>
        );
    }
}

export default ProfilePage;
