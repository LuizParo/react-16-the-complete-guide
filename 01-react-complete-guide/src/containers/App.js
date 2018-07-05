import React, { PureComponent } from 'react';

import Cockpit from '../components/Cockpit/Cockpit';
import Persons from '../components/Persons/Persons';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

import classes from './App.css';

export const AuthContext = React.createContext(false);

class App extends PureComponent {

    constructor(props) {
        super(props);
        console.log('[App.js] Inside constructor', props);
    }

    // ======= COMPONENT CREATION LIFECYCLE HOOKS =======
    // Discouraged by React 16+
    componentWillMount() {
        console.log('[App.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[App.js] Inside componentDidMount()');
    }

    // ======= COMPONENT UPDATING LIFECYCLE HOOKS =======
    // Discouraged by React 16+
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE App.js] Inside componentWillReceiveProps()', nextProps);
    }

    // Done automatically by extending PureComponent. It checks all the props/state with their previous versions.
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE App.js] Inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextState.persons !== this.state.persons ||
    //         nextState.showPersons !== this.state.showPersons;
    // }

    // Discouraged by React 16+
    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE App.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    // React 16+ - Called when the props change. It's used to merge the props with the state.
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('[UPDATE App.js] Inside getDerivedStateFromProps()', nextProps, prevState);
        return prevState;
    }

    // React 16+ - Called whenever the DOM gets updated.
    getSnapshotBeforeUpdate() {
        console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate()');
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
        showPersons : false,
        toggleClicked : 0,
        authenticated : false
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
        this.setState((prevState, props) => {
            return {
                showPersons : !doesShow,
                toggleClicked : prevState.toggleClicked + 1
            };
        });
    }

    loginHandler = () => {
        this.setState({ authenticated : true });
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
            <Aux>
                <button onClick={() => this.setState({ showPersons : true })}>Show Persons</button>

                <Cockpit appTitle={this.props.title}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                    login={this.loginHandler} />

                    <AuthContext.Provider value={this.state.authenticated}>
                        {persons}
                    </AuthContext.Provider>
            </Aux>
        );
    }
}

export default withClass(App, classes.App);
