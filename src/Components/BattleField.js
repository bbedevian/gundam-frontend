import React, { Component } from 'react';
import ProfileGundam from './ProfileGundam';
import BattleFieldGundam from './BattleFieldGundam';
import EnemyGundam from './EnemyGundam';

class BattleField extends Component {

    componentDidMount () {
        this.props.getUserStuff()  
        this.getOpponents()
    }

    state = {
        opponents: [],
        selectedGundam: null,
        opponentGundam: null,
        userHealth: null,
        opponentHealth: null,
        myTurn: false
    }

    getOpponents = () => {
        fetch('http://localhost:3000/opponents')
        .then(resp => resp.json())
        .then(opponents => 
            this.setState({ opponents: opponents.map(opponent => this.props.gundams.find(gundam => gundam.id === parseInt(opponent.wave))) }))
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
            userHealth: gundam.hp,
            opponentHealth: this.state.opponents[0].hp
        })
    }

    attackOpponent = (attackValue) => {
        this.setState({ myTurn: !this.state.myTurn,
            opponentHealth: this.state.opponentHealth - attackValue})
    }

    getAttacked = (attackValue) => {
        this.setState({  myTurn: !this.state.myTurn,
            userHealth: this.state.userHealth - attackValue})
    }




    render() {
        console.log('BattleField State :>> ', this.state);
        const {myTurn, opponents, userHealth} = this.state
        const {getAttacked, attackOpponent} = this
        return (
            <div className="battlefield">
                {this.state.selectedGundam === null ? 
                this.props.userGundams.map(gundam => 
                this.showGundam(gundam))
                : 
                <>
                User Health: {userHealth}
                <BattleFieldGundam myTurn={myTurn} attackOpponent={attackOpponent} />
                <EnemyGundam myTurn={myTurn} getAttacked={getAttacked} opponents={opponents}/>
                </>
     }
            </div>
        );
    }
}

export default BattleField;
