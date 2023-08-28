import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import aboutimg from '../../../assets/img/about/about-img.jpg';
import abouticon from '../../../assets/img/other/clean.png';
const aboutlist = [
    { title: 'Cost Effective' },
    { title: 'Insured and Bonded' },
    { title: '100% Satisfaction' },
    { title: 'Quality Services' },
];

export default function Counter() {

    const [focus, setFocus] = React.useState(false);
    return (

        <section className="about pt-105 pt-xs-100 pb-100 bg-dot-right">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="about-image shadow-1 ml-10 mb-md-30 relative">
                            <img src={aboutimg} className="w-100" alt="" />
                            <div className="about-count shadow-blue bg-blue white">
                                <p className="fs-19">Proudly Serviced</p>
                                <h3 className="fs-45 f-700">
                                    <CountUp start={focus ? 0 : null} end={1500} duration={5} redraw={true}>
                                        {({ countUpRef }) => (
                                            <Fragment>
                                                <span className="counter" ref={countUpRef} />
                                                <VisibilitySensor
                                                    onChange={isVisible => {
                                                        if (isVisible) {
                                                            setFocus(true);
                                                        }
                                                    }}
                                                >
                                                    <span className="plus-icon">+</span>
                                                </VisibilitySensor>
                                            </Fragment>
                                        )}
                                    </CountUp>
                                </h3>
                                <p className="fs-19">Clients So Far</p>
                                <Link to="/" className="white underline fs-13 mt-25 d-block">VIEW ALL</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-div pl-20">
                            <p className="sub-head blue f-700 mb-1">ABOUT US<span>............</span></p>
                            <h1 className="mb-15">We are Different in Industry</h1>
                            <p>Our experienced maids,cooks and cleaners can efficiently handle any size home - 
                                from one bed room apartments to 1 kanal houses. Our domestic helpers are available throughout the day to give you as much flexibility as you need. 
                                Simply decide how many hours you need a cleaner for, that fits your requirement and budget and book accordingly.

                            </p>
                            <ul className="check-list half-list mb-15 mt-20">
                                {aboutlist.map((item, i) => (
                                    <li key={i}>
                                        <span><i className="fas fa-check" /></span>{item.title}
                                    </li>
                                ))}
                            </ul>
                            <div className='row'>
                                    <div className='col-sm-4'>

                                    </div>
                                    <div className='col-sm-4' style={{"textAlign":"center","padding":"0px"}}>

                            <Link to="/find-a-services" className="btn btn-blue shine-btn ordernowbth">Order Now</Link>
                                    </div>
                            </div>
                        </div>
                        <img src={abouticon} className="about-bg-icon" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
