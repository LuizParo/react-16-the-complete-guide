import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

import { ADD_PERSON, REMOVE_PERSON } from '../store/actions';

class Persons extends Component {

    personAddedHandler = (name, age) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name,
            age
        }

        this.props.onPersonAdded(newPerson);
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onPersonRemoved(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    persons : state.persons
});

const mapDispatchToProps = dispatch => ({
    onPersonAdded : newPerson => dispatch({ type : ADD_PERSON, payload : newPerson }),
    onPersonRemoved : personId => dispatch({ type : REMOVE_PERSON, payload : personId })
})

export default connect(mapStateToProps, mapDispatchToProps)(Persons);