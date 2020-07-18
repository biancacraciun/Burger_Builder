import React from 'react'; 

import classes from './Style/Backdrop.module.scss';

const backdrop = (props) => {
    return props.show ? <div className={classes.Backdrop} onClick={props.clicked}/> : null;
}

export default backdrop;