import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { singUp } from '../../actions/userAction'

class RegisterFormComponent extends Component {
    data = {
        email: '',
        name: '',
        phone: '',
        password: ''
    }
    state = {
        error: ''
    }
    handleOnChage = (key, value) => {
        this.data[key] = value
    }
    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                let data = {
                    email: '',
                    name: '',
                    phone: '',
                    password: ''
                }
                data.email = e.target[0].value;
                data.name = e.target[1].value;
                data.phone = e.target[2].value;
                data.password = e.target[3].value;
                this.props.dispatch(singUp(data));
            }} >
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                </div>
                <div className="divider d-flex align-items-center my-4">
                    <h1>Create an Account</h1>
                </div>


                {/* Email input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email:</label>
                    <div className="alert  alert-danger" style={this.props.user ? { display: "block" } : { display: 'none' }}>{this.props.user}</div>
                    <input type="email" id="form3Example3" defaultValue="" className="form-control form-control-lg" />

                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Full Name:</label>
                    <input type="text" defaultValue="" id="form3Example4" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Phone Number:</label>
                    <div className="alert alert-danger" style={this.state.error ? { display: "block" } : { display: "none" }}>{this.state.error}</div>
                    <input type="number" onKeyUp={(e) => {
                        // console.log(e.target.value.length);
                        if (e.target.value.length > 11) {
                            this.setState({
                                error: "Your phone number is not valid !"
                            })
                        }
                    }}
                        defaultValue="" id="form3Example4" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4" >Password:</label>
                    <input type="password" defaultValue="" id="form3Example4" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4" >Repeat Password:</label>
                    <input type="password" defaultValue="" id="form3Example4" className="form-control form-control-lg" />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}

                    >Create an Account</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <NavLink to="/login" className="link-danger">Log in </NavLink></p>
                </div>
            </form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}
export default connect(mapStateToProps)(RegisterFormComponent)