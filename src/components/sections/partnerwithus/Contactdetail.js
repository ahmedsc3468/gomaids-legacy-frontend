import React from "react";
import { Link } from "react-router-dom";
import Contacthelper from "../../../helper/Contacthelper";
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, Form } from "react-bootstrap";
import "../../../assets/MyCSS/contactdetail.css";
import authService from "../../../services/auth.service";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import $ from "jquery";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Joi from "joi-browser";
import whybgicon from "../../../assets/img/other/clean.png";
import check from "../../../assets/img/icons/check.png";
import aboutimg from "../../../assets/img/about/lady.png";

const whyuslist = [
  {
    icon: check,
    title: "Flexible Scheduling",
    text: "Work when you want, where you want.",
  },
  {
    icon: check,
    title: "Guaranteed Bookings",
    text: "Access a steady flow of cleaning jobs without chasing clients.",
  },
  { icon: check,
    title: "Fair, Transparent Pay", 
    text: "Get paid on time, every time, with no hidden feesk."
   },

  { icon: check,
    title: "Grow Your Reputation",
    text: "Earn customer reviews and climb our priority list for top jobs."
   },

    { icon: check,
    title: "Work Safely",
    text: "Every customer is verified, and our support team is always on your side."
   },
];
const whyuslist1 = [
  {
    icon: check,
    title: "Instant Access to New Clients ",
    text: "Expand your service reach without increasing ad spend.",
  },
  {
    icon: check,
    title: "Streamlined Scheduling ",
    text: "Accept jobs and dispatch staff with ease.",
  },
  { icon: check,
    title: "Consistent Revenue", 
    text: "Fill empty slots and slow periods with new opportunities."
   },

  { icon: check,
    title: "Brand Visibility",
    text: "Get listed as a trusted service provider in your local area."
   },

    { icon: check,
    title: "Back-End Support",
    text: "From payment processing to customer communication, we simplify operations."
   },
];



class Contactdetail extends Contacthelper {
  objectSchema = Joi.object({
    label: Joi.string().required().label("Service").required(),
    value: Joi.number().required().label("Service").required(),
  }).required();

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    mobile_no: Joi.number().required().label("Phone No"),
    city: Joi.string().required().label("City"),
    language: Joi.string().required().label("Language"),
    work_experience: Joi.string().required().label("Work Expierence"),
    message: Joi.string().required().label("Message"),
    service_type_id: Joi.required().label("Field of Experience"),
  };

  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      services_type: [],
      service_type_id: "",
      name: "",
      email: "",
      mobile_no: "",
      city: "",
      language: "",
      work_experience: "",
      message: "",
      errors: "",
      loader: false,
    };
  }

  validate = () => {
    let obj = {
      name: this.state.name,
      email: this.state.email,
      mobile_no: this.state.mobile_no,
      city: this.state.city,
      language: this.state.language,
      work_experience: this.state.work_experience,
      message: this.state.message,
      service_type_id: this.state.service_type_id,
    };
    const { error } = Joi.validate(obj, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    let errors = {};
    if (error) {
      for (let item of error.details) {
        errors[item.path] = item.message;
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ value, name }) => {
    let dataProperty = { [name]: value };
    let subSchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(dataProperty, subSchema);

    return error ? error.details[0].message : null;
  };

  async componentDidMount() {
    //service_type api
    const services_type = await axios.get(
      config.SERVER_URL + `/api/servicetypes`,
      {
        headers: authHeader(),
      }
    );
    console.log(services_type.data.data);
    this.setState({ services_type: services_type.data.data });
    // console.log("SERVICE TYPE", services_type.data.data)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  resetForm() {
    this.setState({
      name: "",
      mobile_no: "",
      email: "",
      city: "",
      language: "",
      work_experience: "",
      service_type_id: "",
      message: "",
    });
  }

  async submit(e) {
    e.preventDefault();

    let errors = this.validate();
    if (errors) {
      // console.log(errors)
      this.setState({ errors });
      return;
    }

    this.setState({
      loader: true,
      error: "",
    });

    const tempData = {
      full_name: this.state.name,
      email: this.state.email,
      phone_number: this.state.mobile_no,
      service: this.state.service_type_id,
      field: this.state.service_type_id,
      location: this.state.city,
      languages: this.state.language,
      experience: this.state.work_experience,
      message: this.state.message,
    };

    try {
      console.log(this.state);
      const storeContactForm = await axios.post(
        config.SERVER_URL + `/api/partnerwithus`,
        tempData,
        {
          headers: authHeader(),
        }
      );
      this.setState({
        loader: false,
      });
      this.resetForm();
      swal(
        "Successful!",
        "Your Form Has Been Submitted Successfully!",
        "success"
      );
    } catch (errors) {
      this.setState({
        loader: false,
      });
      swal("Not Submit!", "Your Request Has Been Failed!", "danger");
      console.log(errors);
    }
  }

  render() {
    return (
      <section className="contact pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
               <p className="sub-head blue f-700 mb-1">
                    <span>............</span>Partner With GOMaids<span>............</span>
                </p>
               <h1 className="mb-20">Why GOMaids?</h1>
              <p className="fs-20 mb-4 ">
                At GOMaids, we believe great cleaning deserves great opportunity. Whether you're an independent maid
                 looking for flexible work or a cleaning agency ready to expand your client base — we invite you to 
                 partner with us and grow together.
              </p>
              <p className="fs-20 mb-4 ">
                Just like Uber connects drivers to riders, GOMaids connects cleaning professionals to paying customers
                through our advanced, easy-to-use platform.
                 No marketing, no sales, no admin headaches — just real jobs, delivered straight to your phone.
              </p>
            </div>
          </div>
           <div className="row no-gutters z-5 align-items-center mb-60 mt-60">
            <div className="col-xl-5 col-lg-6">
              <div className="about-image shadow-1 ml-10 mb-md-30 relative">
              <img src={aboutimg} className="w-100" alt="" />
            </div>
            </div>
            <div className="col-xl-7 col-lg-6 wow fadeInRight">
              <div className="why-us-content">
                <p className="sub-head blue f-700 mb-1">
                  You have the skills. We have the platform.<span>............</span>
                </p>
                <h1 className="mb-10">For Individual Maids</h1>
                 <p className="mb-20">
                 Partnering with GOMaids means:
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
                <p className="mb-20">
                 All you need is a smartphone, cleaning experience, and a passion for excellence — we’ll handle the rest.
                </p> 
                <Link
                  to="/find-a-services"
                  className="btn btn-blue shine-btn ml-20 mr-20"
                >
                  Order Now
                </Link>
                <Link to="/contact" className="btn btn-blue-border mt-xs-15">
                  Contact Us
                </Link>
                <img src={whybgicon} className="why-bg-icon" alt="" />
              </div>
            </div>
          </div>
            <div className="row no-gutters z-5 align-items-center mb-60 mt-60">
              <div className="col-xl-7 col-lg-6 wow fadeInRight">
              <div className="why-us-content">
                <p className="sub-head blue f-700 mb-1">
                 Already managing a team of professional cleaners? Let’s scale your success.<span>............</span>
                </p>
                <h1 className="mb-10">For Cleaning Agencies</h1>
                 <p className="mb-20">
                 Partnering with GOMaids gives your agency:
                </p> 
                <ul className="check-list3 half-list mb-10">
                  {whyuslist1.map((item, i) => (
                    <li key={i}>
                      <img src={item.icon} alt="" />
                      <h5 className="fs-16 lh-14">{item.title}</h5>
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mb-20">
                 Whether you're a startup agency or a growing cleaning company, GOMaids helps you do more with less.
                </p> 
                <Link
                  to="/find-a-services"
                  className="btn btn-blue shine-btn ml-20 mr-20"
                >
                  Order Now
                </Link>
                <Link to="/contact" className="btn btn-blue-border mt-xs-15">
                  Contact Us
                </Link>
                <img src={whybgicon} className="why-bg-icon" alt="" />
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="about-image shadow-1 ml-10 mb-md-30 relative">
              <img src={aboutimg} className="w-100" alt="" />
            </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-lg-12">
              {this.state.loader && (
                <div className="position-absolute loader-contact_form">
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress color="success" size={80} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="common.white"
                      >
                        Please Wait
                      </Typography>
                    </Box>
                  </Box>
                </div>
              )}
              <div className="contact-form bg-blue mt-md-45">
                <h3 className="fs-26 f-700 white mb-20">
                  Get in Touch with Us
                </h3>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <input
                          type="text"
                          className="form-control input-white"
                          placeholder="Full Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                          required
                        />
                        <i className="far fa-user transform-v-center" />
                        {this.state.errors.name && (
                          <span className="text-danger">
                            {this.state.errors.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <input
                          type="email"
                          className="form-control input-white"
                          placeholder="Your Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required
                        />
                        <i className="far fa-envelope transform-v-center" />
                        {this.state.errors.email && (
                          <span className="text-danger">
                            {this.state.errors.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <input
                          type="number"
                          className="form-control input-white"
                          min="0"
                          placeholder="Phone Number"
                          name="mobile_no"
                          value={this.state.mobile_no}
                          onChange={this.handleInputChange}
                          required
                        />
                        <i className="fas fa-phone transform-v-center" />
                        {this.state.errors.mobile_no && (
                          <span className="text-danger">
                            {this.state.errors.mobile_no}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <select
                          className="form-control input-white select-nice mb-xs-15 step-two"
                          name="service_type_id"
                          id="service_type_id"
                          value={this.state.service_type_id}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Field of Experience</option>
                          {this.state.services_type.map((value) => {
                            return (
                              <option value={value.name} key={value.id}>
                                {value.name}
                              </option>
                            );
                          })}
                        </select>
                        {this.state.errors.service_type_id && (
                          <span className="text-danger">
                            {this.state.errors.service_type_id}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <input
                          type="text"
                          className="form-control input-white"
                          placeholder="Current Location (City)"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleInputChange}
                          required
                        />
                        <i className="fas fa-map-marker-alt transform-v-center" />
                        {this.state.errors.city && (
                          <span className="text-danger">
                            {this.state.errors.city}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group relative">
                        <input
                          type="text"
                          className="form-control input-white"
                          placeholder="Languages Known"
                          name="language"
                          value={this.state.language}
                          onChange={this.handleInputChange}
                          required
                        />
                        {this.state.errors.language && (
                          <span className="text-danger">
                            {this.state.errors.language}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group relative">
                        <input
                          type="number"
                          className="form-control input-white"
                          placeholder="Total Work Experience (in Years)"
                          name="work_experience"
                          value={this.state.work_experience}
                          onChange={this.handleInputChange}
                          required
                        />
                        {this.state.errors.work_experience && (
                          <span className="text-danger">
                            {this.state.errors.work_experience}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="form-group relative">
                        <textarea
                          className="form-control input-white light-border mb-25"
                          cols={30}
                          rows={7}
                          placeholder="Your message"
                          name="message"
                          value={this.state.message}
                          onChange={this.handleInputChange}
                          required
                        />
                        {this.state.errors.message && (
                          <span className="text-danger">
                            {this.state.errors.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      {/* <ReCAPTCHA
                                                sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib"
                                                onChange={this.reCaptchaLoaded.bind(this)}
                                                size="invisible"
                                            /> */}
                      <button
                        type="submit"
                        onClick={(event) => this.submit(event)}
                        className="btn btn-black shine-btn"
                      >
                        Submit
                      </button>
                      {/* Form Messages */}
                      {/* <Alert variant="success" className="d-none mt-3 mb-0" id="server_response_success">
                                                <strong>Success!</strong> Contact form has been successfully submitted.
                                            </Alert>
                                            <Alert variant="danger" className="d-none mt-3 mb-0" id="server_response_danger">
                                                <strong>Oops!</strong> Something bad happened. Please try again later.
                                            </Alert> */}
                      {/* Form Messages */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contactdetail;
