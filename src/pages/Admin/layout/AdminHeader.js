import React, { Component } from 'react'
import { logOut } from '../../../actions/userAction'

export default class AdminHeader extends Component {
    render() {
        return (
            <div className="adminData m-2 p-2 d-flex justify-content-between">
                <h3>Welcome ! {localStorage.getItem("name")}</h3>
                <button className="btn btn-danger"
                    onClick={logOut}
                >Log out</button>
            </div>
        )
    }
}
