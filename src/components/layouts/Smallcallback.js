import React, { Component } from "react";
import cleanicon from "../../assets/img/other/clean.png";
import config from "../../config.json";
import authHeader from "../../services/auth-header";
import axios from "axios";
import swal from "sweetalert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Form } from "react-bootstrap";
// import Joi from "joi-browser";

class Smallcallback extends Component {
  // schema = {
  //     phone_no: Joi.string().required().label("Phone No"),
  // };

  _isMounted = false;
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      phone_no: "",
      status: 0,
      errors: "",
      loader: false,
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // validate = () => {
  //     let obj = {
  //         phone_no: this.state.phone_no,
  //     }
  //     const { error } = Joi.validate(
  //         obj,
  //         this.schema,
  //         {
  //             abortEarly: false,
  //         }
  //     );
  //     if (!error) return null;
  //     let errors = {};
  //     if (error) {
  //         for (let item of error.details) {
  //             errors[item.path] = item.message;
  //         }
  //     }

  //     return Object.keys(errors).length === 0 ? null : errors;
  // };

  // validateProperty = ({ value, name }) => {
  //     let dataProperty = { [name]: value };
  //     let subSchema = { [name]: this.schema[name] };

  //     const { error } = Joi.validate(dataProperty, subSchema);

  //     return error ? error.details[0].message : null;
  // };

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  resetForm() {
    this.setState({ phone_no: "" });
  }

  async submit(e) {
    e.preventDefault();

    // let errors = this.validate();
    // if (errors) {
    //     // console.log(errors)
    //     this.setState({ errors });
    //     return;
    // }

    this.setState({
      loader: true,
      error: "",
    });

    const tempData = {
      phone_no: this.state.phone_no,
      status: this.state.status,
    };

    try {
      // console.log(tempData)
      const storecallBack = await axios.post(
        config.SERVER_URL + `/api/callBack`,
        tempData,
        {
          headers: authHeader(),
        }
      );
      console.log(" ::: 108 line ::: ", storecallBack);
      this.setState({
        loader: false,
      });
      this.resetForm();
      swal(
        "Successful!",
        "Your Request Has Been Sent Successfully!",
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
      <section className="cta-footer relative pt-35 pb-35 bg-blue">
        <div className="container">
          <div className="row align-items-center z-5">
            {this.state.loader && (
              <div className="position-absolute loader-call_back">
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
            <div className="col-lg-5 text-center text-lg-left">
              <h2 className="white fs-40 f-700 mb-10">Get a Free Callback</h2>
              {/* <p className="white mb-0 fs-16">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
              <p className="white mb-0 fs-16">
                Questions? Fill in Your Details and We’ll Call You.
              </p>
            </div>
            <div className="col-lg-7  text-center text-lg-right mt-md-15">
              <Form>
                <div className="callback-footer-2 d-flex flex-column flex-sm-row">
                  <input
                    type="tel"
                    pattern="[0-9]{11}"
                    className="form-control input-white shadow-2"
                    placeholder="Your phone number"
                    name="phone_no"
                    value={this.state.phone_no}
                    onChange={this.handleInputChange}
                  />
                  <button
                    type="submit"
                    onClick={(event) => this.submit(event)}
                    className="btn btn-black ml-20 ml-xs-00 mt-xs-15"
                  >
                    Send Now
                  </button>
                  {/* {
                                        this.state.errors.phone_no
                                        &&
                                        <span className="text-danger callBack-error">
                                            {
                                                this.state.errors.phone_no
                                            }
                                        </span>
                                    } */}
                </div>
              </Form>
            </div>
          </div>
        </div>
        <img src={cleanicon} className="cta-cl-bg" alt="" />
      </section>
    );
  }
}

export default Smallcallback;
