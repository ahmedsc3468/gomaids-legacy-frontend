import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import videoposter from '../../../assets/img/bg/video-bg.jpg';
import whybgicon from '../../../assets/img/other/clean.png';
import check from '../../../assets/img/icons/check.png';
const whyuslist = [
    { icon: check, title: 'Highly Rated & Esteemed', text: 'Very experience workers' },
    { icon: check, title: 'Insured and Bonded', text: 'Completly verified by the company' },
    { icon: check, title: 'Trusted Professionals', text: 'Pre-verified workers' },
    { icon: check, title: 'Quality Service', text: 'highly qualified workers' },
];

class Whyus extends Component {
    componentDidMount(){
        function popup(){
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        return (
            <section className="why-us pb-95">
                <div className="container-fluid p-0">
                    <div className="row no-gutters z-5">
                        <div className="col-lg-6 wow fadeInLeft">
                            <div className="why-video shadow-blue bg-cover h-100" style={{ backgroundImage: "url(" + videoposter + ")" }}>
                                <div className="blob play-btn  transform-center">
                                    <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video"> <i className="fas fa-play" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 bg-light-white wow fadeInRight">
                            <div className="why-us-content">
                                <p className="sub-head blue f-700 mb-1">WHY CHOOSE US<span>............</span></p>
                                <h1 className="mb-10">Your Happiness Is Our Priority</h1>
                                <p className="mb-20">We care about the quality of our professional services by maintaining the behaviours, health, fitness, presentation and service quality of our team members. To ensure the safety and protection of our valued customers, company itself provides the verification of worker and then let him provide his service.</p>
                                <ul className="check-list2 half-list mb-10">
                                    {whyuslist.map((item, i) => (
                                        <li key={i}>
                                            <img src={item.icon} alt="" />
                                            <h5 className="fs-16 lh-14">{item.title}</h5>
                                            <p>{item.text}</p>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/find-a-services" className="btn btn-blue shine-btn mr-20">Order Now</Link>
                                <Link to="/contact" className="btn btn-blue-border mt-xs-15">Contact Us</Link>
                                <img src={whybgicon} className="why-bg-icon" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Whyus;