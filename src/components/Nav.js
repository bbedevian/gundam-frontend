import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = props => {
    
    return (
        <div className="simple-flex-row">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/battlefield">Battlefield</Link>
            <div className="simple-flex-row right-corner">
                {props.currentUserId === null ? 
                <>
                {/* <Link to="/login">Login</Link> */}
                {/* <Link to="/signup">Signup</Link> */}
                </>
                : 
                <> 
                {/* <Link to="/profile">Profile</Link>  */}
                {/* <Link to="/logout">Logout</Link> */}
                </> }
            </div>

            {/* <h1>Home</h1>
            <h1>Shop</h1>
            <h1>Battlefield</h1>
            <div className="simple-flex-row right-corner">
                {props.currentUserId === null ? 
                <>
                <h1>Login</h1>
                <h1>Signup</h1>
                </>
                : 
                <> 
                <h1>Profile</h1> 
                <h1>Logout</h1>
                </> }
            </div> */}
        </div>
    )
}
  
export default Nav;
