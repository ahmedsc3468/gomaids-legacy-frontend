import React, { Component } from 'react';

import sectionbg from '../../../assets/img/bg/cleanitems.jpg';

class Estimate extends Component {
    render() {
        return (
            <section className="estimate pt-55 pb-50" data-overlay={9} style={{ backgroundImage: "url(" + sectionbg + ")" }}>
                <div className="container">
                    <div className="row z-5 align-items-center ">
                        <div className="col-lg-7 wow fadeInLeft text-center text-lg-left">
                            <h2 className="white fs-35 f-700">Get started with your free estimate. </h2>
                            <p className="mb-0 white">Lorem ipsum dolor sit amet consectetur adipisicing elitsed tempor.</p>
                        </div>
                        <div className="col-lg-5 text-right wow fadeInRight">
                            <form action="#">
                                <div className="input-group zip-code-input ml-auto">
                                    <input type="text" className="form-control input-white" placeholder="Enter Your Zip Code" />
                                    <i className="fas fa-map-marker-alt transform-v-center" />
                                    <div className="input-group-append">
                                        <button className="btn btn-black" type="submit">Go</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Estimate;