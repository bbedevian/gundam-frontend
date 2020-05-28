import React, { Component } from 'react';

class StoreGundam extends Component {
    render() {
        const {name, img_url, attack, hp, rarity, description, price} = this.props
        return (
            <div>
                <img className="image200" src={img_url} alt={name} />
                <h1>{name}</h1>
                <h1>{price} Credits</h1>
                <h3>Base Hp: {hp}</h3>
                <h3>Base Att: {attack}</h3>
                <h3>Rarity: {rarity}</h3>
                <p>Description: {description}</p>
                <button onClick={() => this.props.buyGundam(this.props)}>Buy Gundam</button>
            </div>
        );
    }
}

export default StoreGundam;
