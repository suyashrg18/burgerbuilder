import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false

}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    meat: 0.4,
    cheese: 1.3,
    bacon: 0.7
}

const addIngridients = (state, action) => {
    const updatedIngridient = { [action.ingridientType]: state.ingridients[action.ingridientType] + 1 }
    const updatedIngridients = updateObject(state.ingridients, updatedIngridient);
    const updatedState = {
        ingridients: updatedIngridients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingridientType]
    }
    return updateObject(state, updatedState)
}

const removeIngridients = (state, action) => {
    const updatedIngridient_remove = { [action.ingridientType]: state.ingridients[action.ingridientType] - 1 }
    const updatedIngridients_remove = updateObject(state.ingridients, updatedIngridient_remove);
    const updatedState_remove = {
        ingridients: updatedIngridients_remove,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingridientType]
    }
    return updateObject(state, updatedState_remove)
}

const setIngridients = (state, action) => {
    const updatedIngridients_set = {
        salad: action.ingridients.salad,
        bacon: action.ingridients.bacon,
        cheese: action.ingridients.cheese,
        meat: action.ingridients.meat
    }
    const updatedState_set = {
        ingridients: updatedIngridients_set,
        error: false,
        totalPrice: 4
    }
    return updateObject(state, updatedState_set)
}

const fetchIngridientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGRIDIENT: return addIngridients(state, action);
        case actionType.REMOVE_INGRIDIENT: return removeIngridients(state, action);
        case actionType.SET_INGRIDIENTS: return setIngridients(state, action);
        case actionType.FETCH_INGRIDIENTS_FAILED: return fetchIngridientsFailed(state, action);
        default: return state;
    }
};

export default reducer;