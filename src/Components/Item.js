import React from 'react'

const Item = props => {
    const {name, price, store, id, buyItem, user, sellItem, hp_bonus, attack_bonus} = props

    return (
        <div className="item-card" align="right">
            {/* <img src={img_url} alt={name}/> */}
            <p>{name}</p>
            <p>{attack_bonus > 0 ? `ATT: +${attack_bonus}` : null}</p>
            <p>{hp_bonus > 0 ? `HP: +${hp_bonus}` : null}</p>
            {user ? <h2>Value: {price * .5} coins</h2> : null }
            {store ? <h2>Cost: {price} coins</h2> : null }
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