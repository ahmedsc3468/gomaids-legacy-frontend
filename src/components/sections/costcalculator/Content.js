import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Smallcallback from '../../layouts/Smallcallback';

// Categories
const categories = [
    { title: 'Cost Effective' },
    { title: 'Insured and Bonded' },
    { title: '100% Satisfaction' },
    { title: 'Quality Services' },
];
// Follow Us
const socialmedia = [
    { icon: 'facebook-f', url: '/' },
    { icon: 'twitter', url: '/' },
    { icon: 'google-plus-g', url: '/' },
    { icon: 'pinterest-p', url: '/' },
];

class Content extends Component {
    render() {
        return (
            <Fragment>
                <section className="cost-calculator pt-90 pb-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-5">
                                <div className="right-box bg-blue mb-30">
                                    <ul className="contacts-list blue-contacts">
                                        <li className="mb-15">
                                            <span className="icon"><i className="fas fa-phone blue" /></span>
                                            <span className="sub-head">Call Us Now</span>
                                            <p>+123 456 7890</p>
                                        </li>
                                        <li>
                                            <span className="icon"><i className="fas fa-envelope blue" /></span>
                                            <span className="sub-head">Send Us a Mail</span>
                                            <p>info@example.com</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="right-box bg-blue mb-30">
                                    <div className="right-box-content">
                                        <ul className="check-list">
                                            {categories.map((item, i) => (
                                                <li key={i}>
                                                    <span><i className="fas fa-check" /></span>
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
                                        <h4 className="fs-22">Follow Us</h4>
                                    </div>
                                    <div className="right-box-content">
                                        <div className="social-profile mt-10 mb-10">
                                            {socialmedia.map((item, i) => (
                                                <Link to={item.url} className="social-profile-box" key={i}>
                                                    <i className={"fab fa-" + item.icon + ""} />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-7">
                                <div className="calculation">
                                    <h3 className="f-700 fs-30 mb-10">Calculate Your Cost</h3>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="serviceSe">Choose Your Service:</label>
                                                    <select className="form-control input-white" id="serviceSe">
                                                        <option>Cleaning Service</option>
                                                        <option>Office Cleaning Service</option>
                                                        <option>After Party Cleaning</option>
                                                        <option>Laundry Service</option>
                                                        <option>Window Cleaning</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="squareFeet">Total square feet area :</label>
                                                    <input type="text" className="form-control input-white" id="squareFeet" placeholder="Square feet" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="bedrooms">Number of bedrooms:</label>
                                                    <select className="form-control input-white" id="bedrooms">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="bathrooms">Number of bathrooms:</label>
                                                    <select className="form-control input-white" id="bathrooms">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="livingRrooms">Number of living rooms:</label>
                                                    <select className="form-control input-white" id="livingRrooms">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="kitchens">Number of kitchens:</label>
                                                    <select className="form-control input-white" id="kitchens">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="Dining">Number of Dining Room:</label>
                                                    <select className="form-control input-white" id="Dining">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="frequency">Cleaning frequency:</label>
                                                    <select className="form-control input-white" id="frequency">
                                                        <option>One time</option>
                                                        <option>Weekly Service</option>
                                                        <option>Monthly Service</option>
                                                        <option>Daily Service</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="hr-1 bg-black opacity-1 mb-30 mt-5" />
                                <div className="total-cost-calc text-center">
                                    <p className="mb-0">Total Cost (Tax Exclusive)</p>
                                    <h1 className="mb-15 blue f-500">$ 333.00</h1>
                                </div>
                                <div className="hr-1 bg-black opacity-1 mb-35 mt-30" />
                                <div className="book-service">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="text" className="form-control input-white" id="FirstName" placeholder="First Name" />
                                                <i className="far fa-user transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="text" className="form-control input-white" id="LastName" placeholder="Last Name" />
                                                <i className="far fa-user transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="email" className="form-control input-white" id="YourEmail" placeholder="Your Email" />
                                                <i className="far fa-envelope transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="text" className="form-control input-white" id="PhoneNumber" placeholder="Phone Number" />
                                                <i className="fas fa-phone transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group relative">
                                                <textarea className="form-control input-white light-border mb-25" name="message" id="message" cols={30} rows={7} placeholder="Your message" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 text-center">
                                            <button type="submit" className="btn btn-black shine-btn">Order Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;