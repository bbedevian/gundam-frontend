import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EnemyGundam extends Component {

    rewardUser = () => {
        let prize = Math.floor(Math.random() * (50 - 25 + 1)) + 25
        fetch(`http://localhost:3000/users/`+this.props.currentUser.id, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({balance: this.props.currentUser.balance + prize})
            })
            .then(response => response.json())
            .then(json => console.log("added prize" , json))
    }

    render() {
        const {opponents, myTurn, getAttacked, opponentHealth, currentUser, opponentWave, increaseOpponent} = this.props
        console.log('enemy gundam props :>> ', this.props);
        console.log('current user :>> ', currentUser);
        let attack = Math.floor(Math.random() * (500 - 200 + 1)) + 25
        let currentOpponent = opponents[opponentWave]

        return (
            <div className="split left">
                <>
                <h1 >{currentOpponent.name}</h1>
                <img className="image200" src={currentOpponent.img_url} alt="nothing to see here"/>
                <p >Enemy Health: {opponentHealth}</p>
                </>

                {myTurn ? null : 
                opponentHealth > 0 ?
                setTimeout(() => getAttacked(currentOpponent.attack), 3500)

                :
                this.rewardUser()
                // this.props.history.push('/profile')
                 }
                
            </div>
        );
    }
}

export default EnemyGundam;
