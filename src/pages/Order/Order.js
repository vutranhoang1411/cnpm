import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllOrder } from '../../actions/courseAction'
import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
    },
};
class Order extends Component {
    state = {
        modalIsOpen: false,
        order: []
    }
    openModal = (id) => {
        // use arrow function (ES6) . it automatic bind 'this' keyword with the class
        // So you don't need to bind manually
        this.setState({
            modalIsOpen: true
        });
        this.getOrderDetail(id)
    }
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    showOrder() {
        let orderList = this.props.order
        return orderList.map((item, index) => {
            return <tr key={item.id}>
                <th>{item.id}</th>
                <th>
                    $ {item.orderdetails.reduce((total, item, index) => {
                        total = total + item.amount * item.foods.price;
                        return total;
                    }, 0)}
                </th>
                <th>{item.status}</th>
                <th><button className="btn btn-success" onClick={() => { this.openModal(item.id) }}>Detail</button></th>
            </tr>
        })
    }
    getOrderDetail = (id) => {
        let orderList = this.props.order;
        let order = orderList.find(item => item.id === id)
        if (order) {
            this.setState({
                order: order
            })

        }
    }
    showOrderDetail = () => {
        let order = this.state.order
        return order.orderdetails?.map((item, index) => {
            return <tr key={index}>
                <td>{item.foods.name}</td>
                <td>$ {item.foods.price}</td>
                <td>{item.amount}</td>
                <td>$ {+item.amount * +item.foods.price}</td>
            </tr>
        })
    }

    componentDidMount() {
        this.props.dispatch(getAllOrder)
    }
    render() {
        return (
            <div className="container-lg mt-5 pt-5">
                <div className="">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        style={customStyles}
                    // className="col-12"
                    >
                        <div className="row justify-content-between" >
                            <h4 className="col-4">Order Detail</h4>
                            <div className="col-4 text-end">
                                <button className="btn btn-danger" onClick={this.closeModal}>X</button>
                            </div>

                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showOrderDetail()}
                            </tbody>
                        </table>
                        <div className="text-end"><span style={{color: 'red',fontSize: 30}}>Total : $ {this.state.order.orderdetails?.reduce((total,item, index)=>{
                                total = total + item.amount*item.foods.price;
                                return total;
                        },0)}</span>

                        </div>
                        <div>
                            <h3>Type of Service: {this.state.order.service}</h3>
                            <h3>Status: {this.state.order.status}</h3>
                        </div>
                    </Modal>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            {this.showOrder()}
                        </thead>

                    </table>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        order: state.orderReducer.orderList
    }
}
export default connect(mapStateToProps)(Order)