import React, { Fragment } from 'react';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import reviewimg1 from '../../assets/img/reviews/1.png';
import reviewimg2 from '../../assets/img/reviews/2.png';
import reviewimg3 from '../../assets/img/reviews/3.png';
import reviewimg4 from '../../assets/img/reviews/4.png';

const reviewspost = [
    { icon: reviewimg1, review: 60, animationtime: '' },
    { icon: reviewimg2, review: 86, animationtime: 2 },
    { icon: reviewimg3, review: 214, animationtime: 4 },
    { icon: reviewimg4, review: 65, animationtime: 6 },
];

export default function Counter() {
    const [focus, setFocus] = React.useState(false);
    return (
        <div className="row">
            {reviewspost.map((item, i) => (
                <div className="col-lg-3 col-sm-6 text-center" key={i}>
                    <div className="review-rate-each wow fadeInUp" data-wow-delay=".{item.animationtime}s">
                        <p className="mb-1">
                            <CountUp start={focus ? 0 : null} end={parseInt(item.review)} duration={5} redraw={true}>
                                {({ countUpRef }) => (
                                    <Fragment>
                                        <span className="counter f-700" ref={countUpRef} />
                                        <VisibilitySensor
                                            onChange={isVisible => {
                                                if (isVisible) {
                                                    setFocus(true);
                                                }
                                            }}
                                        >
                                            <span className="plus-icon mr-2">+</span>
                                        </VisibilitySensor>
                                    </Fragment>
                                )}
                            </CountUp>
                                Reviews
                        </p>
                        <img src={item.icon} alt="" />
                        <ul className="stars-rate mt-15" data-starsactive={4}>
                            <li className="text-center lh-10"> <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
