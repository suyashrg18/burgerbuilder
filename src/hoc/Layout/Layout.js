import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerHandler = () => {
        this.setState(
            {
                showSideDrawer: false
            }
        )
    }

    showDrawerHandler = () => {
        this.setState(
            {
                showSideDrawer: true
            }
        )
    }

    render() {
        return (
            <Auxilliary>
                <Toolbar
                    onclick={this.showDrawerHandler}
                    isAuthenticated={this.props.isAuth} />
                <SideDrawer
                    showBD={this.state.showSideDrawer}
                    close={this.sideDrawerHandler}
                    isAuthenticated={this.props.isAuth} />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxilliary>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);