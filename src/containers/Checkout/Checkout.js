import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Auxilliary from '../../hoc/Auxilliary/Auxilliary'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Checkout extends Component {

   

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.igs) {
            const purchaseRedirect = this.props.orderComplete ? <Redirect to="/" /> : null
            summary = <Auxilliary>
                {purchaseRedirect}
                <CheckoutSummary
                    ingridients={this.props.igs}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </Auxilliary>
        }
        return summary;
    }


}

const mapStateToProps = state => {
    return {
        igs: state.burger.ingridients,
        orderComplete: state.orders.orderComplete
    };
}


export default connect(mapStateToProps)(Checkout);