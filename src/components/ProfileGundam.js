import React, {useState} from "react";

const ProfileGundam = (props) => {
  const {img_url,name,hp,rarity,description,attack,equipped,items,userItems} = props;

  const [item1, setItem1] = useState(null)

  let matchGundam = (id) => {
    return equipped.filter((equip) => equip.gundam_id === id);
  };

  let itemSlots = matchGundam(props.id);

  let findItem = (id) => {
    return items.find((item) => item.id === id);
  };

  let getHpBonus = (id) => {
    let item = findItem(id);
    if (item !== undefined && null) {
      return item.hp_bonus;
    } else {
      return null;
    }
  };

  let getAttBonus = (id) => {
    let item = findItem(id);
    if (item !== undefined && null) {
      return item.attack_bonus;
    } else {
      return null;
    }
  };

  let totalHpBonus = () => {
    const { slot1, slot2, slot3, slot4 } = itemSlots[0];
    return (
      getHpBonus(slot1) +
      getHpBonus(slot2) +
      getHpBonus(slot3) +
      getHpBonus(slot4)
    );
  };

  let totalAttBonus = () => {
    const { slot1, slot2, slot3, slot4 } = itemSlots[0];
    return (
      getAttBonus(slot1) +
      getAttBonus(slot2) +
      getAttBonus(slot3) +
      getAttBonus(slot4)
    );
  };

  let optionVal = (val) => {
    return (
        <option value={val.id}>{val.name}</option>
    );
  };

  let slot1Handler = (event) => {
      setItem1(event.target.value)
  }

  let selectDropdown = () => {
    return (
      <select onChange={(event)=> slot1Handler(event)} name="slots">
        <option>Select an item</option>
        {userItems.map((item) => optionVal(item))}
      </select>
    );
  };

  return (
    <div className="profile-gundam">
      <img className="image600" src={img_url} alt={name} />
      <h1>{name}</h1>
      <h3>Base Hp: {hp}</h3>
      <h3>Equipment HP+: {totalHpBonus()}</h3>
      <h3>Total HP: {hp + totalHpBonus()}</h3>
      <h3>Base Att: {attack}</h3>
      <h3>Equipment Att+: {totalAttBonus()}</h3>
      <h3>Total Att: {attack + totalAttBonus()}</h3>
      <h3>{rarity}</h3>
      <p>{description}</p>
      <div className="item-slot">
        Slot 1:{" "}
        {itemSlots[0].slot1 === null ? "Empty" : findItem(itemSlots[0].slot1)}
      </div>
      {selectDropdown()}
      <button onClick={()=> props.addItemToSlot1(matchGundam(props.id)[0].id, item1)}>Add to slot</button>
      <div className="item-slot">
        Slot 2:{" "}
        {itemSlots[0].slot2 === null ? "Empty" : findItem(itemSlots[0].slot2)}
      </div>
      {selectDropdown()}
      <button>Add to slot</button>
      <div className="item-slot">
        Slot 3:{" "}
        {itemSlots[0].slot3 === null ? "Empty" : findItem(itemSlots[0].slot3)}
      </div>
      {selectDropdown()}
      <button>Add to slot</button>
      <div className="item-slot">
        Slot 4:{" "}
        {itemSlots[0].slot4 === null ? "Empty" : findItem(itemSlots[0].slot4)}
      </div>
      {selectDropdown()}
      <button>Add to slot</button>
    </div>
  );
};

// add an onclick or on change with state to patch.
export default ProfileGundam;
