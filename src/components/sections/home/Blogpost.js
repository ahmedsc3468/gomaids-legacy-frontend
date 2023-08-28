import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import img1 from '../../../assets/img/blog/1.jpg';
import img2 from '../../../assets/img/blog/2.jpg';
import img3 from '../../../assets/img/blog/3.jpg';

const blogpost = [
    { img: img1, tag: 'Cleaning Tips', date: '05 JULY 2022', title: 'Reasons to hire a professional office cleaning service', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img2, tag: 'Cleaning Tips', date: '21 JUN 2022', title: '12 Tips to Clean Your Office Window Clearly', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img3, tag: 'Cleaning Tips', date: '12 JUN 2022', title: 'Home cleaning training for starting a cleaning business', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img1, tag: 'Cleaning Tips', date: '05 JULY 2022', title: 'Reasons to hire a professional office cleaning service', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img2, tag: 'Cleaning Tips', date: '21 JUN 2022', title: '12 Tips to Clean Your Office Window Clearly', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img3, tag: 'Cleaning Tips', date: '12 JUN 2022', title: 'Home cleaning training for starting a cleaning business', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
];

class Blogpost extends Component {
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
            <section className="blog pt-95 pb-50">
                <div className="container">
                    <div className="row mb-35 align-items-end">
                        <div className="col-lg-9 text-center text-lg-left">
                            <p className="sub-head blue f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>NEWS &amp; BLOGS<span>............</span></p>
                            <h1 className="mb-sm-15">Latest From News</h1>
                        </div>
                        <div className="col-lg-3 text-center text-lg-right mt-md-15">
                            <div className="blog-nav mb-10">
                                <Link to="#" className="blog-nav-icon left" onClick={() => this.refs.blogslider.prev()}>
                                    <i className="fas fa-chevron-left" />
                                </Link>
                                <Link to="#" className="blog-nav-icon ml-10 right" onClick={() => this.refs.blogslider.next()}>
                                    <i className="fas fa-chevron-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <OwlCarousel ref="blogslider" options={options} className="owl-carousel blog-slider">
                                {blogpost.map((item, i) => (
                                    <div key={i} className="each-blog transition-4 mb-50 shadow-1">
                                        <div className="blog-imgs">
                                            <Link to="/blog-details"><img src={item.img} alt="" /></Link>
                                            <div className="blog-image-info z-10">
                                                <p className="fs-14 white mb-10">{item.tag}</p>
                                                <span className="date-tag bg-blue fs-12">{item.date}</span>
                                            </div>
                                        </div>
                                        <div className="blog-content bg-light-white">
                                            <h4><Link to="/blog-details" className="fs-19 f-500 lh-14">{item.title}</Link></h4>
                                            <p>{item.text}</p>
                                            <div className="hr-1 bg-black opacity-1" />
                                            <Link to="/blog-details" className="read-blog f-500">Read More<i className="fas fa-long-arrow-alt-right" /></Link>
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

export default Blogpost;