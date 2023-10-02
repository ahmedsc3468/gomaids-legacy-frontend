import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Form } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";
import swal from 'sweetalert';
import "../../../assets/MyCSS/userdashboard.css"
import CircularProgress from '@mui/material/CircularProgress';
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import Progress from "./progress";
// import "../../../assets/MyCSS/progress.css"

// import { checkPropTypes } from "prop-types";

class UserDetails extends Component {
    schema = {
        username: Joi.string().required().label("User Name"),
        image: Joi.string().required().label("image"),
        fname: Joi.string().required().label("First name"),
        lname: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
        dob: Joi.string().required().label("date of Birth"),
        mobile_no: Joi.string().required().label("Mobile Number"),
        street_address: Joi.string().required().label("Street Address"),
        country: Joi.string().required().label("Country Name"),
        state: Joi.string().required().label("State Name"),
        city: Joi.string().required().label("City Name"),
        default_address: Joi.string().required().label("Default Address"),
        postal_code: Joi.string().required().label("Postal Code"),
        role_id: Joi.string().required().label("Chose Service Type"),
        name: Joi.string().required().label("Service Name"),
        description: Joi.string().required().label("Service Description"),
    };

    constructor(props) {
        super(props);

        this.userDet = React.createRef();
        this.userDet = AuthService.getCurrentUser();
        let user = AuthService.getCurrentUser()
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            role: user.role[0],
            user_id: user.id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            email: "",
            password: "",
            c_password:"",
            dob: "",
            identity: "",
            mobile_no: "",
            image: user.avatar,
            street_address: "",
            country: "",
            state: "",
            city: "",
            default_address: "",
            role_id: "",
            postal_code: "",
            isPending: true,
            confrm:"",
            isOpen: false,
            isClose: false,
            otpError:"",
            is_verified: user.is_verified,
            profile_completion:"",

        };
        this.source = axios.CancelToken.source()
    }

    validate = () => {
        const { error } = Joi.validate(
            {
                image: this.state.image,
                username: this.state.username,
                fname: this.state.fname,
                name: this.state.name,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                c_password: this.state.c_password,
                dob: this.state.dob,
                mobile_no: this.state.mobile_no,
                street_address: this.state.street_address,
                country: this.state.country,
                state: this.state.state,
                city: this.state.city,
                default_address: this.state.default_address,
                postal_code: this.state.postal_code,
                role_id: this.state.role_id,
                description: this.state.description
            },
            this.schema,
            {
                abortEarly: false,
            }
        );
        if (!error) return null;
        let errors = {};
        // if(this.state.password!==this.state.c_password){
        //     errors['password'] = "password and confirm password doesn't match";  
        // }
        if (error) {
            for (let item of error.details) {
                errors[item.path] = item.message;
            }
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    openModal = async () => {
        await axios.put(config.SERVER_URL + `/api/user/${this.state.user_id}`, { mobile_no: this.state.mobile_no },
        {
            headers: authHeader(),
        })
        const requestBody = { 'user_id': this.state.user_id, 'mobile_no': this.state.mobile_no }
        const { data } = await axios.post(config.SERVER_URL + `/api/resendsms`, requestBody,
        {
            headers: authHeader(),
        })
        if (data.success === false) {
            swal("Error!", "Something went wrong.", "danger")
        }
        this.setState({ isOpen: true});
    }

    closeModal = () => {      
        this.setState({ isOpen: false });
        this.setState({otpError : false})
        this.resetForm();
    }

    async componentDidMount() {
        window.scrollTo(0, 0);

        try {


            let user = AuthService.getCurrentUser();

            const fetchUserData = axios.get(
                config.SERVER_URL + `/api/user/${user.id}`,
                {
                    headers: authHeader(),
                    cancelToken: this.source.token
                }
            );
            const { data } = await fetchUserData

            const UserDetails = data.data;
            // console.log(":::: 145 :::::",UserDetails)

            this.setState({
                user: user,
                country: UserDetails.location?.country,
                state: UserDetails.location?.state,
                city: UserDetails.location?.city,
                street_address: UserDetails.location?.street_address,
                default_address: UserDetails.location?.default_address,
                postal_code: UserDetails.location?.postal_code,
                username: UserDetails.username,
                fname: UserDetails.fname,
                lname: UserDetails.lname,
                email: UserDetails.email,
                password: UserDetails.password,
                dob: UserDetails.dob,
                identity: config.SERVER_URL + "/" + UserDetails.identity,
                mobile_no: UserDetails.mobile_no,
                image: config.SERVER_URL + "/" + UserDetails.image,
                // roleData,
                isPending: false,
                is_verified: UserDetails.is_verified,
                profile_completion: UserDetails.profile_completion,
            });
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        window.scrollTo(0, 0);
        if (this.source)
            this.source.cancel('User Profile component unmounted')
    }

    handleInputChange(event) {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        this.setState({
            [name]: value,
        });
    }
    onChangeModal = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        this.setState({
            [name]: value,
        });
    }

    handleImageUpload = (event) => {
        // const that=this
        const name = event.target.name
        if (event.target.files[0]) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                if (name === 'image') {
                    this.setState({ image: reader.result })
                } else if (name === 'identity') {
                    this.setState({ identity: reader.result })
                }
            })
            reader.readAsDataURL(event.target.files[0])
        }
    }

    optp = async (event) => {
        event.preventDefault()

        const ob = {
            id: this.state.user_id,
            otp : this.state.verifyCode,
            mobile_no:this.state.mobile_no
        }
        const ot = await axios.post(config.SERVER_URL + `/api/verifymobile`, ob)
        console.log("ot",ot.data.message);
        if(ot.data.success === false)
        {
            this.setState({otpError : ot.data.message})
            this.resetForm();
        }
        if(ot.data.message === "User mobile number is verified.")
        {
            swal("success!", " Your mobile number has been verified.!", "success")
            this.closeModal();
            this.componentDidMount();
        }
    }
    resetForm = async () => {
        this.setState({
            verifyCode: ""
        })
    }

    async submit(event, errors, values) {
        // if(this.state.password!==this.state.c_password){
        //     window.confirm("Password and confirm password not match")
        // }else{
let that=this;
            swal({
                title: "Are you sure?",
                // text: "You will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(async function(isConfirm) {
                  localStorage.setItem('DD',1)
                // });
                var confirmation= localStorage.getItem('DD');
       
            console.log(confirmation)
            if(confirmation == 1){
                that.setState({ image: that.state.image.replace(config.SERVER_URL + "/", ''), identity: that.state.identity.replace(config.SERVER_URL + "/", '',) })
                const update = await axios.put(config.SERVER_URL + `/api/user/${that.userDet.id}/profile`, that.state)
    
                that.setState({ image: config.SERVER_URL + "/" + update.data.data.image, identity: config.SERVER_URL + "/" + update.data.data.identity })
                // console.log("::::::: After Upload ::::::", update)
                swal("Updated!", "Your Profile Has Been Update!", "success")
                localStorage.removeItem('DD')
                that.componentDidMount();

            }
        });
    }

    render() {

        // console.log(this.state.is_verified)

        return (
            <> {this.state.isPending ? <div className="text-center"> <CircularProgress color="success" /></div> : <Grid.Column
              
                className='cust-userprofile-container'
            >
                <Form>
                <div className="form-row">
                        <div className="form-group col cust-barProg" >
                            {/* <p> profile complition </p> */}
                            <Progress 
                                profile_completion = {this.state.profile_completion}
                            />
                            
                            {/* <Form.Field>
                                <input
                                    name="progress"
                                    type="text"
                                    readOnly
                                    value={"your profile is " + this.state.profile_completion + "% complete"}
                                    // onChange={this.handleInputChange}
                                    style={{
                                        backgroundColor: 'aquamarine',
                                        textAlign: 'center'
                                    }}
                                />
                            </Form.Field> */}
                        </div>
                    </div>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-row ">
                        <div className="form-group col " style={{ textAlign: "center" }}>
                            <Form.Field>
                                <span style={{ position: 'relative' }}>
                                    <img src={this.state.image} className="circle-image my-2"
                                        style={{
                                            width: "75px",
                                            height: "75px",
                                            objectFit: "contain",
                                            borderRadius: "50%"
                                        }}
                                        alt='user_image'
                                    />
                                    <span style={{
                                        position: "absolute",
                                        top: "30px",
                                        right: "0"
                                    }}>
                                        <i className="fa fa-plus-circle" aria-hidden="true" onClick={() => { document.getElementById('image').click() }} style={{
                                            boxShadow: "0px 0px 3px #454545",
                                            borderRadius: "50%",
                                            fontSize: "1.2rem",
                                            cursor: "pointer",
                                            color: "#007bff"
                                        }}>
                                        </i>

                                        <input type="file"
                                            name="image"
                                            id="image"
                                            onChange={this.handleImageUpload}
                                            style={{ display: "none" }}

                                        />
                                    </span>
                                </span>

                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.username && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.username}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>First Name</label>
                                <input
                                    name="fname"
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.fname}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.fname && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.fname}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Last Name</label>
                                <input
                                    name="lname"
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lname}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.lname && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.lname}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Email</label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    readOnly
                                />
                                {this.state.errors &&
                                    this.state.errors.email && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.email}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>

                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Date Of Birth</label>

                                <input
                                    name="dob"
                                    type="date"
                                    placeholder="Date Of Birth"
                                    max={new Date().toISOString().split('T')[0]}
                                    value={this.state.dob}
                                    onChange={this.handleInputChange}

                                />
                                {this.state.errors &&
                                    this.state.errors.dob && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.dob}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>
                    <div className="form-row">
                    {/* <div className="form-group col-md-6">
                            <Form.Field>
                                <label>New Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    
                                />
                                {this.state.errors &&
                                    this.state.errors.password && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.password}
                                        </div>
                                    )}
                            </Form.Field>
                        </div> */}
                       {/* <div className="form-group col-md-6">
                             <Form.Field>
                                <label>Confirm New Password</label>
                                <input
                                    name="c_password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.c_password}
                                    onChange={this.handleInputChange}
                                 
                                />
                                {this.state.errors &&
                                    this.state.errors.password && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.password}
                                        </div>
                                    )}
                            </Form.Field> 
                        </div>*/}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Mobile Number</label>
                                <input
                                    name="mobile_no"
                                    type="tel"
                                    placeholder="Mobile Number"
                                    value={this.state.mobile_no}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.mobile_no && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.mobile_no}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                        <div className="form-group verifybuton col-md-6">
                        <button
                        hidden={this.state.is_verified == '1' || this.state.mobile_no === null}
                            type="submit"
                            className="btn btn-black btn-small cust-verify-button"
                            onClick={this.openModal}>
                                verify
                            </button>
                        </div>
                    </div>

                    <Form.Field>
                        <label>Address</label>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input
                                    name="street_address"
                                    type="text"
                                    placeholder="Street Address"
                                    value={this.state.street_address}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.street_address && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.street_address}
                                        </div>
                                    )}
                            </div>
                            <div className="form-group col-md-4">
                                <input
                                    name="country"
                                    type="text"
                                    placeholder="Country"
                                    value={this.state.country}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.country && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.country}
                                        </div>
                                    )}
                            </div>

                            <div className="form-group col-md-4">
                                <input
                                    name="state"
                                    type="text"
                                    placeholder="State"
                                    value={this.state.state}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.state && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.state}
                                        </div>
                                    )}
                            </div>

                            <div className="form-group col-md-4">
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="city"
                                    value={this.state.city}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.city && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.city}
                                        </div>
                                    )}
                            </div>
                            <div className="form-group col-md-12">
                                <input
                                    name="default_address"
                                    type="text"
                                    placeholder="Default Address"
                                    value={this.state.default_address}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.default_address && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.default_address}
                                        </div>
                                    )}
                            </div>

                            <div className="form-group col-md-6">
                                <input
                                    name="postal_code"
                                    type="text"
                                    placeholder="Postal Code"
                                    value={this.state.postal_code}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.postal_code && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.postal_code}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </Form.Field>

                    <Form.Field>
                        <label>Identity Verification</label>
                    </Form.Field>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <Form.Field>
                                <div className="form-row">
                                    <div className="form-group col " style={{ textAlign: "center" }}>
                                        <Form.Field>
                                            <span>
                                                <img src={this.state.identity} alt=""
                                                    style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        objectFit: "contain",
                                                    }} />
                                            </span>
                                        </Form.Field>
                                    </div>
                                </div>
                                <span>Change Driver's License / Passport Image</span>
                                <input type="file"
                                    name="identity"
                                    id="identity"
                                    onChange={this.handleImageUpload}
                                />
                            </Form.Field>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-black btn-block mt-20"
                        onClick={(event) => this.submit(event)}
                    >
                        Update Profile
                    </button>
                </Form>

            </Grid.Column>}

            <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>Verification Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Field>
                                <label>Enter Verification Code</label>
                                <input
                                    name="verifyCode"
                                    type="text"
                                    // onKeyDown={this.state.otpError = ""}
                                    maxLength={4}
                                    placeholder="Verification Code"
                                    value={this.state.verifyCode}
                                    onChange={this.onChangeModal} />

{
                                    this.state.otpError && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.otpError}
                                        </div>
                                    )}
                            </Form.Field>                           
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.closeModal}
                        >
                            Cancel
                        </Button>
                        <Button className="ui inverted green button another_service_btn"
                            onClick={this.optp}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>

                </Modal>



            </>
        );
    }
}
export default UserDetails;