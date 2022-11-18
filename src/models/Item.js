import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { addToCart } from '../actions/courseAction'

class Item extends Component {
    render() {
        let { name, id, price, img } = this.props.item
        return (
            <div className="wrapper">
                <div className="row g-1">
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div className="text-center" style={{ width: '100%', height: 200, overflow: 'hidden' }}> <img className="foodImg" src={img} alt={img} /> </div>


                        <div className="product-details p-2">
                            <span>{name}</span>
                            <span className="font-weight-bold d-block itemPrice">$ {price}</span>
                            {/* <div className="buttons d-flex flex-row">
                                <div className="cart"></div> <button className="btn btn-success cart-button btn-block"><span className="dot">1</span>Add to cart
                                </button>
                            </div> */}
                            <div className="addToCart text-center">
                                <button className="btn btn-warning w-100"
                                    onClick={() => {
                                        this.props.dispatch(addToCart({ name, id, price, img, soLuong: 1 }, this.props.history))
                                    }}
                                >
                                    <FontAwesomeIcon icon={faShoppingCart}
                                        className="mx-2" />
                                    Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default connect()(Item)
