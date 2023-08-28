import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import img1 from '../../../assets/img/service/1-img.jpg';
import img2 from '../../../assets/img/service/2-img.jpg';
import img3 from '../../../assets/img/service/3-img.jpg';
import whiteimg1 from '../../../assets/img/service/1_wt.png';
import whiteimg2 from '../../../assets/img/service/2_wt.png';
import whiteimg4 from '../../../assets/img/service/4_wt.png';
import whiteimg5 from '../../../assets/img/service/5_wt.png';

const servicepost = [
    { img: img1, icon: whiteimg1, title: 'Laundry Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adi pisicing elit, sed do eiusmod tempor' },
    { img: img2, icon: whiteimg2, title: 'Office Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adi pisicing elit, sed do eiusmod tempor' },
    { img: img3, icon: whiteimg4, title: 'Laundry Service', text: 'Lorem ipsum dolor sit amet consectetur adi pisicing elit, sed do eiusmod tempor' },
    { img: img1, icon: whiteimg5, title: 'Move In / Out Clean', text: 'Lorem ipsum dolor sit amet consectetur adi pisicing elit, sed do eiusmod tempor' },
];

class Service extends Component {
    render() {
        const options = {
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        };
        return (
            <section className="service pt-95 pb-50 bg-light-white">
                <div className="container">
                    <div className="row mb-40 align-items-end">
                        <div className="col-lg-9 col-md-12 text-center text-lg-left">
                            <p className="sub-head blue text-center text-lg-left f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>OUR SERVICES<span>............</span></p>
                            <h1>Our Best Services For You</h1>
                        </div>
                        <div className="col-lg-3 col-md-12 text-center text-lg-right">
                            <div className="blog-nav mb-10 mt-md-25">
                                <Link to="#" className="service-nav-icon left" onClick={() => this.refs.serviceslider.prev()}>
                                    <i className="fas fa-chevron-left" />
                                </Link>
                                <Link to="#" className="service-nav-icon ml-10 right" onClick={() => this.refs.serviceslider.next()}>
                                    <i className="fas fa-chevron-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <OwlCarousel ref="serviceslider" options={options} className="owl-carousel service-slider">
                                {servicepost.map((item, i) => (
                                    <div key={i} className="service-2-each shadow-2 mb-50">
                                        <div className="service2-img">
                                            <Link to="/service-details">
                                                <img src={item.img} alt="" />
                                            </Link>
                                            <span className="icon transform-h-center shadow-blue bg-blue">
                                                <img src={item.icon} alt="" />
                                            </span>
                                        </div>
                                        <div className="service2-content">
                                            <h3><Link to="/service-details" className="fs-22 f-700">{item.title}</Link></h3>
                                            <p className="mb-15">{item.text}</p>
                                            <span className="line bg-blue" />
                                        </div>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Service;