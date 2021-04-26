import React , {Component} from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

class CheckoutSummary extends Component{
    render(){
        return (
            <div className={classes.CheckoutSummary}>
                <h1>Hope your burger tastes well</h1>
                <div style={{ width: '100%', margin: 'auto' }}>
                    <Burger ingridientsProp={this.props.ingridients} />
                </div>
                <Button btnType="Danger" click={this.props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" click={this.props.checkoutContinued}>CONTINUE</Button>
            </div>
        )
   
    }
       
}

export default CheckoutSummary;