import React, { Component } from "react";
import ProfileGundam from "./ProfileGundam";
import BattleFieldGundam from "./BattleFieldGundam";
import EnemyGundam from "./EnemyGundam";
import { Link } from 'react-router-dom';

class BattleField extends Component {

    state = {
        opponents: [],
        selectedGundam: null,
        opponentGundam: null,
        userHealth: null,
        userAtt: null,
        opponentHealth: null,
        myTurn: true,
        startBattle: false,
        opponentWave: 0,
        selectedLevel: null
    };

    componentDidMount() {
        // this.props.getUserStuff()
        this.getOpponents()
    }


    getOpponents = () => {
        fetch('http://localhost:3000/opponents')
            .then(resp => resp.json())
            .then(opponents =>
                this.setState({ opponents: opponents.map(opponent => this.props.gundams.find(gundam => gundam.id === parseInt(opponent.wave))) }))
    }


    matchGundam = (id) => {
        return this.props.equipped.filter((equip) => equip.gundam_id === id);
    };

    findItem = (id) => {
        return this.props.items.find((item) => item.id === id);
    };

    getHpBonus = (id) => {
        let item = this.findItem(id);
        if (item) {
            return item.hp_bonus;
        } else {
            return null;

        }
    };


    getAttBonus = (id) => {
        let item = this.findItem(id);
        if (item) {
            return item.attack_bonus;
        } else {
            return null;

        }
    };

    attackOpponent = (attackValue) => {
        this.setState({
            myTurn: !this.state.myTurn,
            opponentHealth: this.state.opponentHealth - attackValue
        })
    }


    getAttacked = (attackValue) => {
        this.setState({
            myTurn: !this.state.myTurn,
            userHealth: this.state.userHealth - attackValue
        })
    }

    totalHpBonus = (id) => {
        const itemSlots = this.matchGundam(id);
        const { slot1, slot2, slot3, slot4 } = itemSlots[0];
        return (
            this.getHpBonus(slot1) +
            this.getHpBonus(slot2) +
            this.getHpBonus(slot3) +
            this.getHpBonus(slot4)
        );
    };

    toggleBattle = () => {
        this.setState({ startBattle: !this.state.startBattle})
    }


    totalAttBonus = (id) => {
        const itemSlots = this.matchGundam(id);
        const { slot1, slot2, slot3, slot4 } = itemSlots[0];
        return (
            this.getAttBonus(slot1) +
            this.getAttBonus(slot2) +
            this.getAttBonus(slot3) +
            this.getAttBonus(slot4)
        );
    };

    showGundam = (gundam) => {
        return (
            <>
                <img className="image200" src={gundam.img_url} alt={"this is a gundam"} />
                <h3>{gundam.name}</h3>
                <button onClick={() => this.selectGundam(gundam)}>
                    Select This Gundam
        </button>
            </>
        );
    };

    selectGundam = (gundam) => {
        this.setState({
            selectedGundam: gundam,
            userHealth: gundam.hp + this.totalHpBonus(gundam.id),
            userAtt: gundam.attack + this.totalAttBonus(gundam.id),
        });
    };

    rewardUser = () => {
        let prize = (Math.floor(Math.random() * (50 - 25 + 1)) + 25)
        let newLevel = this.props.currentUser.level
        
        if (newLevel < this.state.selectedLevel) {newLevel +=1 } 

        console.log('prize :>> ', prize);
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                balance: this.props.currentUser.balance + prize,
                level: newLevel
            })
            })
            .then(response => response.json())
            .then(updatedUser => 
                (this.props.changeBalance(updatedUser.balance),
                this.props.changeLevel(updatedUser.level))
                )


    }

    // increaseOpponent = () => {
    //     this.setState({ opponentWave: this.state.opponentWave +1})
    // }

    selectLevel = (event) => {
        this.setState({ selectedLevel: parseInt(event.target.id),
            opponentHealth: this.state.opponents[event.target.id -1].hp
        })
    }

    showLevels = (number) => {
        let i = 1
        if (number > 4) {number = 4}
        let buttonsArray =[]
        while (i <= number) {
            buttonsArray.push(<button id={i} onClick={(event) => this.selectLevel(event)}>Level {i}</button>)
            i++
        }
        return buttonsArray
    }


    render() {
        const { myTurn, selectedGundam, userAtt, userHealth, opponents, opponentHealth, changeBalance, startBattle, selectedLevel } = this.state;
        const {currentUser} = this.props
        const { getAttacked, attackOpponent, showLevels, rewardUser } = this;
        console.log("battlefield", this.state)
        let availableLevel = currentUser.level + 1
        return (
            <div>
                {
                startBattle === false ? 
                    selectedGundam === null || selectedLevel === null? 
                    (<>
                        <h3>Select Gundam</h3>
                        {this.props.userGundams.map((gundam) => this.showGundam(gundam))}
                        <h3>Select Level</h3>
                        {showLevels(availableLevel)}
                        </>)
                        : <button onClick={() => this.toggleBattle()}>Start Battle</button>
                 : 
                       ( <div className={"battlefield"}>
                 
                           {opponentHealth > 0 && userHealth > 0 ? 
                           <>
                            <BattleFieldGundam
                                key={selectedGundam.id}
                                selectedGundam={selectedGundam}
                                myTurn={myTurn}
                                attackOpponent={attackOpponent}
                                userAtt={userAtt}
                                userHealth={userHealth}
                            />
                            <EnemyGundam
                                key={selectedGundam.id}
                                myTurn={myTurn}
                                opponentHealth={opponentHealth}
                                changeBalance={changeBalance}
                                getAttacked={getAttacked} opponents={opponents}
                                currentUser={currentUser}
                                selectedLevel={selectedLevel}
                                 />
                                </>
                           :
                      
                        <>
                           <Link to='/profile'>
                           <button onClick={() => rewardUser() && this.toggleBattle()}>
                               To profile page
                           </button>
                         </Link>
                         </>
                           }
                        </div>
                       )}
            </div>
        )
    }


}


export default BattleField;
