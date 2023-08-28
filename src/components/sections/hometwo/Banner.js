import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import bannerbg from '../../../assets/img/banner/banner-1a.jpg';

class Banner extends Component {
    render() {
        return (
            <section className="slider-2 flex-center relative" data-overlay={6} style={{ backgroundImage: "url("+ bannerbg +")" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-center text-lg-left">
                            <div className="banner-text-left slide-type-2 white z-5">
                                <ul className="banner-check-list white fs-17 mb-15">
                                    <li><i className="far fa-check-circle" />Trusted</li>
                                    <li><i className="far fa-check-circle" />Simple</li>
                                    <li><i className="far fa-check-circle" />Affordable</li>
                                </ul>
                                <h1 className="white lh-11 mb-10 f-700"><span className=" f-900">30+ Years</span> of Experience in Cleaning
            Service</h1>
                                <p className="fs-17 mb-25 white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
            leo tristique, commodo leo sed, scelerisque turpis. </p>
                                <Link to="/login" className="btn btn-blue shine-btn mr-20">Order Now</Link>
                                <Link to="/services-v1" className="btn btn-white-border">Our Services</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 z-5">
                            <div className="banner-quote-form bg-black mt-md-45">
                                <h3 className="fs-22 white f-700 mb-15">Request Delivery</h3>
                                <form action="#">
                                    <div className="row">
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" id="zipCode" placeholder="Your Zip Code" />
                                            <i className="fas fa-map-marker-alt transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" placeholder="Your Name" />
                                            <i className="far fa-user transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="email" className="form-control input-white shadow-2" id="Email" placeholder="Your Email" />
                                            <i className="far fa-envelope transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" id="Phone" placeholder="Phone Number" />
                                            <i className="fas fa-phone transform-v-center" />
                                        </div>
                                        <div className="form-group sp-padd-sel1 col-lg-6 col-md-4 col-sm-6 col-sm-6 relative">
                                            <select className="form-control input-white select-nice" id="Suits">
                                                <option>Suits</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group sp-padd-sel2 col-lg-6 col-md-4 col-sm-6 relative">
                                            <select className="form-control input-white select-nice" id="Other">
                                                <option>Other</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group btn-form-2 col-lg-12 mb-0">
                                            <button type="submit" className="btn btn-blue shine-btn btn-block">PICKUP DELIVERY</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;