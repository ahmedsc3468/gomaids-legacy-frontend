import React, { Component } from 'react';

import callbackbg from '../../assets/img/bg/cta-callback.jpg';
import "../../assets/MyCSS/callback.css"
class Callback extends Component {
    render() {
        return (
            <section className="cta-callback pt-95 pb-100" data-overlay={9} style={{ backgroundImage: "url(" + callbackbg + ")", backgroundSize:"cover" }}>
                <div className="container z-5">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="white mb-55">Get a Free Call Back!</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <form action="#">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <div className="d-md-flex d-block callback-form justify-content-center">
                                            <div className="form-group mr-30 relative mb-0 mr-sm-00 f-name">
                                                <input type="text" className="form-control input-white shadow-2 cust-f-name" id="name" placeholder="Your name" />
                                                <i className="far fa-user transform-v-center" />
                                            </div>
                                            <div className="form-group mr-30 relative mb-0 mr-sm-00 contact-nbr">
                                                <input type="tel" pattern="[0-9]{11}" className="form-control input-white shadow-2 cust-contact-nbr" id="phone" placeholder="Your phone number" />
                                                <i className="fas fa-mobile-alt transform-v-center" />
                                            </div>
                                            <button type="submit" className="btn btn-black shine-btn mt-sm-20 cust-submit-btn">Send Now</button>
                                        </div>
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

export default Callback;