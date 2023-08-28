import React, { Component } from 'react';

import img1 from '../../../assets/img/team/1.jpg';
import img2 from '../../../assets/img/team/2.jpg';
import img3 from '../../../assets/img/team/3.jpg';
import img4 from '../../../assets/img/team/4.jpg';
import cleanicon from '../../../assets/img/other/clean.png';
import { Link } from 'react-router-dom';

// Team
const teampost = [
    { img: img1, name: 'Mary Joe', post: 'Office Cleaning Specialist' },
    { img: img2, name: 'Ann Jacob', post: 'Laundry Cleaning Specialist' },
    { img: img3, name: 'Jhone Doe', post: 'Carpet Cleaning' },
    { img: img4, name: 'Albert Joe', post: 'After Disaster Cleaning' },
    { img: img1, name: 'Mary Joe', post: 'Office Cleaning Specialist' },
    { img: img2, name: 'Ann Jacob', post: 'Laundry Cleaning Specialist' },
    { img: img3, name: 'Jhone Doe', post: 'Carpet Cleaning' },
    { img: img4, name: 'Albert Joe', post: 'After Disaster Cleaning' },
];

class Teamblock extends Component {
    render() {
        return (
            <section className="team all-team relative pt-85 pb-90">
                <div className="container">
                    <div className="row mb-45 align-items-end">
                        <div className="col-lg-9 text-center text-lg-left">
                            <p className="sub-head blue f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>OUR TEAM<span>............</span></p>
                            <h1>Experienced Team</h1>
                        </div>
                        <div className="col-lg-3 text-center text-lg-right">
                            <Link to="/contact" className="btn btn-blue-border btn-lg mt-md-20">Join Us</Link>
                        </div>
                    </div>
                    <div className="row">
                        {teampost.map((item, i) => (
                            <div className="col-lg-3 col-md-6" key={i}>
                                <div className="each-teams mb-10 mb-sm-45">
                                    <div className="team-image-part">
                                        <img src={item.img} alt="" />
                                        <ul className="social-icons transform-center white">
                                            <li> <Link to="/"><i className="fab fa-facebook-f" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-twitter" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-linkedin-in" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-google-plus-g" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <Link to="/team-details" className="plus-btn bg-blue shadow-blue">+</Link>
                                    <div className="team-text text-center">
                                        <h4 className="fs-22 f-700 mt-20 mb-1"><Link to="/team-details">{item.name}</Link></h4>
                                        <p className="mb-0">{item.post}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-12">
                            <div className="hr-2 bg-black opacity-1 mb-45" />
                        </div>
                        <div className="col-lg-12 text-center">
                            <div className="pagination-type1 left-align">
                                <ul>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-left" /></Link>
                                    </li>
                                    <li className="active"><Link to="/">1</Link></li>
                                    <li><Link to="/">2</Link></li>
                                    <li><Link to="/">3</Link></li>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-right" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <img src={cleanicon} className="team-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Teamblock;