import React, { Component } from 'react';

import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';

import classes from './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        console.log('[App.js] Inside constructor', props);
    }

    // ======= COMPONENT CREATION LIFECYCLE HOOKS =======
    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // ======= COMPONENT UPDATING LIFECYCLE HOOKS =======
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE App.js] Inside componentWillReceiveProps()', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE App.js] Inside componentDidUpdate()');
    }

    state = {
        persons : [
            { id : 1, name : 'Max', age : 28 },
            { id : 2, name : 'Manu', age : 29 },
            { id : 3, name : 'Stephanie', age : 26 }
        ],
        otherState : 'some other value',
        showPersons : false
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => person.id === id);

        const person = {...this.state.persons[personIndex]};
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({ persons });
    }

    deletePersonHandler = personIndex => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);

        this.setState({ persons });
    }

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons : !doesShow });
    }

    render() {
        console.log('[App.js] Inside render()');

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <Persons persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler} />
            );
        }

        return (
            <div className={classes.App}>
                <Cockpit appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler} />

                {persons}
            </div>
        );
    }
}

export default App;