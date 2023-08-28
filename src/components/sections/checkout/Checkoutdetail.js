import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';

import img1 from '../../../assets/img/shop/prdt1.jpg';
import img2 from '../../../assets/img/shop/prdt2.jpg';
import img3 from '../../../assets/img/shop/prdt3.jpg';
const ordereditems = [
    { img: img1, name: 'Persil Micro Clean', price: 25, qty: 2 },
    { img: img2, name: 'Dish Soap', price: 25, qty: 1 },
    { img: img3, name: 'Mop With a Bucket', price: 25, qty: 3 },
];
class Checkoutdetail extends Component {
    render() {
        return (
            <section className="checkout pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="left-checkout mb-md-30">
                                <div className="login-section">
                                    <Accordion>
                                        <Card>
                                            <Accordion.Collapse eventKey="0" className="collapseparent">
                                                <Card.Body>
                                                    <form action="#">
                                                        <p className="mb-20">If you have an account with us, please log in.</p>
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email address*</label>
                                                            <input type="email" className="form-control input-white" placeholder="Email address" id="email" />
                                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field is required.</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="pwd">Password*</label>
                                                            <input type="password" className="form-control input-white" placeholder="Password" id="pwd" />
                                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field is required.</p>
                                                        </div>
                                                        <div className="custom-control mb-10 custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="chk19" name="chk19" />
                                                            <label className="custom-control-label" htmlFor="chk19">Remember me</label>
                                                        </div>
                                                        <button type="submit" className="btn btn-blue btn-md mb-5">LOGIN</button>
                                                    </form>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                    Registered Customer Login Here
                                            </Accordion.Toggle>
                                            </Card.Header>
                                        </Card>
                                        <Card>
                                            <Accordion.Collapse eventKey="1" className="collapseparent">
                                                <Card.Body>
                                                    <h5 className="mb-20 ">Register with us for future convenience.</h5>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="chk20" name="chk20" />
                                                        <label className="custom-control-label" htmlFor="chk20">Checkout as a guest</label>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, eiusmod tempor
                                                    incididunt ut labore et dolore magna aliqua. veniam, quis nostrud nostrud exercitation laboris.</p>
                                                    <Link to="/signup" className="btn btn-blue btn-md">Create Account</Link>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                    Are You a New Customer?
                                            </Accordion.Toggle>
                                            </Card.Header>
                                        </Card>
                                    </Accordion>

                                </div>
                                <div className="bill-section">
                                    <h3 className="f-700 mb-15 mt-35">Billing Details</h3>
                                    <form action="#" className="row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="fname">First Name *</label>
                                            <input type="text" className="form-control input-white" id="fname" placeholder="First Name" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="lname">Last Name *</label>
                                            <input type="text" className="form-control input-white" id="lname" placeholder="Last Name" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Email">Email *</label>
                                            <input type="email" className="form-control input-white" id="Email" placeholder="Email" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input type="text" className="form-control input-white" id="phone" placeholder="Phone Number" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="Company">Company Name *</label>
                                            <input type="text" className="form-control input-white" id="Company" placeholder="Company Name" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="Address">Address *</label>
                                            <input type="text" className="form-control input-white mb-15" id="Address" placeholder="Address Line 1" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                            <input type="text" className="form-control input-white" id="Address2" placeholder="Address Line 2" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="country">Country*</label>
                                            <select className="form-control input-white" id="country">
                                                <option>Country 1</option>
                                                <option>Country 2</option>
                                                <option>Country 3</option>
                                            </select>
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="state">State*</label>
                                            <select className="form-control input-white" id="state">
                                                <option>State 1</option>
                                                <option>State 2</option>
                                                <option>State 3</option>
                                            </select>
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Town">Town*</label>
                                            <input type="text" className="form-control input-white" id="Town" placeholder="Town" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="Post">Post code*</label>
                                            <input type="text" className="form-control input-white" id="Post" placeholder="Post code" />
                                            <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field
                            is required.</p>
                                        </div>
                                        <div className="form-group form-check">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="chk18" name="chk18" />
                                                <label className="custom-control-label" htmlFor="chk18">Have read and agree to the <Link to="/" className="underline">Privacy Policy </Link></label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="order-note">
                                    <h3 className=" f-700 mb-15 mt-15">Order Summary</h3>
                                    <div className="form-group mb-0">
                                        <textarea className="form-control input-white" rows={5} id="comment" placeholder="Notes about your order" defaultValue={""} />
                                        <p className="required-field" style={{ display: 'none' }}><i className="fas fa-times" /> This field is
                          required.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="your-order bg-light-white">
                                <h3 className="f-700 mb-20">Your Order</h3>
                                <div className="ordered">
                                    <ul>
                                        {ordereditems.map((item, i) => (
                                            <li className="odered-items" key={i}>
                                                <img src={item.img} alt="" />
                                                <div className="details">
                                                    <h4 className="rbt">{item.name}</h4>
                                                    <div className="quantity">{item.qty} x <span>${item.price * item.qty}.00</span></div>
                                                    <Link to="#"><i className="fas fa-times" /></Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="price-detail mb-15">
                                    <ul className="total-table mt-5">
                                        <li><span>Sub Total:</span>$1000.00</li>
                                        <li><span>Tax :</span>$15.00</li>
                                        <li><span>Shipping Cost:</span>$10.00</li>
                                        <li className="total"><span>TOTAL:</span>$1025.00</li>
                                    </ul>
                                </div>
                                <form>
                                    <div className="custom-control custom-radio custom-control mb-5 mt-20">
                                        <input type="radio" className="custom-control-input" id="customRadio" name="example" defaultValue="customEx" />
                                        <label className="custom-control-label fs-16 f-500" htmlFor="customRadio">Cash on Delivery</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control">
                                        <input type="radio" className="custom-control-input" id="customRadio2" name="example" defaultValue="customEx" />
                                        <label className="custom-control-label fs-16 f-500" htmlFor="customRadio2">PayPal</label>
                                    </div>
                                </form>
                                <button type="submit" className="btn btn-block btn-blue mt-15">PLACE YOUR ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Checkoutdetail;