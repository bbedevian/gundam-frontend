import React, { useState } from "react";

const ProfileGundam = (props) => {
  const {
    img_url,
    name,
    hp,
    rarity,
    description,
    attack,
    equipped,
    items,
    userItems,
    inventories,
    unequipItem,
  } = props;
  
  
  
  let findItem = (id) => {
    return items.find((item) => item.id === id);
  };
  
  let matchGundam = (id) => {
    console.log("equipped inside profile gundam", equipped)
    return equipped.filter((equip) => equip.gundam_id === id);
  };
  let itemSlots = matchGundam(props.id);
  
  
  const [item1, setItem1] = useState(itemSlots[0].slot1 !== null ? findItem(itemSlots[0].slot1).id : null);
  const [item2, setItem2] = useState(itemSlots[0].slot2 !== null ? findItem(itemSlots[0].slot2).id : null);
  const [item3, setItem3] = useState(itemSlots[0].slot3 !== null ? findItem(itemSlots[0].slot3).id : null);
  const [item4, setItem4] = useState(itemSlots[0].slot4 !== null ? findItem(itemSlots[0].slot4).id : null);

  let getHpBonus = (id) => {
    let item = findItem(id);
    if (item) {
      return item.hp_bonus;
    } else {
      return null;
    }
  };

  let getAttBonus = (id) => {
    let item = findItem(id);
    if (item) {
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
    return <option value={val.id}>{val.name}</option>;
  };

  let slot1Handler = (event) => {
    setItem1(event.target.value);
  };

  let slot2Handler = (event) => {
    setItem2(event.target.value);
  };

  let slot3Handler = (event) => {
    setItem3(event.target.value);
  };

  let slot4Handler = (event) => {
    setItem4(event.target.value);
  };

  let selectDropdown1 = () => {
    let itemsNotInUse = inventories.filter(
      (inventory) => inventory.in_use !== true
    );
    let itemIds = itemsNotInUse.map((inventory) => inventory.item_id);
    return (
      <select onChange={(event) => slot1Handler(event)} name="slots">
        <option>Select an item</option>
        {itemIds.map((id) => optionVal(findItem(id)))}
        {/* {userItems.map((item) => itemsIds.includes(item.id) ?  null : optionVal(item))} */}
      </select>
    );
  };
  let selectDropdown2 = () => {
    let itemsNotInUse = inventories.filter(
      (inventory) => inventory.in_use !== true
    );
    let itemIds = itemsNotInUse.map((inventory) => inventory.item_id);
    return (
      <select onChange={(event) => slot2Handler(event)} name="slots">
        <option>Select an item</option>
        {itemIds.map((id) => optionVal(findItem(id)))}
        {/* {userItems.map((item) => itemsIds.includes(item.id) ?  null : optionVal(item))} */}
      </select>
    );
  };
  let selectDropdown3 = () => {
    let itemsNotInUse = inventories.filter(
      (inventory) => inventory.in_use !== true
    );
    let itemIds = itemsNotInUse.map((inventory) => inventory.item_id);
    return (
      <select onChange={(event) => slot3Handler(event)} name="slots">
        <option>Select an item</option>
        {itemIds.map((id) => optionVal(findItem(id)))}
        {/* {userItems.map((item) => itemsIds.includes(item.id) ?  null : optionVal(item))} */}
      </select>
    );
  };
  let selectDropdown4 = () => {
    let itemsNotInUse = inventories.filter(
      (inventory) => inventory.in_use !== true
    );
    let itemIds = itemsNotInUse.map((inventory) => inventory.item_id);
    return (
      <select onChange={(event) => slot4Handler(event)} name="slots">
        <option>Select an item</option>
        {itemIds.map((id) => optionVal(findItem(id)))}
        {/* {userItems.map((item) => itemsIds.includes(item.id) ?  null : optionVal(item))} */}
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
        {itemSlots[0].slot1 === null ? (
          <>
            <h3>Slot 1 : Empty</h3>
            {selectDropdown1()}
            <button
              onClick={() => {
                props.addItemToSlot1(matchGundam(props.id)[0].id, item1);
                props.toggleItemInUse(props.currentUser.id, item1);
              }}
            >
              Add to slot 1
            </button>
          </>
        ) : (
          <>
            <h3>Slot 1: {findItem(itemSlots[0].slot1).name}</h3>
            <button
              onClick={() => {
                unequipItem(
                  props.currentUser.id,
                  findItem(itemSlots[0].slot1).id
                );
                props.removeItemFromSlot1(matchGundam(props.id)[0].id);
              }}
            >
              Unequip Item
            </button>
          </>
        )}
      </div>
      <div className="item-slot">
        {itemSlots[0].slot2 === null ? (
          <>
            <h3>Slot 2 : Empty</h3>
            {selectDropdown2()}
            <button
              onClick={() => {
                props.addItemToSlot2(matchGundam(props.id)[0].id, item2);
                props.toggleItemInUse(props.currentUser.id, item2);
              }}
            >
              Add to slot 2
            </button>
          </>
        ) : (
          <>
            <h3>Slot 2: {findItem(itemSlots[0].slot2).name}</h3>
            <button
              onClick={() => {
                unequipItem(
                  props.currentUser.id,
                  findItem(itemSlots[0].slot2).id
                );
                props.removeItemFromSlot2(matchGundam(props.id)[0].id);
              }}
            >
              Unequip Item
            </button>
          </>
        )}
      </div>
      <div className="item-slot">
        {itemSlots[0].slot3 === null ? (
          <>
            <h3>Slot 3 : Empty</h3>
            {selectDropdown3()}
            <button
              onClick={() => {
                props.addItemToSlot3(matchGundam(props.id)[0].id, item3);
                props.toggleItemInUse(props.currentUser.id, item3);
              }}
            >
              Add to slot 3
            </button>
          </>
        ) : (
          <>
            <h3>Slot 3: {findItem(itemSlots[0].slot3).name}</h3>
            <button
              onClick={() => {
                unequipItem(
                  props.currentUser.id,
                  findItem(itemSlots[0].slot3).id
                );
                props.removeItemFromSlot3(matchGundam(props.id)[0].id);
              }}
            >
              Unequip Item
            </button>
          </>
        )}
      </div>
      <div className="item-slot">
        {itemSlots[0].slot4 === null ? (
          <>
            <h3>Slot 4 : Empty</h3>
            {selectDropdown4()}
            <button
              onClick={() => {
                props.addItemToSlot4(matchGundam(props.id)[0].id, item4);
                props.toggleItemInUse(props.currentUser.id, item4);
              }}
            >
              Add to slot 4
            </button>
          </>
        ) : (
          <>
            <h3>Slot 4: {findItem(itemSlots[0].slot4).name}</h3>
            <button
              onClick={() => {
                unequipItem(
                  props.currentUser.id,
                  findItem(itemSlots[0].slot4).id
                );
                props.removeItemFromSlot4(matchGundam(props.id)[0].id);
              }}
            >
              Unequip Item
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// add an onclick or on change with state to patch.
export default ProfileGundam;
