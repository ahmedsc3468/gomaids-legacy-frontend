import React, { Component } from "react";
import { Link } from "react-router-dom";

// import breadcrumbbg from "../../assets/img/bg/cleanitems.jpg";
import contactbg from "../../assets/img/bg/contactus-header.jpg";
import "../../assets/MyCSS/home-pages.css";

class BreadcrumbContact extends Component {
  render() {
    return (
      <section
        className="inner-banner find-service-banner-txt flex-center"
        style={{ backgroundImage: "url(" + contactbg + ")" }}
      >
        <div className="container">
          <div className="row z-5 mt-85 align-items-center">
            <div className="col-lg-7 text-center text-lg-left">
              <h1 className="blue">{this.props.breadcrumb.pagename}</h1>
            </div>
            <div className="col-lg-5 text-center text-lg-right">
              <ul className="inner-bnr-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>{this.props.breadcrumb.pagename}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BreadcrumbContact;
