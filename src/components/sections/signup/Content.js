import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Smallcallback from "../../layouts/Smallcallback";
import { withRouter } from "react-router-dom";
import sectionbg from "../../../assets/img/bg/signup-1.jpg";
import { isEmail } from "validator";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import { SignUpData } from "../../../actions/setAvailability";
import { connect } from "react-redux";
import "../../../assets/css/style.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { bindActionCreators } from "redux";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { Eye, EyeOff } from "react-feather";
import "../../../assets/MyCSS/loginpage.css";
import swal from "sweetalert";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const username = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const fname = (value) => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Enter Your First Name must be between 3 and 40 characters.
      </div>
    );
  }
};

const lname = (value) => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Enter Your Last Name must be between 3 and 40 characters.
      </div>
    );
  }
};

const password = (value) => {
  if (value.length < 1 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

// const mobile_no = (value) => {
//   if (value.length < 1 || value.length > 16) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The Mobile Number must be enter.
//       </div>
//     );
//   }
// };

const role_id = (value) => {
  if (value.role_id == null) {
    return (
      <div className="alert alert-danger" role="alert">
        Must Choose Service.
      </div>
    );
  }
};

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.data.username,
      email: this.props.data.email,
      password: this.props.data.password,
      c_password: this.props.data.c_password,
      fname: this.props.data.fname,
      lname: this.props.data.lname,
      // mobile_no: this.props.data.mobile_no,
      role: [],
      role_id: this.props.data.role_id,
      usernameError: "",
      fnameError: "",
      lnameError: "",
      emailError: "",
      // mobile_noError: "",
      passwordMatchError: "",
      passwordError: "",
      role_idError: "",
      successful: false,
      message: "",
      tempErrorUnique: {},
      loader: false,
      hidden: true,
      hiddeneye: true,
      confirmhidden: true,
      confirmhiddeneye: true,
      isOtpInputDisabled: true,
      isSignUpButtonDisabled: false,
      verificationCode: "",
    };

    this.onChangeTextFields = this.onChangeTextFields.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShowConfirm = this.toggleShowConfirm.bind(this);
    const user_check = AuthService.getCurrentUser();
    if (user_check?.accessToken) {
      this.props.history.push("/");
    }
  }
  toggleShow(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
    this.setState({ hiddeneye: !this.state.hiddeneye });
  }
  toggleShowConfirm(e) {
    e.preventDefault();
    this.setState({ confirmhidden: !this.state.confirmhidden });
    this.setState({ confirmhiddeneye: !this.state.confirmhiddeneye });
  }

  onChangeTextFields = (e) => {
    let Name = e.currentTarget.name;
    if (Name) {
      let error = Name + "Error";
      this.setState({ [Name]: e.currentTarget.value, [error]: "" });
    }
    if (Name === "c_password") {
      if (
        this.state.password &&
        this.state.password !== e.currentTarget.value
      ) {
        this.setState({ passwordMatchError: "Passwords Don't Match" });
      } else this.setState({ passwordMatchError: "" });
    } else this.setState({ [Name]: e.currentTarget.value });
  };

  validate() {
    let username = "";
    let fname = "";
    let lname = "";
    let role_idError = "";
    let c_password = "";
    let usernameError = "";
    let emailError = "";
    let passwordError = "";
    let c_passwordError = "";
    let fnameError = "";
    let lnameError = "";
    // let mobile_noError = "";
    let passwordMatchError = "";

    if (!this.state.username) {
      usernameError = "Username field is required";
    }
    if (!this.state.fname) {
      fnameError = "first name field is required";
    }
    if (!this.state.lname) {
      lnameError = "last name field is required";
    }
    if (!this.state.c_password) {
      c_passwordError = "Confirm Password is required";
    }
    // if (!this.state.mobile_no) {
    //   mobile_noError = "Mobile Number is required";
    // }
    if (!this.state.role_id) {
      role_idError = "Please Select Service Type";
    }

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email || reg.test(this.state.email) === false) {
      // console.log(emailError);
      emailError = "Email Field is Invalid ";
    }
    var upperCaseLetters = /[A-Z]/g;
    if (upperCaseLetters.test(this.state.password) === false) {
      passwordError = "Password field must have one Uppercase letter";
    }
    var lowerCaseLetters = /[a-z]/g;
    if (lowerCaseLetters.test(this.state.password) === false) {
      passwordError = "Password field must have one Lowercase letter";
    }

    var numbers = /[0-9]/g;
    if (numbers.test(this.state.password) === false) {
      passwordError = "Password field must have one number";
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(this.state.password) === false) {
      passwordError = "Password field must have one special character";
    }
    if (!this.state.password || this.state.password.length < 8) {
      passwordError = "Password must have 8 or more characters";
    }
    // if(this.state.password !==this.state.c_password ){
    //     passwordError = "Password and Confirm password does not match";
    // }
    if (this.state.passwordMatchError) return false;
    if (
      emailError ||
      passwordError ||
      usernameError ||
      fnameError ||
      lnameError ||
      c_passwordError ||
      // mobile_noError ||
      role_idError
    ) {
      this.setState({
        emailError,
        passwordError,
        usernameError,
        fnameError,
        lnameError,
        c_passwordError,
        role_idError,
        // mobile_noError,
        loader: false,
      });
      return false;
    }

    this.setState({
      emailError,
      passwordError,
      usernameError,
      fnameError,
      lnameError,
      // mobile_noError,
    });
    return true;
  }

  async signup(e) {
    e.preventDefault();
    this.setState({
      loader: true,
      error: "",
    });
    if (this.validate() === true) {
      const register_data = await AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.fname,
        this.state.lname,
        this.state.role_id
        // this.state.mobile_no
      );
      console.log(register_data);

      if ("message" in register_data.data) {
        this.props.checkAvailability({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          c_password: this.state.c_password,
          fname: this.state.fname,
          lname: this.state.lname,
          role_id: this.state.role_id,
          // mobile_no: this.state.mobile_no,
        });
        console.log(this.state.role_id);
        if (this.state.role_id === 3) {
          axios.post(
            config.SERVER_URL + "/api/servicetaker",
            { user_id: register_data.data.data.id },
            {
              headers: authHeader(),
            }
          );
        }
        this.setState({ loader: false });

        window.location.href = "/email-verification";
      } else {
        const len = register_data.data.error_message.length;

        let tempErrorUnique = {};

        for (let i = 0; i < len; i++) {
          if (register_data.data.error_message[i].includes("username")) {
            tempErrorUnique.username = register_data.data.error_message[i];
          }
          if (register_data.data.error_message[i].includes("email")) {
            tempErrorUnique.email = register_data.data.error_message[i];
          }
          // if (register_data.data.error_message[i].includes("mobile")) {
          //   tempErrorUnique.mobile_no = register_data.data.error_message[i];
          // }
        }
        this.setState({ loader: false, tempErrorUnique });
        // window.scrollIntoView(100, 556767);
      }
    }
  }

  submit(e) {
    e.preventDefault();

    this.setState({
      loader: true,
      error: "",
    });

    if (this.validate()) {
      console.log(this.state);
    }
    if (this.validate() === true) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.fname,
        this.state.lname,
        this.state.role_id
        // this.state.mobile_no
      )
        .then(async (response) => {
          if ("message" in response.data) {
            try {
              const { data } = await axios.post(
                `${config.SERVER_URL}/api/verifymail`,
                {
                  email: this.state.email,
                }
              );
              this.setState({
                isOtpInputDisabled: false,
                isSignUpButtonDisabled: false,
              });
              console.log("verifyEmail Response ", data);
              this.setState({
                loader: false,
              });
              swal(
                "Successful!",
                "Verification Code Sent Successfully!",
                "success"
              );
            } catch (error) {
              console.error(error);
            }

            this.props.checkAvailability({
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              c_password: this.state.c_password,
              fname: this.state.fname,
              lname: this.state.lname,
              role_id: this.state.role_id,
              // mobile_no: this.state.mobile_no,
            });
            if (this.state.role_id === 3) {
              axios.post(
                config.SERVER_URL + "/api/servicetaker",
                { user_id: response.data.data.id },
                {
                  headers: authHeader(),
                }
              );
            }
          } else {
            const len = response.data.error_message.length;

            let tempErrorUnique = {};

            for (let i = 0; i < len; i++) {
              if (response.data.error_message[i].includes("username")) {
                tempErrorUnique.username = response.data.error_message[i];
              }
              if (response.data.error_message[i].includes("email")) {
                tempErrorUnique.email = response.data.error_message[i];
              }
              // if (response.data.error_message[i].includes("mobile")) {
              //   tempErrorUnique.mobile_no = response.data.error_message[i];
              // }
            }
            this.setState({ loader: false, tempErrorUnique });
            // window.scrollIntoView(100, 556767);
          }
        })
        .catch((error) => {});
    }
  }

  async verifyCode(e) {
    e.preventDefault();
    this.setState({ loader: true });
    try {
      const {
        data: { data },
      } = await axios.post(`${config.SERVER_URL}/api/verifymailcode`, {
        email: this.state.email,
        code: this.state.verificationCode,
      });

      if (data.is_verified === 1) {
        this.props.history.push("/Setupwizard");
      } else {
        this.setState({ loader: false });
        swal(
          "Invalid Verification Code",
          "The verification code you entered is invalid.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    // window.scrollTo(0, 20);
    let that = this;

    axios
      .get(config.SERVER_URL + `/api/user/role?exclude=super_admin`, this.state)
      .then(function (response) {
        that.setState({ role: response.data.data.data });
      });
  }

  render() {
    const errorMsgClassPassword =
      this.state.passwordError || this.state.passwordMatchError
        ? ""
        : "text-right";
    const errorMsgClassC_Password =
      this.state.c_passwordError || this.state.passwordMatchError
        ? ""
        : "text-right";

    return (
      <Fragment>
        <section className="login pt-100 pb-100">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-xl-7 col-lg-6 d-none d-lg-block">
                <div
                  className="login-image bg-cover h-100"
                  style={{
                    backgroundImage: "url(" + sectionbg + ")",
                  }}
                ></div>
              </div>
              <div className="col-xl-5 col-lg-6 login-form-container position-relative">
                {this.state.loader && (
                  <div className="position-absolute loader-login">
                    <Box
                      sx={{
                        position: "relative",
                        top: 40,
                        display: "inline-flex",
                      }}
                    >
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
                <div className="form-area bg-blue">
                  <h2 className="f-700 mb-5 white">Create an Account</h2>
                  <form>
                    {!this.state.successful && (
                      <>
                        <div className="form-group relative mb-25 mb-sm-20">
                          <input
                            type="text"
                            className="form-control input-lg input-white shadow-5"
                            name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onChangeTextFields}
                            validations={[required, username]}
                          />
                          <i className="far fa-user transform-v-center" />

                          {this.state.usernameError && (
                            <span className="text-danger">
                              {this.state.usernameError}
                            </span>
                          )}
                          {this.state.tempErrorUnique.username && (
                            <span className="text-danger">
                              {this.state.tempErrorUnique.username}
                            </span>
                          )}
                        </div>
                        <div className="form-group relative mb-25 mb-sm-20">
                          <input
                            type="text"
                            className="form-control input-lg input-white shadow-5"
                            name="fname"
                            placeholder="First Name"
                            value={this.state.fname}
                            onChange={this.onChangeTextFields}
                            validations={[required, fname]}
                          />
                          <i className="far fa-user transform-v-center" />
                          <span className="text-danger">
                            {this.state.fnameError}
                          </span>
                        </div>
                        <div className="form-group relative mb-25 mb-sm-20">
                          <input
                            type="text"
                            className="form-control input-lg input-white shadow-5"
                            name="lname"
                            placeholder="Last Name"
                            value={this.state.lname}
                            onChange={this.onChangeTextFields}
                            validations={[required, lname]}
                          />
                          <i className="far fa-user transform-v-center" />
                          <span className="text-danger">
                            {this.state.lnameError}
                          </span>
                        </div>
                        <div className="form-group relative mb-25 mb-sm-20">
                          <input
                            type="email"
                            className="form-control input-lg input-white shadow-5"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onChangeTextFields}
                            validations={[required, email]}
                          />
                          <i className="far fa-envelope transform-v-center" />
                          {this.state.emailError && (
                            <span className="text-danger">
                              {this.state.emailError}
                            </span>
                          )}

                          {this.state.tempErrorUnique.email && (
                            <span className="text-danger">
                              {this.state.tempErrorUnique.email}
                            </span>
                          )}
                        </div>

                        <div
                          className={`form-group relative mb-10 mb-sm-20 ${errorMsgClassPassword}`}
                        >
                          <input
                            type={this.state.hidden ? "password" : "text"}
                            className="form-control input-lg input-white shadow-5"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onChangeTextFields}
                            validations={[required, password]}
                          />
                          {/* <button  onClick={this.toggleShow}>Show / Hide</button> */}
                          <i
                            className={
                              this.state.hiddeneye
                                ? "fa fa-eye-slash transform-v-center"
                                : "fa fa-eye transform-v-center"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={this.toggleShow}
                          ></i>

                          {!this.state.passwordError &&
                            !this.state.passwordMatchError && (
                              <PasswordStrengthMeter
                                password={this.state.password}
                              />
                            )}

                          {this.state.passwordError && (
                            <span className="text-danger">
                              {this.state.passwordError}
                            </span>
                          )}
                          {this.state.passwordMatchError && (
                            <span className="text-danger">
                              {this.state.passwordMatchError}
                            </span>
                          )}
                        </div>
                        <div
                          className={`form-group relative mb-10 mb-sm-20 ${errorMsgClassC_Password}`}
                        >
                          <input
                            type={
                              this.state.confirmhidden ? "password" : "text"
                            }
                            className="form-control input-lg input-white shadow-5"
                            name="c_password"
                            placeholder="ConfirmPassword"
                            value={this.state.c_password}
                            onChange={this.onChangeTextFields}
                            validations={[required, password]}
                          />
                          {/* <i className="fas fa-lock transform-v-center" /> */}
                          <i
                            className={
                              this.state.confirmhiddeneye
                                ? "fa fa-eye-slash transform-v-center"
                                : "fa fa-eye transform-v-center"
                            }
                            style={{ cursor: "pointer" }}
                            onClick={this.toggleShowConfirm}
                          ></i>

                          {!this.state.c_passwordError &&
                            !this.state.passwordMatchError && (
                              <PasswordStrengthMeter
                                password={this.state.c_password}
                              />
                            )}
                          {this.state.c_passwordError && (
                            <span className="text-danger">
                              {this.state.c_passwordError}
                            </span>
                          )}
                          {this.state.passwordMatchError && (
                            <span className="text-danger">
                              {this.state.passwordMatchError}
                            </span>
                          )}
                        </div>
                        {/* <div className="form-group relative mb-25 mb-sm-20">
                          <input
                            type="Number"
                            pattern="^(\+(([0-9]){1,2})[-.])?((((([0-9]){2,3})[-.]){1,2}([0-9]{4,10}))|([0-9]{10}))$"
                            className="form-control input-lg input-white shadow-5"
                            name="mobile_no"
                            placeholder="Mobile Number"
                            value={this.state.mobile_no}
                            onChange={this.onChangeTextFields}
                            validations={[required, mobile_no]}
                          />
                          <i className="fas fa-mobile transform-v-center" />
                          {this.state.mobile_noError && (
                            <span className="text-danger">
                              {this.state.mobile_noError}
                            </span>
                          )}
                          {this.state.tempErrorUnique.mobile_no && (
                            <span className="text-danger">
                              {this.state.tempErrorUnique.mobile_no}
                            </span>
                          )}
                        </div> */}
                        <div className="form-group">
                          <select
                            className="form-control input-white"
                            name="role_id"
                            placeholder="Choose Your Service"
                            value={this.state.role_id}
                            onChange={this.onChangeTextFields}
                            validations={[required, role_id]}
                            defaultValue="-- Are you a --"
                          >
                            <option value="" hidden>
                              -- Are you a --
                            </option>
                            {this.state.role.map((value, index) => {
                              const roleName = value.name.replace("_", " ");
                              if (index === 0) {
                                const modifiedRole = "Service Provider";
                                return (
                                  <option value={value.id} key={index}>
                                    {modifiedRole}
                                  </option>
                                );
                              } else if (index === 1) {
                                // modify the name of the second item
                                const modifiedName = "Customer";
                                return (
                                  <option value={value.id} key={index}>
                                    {modifiedName}
                                  </option>
                                );
                              } else {
                                return (
                                  <option value={value.id} key={index}>
                                    {roleName}
                                  </option>
                                );
                              }
                            })}
                            {/* {this.state.role.map(
                                                            (value, key) => {
                                                                const roleName =
                                                                    value.name.replace(
                                                                        "_",
                                                                        " "
                                                                    );
                                                                return (
                                                                    <option
                                                                        value={
                                                                            value.id
                                                                        }
                                                                        key={
                                                                            key
                                                                        }
                                                                    >
                                                                        {
                                                                            roleName
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )} */}
                          </select>
                          <span className="text-danger">
                            {this.state.role_idError}
                          </span>
                        </div>

                        <div className="form-group form-check pl-0">
                          <div className="d-flex justify-content-between">
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                                defaultChecked
                              />
                              <label
                                className="custom-control-label fs-13"
                                htmlFor="customCheck1"
                              >
                                <span className="label-check white">
                                  Remember me
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <button
                                                    type="submit"
                                                    className="btn btn-black btn-block mt-20"
                                                    onClick={(e) =>
                                                        this.submit(e)
                                                    }
                                                >
                                                    Send OTP
                                                </button> */}
                        {/* <div className="form-group">
                                                    <hr className="bg-white mt-40 mb-40" />
                                                </div> */}
                        {/* <div className="form-group relative mb-25 mb-sm-20">
                                                    <input
                                                        type="text"
                                                        className="form-control input-lg input-white shadow-5"
                                                        name="otp"
                                                        value={this.state.verificationCode}
                                                        placeholder="OTP"
                                                        onChange={(e) => this.setState({verificationCode: e.target.value})}
                                                        disabled={this.state.isOtpInputDisabled}

                                                    />
                                                    <i className="fas fa-key transform-v-center" />
                                                </div> */}
                        <button
                          type="submit"
                          className="btn btn-black btn-block mt-20"
                          disabled={this.state.isSignUpButtonDisabled}
                          onClick={(e) => this.signup(e)}
                        >
                          Sign Up
                        </button>
                        <div className="signup-login text-center mb-0">
                          <p className="mt-15 fs-13 white">
                            Already a member?{" "}
                            <Link
                              to="/login"
                              className="ml-5 mb-0 d-inline-block white f-500"
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      </>
                    )}
                    {this.state.message && (
                      <div className="form-group">
                        <div
                          className={
                            this.state.successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {this.state.message}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Smallcallback />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.setAvailability,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAvailability: (data) => dispatch(SignUpData(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Content)
);
