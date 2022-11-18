import React, { Component } from 'react'
import { connect } from 'react-redux'
import CurrencyFormat from 'react-currency-format';
import { loginStateChecker, payment, removeCart } from '../../actions/courseAction';
import axios from 'axios';
import { url } from '../../config/setting';
import { history } from '../../models/history';
class Cart extends Component {
    handleOnchange(item) {
        this.props.dispatch(async (dispatch) => {
            dispatch({
                type: 'cap_nhat_soluong',
                data: item
            })
            let token = localStorage.getItem('accessToken');
            try {
                // Call API
                await axios({
                    url: `${url}/course/`,
                    method: 'POST',
                    data: item,
                    headers: {
                        Authorization: token
                    }
                })
            } catch (error) {
                alert(error)
            }

        })
    }

    showCart() {
        return this.props.gioHang.map((item, index) => {
            return <tr key={index}>
                <td className="col-sm-2 col-md-2">
                    <div className="media">
                        <a className="thumbnail pull-left" href="#"> <img className="media-object" src={item.img} alt={item.img} style={{ width: 72, height: 72 }} /> </a>
                    </div></td>
                <td className="col-sm-2 col-md-2">
                    <p>{item.name}</p>
                </td>
                <td className="col-sm-2 col-md-2" style={{ textAlign: 'center' }}>
                    <input
                        defaultValue={item.soLuong}
                        onChange={(e) => {
                            item.soLuong = e.target.value;
                            this.handleOnchange(item)
                        }}
                        type="number" style={{ width: '30%' }} className="form-control" id="exampleInputEmail1" defaultValue={item.soLuong} />
                </td>
                <CurrencyFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'$ '} renderText={value => <td className="col-sm-2 col-md-2 text-center"><strong>{value}</strong></td>} />
                <CurrencyFormat value={item.price * item.soLuong} displayType={'text'} thousandSeparator={true} prefix={'$ '} renderText={value => <td className="col-sm-2 col-md-2 text-center"><strong>{value}</strong></td>} />
                <td className="col-sm-2 col-md-2 text-center">
                    <button type="button" className="btn btn-danger"
                        onClick={() => {
                            this.props.dispatch(removeCart(item.id))
                        }}
                    >
                        <span className="glyphicon glyphicon-remove" /> Remove
                    </button></td>
            </tr>
        })
    }

    totalPrice() {
        return this.props.gioHang.reduce((total, item, index) => {
            total += item.soLuong * item.price
            return total
        }, 0)
    }
    state = {
        error: ''
    }
    render() {
        return (
            <div className="container-lg" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-sm-12 col-md-10 col-md-offset-1">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showCart()}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td className="text-center"><h3>Total</h3></td>
                                    <td className="text-right" colSpan="2">
                                        <CurrencyFormat value={this.totalPrice()} displayType={'text'} thousandSeparator={true} prefix={'$ '} renderText={value => <h3>{value}</h3>} />
                                    </td>
                                </tr>
                                <tr>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    <td> &nbsp; </td>
                                    {/* <td>
                                        <button type="button" className="btn btn-warning w-100">
                                            Back
                                        </button></td> */}
                                    <td>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div>
                            <form className="form-inline" onSubmit={(e) => {
                                e.preventDefault()
                                if (!e.target[0].checked && !e.target[1].checked) {
                                    this.setState({
                                        error: 'please choose your option !!'
                                    })
                                } else if (this.props.gioHang.length === 0) {
                                    this.setState({
                                        error: 'please add courses to cart'
                                    })
                                }
                                else {
                                    let option = '';
                                    if (e.target[0].checked) {
                                        option = e.target[0].value
                                    } else {
                                        option = e.target[1].value
                                    }

                                    this.props.dispatch(payment({ option }))
                                }

                            }}>
                                {/* <div className="form-group"> */}
                                {this.state.error === '' ? '' :
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.error}
                                    </div>
                                }
                                <div>
                                    <h2>Type of Service:</h2>
                                    <div className="form-check">
                                        <input className="form-check-input" value="take away" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Take away
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value="dine in" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Dine in
                                        </label>
                                    </div>
                                </div>

                                <div className="text-end mt-3">
                                    <button className="btn btn-warning mx-3"
                                        style={{ height: 50, color: "#fff" }}
                                        onClick={() => { history.push('/') }}
                                    >Back to menu</button>
                                    <button type="submit" className="btn btn-success"
                                        style={{ width: 100, height: 50 }}
                                    >
                                        <span className={this.props.loading ? 'hideElement' : ''}>PAY NOW</span>
                                        <div className={this.props.loading ? 'd-flex justify-content-center' : 'd-flex justify-content-center hideElement'}>
                                            <div id="loading" className=""></div>
                                        </div>
                                    </button>
                                </div>

                            </form>




                        </div>
                    </div>
                </div >
            </div >

        )
    }
}
const mapStateToProps = (state) => {
    return {
        gioHang: state.gioHangReducer.gioHang.dsMonAn,
        loading: state.loadingReducer.loading
        // soLuong: state.gioHangReducer.gioHang.soLuong
    }
}
export default connect(mapStateToProps)(Cart)