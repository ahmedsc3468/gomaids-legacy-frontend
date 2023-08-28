import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';

import checkicon from '../../../assets/img/icons/check.png';
import chooseusimg from '../../../assets/img/bg/ve3.png';
import brush from '../../../assets/img/other/brush.png';
import bubble from '../../../assets/img/other/bubble.png';

class Whychoose extends Component {
    render() {
        return (
            <section className="why-choose-3 o-hidden relative pt-90 pb-80">
                <div className="container">
                    <div className="row relative align-items-center">
                        <div className="col-lg-5  wow fadeInLeft">
                            <p className="sub-head blue f-700 mb-1">WHY CHOOSE US<span>............</span></p>
                            <h1 className="mb-10">Your Happiness Is Our Priority</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrudt. </p>
                            <ul className="check-list2 mb-10">
                                <li>
                                    <img src={checkicon} alt="" />
                                    <h5 className="fs-16 lh-14">Highly Rated &amp; Esteemed</h5>
                                    <p>Ut enim ad minim veniam, quis</p>
                                </li>
                                <li>
                                    <img src={checkicon} alt="" />
                                    <h5 className="fs-16 lh-14">Trusted Professionals</h5>
                                    <p>Ut enim ad minim veniam, quis</p>
                                </li>
                            </ul>
                            <Link to="/find-a-services" className="btn btn-blue shine-btn mr-20">Order Now</Link>
                        </div>
                        <div className="col-lg-7  wow fadeInRight mt-xs-55">
                            <img src={chooseusimg} alt="" />
                        </div>
                        <img src={brush} className="why-brush" alt="" />
                        <img src={bubble} className="why-bubble" alt="" />
                    </div>
                    <div className="row mt-75 mb-25">
                        <div className="col-md-6 text-center text-md-left">
                            <h3 className="fs-25 f-700">Frequently Asked Questions</h3>
                        </div>
                        <div className="col-md-6 text-center text-md-right mt-5 mt-sm-20 mb-sm-10">
                            <Link to="/faq" className="mb-xs-30  f-700">View All<i className="fas fa-long-arrow-alt-right ml-15" /></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="faq-boxes">
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
                            <div className="faq-boxes">
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
            </section>
        );
    }
}

export default Whychoose;