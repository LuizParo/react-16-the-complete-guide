import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Spinner from '../../../components/ui/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your street name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your postal code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your country name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'email',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your email'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        { value : 'fastest', displayValue : 'Fastest' },
                        { value : 'cheapest', displayValue : 'Cheapest' },
                    ]
                },
                value : '',
                valid : true
            }
        },
        formIsValid : false,
        loading : false
    }

    orderHandler = event => {
        event.preventDefault();

        this.setState({ loading : true });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData : formData
        };

        axios.post('/orders.json', order)
            .then(_ => {
                this.setState({ loading : false });
                this.props.history.push('/');
            })
            .catch(_ => this.setState({ loading : false }));
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
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this._checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm : updatedOrderForm, formIsValid });
    }

    _renderInputs() {
        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
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
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>

                <form onSubmit={this.orderHandler}>
                    {this._renderInputs()}

                    <Button buttonType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients : state.ingredients,
    price : state.totalPrice
});

export default connect(mapStateToProps)(withRouter(ContactData));