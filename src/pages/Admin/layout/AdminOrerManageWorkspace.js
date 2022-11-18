import React, { Component } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getAllOrdersbyAdmin, removeUser, updateOrderByAdmin } from '../../../actions/adminAction';
import AdminSearchBar from '../../../components/AdminSearchBar';
import SearchBarComponent from '../../../components/SearchBarComponent';
const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
    },
};
class AdminOrerManageWorkspace extends Component {
    state = {
        modalIsOpen: false,
        detail: [],
        total: '',
        searchBy: ["Order Id", "User"]
    }
    openModal = (id) => {
        // use arrow function (ES6) . it automatic bind 'this' keyword with the class
        // So you don't need to bind manually
        this.setState({
            modalIsOpen: true
        });
        let index = this.props.content.findIndex(item => item.id === id);
        if (index !== -1) {
            this.setState({
                detail: this.props.content[index].orderdetails,

            })
        }
        // chạy hết hàm này component mới render lại , chứ ko phải sau mỗi lần chạy setState

    }
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }
    componentDidMount() {
        this.props.dispatch(getAllOrdersbyAdmin)
    }
    showContentManage = () => {
        return this.props.content?.map((item, index) => {
            return <tr key={index} style={index % 2 === 1 ? { backgroundColor: 'rgb(249, 249, 249)' } : { display: '' }} className="text-center">
                <td>{item.id}</td>
                <td>{item.user?.name}</td>
                <td>{item.user?.id}</td>
                <td>{item.user?.phone}</td>
                <td>
                    <select className="form-select m-auto" key={item.user ? item.id : -1} style={{ width: 120 }} onChange={(e) => {
                        updateOrderByAdmin({ id: item.id, status: e.target.value })
                    }}
                        defaultValue={item.status}
                    >
                        <option value="paid" >PAID</option>
                        <option value="confirmed">CONFIRM</option>
                        <option value="completed">COMPLETED</option>
                    </select>
                </td>
                <td>{"$ " + item.orderdetails?.reduce((total, item, index) => {
                    total = total + item.amount * item.foods.price;
                    return total;
                }, 0)}</td>
                <td className="text-center">
                    <button className="btn btn-success mx-3"
                        onClick={() => { this.openModal(item.id) }}
                    >Detail</button>
                    {/* <button className="btn btn-danger" disabled={item.role !== 'client' ? true : ''}
                        onClick={() => {
                            this.props.dispatch(removeUser(item.id))
                        }}
                    >Remove</button> */}
                </td>
            </tr>
        })
    }
    totalPrice = (detail) => {
        return detail.reduce((total, item, index) => {
            total = total + item.amount * item.foods.price;
            return total;
        }, 0);
    }
    showDetail = () => {
        return <div>
            <div style={{ borderBottom: "3px solid rgb(255, 153, 51)" }} className="pb-3">
                <h2>Order Detail: {"(id: " + this.state.detail.id + ")"}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Food ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.detail?.map((item, index) => {
                            return <tr key={index}>
                                <td>{item.foods.id}</td>
                                <td>{item.foods.name}</td>
                                <td>{item.foods.price}</td>
                                <td>{item.amount}</td>
                                <td>$ {item.amount * item.foods.price}</td>
                            </tr>
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="text-end" ><h3>Total: $ {this.totalPrice(this.state.detail)}</h3></td>
                        </tr>

                    </tfoot>
                </table>
            </div>
            {this.state.detail.order?.map((item, index) => {
                return <div key={index} style={{ borderBottom: "3px solid rgb(255, 153, 51)" }} className="p-2">
                    <h2>Order {"(#Id: " + item.id + ")"}</h2>
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
                            {item.course.map((item, index) => <tr key={index} >
                                <td>{item.name}</td>
                                <td>$ {item.price}</td>
                                <td>{item.soLuong}</td>
                                <td>$ {+item.soLuong * +item.price}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div className="text-end"><span>Total : $ {item.total}</span></div>
                    <div>
                        <p>Type of Service: {item.option}</p>
                        <p>Status: {item.status}</p>
                    </div>
                </div>
            })}

        </div>

    }
    render() {
        return (
            <div className="mx-2 adminData p-3">
                <div className="d-flex justify-content-center">
                    <AdminSearchBar searchBy={this.state.searchBy} message={"Search Order by"} model={'order'} />
                </div>
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>Order ID</th>
                            <th>Order by User</th>
                            <th>UserId</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Total Price:</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showContentManage()}
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="row justify-content-between" >
                        <div className="col-12 text-end">
                            <button className="btn btn-danger" onClick={this.closeModal}>X</button>
                        </div>
                    </div>

                    <div>
                        {this.showDetail()}
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        content: state.managementReducer.content
    }
}
export default connect(mapStateToProps)(AdminOrerManageWorkspace)
