import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    orders: [],
    loading: false,
    orderComplete: false
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        orderId: action.id,
        orderData: action.orderDetails
    }
    const updatedState = {
        orders: state.orders.concat(newOrder),
        loading: false,
        orderComplete: true
    }
    return updateObject(state, updatedState)
}

const purchaseBurgerFail = (state, action) => { return updateObject(state, { loading: false }); }

const purchaseBurgerStart = (state, action) => { return updateObject(state, { loading: true }); }

const purchaseBurgerInit = (state, action) => { return updateObject(state, { orderComplete: false, loading: false }); }

const fetchOrderInit = (state, action) => { return updateObject(state, { loading: true }); }

const fetchOrderSuccess = (state, action) => { return updateObject(state, { loading: false, orders: action.orders }); }

const fetchOrderFail = (state, action) => { return updateObject(state, { loading: false }); }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state, action);
        case actionTypes.FETCH_ORDER_INIT: return fetchOrderInit(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state, action);
        default: return state;
    }

}

export default reducer;