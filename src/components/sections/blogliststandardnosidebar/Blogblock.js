import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import $ from 'jquery';
import 'magnific-popup';

import blogimg1 from '../../../assets/img/blog/blog-b1.jpg';
import blogimg2 from '../../../assets/img/blog/blog-b2.jpg';
import blogimg3 from '../../../assets/img/blog/blog-b3.jpg';
const blogslider = [
    { img: blogimg1 },
    { img: blogimg2 },
    { img: blogimg3 },
];

class Blogblock extends Component {
    componentDidMount() {
        function popup() {
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        const options = {
            loop: true,
            margin: 0,
            autoplay: true,
            nav: true,
            dots: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                1200: {
                    items: 1
                }
            }
        }
        return (
            <section className="blog-standared pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="each-blog-standared mb-45">
                                <div className="blog-standared-img">
                                    <img src={blogimg1} alt="" />
                                    <div className="blog-standared-date shadow-blue text-center">
                                        <h2 className="fs-30 f-700 white">05</h2>
                                        <p className="month mb-0 fs-13 white">JUN</p>
                                    </div>
                                </div>
                                <div className="blog-standared-content">
                                    <div className="blog-std-head">
                                        <div className="row">
                                            <div className="col-md-7 col-sm-8">
                                                <ul className="list-inline fs-13">
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-user mr-10 fs-14 blue" /> Jhone Doe
                    </li>
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-comments mr-10 fs-14 blue" /> 33 Comments
                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-5 col-sm-4 text-left text-sm-right">
                                                <span className="tag-blog fs-13 bg-light-white">Cleaning Tips</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-std-texts">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2 className="fs-30 f-700 mb-10 lh-12">How to Fight Dust: These Expert Tips For You</h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt. </p>
                                                <Link to="/blog-details" className="btn shine-btn btn-lg btn-blue mb-10">Order Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="each-blog-standared mb-45">
                                <div className="blog-standared-img slider-blog">
                                    <OwlCarousel options={options} className="owl-carousel slider-type-blog">
                                        {blogslider.map((item, i) => (
                                            <img key={i} src={item.img} alt="" />
                                        ))}
                                    </OwlCarousel>
                                    <div className="blog-standared-date shadow-blue text-center">
                                        <h2 className="fs-30 f-700 white">11</h2>
                                        <p className="month mb-0 fs-13 white">JUN</p>
                                    </div>
                                </div>
                                <div className="blog-standared-content">
                                    <div className="blog-std-head">
                                        <div className="row">
                                            <div className="col-md-7 col-sm-8">
                                                <ul className="list-inline fs-13">
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-user mr-10 fs-14 blue" /> Jhone Doe
                    </li>
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-comments mr-10 fs-14 blue" /> 33 Comments
                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-5 col-sm-4 text-left text-sm-right">
                                                <span className="tag-blog fs-13 bg-light-white">Cleaning Tips</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-std-texts">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2 className="fs-30 f-700 mb-10 lh-12">Reasons to Hire a Professional Cleaning Service.</h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt. </p>
                                                <Link to="/blog-details" className="btn shine-btn btn-lg btn-blue mb-10">Order Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="each-blog-standared mb-30">
                                <div className="blog-standared-img">
                                    <img src={blogimg3} alt="" />
                                    <div className="blog-standared-date shadow-blue text-center">
                                        <h2 className="fs-30 f-700 white">23</h2>
                                        <p className="month mb-0 fs-13 white">JUN</p>
                                    </div>
                                    <div className="blob play-btn transform-center">
                                        <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video"> <i className="fas fa-play" /></Link>
                                    </div>
                                </div>
                                <div className="blog-standared-content">
                                    <div className="blog-std-head">
                                        <div className="row">
                                            <div className="col-md-7 col-sm-8">
                                                <ul className="list-inline fs-13">
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-user mr-10 fs-14 blue" /> Jhone Doe
                    </li>
                                                    <li className="list-inline-item pr-15">
                                                        <i className="far fa-comments mr-10 fs-14 blue" /> 33 Comments
                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-5 col-sm-4 text-left text-sm-right">
                                                <span className="tag-blog fs-13 bg-light-white">Cleaning Tips</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="blog-std-texts">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h2 className="fs-30 f-700 mb-10 lh-12">8 Expert Tips for Kitchen Cleaning For You</h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt. </p>
                                                <Link to="/blog-details" className="btn shine-btn btn-lg btn-blue mb-10">Order Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pagination-type1 left-align mb-md-50">
                                <ul>
                                    <li>
                                        <Link to="/blog-details"><i className="fas fa-angle-double-left" /></Link>
                                    </li>
                                    <li><Link to="/blog-details">1</Link></li>
                                    <li><Link to="/blog-details">2</Link></li>
                                    <li><Link to="/blog-details">3</Link></li>
                                    <li>
                                        <Link to="/blog-details"><i className="fas fa-angle-double-right" /></Link>
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

export default Blogblock;