import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

import aboutimg from "../../../assets/img/about/about-img.jpg";
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
              {/* <div className="about-count shadow-blue bg-blue white">
                <p className="fs-19">Proudly Serviced</p>
                <h3 className="fs-45 f-700">
                  <CountUp
                    start={focus ? 0 : null}
                    end={1500}
                    duration={5}
                    redraw={true}
                  >
                    {({ countUpRef }) => (
                      <Fragment>
                        <span className="counter" ref={countUpRef} />
                        <VisibilitySensor
                          onChange={(isVisible) => {
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
                </h3>
                <p className="fs-19">Clients So Far</p>
                <Link to="/" className="white underline fs-13 mt-25 d-block">
                  VIEW ALL
                </Link>
              </div> */}
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
                {/* {aboutlist.map((item, i) => (
                  <li key={i}>
                    <span>
                      <i className="fas fa-check" />
                    </span>
                    {item.title}
                  </li>
                ))} */}
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
              <div className="row">
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
      </div>
    </section>
  );
}
