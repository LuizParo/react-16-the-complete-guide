import React from 'react';

import classes from './Input.css';

function _renderInput(props) {
    return <input className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />;
}

function _renderTextArea(props) {
    return <textarea className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />
}

const Input = props => {
    let inputElement = null;

    switch(props.elementType) {
        case 'input':
            inputElement = _renderInput(props);
            break;

        case 'textarea':
            inputElement = _renderTextArea(props);
            break;

        default:
            inputElement = _renderInput(props);
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;