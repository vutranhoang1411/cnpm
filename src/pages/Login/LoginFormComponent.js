import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userLogin } from '../../actions/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/loading.css'
import '../../assets/css/loginForm.css'
class LoginFormComponent extends Component {
    data = {
        email: '',
        password: ''
    }
    handleOnclick() {
        this.props.dispatch(userLogin(this.data))
    }
    render() {
        return (
            <form className="formFade">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                </div>
                <div className="divider d-flex align-items-center my-4 justify-content-center">
                    {/* <h1>Login</h1> */}
                    <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: 200, color: "#ddd", opacity: 0.4 }} />
                </div>
                {this.props.user ?
                    < div className={this.props.user[0] !== "R" ? 'alert  alert-danger' : 'alert alert-success'} role="alert">
                        {this.props.user}
                    </div> : ''
                }

                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" onChange={(value) => {
                        this.data.email = value.target.value;
                    }} />

                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password"
                        onChange={(value) => {
                            this.data.password = value.target.value;
                        }}
                    />

                </div>
                <div className="d-flex justify-content-between align-items-center">
                    {/* Checkbox */}
                    <a href="#!" className="text-body">Forgot password?</a>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                        onClick={() => {
                            this.handleOnclick()
                        }}
                        style={{ width: 150, height: 50 }}
                    >
                     
                        <div className={this.props.loading ? '' : 'hideElement'}>
                            <div id="loading" className=""></div>
                        </div>
                        <span className={this.props.loading ? 'hideElement' : ''}>Login</span>
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to="/register" className="link-danger">Register</NavLink></p>
                </div>
            </form >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loading: state.loadingReducer.loading
    }
}
export default connect(mapStateToProps)(LoginFormComponent)
