import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reviewpost from '../../layouts/Reviewpost';

import aboutimg from '../../../assets/img/bg/about-vector.png';
import aboutdots from '../../../assets/img/other/dots2.png';
const aboutlist = [
    { title: 'Cost Effective' },
    { title: 'Insured and Bonded' },
    { title: '100% Satisfaction' },
    { title: 'Quality Services' },
];

class About extends Component {
    render() {
        return (
            <section className="about-2 pt-95 pt-xs-100 pb-100 bg-dot-right pt-md-00 pb-md-70">
                <div className="vector-abt-img">
                    <img src={aboutimg} className="wow fadeInRight" alt="" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-6 mt-md-80">
                            <div className="about-div pl-30 ">
                                <p className="sub-head blue f-700 mb-1">ABOUT US<span>............</span></p>
                                <h1 className="mb-15">We are Different in Cleaning Industry</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt. </p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatur.</p>
                                <ul className="check-list half-list mb-15 mt-20">
                                    {aboutlist.map((item, i) => (
                                        <li key={i}>
                                            <span><i className="fas fa-check" /></span>{item.title}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/login" className="btn btn-blue shine-btn">Order Now</Link>
                            </div>
                        </div>
                    </div>
                    {/* reviews */}
                    <div className="row pt-90 pt-md-55">
                        <div className="col-12">
                            <Reviewpost />
                        </div>
                    </div>
                </div>
                <img src={aboutdots} className="about-bg-dot-icon" alt="" />
            </section>
        );
    }
}

export default About;