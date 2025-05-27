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
                  Download the GOMaids App
                </h1>
                <p className="white mb-0 fs-15">
                  Available on the App Store and Google Play.Your clean home is just a few taps away.{" "} 
                </p>
                <p className="white mb-0 fs-15">
                 GOMaids – Connecting You to Trusted Maids. Anytime. Anywhere.
                </p>
              </div>
            </div>
            <div className="col-lg-5 text-center text-lg-right">
              <div className="mb-20 cta-inline-btn">
                <Link to="/contact" className="btn btn-white-border btn-lg">
                  <i className="fa fa-play mr-10" />
                  App Store
                </Link>
              </div>
              <div className="cta-inline-btn">
                <Link to="/contact" className="btn shine-btn btn-lg btn-blue ">
                <i className="fa fa-apple mr-10" />
                  Play Store
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
