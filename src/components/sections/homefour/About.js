import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cleanicon from '../../../assets/img/other/clean.png';
import aboutimg from '../../../assets/img/about/lady.png';
const aboutlist = [
    { title: 'Cost Effective' },
    { title: 'Insured and Bonded' },
    { title: '100% Satisfaction' },
    { title: 'Quality Services' },
];
class About extends Component {
    render() {
        return (
            <section className="about o-hidden relative pt-85 pt-md-95 bg-dot-right">
                <div className="container">
                    <div className="row ">
                        <div className="col-xl-5 col-lg-6">
                            <div className="about-div pb-95 pb-md-45">
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
                                <Link to="/" className="btn btn-blue shine-btn">Order Now</Link>
                            </div>
                            <img src={cleanicon} className="about-bg-icon" alt="" />
                        </div>
                        <div className="col-xl-7 col-lg-6 text-left">
                            <img src={aboutimg} className="lady-img" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;