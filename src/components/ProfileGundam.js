import React from 'react'

const ProfileGundam = props => {
    const {img_url, name, hp, rarity, description, attack} = props
    
    // match equipped gundam id with gundam id
    // get the slot item stats through id
    // apply bonus stats

    return (
        <div className="profile-gundam">
            <img src={img_url} alt={name}/>
            <h1>{name}</h1>
            <h3>{hp}</h3>
            <h3>{attack}</h3>
            <h3>{rarity}</h3>
            <p>{description}</p>
        </div>
    )
}

export default ProfileGundam;