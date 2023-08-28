import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import img1 from '../../../assets/img/works/1.jpg';
import img2 from '../../../assets/img/works/2.jpg';
import img3 from '../../../assets/img/works/3.jpg';
import img4 from '../../../assets/img/works/4.jpg';
import img5 from '../../../assets/img/works/5.jpg';

const portfoliopost = [
    { img: img1, title: 'Office Cleaning', text: 'Smith Apartment, Boston' },
    { img: img2, title: 'Home Cleaning', text: 'Smith Apartment, Boston' },
    { img: img3, title: 'Kitchen Cleaning', text: 'Smith Apartment, Boston' },
    { img: img4, title: 'Hospital Cleaning', text: 'Smith Apartment, Boston' },
    { img: img5, title: 'Office Cleaning', text: 'Smith Apartment, Boston' },
    { img: img1, title: 'Office Cleaning', text: 'Smith Apartment, Boston' },
    { img: img2, title: 'Home Cleaning', text: 'Smith Apartment, Boston' },
    { img: img3, title: 'Kitchen Cleaning', text: 'Smith Apartment, Boston' },
    { img: img4, title: 'Hospital Cleaning', text: 'Smith Apartment, Boston' },
    { img: img5, title: 'Office Cleaning', text: 'Smith Apartment, Boston' },
];

class Portfolio extends Component {
    render() {
        const options = {
            loop: true,
            margin: 0,
            autoplay: false,
            nav: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            dots: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                400: {
                    items: 1
                },
                550: {
                    items: 2
                },
                768: {
                    items: 2
                },
                1000: {
                    items: 5
                }
            }
        }
        return (
            <section className="portfolio bg-light-white pt-95 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR PORTFOLIO<span>............</span></p>
                            <h1 className="mb-35">Our Latest Works</h1>
                        </div>
                    </div>
                </div>
                <OwlCarousel options={options} className="owl-carousel porfolio-slide">
                    {portfoliopost.map((item, i) => (
                        <div key={i} className="each-portfolio">
                            <img src={item.img} alt="" />
                            <div className="portfolio-text z-15 transform-center">
                                <h4 className="fs-22 mb-10">{item.title}</h4>
                                <p>{item.text}</p>
                                <Link to="/portfolio-details" className="btn btn-black btn-md">View Project</Link>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </section>
        );
    }
}

export default Portfolio;