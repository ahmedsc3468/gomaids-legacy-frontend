import React from 'react';
import Contacthelper from '../../../helper/Contacthelper';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, Form } from 'react-bootstrap';
import "../../../assets/MyCSS/contactdetail.css";
import authService from '../../../services/auth.service';
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import $ from 'jquery';
import swal from "sweetalert";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Joi from "joi-browser";



class Contactdetail extends Contacthelper {

    // objectSchema = Joi.object({
    //     label: Joi.string().required().label("Service").required(),
    //     value: Joi.number().required().label("Service").required()
    // }).required()

    // schema = {
    //     name: Joi.string().required().label("Name"),
    //     email: Joi.string().required().label("Email"),
    //     mobile_no: Joi.string().required().label("Phone No"),
    //     message: Joi.string().required().label("Message"),
    //     service_type_id: Joi.required().label("Service Type"),
    // };

    _isMounted = false
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            services_type: [],
            service_type_id: '',
            name: "",
            email: "",
            mobile_no: "",
            message: "",
            status: 0,
            errors: "",
            loader: false
        };
    }

    // validate = () => {
    //     let obj = {
    //         name: this.state.name,
    //         email: this.state.email,
    //         mobile_no: this.state.mobile_no,
    //         message: this.state.message,
    //         service_type_id: this.state.service_type_id,
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

    validateProperty = ({ value, name }) => {
        let dataProperty = { [name]: value };
        let subSchema = { [name]: this.schema[name] };


        const { error } = Joi.validate(dataProperty, subSchema);

        return error ? error.details[0].message : null;
    };

    async componentDidMount() {

        //service_type api
        const services_type = await axios.get(config.SERVER_URL + `/api/servicetypes`,
            {
                headers: authHeader(),
            }
        );
        this.setState({ services_type: services_type.data.data })
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
            [name]: value
        });
    }

    resetForm() {
        this.setState({ name: "", mobile_no: "", email: "", service_type_id: "", message: "", })
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
            error: ""
        })

        const tempData = {
            name: this.state.name,
            email: this.state.email,
            mobile_no: this.state.mobile_no,
            service_type_id: parseInt(this.state.service_type_id),
            status: this.state.status,
            message: this.state.message,
        }

        try {
            const storeContactForm = await axios.post(config.SERVER_URL + `/api/contactdetail`, tempData,
                {
                    headers: authHeader(),
                })
            this.setState({
                loader: false
            });
            this.resetForm();
            swal("SuccessFull!", "Your Request Has Been Sent SuccessFully!", "success")

        }
        catch (errors) {
            this.setState({
                loader: false,
            });
            swal("Not Submit!", "Your Request Has Been Failed!", "danger")
            console.log(errors)
        }
    }

    render() {
        return (
            <section className="contact pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3 className="fs-26 f-700 mb-5 cust-right-container-h">We are Here for You</h3>
                            {/* <p className="mb-20 cust-right-container-disc">Feel Free To Contact Us. </p> */}
                            <div className="hr-1 bg-black opacity-1 mb-20" />
                            <h4 className="fs-20 f-700 mb-15">Contact Information</h4>
                            <ul className="contacts-list">
                                <li className="mb-15">
                                    <span className="icon bg-blue"><i className="fas fa-phone" /></span>
                                    <span className="sub-head">Phone</span>
                                    <p>+1 (236) 808-6010</p>
                                </li>
                                <li>
                                    <span className="icon bg-blue"><i className="fas fa-envelope" /></span>
                                    <span className="sub-head">Email</span>
                                    <p>info@gomaidz.com</p>
                                </li>
                            </ul>
                            <div className="hr-1 bg-black opacity-1 mt-25 mb-25" />
                            <h4 className="fs-20 f-700 mb-15">Address</h4>
                            <ul className="contacts-list">
                                <li>
                                    <span className="icon bg-blue"><i className="fas fa-map-marker-alt" /></span>
                                    <span className="sub-head">Location</span>
                                    <p>127 Westmore Dr, Unit 119, Etobicoke, ON M9V 3Y6, Canada</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-7 offset-lg-1">
                            {this.state.loader && <div className="position-absolute loader-contact_form">

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
                            <div className="contact-form bg-blue mt-md-45">
                                <h3 className="fs-26 f-700 white mb-20">Get in Touch with Us</h3>
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="text" className="form-control input-white" placeholder="Full Name" name="name" value={this.state.name} onChange={this.handleInputChange} required />
                                                <i className="far fa-user transform-v-center" />
                                                {/* {
                                                    this.state.errors.name
                                                    &&
                                                    <span className="text-danger">
                                                        {
                                                            this.state.errors.name

                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="email" className="form-control input-white" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                                                <i className="far fa-envelope transform-v-center" />
                                                {/* {
                                                    this.state.errors.email
                                                    &&
                                                    <span className="text-danger">
                                                        {
                                                            this.state.errors.email

                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <input type="number" className="form-control input-white" min='0' placeholder="Phone Number" name="mobile_no" value={this.state.mobile_no} onChange={this.handleInputChange} required />
                                                <i className="fas fa-phone transform-v-center" />
                                                {/* {
                                                    this.state.errors.mobile_no
                                                    &&
                                                    <span className="text-danger">
                                                        {
                                                            this.state.errors.mobile_no

                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <label for="service_type_id"><h5>Search by Category</h5></label>
                                                <select className="form-control input-white select-nice mb-xs-15 step-two" name='service_type_id' id='service_type_id' onChange={(e) => { this.setState({ service_type_id: e.target.value }) }} required>
                                                    <option value=''>Select Service</option>
                                                    {this.state.services_type.map((value) => {
                                                        return (
                                                            <option value={value.id} key={value.id}>
                                                                {value.name}
                                                            </option>
                                                        )
                                                    }
                                                    )}
                                                </select>
                                            </div>
                                        </div> */}

                                        <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <select className="form-control input-white select-nice mb-xs-15 step-two" name='service_type_id' id='service_type_id' value={this.state.service_type_id} onChange={this.handleInputChange} required>
                                                    <option value=''>Select Service</option>
                                                    {this.state.services_type.map((value) => {
                                                        return (
                                                            <option value={value.id} key={value.id}>
                                                                {value.name}
                                                            </option>
                                                        )
                                                    }
                                                    )}
                                                </select>
                                                {/* {
                                                    this.state.errors.service_type_id &&
                                                    <span className="text-danger">
                                                        {
                                                            this.state.errors.service_type_id
                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6">
                                            <div className="form-group relative">
                                                <select className="form-control input-white select-nice mb-xs-15" name="subject" value={this.state.subject} onChange={this.onSubjectChange} required>
                                                    <option>Select Your Service</option>
                                                    <option>Home Cleaning</option>
                                                    <option>Office Cleaning</option>
                                                    <option>Carpet Cleaning</option>
                                                </select>
                                            </div>
                                        </div> */}
                                        <div className="col-lg-12">
                                            <div className="form-group relative">
                                                <textarea className="form-control input-white light-border mb-25" cols={30} rows={7} placeholder="Your message" name="message" value={this.state.message} onChange={this.handleInputChange} required />
                                                {/* {
                                                    this.state.errors.message
                                                    &&
                                                    <span className="text-danger">
                                                        {
                                                            this.state.errors.message

                                                        }
                                                    </span>
                                                } */}
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            {/* <ReCAPTCHA
                                                sitekey="6LdxUhMaAAAAAIrQt-_6Gz7F_58S4FlPWaxOh5ib"
                                                onChange={this.reCaptchaLoaded.bind(this)}
                                                size="invisible"
                                            /> */}
                                            <button type="submit" onClick={(event) => this.submit(event)} className="btn btn-black shine-btn">Submit</button>
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
                    <div className="row mt-45">
                        <div className="col-lg-12">
                            <div className="map-responsive contact-map">
                                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.7763638537626!2d-79.60347522457923!3d43.73597244707463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3aff597d8d5f%3A0xb4446c720180aa18!2s127%20Westmore%20Dr%2C%20Etobicoke%2C%20ON%20M9V%203Y6%2C%20Canada!5e0!3m2!1sen!2s!4v1694437116878!5m2!1sen!2s" height={400} allowFullScreen />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contactdetail;