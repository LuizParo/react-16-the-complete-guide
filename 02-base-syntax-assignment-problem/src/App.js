import React, { Component } from 'react';
import './App.css';

import UserInput from './components/UserInput';
import UserOutput from './components/UserOutput';


class App extends Component {
    state = {
        username : 'default-username'
    }

    usernameChangeHandler = event => {
        this.setState({ username : event.target.value });
    }

    render() {
        return (
            <div className="App">
                <UserInput usernameChangeHandler={this.usernameChangeHandler} username={this.state.username} />

                <UserOutput username={this.state.username} />
                <UserOutput username={this.state.username} />
                <UserOutput username={this.state.username} />
            </div>
        );
    }
}

export default App;
