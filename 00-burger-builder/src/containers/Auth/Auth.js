import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/ui/Button/Button';
import Input from '../../components/ui/Input/Input';

import { auth } from '../../store/actions';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your email'
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },

            password : {
                elementType : 'input',
                elementConfig : {
                    type : 'password',
                    placeholder : 'Your password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        }
    };

    submitHandler = event => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
    }

    _checkValidity(value = '', rules = {}) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const inputValue = event.target.value;

        const updatedAuthForm = {
            ...this.state.controls,
            [inputIdentifier] : {
                ...this.state.controls[inputIdentifier],
                value : inputValue,
                valid : this._checkValidity(inputValue, this.state.controls[inputIdentifier].validation),
                touched : true
            }
        };

        this.setState({ controls : updatedAuthForm });
    }

    _renderInputs() {
        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }

        return formElementsArray.map(formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                changed={event => this.inputChangedHandler(event, formElement.id)} />
        ));
    }

    render() {
        return (
            <div>
                <form className={classes.Auth} onSubmit={this.submitHandler}>
                    {this._renderInputs()}
                    <Button buttonType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onAuth : (email, password) => dispatch(auth(email, password))
});

export default connect(
    null,
    mapDispatchToProps
)(withErrorHandler(Auth));