import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";

// About
import aboutshape from "../../../assets/img/about/about-img.jpg";
import aboutimg from "../../../assets/img/about/about-image-1.png";
import aboutimg2 from "../../../assets/img/bg/our-mission-image.jpg";
import brush from "../../../assets/img/other/brush.png";
import bubble from "../../../assets/img/other/bubble.png";

import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import abouticon from "../../../assets/img/other/clean.png";
const aboutlist = [
  { title: "1500+ Clients Served" },
  { title: "1000+ Network of Service Providers" },
  { title: "10+ Average Orders Per Day" },
  { title: "Quality Services" },
];

export default function Counter() {
  const [focus, setFocus] = React.useState(false);
  return (
    <section className="about pt-105 pt-xs-100 pb-100 bg-dot-right">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-image shadow-1 ml-10 mb-md-30 relative">
              <img src={aboutimg} className="w-100" alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-div pl-20">
              <p className="sub-head blue f-700 mb-1">
                ABOUT US<span>............</span>
              </p>
              <h1 className="mb-15">
                GOMaids – Connecting Cleaners with Customers. Seamlessly.
              </h1>
              <p>
                At <b>GOMaids</b>, we’re not just another cleaning company — we’re a tech-driven platform that 
                <b>
                  {' '}
                 connects people who need cleaning services with those who provide them.
                </b>
                <br/>
               We operate as a modern-day matchmaker, giving customers access to reliable, vetted maids, and giving cleaners the flexibility, freedom, and income opportunities they deserve.
              </p>
              <p>
               Just like <b> Uber revolutionized rides </b> and <b> Airbnb transformed travel, </b>GOMaids is 
                <b>
                  {' '}
                 reinventing how cleaning services are found, booked, and experienced </b>
                 all through a few taps on your phone.
              </p>
              <ul className="check-list half-list mb-15 mt-20">
                <li>
                  <span>
                    <i className="fas fa-check" />
                  </span>
                  <CountUp
                    className="about_us_counter"
                    start={focus ? 0 : null}
                    end={1500}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className="plus-icon about_us_counter">+ </span>
                  Clients Served
                </li>
                <li>
                  <span>
                    <i className="fas fa-check" />
                  </span>
                  <CountUp
                    className="about_us_counter"
                    start={focus ? 0 : null}
                    end={1000}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className="plus-icon about_us_counter">+ </span>
                  Network of Service Providers
                </li>
                <li>
                  <span>
                    <i className="fas fa-check" />
                  </span>
                  <CountUp
                    className="about_us_counter"
                    start={focus ? 0 : null}
                    end={10}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className="plus-icon about_us_counter">+ </span>
                  Average Orders Per Day
                </li>
              </ul>
              <div className="row mb-10">
                <div className="col-sm-4"></div>
                <div
                  className="col-sm-4"
                  style={{ textAlign: "center", padding: "0px" }}
                >
                  <Link
                    to="/find-a-services"
                    className="btn btn-blue shine-btn ordernowbth"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
            <img src={abouticon} className="about-bg-icon" alt="" />
          </div>
        </div>

        <div className="row align-items-center  mt-90 mt-md-00">
          <div className="col-xl-6 col-lg-6">
            <div className="about-div mt-md-45 mt-sm-10">
              <h1 className="mb-10">Our Mission and Vision</h1>
              <p>
               To simplify home cleaning by using smart technology to <b> connect trusted maids with customers </b> who value their time, their space, and peace of mind.
              </p>
              <p>
               To become the most trusted on-demand cleaning platform in North America — where quality meets convenience, and technology meets trust.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <img src={aboutimg2} className="w-100 mt-md-25" alt="" />
            <img src={brush} className="mission-bg" alt="" />
            <img src={bubble} className="mission-bg-2" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
