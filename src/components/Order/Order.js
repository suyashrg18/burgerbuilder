import React from 'react'
import classes from './Order.css'
const order = (props) => {
    let ingridients = [];

    for (let ingridientName in props.ingridients) {
        ingridients.push({
            amount: props.ingridients[ingridientName],
            ingridient: ingridientName
        })
    }

    const ingridientsItem = ingridients.map(
        ig => {
            console.log()
            return (
                <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'

                    }}
                    key={ig.ingridient}>

                    {ig.ingridient}  ({ig.amount})
                </span>
            )
        }
    )

    return (
        <div className={classes.Order}>
            <p>Igridients : {ingridientsItem}</p>
            <p>price: <strong> USD {Number.parseFloat(props.price).toFixed(2)} </strong></p>
        </div>
    )
}

export default order;