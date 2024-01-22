import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "magnific-popup";

// About
// import aboutshape from "../../../assets/img/about/about-img-video.jpg";
import aboutshape from "../../../assets/img/about/about-img.jpg";
import aboutimg from "../../../assets/img/bg/bd-shape-1.jpg";
import brush from "../../../assets/img/other/brush.png";
import bubble from "../../../assets/img/other/bubble.png";
// About
const aboutlist = [
  { title: "Cost Effective" },
  { title: "Insured and Bonded" },
  { title: "100% Satisfaction" },
  { title: "Quality Services" },
];

class Abouttext extends Component {
  componentDidMount() {
    function popup() {
      $(".popup-video").magnificPopup({
        type: "iframe",
      });
    }
    popup();
  }
  render() {
    return (
      <section className="about-3 pt-100 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-6">
              <div className="about-left-3 relative">
                <img src={aboutshape} alt="" />
                {/* <div className="blob play-btn  transform-center">
                  {/* <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video"> <i className="fas fa-play" /></Link> */}
                {/* <Link to="#" className="popup-video"> */}{" "}
                {/* <i className="fas fa-play" /> */}
                {/* </Link> */}
                {/* </div> */} */
                <img src={brush} className="abt-brush" alt="" />
                <img src={bubble} className="abt-bubble" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="about-div mt-md-45">
                <p className="sub-head blue f-700 mb-1">
                  ABOUT US<span>............</span>
                </p>
                <h2 className="mb-15">
                  Our Total Commitment to Client Satisfication
                </h2>
                <p>
                  We deliver an unsurpassed level of service and commitment that
                  will meet and exceed your expectations.
                </p>
                <p>
                  Our hard work ethic and proactive approach involving accurate
                  and timely communication sets us apart from other professional
                  maids, cooks and cleaning services.
                </p>
                <p>
                  That’s why we offer a 100% Customer Satisfaction Guarantee. If
                  you’re not happy with our service, let us know and we’ll make
                  it right.{" "}
                </p>
                {/* <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. eaque ipsa quae incididunt ut labore et dolore magna aliqua nulla pariatur.</p> */}
                <ul className="check-list half-list mb-15 mt-20">
                  {aboutlist.map((item, i) => (
                    <li key={i}>
                      <span>
                        <i className="fas fa-check" />
                      </span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row align-items-center mt-90 mt-md-00">
            <div className="col-xl-5 col-lg-6">
              <div className="about-div mt-md-45 mt-sm-10">
                <h1 className="mb-10">Our Mission and Vision</h1>
                <p>
                  GoMaidz is dedicated to providing exceptional cleaning
                  services, ensuring a spotless and organized environment for
                  our clients. We strive to simplify their lives by delivering
                  reliable and efficient maid services tailored to their unique
                  needs.
                </p>
                <p>
                  At GoMaidz, we envision becoming the leading maids service
                  provider, setting the standard for excellence in cleanliness
                  and customer satisfaction. Our goal is to enhance the
                  well-being of our clients by consistently exceeding
                  expectations and fostering a clean and comfortable living
                  space for every client we serve.
                </p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <img src={aboutimg} className="w-100 mt-md-25" alt="" />
              <img src={brush} className="mission-bg" alt="" />
              <img src={bubble} className="mission-bg-2" alt="" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Abouttext;
