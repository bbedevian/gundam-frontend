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
        opponentWave: 0
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
            opponentHealth: this.state.opponents[this.state.opponentWave].hp
        });
    };

    // increaseOpponent = () => {
    //     this.setState({ opponentWave: this.state.opponentWave +1})
    // }


    render() {
        const { myTurn, selectedGundam, userAtt, userHealth, opponents, opponentHealth, opponentWave } = this.state;
        const {currentUser} = this.props
        const { getAttacked, attackOpponent, increaseOpponent } = this;
        console.log("battlefield", this.state)
        return (
            <div>
                {this.state.selectedGundam === null ? 
                   (<><h3>Select Gundam</h3>
                    {this.props.userGundams.map((gundam) => this.showGundam(gundam))}</>)

                 : //once you choose gundam
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
                                getAttacked={getAttacked} opponents={opponents}
                                currentUser={currentUser}
                                opponentWave={opponentWave}
                                // increaseOpponent={increaseOpponent}
                                 />
                                </>
                           :
                        //    console.log("Inside else statement of Battlefield")
                           <Link to='/profile'>
                           <button>
                               To profile page
                           </button>
                         </Link>
                        //    this.props.history.push('/profile')
                            // null //this needs to send you back to profile page or battlefield
                           }
                        </div>
                       )}
            </div>
        )
    }


}


export default BattleField;
