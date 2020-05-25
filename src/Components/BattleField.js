import React, { Component } from 'react';
import ProfileGundam from './ProfileGundam';
import BattleFieldGundam from './BattleFieldGundam';
import EnemyGundam from './EnemyGundam';

class BattleField extends Component {

    componentDidMount () {
        this.props.getUserStuff()  
    }

    state = {
        selectedGundam: null,
        opponentGundam: null,
        userHealth: null,
        opponentHealth: null,
        myTurn: true
    }

    showGundam = (gundam) => {
         return (   <> 
            <img src={gundam.img_url} alt={"this is a gundam"}/>
            <h3>{gundam.name}</h3>
            <button onClick={() => this.selectGundam(gundam)} >Select This Gundam</button>
            </> )
            
    }

    selectGundam = (gundam) => {
        this.setState({
            selectedGundam: gundam,
            userHealth: gundam.totalhp })
    }

    attackOpponent = (attackValue) => {
        this.setState({ opponentHealth: this.state.opponentHealth - attackValue})
    }

    getAttacked = (attackValue) => {
        this.setState({ userHealth: this.state.userHealth - attackValue})
    }




    render() {
        const {myTurn} = this.state
        const {getAttacked, attackOpponent} = this
        return (
            <div>
                {this.state.selectedGundam === null ? 
                this.props.userGundams.map(gundam => 
                this.showGundam(gundam))
                : 
                <>
                <BattleFieldGundam myTurn={myTurn} attackOpponent={attackOpponent} />
                <EnemyGundam myTurn={myTurn} getAttacked={getAttacked}/> 
                </>
     }
            </div>
        );
    }
}

export default BattleField;
