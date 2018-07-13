import React, { Component, Fragment } from 'react';

import Modal from '../../components/ui/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = { error : null }

        componentWillMount() {
            if (!axios) {
                return;
            }

            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error : null });
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => this.setState({ error }));
        }

        componentWillUnmount() {
            if (!axios) {
                return;
            }
            
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error : null });
        }

        render() {
            const { error } = this.state;

            return (
                <Fragment>
                    <Modal show={error} modalClosed={this.errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    };
};

export default withErrorHandler;