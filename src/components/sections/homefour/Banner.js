import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import bannerbg from '../../../assets/img/banner/banner-3a.jpg';

class Banner extends Component {
    componentDidMount() {
        function popup() {
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        return (
            <section className="banner-type-4 flex-center" style={{ backgroundImage: "url(" + bannerbg + ")" }} data-overlay={8}>
                <div className="container">
                    <div className="row z-5">
                        <div className="col-lg-10 offset-lg-1 text-center">
                            <div className="banner-content-4 white">
                                <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="play-btn-white popup-video mb-30">
                                    <i className="fas fa-play" />
                                </Link>
                                <h4 className="fs-21 f-400 mb-1">Lorem ipsum dolor sit amet consectetur adipisicing.</h4>
                                <h1 className="f-900 mb-25">A Worry Free Cleaning Service.</h1>
                                <div className="banner-form-4">
                                    <form action="#">
                                        <div className=" d-flex flex-column flex-md-row">
                                            <select className="form-control input-white select-nice mb-xs-15" id="sel1">
                                                <option>Select Your Service</option>
                                                <option>Home Cleaning</option>
                                                <option>Office Cleaning</option>
                                                <option>Carpet Cleaning</option>
                                            </select>
                                            <input type="text" className="form-control input-white shadow-2 ml-15 ml-xs-00" placeholder="Enter Your Zip Code" />
                                            <button type="submit" className="btn btn-black ml-15 ml-xs-00 mt-xs-15">Go</button>
                                        </div>
                                    </form>
                                </div>
                                <ul className="banner-check-list white mt-25">
                                    <li><i className="far fa-check-circle white" />Highly Rated &amp; Esteemed</li>
                                    <li><i className="far fa-check-circle white" />Insured &amp; Bonded</li>
                                    <li><i className="far fa-check-circle white" />Trusted Professionals</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;