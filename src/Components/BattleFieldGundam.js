import React, { Component } from 'react';

class BattleFieldGundam extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.selectedGundam.name}</h1>
            </div>
        );
    }
}

export default BattleFieldGundam;
