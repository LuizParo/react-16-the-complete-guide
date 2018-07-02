import React, { Component } from 'react';

import Person from './Person/Person';

export default class Persons extends Component {

    constructor(props) {
        super(props);
        console.log('[Persons.js] Inside constructor', props);
    }

    componentWillMount() {
        console.log('[Persons.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] Inside componentDidMount()');
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