import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import pricing3 from '../../../assets/img/icons/hw3_wt.png';
import pricing2 from '../../../assets/img/icons/hw2_wt.png';
import pricing1 from '../../../assets/img/icons/hw1_wt.png';
import activepricing from '../../../assets/img/bg/cleanitems.jpg';
import clean from '../../../assets/img/other/clean.png';
import clean2 from '../../../assets/img/other/clean2.png';

class Pricing extends Component {
    render() {
        return (
            <section className="pricing relative pt-95 pb-115 pb-md-70 bg-light-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR PRICING<span>............</span></p>
                            <h1 className="mb-50">Choose Your Plan</h1>
                        </div>
                    </div>
                    <div className="row no-gutters price-row-width z-5">
                        <div className="col-lg-4 text-center wow fadeInLeft">
                            <div className="each-price shadow-5">
                                <img src={pricing3} alt="" />
                                <h4 className="lined-head fs-22 f-700 mt-30 mb-20">
                                    Basic Plan
          </h4> 
                                <ul className="price-features">
                                    <li><span className="f-700">1 Hour</span> Cleaning</li>
                                    <li><span className="f-700">1 Hour</span> Cooking</li>
                                    <li>Sed do eiusmod tempor</li>
                                    <li>Incididunt ut laboredolore</li>
                                </ul>
                                <h2 className="main-price mt-20 mb-25"> <span className="sup">$</span>25<span className="sub">/ per hour</span></h2>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center wow fadeInUp">
                            <div className="each-price active move-bg shadow-5" data-overlay={9} style={{ backgroundImage: "url(" + activepricing + ")" }}>
                                <div className="z-5">
                                    <img src={pricing2} alt="" />
                                    <h4 className="lined-head white fs-22 f-700 mt-30 mb-20">
                                        Standard Plan
            </h4>
                                    <ul className="price-features white">
                                        <li><span className="f-700">2 Hours</span> Cleaning</li>
                                        <li><span className="f-700">2 Hours</span> Cooking</li>
                                        <li>Sed do eiusmod tempor</li>
                                        <li>Incididunt ut laboredolore</li>
                                    </ul>
                                    <h2 className="main-price white mt-20 mb-25"> <span className="sup">$</span>15<span className="sub">/ per hour</span></h2>
                                    <Link to="/contact" className="btn btn-block shadow-5 shine-btn btn-black">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center wow fadeInRight">
                            <div className="each-price shadow-5">
                                <img src={pricing1} alt="" />
                                <h4 className="lined-head fs-22 f-700 mt-30 mb-20">
                                    Premium Plan
          </h4>
                                <ul className="price-features">
                                    <li><span className="f-700">5 Hours</span> Cleaning</li>
                                    <li><span className="f-700">5 Hours</span> Cooking</li>
                                    <li>Sed do eiusmod tempor</li>
                                    <li>Incididunt ut laboredolore</li>
                                </ul>
                                <h2 className="main-price mt-20 mb-25"> <span className="sup">$</span>10<span className="sub">/ per hour</span></h2>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={clean} className="price-cl-bg" alt="" />
                <img src={clean2} className="price-cl-bg2" alt="" />
            </section>
        );
    }
}

export default Pricing;