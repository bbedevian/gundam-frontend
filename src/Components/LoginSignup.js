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
        this.props.setCurrentUser(user)
        this.props.history.push('/profile')
           //render profile 
        //    alert("Welcome back!")
       } else {
            alert("Seems like we cant find you, try creating an account")
            this.setState({
                isNewUser: true,
                username: ''})
           }   
    }

    createUserGundam = (user) => {
        fetch(`http://localhost:3000/user_gundams`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({user_id: user.id, gundam_id: this.props.gundams.find(gundam => gundam.name === "Strike").id})
                })
                .then(response => response.json())
                .then(json => this.props.setNewUserGundam(json))
                this.props.history.push('/profile')
    }

    createUser = (name) => {
        let newUser = {name: name}
        fetch(`http://localhost:3000/users`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(user =>   
               ( this.props.setCurrentUser(user),
                this.createUserGundam(user))
                
            )
    
    }

    render() {
        let { isNewUser, username } = this.state
        return (
             <div className="welcome">
                 <div className="login">
                <h1 style={{fontSize:"50px"}}>{isNewUser ? 'Sign Up' : 'Login'}</h1>
                { isNewUser ? this.renderSignup() : this.renderLogin() }
                <button className="login-button" type="submit" onClick={ isNewUser ? () => this.createUser(username) : this.handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}

export default LoginSignup;
