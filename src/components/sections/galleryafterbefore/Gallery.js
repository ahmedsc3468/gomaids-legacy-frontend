import React, { Component } from 'react';
import ReactCompareImage from 'react-compare-image';

// After Before
import afterimg from '../../../assets/img/bg/after.jpg';
import beforeimg from '../../../assets/img/bg/before.jpg';

class Gallery extends Component {
    render() {
        return (
            <section className="aftr-bfr-gallery pt-90 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-28 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                    <div className="hr-1 bg-black opacity-0 mt-30 mb-30" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-28 f-700 mb-1">After Disaster Laundry Cleaning, Newyork</h2>
                                            <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                    <div className="hr-1 bg-black opacity-0 mt-30 mb-30" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center">
                                            <h2 className="fs-28 f-700 mb-1">Carpet Cleaning, Newyork</h2>
                                            <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicin</p>
                                        </div>
                                    </div>
                                    <div className="hr-1 bg-black opacity-0 mt-30 mb-30" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-10 offset-lg-1">
                                    <ReactCompareImage leftImage={beforeimg} rightImage={afterimg} />
                                </div>
                                <div className="col-lg-10 offset-lg-1">
                                    <div className="row mt-25">
                                        <div className="col-md-12 text-center ">
                                            <h2 className="fs-28 f-700 mb-1">Office Cleaning, Newyork</h2>
                                            <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicin</p>
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