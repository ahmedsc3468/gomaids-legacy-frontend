import React, { Component, Fragment, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Smallcallback from '../../layouts/Smallcallback';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import sectionbg from '../../../assets/img/bg/login.jpg';
import config from "../../../config.json";
import AuthService from "../../../services/auth.service"
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/MyCSS/loginpage.css";
import "../../../assets/css/style.css";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Content extends Component {

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      error: "",
      hidden:true,
      hiddeneye:true,
      loader: false
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() { 
    window.scrollTo(0, 200);
  }
  toggleShow(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
    this.setState({ hiddeneye: !this.state.hiddeneye });
}

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }


  validate() {
    let emailError = "";
    let passwordError = "";

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email || reg.test(this.state.email) === false) {

      emailError = "Email Field is Invalid ";
    }
    if (!this.state.password) {
      passwordError = "Password field is required";
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      this.setState({ loader:false });
      return false;
    }

    this.setState({ emailError, passwordError });
   
    return true;
  }

  submit(e) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    window.scrollTo(0,500);
    e.preventDefault();
    this.setState({ loader: true,
      error: ""
    })

    if (this.validate() === true) {
      AuthService.login(this.state.email, this.state.password).then(
        (res) => {

          if (res === undefined) {

            this.setState({
              loader: false,
              error: "Email or password Invalid"
            });
          }
          else {
            if(res.data.role.name=="service_taker"){

              this.props.history.replace("/find-a-services");
            }else{
              this.props.history.replace("/Userdashboard");
            }
          }
        }
      );
    }
  }

  render() {
    return (
      <Fragment>
        <section className="login pt-100 pb-100">
          <div className="container">
            <div className="row no-gutters">
              <div className="col-xl-7 col-lg-6 d-none d-lg-block">
                <div className="login-image bg-cover h-100" style={{ backgroundImage: "url(" + sectionbg + ")" }}>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 login-form-container position-relative">
                {this.state.loader && <div className="position-absolute loader-login">

                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress color='success' size={80} />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="common.white"
                      >Please Wait</Typography>
                    </Box>
                  </Box>

                </div>
                }

                <div className="form-area bg-blue">
                  <h2 className="f-700 mb-5 white">Have an Account?</h2>

                  <form>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-group relative mb-25 mb-sm-20">

                      <input type="text" className="form-control input-lg input-white shadow-5  "
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        validations={[required]}
                        placeholder="Enter Your Email"
                      />

                      <i className="far fa-user transform-v-center" />
                      <span className="text-danger">{this.state.emailError}</span>
                    </div>
                    <div className="form-group relative mb-20 mb-sm-20">
                      <input
                         type={this.state.hidden ? 'password' : 'text'}
                        className="form-control input-lg input-white shadow-5"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        validations={[required]}
                        placeholder="Enter Your Password"
                      />
                      <i className={this.state.hiddeneye ? "fa fa-eye-slash transform-v-center":"fa fa-eye transform-v-center"} style={{cursor:'pointer'}} onClick={this.toggleShow}/>
                      <span className="text-danger">{this.state.passwordError}</span>
                    </div>
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block custom_login_btn"
                        onClick={(e) => this.submit(e)}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Login</span>
                      </button>
                    </div>
                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                          {this.state.message}
                        </div>
                      </div>
                    )}
                    <div className="form-group form-check pl-0">
                      <div className="d-flex justify-content-between">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="rememberMe" checked={this.state.rememberMe} onChange={e => { this.setState({ 'rememberMe': e.target.value }) }} />
                          <label className="custom-control-label fs-13" htmlFor="rememberMe" ><span className="label-check white" >Remember me</span></label>
                        </div>
                        <Link to="/forgot_password" className="fs-12 white">Forgot Password?</Link>
                      </div>
                    </div>
                    <div className="signup-login text-center">
                      <p className="mt-15 fs-13 white">
                        New here?<Link to="/signup" className="ml-5 mb-0 d-inline-block white f-500">Sign up</Link>
                      </p>
                    </div>
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

export default withRouter(Content);