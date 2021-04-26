import React from 'react';
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'
const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Meat',
        type: 'meat'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    }
]
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.totalpriceProp.toFixed(2)}</strong></p>
            {
                controls.map((control) => {
                    return <BuildControl key={control.label}
                        label={control.label}
                        added={() => { props.ingredientAdded(control.type) }}
                        remove={() => { props.ingredientRemoved(control.type) }}
                        disable={props.disabled[control.type]}
                    />
                })
            }
            <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.purchasing}
            >ORDER NOW</button>
        </div>
    )
}
export default buildControls;