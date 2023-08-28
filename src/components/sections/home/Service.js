import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import brush from '../../../assets/img/other/service-bg.png';
import service1 from '../../../assets/img/service/maid.png';
import service2 from '../../../assets/img/service/cleaning.png';
import service3 from '../../../assets/img/service/chef-s.png';
// import service4 from '../../../assets/img/service/4.png';
// import service5 from '../../../assets/img/service/5.png';
// import service6 from '../../../assets/img/service/6.png';
// import service7 from '../../../assets/img/service/7.png';
// import service8 from '../../../assets/img/service/8.png';
const serviceblock = [
    { icon: service1,value:1, title: 'Maid', text: 'We provide backgroud checked and well mannered maids in your city to help you in your daily home tasks.Just book a maid and get your work done.', animation: '' },
    { icon: service2, value:3,title: 'Cleanear', text: 'Our professional cleaners will help you get rid of those dusty fans, greasy stoves and window stains so your home is sparkly clean throughout the year.', animation: 2 },
    { icon: service3, value:2,title: 'Cook', text: 'Book a professional cook and enjoy delicious home-cooked food safely and hygienically prepared in your kitchen or a kitchen helper to chop your veggies.', animation: 4 },
    // { icon: service4, title: 'Laundry Service', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod', animation: 6 },
    // { icon: service5, title: 'Move In / Out Clean', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod', animation: '' },
    // { icon: service6, title: 'Window Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod', animation: 2 },
    // { icon: service7, title: 'Off Spring Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod', animation: 4 },
    // { icon: service8, title: 'After Build Cleaning', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod', animation: 6 },
];


class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchvalue: 1,
        };

    }
    render() {
        return (
            <section className="service pt-50 pb-50 bg-light-white">
                
                <div className="container">
                    
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR BEST SERVICES<span>............</span></p>
                            <h1 className="mb-45">Our Best Services For You</h1>
                            <img src={brush} className="service-cg-icon" alt="" />
                        </div>
                    </div>
                    <div className="row">
                    {serviceblock.map((item, i) => (
                            <div className="col-lg-4 col-xl-4 col-md-6 wow fadeInUp"onClick={() => localStorage.setItem('searchservice', item.value)} data-wow-delay=".{item.animation}s" key={i}>
                                <div className="service-each shadow-2 mb-30 transition-4 text-center">
                                    <Link to="/find-a-services" className="black">
                                        <div className="service-icn bg-light-white flex-center">
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div className="service-text">
                                            <h3 className="fs-20 f-700 mb-10">{item.title}</h3>
                                            <p className="mb-0">{item.text} </p>
                                            <span className="line-servcie transition-4 bg-blue mt-5" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row align-items-center mt-20">
                        <div className="col-md-8 text-center text-md-left">
                            <h2 className="fs-28 f-700 mb-1">And More..</h2>
                            <p className="mb-0">Explore More of our Services and get what you want...</p>
                        </div>
                        <div className="col-md-4 text-center text-md-right mt-sm-15">
                            <Link to="/find-a-services" className="btn btn-blue shine-btn btn-md">View All</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Service;