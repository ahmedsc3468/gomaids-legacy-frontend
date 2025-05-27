import React, { Component } from 'react';

import testimonialbg from '../../assets/img/bg/cleanitems.jpg';
import check from '../../assets/img/icons/check.png';

const testimonialpost = [
    { text: 'Book a cleaning service in minutes' },
    { text: 'Choose from verified, reviewed cleaning professionals' },
    { text: 'Schedule on-demand or recurring appointments' },
    { text: 'Pay securely through the app' },
    { text: 'Rate your experience every time' }
];

class Testimonial extends Component {
    render() {
        return (
            <section
                className="testimonial-3-tp pt-95 pb-95 pb-sm-45"
                style={{ backgroundImage: `url(${testimonialbg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="container">
                    <div className="row z-5">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="row">
                                <div className="col-lg-12 text-center mb-4">
                                    <p className="sub-head blue f-700 mb-1">
                                        <span>............</span>What we do?<span>............</span>
                                    </p>
                                    <h1 className="mb-20">What We Do</h1>
                                    <p className="blue mb-0 fs-20">
                                        We make life easier.
                                    </p>
                                    <p className="blue mb-0 fs-20">
                                        Whether you’re a busy professional, a parent, or simply someone who wants to enjoy a clean home without the hassle, GOMaids helps you:
                                    </p>
                                </div>
                            </div>

                            <ul className="testimonial-list mt-5">
                                {testimonialpost.map((item, i) => (
                                    <li key={i} className="testimonial-card">
                                        <img src={check} alt="check" className="check-icon" />
                                        <p className="testimonial-text">{item.text}</p>
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
                        flex: 0 0 19%;
                        max-width: 18%;
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
                        font-weight: 600;
                        font-size: 16px;
                        color: #222;
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
        );
    }
}

export default Testimonial;
