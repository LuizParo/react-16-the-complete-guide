import React from 'react';

import classes from './Input.css';

const _renderInput = (props, classes) => (
    <input className={classes.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed} />
);

const _renderTextArea = (props, classes) => (
    <textarea className={classes.join(' ')}
    {...props.elementConfig}
    value={props.value} onChange={props.changed} />
);

const _renderSelect = (props, classes) => (
    <select className={classes.join(' ')} value={props.value} onChange={props.changed} >
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
    let inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case 'input':
            inputElement =  _renderInput(props, inputClasses);
            break;

        case 'textarea':
            inputElement = _renderTextArea(props, inputClasses);
            break;

        case 'select':
            inputElement = _renderSelect(props, inputClasses);
            break;

        default:
            inputElement = _renderInput(props, inputClasses);
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;