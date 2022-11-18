import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import Cart from '../pages/Cart/Cart'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Order from '../pages/Order/Order'
import ClientTemplate from '../templates/ClientTemplate'
import LoginFormComponent from '../pages/Login/LoginFormComponent'
import RegisterFormComponent from '../pages/Register/RegisterFormComponent'
import UserProfileComponent from '../pages/Profile/UserProfileComponent'
import TestRotues from './TestRotues'

export default class UserRoutesComponent extends Component {
    render() {
        return (
            //make routes
            <Switch>
                <ClientTemplate exact path='/' Component={Home} />
                <ClientTemplate exact path="/cart" Component={Cart} />
                <ClientTemplate exact path="/home" Component={Home} />
                <ClientTemplate exact path="/order" Component={Order} />
                <ClientTemplate exact path="/profile" Component={UserProfileComponent} />
                <Login exact path="/login" Component={LoginFormComponent} />
                <Login exact path="/register" Component={RegisterFormComponent} />
            </Switch>
        )
    }
}
