import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginStateChecker } from '../../actions/courseAction'
import { Redirect, Route } from 'react-router'
class Login extends Component {
    render() {
        if (loginStateChecker()) {
            //check token
            return <Redirect to='/'/>
        } else {
            let { Component, ...restRoute } = this.props
            return (
                <Route {...restRoute} render={
                    () => {
                        return <section className="vh-100 bgLogin">
                            <div className="container-fluid h-custom">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    {/* <LoginImageComponent /> */}
                                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                        <Component />
                                    </div>
                                </div>
                            </div>
                        </section>
                    }
                } />


            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps)(Login)