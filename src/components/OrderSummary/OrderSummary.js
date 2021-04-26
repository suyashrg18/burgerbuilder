import React from 'react';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import Button from '../UI/Button/Button'

const orderSummary = (props) => {
    const ingridientsSummary = Object.keys(props.ingridients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey} </span>: {props.ingridients[igKey]}
            </li>
        })
    return (
        <Auxilliary>
            <h3>Your order</h3>
            <p>A delicious burger with following ingridients</p>
            <ul>
                {ingridientsSummary}
            </ul>
            <p><strong>Total price:{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
            <Button btnType="Success" click={props.confirm}>CONFIRM</Button>
        </Auxilliary>
    )
}

export default orderSummary;