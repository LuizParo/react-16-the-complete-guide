import React, { Component } from 'react';

import Person from './Person/Person';

import './App.css';

class App extends Component {
    state = {
        persons : [
            { name : 'Max', age : 28 },
            { name : 'Manu', age : 29 },
            { name : 'Stephanie', age : 26 }
        ]
    }

    render() {
        return (
            <div className="App">
                <h1>Hi I'm a Reat App</h1>
                <p>This is really working!</p>
                <button>Switch</button>

                <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
                <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>
                    My Hobbies: Racing
                </Person>
                <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
            </div>
        );
    }
}

export default App;
