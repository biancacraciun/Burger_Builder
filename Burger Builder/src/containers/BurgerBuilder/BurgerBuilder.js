import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Auxiliary';

import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     salad: 0, // 1,
        //     bacon: 0, // 1,
        //     cheese: 0, // 2,
        //     meat: 0 // 2
        // },
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props); // -> acces match, location and history props
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth');
        };
    };

    purchasedCancelHandler = (props) => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        // let query = [];
        // for( let i in this.state.ingredients ){
        //     query.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // query.push('price=' + this.props.price);
        // const queryString = query.join("&");

        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingr
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // the value of each key
        }
        
        let orderSummary = null; 

        // {salad: true, meat: true and so on}
        let burger = (this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />);

        if(this.props.ingr) {
            burger = ( 
                <Aux>
                    <Burger ingredients={this.props.ingr}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ingr)} // property determining whether the button is unlocked 
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    /> 
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingr}
                price={this.props.price}
                purchaseCancelled={this.purchasedCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if(this.state.loader) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasedCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingrName) => dispatch(actions.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(actions.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));