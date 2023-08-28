import React, { Component } from 'react';

import cleanicon from '../../../assets/img/other/clean.png';
import icon1 from '../../../assets/img/icons/fe1.png';
import icon2 from '../../../assets/img/icons/fe2.png';
import icon3 from '../../../assets/img/icons/fe3.png';
import icon4 from '../../../assets/img/icons/fe4.png';
const featuresbox = [
    { icon: icon1, title: 'Highly Rated & Esteemed', text: 'Ut enim ad minim veniam' },
    { icon: icon2, title: 'Insured & Bonded', text: 'Ut enim ad minim veniam' },
    { icon: icon3, title: 'Trusted Proffessionals', text: 'Ut enim ad minim veniam' },
    { icon: icon4, title: 'Cost Effective', text: 'Ut enim ad minim veniam' },
];

class Features extends Component {
    render() {
        return (
            <section className="features relative o-hidden pt-100 pb-55">
                <div className="container">
                    <div className="row">
                        {featuresbox.map((item, i) => (
                            <div className="col-lg-3 col-md-6 text-center" key={i}>
                                <div className="each-feature">
                                    <img src={item.icon} alt="" />
                                    <h3 className="fs-20 f-700 mt-20 mb-10">{item.title}</h3>
                                    <p className="mb-0">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <img src={cleanicon} className="feature-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Features;