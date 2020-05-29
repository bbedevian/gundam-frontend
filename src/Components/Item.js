import React from 'react'

const Item = props => {
    const {name, price, store, id, buyItem, user, sellItem, hp_bonus, attack_bonus} = props

    return (
        <div className="item-card" align="right">
            {/* <img src={img_url} alt={name}/> */}
            <h2>{name}</h2>
            <h3>{attack_bonus > 0 ? `ATT: +${attack_bonus}` : null}</h3>
            <h3>{hp_bonus > 0 ? `HP: +${hp_bonus}` : null}</h3>
            {user ? <h3>Value: {price * .5} coins</h3> : null }
            {store ? <h3>Cost: {price} coins</h3> : null }
            {/* <h3>{hp}</h3>
            <h3>{rarity}</h3>
            <p>{description}</p> */}

            {/* if viewing in store show buy button  */}
            {store ? <button onClick={() => buyItem(props)} >Buy item</button> : null}
            {user ? <button onClick={() => sellItem(props)} >Sell item</button> : null}

        </div>
    )
}

export default Item;