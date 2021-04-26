import React, { Component } from 'react';
import { connect } from 'react-redux'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import axiosInstance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    checkPriceHandler = (ingridients) => {
        const sum = Object.keys(ingridients)
            .map(igKey => {
                return ingridients[igKey]; // returns  amount of the ingridients
            })
            .reduce((sum, ele) => {
                return sum + ele;  // starts summing with zero and amount amount of the ingridient
            }, 0)

        return sum > 0

    }



    purchasingStateHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseConfirmHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.onInitialiseIngridients()
    }

    render() {
        const disableInfo = {
            ...this.props.igs
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null

        let burger = this.props.error ? <p>Could not load the burger </p> : <Spinner />;
        if (this.props.igs) {
            burger = (
                <Auxilliary>
                    <Burger ingridientsProp={this.props.igs} />

                    <BuildControls
                        ingredientAdded={this.props.onAddIngridient}
                        ingredientRemoved={this.props.onRemoveIngridient}
                        disabled={disableInfo}
                        totalpriceProp={this.props.price}
                        purchasable={this.checkPriceHandler(this.props.igs)}
                        purchasing={this.purchasingStateHandler} />
                </Auxilliary>
            )

            orderSummary = <OrderSummary
                ingridients={this.props.igs}
                cancel={this.purchaseCancelHandler}
                confirm={this.purchaseConfirmHandler}
                totalPrice={this.props.price}
            />
        }



        return (
            <Auxilliary>
                <Modal show={this.state.purchasing}
                    modalClose={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        igs: state.burger.ingridients,
        price: state.burger.totalPrice,
        error: state.burger.error,
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngridient: (igrdnName) => dispatch(actions.addIngridient(igrdnName)),
        onRemoveIngridient: (igrdnName) => dispatch(actions.removeIngridient(igrdnName)),
        onInitialiseIngridients: () => dispatch(actions.initIngridients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));