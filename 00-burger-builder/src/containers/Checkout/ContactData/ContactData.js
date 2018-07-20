import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                value : ''
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your street name'
                },
                value : ''
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your postal code'
                },
                value : ''
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your country name'
                },
                value : ''
            },
            email : {
                elementType : 'email',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your email'
                },
                value : ''
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        { value : 'fastest', displayValue : 'Fastest' },
                        { value : 'cheapest', displayValue : 'Cheapest' },
                    ]
                },
                value : ''
            }
        },
        loading : false
    }

    orderHandler = event => {
        event.preventDefault();

        this.setState({ loading : true });

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price
        };

        axios.post('/orders.json', order)
            .then(_ => {
                this.setState({ loading : false });
                this.props.history.push('/');
            })
            .catch(_ => this.setState({ loading : false }));
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>

                <form>
                    <Input elementType="..." elementConfig="..." value="..." />
                    <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                    <Input inputtype="input" type="text" name="street" placeholder="Your street name" />
                    <Input inputtype="input" type="text" name="postalCode" placeholder="Your postal code" />

                    <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default withRouter(ContactData);