import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import bannerbg from '../../../assets/img/banner/banner-2a.jpg';
import checkicon from '../../../assets/img/icons/check.png';
const bannerpost = [
    { titlespan: '30+ Years', title: 'of Experience in Cleaning Service', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet leo tristique, commodo leo sed, scelerisque turpis.', btn1text: 'Order Now', btn2text: 'Our Services' },
    { titlespan: '30+ Years', title: 'of Experience in Cleaning Service', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet leo tristique, commodo leo sed, scelerisque turpis.', btn1text: 'Order Now', btn2text: 'Our Services' },
];

class Banner extends Component {
    render() {
        const options = {
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 450,
            margin: 0,
            nav: false,
            dots: false,
        }
        return (
            <section className="slider-3 flex-center vector-slide d-flex relative" style={{ backgroundImage: "url("+ bannerbg +")" }}>
                <OwlCarousel options={options} className="owl-carousel main-slider-2 w-100">
                    {bannerpost.map((item, i) => (
                        <div key={i} className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-9 text-left">
                                    <div className="banner-text-left white z-5">
                                        <ul className="banner-check-list black fs-16 mb-10">
                                            <li>Trusted....</li>
                                            <li>Simple....</li>
                                            <li>Affordable....</li>
                                        </ul>
                                        <h1 className="black lh-11 mb-10 f-700"><span className="blue f-900">{item.titlespan}</span> {item.title}</h1>
                                        <p className="fs-17 mb-25 black">{item.text} </p>
                                        <ul className="check-list2 half-list banner-3-check mb-15">
                                            <li>
                                                <img src={checkicon} alt="" />
                                                <h5 className="fs-16 lh-14">Highly Rated &amp; Esteemed</h5>
                                            </li>
                                            <li>
                                                <img src={checkicon} alt="" />
                                                <h5 className="fs-16 lh-14">Insured and Bonded</h5>
                                            </li>
                                            <li>
                                                <img src={checkicon} alt="" />
                                                <h5 className="fs-16 lh-14">Trusted Professionals</h5>
                                            </li>
                                            <li>
                                                <img src={checkicon} alt="" />
                                                <h5 className="fs-16 lh-14">Quality Service</h5>
                                            </li>
                                        </ul>
                                        <Link to="/contact" className="btn btn-blue shine-btn mr-20">{item.btn1text}</Link>
                                        <Link to="/services-v1" className="btn btn-blue-border">{item.btn2text}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </section>

        );
    }
}

export default Banner;