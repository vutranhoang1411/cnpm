import React, { Component } from 'react'
import "./AdminSearchBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { searchUserBy } from '../actions/adminAction'
import { connect } from 'react-redux'
class AdminSearchBar extends Component {
    state = {
        searchValue: '',
        searchBy: this.props.searchBy[this.props.searchBy.length - 1],
        model: this.props.model

    }
    findItem = () => {
        this.props.dispatch(searchUserBy(this.state))
        this.setState({ searchValue: '' })
    }
    render() {
        return (
            <div className="adminSearchWrap">
                <div className="adminSearch">
                    {/* <span style={{ lineHeight: 36 }}>Search user by</span> */}
                    <span className="adminSearchItem">{this.props.message}</span>
                    <select name="searchBy" className="searchTerm" style={{ width: 100, color: "black" }}
                        onChange={(e) => {
                            this.setState({ searchBy: e.target.value })
                        }}

                    >
                        <option key={'all'} value={'all'} selected>All</option>
                        {this.props.searchBy.map((item, index) => <option key={index} value={item} selected>{item}</option>)}
                    </select>
                    <input type="text" className="searchTerm search" value={this.state.searchValue} placeholder="What are you looking for?"
                        onChange={(e) => this.setState({ searchValue: e.target.value })}
                        onKeyUp={(e) => {
                            if (e.code === "Enter") {
                                this.findItem()
                            }
                        }}
                    />
                    <button type="submit" className="searchButton"
                        onClick={this.findItem}
                    >
                        <FontAwesomeIcon icon={faSearch} className="searchIconAdmin" />
                    </button>
                </div>
            </div>

        )
    }
}

export default connect()(AdminSearchBar)
