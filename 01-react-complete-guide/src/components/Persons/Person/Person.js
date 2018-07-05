import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../../containers/App';
import withClass from '../../../hoc/withClass';

import classes from './Person.css';

class Person extends Component {

    constructor(props) {
        super(props);
        console.log('[Person.js] Inside constructor', props);

        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) {
            this.inputElement.current.focus();
        }
    }

    focus() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[Person.js] Inside render()');

        return (
            <Fragment>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>

                <p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>

                <input type="text" onChange={this.props.changed} value={this.props.name} ref={this.inputElement} />
            </Fragment>
        );
    }
};

Person.propTypes = {
    click : PropTypes.func,
    position : PropTypes.number,
    name : PropTypes.string,
    age : PropTypes.number,
    changed : PropTypes.func
};

export default withClass(Person, classes.Person);