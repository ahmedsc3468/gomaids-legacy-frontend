import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cleanicon from '../../../assets/img/other/clean.png';
import whyusbg from '../../../assets/img/bg/why-3.jpg';
import check from '../../../assets/img/icons/check.png';
 const whyuslist = [
    { icon: check, title: 'Highly Rated & Esteemed', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Insured and Bonded', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Trusted Professionals', text: 'Ut enim ad minim veniam, quis' },
    { icon: check, title: 'Quality Service', text: 'Ut enim ad minim veniam, quis' },
  ];

class Whyus extends Component {
    render() {
        return (
            <section className="why-us">
                <div className="container-fluid p-0">
                    <div className="row no-gutters z-5">
                        <div className="col-lg-6 wow fadeInLeft">
                            <div className="img-choose-us bg-cover h-100" style={{ backgroundImage: "url(" + whyusbg + ")" }} />
                        </div>
                        <div className="col-lg-6  wow fadeInRight">
                            <div className="why-us-content">
                                <p className="sub-head blue f-700 mb-1">WHY CHOOSE US<span>............</span></p>
                                <h1 className="mb-10">Your Happiness Is Our Priority</h1>
                                <p className="mb-20">Nunc tempor velit molestie arcu malesuada accumsan. Nam sollicitudin a orci quis
                                vestibulum. Sed fringilla neque eu ultrices consequat. Nunc at varius ante. Suspendisse
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
                                <Link to="/find-a-services"className="btn btn-blue shine-btn mr-20">Order Now</Link>
                                <Link to="/contact" className="btn btn-blue-border mt-xs-15">Contact Us</Link>
                                <img src={cleanicon} className="why-bg-icon" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Whyus;