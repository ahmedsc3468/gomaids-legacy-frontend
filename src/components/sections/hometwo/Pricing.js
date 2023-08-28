import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import price1 from '../../../assets/img/icons/price1.png';
import price2 from '../../../assets/img/icons/price2.png';
import price3 from '../../../assets/img/icons/price3.png';
import activeprice from '../../../assets/img/bg/cleanitems.jpg';

class Pricing extends Component {
    render() {
        return (
            <section className="pricing relative pt-95 pb-100 pb-md-70 bg-light-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR PRICING<span>............</span></p>
                            <h1 className="mb-35">Choose Your Plan</h1>
                        </div>
                    </div>
                    <div className="row price-row-width justify-content-center z-5">
                        <div className="col-lg-4 col-md-6">
                            <div className="each-price-2 shadow-2 wow fadeInLeft">
                                <div className="price-2-heads">
                                    <img src={price1} alt="" />
                                    <h4 className="fs-24 f-300 mb-15">Basic</h4>
                                    <h1 className="fs-40">$25</h1>
                                    <p className="fs-13 mb-0">per hour</p>
                                    <span className="line bg-blue mb-20 mt-20" />
                                </div>
                                <div className="prive-2-list mb-25">
                                    <ul>
                                        <li><i className="fas fa-check" /><span>1</span> Suitss cleaning</li>
                                        <li><i className="fas fa-check" /><span>1</span> Livingroom cleaning</li>
                                        <li><i className="fas fa-check" />Sed do eiusmod tempor</li>
                                        <li><i className="fas fa-check" />Incididunt ut laboredolore</li>
                                        <li><i className="fas fa-check" />Lorem ipsum dolorsit</li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="each-price-2  wow fadeInUp shadow-3 active" data-overlay={9} style={{ backgroundImage: "url(" + activeprice + ")" }}>
                                <div className="price-2-heads z-5">
                                    <img src={price2} alt="" />
                                    <h4 className="fs-24 f-300 mb-15">Standared</h4>
                                    <h1 className="fs-40">$35</h1>
                                    <p className="fs-13 mb-0">per hour</p>
                                    <span className="line bg-blue mb-20 mt-20" />
                                </div>
                                <div className="prive-2-list mb-25 z-5">
                                    <ul>
                                        <li><i className="fas fa-check" /><span>2</span> Suitss cleaning</li>
                                        <li><i className="fas fa-check" /><span>2</span> Livingroom cleaning</li>
                                        <li><i className="fas fa-check" />Sed do eiusmod tempor</li>
                                        <li><i className="fas fa-check" />Incididunt ut laboredolore</li>
                                        <li><i className="fas fa-check" />Lorem ipsum dolorsit</li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="btn btn-block btn-black z-5">Buy Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="each-price-2 shadow-2 wow fadeInRight">
                                <div className="price-2-heads">
                                    <img src={price3} alt="" />
                                    <h4 className="fs-24 f-300 mb-15">Premium</h4>
                                    <h1 className="fs-40">$40</h1>
                                    <p className="fs-13 mb-0">per hour</p>
                                    <span className="line bg-blue mb-20 mt-20" />
                                </div>
                                <div className="prive-2-list mb-25">
                                    <ul>
                                        <li><i className="fas fa-check" /><span>5</span> Suitss cleaning</li>
                                        <li><i className="fas fa-check" /><span>5</span> Livingroom cleaning</li>
                                        <li><i className="fas fa-check" />Sed do eiusmod tempor</li>
                                        <li><i className="fas fa-check" />Incididunt ut laboredolore</li>
                                        <li><i className="fas fa-check" />Lorem ipsum dolorsit</li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Pricing;