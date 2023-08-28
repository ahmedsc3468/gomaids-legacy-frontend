import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Smallcallback from '../../layouts/Smallcallback';
import { withRouter } from 'react-router-dom';
import sectionbg from '../../../assets/img/bg/about-vector.png';
import { isEmail } from "validator";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";

//import AuthService from "../services/auth.service";

//import config from 'config.json';
//<meta name="api_token" content="{{ Auth::user()->api_token }}"></meta>


const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const username = value => {
    if (value.length < 1 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  
  const fname = value => {
    if (value.length < 1 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          Enter Your First Name must be between 3 and 40 characters.
        </div>
      );
    }
  };
  
  const lname = value => {
    if (value.length < 1 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          Enter Your Last Name must be between 3 and 40 characters.
        </div>
      );
    }
  };
  
  const password = value => {
    if (value.length < 1 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  
  const role_id = value => {
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
        // this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeC_Password = this.onChangeC_Password.bind(this);
        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
    
        this.state = {
          username: "",
          email: "",
          password: "",
          c_password:"",
          fname:"",
          lname: "",
          role:[],
          role_id: '',
          usernameError: "",
          fnameError: "",
          lnameError: "",
          emailError:"",
          passwordError:"",
          role_idError: '',
          successful: false,
          message: "",
          Loader:false
        };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value.trim()
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value.trim()
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
      
      onChangeC_Password(e) {
        // if(e.target.value===this.state.c_password){
        //   console.log("maatched")
        // }
        this.setState({
          c_password: e.target.value
        });
      }

      onChangeFname(e) {
        this.setState({
          fname: e.target.value
        });
      }
    
      onChangeLname(e) {
        this.setState({
          lname: e.target.value.trim()
        });
      }
      
      onChangeRole(e) {
        this.setState({
          role_id: e.target.value
        });
      }

      validate(){
        let username = "";
        let fname = "";
        let lname = "";
        let role_id = "";
        let c_password = "";
        let usernameError = "";
        let emailError = "";
        let passwordError = "";
        let c_passwordError = "";
        let fnameError = "";
        let lnameError = "";

        if(!this.state.username){
          usernameError = "Username field is required";
          }
        if(!this.state.fname){
            fnameError = "first name field is required";
          }
        if(!this.state.lname){
            lnameError = "last name field is required";
          }
          
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email || reg.test(this.state.email) === false){
            console.log(emailError);
        emailError = "Email Field is Invalid ";
        }
        var passreg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        if(!this.state.password || passreg.test(this.state.password)===false){
        passwordError = "Password field is required check";
        }
        if(emailError || passwordError || usernameError || fnameError || lnameError){
        this.setState({emailError,passwordError,usernameError,fnameError,lnameError});
        this.setState({ loader:false });
        return false;
        }

        this.setState({emailError,passwordError,usernameError,fnameError,lnameError});
        this.setState({ loader:false });
        return true;
        }

        submit(e){
          e.preventDefault();
          if(this.validate()){
          console.log(this.state);
          }
  
          this.setState({
            message: "",
            loading: true
          });
          
          if (this.validate() === true) {
            console.log("validate === True")
            AuthService.register(
              this.state.username,
              this.state.email,
              this.state.password,
              this.state.fname,
              this.state.lname,
              this.state.role_id,
            ).then(
              () => {
                console.log(this.state)
                this.props.history.push("/Setupwizard");
                // window.location.reload();
              },
              response => {
                console.log(response)
                  const user_id = response.data.user_id
                  //console.log(url)
                  let url = config.SERVER_URL + `api/role/${this.state.role_id}/user/${response.data.user_id}`
                 // let url = `http://127.0.0.01:8000/api/role/${this.state.role_id}/user/${response.data.user_id}`
                  console.log(url)
                  console.log(user_id)
                  
                  axios.post(url)
                  
                  console.log(url)
      
                this.setState({
                  message: response.data.message,
                  successful: true
                });
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  successful: false,
                  message: resMessage,
                  loader:false
                });
              }
            );
          }
        }

        componentDidMount(){  
          let that = this;
          console.log(this.state)
          axios.get(config.SERVER_URL + `api/user/role?exclude=super_admin`,this.state)
          .then(function(response)
          {
            console.log(response)
            that.setState({role : response.data.data.data})
          })
        }

    render() {
   //     const { currentUser } = this.getCurrentUser;

        return (
            <Fragment>
                <section className="login pt-100 pb-100">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-xl-7 col-lg-6 d-none d-lg-block">
                                <div className="login-image bg-cover h-100" style={{ backgroundImage: "url(" + sectionbg + ")" }}>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6 ">
                                <div className="form-area bg-blue">
                                    <h2 className="f-700 mb-5 white">Create an Account</h2>
                                    {/* <p className="white">Quisque enim ipsum, commodo et venenatis rutrum, luctus in enim venenatis.</p> */}
                                    <form>
                                    {!this.state.successful && ( <>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="text" className="form-control input-lg input-white shadow-5" name="username" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername} validations={[required, username]}/>                                           
                                            <i className="far fa-user transform-v-center" />
                                            <span className="text-danger">{this.state.usernameError}</span>
                                        </div>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="text" className="form-control input-lg input-white shadow-5" name="fname" placeholder="Firstname" value={this.state.fname} onChange={this.onChangeFname} validations={[required, fname]} />
                                            <i className="far fa-user transform-v-center" />
                                            <span className="text-danger">{this.state.fnameError}</span>
                                        </div>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="text" className="form-control input-lg input-white shadow-5" name="lname" placeholder="Lastname" value={this.state.lname} onChange={this.onChangeLname} validations={[required, lname]} />
                                            <i className="far fa-user transform-v-center" />
                                            <span className="text-danger">{this.state.lnameError}</span>
                                        </div>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="email" className="form-control input-lg input-white shadow-5" name="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} validations={[required, email]} />
                                            <i className="far fa-envelope transform-v-center" />
                                            <span className="text-danger">{this.state.emailError}</span>
                                        </div>
                                        <div className="form-group relative mb-20 mb-sm-20">
                                            <input type="password" className="form-control input-lg input-white shadow-5" name="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} validations={[required, password]} />
                                            <i className="fas fa-lock transform-v-center" />
                                            <span className="text-danger">{this.state.passwordError}</span>
                                        </div>
                                        <div className="form-group relative mb-20 mb-sm-20">
                                            <input type="password" className="form-control input-lg input-white shadow-5" name="c_password" placeholder="ConfirmPassword" value={this.state.c_password} onChange={this.onChangeC_Password}/>
                                            <i className="fas fa-lock transform-v-center" />
                                            <span className="text-danger">{this.state.c_passwordError}</span>
                                        </div>
                                        <div className="form-group">
                                            <label for="select-basic" className="text-white">Choose Your Service:</label>
                                            <select className="form-control input-white" name="role" placeholder="Choose Your Service" value={this.state.role_id} onChange={this.onChangeRole} validations={[required, role_id]}>
                                                <option>-- Choose Type --</option>
                                                {/* <option>Service Taker</option>
                                                <option>Service Provider</option> */}
                                                {this.state.role.map((value, key) => {
                                                const roleName = value.name.replace('_', ' ')
                                                return (
                                                <option value={value.id} key={key}>
                                                {roleName}
                                                </option>
                                                )
                                                })}
                                            </select>
                                        </div>
                                        {/* </>)} */}
                                        <div className="form-group form-check pl-0">
                                            <div className="d-flex justify-content-between">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked />
                                                    <label className="custom-control-label fs-13" htmlFor="customCheck1"><span className="label-check white">Remember me</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-black btn-block mt-20" onClick={(e)=>this.submit(e)}>Sign Up</button>
                                        <div className="signup-login text-center">
                                            <p className="mt-15 fs-13 white">
                                                Already a member? <Link to="/login" className="ml-5 mb-0 d-inline-block white f-500">Login</Link>
                                            </p>
                                        </div>
                                        </>)}
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

export default withRouter(Content);