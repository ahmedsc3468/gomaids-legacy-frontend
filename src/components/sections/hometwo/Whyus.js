import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import whyusvector from '../../../assets/img/bg/whyus-vector.png';
import icon1 from '../../../assets/img/other/clean.png';
import icon2 from '../../../assets/img/other/bubble.png';
import check from '../../../assets/img/icons/check.png';
const whyuslist = [
    { icon: check, title: 'Highly Rated & Esteemed', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Insured and Bonded', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Trusted Professionals', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Quality Service', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'We are Committed', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Fully Satisfaction Guarantee', text: 'Ut enim ad minim veniam, quis' },
];

class Whyus extends Component {
    render() {
        return (
            <section className="why-choose-2 relative pt-95 pb-105">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="why-us-content2">
                                <p className="sub-head blue f-700 mb-1">WHY CHOOSE US<span>............</span></p>
                                <h1 className="mb-15">Your Happiness Is Our Priority</h1>
                                <p className="mb-20 pr-60">Nunc tempor velit molestie arcu malesuada accumsan. Nam sollicitudin a orci
                                quis vestibulum. Sed fringilla neque eu ultrices consequat. Nunc at varius ante. Suspendisse
                                imperdiet, velit at tempor aliquet, augue nunc ullamcorper sem, eget imperdiet nunc leo eget mi.
          </p>
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
                                <Link to="/contact" className="btn btn-blue-border">Contact Us</Link>
                                <img src={icon1} className="why-bg-icon2" alt="" />
                                <img src={icon2} className="why-bg-icon2a" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="why-us-bg-2">
                                <img src={whyusvector} className="wow fadeInRight " alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Whyus;