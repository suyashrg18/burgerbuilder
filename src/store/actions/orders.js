import * as actionTypes from './actionTypes'
import axiosInstance from '../../axios-orders'

export const purchaseBurgerSuccess = (orderId, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: orderId,
        orderDetails: order
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const handleBurgerPurchase = (orderdata, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json?auth=' + token, orderdata)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderdata))
            })
            .catch(err => { dispatch(purchaseBurgerFail(err)) })
    }
}


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_INIT
    }
}


export const fetchOrdersSuccess = (ordersData) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: ordersData
    }
}

export const fetchOrdersFailure = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrdersHandler = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const fetchedOrders = []
        axiosInstance.get('/orders.json?auth=' + token)
            .then(response => {
                for (let key in response.data) {
                    fetchedOrders.push({ ...response.data[key], id: key })
                }

                dispatch(fetchOrdersSuccess(fetchedOrders))

            }).catch(err => {
                dispatch(fetchOrdersFailure(err))
            })
    }

}