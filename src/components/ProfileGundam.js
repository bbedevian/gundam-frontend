import React from 'react'

const ProfileGundam = props => {
    const {img_url, name, hp, rarity, description, attack, equipped, items} = props

    let matchGundam = (id) => {
        return equipped.filter(equip => equip.gundam_id === id)
    }
    
    let itemSlots = matchGundam(props.id)

    let findItem = (id) => {
        return items.find(item => item.id === id)
    }

    let getHpBonus = (id) => {
        let item = findItem(id)
        if (item !== undefined && null) {
            return item.hp_bonus
        } else {return null}
    }

    let getAttBonus = (id) => {
        let item = findItem(id)
        if (item !== undefined && null) {
            return item.attack_bonus
        } else {return null}
    }

    let totalHpBonus = () => {
        const {slot1, slot2, slot3, slot4 } = itemSlots[0]
       return getHpBonus(slot1) + getHpBonus(slot2) + getHpBonus(slot3) + getHpBonus(slot4)
    }

    let totalAttBonus = () => {
        const {slot1, slot2, slot3, slot4 } = itemSlots[0]
        return getAttBonus(slot1) + getAttBonus(slot2) + getAttBonus(slot3) + getAttBonus(slot4)
    }

    return (
        <div className="profile-gundam">
            <img className="image600" src={img_url} alt={name}/>
            <h1>{name}</h1>
            <h3>Base Hp: {hp}</h3> 
            <h3>Equipment HP+: {totalHpBonus()}</h3>
            <h3>Total HP: {hp + totalHpBonus()}</h3>
            <h3>Base Att: {attack}</h3> 
            <h3>Equipment Att+: {totalAttBonus()}</h3>
            <h3>Total Att: {attack + totalAttBonus()}</h3>
            <h3>{rarity}</h3>
            <p>{description}</p>
            <div className="item-slot">Slot 1: {itemSlots[0].slot1 === null ? "Empty" : findItem(itemSlots[0].slot1)}</div>
            <button>Equip item</button>
            <div className="item-slot">Slot 2: {itemSlots[0].slot2 === null ? "Empty" : findItem(itemSlots[0].slot2)}</div>
            <div className="item-slot">Slot 3: {itemSlots[0].slot3 === null ? "Empty" : findItem(itemSlots[0].slot3)}</div>
            <div className="item-slot">Slot 4: {itemSlots[0].slot4 === null ? "Empty" : findItem(itemSlots[0].slot4)}</div>
        </div>
    )
}

// add an onclick or on change with state to patch. 
export default ProfileGundam;