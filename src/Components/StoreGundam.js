import React, { Component } from 'react';

class StoreGundam extends Component {
    render() {
        const {name, img_url, attack, hp, price} = this.props
        return (
            <div>
                {name}
                <img className="image200" src={img_url} alt="a gfs"/>
                {attack}
                {hp}
                {price}
            </div>
        );
    }
}

export default StoreGundam;
