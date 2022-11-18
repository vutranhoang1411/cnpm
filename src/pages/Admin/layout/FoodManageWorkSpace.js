import React, { Component } from 'react'
import Modal from 'react-modal';
import SearchBarComponent from '../../../components/SearchBarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addNewFood, getAllFood, removeFood, updateFood } from '../../../actions/adminAction';
import { connect } from 'react-redux';
import { faEdit, faUpload } from '@fortawesome/free-solid-svg-icons'
import ErrorMessageComponent from '../../../components/ErrorMessageComponent';
import AdminSearchBar from '../../../components/AdminSearchBar';
const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
    },
};
const inputStyle = {

    width: '40%', border: "none", padding: 6

}
class FoodManageWorkSpace extends Component {
    state = {
        modalIsOpen: false,
        detail: [],
        total: '',
        uploadFormIsOpne: false,
        file: '',
        preViewImg: '',
        newImg: {},
        searchBy: ["Name", "Id", "type"]
    }
    showUploadForm = () => {
        this.setState({
            uploadFormIsOpne: true, preViewImg: ''
        })
    }
    closeUploadForm = () => {
        this.setState({
            uploadFormIsOpne: false
        })
        this.props.dispatch({
            type: 'change_message',
            data: ''
        });
        this.props.dispatch(getAllFood)
    }
    showPreviewImg = (file) => {
        if (file) {
            this.setState({
                file: file,
                preViewImg: URL.createObjectURL(file)
            })
        }
    }
    previewNewImg = (foodId, objectURL) => {
        this.setState({
            newImg: { ...this.state.newImg, [foodId]: objectURL }
        })
    }
    onChangeHandle = (Fid, Fkey, Fvalue) => {
        this.props.dispatch({
            type: "value_update",
            data: { Fid, Fkey, Fvalue }
        })
    }
    showContentManage() {
        return this.props.content?.map(item => {
            return <tr key={item.id}>
                {/* <form action=""> */}
                <td>{item.id}</td>
                <td className="text-center" >
                    <div style={{ position: 'relative', width: 150 }} className="manageFoodImg">
                        <img className="foodThumbnail" src={this.state.newImg[item.id] ? this.state.newImg[item.id] : item.img} width={'100%'} height={100} alt="#" />
                        <div className="uploadFoodImg">
                            <label htmlFor={item.id} className="btn btn-success">
                                Upload
                            </label>
                            <input
                                onChange={(e) => {
                                    this.previewNewImg(item.id, URL.createObjectURL(e.target.files[0]))
                                    this.onChangeHandle(item.id, "img", e.target.files[0])
                                }}
                                type="file" name="photo" id={item.id} style={{ visibility: 'hidden' }} />
                        </div>
                    </div>
                </td>
                <td >
                    {/* Vì dùng chung 1 store->content cho cả các mục manage Nên phải dùng key cho input vì default value chỉ khởi tạo 1 lần ko updata lại */}
                    {/* Nếu không dùng key={item.name} nó sẽ hiện thị nội dung input của trang trước */}
                    <input className="focusOuline" type="text" key={item.name} defaultValue={item.name} style={{ ...inputStyle, width: '50%' }}
                        onBlur={(e) => {
                            this.onChangeHandle(item.id, "name", e.target.value);
                        }}
                    />
                    <FontAwesomeIcon icon={faEdit} />
                </td>

                <td className="">
                    $<input type="text" className="focusOuline" style={inputStyle} defaultValue={item.price}
                        onBlur={(e) => {
                            this.onChangeHandle(item.id, "price", e.target.value);
                        }}
                    />
                    <FontAwesomeIcon icon={faEdit} /></td>
                <td className="">
                    <select className="form-select" aria-label="Default select example"
                        value={item.type}
                        onChange={(e) => {
                            this.onChangeHandle(item.id, "type", e.target.value);
                        }}>
                        <option value="rice" >Rice</option>
                        <option value="noodle">Noodle</option>
                        <option value="drink">Drink</option>
                    </select>
                </td>
                <td className="">
                    <input className="focusOuline" style={inputStyle} defaultValue={item.amount}
                        onBlur={(e) => {
                            this.onChangeHandle(item.id, "amount", e.target.value);
                        }}
                    />
                    <FontAwesomeIcon icon={faEdit} />
                </td>
                <td className="">
                    <button className="btn btn-success me-2" onClick={() => {
                        if (window.confirm("Do you want to update the item ?")) {
                            let data = this.props.content.find(food => item.id === food.id)
                            if (data) {
                                updateFood(data)
                            }

                        }
                    }}>Update</button>
                    <button className="btn btn-danger"
                        onClick={async() => {
                            await removeFood(item.id);
                            this.props.dispatch(getAllFood)                        
                        }}
                    >Remove</button>
                </td>
                {/* </form> */}
            </tr>
        })
    }
    componentDidMount() {
        this.props.dispatch(getAllFood)
    }
    render() {
        return (
            <div className="mx-2 adminData p-3">
                <div className="d-flex justify-content-center">
                    <AdminSearchBar searchBy={this.state.searchBy} message={"Search food by"} model={"food"} />
                </div>
                <button className="btn btn-success"
                    onClick={() => {
                        this.showUploadForm();
                    }}
                > <FontAwesomeIcon icon={faPlus} />Add new food</button>
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Image</th>
                            <th className="text-start">Name</th>
                            <th className="text-start">Price</th>
                            <th className="text-start">Type</th>
                            <th className="text-start">Amount</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showContentManage()}
                    </tbody>
                </table>
                <Modal
                    isOpen={this.state.uploadFormIsOpne}
                    style={customStyles}
                >
                    <div className="row justify-content-between" >
                        <div className="col-12 text-end">
                            <button className="btn btn-danger" onClick={this.closeUploadForm}>X</button>
                        </div>
                    </div>
                    <ErrorMessageComponent />
                    <div className="row">
                        <div className="col-6">
                            <form action="" onSubmit={(e) => {
                                e.preventDefault()
                                let values = e.target
                                let data = { name: values[0].value, price: values[1].value, type: values[2].value, amount: values[3].value }
                                this.props.dispatch(addNewFood(this.state.file, data))
                            }} className="">
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                                    <input type="number" className="form-control" />
                                </div>
                                <div>
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="rice">Rice</option>
                                        <option value="noodle">Noodle</option>
                                        <option value="drink">Drink</option>
                                    </select>


                                </div>
                                <div>
                                    <label htmlFor="exampleInputEmail1" className="form-label">In Stock</label>
                                    <input type="number" className="form-control" />
                                </div>
                                <div className="my-2">
                                    <label htmlFor="file-upload" style={{ border: "1px solid #ddd", padding: 5 }}><span><FontAwesomeIcon icon={faUpload} /> Choose a image</span></label>
                                    <input type="file"
                                        id="file-upload" name="foodImg"
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => {
                                            this.showPreviewImg(e.target.files[0])
                                        }}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <button className="btn btn-success" type="submit"

                                >Upload</button>
                            </form>
                        </div>
                        <div className="col-6">
                            <img src={this.state.preViewImg} width="50%" alt="" />
                        </div>
                    </div>



                </Modal>
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        content: state.managementReducer.content
    }
}
export default connect(mapStateToProps)(FoodManageWorkSpace)