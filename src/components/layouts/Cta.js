import React, { Component } from "react";
import { Link } from "react-router-dom";

import ctabg from "../../assets/img/bg/cta-1.jpg";

class Cta extends Component {
  render() {
    return (
      <section
        className="cta bg-blue shadow-blue pt-100 pb-95"
        data-overlay={9}
        style={{
          backgroundImage: "url(" + ctabg + ")",
          backgroundSize: "cover",
        }}
      >
        <div className="container z-5">
          <div className="row align-items-center">
            <div className="col-lg-7 text-center text-lg-left">
              <div className=" pr-md-00 cta-line-after">
                <h1 className="white mb-15">
                  Get your maid It's simple and affordable
                </h1>
                <p className="white mb-0 fs-15">
                  We provide backgroud checked and well mannered maids in your
                  city to help you in your daily home task{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-5 text-center text-lg-right">
              <div className="mb-20 cta-inline-btn">
                <Link to="/contact" className="btn btn-white-border">
                  <i className="fas fa-headphones mr-10" />
                  +1 (236) 808-6010
                </Link>
              </div>
              <div className="cta-inline-btn">
                <Link to="/contact" className="btn btn-black shine-btn">
                  Get a Quote Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Cta;
