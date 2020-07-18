import React from 'react';

import classes from './Style/Spinner.module.scss';

const spinner = () => {
    return (
        <div className={classes.Loader}>Loading...</div>
    )
};

export default spinner;