import React from 'react'

const Item = props => {
    const {name} = props
    return (
        <div className="profile-item">
            {/* <img src={img_url} alt={name}/> */}
            <h1>{name}</h1>
            {/* <h3>{hp}</h3>
            <h3>{rarity}</h3>
            <p>{description}</p> */}
        </div>
    )
}

export default Item;