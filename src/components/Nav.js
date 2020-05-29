import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = props => {
    
    return (
        <div className="nav-bar">
            {/* <Link to="/">Home</Link> */}
            <Link className="nav-item" to="/profile">To Profile</Link>
            <Link className="nav-item" to="/shop">To Shop</Link>
            <Link className="nav-item" to="/battlefield">Battlefield</Link>      
        </div>
    )
}
  
export default Nav;
