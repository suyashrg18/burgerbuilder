import React, { Component } from 'react';
import { connect } from 'react-redux'
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button'
import axiosInstance from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorhandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '.././../../store/actions/index'
class ContactData extends Component {
    state = {

        oderForm: {

            custName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
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
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
                touched: false
            },

            landmark: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Landmark'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
                touched: false
            },

            building: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Building name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
                touched: false
            },

            paymethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'upi', displayValue: 'UPI' },
                        { value: 'creit card', displayValue: 'Credit Card' },
                        { value: 'debit card', displayValue: 'Debit Card' },
                        { value: 'cash', displayValue: 'Cash' },
                    ]
                },
                value: 'UPI',
                validation: {},
                isValid: true,
            }

        },
        formIsValid: false,
        loading: false
    }

    checkIsValid = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let key in this.state.oderForm) {
            formData[key] = this.state.oderForm[key].value;
        }
        const order = {
            ingridients: this.props.igs,
            totalPrice: this.props.price,
            orderData: formData
        }
        this.props.orderTheBurger(order, this.props.token)


    }


    inputHandler = (event, inputId) => {
        const updatedOrderForm = {
            ...this.state.oderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputId]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.isValid = this.checkIsValid(updateFormElement.value, updateFormElement.validation)
        updateFormElement.touched = true
        updatedOrderForm[inputId] = updateFormElement
        let formisvalid = true;
        for (let inputid in updatedOrderForm) {
            formisvalid = updatedOrderForm[inputid].isValid && formisvalid
        }
        this.setState(
            {
                oderForm: updatedOrderForm,
                formIsValid: formisvalid

            }
        )
    }


    render() {
        const formElementarray = [];
        for (let key in this.state.oderForm) {
            formElementarray.push({
                id: key,
                config: this.state.oderForm[key]
            })
        }

        let formElement = formElementarray.map(
            formElem => {
                return (
                    <Input
                        key={formElem.id}
                        inputtype={formElem.config.elementType}
                        elementConfig={formElem.config.elementConfig}
                        value={formElem.config.value}
                        inValid={!formElem.config.isValid}
                        shouldValidate={formElem.config.validation}
                        touched={formElem.config.touched}
                        changed={(event) => { this.inputHandler(event, formElem.id) }} />
                )

            }
        )


        let form = (<form onSubmit={this.orderHandler}>
            {formElement}
            <Button btnType="Success" disable={!this.state.formIsValid}>CONTINUE</Button>
        </form>);

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter details for your burger order</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        igs: state.burger.ingridients,
        price: state.burger.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token
    };
}

const mapDispatchToProp = dispatch => {
    return {
        orderTheBurger: (orderData, token) => dispatch(orderActions.handleBurgerPurchase(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(withErrorhandler(ContactData, axiosInstance));