import React from 'react';
import Transition from 'react-transition-group/Transition';

import './Modal.css';

const modal = (props) => (
    <Transition in={props.show} timeout={300} mountOnEnter unmountOnExit>
        {state => {
            const modalClosed = state === 'exiting' ? 'ModalClosed' : null;
            const classes = ['Modal', state === 'entering' ? 'ModalOpen' : modalClosed];

            return (
                <div className={classes.join(' ')}>
                    <h1>A Modal</h1>
                    <button className="Button" onClick={props.closed}>Dismiss</button>
                </div>
            );
        }}
    </Transition>
);

export default modal;