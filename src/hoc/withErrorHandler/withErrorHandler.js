import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Auxilliary from '../Auxilliary/Auxilliary'

const withErrorHAndler = (WrappedComponent, axios) => {

    return class extends Component {

        constructor(props) {
            super(props)
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req
            })

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            })
        }

        state = {
            error: null
        }


        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }


        errorConfirmHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            return (
                <Auxilliary>
                    <Modal
                        show={this.state.error}
                        modalClose={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilliary>
            )
        }
    }


}

export default withErrorHAndler