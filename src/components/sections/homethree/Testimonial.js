import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';
import Reviewpost from '../../layouts/Reviewpost';

import testimonialbg from '../../../assets/img/bg/cleanitems.jpg';
import img1 from '../../../assets/img/user/client1.jpg';
import img2 from '../../../assets/img/user/client2.jpg';
import img3 from '../../../assets/img/user/client3.jpg';
const testimonialpost = [
    { img: img2, name: 'Jessica', post: 'CEO, Abc Company', text: 'Excellent job! My house has never been so clean! They showed up on time appropriately dress in their pink shirts. Very courteous. Will definitely be having them come back again!' },
    { img: img3, name: 'Jhon', post: 'CEO, Abc Company', text: 'Excellent job! My house has never been so clean! They showed up on time appropriately dress in their pink shirts. Very courteous. Will definitely be having them come back again!' },
    { img: img1, name: 'Sara', post: 'CEO, Abc Company', text: 'Excellent job! My house has never been so clean! They showed up on time appropriately dress in their pink shirts. Very courteous. Will definitely be having them come back again!' },
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
            <section className="testimonial-3-tp pt-95 pb-95 pb-sm-45" style={{ backgroundImage: "url(" + testimonialbg + ")" }}>
                <div className="container">
                    <div className="row z-5">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <p className="sub-head blue f-700 mb-1">
                                        <span>............</span>TESTIMONIALS<span>............</span></p>
                                    <h1 className="mb-35">What Our Clients Say?</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <OwlCarousel options={options} className="owl-carousel testimonial-3-slide">
                                        {testimonialpost.map((item, i) => (
                                            <div key={i} className="each-quote-3">
                                                <div className="testi-by-img">
                                                    <img src={item.img} className="rounded-circle" alt="" />
                                                </div>
                                                <div className="testimonial-3-text text-center">
                                                    <p className="fs-26 italic lh-16 mt-20">“{item.text}”</p>
                                                    <div className="testimonial-3-by">
                                                        <ul className="stars-rate fs-13 mb-1 mt-10" data-starsactive={5}>
                                                            <li className="text-center lh-10"> <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                                <i className="fas fa-star" />
                                                            </li>
                                                        </ul>
                                                        <p className="fs-13"><span className="blue fs-17 f-700 mr-10">{item.name}</span>{item.post}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </OwlCarousel>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="hr-2 bg-black opacity-1 mt-30 mb-50" />
                                </div>
                                <div className="col-lg-12">
                                    <Reviewpost />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Testimonial;