import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';

import sml1 from '../../../assets/img/blog/blog-sml1.jpg';
import sml2 from '../../../assets/img/blog/blog-sml2.jpg';
import sml3 from '../../../assets/img/blog/blog-sml3.jpg';

const popularpost = [
    { img: sml1, title: 'Lorem ipsum dolor sit amet, consecte..', date: 'June 25, 2022' },
    { img: sml2, title: 'Maecenas commodo nisl vel leo dapib..', date: 'May 16, 2022' },
    { img: sml3, title: 'Donec bibendum, neque et auctorm..', date: 'April 11, 2022' },
];
class Faqtext extends Component {
    render() {
        return (
            <section className="faq pt-90 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <h3 className="fs-22 mb-15 f-700">Home Cleaning</h3>
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
                            <div className="hr-1 bg-black opacity-1 mt-10 mb-25" />
                            <h3 className="fs-22 mb-15 f-700">Office Cleaning</h3>
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
                            <div className="hr-1 bg-black opacity-1 mt-10 mb-25" />
                            <h3 className="fs-22 mb-15 f-700">Laubdry Service</h3>
                            <div className="faq-boxes">
                                <Accordion>
                                    <Card>
                                        <Accordion.Collapse eventKey="6" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                                Are the cleaners insured in case of damages?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="7" className="collapseparent">
                                            <Card.Body>
                                                Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                                                bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                                How does pricing work?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="8" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                        </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="8">
                                                Mod tempor incididunt ut labore et dolore?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                            <div className="hr-1 bg-black opacity-1 mt-10 mb-25" />
                            <h3 className="fs-22 mb-15 f-700">Carpet Cleaning</h3>
                            <div className="faq-boxes">
                                <Accordion>
                                    <Card>
                                        <Accordion.Collapse eventKey="9" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="9">
                                                Are the cleaners insured in case of damages?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="10" className="collapseparent">
                                            <Card.Body>
                                                Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a
                                                bird on it squid single-origin coffee nulla assumenda shoreditch et.
                                            </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="10">
                                                How does pricing work?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                    <Card>
                                        <Accordion.Collapse eventKey="11" className="collapseparent">
                                            <Card.Body>
                                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                                squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck
                                                quinoa nesciunt.
                                        </Card.Body>
                                        </Accordion.Collapse>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="11">
                                                Mod tempor incididunt ut labore et dolore?
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="right-box bg-blue mb-30">
                                <ul className="contacts-list blue-contacts">
                                    <li className="mb-15">
                                        <span className="icon"><i className="fas fa-phone blue" /></span>
                                        <span className="sub-head">Call Us Now</span>
                                        <p>+1 (236) 808-6010</p>
                                    </li>
                                    <li>
                                        <span className="icon"><i className="fas fa-envelope blue" /></span>
                                        <span className="sub-head">Send Us a Mail</span>
                                        <p>info@gomaidz.com</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="right-box bg-light-white mb-30">
                                <div className="right-box-head">
                                    <h4 className="fs-22">Search</h4>
                                </div>
                                <div className="right-box-content">
                                    <form action="#" className="relative mt-10 mb-10">
                                        <input type="text" className="form-control input-white search-white" id="search2" placeholder="Search here.." />
                                        <i className="fas fa-search transform-v-center blue" />
                                    </form>
                                </div>
                            </div>
                            <div className="right-box bg-light-white mb-30">
                                <div className="right-box-head">
                                    <h4 className="fs-22">Popular Posts</h4>
                                </div>
                                <div className="right-box-content ">
                                    {popularpost.map((item, i) => (
                                        <Link to="/blog-details" className="popular-post d-flex align-items-center" key={i}>
                                            <div className="popular-post-img mr-20">
                                                <img src={item.img} alt="" />
                                                <div className="full-cover bg-blue-op-8 transition-4">
                                                    <i className="fas fa-external-link-alt transform-center" />
                                                </div>
                                            </div>
                                            <div className="popular-post-text">
                                                <p className="mb-1 black">{item.title}</p>
                                                <span>{item.date}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="right-box bg-light-white mb-30">
                                <div className="right-box-head">
                                    <h4 className="fs-22">Follow Us</h4>
                                </div>
                                <div className="right-box-content">
                                    <div className="social-profile mt-10 mb-10">
                                        <Link to="/" className="social-profile-box">
                                            <i className="fab fa-facebook-f" />
                                        </Link>
                                        <Link to="/" className="social-profile-box">
                                            <i className="fab fa-twitter" />
                                        </Link>
                                        <Link to="/" className="social-profile-box">
                                            <i className="fab fa-google-plus-g" />
                                        </Link>
                                        <Link to="/" className="social-profile-box">
                                            <i className="fab fa-pinterest-p" />
                                        </Link>
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

export default Faqtext;