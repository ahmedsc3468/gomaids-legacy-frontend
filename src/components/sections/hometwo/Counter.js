import React, { Fragment } from 'react';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import counterbg from '../../../assets/img/bg/cta.jpg';
const counterpost = [
    { count: 8000, text: 'More than', title: 'Cleans' },
    { count: 10000, text: 'Over', title: 'Satisfied Clients' },
    { count: 200, text: 'Over', title: 'Professionals' },
    { count: 25, text: 'More than', title: 'Years of Experience' },
];

export default function Counter() {
    const [focus, setFocus] = React.useState(false);
    return (
        <section className="count-footer relative pt-95 pb-95 pb-md-65 bg-cover" data-overlay={9} style={{ backgroundImage: "url(" + counterbg + ")" }}>
            <div className="container">
                <div className="row align-items-center z-5">
                    {counterpost.map((item, i) => (
                        <div className="col-lg-3 col-md-6 text-center" key={i}>
                            <div className="each-count-f no-border white">
                                <p className="fs-15">{item.text}</p>
                                <h1 className="mb-15 fs-48 f-400">
                                    <CountUp start={focus ? 0 : null} end={parseInt(item.count)} duration={5} redraw={true}>
                                        {({ countUpRef }) => (
                                            <Fragment>
                                                <span className="counter" ref={countUpRef} />
                                                <VisibilitySensor
                                                    onChange={isVisible => {
                                                        if (isVisible) {
                                                            setFocus(true);
                                                        }
                                                    }}
                                                >
                                                    <span className="plus-icon">+</span>
                                                </VisibilitySensor>
                                            </Fragment>
                                        )}
                                    </CountUp>
                                </h1>
                                <p className="mb-0 fs-15">{item.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
