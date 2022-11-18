import React, { Component } from 'react'
import { Route } from 'react-router'

import HeaderComponent from '../components/HeaderComponent'

export default class ClientTemplate extends Component {
    render() {
        let { Component, ...restRoute } = this.props
        return (
            <Route path={restRoute.location.path}
            render={
                () => {
                    return <div>
                        <HeaderComponent  />
                        <Component/>                      
                    </div>
                }
            } 
            />


        )
    }
}
