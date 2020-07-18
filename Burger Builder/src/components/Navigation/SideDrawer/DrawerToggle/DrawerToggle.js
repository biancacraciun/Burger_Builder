import React from 'react';

import classes from './Style/DrawerToggle.module.scss';

const drawerToggle = (props) => {
    return (
        <div onClick={props.clicked} className={classes.DrawerToggle}>
            <div />
            <div />
            <div />
        </div>
    )
};

export default drawerToggle;