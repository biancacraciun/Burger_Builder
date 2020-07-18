import React from 'react';

import classes from './Input.module.scss';

const input = (props) => {

    let inputElement = null;
    let inputClasses = [classes.InputElement];
    let errorMessage = null;

    if (props.invalid &&  props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        errorMessage = <p className={classes.ErrorMessage}>Please add a valid value!</p>
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} />
            break;
        case('textarea'):
            inputElement = <textarea 
                onChange={props.changed}
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value} />
            break;
        case('select'):
            inputElement = <select 
                onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value}
            >
                {props.elementConfig.options.map(option => {
                    return <option 
                        key={option.value} 
                        value={option.value}> {option.displayValue}
                    </option>
                })}
            </select>
            break;
        default:
            inputElement = <input 
                onChange={props.changed}
                className={inputClasses} 
                {...props.elementConfig}
                value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    )
};

export default input;