import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Reviewpost from '../../layouts/Reviewpost';

import client1 from '../../../assets/img/user/client1.jpg';
import client2 from '../../../assets/img/user/client2.jpg';
import client3 from '../../../assets/img/user/client3.jpg';
// Testimonials
const testimonialpost = [
    { img: client1, name: 'David Joe', post: 'CEO, Abc Company', title: '100% Recommended', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore eu.' },
    { img: client2, name: 'Jessica', post: 'CEO, Abc Company', title: 'They are the Best', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
    { img: client3, name: 'Anjelina', post: 'CEO, Abc Company', title: 'Loved Their Work', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore eu.' },
    { img: client2, name: 'Jessica', post: 'CEO, Abc Company', title: 'They are the Best', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
    { img: client3, name: 'Anjelina', post: 'CEO, Abc Company', title: 'Loved Their Work', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore eu.' },
    { img: client1, name: 'David Joe', post: 'CEO, Abc Company', title: '100% Recommended', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore eu.' },
    { img: client2, name: 'Jessica', post: 'CEO, Abc Company', title: 'They are the Best', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
    { img: client3, name: 'Anjelina', post: 'CEO, Abc Company', title: 'Loved Their Work', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore eu.' },
    { img: client2, name: 'Jessica', post: 'CEO, Abc Company', title: 'They are the Best', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.' },
];

class Testimonials extends Component {
    render() {
        return (
            <section className="testimonial-list pt-90 pb-90">
                <div className="container">
                    {/* reviews */}
                    <Reviewpost />
                    <div className="col-12 mt-md-55">
                        <div className="hr-1 tes-hr mb-70 mt-45 bg-black opacity-1" />
                    </div>
                    <div className="row">
                        {testimonialpost.map((item, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="testimonial-each mb-80">
                                    <div className="testimonial-quote bg-light-white">
                                        <i className="fas fa-quote-left quote-blue" />
                                        <ul className="stars-rate mb-15" data-starsactive={5}>
                                            <li className="text-left lh-10"> <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                                <i className="fas fa-star" />
                                            </li>
                                        </ul>
                                        <h4 className="fs-19 f-700 mb-10">{item.title}</h4>
                                        <p className="mb-0">{item.text}</p>
                                    </div>
                                    <div className="client-2-img mt-40 d-flex align-items-center justify-content-start">
                                        <div className="img-div mr-15 ml-35">
                                            <div className="client-image client-image-md">
                                                <img src={item.img} className=" rounded-circle" alt="" />
                                            </div>
                                        </div>
                                        <div className="client-text-2">
                                            <h6 className="client-name blue mt-1 fs-17 f-700">{item.name}</h6>
                                            <p className="mb-0 fs-13 f-500">{item.post}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-12 text-center">
                            <div className="hr-1 mb-40 bg-black opacity-1" />
                            <div className="pagination-type1 left-align">
                                <ul>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-left" /></Link>
                                    </li>
                                    <li className="active"><Link to="/">1</Link></li>
                                    <li><Link to="/">2</Link></li>
                                    <li><Link to="/">3</Link></li>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-right" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Testimonials;