import React from 'react';

import classes from './Cockpit.css';

export default props => {
    const assignedClasses = [];
    let buttonClass = '';

    if (props.showPersons) {
        buttonClass = classes.Red;
    }

    if (props.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (props.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi I'm a Reat App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={buttonClass} onClick={props.clicked}>Toggle Persons</button>
        </div>
    );
};