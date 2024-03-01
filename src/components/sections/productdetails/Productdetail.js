import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import { Tab, Nav, Tabs } from 'react-bootstrap';
import { Grid, Header, Segment, Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import Joi, { errors } from "joi-browser";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { withRouter } from 'react-router-dom';
import { UncontrolledAlert } from 'reactstrap';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns'; // You can also use other date adapters
import TextField from '@mui/material/TextField';
import MinHeightTextarea from '../Fields/Textarea';
import "../../../assets/MyCSS/productdetail.css";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';




// import { INITIAL_EVENTS, createEventId } from './event-utils'

// Reviews
import reviewimg2 from '../../../assets/img/user/user-2.png';
import reviewimg3 from '../../../assets/img/user/user-3.png';
import reviewimg4 from '../../../assets/img/user/user-4.png';
import bigimg1 from '../../../assets/img/shop/prdt-bg1.jpg';
import bigimg2 from '../../../assets/img/shop/prdt-bg2.jpg';
import bigimg3 from '../../../assets/img/shop/prdt-bg3.jpg';
import smallimg1 from '../../../assets/img/shop/prdt-sm1.jpg';
import smallimg2 from '../../../assets/img/shop/prdt-sm2.jpg';
import smallimg3 from '../../../assets/img/shop/prdt-sm3.jpg';
// Shop main
const shopmain = [
    { img: bigimg1 },
    { img: bigimg2 },
    { img: bigimg3 },
    { img: bigimg1 },
    { img: bigimg2 },
];

// Info table

const infotable = [
    { title: 'Full Name', text: 'Lorem Ipsum' },
    { title: 'Address', text: '2.5 Kg' },
    { title: 'Order Completed', text: '12 Mtr' },
    { title: 'Rating', text: '12 Mtr' },
];

class Productdetail extends Component {
    schema = {
        timeForm: Joi.string().required().label("Starting Time"),
        timeTo: Joi.string().required().label("Ending Time"),
        date: Joi.string().required().label("Date"),
        service: Joi.string().required().label("Service"),
        
    };
    constructor(props) {
        
        
        super(props);
        
        
        
        let user = AuthService.getCurrentUser();
        let dateSplit = '';
        if (this.props.location.state !== undefined &&
            this.props.location.state.date) {
                let temp = this.props.location.state.date.split('-');
                
                dateSplit = temp[0] + "-" + temp[1] + "-" + temp[2]
                // console.log("ds:", dateSplit)
                
                
            }
            
            this.state = {
                user_id: user ? user.id : "",
                user_role: user ? user.role.name : "notsignin",
                hoursLeft: "",
                currentHours: new Date().getHours(),
                todaybit:false,
                time: [
                    { label: "1:00 AM", value: "1:00 AM" },
                    { label: "2:00 AM", value: "2:00 AM" },
                    { label: "3:00 AM", value: "3:00 AM" },
                    { label: "4:00 AM", value: "4:00 AM" },
                    { label: "5:00 AM", value: "5:00 AM" },
                    { label: "6:00 AM", value: "6:00 AM" },
                    { label: "7:00 AM", value: "7:00 AM" },
                    { label: "8:00 AM", value: "8:00 AM" },
                    { label: "9:00 AM", value: "9:00 AM" },
                    { label: "10:00 AM", value: "10:00 AM" },
                    { label: "11:00 AM", value: "11:00 AM" },
                    { label: "12:00 PM", value: "12:00 PM" },
                    { label: "1:00 PM", value: "1:00 PM" },
                    { label: "2:00 PM", value: "2:00 PM" },
                    { label: "3:00 PM", value: "3:00 PM" },
                    { label: "4:00 PM", value: "4:00 PM" },
                    { label: "5:00 PM", value: "5:00 PM" },
                    { label: "6:00 PM", value: "6:00 PM" },
                    { label: "7:00 PM", value: "7:00 PM" },
                    { label: "8:00 PM", value: "8:00 PM" },
                    { label: "9:00 PM", value: "9:00 PM" },
                    { label: "10:00 PM", value: "10:00 PM" },
                    { label: "11:00 PM", value: "11:00 PM" },
                    { label: "12:00 AM", value: "12:00 AM" },
                    
                    
                ],
                timeForm: (this.props.location.state !== undefined &&
                    this.props.location.state.slot_start_time) || "",
                    timeTo: (
                        this.props.location.state !== undefined &&
                        this.props.location.state.slot_end_time) || "",
                        date: (dateSplit !== "" &&
                        dateSplit) || "",
                        slotUnavailable: "",
                        service: (this.props.location.state !== undefined &&
                            this.props.location.state.serviceName) || "",
                            events: [],
                            slot_by_date: [],
                            errors: {},
                            currentServiceProvider: {},
                            feedbackCurrentServiceProvider: {},
                            providerServices: [],
                            servicePrice: "",
                            rating: "",
                            isPending: true,
                            serviceprovider: {},
                            serviceprovider_services: [],
                            serviceprovider_services_type: [],
                            profileCompletion: "",
                            additionalNotes: "",
                        };
                        console.log(this.state.currentHours);
                        
                    }
                    
                    async componentDidMount() {
                        window.scrollTo(0, 0);
                        
                        try {
                            let user = AuthService.getCurrentUser();
                            const { data: { data } } = await axios.get(
                                config.SERVER_URL + `/api/user/${user.id}`,
                                {
                                    headers: authHeader()
                                }
                                );
                                this.setState({
                                    profileCompletion: data.profile_completion
                                })
                            } catch(e) {
                                console.log(e)
                            }
                            
                            const userID = this.props.match.params.serviceProviderID;
                            // console.log("PD 133", userID)
                            
                            const serviceProviders = await axios.get(config.SERVER_URL + `/api/serviceprovider/${userID}`, {
                                headers: authHeader(),
                            });
                            // console.log("PD 147", serviceProviders)
                            let providerServices = [];
                            
                            
                            const servicePrice = serviceProviders.data.data.serviceprovider_services[0].service_type.service_price.price_per_hour;
                            
                            this.setState({
                                servicePrice,
                                serviceprovider: serviceProviders.data.data.user,
                                
                                serviceprovider_services: serviceProviders.data.data.serviceprovider_services[0],
                                serviceprovider_services_type: serviceProviders.data.data.serviceprovider_services,
                            })
                            // console.log("PD 158", serviceProviders.data.data.serviceprovider_services[0])
                            serviceProviders.data.data.serviceprovider_services.map(
                                (provider) => (
                                    providerServices.push({ id: provider.service_type.id, value: provider.service_type.name })
                                    )
                                    )
                                    
                                    this.setState({ providerServices ,service:providerServices[0]?.value})
                                    
                                    this.setState({ currentServiceProvider: serviceProviders.data.data })
                                    
                                    const feedbackserviceProviders = await axios.get(config.SERVER_URL + `/api/providerfeedbacks/${userID}`, {
                                        headers: authHeader(),
                                    });
                                    
                                    // console.log("PD 162 ", feedbackserviceProviders)
                                    
                                    let list = feedbackserviceProviders.data.data.data;
                                    
                                    // console.log("list ", list)
                                    
                                    this.setState({ feedbackCurrentServiceProvider: [...list] })
                                    this.setState({ isPending: false })
                                    
                                    // console.log("feedbackCurrentServiceProvider", this.state.feedbackCurrentServiceProvider)
                                }
                                
                                validate = () => {
                                    const { error } = Joi.validate(
                                        {
                                            timeForm: this.state.timeForm, timeTo: this.state.timeTo, date: this.state.date,
                                            service: this.state.service
                                        },
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
                                    setAddtionalNotes = (e) => {
                                        
                                        this.setState({additionalNotes: e.currentTarget.value});
                                    };
                                    validateProperty = ({ value, name }) => {
                                        let dataProperty = { [name]: value };
                                        let subSchema = { [name]: this.schema[name] };
                                        
                                        
                                        const { error } = Joi.validate(dataProperty, subSchema);
                                        
                                        return error ? error.details[0].message : null;
                                    };
                                    
                                    onChangeTextFields = async (e) => {
                                        
                                        
                                        if (this.state.slotUnavailable)
                                        this.setState({ slotUnavailable: false })
                                        
                                        const errorMessage = this.validateProperty(e.currentTarget);
                                        
                                        const errors = { ...this.state.errors };
                                        if (errorMessage) errors[e.currentTarget.name] = errorMessage;
                                        else {
                                            delete errors[e.currentTarget.name];
                                            this.setState({ errors });
                                        }
                                        let Name = e.currentTarget.name;
                                        if (e.currentTarget.name === "date") {
                                            const temp = e.currentTarget.value.split("-");
                                            
                                            const date = temp[1] + "/" + temp[2] + "/" + temp[0];
                                            const dated = temp[1] + "/" + temp[2] + "/" + temp[0];
                                            const seleted_data = { date: dated }
                                            this.setState({ [Name]: date })
                                            this.setState({ [Name]: e.currentTarget.value })
                                            const user_ID = this.props.match.params.serviceProviderID;
                                            // console.log(user_ID);
                                            var slots = await axios.post(config.SERVER_URL + `/api/slotbydate/${user_ID}`, seleted_data, {
                                                headers: authHeader(),
                                            });
                                            const avaiable_slots = slots.data.data
                                            // console.log("slot_bydate", avaiable_slots)
                                            this.setState({
                                                slot_by_date: avaiable_slots
                                            })
                                        }
                                        else {
                                            this.setState({ [Name]: e.currentTarget.value })
                                        }
                                        
                                        
                                        
                                    }
                                    convertTo24HourFormat(time12h) {
                                        // Parse the time string in 12-hour format
                                        const time12hParts = time12h.split(/[: ]/);
                                        // console.log(time12hParts);
                                        let hours = parseInt(time12hParts[0]);
                                        const minutes = parseInt(time12hParts[1]);
                                        const period = time12hParts[2].toUpperCase();
                                        
                                        // Adjust hours for PM times
                                        if (period === "PM" && hours !== 12) {
                                            hours += 12;
                                        }
                                        
                                        // Adjust hours for 12AM
                                        if (period === "AM" && hours === 12) {
                                            hours = 0;
                                        }
                                        
                                        // Convert to 24-hour format
                                        const hours24h = hours.toString().padStart(2, '0');
                                        
                                        return `${hours24h}:${minutes.toString().padStart(2, '0')}`;
                                    }
                                    onChangeDate = async (date) => {
                                        if(date){
                                            const newDate = new Date(date);
                                            
                                            const now = new Date();
                                            // console.log(now);
                                            // console.log(newDate);
                                            if(now.getDate() == newDate.getDate()){
                                                
                                                // Get the current hour and minute
                                                const currentHour = now.getHours();
                                                const currentMinute = now.getMinutes();
                                                
                                                // Calculate the total minutes left in the day
                                                const totalMinutesLeft = (23 - currentHour) * 60 + (59 - currentMinute);
                                                
                                                // Convert total minutes left to hours and minutes
                                                const hoursLeft = Math.floor(totalMinutesLeft / 60);
                                                const minutesLeft = totalMinutesLeft % 60;
                                                
                                                // console.log(`There are ${hoursLeft} hours and ${minutesLeft} minutes left in the day.`);
                                                this.setState({ hoursLeft: hoursLeft });
                                                this.setState({ todaybit: true });
                                                // const currentHours = new Date().getHours();
                                                // const minHour = currentHour + this.state.hoursLeft;
                                                // console.log(minHour);
                                                // console.log(currentHours);
                                                // const time24HourFormat = this.state.time.map(({ label, value }) => ({
                                                //     label: this.convertTo24HourFormat(label),
                                                //     value: this.convertTo24HourFormat(value)
                                                // }));
                                                // console.log(time24HourFormat);
                                                
                                            } else {
                                                this.setState({ hoursLeft: "" });
                                                this.setState({ todaybit: false });
                                                
                                            }
                                            
                                            // You can create a Date object by passing the date string
                                            
                                            
                                            
                                            // Extract year, month, and day
                                            const year = newDate.getFullYear();
                                            const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
                                            const day = String(newDate.getDate()).padStart(2, '0');
                                            
                                            // Create the required format: yyyy-MM-dd
                                            const formattedDate = `${month}/${day}/${year}`;
                                            this.setState({
                                                ["date"]: formattedDate,
                                            });
                                            // const temp = e.currentTarget.value.split("-");
                                            
                                            // const date = temp[1] + "/" + temp[2] + "/" + temp[0];
                                            // const dated = temp[1] + "/" + temp[2] + "/" + temp[0];
                                            const seleted_data = { date: formattedDate }
                                            // this.setState({ [Name]: date })
                                            // this.setState({ [Name]: e.currentTarget.value })
                                            const user_ID = this.props.match.params.serviceProviderID;
                                            // console.log(user_ID);
                                            var slots = await axios.post(config.SERVER_URL + `/api/slotbydate/${user_ID}`, seleted_data, {
                                                headers: authHeader(),
                                            });
                                            const avaiable_slots = slots.data.data
                                            // console.log("slot_bydate", avaiable_slots)
                                            this.setState({
                                                slot_by_date: avaiable_slots
                                            })
                                        }
                                        
                                    };
                                    handleDateClick = async (e) => {
                                        let user = AuthService.getCurrentUser();
                                        
                                        try {
                                            this.setState({ events: [] })
                                            
                                            const data = { date: (e.date.getMonth() + 1) + '/' + e.date.getDate() + '/' + e.date.getFullYear() }
                                            // console.log(e.date, data)
                                            
                                            const date = await axios.post(config.SERVER_URL + `/api/slotbydate/${this.state.user_id}`, data, { headers: authHeader() })
                                            const response = date.data.data
                                            
                                            
                                            const selectedYear = e.date.getFullYear()
                                            const selectedMonth = (e.date.getMonth() + 1 > 9) ? e.date.getMonth() + 1 : '0' + (e.date.getMonth() + 1)
                                            const selectedDate = (e.date.getDate() > 9) ? e.date.getDate() : '0' + (e.date.getDate())
                                            const y_m_d_selected = `${selectedYear}-${selectedMonth}-${selectedDate}`
                                            // console.log(y_m_d_selected)
                                            const slotEvents = response.map(row => {
                                                return ({
                                                    title: `${row.hourly_slots.slot_start_time} - ${row.hourly_slots.slot_end_time}`, date: y_m_d_selected
                                                })
                                            })
                                            
                                            this.setState({ events: slotEvents })
                                        } catch (error) {
                                            console.log(error)
                                        }
                                        
                                    }
                                    
                                    onFromTimeChange = (e) => {
                                        
                                        if (this.state.slotUnavailable)
                                        this.setState({ slotUnavailable: false })
                                        this.setState({ timeForm: e.target.value });
                                    };
                                    
                                    onToTimeChange = (e) => {
                                        
                                        
                                        this.setState({ timeTo: e.target.value });
                                    };
                                    
                                    submit = (e) => {
                                        
                                        const errors = this.validate();
                                        
                                        if (errors) this.setState({ errors });
                                        
                                    }
                                    
                                    hireNow = async () => {
                                        
                                        //     swal({
                                        //         title: "Are you sure?",
                                        //         text: "You will not be able to recover this imaginary file!",
                                        //         icon: "warning",
                                        //         buttons: [
                                        //           'No, cancel it!',
                                        //           'Yes, I am sure!'
                                        //         ],
                                        //         dangerMode: true,
                                        //       }).then( function(isConfirm) {
                                        //         localStorage.setItem('hire',1)
                                        //     });
                                        //    var confirmation= localStorage.getItem('hire');
                                        //     if(confirmation==1){
                                        //         const serviceProviderID = this.props.match.params.serviceProviderID;
                                        //         const errors = this.validate();
                                        //         if (errors) {
                                        //             this.setState({ errors })
                                        //             return;
                                        //         }
                                        //         const service_taker = JSON.parse(localStorage.getItem("user"));
                                        
                                        //         if (!service_taker) {
                                        
                                        //             const obj =
                                        //             {
                                        //                 currentServiceProvider: this.state.currentServiceProvider,
                                        //                 date: this.state.date,
                                        //                 slot_start_time: this.state.timeForm,
                                        //                 slot_end_time: this.state.timeTo,
                                        //                 serviceProviderID: this.props.match.params.serviceProviderID,
                                        //                 serviceName: this.state.service,
                                        //                 serviceAvailed: this.state.service
                                        //             }
                                        //             this.props.history.push("/signup/login/hire", obj)
                                        //         }
                                        
                                        //         if (!service_taker) return;
                                        
                                        //         const temp = this.state.date.split("-");
                                        //         const d = temp[1] + "/" + temp[2] + "/" + temp[0]
                                        //         const serviceDetails = {
                                        //             service_taker_id: service_taker.id || service_taker.user_id,
                                        //             date: d,
                                        //             slot_start_time: this.state.timeForm,
                                        //             slot_end_time: this.state.timeTo
                                        //         }
                                        
                                        //         try {
                                        //             const resp = await axios
                                        //                 .post(config.SERVER_URL + `/api/slots/${serviceProviderID}`, serviceDetails, {
                                        //                     headers: authHeader(),
                                        //                 })
                                        
                                        //             if (resp.data.success) {
                                        
                                        //                 this.props.history.push("/hire/details", {
                                        //                     currentServiceProvider: this.state.currentServiceProvider,
                                        //                     date: this.state.date,
                                        //                     slot_start_time: this.state.timeForm,
                                        //                     slot_end_time: this.state.timeTo,
                                        //                     serviceAvailed: this.state.service
                                        //                 })
                                        //             } else {
                                        //                 console.log(resp.data.data.error);
                                        //                 this.setState({ slotUnavailable: resp.data.data.error })
                                        //             }
                                        
                                        //         }
                                        //         catch (ex) {
                                        
                                        //             this.setState({ slotUnavailable: ex.response.data.data.error })
                                        //         }
                                        //         localStorage.removeItem('hire')
                                        //     }
                                        
                                        
                                        
                                        
                                        // const proceed = window.confirm("Are you sure you want to Hire")
                                        // if (proceed) {
                                        // let user = AuthService.getCurrentUser();
                                        // console.log(user);
                                        // if (typeof user == 'undefined') {
                                            
                                        //     swal({
                                        //         title: 'Incomplete User Profile',
                                        //         text: 'You must Login/Signup to hire as Service Provider.',
                                        //         icon: 'warning',
                                        //         buttons: {
                                        //             confirm: 'Login',
                                        //             cancel: 'Close'
                                        //         }
                                        //     }).then((value) => {
                                        //         if (value) {
                                        //             this.props.history.push("/login")
                                        //         } 
                                        //     });
                                        //     return
                                        // }
                                        
                                        
                                        
                                        let userdetail = AuthService.getCurrentUser();
                                        console.log(userdetail);
                                        if (userdetail?.role?.name !== "service_taker") {
                                            swal({
                                                title: 'Please Login!',
                                                text: `Please Login as Customer to hire a service provider`,
                                                icon: 'info',
                                                buttons: {
                                                    confirm: 'Okay'
                                                }
                                            });
                                            return
                                        }
                                        if (this.state.profileCompletion != "100") {
                                            swal("Incomplete User Profile", "Please complete your user profile details for hiring service providers.", "warning")
                                            
                                            return
                                        }
                                        
                                        const serviceProviderID = this.props.match.params.serviceProviderID;
                                        const errors = this.validate();
                                        if (errors) {
                                            this.setState({ errors })
                                            return;
                                        }
                                        const service_taker = JSON.parse(localStorage.getItem("user"));
                                        
                                        if (!service_taker) {
                                            
                                            const obj =
                                            {
                                                currentServiceProvider: this.state.currentServiceProvider,
                                                date: this.state.date,
                                                slot_start_time: this.state.timeForm,
                                                slot_end_time: this.state.timeTo,
                                                serviceProviderID: this.props.match.params.serviceProviderID,
                                                serviceName: this.state.service,
                                                serviceAvailed: this.state.service
                                            }
                                            this.props.history.push("/signup/login/hire", obj)
                                        }
                                        
                                        if (!service_taker) return;
                                        
                                        const temp = this.state.date.split("-");
                                        const d = temp[1] + "/" + temp[2] + "/" + temp[0];
                                        const serviceDetails = {
                                            service_taker_id: service_taker.id || service_taker.user_id,
                                            date: this.state.date,
                                            slot_start_time: this.state.timeForm,
                                            slot_end_time: this.state.timeTo
                                        }
                                        
                                        try {
                                            const resp = await axios
                                            .post(config.SERVER_URL + `/api/slots/${serviceProviderID}`, serviceDetails, {
                                                headers: authHeader(),
                                            })
                                            
                                            
                                            if (resp.data.success) {
                                                const service = this.state.currentServiceProvider.serviceprovider_services.filter(x => x.service_type.name === this.state.service)
                                                const servicePrice = service[0].service_type.service_price.price_per_hour
                                                this.props.history.push("/hire/details", {
                                                    currentServiceProvider: this.state.currentServiceProvider,
                                                    date: this.state.date,
                                                    slot_start_time: this.state.timeForm,
                                                    slot_end_time: this.state.timeTo,
                                                    serviceAvailed: this.state.service,
                                                    servicePrice: servicePrice,
                                                    additionalNotes: this.state.additionalNotes
                                                })
                                            } else {
                                                
                                                this.setState({ slotUnavailable: resp.data.data.error })
                                            }
                                            
                                        }
                                        catch (ex) {
                                            
                                            this.setState({ slotUnavailable: ex.response.data.data.error })
                                        }
                                        
                                        // }
                                    }
                                    
                                    renderPrice = (e) => {
                                        
                                        const service = this.state.currentServiceProvider.serviceprovider_services.filter(x => x.service_type.name === e);
                                        
                                        this.setState({ servicePrice: service[0].service_type.service_price.price_per_hour })
                                    }
                                    
                                    render() {
                                        // console.log("serveces", this.state.serviceprovider_services_type);
                                        
                                        const slot_by_provider=this.state.slot_by_date;
                                        const options = {
                                            items: 1,
                                            loop: true,
                                            autoplay: true,
                                            autoplayTimeout: 6000,
                                            autoplayHoverPause: true,
                                            smartSpeed: 450,
                                            margin: 0,
                                            nav: true,
                                            navText: ["<i className='fas fa-chevron-left'></i>", "<i className='fas fa-chevron-right'></i>"],
                                            dots: false
                                        }
                                        return (
                                            <>
                                            {/* <Dimmer active inverted><Loader size='large' indeterminate>Loading</Loader></Dimmer> */}
                                            <section className="prdt-detail pt-90">
                                            
                                            <div className="container">
                                            <div className="row">
                                            <div className="col-md-6 col-lg-6 service-provider-img-container">
                                            <div>
                                            
                                            {this.state.currentServiceProvider.user !== undefined &&
                                                
                                                <img src={
                                                    
                                                    config.SERVER_URL + "/" + this.state.currentServiceProvider.user.image}
                                                    alt="service-provider-img" className="service-provider-img" />
                                                }
                                                {/* <OwlCarousel options={options} id="image-gallery" className="owl-carousel gallery list-unstyled cS-hidden">
                                                {this.state.currentServiceProvider.user!==undefined &&
                                                    shopmain.map((item, i) => (
                                                        // <img key={i} src={item.img} alt="" />
                                                        <img src={
                                                            
                                                            config.SERVER_URL+"/"+this.state.currentServiceProvider.user.image}
                                                            alt="service-provider-img"/>
                                                            ))}
                                                            
                                                        </OwlCarousel> */}
                                                        </div>
                                                        </div>
                                                        <div className="col-md-6 col-lg-6 service-provider-details-container">
                                                        <div className="prdt-info-right pl-20 pl-md-00 mt-md-25">
                                                        <div className="prdt-detail-head">
                                                        <div className="prdt-reviews">
                                                        <div className="rating d-flex align-items-center">
                                                        <Rating value={parseInt(this.state.currentServiceProvider.rating)}
                                                        size='normal'
                                                        precision={0.5}
                                                        readOnly
                                                        />
                                                        
                                                        {/* <ul className="stars-rate" data-starsactive={4}>
                                                        
                                                        <li className="text-left lh-10"> <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        </li>
                                                    </ul> */}
                                                    <p className="rates-info mb-0">
                                                    {/* <Link to="/" className="ml-10">15 reviews</Link> |
                                                <Link to="/">Write a review</Link> */}
                                                </p>
                                                </div>
                                                </div>
                                                <h1 className="mt-10 mb-15 fs-35 lh-13">
                                                
                                                {this.state.currentServiceProvider.user !== undefined ? this.state.currentServiceProvider.user.username : ""}
                                                
                                                </h1>
                                                <div className="rate-detail">
                                                
                                                
                                                <h3>   {this.state.servicePrice != undefined &&
                                                    "$" + this.state.servicePrice + "/hr"} </h3>
                                                    
                                                    
                                                    {this.state.currentServiceProvider != undefined &&
                                                        this.state.currentServiceProvider.serviceprovider_services != undefined &&
                                                        this.state.currentServiceProvider.serviceprovider_services.length > 0 &&
                                                        <Tabs id="uncontrolled-tab-example" className="mb-3 mt-3"
                                                        onSelect={this.renderPrice}
                                                        >
                                                        {
                                                            this.state.currentServiceProvider.serviceprovider_services.map((service, index) => {
                                                                
                                                                
                                                                return <Tab eventKey={service.service_type.name} title={service.service_type.name}
                                                                key={index}
                                                                
                                                                >
                                                                <p style={{ color: "#102043" }}>{service.description}</p>
                                                                
                                                                </Tab>
                                                                
                                                                
                                                                
                                                            })}
                                                            
                                                            </Tabs>}
                                                            
                                                            
                                                            
                                                            {/* 
                                                            <span className="mb-0">
                                                            
                                                            {service.service_type.name}
                                                            <i className="fa fa-solid fa-tags"
                                                            style={{marginLeft:"5px",marginRight:"5px",
                                                            color:"#102043"
                                                        }}
                                                    ></i> */}
                                                    {/* </span> */}
                                                    </div>
                                                    </div>
                                                    
                                                    <div className="hr-1 bg-black opacity-1 mb-20 mt-20" />
                                                    <div className="profuct-descr">
                                                    <p className="mb-10">
                                                    {/* {
                                                        this.state.currentServiceProvider.user !== undefined &&
                                                    this.state.currentServiceProvider.service_type.description} */}
                                                    
                                                    </p>
                                                    <p>
                                                    </p>
                                                    </div>
                                                    <div className="hr-1 bg-black opacity-1 mt-20 mb-20" />
                                                    
                                                    </div>
                                                    </div>
                                                    
                                                    
                                                    <div className="col-lg-12">
                                                    
                                                    <div style={{ marginBottom: "2rem" }}>
                                                    <div className="container">
                                                    <div
                                                    className="hireNow-date-container" >
                                                    <LocalizationProvider dateAdapter={DateAdapter}>
                                                    <MobileDatePicker
                                                    mode="legacy" 
                                                    name="date"
                                                    label="Select Date"
                                                    value={this.state.date}
                                                    onChange={this.onChangeDate}
                                                    minDate={new Date()} 
                                                    renderInput={(params) => <TextField {...params} />} // Use TextField for the input
                                                    />
                                                    </LocalizationProvider>
                                                    {/* <input type="date"
                                                    name="date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    max={new Date().toISOString().split('T')[30]}
                                                    id="hiredate"
                                                    className='date-input'
                                                    onChange={
                                                        this.onChangeTextFields}
                                                        value={this.state.date}
                                                    /> */}
                                                    </div>
                                                    </div>
                                                    {this.state.errors &&
                                                        this.state.errors.date &&
                                                        <span className="text-danger error-date">
                                                        {
                                                            this.state.errors.date
                                                        }
                                                        </span>
                                                    }
                                                    </div>
                                                    
                                                    {this.state.date && slot_by_provider[0]===undefined ?
                                                        <div className="row">
                                                        <div className="col-lg-12">
                                                        <div style={{ marginBottom: "2rem" }}>
                                                        <div className="container">
                                                        <div
                                                        className="hireNow-date-container" >
                                                        
                                                        <input type="text"
                                                        name="date"
                                                        id="hiredate"
                                                        className='date-input'
                                                        readOnly
                                                        value={"Provider is not available on the selected date"}
                                                        />
                                                        </div>
                                                        </div>
                                                        {this.state.errors &&
                                                            this.state.errors.date &&
                                                            <span className="text-danger error-date">
                                                            {
                                                                this.state.errors.date
                                                            }
                                                            </span>
                                                        }
                                                        </div>
                                                        </div>
                                                        </div>
                                                        :<></>
                                                    }
                                                    {slot_by_provider.length>0 ?
                                                        <div className='row'>
                                                        <div className="col-lg-4"></div>
                                                        <div className="col-lg-4" style={{display:"flex", AlignItem:"center",justifyContent:"center"}}><h5> Provider's slots On Selected Date</h5></div>
                                                        </div> :""}
                                                        
                                                        {slot_by_provider.length>0 ?
                                                            
                                                            slot_by_provider.map((index) => (
                                                                <div className="row">
                                                                {/* <div className="col-lg-4"></div>
                                                            <div className="col-lg-6"><h5>Avaiable Provider slots On this Date</h5></div> */}
                                                            <div className="col-lg-6">
                                                            <div style={{ marginBottom: "0.1rem" }}>
                                                            <div className="container">
                                                            <div
                                                            className="hireNow-date-container" >
                                                            
                                                            <input type="text"
                                                            name="date"
                                                            id="hiredate"
                                                            className='date-input'
                                                            readOnly
                                                            value={"Start Time: "+index.hourly_slots.slot_start_time}
                                                            />
                                                            </div>
                                                            </div>
                                                            {this.state.errors &&
                                                                this.state.errors.date &&
                                                                <span className="text-danger error-date">
                                                                {
                                                                    this.state.errors.date
                                                                }
                                                                </span>
                                                            }
                                                            </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                            <div style={{ marginBottom: "0.3rem" }}>
                                                            <div className="container">
                                                            <div
                                                            className="hireNow-date-container" >
                                                            
                                                            <input type="text"
                                                            name="date"
                                                            id="hiredate"
                                                            className='date-input'
                                                            readOnly
                                                            value={"End Time: "+index.hourly_slots.slot_end_time}
                                                            />
                                                            
                                                            </div>
                                                            </div>
                                                            {this.state.errors &&
                                                                this.state.errors.date &&
                                                                <span className="text-danger error-date">
                                                                {
                                                                    this.state.errors.date
                                                                }
                                                                </span>
                                                            }
                                                            </div>
                                                            </div>
                                                            </div>
                                                            )):<></>
                                                        }
                                                        
                                                        
                                                        <div className="col-lg-12">
                                                        
                                                        <div style={{ marginBottom: "2rem" }}>
                                                        <div
                                                        className="hireNow-date-container" >
                                                        <select class="form-select form-select-lg" aria-label=".form-select-lg example"
                                                        style={{
                                                            width: "100%",
                                                            height: "3.2rem"
                                                        }}
                                                        name="service"
                                                        onChange={this.onChangeTextFields}
                                                        value={this.state.providerServices[0]?.value}
                                                        >
                                                        <option disabled>Please select a service</option>
                                                        
                                                        {this.state.providerServices.map((data, index) => {
                                                            
                                                            return <option key={index} value={data.value}  >{data.value}</option>
                                                        }
                                                        
                                                        )}
                                                        
                                                        
                                                        </select>
                                                        
                                                        </div>
                                                        
                                                        
                                                        
                                                        
                                                        {this.state.errors &&
                                                            this.state.errors.service &&
                                                            <span className="text-danger error-date"
                                                            style={{ paddingLeft: "0" }}
                                                            >
                                                            {
                                                                this.state.errors.service
                                                            }
                                                            </span>
                                                        }
                                                        </div>
                                                        
                                                        </div>
                                                        <div className="container">
                                                        <div className="row">
                                                        <div className="col"
                                                        >
                                                        <select
                                                        type="select"
                                                        className={`form-control`}
                                                        name="timeForm"
                                                        onChange={this.onChangeTextFields}
                                                        value={this.state.timeForm}
                                                        
                                                        // style={{
                                                        //     border: "1.5px solid #DA1212",
                                                        // }}
                                                        // value={this.state.service_type_id}
                                                        // onChange={this.onChangeServiceType}
                                                        >
                                                        <option value="">
                                                        -- Select Start Time --
                                                        </option>
                                                        {this.state.todaybit ? (
                                                            this.state.time.map((data, index) => (
                                                                this.state.currentHours < parseInt(this.convertTo24HourFormat(data.value)) ? (
                                                                    <option value={data.value} key={index}>
                                                                    {data.label}
                                                                    </option>
                                                                    ) : (parseInt(this.convertTo24HourFormat(data.value)) === 0 ? (
                                                                        <option value={data.value} key={index}>
                                                                        {data.label}
                                                                        </option>
                                                                        ) : (
                                                                            <option value={data.value} key={index} disabled>
                                                                            {data.label}
                                                                            </option>
                                                                            ))
                                                                            ))
                                                                            ) : (
                                                                                this.state.time.map((data, index) => (
                                                                                    <option value={data.value} key={index}>
                                                                                    {data.label}
                                                                                    </option>
                                                                                    ))
                                                                                    )}
                                                                                    
                                                                                    
                                                                                    
                                                                                    </select>
                                                                                    
                                                                                    
                                                                                    
                                                                                    {this.state.errors &&
                                                                                        this.state.errors.timeForm &&
                                                                                        <span className="text-danger">
                                                                                        {
                                                                                            this.state.errors.timeForm
                                                                                        }
                                                                                        </span>
                                                                                    }
                                                                                    
                                                                                    </div>
                                                                                    
                                                                                    <div className="col">
                                                                                    <select
                                                                                    type="select"
                                                                                    className={`form-control`}
                                                                                    name="timeTo"
                                                                                    onChange={this.onChangeTextFields}
                                                                                    
                                                                                    value={this.state.timeTo}
                                                                                    // onChange={this.onChangeServiceType}
                                                                                    >
                                                                                    <option value="">
                                                                                    -- Select End Time --
                                                                                    </option>
                                                                                    {/* {this.state.time.map((data, index) => (
                                                                                        <option value={data.value} key={index}>
                                                                                        {data.label}
                                                                                        </option>
                                                                                    ))} */}
                                                                                    {this.state.todaybit ? (
                                                                                        this.state.time.map((data, index) => (
                                                                                            this.state.currentHours < parseInt(this.convertTo24HourFormat(data.value)) ? (
                                                                                                <option value={data.value} key={index}>
                                                                                                {data.label}
                                                                                                </option>
                                                                                                ) : (parseInt(this.convertTo24HourFormat(data.value)) === 0 ? (
                                                                                                    <option value={data.value} key={index}>
                                                                                                    {data.label}
                                                                                                    </option>
                                                                                                    ) : (
                                                                                                        <option value={data.value} key={index} disabled>
                                                                                                        {data.label}
                                                                                                        </option>
                                                                                                        ))
                                                                                                        ))
                                                                                                        ) : (
                                                                                                            this.state.time.map((data, index) => (
                                                                                                                <option value={data.value} key={index}>
                                                                                                                {data.label}
                                                                                                                </option>
                                                                                                                ))
                                                                                                                )}
                                                                                                                </select>
                                                                                                                {this.state.errors &&
                                                                                                                    this.state.errors.timeTo &&
                                                                                                                    <span className="text-danger">
                                                                                                                    {
                                                                                                                        this.state.errors.timeTo
                                                                                                                    }
                                                                                                                    </span>
                                                                                                                }
                                                                                                                
                                                                                                                </div>
                                                                                                                
                                                                                                                </div>
                                                                                                                <div className='row' style={{ marginTop: "2rem" }}>
                                                                                                                <div className='col col-md-12'>
                                                                                                                <textarea rows={3} name="additional_notes" value={this.state.additionalNotes} onChange={this.setAddtionalNotes} placeholder={"Additional Notes"}/>
                                                                                                                </div>
                                                                                                                </div>
                                                                                                                
                                                                                                                </div>
                                                                                                                
                                                                                                                {this.state.slotUnavailable &&
                                                                                                                    <UncontrolledAlert color="danger"
                                                                                                                    
                                                                                                                    >
                                                                                                                    {this.state.slotUnavailable}
                                                                                                                    </UncontrolledAlert>}
                                                                                                                    
                                                                                                                    
                                                                                                                    <button
                                                                                                                    type="submit"
                                                                                                                    className="btn btn-black btn-block mt-20"
                                                                                                                    onClick={this.hireNow}
                                                                                                                    > Hire Now
                                                                                                                    </button>
                                                                                                                    
                                                                                                                    
                                                                                                                    
                                                                                                                    <div className="prdt-tabs row pt-40 pt-md-25 mb-5">
                                                                                                                    <div className="col-md-12">
                                                                                                                    
                                                                                                                    <div className="prdt-tab mt-5 service-provider-nav-container">
                                                                                                                    <Tab.Container defaultActiveKey="description">
                                                                                                                    <Nav variant="tabs" className="nav nav-pills justify-content-center justify-content-sm-start">
                                                                                                                    <Nav.Item>
                                                                                                                    <Nav.Link eventKey="description">Description</Nav.Link>
                                                                                                                    </Nav.Item>
                                                                                                                    <Nav.Item>
                                                                                                                    <Nav.Link eventKey="addinfo">Detail</Nav.Link>
                                                                                                                    </Nav.Item>
                                                                                                                    <Nav.Item>
                                                                                                                    <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                                                                                                                    </Nav.Item>
                                                                                                                    </Nav>
                                                                                                                    <Tab.Content className="pt-20">
                                                                                                                    <Tab.Pane eventKey="description">
                                                                                                                    <h4 className="mb-10 lh-13"></h4>
                                                                                                                    <p className="text-justify">
                                                                                                                    {this.state.serviceprovider.detail}
                                                                                                                    </p>
                                                                                                                    {this.state.serviceprovider_services_type.map((service) => {
                                                                                                                        
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                            <h4 className="mb-10 lh-13">{service.service_type.name}</h4>
                                                                                                                            <p className="text-justify">{service.description} </p>
                                                                                                                            
                                                                                                                            </>
                                                                                                                            )
                                                                                                                        })
                                                                                                                        
                                                                                                                    }
                                                                                                                    
                                                                                                                    {/* <h4 className="mb-10 lh-13">{this.state.serviceprovider_services_type.name}</h4>
                                                                                                                <p className="text-justify">{this.state.serviceprovider_services.description} */}
                                                                                                                {/* </p> */}
                                                                                                                </Tab.Pane>
                                                                                                                <Tab.Pane eventKey="addinfo">
                                                                                                                <div className="row align-items-center">
                                                                                                                <div className="col-12">
                                                                                                                <p className="text-justify">{this.state.serviceprovider.detail} </p>
                                                                                                                <table className="table table-bordered mb-0">
                                                                                                                <tbody>
                                                                                                                {/* {infotable.map((item, i) => ( */}
                                                                                                                <tr>
                                                                                                                <th scope="row">Name</th>
                                                                                                                <td>{this.state.currentServiceProvider.user !== undefined ? this.state.currentServiceProvider.user.fname + " " + this.state.currentServiceProvider.user.lname : ""}</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                <th scope="row">Address</th>
                                                                                                                <td>{this.state.currentServiceProvider.user !== undefined ? this.state.currentServiceProvider.user.location.city : ""}</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                <th scope="row">Orders Completed</th>
                                                                                                                <td>{this.state.currentServiceProvider.orders !== undefined ? this.state.currentServiceProvider.orders.length : ""}</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                <th scope="row">Rating</th>
                                                                                                                <td>{this.state.currentServiceProvider !== undefined ? this.state.currentServiceProvider.rating : ""}</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                <th scope="row">Member Since</th>
                                                                                                                <td>{this.state.currentServiceProvider.user !== undefined ? this.state.currentServiceProvider.user.created_at.substr(0, 10) : ""}</td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                <th scope="row">Provider Level</th>
                                                                                                                <td>{this.state.currentServiceProvider !== undefined ? "Level" + " " + this.state.currentServiceProvider.level : "New Provider"}</td>
                                                                                                                </tr>
                                                                                                                {/* ))} */}
                                                                                                                </tbody>
                                                                                                                </table>
                                                                                                                </div>
                                                                                                                </div>
                                                                                                                </Tab.Pane>
                                                                                                                <Tab.Pane eventKey="reviews">
                                                                                                                <div className="review-wrp">
                                                                                                                {this.state.feedbackCurrentServiceProvider.length &&
                                                                                                                    
                                                                                                                    this.state.feedbackCurrentServiceProvider.map(obj => {
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                            {this.state.isPending ? <div className="text-center"> <CircularProgress color="success" /></div> :
                                                                                                                            <div className="review-prdt">
                                                                                                                            <img src={`${config.SERVER_URL}/${obj.service_taker?.user?.image}`} className="user-img" alt="" />
                                                                                                                            <h4> {obj.service_taker?.user?.username}
                                                                                                                            <span className="date">{obj.updated_at.substring(0, 10)}</span>
                                                                                                                            </h4>
                                                                                                                            <Rating value={parseInt(obj.rating)}
                                                                                                                            size='normal'
                                                                                                                            precision={0.5}
                                                                                                                            readOnly
                                                                                                                            />
                                                                                                                            <p className="text-justify">
                                                                                                                            {obj.service_taker_feedback}
                                                                                                                            </p>
                                                                                                                            </div>}
                                                                                                                            </>)
                                                                                                                        })
                                                                                                                        
                                                                                                                    }
                                                                                                                    
                                                                                                                    {/* <Link to="/" className="btn btn-blue btn-md" data-toggle="modal" data-target="#addReview">WRITE A REVIEW</Link> */}
                                                                                                                    
                                                                                                                    </div>
                                                                                                                    </Tab.Pane>
                                                                                                                    </Tab.Content>
                                                                                                                    </Tab.Container>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </section >
                                                                                                                    </>
                                                                                                                    );
                                                                                                                }
                                                                                                            }
                                                                                                            
                                                                                                            export default withRouter(Productdetail);
                                                                                                            