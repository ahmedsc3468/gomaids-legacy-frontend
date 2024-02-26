import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";

// About
import aboutshape from "../../../assets/img/about/about-img.jpg";
import aboutimg from "../../../assets/img/about/about-img.png";
import aboutimg2 from "../../../assets/img/bg/bd-shape-1.jpg";
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
                Effortless, Stress-Free Cleaning at the Click of a Button!
              </h1>
              <p>
                Welcome to GoMaids, where pristine cleanliness meets seamless
                convenience. Our high quality, and easy to use app is designed
                to simplify your life, ensuring a spotless home with just a few
                taps. At GoMaids, we pride ourselves on delivering trusted and
                professional cleaning services tailored to your unique needs.
                Our dedicated team of skilled maids is committed to transforming
                your living space into a sanctuary of cleanliness. With a
                user-friendly app interface and a focus on reliability, we
                strive to make your cleaning experience effortless and
                stress-free. Experience the joy of coming home to a space –
                where cleanliness is our commitment to you.
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
          <div className="col-xl-5 col-lg-6">
            <div className="about-div mt-md-45 mt-sm-10">
              <h1 className="mb-10">Our Mission and Vision</h1>
              <p>
                Gomaids is dedicated to providing exceptional cleaning services,
                ensuring a spotless and organized environment for our clients.
                We strive to simplify their lives by delivering reliable and
                efficient maid services tailored to their unique needs.
              </p>
              <p>
                At Gomaids, we envision becoming the leading maids service
                provider, setting the standard for excellence in cleanliness and
                customer satisfaction. Our goal is to enhance the well-being of
                our clients by consistently exceeding expectations and fostering
                a clean and comfortable living space for every client we serve.
              </p>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6">
            <img src={aboutimg2} className="w-100 mt-md-25" alt="" />
            <img src={brush} className="mission-bg" alt="" />
            <img src={bubble} className="mission-bg-2" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
