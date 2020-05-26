import React, { Component } from 'react';

class BattleFieldGundam extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.selectedGundam.name}</h1>
                <p>{this.props.userHealth}</p>
            </div>
        );
    }
}

export default BattleFieldGundam;
