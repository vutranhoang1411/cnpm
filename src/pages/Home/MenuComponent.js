import React, { Component } from 'react'
import ItemListComponent from './ItemListComponent'
import MenuHeaderComponent from './MenuHeaderComponent'
import { connect } from 'react-redux';
class MenuComponent extends Component {
    render() {
        return (
            <div className="container-lg">
                <MenuHeaderComponent />
                <div className="">
                    {[<ItemListComponent key={1} history={this.props.history} dsMonAn={this.props.dsMonAn} />]}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (state) => {
    return {
        dsMonAn: state.danhSachMonAnReducer.danhSach
    }
}
export default connect(mapDispatchToProps)(MenuComponent)