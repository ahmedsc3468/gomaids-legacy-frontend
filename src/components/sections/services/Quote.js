import React, { Component } from 'react';

import quotebg from '../../../assets/img/bg/quote.jpg';
import quoteformbg from '../../../assets/img/bg/quote-bg.jpg';

class Quote extends Component {
    render() {
        return (
            <section className="quote-service-se">
                <div className="container">
                    <div className="row no-gutters">
                        <div className="col-lg-7">
                            <div className="bg-quotes bg-cover h-100" style={{ backgroundImage: "url(" + quotebg + ")" }}>
                            </div>
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="quote-service h-100" data-overlay={6} style={{ backgroundImage: "url(" + quoteformbg + ")" }}>
                                <h3 className="z-5 fs-28 f-700 white mb-20">Request Delivery</h3>
                                <form action="#" className="z-5">
                                    <div className="row">
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" id="zipCode" placeholder="Your Zip Code" />
                                            <i className="fas fa-map-marker-alt transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" id="name" placeholder="Your Name" />
                                            <i className="far fa-user transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="email" className="form-control input-white shadow-2" id="Email" placeholder="Your Email" />
                                            <i className="far fa-envelope transform-v-center" />
                                        </div>
                                        <div className="form-group col-lg-12 col-md-4 col-sm-6 relative">
                                            <input type="text" className="form-control input-white shadow-2" id="Phone" placeholder="Phone Number" />
                                            <i className="fas fa-phone transform-v-center" />
                                        </div>
                                        <div className="form-group sp-padd-sel1 col-lg-6 col-md-4 col-sm-6 col-sm-6 relative">
                                            <select className="form-control input-white select-nice" id="Suits">
                                                <option>Suits</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group sp-padd-sel2 col-lg-6 col-md-4 col-sm-6 relative">
                                            <select className="form-control input-white select-nice" id="Other">
                                                <option>Other</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-lg-12 mb-0">
                                            <button type="submit" className="btn btn-black shine-btn btn-block">PICKUP DELIVERY</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Quote;