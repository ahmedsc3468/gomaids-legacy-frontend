import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
// import footerbg from "../../assets/img/bg/footerbg-1.jpg";
import logo from "../../assets/img/logo/logo.png";
// import { AssessmentTwoTone } from "@material-ui/icons";
import "../../assets/MyCSS/footermob.css";

class Footer extends Component {
  _isMounted = false;
  constructor(props) {
    let user = AuthService.getCurrentUser();
    super(props);
    this.state = {
      user_role: user ? user.role.name : "notsignin",
    };
  }
  // Back to top
  componentDidMount() {
    this._isMounted = true;

    window.addEventListener(
      "scroll",
      () => {
        if (this._isMounted) {
          this.setState({
            isTop: window.scrollY > 800,
          });
        }
      },
      false
    );
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const isLoggedIn = this.state.user_role;
    const backtotop = this.state.isTop ? "opacity-10" : "";
    return (
      <footer
        className="pt-40 pb-45 z-15 footer-1 custom_mmaidz"
        style={{ backgroundColor: "#EEF4F3" }}
        data-overlay={8}
        // style={{ backgroundImage: "url(" + footerbg + ")", backgroundSize: "contain" }}
      >
        <div className="container">
          <div className="row z-5 justify-content-between">
            <div className="col-lg-5 col-md-6 mb-md-60 mb-sm-40">
              <div className="logo-footer mb-1 custom_displaymaidz">
                <Link to="/">
                  <img src={logo} alt="" style={{ marginTop: "-30px" }} />
                </Link>
              </div>
              {/* <h6 className="mb-25 ">
                            When it comes to GoMaids, the object of the word 'Go' reflects our motive to add value to our customers' lives by providing all the essential services in their day-to-day lives.
                            On the other hand, the word 'Maidz' highlights our motive to reduce the unemployment by hiring in-house staff whom we train in any given skills.
                            </h6> */}
              <h6 className="mb-15 foooterparagraphp">
                Discover the epitome of cleanliness with GoMaids, your trusted
                maids provider. At GoMaids, we believe in the power of
                'Go'—signifying action, efficiency, and a leap towards
                immaculate spaces. Our dedicated team ensures your home is
                pristine, allowing you to 'Go' about your life worry-free.
                Embrace cleanliness, choose GoMaids.
              </h6>
              <div className="contact-footer">
                <ul>
                  {/* <li className="mb-10 white">
                    <i className="fas fa-phone blue" />
                    +1 (236) 808-6010
                  </li> */}
                  <li>
                    <i className="fas fa-envelope blue" />
                    info@gomaidz.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 mb-md-60 mb-sm-40 footer-link-wrap">
              <h3 className="fs-20 f-700 ">Quick Links</h3>
              <span className="footer-lines" />
              <ul className="footer-links white">
                <li>
                  <Link to="/about">
                    <i className="fas fa-angle-double-right" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <i className="fas fa-angle-double-right" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  {/* <a href="/privacy-policy" target="_blank">
                                    <i className="fas fa-angle-double-right" />
                                        Privacy Policy  
                                    </a> */}
                  <Link to="/privacy-policy">
                    <i className="fas fa-angle-double-right" />
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="col-lg-3 col-md-6 mb-sm-40">
              <h3 className="fs-20 f-700 ">Our Services</h3>
              <span className="footer-lines" />
              <ul className="footer-links">
                <li>
                  <Link
                    to="/find-a-services"
                    onClick={() => localStorage.setItem("searchservice", 1)}
                  >
                    <i className="fas fa-angle-double-right" />
                    Maid{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-a-services"
                    onClick={() => localStorage.setItem("searchservice", 2)}
                  >
                    <i className="fas fa-angle-double-right" />
                    Cook{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/find-a-services"
                    onClick={() => localStorage.setItem("searchservice", 3)}
                  >
                    <i className="fas fa-angle-double-right" />
                    Cleaner{" "}
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className="col-lg-2 col-md-6 text-center">
              <div className="footer-buttons">
                
                  <Link to="/find-a-services" className="btn shine-btn btn-lg mb-15 btn-blue">Order Now</Link>
                
              
                {isLoggedIn === "notsignin" ? (
                  <Link
                    to="/partner-with-us"
                    className="btn btn-blue-border mb-15 btn-lg"
                  >
                    Join Us
                  </Link>
                ) : (
                  <></>
                )}

                {/* <Link
                                    to=""
                                    className="btn btn-blue-border btn-lg"
                                >
                                    Newsletter
                                </Link> */}
              </div>
              <ul className="social-icons footer mt-10 white">
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=61556105240510"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/gomaidz/" target="_blank">
                    <i className="fab fa-brand fa-instagram" />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.linkedin.com/company/gomaidz/?viewAsMember=true"
                    target="_blank"
                  >
                    <i className="fab fa-solid fa-linkedin" />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@gomaids" target="_blank">
                    <i className="fab fa-tiktok" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row z-5">
            <div className="col-lg-12">
              <div className="hr-2 bg-light-white  mb-10 opacity-1" />
            </div>
            <div className="col-lg-12">
              <p className="mb-0">© GoMaids 2024 Allright Reserved</p>
            </div>
            <div className="col-lg-4 text-center">
              <Link
                to="#"
                className={`scroll-btn bg-blue opacity-0 ${backtotop}`}
                onClick={() => this.scrollToTop()}
              >
                <i className="fas fa-arrow-up" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
