import React, { Component } from 'react';
import HpBar from './HpBar'
class BattleFieldGundam extends Component {

    state = {
        attack: false
    }

    render() {
        const {selectedGundam, myTurn, attackOpponent, userHealth, userTotalHealth, userAtt} = this.props
        return (
            <>
            <div className="split left">
                <HpBar userHealth={userHealth} userTotalHealth={userTotalHealth} />
                <h1 className="battlefieldtext" >{selectedGundam.name}</h1>
                <img className={this.state.attack ? "image600 attack-right" : "image600"} src={selectedGundam.img_url} alt="selected Gundam"/>
            </div>
                {myTurn ? 
                userHealth > 0 ? 
                <button 
                className="attack-button" 
                onClick={() => {attackOpponent(userAtt); this.setState({attack: true}); setTimeout(() => this.setState({attack: false}), 3500)}}
                >Attack!!</button>
                : alert("you lost, try again!")
                : 
                null
            }
            </>
        );
    }
}

export default BattleFieldGundam;
