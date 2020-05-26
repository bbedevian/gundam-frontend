import React, { Component } from 'react';

class EnemyGundam extends Component {
    render() {
        const {opponents, myTurn, getAttacked} = this.props
        console.log('enemy gundam props :>> ', this.props);
        return (
            <div>
                <>
                <img src={opponents[0].img_url} alt="nothing to see here"/>
                {myTurn ? null : 
                // setTimeout(() => getAttacked(opponents[0].attack), 10000)
                <button onClick={() => getAttacked(opponents[0].attack)}>Attack the user!!</button>
                 }
                 </>
            </div>
        );
    }
}

export default EnemyGundam;
