import React from 'react'

const ProfileGundam = props => {
    return (
        <div>
            <img src={props.img_url}/>
            <h1>{props.name}</h1>
            <h3>{props.total_hp}</h3>
            <h3>{props.rarity}</h3>
            <p>{props.description}</p>
        </div>
    )
}

export default ProfileGundam;