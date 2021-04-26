import React, { Component } from 'react';
import classes from './BurgerIngridients.css'
import PropTypes from 'prop-types'

class BurgerIngridients extends Component {
    render() {
        let ingridient = null;
        switch (this.props.type) {
            case ('breadBottom'):
                ingridient = <div className={classes.BreadBottom}> </div>
                break;
            case ('breadTop'):
                ingridient =
                    (
                        <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    )
                break;
            case ('meat'):
                ingridient = <div className={classes.Meat}> </div>
                break;
            case ('cheese'):
                ingridient = <div className={classes.Cheese}> </div>
                break;
            case ('salad'):
                ingridient = <div className={classes.Salad}> </div>
                break;
            case ('bacon'):
                ingridient = <div className={classes.Bacon}> </div>
                break;
            default:
                ingridient = null

               
        }

        return ingridient
    }
}

BurgerIngridients.propTypes = {
    type : PropTypes.string.isRequired
}

export default BurgerIngridients