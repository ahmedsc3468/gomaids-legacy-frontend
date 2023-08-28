import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import Reviewpost from '../../layouts/Reviewpost';

import img1 from '../../../assets/img/teastimonial/1.jpg';
import img2 from '../../../assets/img/teastimonial/2.jpg';
import img3 from '../../../assets/img/teastimonial/3.jpg';

const testimonialpost = [
    { img: img1, title: 'They are the Best', name: 'David Joe', post: 'CEO, Abc Company', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore at nulla pariatur at nulla pariatur. cillum dolore eu fugiat nulla pariatur.' },
    { img: img3, title: '100% Recommended', name: 'David Joe', post: 'CEO, Abc Company', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore at nulla pariatur at nulla pariatur. cillum dolore eu fugiat nulla pariatur.' },
    { img: img2, title: 'They are the Best', name: 'Jessica', post: 'Newyork, USA', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatu cillum dolore at nulla pariatur at nulla pariatur. cillum dolore eu fugiat nulla pariatur.' },
];

class Testimonial extends Component {
    render() {
        const options = {
            loop: true,
            margin: 0,
            nav: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        }
        return (
            <section className="testimonial-2 pt-90 pb-95 pb-sm-70 bg-dot-full">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>Testimonials<span>............</span></p>
                            <h1 className="mb-35">What Our Clients Say?</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <OwlCarousel options={options} className="owl-carousel testimonial-2-slide">
                                {testimonialpost.map((item, i) => (
                                    <div key={i} className="row no-gutters">
                                        <div className="col-lg-6">
                                            <div className="testi-image-2 bg-cover h-100" style={{ backgroundImage: "url(" + item.img + ")" }}>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 bg-black">
                                            <div className="testimonial-2-each white">
                                                <ul className="stars-rate fs-13 mb-30" data-starsactive={5}>
                                                    <li className="text-left lh-10"> <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                    </li>
                                                </ul>
                                                <h3 className="fs-20 mb-20">{item.title}</h3>
                                                <p className="mb-25">{item.text}</p>
                                                <div className="quote-by-2">
                                                    <h5 className="fs-17 mb-10">{item.name}</h5>
                                                    <p className="fs-12 mb-0 lh-10">{item.post}</p>
                                                </div>
                                                <i className="fas fa-quote-left quote-testimonial-2" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                    <div className="row pt-45 no-gutters">
                        <div className="col-lg-10 offset-lg-1">
                            <Reviewpost />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Testimonial;