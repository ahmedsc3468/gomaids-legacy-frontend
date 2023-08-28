import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cleanicon from '../../../assets/img/other/clean.png';
import service1 from'../../../assets/img/service/1.png';
import service2 from'../../../assets/img/service/2.png';
import service3 from'../../../assets/img/service/3.png';
import service4 from'../../../assets/img/service/4.png';
const serviceblock = [
    { icon: service1, title: 'Laundry Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', animation: '' },
    { icon: service2, title: 'Office Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', animation: 2 },
    { icon: service3, title: 'After Party Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', animation: 4 },
    { icon: service4, title: 'Laundry Service', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', animation: 6 },
];

class Service extends Component {
    render() {
        return (
            <section className="service relative o-hidden pt-95 pb-70 bg-light-white">
                <div className="container">
                    <div className="row mb-35 align-items-end">
                        <div className="col-lg-9 col-md-12 text-center text-lg-left">
                            <p className="sub-head blue text-center text-lg-left f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>OUR SERVICES<span>............</span></p>
                            <h1>Best Services For You</h1>
                        </div>
                        <div className="col-lg-3 col-md-12 text-center text-lg-right">
                            <Link to="/services-v1" className="link-line mb-xs-30 mt-md-20 mb-15">View All Services<i className="fas fa-long-arrow-alt-right ml-15" /></Link>
                        </div>
                    </div>
                    <div className="row">
                        {serviceblock.map((item, i) => (
                            <div className="col-lg-3 col-md-6 text-center" key={i}>
                                <div className="service-each-3 shadow-2 wow fadeInUp" data-wow-delay=".{item.animation}s">
                                    <div className="service-icon-3 bg-light-white">
                                        <Link to="/service-details"><img src={item.icon} className="transform-center" alt="" /></Link>
                                    </div>
                                    <div className="service-text-3">
                                        <h3 className="fs-20 f-700 blue mt-20"><Link to="/service-details">{item.title}</Link></h3>
                                        <p className="mt-10">{item.text}</p>
                                        <Link to="/service-details" className="btn btn-blue-border btn-lg">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <img src={cleanicon} className="team-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Service;