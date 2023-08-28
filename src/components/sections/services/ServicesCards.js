import React, { Component } from "react";
import { Link } from "react-router-dom";

import icon1 from "../../../assets/img/service/1.png";
import icon2 from "../../../assets/img/service/2.png";
import icon3 from "../../../assets/img/service/3.png";
import icon4 from "../../../assets/img/service/4.png";
import icon5 from "../../../assets/img/service/5.png";
import icon6 from "../../../assets/img/service/6.png";
import icon7 from "../../../assets/img/service/7.png";
import icon8 from "../../../assets/img/service/8.png";

const serviceblock = [
    {
        icon: icon1,
        title: "House Cleaning",
        text: "Maid Services' House Cleaning Services",
        animation: "",
    },
    {
        icon: icon2,
        title: "Office Cleaning",
        text: "Maid Services' House Office Services",
        animation: 2,
    },
    {
        icon: icon3,
        title: "After Party Cleaning",
        text: "Maid Services' After Party Cleaning",
        animation: 4,
    },
    {
        icon: icon4,
        title: "Laundry Service",
        text: "Maid Services' Laundry Services",
        animation: 6,
    },
    {
        icon: icon5,
        title: "Move In / Out Clean",
        text: "Maid Services' Move In/Out Clean",
        animation: "",
    },
    {
        icon: icon6,
        title: "Window Cleaning",
        text: "Maid Service's Window Cleaning Services",
        animation: 2,
    },
    {
        icon: icon7,
        title: "Off Spring Cleaning",
        text: "Maid Service's Off Spring Cleaning",
        animation: 4,
    },
    {
        icon: icon8,
        title: "After Build Cleaning",
        text: "Maid Service's After Build Cleaning",
        animation: 6,
    },
];
class Serviceblock extends Component {
    render() {
        return (
            <section className="service pt-95 pb-70 bg-light-white">
                <div className="container">
                    <div className="row">
                        {serviceblock.map((item, i) => (
                            <div
                                className="col-lg-4 col-xl-3 col-md-6 wow fadeInUp"
                                data-wow-delay=".{item.animation}s"
                                key={i}
                            >
                                <div className="service-each shadow-2 mb-30 transition-4 text-center">
                                    <Link
                                        to="/service-details"
                                        className="black"
                                    >
                                        <div className="service-icn bg-light-white flex-center">
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div className="service-text">
                                            <h3 className="fs-20 f-700 mb-10">
                                                {item.title}
                                            </h3>
                                            <p className="mb-0">{item.text} </p>
                                            <span className="line-servcie transition-4 bg-blue mt-5" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Serviceblock;
