import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import SearchBarComponent from './SearchBarComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { loginStateChecker } from '../actions/courseAction'
import { logOut } from '../actions/userAction'
import { history } from '../models/history'
import axios from 'axios'
class HeaderComponent extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        let token = localStorage.getItem('accessToken')
            let result = await axios({
                url: 'http://localhost:7000/cart',
                method: 'get',
                headers: {
                    Authorization: token
                }
            })
            let gioHang = result.data.CartDetails.map((item, index) => {
                return { ...item.Food, soLuong: item.amount }
            })
            this.props.dispatch({
                type: 'gio_hang_database',
                data: gioHang
            })

        
    }

    render() {
        return (
            <div className="defaultHeader">
                <div className="container-lg">
                    <div className="row">
                        <div className="logo d-flex align-items-center col-12 col-xl-1 col-lg-2"
                            onClick={() => {
                                if (history.location.pathname !== "/") {
                                    history.push('/')
                                }
                            }}
                        >
                        </div>
                        <SearchBarComponent showText={'Food, drink, ....'} />
                        <div className="login d-flex col-xl-3 col-lg-3 col-md-4 col-sm-4 col-4 justify-content-end">
                            <div className="loginAction">
                                {loginStateChecker() ? <Fragment> <NavLink to="/profile"><span style={{ cursor: 'pointer' }} className="btn-login">{localStorage.getItem('name')}</span></NavLink>  <p onClick={() => {
                                    logOut()
                                }} className="logOut">Log out</p></Fragment> :
                                    <NavLink to="/login" className="btn-login"> Login </NavLink>}

                            </div>
                            <div >
                                <span className="px-1"> / </span>
                                <NavLink to={loginStateChecker() ? '/cart' : '/login'}> Cart (<span style={{ color: 'red' }}>{this.props.gioHang.soLuong}</span>) <FontAwesomeIcon color={'#ddd'} icon={faShoppingCart} /></NavLink>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}
const mapDispatchToProps = (state) => {
    return {
        gioHang: state.gioHangReducer.gioHang
    }
}
export default connect(mapDispatchToProps)(HeaderComponent)