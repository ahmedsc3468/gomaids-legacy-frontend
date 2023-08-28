import React, { Component, Fragment } from 'react';
import Countdown from 'react-countdown';

import comingbg from '../../../assets/img/bg/cleanitems.jpg';


// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />;
    } else {
        // Render a countdown
        return <Fragment><div className="week-count"><h1>{days} <sup>days</sup></h1></div><div className="hour-week d-flex"><div className="hour-count"><h1>{hours} <sup>Hours</sup></h1></div><div className="hour-count"><h1>{minutes} <sup>Mins</sup></h1></div><div className="min-count"> <h1>{seconds} <sup>Sec</sup></h1> </div></div></Fragment>;
    }
};

class Content extends Component {
    render() {
        return (
            <section className="coming-soon pt-100 flex-center pb-100 vh-100" style={{ backgroundImage: "url(" + comingbg + ")" }} data-overlay={9}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="coming-soon-outer z-5">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <h1 className="f-700 cm-text mb-15 fs-55 white">New Website is on the Way</h1>
                                        <p className="small-p white">Pellentesque tempor ornare mal esuada. Mauris vel metus vel urna interdum</p>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="hr-2 bg-white opacity-1 mt-50 mt-sm-20" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 text-center text-lg-left">
                                        <div className="clock pt-55 pt-sm-35 white" data-countdown="2022/01/01">
                                            <Countdown
                                                date={Date.now() + 31622400000}
                                                renderer={renderer}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 text-center text-lg-left">
                                        <h4 className="f-700 mb-10 mt-55 mt-sm-45 white">Subscribe Newsletter</h4>
                                        <p className="mb-20 white">Pellentesque tempor ornare mal esuada. Mauris vel metus vel urna interdum tempor ornare mal esuada</p>
                                        <form action="#">
                                            <div className="input-group">
                                                <input type="text" className="form-control input-white" placeholder="Enter email address" aria-label="Recipient's Email" aria-describedby="newsletter" id="newsletter" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-outline-secondary bg-black" type="button"><i className="fas fa-arrow-right" />
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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

export default Content;