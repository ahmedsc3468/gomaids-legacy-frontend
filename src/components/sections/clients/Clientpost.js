import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import img1 from '../../../assets/img/clients/1.png';
import img2 from '../../../assets/img/clients/2.png';
import img3 from '../../../assets/img/clients/3.png';
import img4 from '../../../assets/img/clients/4.png';

const clientbox = [
    {icon:img1,title:'Themeforest Pvt Ltd'},
    {icon:img3,title:'Audiojungle Pvt Ltd'},
    {icon:img2,title:'Videohive Pvt Ltd'},
    {icon:img4,title:'Codecanyon Pvt Ltd'},
    {icon:img1,title:'3Docean Pvt Ltd'},
    {icon:img4,title:'Graphic river Pvt Ltd'},
    {icon:img2,title:'Themeforest Pvt Ltd'},
    {icon:img3,title:'Audiojungle Pvt Ltd'},
    {icon:img4,title:'Themeforest Pvt Ltd'},
    {icon:img3,title:'Audiojungle Pvt Ltd'},
    {icon:img2,title:'Videohive Pvt Ltd'},
    {icon:img1,title:'Codecanyon Pvt Ltd'},
  ];
export default function Counter() {
    const [focus, setFocus] = React.useState(false);
    return (
        <section className="partners pt-80 pb-90">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fancy-head text-center relative z-5 mb-45 wow fadeInDown">
                            <h1>
                                <CountUp start={focus ? 0 : null} end={1000} duration={5} redraw={true}>
                                    {({ countUpRef }) => (
                                        <Fragment>
                                            <span className="blue counter" ref={countUpRef} />
                                            <VisibilitySensor
                                                onChange={isVisible => {
                                                    if (isVisible) {
                                                        setFocus(true);
                                                    }
                                                }}
                                            >
                                                <span className="plus-icon">+ Happy Clients</span>
                                            </VisibilitySensor>
                                        </Fragment>
                                    )}
                                </CountUp>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {clientbox.map((item, i) => (
                        <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                            <div className="partner">
                                <div className="partner-logo flex-center">
                                    <img src={item.icon} alt="" />
                                </div>
                                <div className="partner-name">
                                    <h5><Link to="/">{item.title}</Link></h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="hr-2 bg-black opacity-1 mt-0 mb-50">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="pagination-type1 left-align">
                            <ul>
                                <li>
                                    <Link to="/"><i className="fas fa-angle-double-left" /></Link>
                                </li>
                                <li className="active"><Link to="/">1</Link></li>
                                <li><Link to="/">2</Link></li>
                                <li><Link to="/">3</Link></li>
                                <li>
                                    <Link to="/"><i className="fas fa-angle-double-right" /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
