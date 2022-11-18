import React, { Component } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { getAllUsers, removeUser } from '../../../actions/adminAction';
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
class AdminUserManageWorkspace extends Component {
    state = {
        modalIsOpen: false,
        detail: {},
        searchBy: ["Name","Id","Email","Phone"]
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
                detail: this.props.content[index]
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
        this.props.dispatch(getAllUsers)
    }
    showContentManage = () => {
        return this.props.content?.map((item, index) => {
            return <tr key={index} style={index % 2 === 1 ? { backgroundColor: 'rgb(249, 249, 249)' } : { display: '' }} className="text-center">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td className="text-center">
                    <button className="btn btn-success mx-3"
                        onClick={() => { this.openModal(item.id) }}
                    >Detail</button>
                    <button className="btn btn-danger" disabled={item.role !== 'client' ? true : ''}
                        onClick={ async () => {
                             await removeUser(item.id,item.active);
                             this.props.dispatch(getAllUsers)
                        }}
                        style={{width: '80px'}}
                    >{item.active?'Block':'Unblock'}</button>
                </td>
            </tr>
        })
    }
    showDetail = () => {
        return <div>
            <div style={{ borderBottom: "3px solid rgb(255, 153, 51)" }} className="pb-3">
                <h2>Personal Information</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.detail.id}</td>
                            <td>{this.state.detail.name}</td>
                            <td>{this.state.detail.email}</td>
                            <td>{this.state.detail.phone}</td>
                            <td>{this.state.detail.role}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            {this.state.detail.order?.map((item, index) => {
                return <div key={item.id} style={{ borderBottom: "3px solid rgb(255, 153, 51)" }} className="p-2">
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
                            {item.orderdetails.map((item, index) => <tr key={index} >
                                <td>{item.foods.name}</td>
                                <td>$ {item.foods.price}</td>
                                <td>{item.amount}</td>
                                <td>$ {+item.amount * +item.foods.price}</td>
                            </tr>)}
                        </tbody>
                    </table>
                    <div className="text-end"><span>Total : $ {item.orderdetails?.reduce((total,item,index)=>{
                            total = total + item.amount*item.foods.price;
                            return total;
                    },0)}</span></div>
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
                <AdminSearchBar searchBy={this.state.searchBy} message={"Search User by"} model={"user"}/>
                </div>
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
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
export default connect(mapStateToProps)(AdminUserManageWorkspace)