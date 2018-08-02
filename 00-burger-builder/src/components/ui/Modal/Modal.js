import React, { Component, Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component {

    // PureComponent would be good also.
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show
            || nextProps.children !== this.props.children;
    }

    render() {
        const style = {
            transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : this.props.show ? '1' : '0'
        };

        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />

                <div className={classes.Modal} style={style}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
};

export default Modal;