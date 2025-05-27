import React, { Component } from "react";
import { Link } from "react-router-dom";
import Reviewpost from "../../layouts/Reviewpost";

import client1 from "../../../assets/img/user/client1.jpg";
import client2 from "../../../assets/img/user/client2.jpg";
import client3 from "../../../assets/img/user/client3.jpg";

const testimonialblock = [
  {
    title: "100% Recommended",
    text: "GoMaids is one of the best service providers that I have worked with. I would highly recommend their services.",
    userimg: client1,
    user: "David",
    post: "Toronto",
    responsiveclass: "mb-md-80",
  },
  {
    title: "Last-Minute Lifesaver",
    text: "I booked a deep clean an hour before my guests arrived — the maid showed up fast and left my home immaculate. This app is a lifesaver",
    userimg: client2,
    user: "Daniel R.",
    post: "Mississauga",
    responsiveclass: "mb-md-80",
  },
  {
    title: "My Secret to a Calm, Clean Home",
    text: "As a working mom, GOMaids gave me back my weekends. No stress, no calls — just clean, calm, and control.",
    userimg: client3,
    user: "Melissa K.",
    post: "Vaughan",
    responsiveclass: "",
  },
];

class Testimonials extends Component {
  render() {
    return (
      <section className="testimonials pt-95 pb-100 pb-sm-50 pb-xs-95">
        <div className="container">
          <div className="row align-items-center mb-40">
            <div className="col-lg-8 text-center text-lg-left">
              <p className="sub-head blue f-700 mb-1">
                <span className="d-md-inline-block d-lg-none">
                  ............
                </span>
                TESTIMONIALS<span>............</span>
              </p>
              <h1 className="mb-15 mb-md-10">What Our Clients Say?</h1>
            </div>
            <div className="col-lg-4 text-center text-lg-right">
              {/* <Link to="/testimonials" className="link-line mt-15 mb-xs-30">View All <span className="f-700">3000+</span> Reviews</Link> */}
            </div>
          </div>
          <div className="row">
            {testimonialblock.map((item, i) => (
              <div className="col-lg-4" key={i}>
                <div
                  className={"testimonial-each " + item.responsiveclass + ""}
                >
                  <div className="testimonial-quote bg-light-white">
                    <i className="fas fa-quote-left quote-blue" />
                    <ul className="stars-rate mb-15" data-starsactive={5}>
                      <li className="text-left lh-10">
                        {" "}
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </li>
                    </ul>
                    <h4 className="fs-19 f-700 mb-10">{item.title}</h4>
                    <p className="mb-0">{item.text}</p>
                  </div>
                  <div className="client-2-img mt-40 d-flex align-items-center justify-content-start">
                    <div className="img-div mr-15 ml-35">
                      <div className="client-image client-image-md">
                        <img
                          src={item.userimg}
                          className=" rounded-circle"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="client-text-2">
                      <h6 className="client-name blue mt-1 fs-17 f-700">
                        {item.user}
                      </h6>
                      <p className="mb-0 fs-13 f-500">{item.post}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <div className="hr-1 mt-40 mb-40 bg-black opacity-1" />
            </div>
          </div>
          {/* reviews */}
          {/* <Reviewpost /> */}
        </div>
      </section>
    );
  }
}

export default Testimonials;
