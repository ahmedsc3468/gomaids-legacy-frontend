import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import memberimg from '../../../assets/img/team/1.jpg';

const qualification = [
    { text: 'Pellentesque varius turpis ligula, in cursus leo dictum quis. Nam volutpat.' },
    { text: 'Gravida odio ex in nulla. Donec pulvinar odio a sapien vehicula, in accumsan libero' },
    { text: 'Donec faucibus sapien sed bibendum dignissim. Nam ac elit nec diam vestibulum.' },
    { text: 'Donec sed pretium massa pulvinar efficitur' },
];
// Experience
const experience = [
    { period: '1990 - 1992', companyname: 'Lorem ipsum, Rehabilitation Institute' },
    { period: '1992 - 2003', companyname: 'Lorem ipsum, JWM Private Texas' },
    { period: '2003 - Present', companyname: 'Lorem ipsum, Bizz, California' },
];

class Teamdetailtext extends Component {
    render() {
        return (
            <section className="team-detail pt-100 pb-75">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="team-detail-image">
                                <div className="team-member-image img-lined">
                                    <img src={memberimg} alt="" />
                                </div>
                                <div className="team-member-social mb-md-10">
                                    <ul className="social-icons black text-left text-lg-center mt-30 social-icons-lg">
                                        <li>
                                            <Link to="/"><i className="fab fa-facebook-f" /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><i className="fab fa-twitter" /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><i className="fab fa-linkedin-in" /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><i className="fab fa-google-plus-g" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <h2 className="f-700 mb-1">Jessica David</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dolor lorem, tempor elementum eros a, tempor aliquet tellus. Proin id arcu lorem. Nam at tellus elementum lorem tincidunt consequat. Suspendisse aliquam vitae mi non eleifend. Aliquam posuere id neque ut finibus. Etiam tristique lorem in neque vehicula fermentum. Aenean in ultrices odio. Sed feugiat maximus mattis. Vivamus at mollis erat. Integer quam orci, iaculis vitae maximus a, fermentum at erat. Aliquam volutpat ex risus.</p>
                            <ul className="check-list">
                                {qualification.map((item, i) => (
                                    <li key={i}>
                                        <span><i className="fas fa-check" /></span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                            <div className="hr-2 bg-light-white mb-25 mt-25" />
                            <h5 className="f-700">Experience and Background</h5>
                            <ul className="experience">
                                {experience.map((item, i) => (
                                    <li key={i}>
                                        <span>{item.period}</span>{item.companyname}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Teamdetailtext;