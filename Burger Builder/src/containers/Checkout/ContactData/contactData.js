import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './contactData.module.scss';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    valueType: null
                },
                valid: false,
                touched: false
            },
            town: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Town'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            emailAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                        {
                            value: "",
                            displayValue: 'Choose something',
                            disabled: 'disabled'
                        },
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true
            },
            payMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: "",
                            displayValue: 'Choose something',
                            disabled: true,
                        },
                        {
                            value: 'cash',
                            displayValue: 'Cash'
                        },
                        {
                            value: 'credit-card',
                            displayValue: 'Credit Card'
                        },
                        {
                            value: 'meal-tickets',
                            displayValue: 'Meal Tickets'
                        }
                    ]
                },
                value: 'cash',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if(rules.required) {
            isValid = value.trim() !== "" && isValid;
        } 

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;

        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingr,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }   

    changeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { // clone
            ...this.state.orderForm
        }
        // console.log(updatedOrderForm) 

        const updatedFormElement = { // CD  one level deep clone
            ...updatedOrderForm[inputIdentifier]
        }
        // console.log(updatedFormElement)
        // console.log(inputIdentifier); // inputIdentifier = 'name', 'street', 'zipCode' and so on (key on state object)

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; 
        }

        this.setState({ 
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formArray = []; 

        for (let key in this.state.orderForm) {
            // key: 'name', 'zipcode', 'address' and so on
            formArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formArray.map(item => {
                    return <Input 
                        changed={(event) => this.changeHandler(event, item.id)} // item.id is the identifier
                        key={item.id}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        invalid={!item.config.valid}
                        shouldValidate={item.config.validation}
                        touched={item.config.touched}
                    />
                })}
                <Button 
                    btnType="Success" 
                    disabled={!this.state.formIsValid}
                >Order now</Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>  
        );
    }
};

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, axios));