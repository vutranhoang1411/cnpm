import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class ErrorMessageComponent extends Component {
    render() {
        return (
            <Fragment>
                {this.props.errorMessage ?
                    < div className={this.props.errorMessage==='successful'?'alert alert-success':'alert  alert-danger'} role="alert">
                        {this.props.errorMessage}
                    </div> : ""
                }
            </Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        errorMessage: state.errorMessageReducers.errorMessage
    }
}
export default connect(mapStateToProps)(ErrorMessageComponent)