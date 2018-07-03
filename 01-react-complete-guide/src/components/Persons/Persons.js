import React, { PureComponent } from 'react';

import Person from './Person/Person';

export default class Persons extends PureComponent {

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

    // Done automatically by extending PureComponent. It checks all the props/state with their previous versions.
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] Inside shouldComponentUpdate()', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked;
    // }

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