import React, { Component } from "react";
import { Link } from "react-router-dom";
import ctabg from "../../assets/img/bg/cta-1.jpg";

class Cta extends Component {
  render() {
    return (
      <section
        className="cta bg-blue shadow-blue pt-30 pb-30"
        data-overlay={9}
        style={{
          backgroundImage: "url(" + ctabg + ")",
          backgroundSize: "cover",
        }}
      >
        <div className="container z-5">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center text-lg-left">
              <div className=" pr-md-00 cta-line-after">
                <h2 className="white mb-15">
                  Meet the New Standard in Cleaning
                </h2>
                <p className="white mb-0 fs-15">
                  GOMaids is more than an app. It’s a movement — one that brings together communities, uplifts service providers, and gives everyone back something we all need: more time.{" "} 
                </p>
                <p className="white mb-0 fs-15">
                 Whether you’re booking your first clean or your fiftieth, GOMaids is here to make every experience seamless, safe, and satisfying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Cta;
