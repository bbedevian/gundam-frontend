import React from 'react'

const Item = props => {
    const {name, price, store, id, buyItem, user, sellItem} = props

    return (
        <div className="item-card" align="right">
            {/* <img src={img_url} alt={name}/> */}
            <h1>{name}</h1>
            {user ? <h2>Value: {price * .5} coins</h2> : <h2>Cost: {price} coins</h2> }
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