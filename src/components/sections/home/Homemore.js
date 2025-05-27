import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ctabg from '../../../assets/img/bg/cta.jpg';
import checkicon from '../../../assets/img/icons/check.png';
import Getstarted from '../../../assets/img/bg/Get-started.png';
import testimonialbg from '../../../assets/img/bg/cleanitems.jpg';
import check from '../../../assets/img/icons/check.png';

const testimonialpost = [
     {
    icon: check,
    title: "Cleaning On Your Terms. Anytime. Anywhere.",
    text: "GOMaids is the modern way to book trusted, professional maids with just a few taps on your phone. No long calls, no uncertain quotes, no hidden fees — just quick, reliable cleaning that fits your schedule and your lifestyle.",
    },
     {
    icon: check,
    title: "Instant Access to Trusted Maids, Right From Your Phone",
    text: "We’ve built an app that puts you in control — book a verified maid, track their arrival, and enjoy the results, all without lifting a finger. You set the time, the place, and the level of service you need. We bring the professionals to your doorstep.",
   },
     {
    icon: check,
    title: "Book Maids Like You Order Food or Groceries.",
    text: "Think of a world where you can open an app, select your cleaning needs, and have a professional arrive at your home right when you need them — with no hassle, no surprises, and no waiting.",
    },
];

class VideoAndTestimonial extends Component {
    render() {
        return (
            <>
                <style>
                    {`
                        .cta1[data-overlay]:before {
                            background-color: #f9f9ff !important;
                        }
                    `}
                </style>

                {/* CTA Section */}
                <section
                    className="cta1 bg-blue-light shadow-blue-light pt-100 pb-95"
                    data-overlay={9}
                    style={{
                        backgroundImage: `url(${ctabg})`,
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="container z-5">
                        <div className="row align-items-center">
                            <div className="col-lg-12 text-center">
                                <div className="pr-md-00 cta-line-after">
                                    <h1 className="blue mb-15">
                                        GOMaids Is More Than a Cleaning App — It’s a Lifestyle Upgrade.
                                    </h1>
                                    <p className="blue mb-20 fs-15">
                                        We’re not just changing how homes get cleaned — we’re redefining what freedom at home feels like.
                                    </p>
                                    <p className="blue fs-15">
                                        The modern world moves fast. We’re here to help you keep up — without the mess.
                                    </p>
                                </div>
                                <div className="cta-inline-btn mt-20">
                                    <Link to="/contact" className="btn shine-btn btn-lg btn-blue">
                                        Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="why-choose-3 o-hidden relative pt-90 pb-80">
                    <div className="container">
                        <div className="row relative align-items-center">
                            <div className="col-lg-7 wow fadeInLeft">
                                <p className="sub-head blue f-700 mb-1">Get Started<span>............</span></p>
                                <h1 className="mb-10">Get Started Today</h1>
                                <p>Our advanced app infrastructure makes every step smooth, from booking to payment. Behind it all is a growing network of professional cleaners, happy customers, and a mission to simplify modern living.</p>
                                <ul className="check-list2 mb-10">
                                    <li className="mb-10"><img src={checkicon} alt="" /><h5 className="fs-16 lh-14">iOS & Android App Available</h5></li>
                                    <li className="mb-10"><img src={checkicon} alt="" /><h5 className="fs-16 lh-14">Book Within Minutes</h5></li>
                                    <li className="mb-10"><img src={checkicon} alt="" /><h5 className="fs-16 lh-14">Transparent Pricing</h5></li>
                                    <li className="mb-10"><img src={checkicon} alt="" /><h5 className="fs-16 lh-14">24/7 Customer Support</h5></li>
                                    <li className="mb-10"><img src={checkicon} alt="" /><h5 className="fs-16 lh-14">No Subscriptions. No Commitments. Just Clean</h5></li>
                                </ul>
                                <p className="sub-head blue f-700 mb-1">GOMaids Is More Than a Cleaning App — It’s a Lifestyle Upgrade.<span></span></p>
                                <p>We’re not just changing how homes get cleaned — we’re redefining what freedom at home feels like. The modern world moves fast. We’re here to help you keep up — without the mess.</p>
                            </div>
                            <div className="col-lg-5 wow fadeInRight mt-xs-55">
                                <img src={Getstarted} alt="Choose Us" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial Section */}
                <section
                    className="testimonial-3-tp pt-95 pb-95 pb-sm-45"
                    style={{
                        backgroundImage: `url(${testimonialbg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="container">
                        <div className="row z-5">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="row">
                                    <div className="col-lg-12 text-center mb-4">
                                        {/* <p className="sub-head blue f-700 mb-1"><span>............</span>What we do?<span>............</span></p> */}
                                        <h1 className="mb-20">Think of Us Like</h1>
                                        {/* <p className="blue mb-0 fs-20">We make life easier.</p> */}
                                        {/* <p className="blue mb-0 fs-20"> */}
                                            {/* Whether you’re a busy professional, a parent, or simply someone who wants to enjoy a clean home without the hassle, GOMaids helps you: */}
                                        {/* </p> */}
                                    </div>
                                </div>

                                <ul className="testimonial-list mt-5">
                                    {testimonialpost.map((item, i) => (
                                        <li key={i} className="testimonial-card">
                                            <img src={check} alt="check" className="check-icon" />
                                              <h5 className="lh-14">{item.title}</h5>
                                              <p className="testimonial-text" >{item.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Inline CSS */}
                    <style jsx>{`
                        .testimonial-list {
                            list-style: none;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            padding-left: 0;
                            margin: 0 -10px;
                        }

                        .testimonial-card {
                            flex: 0 0 30%;
                            max-width: 30%;
                            background: #ffffffdd;
                            border-radius: 12px;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                            padding: 20px 15px;
                            margin: 10px;
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            transition: transform 0.3s ease;
                        }

                        .testimonial-card:hover {
                            transform: translateY(-5px);
                        }

                        .check-icon {
                            width: 30px;
                            height: 30px;
                            margin-bottom: 15px;
                        }

                        .testimonial-text {
                            font-weight: 400;
                            font-size: 16px;
                            color: #222;
                            margin-top:10px;
                        }

                        @media (max-width: 991px) {
                            .testimonial-card {
                                flex: 0 0 48%;
                                max-width: 48%;
                            }
                        }

                        @media (max-width: 575px) {
                            .testimonial-card {
                                flex: 0 0 100%;
                                max-width: 100%;
                            }
                        }
                    `}</style>
                </section>
            </>
        );
    }
}

export default VideoAndTestimonial;
