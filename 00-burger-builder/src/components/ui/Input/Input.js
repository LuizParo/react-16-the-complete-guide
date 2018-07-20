import React from 'react';

import classes from './Input.css';

const _renderInput = props => (
    <input className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />
);

const _renderTextArea = props => (
    <textarea className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />
);

const _renderSelect = props => (
    <select className={classes.InputElement} value={props.value}>
        {
            props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ))
        }
    </select>
);

const Input = props => {
    let inputElement = null;

    switch(props.elementType) {
        case 'input':
            inputElement =  _renderInput(props);
            break;

        case 'textarea':
            inputElement = _renderTextArea(props);
            break;

        case 'select':
            inputElement = _renderSelect(props);
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