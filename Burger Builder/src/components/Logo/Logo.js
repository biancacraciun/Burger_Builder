import React from 'react'; 

import burgerLogo from '../../assets/images/Logo.png';
import classes from './Style/Logo.module.scss';

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="Burger" />
        </div>
    )
}

export default logo;
