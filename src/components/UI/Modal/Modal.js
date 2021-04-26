import React, { Component } from 'react';
import classes from './Modal.css'
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    UNSAFE_componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return (
            <Auxilliary>
                <Backdrop show={this.props.show} click={this.props.modalClose} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>{this.props.children}</div>
            </Auxilliary>
        )
    }
}


export default Modal;