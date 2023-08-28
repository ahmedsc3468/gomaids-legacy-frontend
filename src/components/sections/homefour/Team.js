import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import cleanicon from '../../../assets/img/other/clean.png';
import teamimg1 from '../../../assets/img/team/1.jpg';
import teamimg2 from '../../../assets/img/team/2.jpg';
import teamimg3 from '../../../assets/img/team/3.jpg';
import teamimg4 from '../../../assets/img/team/4.jpg';
const teampost = [
    { img: teamimg1, name: 'Mary Joe', post: 'Office Cleaning Specialist' },
    { img: teamimg2, name: 'Ann Jacob', post: 'Laundry Cleaning Specialist' },
    { img: teamimg3, name: 'Jhone Doe', post: 'Carpet Cleaning' },
    { img: teamimg4, name: 'Albert Joe', post: 'After Disaster Cleaning' },
    { img: teamimg1, name: 'Mary Joe', post: 'Office Cleaning Specialist' },
    { img: teamimg2, name: 'Ann Jacob', post: 'Laundry Cleaning Specialist' },
    { img: teamimg3, name: 'Jhone Doe', post: 'Carpet Cleaning' },
    { img: teamimg4, name: 'Albert Joe', post: 'After Disaster Cleaning' },
];

class Team extends Component {
    render() {
        const options = {
            loop: true,
            margin: 40,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        }
        return (
            <section className="team relative pt-95 pb-90">
                <div className="container">
                    <div className="row mb-45 align-items-end">
                        <div className="col-lg-9 text-center text-lg-left">
                            <p className="sub-head blue f-700 mb-1"><span className="d-sm-inline-block d-lg-none">............</span>OUR
          TEAM<span>............</span></p>
                            <h1 className>Experienced Team</h1>
                        </div>
                        <div className="col-lg-3 text-center text-lg-right">
                            <div className="blog-nav mb-10 mt-md-20">
                                <Link to="#" className="team-nav-icon left" onClick={() => this.refs.teamslider.prev()}>
                                    <i className="fas fa-chevron-left" />
                                </Link>
                                <Link to="#" className="team-nav-icon ml-10 right" onClick={() => this.refs.teamslider.next()}>
                                    <i className="fas fa-chevron-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <OwlCarousel ref="teamslider" options={options} className="owl-carousel team-slider">
                                {teampost.map((item, i) => (
                                    <div key={i} className="each-teams">
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
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                <img src={cleanicon} className="team-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Team;