import React from "react";
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
              <p className="fs-20 mb-4 ">
                Are you a skilled and hardworking maid or cleaner looking to
                expand your opportunities? Look no further – GoMaidz is
                revolutionizing the way you find work! Our platform aggregates
                maids and cleaners, connecting them with clients seeking
                reliable and efficient cleaning services.
              </p>
              <p className="fs-20 mb-4 ">
                By joining GoMaidz as a freelancer, you gain access to a vast
                pool of potential clients, boosting your chances of securing
                more work. Our user-friendly website simplifies the process for
                both clients and freelancers, allowing you to receive orders
                conveniently and efficiently. Showcase your expertise, set your
                schedule, and increase your income by taking on jobs that match
                your skills.
              </p>
              <p className="fs-20 mb-4 ">
                GoMaidz prioritizes transparency, ensuring fair compensation for
                your hard work. Plus, our platform provides a valuable
                opportunity to build a reputation and receive reviews,
                establishing trust with potential clients. Don't miss out on the
                chance to elevate your career as a freelance maid or cleaner.
                Join GoMaidz today, where more work means more opportunities for
                success. Embrace the future of cleaning services and take
                control of your career with GoMaidz!
              </p>
              <p className="fs-20 mb-4 ">
                So, fill the form now, and one of our representatives will be in
                touch with you soon to discuss this opportunity further.
              </p>
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
