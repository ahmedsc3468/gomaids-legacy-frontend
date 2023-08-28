import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Button, Dimmer, Loader, Label } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";
import swal from 'sweetalert';
import Select from "react-select";
import CircularProgress from '@mui/material/CircularProgress';
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        let user = AuthService.getCurrentUser();

        this.state = {
            role: user.role[0],
            user_id: user.id,
            oldpassword: "",
            password: "",
            confirmpassword: "",
            status: 0,
            oldpassword:"",
            password: "",
            confirmpassword: "",
            oldpasswordError: "",
            passwordError: "",
            confirmpasswordError: "",
            hidden: true,
            hiddeneye:true,
            confirmhidden:true,
            confirmhiddeneye:true,
            oldhidden:true,
            oldhiddeneye:true,
        };

        this.source = axios.CancelToken.source()
       
        this.toggleShow = this.toggleShow.bind(this);
        this. toggleShowconfirm = this. toggleShowconfirm.bind(this);
        this. toggleShowold = this. toggleShowold.bind(this);
    }
    toggleShowold(e) {
        e.preventDefault();
        this.setState({ oldhidden: !this.state.oldhidden });
        this.setState({ oldhiddeneye: !this.state.oldhiddeneye });
    }
    toggleShow(e) {
        e.preventDefault();
        this.setState({ hidden: !this.state.hidden });
        this.setState({ hiddeneye: !this.state.hiddeneye });
    }
    toggleShowconfirm(e) {
        e.preventDefault();
        this.setState({ confirmhidden: !this.state.confirmhidden });
        this.setState({ confirmhiddeneye: !this.state.confirmhiddeneye });
    }
  
    onChangeTextFields = (e) => {

        let Name = e.currentTarget.name;
        if (Name) {
            let error = Name + "Error";
            this.setState({ [Name]: e.currentTarget.value, [error]: "" })
        }
        if (Name === "confirmpassword") {
            if (this.state.password && this.state.password !== e.currentTarget.value) {
                this.setState({ passwordMatchError: "Passwords Don't Match" })
            }
            else this.setState({ passwordMatchError: "" })
        }
        else
            this.setState({ [Name]: e.currentTarget.value })

    }
    validate = () => {
        let oldpasswordError = "";
        let passwordError = "";
        let confirmpasswordError = "";
        const { error } = Joi.validate(
            {
                oldpassword: this.state.oldpassword,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword,
            },
            this.schema,
            {
                abortEarly: false,
            }
        );
        if (!this.state.oldpassword) {
            oldpasswordError = "oldpassword field is required";
        }
        if (!this.state.password) {
            passwordError = "password field is required";
        }
        if (!this.state.confirmpassword) {
            confirmpasswordError = "confirm password field is required";
        }
        if(this.state.password !== this.state.confirmpassword){
            this.setState({
                errors:"password and confirm password not match"
            })
        }
        if (!error) return null;
        let errors = {};
        if (error) {
            for (let item of error.details) {
                errors[item.path] = item.message;
            }
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    resetForm = async () => {

        this.setState({
            password: "",
            oldpassword: "",
            confirmpassword: ""
        })
    }
    async componentDidMount() {
        try {

        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillUnmount() {
        this.source.cancel('Dispute Component is unmounted')
    }

    handleInputChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        this.setState({
            [name]: value,
        });
    }
    onChangeSelectedFields = (e) => {

        const value = e.value;
        const label = e.label;
        this.setState({
            selectedOrderId: e,
        });

    }
    
    async submit() {
        var upperCaseLetters = /[A-Z]/g;
        var lowerCaseLetters = /[a-z]/g;
        var numbers = /[0-9]/g;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(!this.state.oldpassword){
            this.setState({
            oldpasswordError:"This field is required"
            })
        }
        // else if(!this.state.password){
        //     this.setState({
        //     passwordError:"This field is required"
        //     })
        // }
        else if(!this.state.password || this.state.password.length < 8 ){
            this.setState({
            passwordError : "Password must have 8 or more characters"
        })
        }
        else if(!this.state.confirmpassword){
            this.setState({
            confirmpasswordError:"This field is required"
            })
        }
        else if(this.state.confirmpassword !== this.state.password ){
            this.setState({
            confirmpasswordError:"password and confirm password miss match"
            })
        }
        
        else if(upperCaseLetters.test(this.state.password)===false) {
            this.setState({
                    passwordError:"Password must have atleast one Uppercase letter"
                    })
        }
        
        else if(lowerCaseLetters.test(this.state.password)===false) {
            this.setState({
                passwordError:"Password must have atleast one Lowercase letter"
                })
        }

        
        else if(numbers.test(this.state.password)===false) {
            this.setState({
                passwordError:"Password must have atleast one number"
                })
        }
        
        else if(specialChars.test(this.state.password)===false) {
            this.setState({
                passwordError:"Password must have atleast one Special Character"
                
                })
        }
        
        else{

            const tempData = {
                user_id: this.state.user_id,
                password: this.state.oldpassword,
                // password: this.state.password,
                newpassword:this.state.confirmpassword
            }
    console.log('::::: TempData ::::', tempData)
            try {
                const update = await axios.post(config.SERVER_URL + `/api/changepassword/${this.state.user_id}`, tempData,
                    {
                        headers: authHeader(),
                    })
                    this.resetForm();
                    console.log(update);
                    if(update.data.data.error){
                        this.setState({
                            oldpasswordError:update.data.data.error,
                            oldpassword: tempData.password,
                            password: tempData.newpassword,
                            confirmpassword:tempData.newpassword
                            })
                    }else{

                        swal("SuccessFull!", "Your Password Has Been Updated SuccessFully!", "success")
                    }
                    
            }
            catch (errors) {
                console.log(errors)
            }
        }


    }
    render() {
        return (
            <> <Grid.Column
                style={{

                }}
                className='cust-userdashboard-dispute'
            >
                <Form>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-row">
                    <div className="form-group col-md-3"></div>
                        <div className="form-group col-md-6">
                        <Form.Field>
                                <label>Old Password</label>
                                <input
                                    name="oldpassword"
                                    type={this.state.oldhidden ? 'password' : 'text'}
                                    placeholder="Old Password"
                                    className="form-control input-lg input-white shadow-5"
                                    value={this.state.oldpassword}
                                    onChange={
                                        this.handleInputChange
                                    }
                                    validations={[
                                        required
                                    ]}
                                    
                                />
                                    <i className={this.state.oldhiddeneye ? "fa fa-eye-slash transform-v-center":"fa fa-eye transform-v-center"}  style={{cursor: 'pointer',transform:'none'}} onClick={this. toggleShowold}></i>
                                {
                                    this.state.oldpasswordError && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.oldpasswordError}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-3"></div>
                        <div className="form-group col-sm-6">
                            <Form.Field>
                                <label>New Password</label>
                                <input
                                    name="password"
                                    type={this.state.hidden ? 'password' : 'text'}
                                    className="form-control input-lg input-white shadow-5"
                                    placeholder="New Password"
                                    value={this.state.password}
                                    onChange={
                                        this.handleInputChange
                                    }
                                    validations={[
                                        required
                                    ]}
                                    
                                />
                                    <i className={this.state.hiddeneye ? "fa fa-eye-slash transform-v-center":"fa fa-eye transform-v-center"}  style={{cursor: 'pointer',transform:'none'}} onClick={this.toggleShow}></i>

                                {
                                    this.state.passwordError && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.passwordError}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-3"></div>
                        <div className="form-group col-sm-6">
                            <Form.Field>
                                <label> Confrim New Password</label>

                                <input
                                    name="confirmpassword"
                                    type={this.state.confirmhidden ? 'password' : 'text'}

                                    placeholder="Confrim New Password"
                                    className="form-control input-lg input-white shadow-5"
                                    value={this.state.confirmpassword}
                                    onChange={
                                        this.onChangeTextFields
                                    }
                                    validations={[
                                        required
                                    ]}
                                />
                                    <i className={this.state.confirmhiddeneye ? "fa fa-eye-slash transform-v-center":"fa fa-eye transform-v-center"}  style={{cursor: 'pointer',transform:'none'}} onClick={this.toggleShowconfirm}></i>

                                {
                                    this.state.confirmpasswordError && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.confirmpasswordError}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>
                    <div className="form-row">
                    <div className="form-group col-md-3"></div>
                        <div className="form-group col-sm-6">
                    <button
                        type="submit"
                        className="btn btn-black btn-block mt-20"
                        onClick={(event) => this.submit(event)}
                    >
                        Update Password
                    </button>
                    </div>
                    </div>
                </Form>

            </Grid.Column>
            </>
        );
    }
}
export default ChangePassword;