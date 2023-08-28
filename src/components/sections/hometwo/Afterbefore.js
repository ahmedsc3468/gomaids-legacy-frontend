import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactCompareImage from 'react-compare-image';

// After Before
import afterimg from '../../../assets/img/bg/after.jpg';
import beforeimg from '../../../assets/img/bg/before.jpg';

class Afterbefore extends Component {
    render() {
        return (
            <section className="afte-before pt-95 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR PORTFOLIO<span>............</span></p>
                            <h1 className="mb-35">Our Latest Works</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                        </div>
                    </div>
                    <div className="row align-items-center mt-10">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="row mt-30 align-items-center">
                                <div className="col-md-8 text-center text-md-left">
                                    <h2 className="fs-26 f-700 mb-0">After Disaster Laundry Cleaning, Newyork</h2>
                                    <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                </div>
                                <div className="col-md-4 text-center text-md-right mt-sm-15">
                                    <Link to="/gallery-after-before" className="btn btn-blue shine-btn btn-md">View All</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Afterbefore;