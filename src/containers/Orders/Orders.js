import React, { Component } from "react";
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axiosInstance from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.ordersInit(this.props.token)

    }
    render() {

        console.log("orders " + JSON.stringify(this.props.orders))
        let ordersComponent = <Spinner />
        if (!this.props.loading) {
            ordersComponent = <div>
                {
                    this.props.orders.map(
                        order => {
                            return (
                                <Order
                                    key={order.id}
                                    ingridients={order.ingridients}
                                    price={+order.totalPrice} />
                            )
                        }
                    )
                }
            </div>
        }
        return ordersComponent
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ordersInit: (token) => dispatch(actions.fetchOrdersHandler(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));