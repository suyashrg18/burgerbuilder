import * as actionTypes from './actionTypes';
import axiosInstance from '../../axios-orders'

export const addIngridient = (igrdnName) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientType: igrdnName
    }
}


export const removeIngridient = (igrdnName) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientType: igrdnName
    }
}

export const setIngridients = (ingridients) => {
    return {
        type: actionTypes.SET_INGRIDIENTS,
        ingridients: ingridients
    }
}

export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED,
    }
}


export const initIngridients = () => {
    return dispatch => {
        axiosInstance.get('https://react-burger-builder-c91c8-default-rtdb.firebaseio.com/ingridients.json')
            .then(response => {

                dispatch(setIngridients(response.data))
            })
            .catch(err => {
                dispatch(fetchIngridientsFailed())
            })
    }
}