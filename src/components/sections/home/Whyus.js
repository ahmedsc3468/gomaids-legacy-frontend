import React, { Component } from "react";
import { Link } from "react-router-dom";
import whybgicon from "../../../assets/img/other/clean.png";
import check from "../../../assets/img/icons/check.png";

import brush from "../../../assets/img/other/brush.png";
import bubble from "../../../assets/img/other/bubble.png";
import HomeWhychoose from "../../../assets/img/about/home-why-choose.jpg";
const whyuslist = [
  {
    icon: check,
    title: "Trusted Professionals",
    text: "Every maid on our platform goes through a strict verification process. We ensure professionalism, experience, and positive customer reviews before they ever reach your door.",
  },
  {
    icon: check,
    title: "Flexible & On-Demand",
    text: "Need a clean today? Or next Saturday? Whether it’s a one-time deep clean or a recurring service, GOMaids adapts to your needs and schedule.",
  },
  { icon: check,
    title: "Transparent Pricing", 
    text: "No hidden fees, no surprises. See your price upfront before you book. Pay securely through the app."
   },

  { icon: check,
    title: "We’re the Middleman You Can Trust",
    text: "We don’t employ maids — we empower them. GOMaids simply makes it easier for you to find reliable cleaners while giving maids the opportunity to earn fairly and work flexibly. Think of us as the trusted matchmaker between people who need help and professionals who are ready to deliver."
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
            <div className="col-xl-5 col-lg-6">
              <div className="about-left-3 relative">
                <img src={HomeWhychoose} alt="" />
              </div>
            </div>

            <div className="col-xl-7 col-lg-6 wow fadeInRight">
              <div className="why-us-content">
                <p className="sub-head blue f-700 mb-1">
                  Why Choose GOMaids?<span>............</span>
                </p>
                <h1 className="mb-10">Cleaning Made Simple. And Smart.</h1>
                <p className="mb-20">
                 With GOMaids, you’re not just getting a cleaner — you’re getting peace of mind. You’re getting your time back. And most of all, you’re getting a hassle-free experience that fits seamlessly into your busy life.
                </p>
                <ul className="check-list3 half-list mb-10">
                  {whyuslist.map((item, i) => (
                    <li key={i}>
                      <img src={item.icon} alt="" />
                      <h5 className="fs-16 lh-14">{item.title}</h5>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
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
