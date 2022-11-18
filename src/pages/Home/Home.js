import React, { Component } from 'react'
import MenuComponent from './MenuComponent'
import RightMenuComponent from './RightMenuComponent'
import SliderComponent from '../../components/SliderComponent'
import { layDanhSachMonAn } from '../../actions/courseAction'
import { connect } from 'react-redux'
import FooterComponent from '../../components/FooterComponent'
class Home extends Component {
    componentDidMount() {
        this.props.dispatch(layDanhSachMonAn)
    }
    render() {
        return (
            <div>
                <SliderComponent />
                <RightMenuComponent/>
                <MenuComponent history={this.props.history} />
                <FooterComponent/>
            </div>
        )
    }
}

export default connect()(Home)

