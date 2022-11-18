import React, { Component } from 'react'

export default class AdminIngredientsRequest extends Component {
    render() {
        return (
            <div className="mx-2 adminData p-3">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                </div>

            </div>
        )
    }
}
