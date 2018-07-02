import React, { Component } from 'react';

import Person from './Person/Person';

export default class Persons extends Component {

    render() {
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