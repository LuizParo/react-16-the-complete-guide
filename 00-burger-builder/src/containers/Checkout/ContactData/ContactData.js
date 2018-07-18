import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';

import Button from '../../../components/ui/Button/Button';
import Spinner from '../../../components/ui/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    }

    orderHandler = event => {
        event.preventDefault();

        this.setState({ loading : true });

        const order = {
            ingredients : this.props.ingredients,
            price : this.props.price,
            customer : {
                name : 'Luiz Paro',
                address : {
                    street : 'Test Street 1',
                    zipCode : '41351',
                    country : 'Brazil'
                },
                email : 'test@test.com'
            },
            deliveryMethod : 'fastest'
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
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street name" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Your postal code" />

                    <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default withRouter(ContactData);