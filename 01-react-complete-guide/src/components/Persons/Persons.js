import React, { Component } from 'react';

import Person from './Person/Person';

export default class Persons extends Component {

    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
    }

    // ======= COMPONENT CREATION LIFECYCLE HOOKS =======
    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
    }

    // ======= COMPONENT UPDATING LIFECYCLE HOOKS =======
    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps()', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
        return nextProps.persons !== this.props.persons;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] Inside componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] Inside componentDidUpdate()');
    }

    render() {
        console.log('[Persons.js] Inside render()');

        return this.props.persons.map((person, index) => (
            <Person
                key={person.id}
                name={person.name}
                age={person.age}
                click={() =>  this.props.clicked(index)}
                changed={event =>  this.props.changed(event, person.id)} />
        ));
    }
}