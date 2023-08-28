import React, { Component } from 'react';

import icon1 from '../../../assets/img/icons/hw2_ic.png';
import icon2 from '../../../assets/img/icons/hw2_ic2.png';
import icon3 from '../../../assets/img/icons/hw2_ic3.png';

const howitworks = [
    { id: 1, icon: icon1, title: 'Book Online', text: 'Lorem ipsum dolor sit amet co nsectetur adipisicing elitsed' },
    { id: 2, icon: icon2, title: 'We do', text: 'Lorem ipsum dolor sit amet co nsectetur adipisicing elitsed' },
    { id: 3, icon: icon3, title: 'You Relax', text: 'Lorem ipsum dolor sit amet co nsectetur adipisicing elitsed' },
];

class Hwitwrks extends Component {
    render() {
        return (
            <section className="hw-it-wrks bg-light-white pt-95 pb-95 pb-sm-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="sub-head blue f-700 mb-1"><span>............</span>HOW WE WORK<span>............</span></p>
                            <h1 className="mb-45">How ‘Clean World’ Works</h1>
                        </div>
                    </div>
                    <div className="row">
                        {howitworks.map((item, i) => (
                            <div className="col-md-4 text-center" key={i}>
                                <div className="how-works-2">
                                    <div className="how-work-img">
                                        <img src={item.icon} className="transform-center" alt="" />
                                        <div className="step-count bg-blue">{item.id}</div>
                                    </div>
                                    <div className="how-work-text">
                                        <h3 className="f-700 mt-25 mb-10">{item.title}</h3>
                                        <p className="mb-0">{item.text} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Hwitwrks;