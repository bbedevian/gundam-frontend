import React, { Component } from 'react';

class LoginSignup extends Component {
    state = {
        isNewUser: false,
        username: '',
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    renderLogin = () => {
        const { username } = this.state;
        return (
            <>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
            </>
        )
    }

    renderSignup = () => {
        const { username } = this.state;
        return (
            <>
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
            </>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault()
       let user = this.props.users.find(user => user.name.toLowerCase() === this.state.username.toLowerCase())
       if (user) {
        this.props.setCurrentUser(user.id)
           //render profile 
           alert("Welcome back!")
       } else {
            alert("Seems like we cant find you, try creating an account")
            this.setState({
                isNewUser: true,
                username: ''})
           }   
    }

    createUser = (name) => {
        let newUser = {name: name, balance: 50}
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(user =>  this.props.setCurrentUser(user.id))
            //then render profile page (maybe user table should have boolean brand new 
            // which if true would instead send them to shop page with instructions
    }

    render() {
        // console.log('Login state :>> ', this.state);
        // console.log('Login props :>> ', this.props);
        let { isNewUser, username } = this.state
        return (
             <div>
                <h3>{isNewUser ? 'Sign Up' : 'Login'}</h3>
                { isNewUser ? this.renderSignup() : this.renderLogin() }
                <button type="submit" onClick={ isNewUser ? () => this.createUser(username) : this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default LoginSignup;
