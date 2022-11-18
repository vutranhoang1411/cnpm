import React, { Component } from 'react'
import '../../../assets/css/adminLoginPage.css'
import LoginFormComponent from '../../Login/LoginFormComponent'
export default class AdminLogin extends Component {
    render() {
        return (
            <div className="adminLoginBg">
                <div className="loginAdmin">
                    <LoginFormComponent />
                </div>

            </div>
        )
    }
}
