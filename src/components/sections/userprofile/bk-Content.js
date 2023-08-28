import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";

class UserDetails extends Component {
    schema = {
        username: Joi.string().required().label("User Name"),
        fname: Joi.string().required().label("First name"),
        lname: Joi.string().required().label("Last Name"),
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password"),
        dob: Joi.string().required().label("date of Birth"),
        identification_number: Joi.string().required().label("Identification Number"),
        mobile_no: Joi.string().required().label("Mobile Number"),
        street_address: Joi.string().required().label("Street Address"),
        country_id: Joi.string().required().label("Country Name"),
        state_id: Joi.string().required().label("State Name"),
        city: Joi.string().required().label("City Name"),
        default_address: Joi.string().required().label("Default Address"),
        role_id: Joi.string().required().label("Chose Service Type"),
        name: Joi.string().required().label("Service Name"),
        description: Joi.string().required().label("Service Description"),
    };
    constructor(props) {
        super(props);

        let user = AuthService.getCurrentUser();
        this.handleInputChange = this.handleInputChange.bind(this);
        console.log(user);

        this.state = {
            user_id: user.id,
            username: user.username,
            fname: user.fname,
            lname: user.lname,
            email: "",
            password: "",
            c_password: "",
            old_password: "",
            dob: "",
            identification_number: "",
            mobile_no: "",
            image: "",
            street_address: "",
            country_id: "",
            state_id: "",
            city: "",
            default_address: "",
            role_id: "",
            name: "",
            description: "",
        };
    }

    validate = () => {
        const { error } = Joi.validate(
            {
                username:this.state.username,
                fname:this.state.fname,
                name: this.state.name,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                dob: this.state.dob,
                identification_number: this.state.identification_number,
                mobile_no: this.state.mobile_no,
                street_address: this.state.street_address,
                country_id: this.state.country_id,
                state_id: this.state.state_id,
                city: this.state.city,
                default_address: this.state.default_address,
                role_id: this.state.role_id,
                description: this.state.description },
            this.schema,
            {
                abortEarly: false,
            }
        );
        if (!error) return null;
        let errors = {};
        if (error) {
            for (let item of error.details) {
                errors[item.path] = item.message;
            }
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

     async componentDidMount() {
       // console.log("userProfileProps::", this.props);
         const userSession = JSON.parse(localStorage.getItem("user"));
         this.setState({user:userSession.user})
         const { data} = await axios.get(
             config.SERVER_URL + `/api/user/${userSession.id}`,
             {
                 headers: authHeader(),
             }
         );
        // console.log(this.props);
        //console.log("roles:::", roles.data);

         const UserDetails = data.data;
         console.log("userdetails",UserDetails)
         this.setState({
            username: UserDetails.username,
            fname: UserDetails.fname,
            lname: UserDetails.fname,
            email: UserDetails.email,
            password: UserDetails.password,
            dob: UserDetails.dob,
            identification_number: UserDetails.identification_no,
            mobile_no: UserDetails.mobile_no,
        //     image: UserDetails.image,
        //     street_address: UserDetails.username,
        //     country_id: UserDetails.username,
        //     state_id: UserDetails.username,
        //     city: UserDetails.username,
        //     default_address: UserDetails.username,
        //     role_id: UserDetails.username,
        //     name: UserDetails.username,
        //     description: UserDetails.username,
         });
    }

    handleInputChange(event) {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        this.setState({
            [name]: value,
        });
    }

    async submit(e) {
        {

            let errors = this.validate();
            if (errors) this.setState({ errors });


            // console.log("username", this.state.username)
            // let {response} = await axios.put(
            //     config.SERVER_URL + `/api/user/${userSession.user_id}/profile`, this.state,
            //     {
            //         headers: authHeader(),
            //     }
            // )

        }

    }

    render() {
        console.log("inside render", this.state.user)
        return (
            <Grid.Column
                style={{
                    maxWidth: 550,
                    paddingTop: 10,
                    marginLeft: 150,
                    paddingBottom: 30,
                }}
            >
                <Form>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-row">
                        <div className="form-group col">
                            {/* <Segment> */}
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.username}
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
                                    // defaultValue={values.fname}
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
                                    // defaultValue={values.lname}
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
                                    // defaultValue={values.email}
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
                                <label>Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.password}
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
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Date Of Birth</label>
                                <input
                                    name="dob"
                                    type="date"
                                    placeholder="Date Of Birth"
                                    value={this.state.dob}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.dob}
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
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Image</label>
                                <input
                                    name="image"
                                    type="file"
                                    placeholder="Image"
                                    value={this.state.image}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.image}
                                />
                            </Form.Field>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Identification Number</label>
                                <input
                                    name="identification_no"
                                    type="number"
                                    placeholder="Identification Number"
                                    value={this.state.identification_number}
                                    onChange={this.handleInputChange}

                                    // defaultValue={values.identification_number}
                                />
                                {this.state.errors &&
                                this.state.errors.identification_number && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.identification_number}
                                    </div>
                                    )}
                            </Form.Field>
                        </div>
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Mobile Number</label>
                                <input
                                    name="mobile_no"
                                    type="number"
                                    placeholder="Mobile Number"
                                    value={this.state.mobile_no}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.mobile_no}
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
                    </div>
                    <Form.Field>
                        <label>You Are</label>
                        <select
                            name="role_id"
                            type=""
                            placeholder="service"
                            value={this.state.role_id}
                            onChange={this.handleInputChange}
                            // defaultValue={values.role_id}
                        >
                            <option> Choose Service </option>
                        </select>
                        {this.state.errors &&
                                this.state.errors.role_id && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.role_id}
                                    </div>
                                    )}
                    </Form.Field>

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
                                    // defaultValue={values.street_address}
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
                                <select
                                    name="country_id"
                                    type="text"
                                    placeholder="Country"
                                    value={this.state.country_id}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.country_id}
                                >
                                <option> Choose Country </option>
                                </select>
                                {this.state.errors &&
                                this.state.errors.country_id && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.country_id}
                                    </div>
                                    )}
                            </div>

                            <div className="form-group col-md-4">
                                <select
                                    name="state_id"
                                    type="text"
                                    placeholder="State"
                                    value={this.state.state_id}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.state_id}
                                >
                                    <option> Choose State </option>
                                </select>
                                {this.state.errors &&
                                this.state.errors.state_id && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.state_id}
                                    </div>
                                    )}
                            </div>

                            <div className="form-group col-md-4">
                                <input
                                    name="city"
                                    type="text"
                                    placeholder="City"
                                    value={this.state.city}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.city}
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
                                    // defaultValue={values.default_address}
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
                        </div>
                    </Form.Field>

                    <Form.Field>
                        <label>Service Type</label>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <select
                                    name="name"
                                    type=""
                                    placeholder="Service Name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.name}
                                >
                                    <option> Choose Service </option>
                                </select>
                                {this.state.errors &&
                                this.state.errors.name && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.name}
                                    </div>
                                    )}
                            </div>
                            <div className="form-group col-md-12">
                                <input
                                    name="description"
                                    type="text"
                                    placeholder="Service Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    // defaultValue={values.description}
                                />
                                {this.state.errors &&
                                this.state.errors.description && (
                                <div
                                    style={{
                                    color: "#DA1212",
                                    fontWeight: "500",
                                    fontSize: "0.95rem",
                                    }}
                                    >
                                    {this.state.errors.description}
                                    </div>
                                    )}
                            </div>
                        </div>
                    </Form.Field>
                    <button
                        type="submit"
                        className="btn btn-black btn-block mt-20"
                        onClick={(e) => this.submit(e)}
                    >
                        {" "}
                        Update Profile
                    </button>
                    {/* </Segment> */}
                </Form>
            </Grid.Column>
        );
    }
}
export default UserDetails;