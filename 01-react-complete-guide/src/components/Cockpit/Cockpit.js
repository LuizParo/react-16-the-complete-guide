import React from 'react';

import Aux from '../../hoc/Aux';

import classes from './Cockpit.css';

export default props => {
    const assignedClasses = [];
    let buttonClass = classes.Button;

    if (props.showPersons) {
        buttonClass = [classes.Button, classes.Red].join(' ');
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <Aux>
            <h1>{props.appTitle}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={buttonClass} onClick={props.clicked}>Toggle Persons</button>
        </Aux>
    );
};