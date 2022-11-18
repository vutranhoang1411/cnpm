import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getUserInfor, updateUserInfor } from '../../actions/userAction';
import "./userProfile.css"
class UserProfileComponent extends Component {
    state = {
        name: "",
        phone: "",
        email: "",
        file: "",
        img: "",
        address: "",
        uploadImg: ""
    }
    handleOnchange = (item, value) => {
        this.setState({ [item]: value })
    }
    handleOnsubmit = () => {
        console.log(this.state.name, this.state.phone, this.state.email);
    }
    async componentDidMount() {
        let { name, phone, email, img, address } = await getUserInfor();
        this.setState({ name, phone, email, img, address })
    }
    render() {
        console.log("Props Message:", this.props.message)
        return (
            <div className="centered">
                <div className="row personal-info">
                    <div className="container content clear-fix">
                        <div className="row" style={{ height: '100%' }}>
                            <div className="col-md-12">

                                <div className="container">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            this.props.dispatch(updateUserInfor(this.state.file, { name: this.state.name, phone: this.state.phone, email: this.state.email, address: this.state.address }))

                                        }}
                                    >
                                        <div className="d-flex justify-content-center" >
                                            <div>
                                                <div className="topnav__right-user__image "
                                                    style={{
                                                        width: '200px',
                                                        height: '200px',
                                                        margin: 'auto',
                                                        backgroundImage: `url("${this.state.uploadImg ? this.state.uploadImg : this.state.img}")`,
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat'
                                                    }}>
                                                </div>
                                                <div className="text-center mt-4">
                                                    <label htmlFor="uploadImg" style={{ color: "#000" }} className="btn btn-warning btn-block">
                                                        <input type="upload"
                                                            onChange={(e) => {
                                                                this.handleOnchange("file", e.target.files[0]);
                                                                this.setState({ uploadImg: URL.createObjectURL(e.target.files[0]) })
                                                            }}
                                                            id="uploadImg" accept="image/png, image/jpeg" type="file" name="photo" style={{ display: 'none' }} />
                                                        Upload Image
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">

                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" defaultValue={this.state.name} className="form-control" id="fullName"
                                                onChange={(e) => {
                                                    this.handleOnchange("name", e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" defaultValue={this.state.email} className="form-control" id="email" disabled
                                                onChange={(e) => {
                                                    this.handleOnchange("email", e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass">Address</label>
                                            <input type="text" defaultValue={this.state.address} className="form-control" id="pass"
                                                onChange={(e) => {
                                                    this.handleOnchange("address", e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pass">Phone</label>
                                            <input type="number" defaultValue={this.state.phone} className="form-control" id="pass"
                                                onChange={(e) => {
                                                    this.handleOnchange("phone", e.target.value)
                                                }}
                                            />
                                        </div>
                                        {this.props.message ? < div className='alert  alert-danger' role="alert">
                                            {this.props.message}
                                        </div> : ""}



                                        <div className="row mt-2">
                                            <div className="col-4">
                                                <button type="submit" className="btn btn-warning btn-block"
                                                >Save Changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
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
        message: state.errorMessageReducers.errorMessage
    }
}
export default connect(mapDispatchToProps)(UserProfileComponent)