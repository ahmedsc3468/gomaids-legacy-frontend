import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';

import clean from '../../../assets/img/other/clean.png';
import clean2 from '../../../assets/img/other/clean2.png';
import pricing1 from '../../../assets/img/icons/hw1_wt.png';
import pricing2 from '../../../assets/img/icons/hw2_wt.png';
import pricing3 from '../../../assets/img/icons/hw3_wt.png';
import activeprice from '../../../assets/img/bg/cleanitems.jpg';

class Pricingbox extends Component {
    render() {
        return (
            <section className="pricing relative pt-95 pb-80 pb-md-70 bg-light-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>OUR PRICING<span>............</span></p>
                            <h1 className="mb-35">Choose Your Plan</h1>
                        </div>
                    </div>
                    <div className="row no-gutters price-row-width z-5">
                        <div className="col-lg-4 text-center wow fadeInLeft">
                            <div className="each-price shadow-5">
                                <img src={pricing3} alt="" />
                                <h4 className="lined-head fs-22 f-700 mt-30 mb-20">
                                    Basic Plan
          </h4>
                                <ul className="price-features">
                                    <li><span className="f-700">1</span> Suitss cleaning</li>
                                    <li><span className="f-700">1</span> Livingroom cleaning</li>
                                    <li>Sed do eiusmod tempor</li>
                                    <li>Incididunt ut laboredolore</li>
                                </ul>
                                <h2 className="main-price mt-20 mb-25"> <span className="sup">$</span>25<span className="sub">/ per hour</span></h2>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center wow fadeInUp">
                            <div className="each-price active move-bg shadow-5" data-overlay={9} style={{ backgroundImage: "url(" + activeprice + ")" }}>
                                <div className="z-5">
                                    <img src={pricing2} alt="" />
                                    <h4 className="lined-head white fs-22 f-700 mt-30 mb-20">
                                        Standard Plan
            </h4>
                                    <ul className="price-features white">
                                        <li><span className="f-700">2</span> Suitss cleaning</li>
                                        <li><span className="f-700">2</span> Livingroom cleaning</li>
                                        <li>Sed do eiusmod tempor</li>
                                        <li>Incididunt ut laboredolore</li>
                                    </ul>
                                    <h2 className="main-price white mt-20 mb-25"> <span className="sup">$</span>35<span className="sub">/ per hour</span></h2>
                                    <Link to="/contact" className="btn btn-block shadow-5 shine-btn btn-black">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center wow fadeInRight">
                            <div className="each-price shadow-5">
                                <img src={pricing1} alt="" />
                                <h4 className="lined-head fs-22 f-700 mt-30 mb-20">
                                    Premium Plan
          </h4>
                                <ul className="price-features">
                                    <li><span className="f-700">5</span> Suitss cleaning</li>
                                    <li><span className="f-700">5</span> Livingroom cleaning</li>
                                    <li>Sed do eiusmod tempor</li>
                                    <li>Incididunt ut laboredolore</li>
                                </ul>
                                <h2 className="main-price mt-20 mb-25"> <span className="sup">$</span>45<span className="sub">/ per hour</span></h2>
                                <Link to="/contact" className="btn btn-block btn-blue-border">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="hr-2 mt-65 mt-md-30 bg-black opacity-1" />
                        </div>
                    </div>
                    <div className="row mt-50 mb-15">
                        <div className="col-md-6 text-center text-md-left">
                            <h3 className="fs-22 f-700">Frequently Asked Questions</h3>
                        </div>
                        <div className="col-md-6 text-center text-md-right mt-sm-20 mb-sm-10">
                            <Link to="/faq" className="mb-xs-30 mb-15 f-700">View All<i className="fas fa-long-arrow-alt-right ml-15" /></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="faq-boxes white-faq">
                                <Accordion>
                                    <Card>
                                        <Accordion.Collapse eventKey="0" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                What cleaning supplies do I have to provide?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="1" className="collapseparent">
                                            <Card.Body>
                                                Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                                                bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                How can i book via website?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="2" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                        </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                                Aorem ipsum dolor sit amet consecte?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-boxes white-faq">
                                <Accordion>
                                    <Card>
                                        <Accordion.Collapse eventKey="3" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="3">
                                                Are the cleaners insured in case of damages?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="4" className="collapseparent">
                                            <Card.Body>
                                                Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                                                bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                                How does pricing work?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="5" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                        </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                                Mod tempor incididunt ut labore et dolore?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={clean} className="price-cl-bg" alt="" />
                <img src={clean2} className="price-cl-bg2" alt="" />
            </section>

        );
    }
}

export default Pricingbox;