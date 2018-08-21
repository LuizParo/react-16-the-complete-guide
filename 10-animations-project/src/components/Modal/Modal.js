import React from 'react';

import './Modal.css';

const modal = (props) => {
    const modalClosed = props.show ==='exiting' ? 'ModalClosed' : null;
    const classes = ['Modal', props.show ==='entering' ? 'ModalOpen' : modalClosed];

    return (
        <div className={classes.join(' ')}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
    );
};

export default modal;