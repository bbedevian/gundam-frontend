import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EnemyGundam extends Component {

    render() {
        const {opponents, myTurn, getAttacked, opponentHealth, currentUser, selectedLevel} = this.props
        console.log('enemy gundam props :>> ', this.props);
        console.log('current user :>> ', currentUser);
        // let attack = Math.floor(Math.random() * (500 - 200 + 1)) + 25
        let currentOpponent = opponents[selectedLevel-1]

        return (
            <div className="split left">
                <>
                <h1 >{currentOpponent.name}</h1>
                <img className="image200" src={currentOpponent.img_url} alt="nothing to see here"/>
                <p >Enemy Health: {opponentHealth}</p>
                </>

                {opponentHealth >0 ? 
                myTurn ? null : setTimeout(() => getAttacked(currentOpponent.attack), 3500)
                :
                null
                 }
                
                
            </div>
        );
    }
}

export default EnemyGundam;
