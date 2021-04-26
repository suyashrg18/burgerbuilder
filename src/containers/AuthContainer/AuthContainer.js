import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './AuthContainer.css'
import * as actions from '../../store/actions/index'
class AuthContainer extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email address'
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

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 15
                },
                isValid: false,
                touched: false
            }
        },
        isSignup: true
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

    inputHandler = (event, inputId) => {
        const updatedAuthForm = {
            ...this.state.authForm,
            [inputId]: {
                ...this.state.authForm[inputId],
                value: event.target.value,
                touched: true,
                isValid: this.checkIsValid(event.target.value, this.state.authForm[inputId].validation)
            }
        }

        this.setState({
            authForm: updatedAuthForm
        })
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(
            prevState => {
                return { isSignup: !prevState.isSignup };
            }
        )
    }




    render() {
        const formElementarray = [];
        for (let key in this.state.authForm) {
            formElementarray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        let formElement = formElementarray.map((element) => {
            return (
                <Input
                    key={element.id}
                    inputtype={element.config.elementType}
                    value={element.config.value}
                    elementConfig={element.config.elementConfig}
                    inValid={!element.config.isValid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    changed={(event) => { this.inputHandler(event, element.id) }}
                />
            )
        })

        if (this.props.loading) {
            formElement = <Spinner />
        }

        let errorField = null;

        if (this.props.error) {

            errorField = <p>{this.props.error.message}</p>

        }

        let authField = null;

        if (this.props.isAuthenticated) {
            authField = <Redirect to='/' />
        }

        return (
            <div className={classes.AuthContainer}>
                {authField}
                {errorField}
                <form onSubmit={this.submitHandler}>
                    {formElement}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" click={this.switchAuthModeHandler}>{this.state.isSignup ? 'SIGN UP' : 'LOGIN'}</Button>
            </div>

        )
    }
}

const mapStatetoProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUpFlag) => dispatch(actions.authenticateUser(email, password, signUpFlag))
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AuthContainer);