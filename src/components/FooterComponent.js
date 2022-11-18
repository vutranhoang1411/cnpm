import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
export default class FooterComponent extends Component {
    render() {
        return (
            <div>
                {/* Footer */}
                <footer className="text-center text-lg-start bg-light text-muted mt-3 border-bottom pt-1" >

                    {/* Section: Social media */}
                    {/* Section: Links  */}
                    <section className>
                        <div className="container text-center text-md-start mt-5">
                            {/* Grid row */}
                            <div className="row mt-3">
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    {/* Content */}
                                    <div className="text-center">
                                        <img src="http://localhost:3000/imgs/logo.png" alt="" />
                                    </div>
                                    <i>Our mission is to make customers happy.</i>
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        Contact
                                    </h6>
                                    <p>

                                        <FontAwesomeIcon icon={faEnvelope} /> foody@corp.com
                                    </p>
                                    <p>  <FontAwesomeIcon icon={faPhone} /> + 84 90 999 969</p>
                                    <p> <FontAwesomeIcon icon={faPhone} /> + 84 90 999 968</p>
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 social">
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        Useful links
                                    </h6>
                                    <p>
                                        <a href="https://facebook.com" ><FontAwesomeIcon icon={faFacebookF} className="me-1 facebook" />/foody</a>
                                    </p>
                                    <p>
                                        <a href="https://facebook.com" ><FontAwesomeIcon icon={faTwitter} className="me-1 twitter" />/foody</a>
                                    </p>
                                </div>
                                {/* Grid column */}
                                {/* Grid column */}
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    {/* Links */}
                                    <h6 className="text-uppercase fw-bold mb-4">Location</h6>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />  732/21 Second Street, Manchester, King Street, Kingston United Kingdom
                                    </p>
                                </div>
                                {/* Grid column */}
                            </div>
                            {/* Grid row */}
                        </div>
                    </section>
                </footer>
                {/* Footer */}

            </div>
        )
    }
}
