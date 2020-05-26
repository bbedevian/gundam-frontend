import React, { Component } from "react";
import ProfileGundam from "./ProfileGundam";
import BattleFieldGundam from "./BattleFieldGundam";
import EnemyGundam from "./EnemyGundam";

class BattleField extends Component {
  componentDidMount() {
    this.props.getUserStuff();
  }

  state = {
    selectedGundam: null,
    opponentGundam: null,
    userHealth: null,
    userAtt: null,
    opponentHealth: null,
    myTurn: true,
  };

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
        <img src={gundam.img_url} alt={"this is a gundam"} />
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
      userAtt: gundam.attack + this.totalHpBonus(gundam.id)
    });
  };

  setGundamHp = (gundam) => {
      this.setState({
          userHealth: gundam.hp + this.totalHpBonus()
      })
  }
  attackOpponent = (attackValue) => {
    this.setState({ opponentHealth: this.state.opponentHealth - attackValue });
  };

  getAttacked = (attackValue) => {
    this.setState({ userHealth: this.state.userHealth - attackValue });
  };

  render() {
    const { myTurn, selectedGundam, userAtt, userHealth } = this.state;
    const { getAttacked, attackOpponent } = this;
    console.log("battlefield", this.state)
    return (
      <div>
        {this.state.selectedGundam === null ? (
          this.props.userGundams.map((gundam) => this.showGundam(gundam))
        ) : (
          <>
            <BattleFieldGundam
            selectedGundam={selectedGundam}
            myTurn={myTurn}
            attackOpponent={attackOpponent}
            userAtt={userAtt}
            userHealth={userHealth}
            />
            <EnemyGundam myTurn={myTurn} getAttacked={getAttacked} />
          </>
        )}
      </div>
    );
  }
}

export default BattleField;
