import React from 'react';

import Logo from '../../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../../hoc/Auxiliary';

import classes from './Style/SideDrawer.module.scss'

const sideDrawer = (props) => {
    let attachedClassed = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachedClassed = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClassed.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
};

export default sideDrawer;