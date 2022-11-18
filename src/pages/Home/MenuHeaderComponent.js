import React from 'react'
import { connect } from 'react-redux'
import { getCourseListByType, layDanhSachMonAn } from '../../actions/courseAction'

class MenuHeaderComponent extends React.PureComponent {
    render() {
        return (
            <div className="mt-3 menuBar">
                <div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                onClick={() => {
                                   this.props.dispatch(layDanhSachMonAn)
                                }}
                                className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                onClick={() => {
                                        this.props.dispatch(getCourseListByType('rice'))
                                }}
                                className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Rice</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                             onClick={() => {
                                this.props.dispatch(getCourseListByType('noodle'))
                        }}
                            className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Noodle</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                             onClick={() => {
                                this.props.dispatch(getCourseListByType('drink'))
                        }}
                            className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Drink</button>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
export default connect()(MenuHeaderComponent)