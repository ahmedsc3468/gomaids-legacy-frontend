import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import blogdateicon from '../../../assets/img/icons/bg-date.png';
import cleanicon from '../../../assets/img/other/clean.png';
import img1 from '../../../assets/img/blog/1a.jpg';
import img2 from '../../../assets/img/blog/2a.jpg';
import img3 from '../../../assets/img/blog/3a.jpg';


const blogpost = [
    { img: img1, date: '25', month: 'MAR', title: '12 no-fuss tips and tricks to clean your home in half..', author: 'Jhone Doe', comment: '30' },
    { img: img2, date: '05', month: 'JUN', title: 'Reasons to hire a professional office cleaning service..', author: 'Jhone Doe', comment: '30' },
    { img: img3, date: '11', month: 'APR', title: 'Home cleaning training for starting a cleaning business..', author: 'Jhone Doe', comment: '30' },
];

class Blogpost extends Component {
    render() {
        return (
            <section className="blog-2 relative bg-light-white pt-95 pb-100 pb-md-70">
                <div className="container">
                    <div className="row mb-35 align-items-end">
                        <div className="col-lg-8 text-center text-lg-left">
                            <p className="sub-head blue f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>NEWS &amp;
          BLOGS<span>............</span></p>
                            <h1>Latest From News</h1>
                        </div>
                        <div className="col-lg-4 text-center text-lg-right">
                            <Link to="/blog-list-grid-v1" className="link-line mb-15 mt-md-15">View All Blogs</Link>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        {blogpost.map((item, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="each-blog-2 mb-md-30">
                                    <div className="blog-image-2">
                                        <img src={item.img} alt="" />
                                        <div className="blog-date-bg">
                                            <img src={blogdateicon} alt="" />
                                            <div className="date text-center transform-center">
                                                <h3>{item.date}</h3>
                                                <p>{item.month}</p>
                                            </div>
                                        </div>
                                        <Link to="/blog-details" className="reabmore-blog-2 transform-center f-700">Read More<i className="fas fa-long-arrow-alt-right ml-20" /></Link>
                                    </div>
                                    <div className="blog-text-2">
                                        <h3><Link to="/blog-details" className="fs-19 f-700">{item.title}</Link></h3>
                                    </div>
                                    <div className="blog-info-list">
                                        <ul className="list-inline fs-13 text-left">
                                            <li className="list-inline-item"> <i className="fas fa-user mr-10 fs-13 blue" /> {item.author}</li>
                                            <li className="list-inline-item"> <i className="fas fa-comment mr-10 fs-13 blue" /> {item.comment} Comments</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <img src={cleanicon} className="blog-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Blogpost;