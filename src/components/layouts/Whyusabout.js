import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";

import whybgicon from "../../assets/img/other/clean.png";
import check from "../../assets/img/icons/check.png";
import Whyusbout from "../../assets/img/about/Whyusbout.jpg";

const whyuslist = [
  {
    icon: check,
    title: "We’re a Platform, Not a Cleaning Company",
    text: "We don’t employ cleaners — we empower them. GOMaids simply connects the dots between service seekers and service providers.",
  },
  {
    icon: check,
    title: "Total Transparency",
    text: "Clear pricing. Trusted reviews. Real-time tracking. What you see is what you get — every time.",
  },
  { icon: check,
    title: "People First", 
    text: "We built GOMaids to serve real people with real needs — customers who care about convenience, and professionals who take pride in their work."
   },

  { icon: check,
    title: "Tech That Works for You",
    text: "Our sleek, intuitive app makes it easy for customers to book and for cleaners to manage their jobs, track payments, and grow their ratings."
   },
];

class Whyus extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <section className="why-us pt-50 pb-50 bg-white">
        <div className="container ">
          <div className="row no-gutters z-5 align-items-center">
            {/* <div className="col-lg-6 wow fadeInLeft">
              <div
                className="why-video shadow-blue bg-cover h-100"
                style={{ backgroundImage: "url(" + videoposter + ")" }}
              >
                <div className="blob play-btn  transform-center">
                  <Link
                    to="https://www.youtube.com/watch?v=qtQgbdmIO30"
                    className="popup-video"
                  >
                    {" "}
                    <i className="fas fa-play" />
                  </Link>
                </div>
              </div>
            </div> */}
            <div className="col-xl-5 col-lg-6">
              <div className="about-left-3 relative">
                <img src={Whyusbout} alt="" />
              </div>
            </div>

            <div className="col-xl-7 col-lg-6 wow fadeInRight">
              <div className="why-us-content">
                <p className="sub-head blue f-700 mb-1">
                  Why GOMaids<span>............</span>
                </p>
                <h1 className="mb-10">Why GOMaids is Different</h1>
                {/* <p className="mb-20">
                 With GOMaids, you’re not just getting a cleaner — you’re getting peace of mind. You’re getting your time back. And most of all, you’re getting a hassle-free experience that fits seamlessly into your busy life.
                </p> */}
                <ul className="check-list3 half-list mb-10">
                  {whyuslist.map((item, i) => (
                    <li key={i}>
                      <img src={item.icon} alt="" />
                      <h5 className="fs-16 lh-14">{item.title}</h5>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/find-a-services"
                  className="btn btn-blue shine-btn ml-20 mr-20"
                >
                  Order Now
                </Link>
                <Link to="/contact" className="btn btn-blue-border mt-xs-15">
                  Contact Us
                </Link>
                <img src={whybgicon} className="why-bg-icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Whyus;
