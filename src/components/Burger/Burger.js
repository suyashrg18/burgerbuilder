import React from 'react';
import BurgerIngridients from '../../components/Burger/BurgerIngridients/BurgerIngridients'
import classes from './Burger.css'

const burger = (props) => {

   let transformedIGs = Object.keys(props.ingridientsProp).map(
        igKey => {

            return [
                ...Array(props.ingridientsProp[igKey])
            ].map(
                (_, i) => {
                    return <BurgerIngridients key={igKey + i} type={igKey} />
                }
            )

        }
    ).reduce(
        (arr, el) => {
            return arr.concat(el)
        }, [])


    if (transformedIGs.length === 0) {
        transformedIGs = <p>
            Please add ingridients to the burger
            </p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngridients type="breadTop" />
            {transformedIGs}
            <BurgerIngridients type="breadBottom" />
        </div>
    )
}
export default burger;