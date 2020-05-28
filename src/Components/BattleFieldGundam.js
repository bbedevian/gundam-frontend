import React, { Component } from 'react';

class BattleFieldGundam extends Component {


    render() {
        const {selectedGundam, myTurn, attackOpponent, userHealth, userAtt} = this.props
        return (
            <div className="split right">
                <h1 className="battlefieldtext" >{selectedGundam.name}</h1>
                <img className="image200 attack-right" src={selectedGundam.img_url} alt="selected Gundam"/>
                <p className="battlefieldtext" >My Health: {userHealth}</p>
                {myTurn ? 
                userHealth > 0 ? 
                <button onClick={() => attackOpponent(userAtt)}>Attack!!</button>
                : alert("you lost, try again!")
                 : 
                null
                 }
            </div>
        );
    }
}

export default BattleFieldGundam;
