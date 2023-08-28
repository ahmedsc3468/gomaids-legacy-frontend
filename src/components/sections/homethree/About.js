import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import brush from '../../../assets/img/other/brush.png';
import bubble from '../../../assets/img/other/bubble.png';
import shape from '../../../assets/img/about/bg-shape.png';

const aboutlist = [
    { title: 'Cost Effective' },
    { title: 'Insured and Bonded' },
    { title: '100% Satisfaction' },
    { title: 'Quality Services' },
];

class About extends Component {
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
            <section className="about-3 pt-100 pb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-7 col-lg-6">
                            <div className="about-left-3 relative">
                                <img src={shape} alt="" />
                                <div className="blob play-btn transform-center">
                                    <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video">
                                        <i className="fas fa-play" />
                                    </Link>
                                </div>
                                <img src={brush} className="abt-brush" alt="" />
                                <img src={bubble} className="abt-bubble" alt="" />
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6">
                            <div className="about-div mt-md-45">
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
                                <Link to="/about" className="btn btn-blue shine-btn">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;