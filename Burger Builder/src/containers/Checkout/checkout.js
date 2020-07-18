import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/checkoutSummary';
import ContactData from '../../containers/Checkout/ContactData/contactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // componentWillMount() {
    //     const extractQuery = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of extractQuery.entries()) {
    //         // ['salad', '1']
    //         if(param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

        if(this.props.ingr) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingr}
                        onCheckoutCancelled={this.onCheckoutCancelled}
                        onCheckoutContinued={this.onCheckoutContinued}/>
                    <Route 
                        path={this.props.match.path + "/contact-data"} 
                        // render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} 
                        component={ContactData}/>
                </div>
            )
        }

        return (
            <div> {summary} </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        // price: state.totalPrice // we don't need price here, we don't use it anywhere
    }
};

export default connect(mapStateToProps)(Checkout);