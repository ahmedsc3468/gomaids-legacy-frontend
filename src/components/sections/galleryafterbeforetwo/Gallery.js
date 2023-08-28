import React, { Component } from 'react';
import ReactCompareImage from 'react-compare-image';

// After Before
import afterimg from '../../../assets/img/bg/after.jpg';
import beforeimg from '../../../assets/img/bg/before.jpg';

class Gallery extends Component {
    render() {
        return (
            <section className="aftr-bfr-gallery pt-90 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-25 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-25 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-25 f-700 mb-1">Carpet Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center ">
                                            <h2 className="fs-25 f-700 mb-1">Office Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-25 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-12">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-25 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-35">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Gallery;