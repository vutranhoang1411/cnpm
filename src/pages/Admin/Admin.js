import React, { Component } from 'react'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
// import SearchBarComponent from './SearchBarComponent'

import AdminUserManageWorkspace from './layout/AdminUserManageWorkspace'
import { connect } from 'react-redux'
import AdminOrerManageWorkspace from './layout/AdminOrerManageWorkspace'
import FoodManageWorkSpace from './layout/FoodManageWorkSpace'
import AdminHeader from './layout/AdminHeader'
import { loginStateChecker } from '../../actions/courseAction'
import { history } from '../../models/history'

class AdminMenuComponent extends Component {
    state = {
        users: true,
        orders: false,
        food: false,
        ingredients: false
    }
    changeStateButton = (name) => {
        this.setState({
            users: false,
            orders: false,
            food: false,
            ingredients: false

        })
        this.setState({
            [name]: true
        })
    }
    reDirect = () => {
        if (!loginStateChecker()) history.push('/admin/login')
    }
    render() {
        { this.reDirect() }
        return (<div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-2 px-0 bg-light">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                        <div className="d-flex justify-content-center w-100 mt-3 pb-2">
                            <NavLink to="/"><img src={'./imgs/logo.png'} alt={'./imgs/logo.png'} /></NavLink>
                        </div>

                        <ul className="nav nav-pills flex-column  align-items-center align-items-sm-start d-block w-100" id="menu">
                            <li
                                className={this.state.users ? "menuActive adminMenu" : "adminMenu " + "nav-item"}
                            >
                                <a className=" nav-link align-middle px-0 menuEffect "
                                    onClick={() => {
                                        this.changeStateButton("users")
                                    }}
                                >
                                    <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Users</span>
                                </a>
                            </li>
                            <li className={this.state.orders ? "menuActive adminMenu" : "adminMenu"}>
                                <a data-bs-toggle="collapse" className="nav-link px-0 align-middle menuEffect"
                                    onClick={async () => {
                                        this.changeStateButton("orders")

                                    }}
                                >
                                    <i className="fs-4 bi-speedometer2" /> <span className="ms-1 d-none d-sm-inline">Orders</span> </a>
                            </li>
                            <li className={this.state.food ? "menuActive adminMenu" : "adminMenu"}>
                                <a data-bs-toggle="collapse" className="nav-link px-0 align-middle menuEffect"
                                    onClick={async () => {
                                        this.changeStateButton("food")

                                    }}
                                >
                                    <i className="fs-4 bi-speedometer2" /> <span className="ms-1 d-none d-sm-inline">Food</span> </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-10 py-3">
                    <AdminHeader />
                    {this.state.users ? <AdminUserManageWorkspace /> : this.state.orders ? <AdminOrerManageWorkspace /> :  <FoodManageWorkSpace />}

                </div>
            </div>
        </div>

        )
    }
}
export default connect()(AdminMenuComponent)