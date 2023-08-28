import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import datebg from '../../../assets/img/icons/bg-date.png';
import img1 from '../../../assets/img/blog/1a.jpg';
import img2 from '../../../assets/img/blog/2a.jpg';
import img3 from '../../../assets/img/blog/3a.jpg';
// Blog Grid
const bloggrid = [
    { img: img1, date: 25, month: 'Mar', title: '12 no-fuss tips and tricks to clean your home in half the time..', authorname: 'Jhone Deo', comments: 30 },
    { img: img2, date: 5, month: 'Jun', title: 'Reasons to hire a professional office cleaning service..', authorname: 'Jhone Deo', comments: 30 },
    { img: img3, date: 11, month: 'Apr', title: 'Home cleaning training for starting a cleaning business..', authorname: 'Jhone Deo', comments: 30 },
    { img: img1, date: 25, month: 'Mar', title: '12 no-fuss tips and tricks to clean your home in half the time..', authorname: 'Jhone Deo', comments: 30 },
    { img: img2, date: 5, month: 'Jun', title: 'Reasons to hire a professional office cleaning service..', authorname: 'Jhone Deo', comments: 30 },
    { img: img3, date: 11, month: 'Apr', title: 'Home cleaning training for starting a cleaning business..', authorname: 'Jhone Deo', comments: 30 },
    { img: img1, date: 25, month: 'Mar', title: '12 no-fuss tips and tricks to clean your home in half the time..', authorname: 'Jhone Deo', comments: 30 },
    { img: img2, date: 5, month: 'Jun', title: 'Reasons to hire a professional office cleaning service..', authorname: 'Jhone Deo', comments: 30 },
    { img: img3, date: 11, month: 'Apr', title: 'Home cleaning training for starting a cleaning business..', authorname: 'Jhone Deo', comments: 30 },
];

class Blogblock extends Component {
    render() {
        return (
            <section className="blog-grid-2 pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        {bloggrid.map((item, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="each-blog-2 mb-30">
                                    <div className="blog-image-2">
                                        <img src={item.img} alt="" />
                                        <div className="blog-date-bg">
                                            <img src={datebg} alt="" />
                                            <div className="date text-center transform-center">
                                                <h3>{item.date}</h3>
                                                <p>{item.month}</p>
                                            </div>
                                        </div>
                                        <Link to="/blog-details" className="reabmore-blog-2 transform-center f-700">Read More<i className="fas fa-long-arrow-alt-right ml-20" /></Link>
                                    </div>
                                    <div className="blog-text-2  bg-light-white">
                                        <h3><Link to="/blog-details" className="fs-17 f-700">{item.title}</Link></h3>
                                    </div>
                                    <div className="blog-info-list">
                                        <ul className="list-inline fs-13 text-left">
                                            <li className="list-inline-item"> <i className="fas fa-user mr-10 fs-13 blue" /> {item.authorname}</li>
                                            <li className="list-inline-item"> <i className="fas fa-comment mr-10 fs-13 blue" /> {item.comments} Comments</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-12 text-center">
                            <div className="pagination-type1 left-align">
                                <ul>
                                    <li>
                                        <Link to="/blog-details"><i className="fas fa-angle-double-left" /></Link>
                                    </li>
                                    <li className="active"><Link to="/blog-details">1</Link></li>
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