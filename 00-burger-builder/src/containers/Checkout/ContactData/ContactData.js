import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input/Input';
import Spinner from '../../../components/ui/Spinner/Spinner';

import { purchaseBurger } from '../../../store/actions';

import { checkValidity, updateObject } from '../../../shared/utility';

import axios from '../../../axios-orders';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

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
                value : 'fastest',
                valid : true
            }
        },
        formIsValid : false
    }

    orderHandler = event => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const formElement = this.state.orderForm[inputIdentifier];

        const updatedFormElement = updateObject(formElement, {
            value : event.target.value,
            valid : checkValidity(event.target.value, formElement.validation),
            touched : true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedFormElement
        });

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
        if (this.props.loading) {
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
    ingredients : state.burgerBuilder.ingredients,
    price : state.burgerBuilder.totalPrice,
    loading : state.order.loading,
    token : state.auth.token,
    userId : state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger : (order, token) => dispatch(purchaseBurger(order, token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withErrorHandler(ContactData, axios)));