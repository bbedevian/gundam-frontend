import React from 'react'

const HpBar = (props) => {
    let percentage = Math.floor(parseInt(props.userHealth)/parseInt(props.userTotalHealth)*100)
    console.log(percentage)
    return (
        <div className="hp-bar">
            <div className="current-hp" style={{ width: `${percentage}%`}}>
                Current HP: {props.userHealth}
            </div>
        </div>
    );
};

export default HpBar