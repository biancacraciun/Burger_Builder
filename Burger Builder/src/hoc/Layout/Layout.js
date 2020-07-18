import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Style/Layout.module.scss';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => { // setting the state when it depends on the old state
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                
                <main className={classes.Content}>
                    {this.props.children}
                    {console.log(this.props.children)}
                </main>
            </Aux>
        );

    }   
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
;}

export default connect(mapStateToProps)(Layout);