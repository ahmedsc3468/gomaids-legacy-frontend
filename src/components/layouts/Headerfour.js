import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Menu from "./Menu";

import logo from "../../assets/img/logo/gomaids-logo.png";

class Headerfour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navmethod: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  // Navigation
  toggleNav() {
    this.setState({
      navmethod: !this.state.navmethod,
    });
  }
  render() {
    return (
      <header>
        <div className="topheader">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 d-none d-lg-block">
                <div className="left-head">
                  <span className="email mr-20 fs-15 f-500">
                    <i className="fas fa-envelope blue mr-10" />
                    info@gomaidz.com
                  </span>
                  <div className="social-head d-inline">
                    <ul className="social-icons ">
                      <li>
                        {" "}
                        <Link to="/">
                          <i className="fab fa-facebook-f" />
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/">
                          <i className="fab fa-twitter" />
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/">
                          <i className="fab fa-linkedin-in" />
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="/">
                          <i className="fab fa-google-plus-g" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-6 text-left text-lg-center">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="col-lg-4 col-6 text-right">
                <div className="right-head">
                  <span className="fs-15 f-500">
                    <i className="fas fa-phone blue mr-10" />
                    +1 (236) 808-6010
                  </span>
                  <Link to="/" className="btn btn-blue btn-md ml-20">
                    Request Delivery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-head bg-black">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9">
                <div className="header-1">
                  <nav
                    className={classNames("main-menu-1 menu-4", {
                      active: this.state.navmethod,
                    })}
                  >
                    <div className="d-flex align-items-center">
                      <Menu className="menu" />
                    </div>
                  </nav>
                  <div
                    className={classNames("mobile-trigger", {
                      active: this.state.navmethod,
                    })}
                    onClick={this.toggleNav}
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 text-right">
                <Link to="#" className="search-popup">
                  <i className="fas fa-search white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Headerfour;
