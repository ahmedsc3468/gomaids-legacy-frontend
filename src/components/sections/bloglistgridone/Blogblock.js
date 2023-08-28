import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/blog/1.jpg';
import img2 from '../../../assets/img/blog/2.jpg';
import img3 from '../../../assets/img/blog/3.jpg';
import img4 from '../../../assets/img/blog/4.jpg';
import img5 from '../../../assets/img/blog/5.jpg';
import img6 from '../../../assets/img/blog/6.jpg';

const bloggrid = [
    { img: img1, title: 'Reasons to hire a professional office cleaning service', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img2, title: '12 Tips to Clean Your Office Window Clearly', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img3, title: 'Home cleaning training for starting a cleaning business', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img4, title: 'Reasons to hire a professional office cleaning service', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img5, title: '12 Tips to Clean Your Office Window Clearly', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img6, title: 'Home cleaning training for starting a cleaning business', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img1, title: 'Reasons to hire a professional office cleaning service', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img2, title: '12 Tips to Clean Your Office Window Clearly', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
    { img: img3, title: 'Home cleaning training for starting a cleaning business', tag: 'Cleaning Tips', date: '05 JULY 2022', text: 'Lorem ipsum dolor sit amet consecteturad ipisicing elit, sed do eiusmod temp..' },
];
class Blogblock extends Component {
    render() {
        return (
            <section className="blog-grid pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        {bloggrid.map((item, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="each-blog transition-4 mb-30">
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
                            </div>
                        ))}
                        <div className="col-lg-12 text-center">
                            <div className="pagination-type1 left-align mt-10">
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