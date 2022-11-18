import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { loginStateChecker } from '../../actions/courseAction'
export default class RightMenuComponent extends Component {
    loginCheck() {
        return loginStateChecker()
    }
    render() {
        return (
            <div className="rightMenu">
                <NavLink to={this.loginCheck() ? '/cart' : '/login'} className="">
                    <FontAwesomeIcon className="cartIcon" icon={faShoppingCart} />
                </NavLink>
                <NavLink to={this.loginCheck() ? '/order' : '/login'} className=" d-block invoiceIcon">
                    <FontAwesomeIcon className="cartIcon " icon={faFileInvoice} />
                </NavLink>
            </div>
        )
    }
}
