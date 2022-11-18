import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { loginStateChecker } from '../actions/courseAction';
import AdminLogin from '../pages/Admin/layout/AdminLogin';
import AdminMenuComponent from '../pages/Admin/Admin'

export default class AdminTemplate extends Component {
    render() {
        let { Component, ...restRoot } = this.props
        return (
            <Switch>
                <Route exact path="/admin/login">
                    <AdminLogin />
                </Route>
                <Route {...restRoot} render={() => {
                    if (!loginStateChecker()) {
                        return <Redirect to="/admin/login" />
                    } else {
                        return <div>
                            <AdminMenuComponent />
                            {/* <Component/> */}
                        </div>
                    }
                }
                }>
                </Route>
            </Switch>
        )
    }
}