import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { url } from '../config/setting';
import { connect } from 'react-redux';
class SearchBarComponent extends React.Component {
    state = {
        findItem: ''
        // item keyWord for searching
    }
    shouldComponentUpdate() {
        return false;
    }
    findItem = async () => {
        // e.preventDefault()
        let result = await axios({
            url: `${url}/find?item=${this.state.findItem}`,
            method: 'get',
        })
        if (result.data.length > 0) {
            this.props.dispatch({
                type: 'lay_danh_sach_mon_an',
                data: result.data
            })
        }
    }
    render() {
        return (
            <div className="col-xl-8 col-lg-7 col-md-7 col-8 col-sm-8 searchBar1">
                <div className="input-group rounded searchBar">
                    <input
                        onChange={(e) => {
                            this.setState({
                                findItem: e.target.value
                            })
                        }}
                        onKeyUp={(e) => {
                            if (e.code === "Enter") {
                                this.findItem()
                            }
                        }}
                        type="search" className="form-control rounded" placeholder={this.props.showText} aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <button className="btn-search"
                            onClick={() => {
                                this.findItem()
                            }}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </span>
                </div>
            </div>


        )
    }
}
export default connect()(SearchBarComponent)
