import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
export default class SliderComponent extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 3000,
            adaptiveHeight: true
        };
        return (
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active modifySlider" data-bs-interval={10000}>
                        <img src="https://demo.zymphonies.com/free-theme/d8/restaurant-zymphonies-theme/index/themes/custom/restaurant_zymphonies_theme/images/slider/slide_03.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item modifySlider" data-bs-interval={2000}>
                        <img src="https://demo.zymphonies.com/free-theme/d8/restaurant-zymphonies-theme/index/themes/custom/restaurant_zymphonies_theme/images/slider/slide_02.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item modifySlider">
                        <img src="https://demo.zymphonies.com/free-theme/d8/restaurant-zymphonies-theme/index/themes/custom/restaurant_zymphonies_theme/images/slider/slide_01.jpg" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        )
    }
}
