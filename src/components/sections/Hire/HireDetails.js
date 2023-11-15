import { Container, Row, Col, Form } from 'react-bootstrap'
import { Component } from "react";

import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonM from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import authHeader from "../../../services/auth-header";
import { Dropdown } from "semantic-ui-react";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { UncontrolledAlert, Button } from 'reactstrap';
import ZeeshanMap from "../Hire/HireDetails";
import Geocode from "react-geocode";
import { Link } from 'react-router-dom';
import Header from '../../layouts/Headerinner';
import Footer from '../../layouts/Footer';
import { MapPin, ThumbsDown } from "react-feather"
import Select from "react-select";
import Joi, { isRef } from "joi-browser";
import axios from "axios";
import moment from 'moment'
import Address from "./AddressAutoComplete";
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';

import authService from '../../../services/auth.service';
import Breadcrumb from '../../layouts/Breadcrumb';
import MetaTags from "react-meta-tags";
import PaymentCheckout from "../Payment/PaymentCheckout";

import { Dimmer, Loader } from "semantic-ui-react";

import Payment from "../StripePayment/StripeContainer";
import { loadStripe } from "@stripe/stripe-js";
import Paypal from "../Payment/PayPal";

class HireDetails extends React.Component {


  constructor(props) {
    
    super(props);
    
    let user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.role.name === "service_provider") this.props.history.push("/");

    let startTime = moment(this.props.location.state.slot_start_time, 'hh:mm A').format('H')

    let endTime = moment(this.props.location.state.slot_end_time, 'hh:mm A').format('H')

    let totalHours = "";
    let startDate = new Date(
      2020,
      5,
      5,
      startTime,
      0,
      0

    );
    let endDate = new Date(
      2020,
      5,
      5,

      endTime,
      0,
      0

    );
    if (endTime === "0") endTime = "24"
    if (startTime === "0") startTime = "24"

    let diff = parseInt(endTime) - parseInt(startTime)

    let costFound = Math.abs(diff) * this.props.location.state.servicePrice



    // if(endTime>startTime)
    // //  totalHours=endTime.diff(startTime);
    //  else 
    //  totalHours=startTime.diff(endTime);
    // console.log("totalHours::",totalHours)
    // let costAccumulated=totalHours*this.props.location.state.currentServiceProvider.user.service_price.price_per_hour;
    // console.log("costAccumulated::",costAccumulated)

    // let servicesArr=[];
    //     for(let item of this.props.location.state.currentServiceProvider.serviceprovider_services){
    //         servicesArr.push({
    //             label:item.servicetypes.name,
    //             value:item.servicetypes.id,
    //         })
    //     }
    this.state = {
      date: this.props.location.state.date,
      slot_start_time: this.props.location.state.slot_start_time,
      slot_end_time: this.props.location.state.slot_end_time,
      service_availed: this.props.location.state.serviceAvailed,
      costPerHour: this.props.location.state.currentServiceProvider.user.service_price.price_per_hour,
      costAccumulation: costFound,
      email:  user ? user.email : "",
      open: false,
      address: "",
      user: user ? user.username : "",
      sameAsBillingAddress: false,
      billingAddress: "",
      service_address: "",
      city: "",
      state: "",
      country: "",
       CheckOut: true,
      payWithPayNpw: false,
      payWithPayPal: false,
      payWithStripe: false,
      getConfigr:false,
      isPaymentCompleted: false
    };

  }



  formCheckOut = async (e) => {
    e.preventDefault();
    await this.checkOut()  
  }

  checkOut = async () => {
    this.setState({ isPending: true }) 
    const user = authService.getCurrentUser()

    const obj = {
      service_taker_id: user.id,
      service_provider_id: this.props.location.state.currentServiceProvider.id,
      order_date: this.state.date,
      slot_start_time: this.state.slot_start_time,
      slot_end_time: this.state.slot_end_time,
      cost: this.state.costAccumulation,
      status: "1",
      service_address: this.state.service_address,
      billing_address: this.state.sameAsBillingAddress === true ? this.state.service_address : this.state.billingAddress,
      state: this.state.state,
      country: this.state.country,
      city: this.state.city,
      service: this.state.service_availed,
      per_hour_rate: this.props.location.state.servicePrice

    }


    try {


      const { data } = await axios.post(config.SERVER_URL + "/api/order", obj, {
        headers: authHeader(),
      })

    //   // let notification = {
    //   //   type: "order",
    //   //   status: "0",
    //   //   description: `You have been booked from ${this.state.slot_start_time} 
    //   //    to ${this.state.slot_end_time} at ${order_date}`,

    //   //   sender_id: user.id,
    //   //   user_id: this.props.location.state.currentServiceProvider.user.id


    //   // }
    //   // await axios.post(config.SERVER_URL + "/api/notification", notification, {
    //   //   headers: authHeader()
    //   // })

     this.props.history.replace("/order/thankyou")
    }
    catch (ex) {

    }

  }


  myInterval = setInterval(() => {

    if (localStorage.getItem("address")) {

      if (localStorage.getItem("city")) {
        this.setState({ city: localStorage.getItem("city") })
      }
      if (localStorage.getItem("state")) {
        this.setState({ state: localStorage.getItem("state") })
      }
      if (localStorage.getItem("country")) {
        this.setState({ country: localStorage.getItem("country") })
      }
      this.setState({ service_address: localStorage.getItem("address") })
    }

    else {
      this.setState({ service_address: "" })
      this.setState({ city: "" })
      this.setState({ state: "" })
      this.setState({ country: "" })
    }

    //   Geocode.setApiKey("AIzaSyDxLxPEKkM9vuuAJpTQuWJBCcfLmZKlDmI")
    //   const lat=localStorage.getItem("lat");
    //   const lng=localStorage.getItem("lng");
    //   if(!lat && !lng){return;}
    //  Geocode.fromLatLng(lat, lng).then(
    //    (response) => {
    //      const address = response.results[0].formatted_address;
    //     this.setState({address})
    //    },
    //    (error) => {
    //      console.error(error);
    //    }
    //  );
  }, 1000);

  checkOutBtnEnable = () => {
    this.setState({ CheckOut: false, isPaymentCompleted: true  })
    setTimeout(() => {
      this.checkOut()
    }, 5000)
  }

  componentDidUpdate() {
    if (this.state.address) {
      clearInterval(this.myInterval)
    }
  }

  async componentDidMount() {
    toast.success("Your service has been booked temporarily will get unbooked If you don't confirm payment within 10 minutes")
    const stripePromise = await loadStripe("pk_test_51NiH9YEKvKY3WrKz1TnxITwiI9FQDsGht8IRFjxlwNYRu3N0CMfMBclQ09XxM1rjX1NfgV453L7UFCpervgCEctv00aLdDMpiv");
    this.setState({ stripePromise })
    // console.log("stripePromise", stripePromise)
console.log(this.state.getConfigr)
    try {
      const getConfig = await axios.get(config.SERVER_URL + "/api/getconfigurations", {
        headers: authHeader(),
      })
      console.log("::::LINE 248", getConfig)
      console.log("::::LINE 249", getConfig.data.message)
      
      if(getConfig.data.message === "Record found ")
      {
        this.setState({ getConfigr: true})
      }
      console.log(this.state.getConfigr)
      
    }
    catch (errors) {
      console.log(errors)
  }
  }

  style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  handleOpen = (e) => {
    e.preventDefault();
    this.setState({ open: true })
  };

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ open: false })
  };

  checkBoxCheck = (e) => {

    if (e.currentTarget.checked) {
      this.setState({ sameAsBillingAddress: true })

    }
    else {
      this.setState({ sameAsBillingAddress: false })
    }
  }

  onChangeTextFields = (e) => {
    const name = e.currentTarget.name;
    this.setState({ [name]: e.currentTarget.value })
  }

  payWithPayNow = async (e) => {
    e.preventDefault();
    
    // this.setState({ isPending: true })
    console.log("::::LINE 286", this.state.costAccumulation)
    const currentuser = authService.getCurrentUser()
    const obj1 = {
      amount : this.state.costAccumulation,
      user_id:currentuser.id,
    }
    console.log('obj1 ', obj1);
    try {
     
      const payment = await axios.post(config.SERVER_URL + "/api/pay",obj1, {
        headers: authHeader(),
      })

      console.log( " :::::: 295 ::::: ",payment.data.success)
      
      if( payment.data.success === true)
      {
        swal({
          icon: "success",
          title: "Payment Successful!",
          text: "Your order will be automatically placed in 5 seconds. If not, please click 'Place Order'",
          timer: 4000
        });
        this.checkOutBtnEnable()
        console.log( " :::::: 302 ::::: ", payment)
      }

    // const user = authService.getCurrentUser()
    // const date_ = this.state.date.split("-");
    // const order_date = date_[2] + "-" + date_[1] + "-" + date_[0];
    // const obj = {
    //   service_taker_id: user.id,
    //   service_provider_id: this.props.location.state.currentServiceProvider.id,
    //   order_date: order_date,
    //   slot_start_time: this.state.slot_start_time,
    //   slot_end_time: this.state.slot_end_time,
    //   cost: this.state.costAccumulation,
    //   status: "1",
    //   service_address: this.state.service_address,
    //   billing_address: this.state.sameAsBillingAddress === true ? this.state.service_address : this.state.billingAddress,
    //   state: this.state.state,
    //   country: this.state.country,
    //   city: this.state.city,
    //   service: this.state.service_availed

    // }
    //   console.log( " :::::: 324 ::::: ",obj)
    //   const { data } = await axios.post(config.SERVER_URL + "/api/order", obj, {
    //         headers: authHeader(),
    //       })
    //       console.log( " :::::: 328 ::::: ",data)
    }
    catch (errors) {
      swal("Sorry Payment Failed", "Your payment couldn't be processed please try again.", "danger")
      console.log(errors)
  }
    // this.setState({ payWithPayNow: true })
    // console.log("::::::: 288 ::::::: ", this.setState({ payWithPayNow: true }))

  }
  
  payWithPayPal = (e) => {
    e.preventDefault();
    this.setState({ payWithPayPal: true })
  }

  payWithStripe = (e) => {
    e.preventDefault();
    this.setState({ payWithStripe: true })
  }
  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(":: 294 ::", user.username)
    // console.log(":: 295 ::", user.email)
    return (
      <React.Fragment>

        {this.state.isPending ? <Dimmer active inverted><Loader size='large' indeterminate>Loading</Loader></Dimmer> :

          <>
            <MetaTags>
              <title> GoMaidz | CheckOut</title>
              <meta
                name="description"
                content="#"
              />
            </MetaTags>
            <Header />
            <Breadcrumb breadcrumb={{ pagename: 'CheckOut' }} />
            <ToastContainer
              autoClose={10000}
            />
            <Form
            >
              <Container className='order-container'>
                <h2 className='text-center mb-5'
                  style={{ color: "#1020432" }}
                >CheckOut</h2>
                <Row
                  className="row-hireDetails"
                >
                  <Col xs={0} md={3}>
                  </Col>
                  <Col xs={6} md={4}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Full Name</Form.Label>
                      <Form.Control type="text" placeholder="FullName"
                        className="textFields-Order"
                        value={this.state.user.username ?? user.username}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6} md={3} className="p-l-0"
                    style={{ paddingLeft: "0" }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Email</Form.Label>
                      <Form.Control type="email" placeholder="Email"
                        readOnly
                        value={this.state.user.email ?? user.email}
                        className="textFields-Order"
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={0} md={2}>
                  </Col>
                </Row>

                <Row
                  className="row-hireDetails"
                >
                  <Col xs={0} md={3}>
                  </Col>

                  <Col xs={6} md={4}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Service Availed</Form.Label>
                      <Form.Control type="text" placeholder="Service Availed"
                        value={this.state.service_availed}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={6} md={3}
                    style={{ paddingLeft: "0" }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Date</Form.Label>
                      <Form.Control type="text" placeholder="Date"
                        value={this.state.date}
                        className="textFields-Order"
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row
                  className="row-hireDetails">
                  <Col xs={0} md={3}>
                  </Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Slot</Form.Label>
                      <Form.Control type="text" placeholder="Slot"
                        readOnly
                        value={this.state.slot_start_time + " to " + this.state.slot_end_time}
                        className="textFields-Order"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3}
                    style={{ paddingLeft: "0" }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Service Cost</Form.Label>
                      <Form.Control type="text" placeholder="Service Cost"
                        readOnly
                        value={"$" + this.state.costAccumulation}
                        className="textFields-Order"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row
                  className="row-hireDetails">
                  <Col xs={0} md={3}></Col>
                  <Col xs={6} md={4}>
                    <Form.Label className="label-order">Service Address</Form.Label>
                    <Address
                      name="service_address"
                      value={this.state.service_address}
                    />
                    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label  className="label-order"

                >Service Address</Form.Label>
                <Form.Control type="text" placeholder="Service Address"
                 value={this.state.address}
                 className="textFields-Order"
                />

              <Link to="/maps/location" target="_blank" >
               Specify Your Address with map
              <MapPin style={{marginLeft:"0.5rem",marginTop:"0.3rem"}}/>
              

              
                </Link> */}

                    {/* </Form.Group> */}
                  </Col>
                  <Col xs={6} md={3} style={{ paddingLeft: "0" }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="label-order">Billing Address</Form.Label>
                      <Form.Control type="text" placeholder="Billing Address"
                        value={this.state.sameAsBillingAddress === true ? this.state.service_address : this.state.billingAddress}
                        onChange={this.onChangeTextFields}
                        name="billingAddress"
                        className="textFields-Order"
                      />
                      <Form.Check
                        onChange={this.checkBoxCheck}
                        type="checkbox"
                        label="Same as service address ?"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={3}></Col>
                  <Col md={7}>
                    <Form.Group className="mb-0" controlId="formBasicEmail">
                      <Form.Label className="label-order">Country</Form.Label>
                      <Form.Control type="text" placeholder="Country"
                        value={this.state.country}
                        className="textFields-Order"
                        name="country"
                        onChange={this.onChangeTextFields}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row
                  className="row-hireDetails">
                  <Col xs={0} md={3}></Col>
                  <Col xs={6} md={4}>
                    <Form.Group className="mb-0" controlId="formBasicEmail">
                      <Form.Label className="label-order">State</Form.Label>
                      <Form.Control type="text" placeholder="State"
                        onChange={this.onChangeTextFields}
                        name="state"
                        className="textFields-Order"
                        value={this.state.state}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={6} md={3} style={{ paddingLeft: "0" }}>
                    <Form.Group className="mb-0" controlId="formBasicEmail">
                      <Form.Label className="label-order">City</Form.Label>
                      <Form.Control type="text" placeholder="City"
                        onChange={this.onChangeTextFields}
                        name="city"
                        className="textFields-Order"
                        value={this.state.city}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row
                  className="row-hireDetails mt-2"
                >
                  <Col xs={0} md={3}>

                  </Col>
                  <Col xs={12} md={7}>
                    <div className="">
                      <div style={{ width: "100%" }}>
                        <p className='mt-0 text-center'>
                          <label style={{ color: "gray", fontSize: "1.3rem", textAlign: "center" }}>Payment from wallet/using saved card</label>
                          <div>
                          <button
                              onClick={this.payWithPayNow}
                              hidden={user.customer_id === null}
                              style={{ background: "#34B3F1", border: "0", fontSize: "1.3rem", color: "#fff", padding: "6.5px 4rem", borderRadius: "25px", fontWeight: "550" }}>PAY NOW
                              </button>
                          </div>
                        </p>

                        {/* {this.state.payWithStripe === true && <Payment

                          checkOutBtnEnable={this.checkOutBtnEnable}
                          service_provider_id={this.props.location.state.currentServiceProvider.id}
                          service_availed={this.state.service_availed}
                          cost={this.state.costAccumulation}
                          email={this.state.email}
                        />} */}
                      </div>
                    </div>
                    <div className="">
                      <div style={{ width: "100%" }}>
                        <p className='mt-0 text-center'>
                          <label style={{ color: "gray", fontSize: "1.3rem", textAlign: "center" }}>Pay With </label>
                          <div>
                            <button
                              onClick={this.payWithStripe}
                              style={{ background: "#34B3F1", border: "0", fontSize: "1.3rem", color: "#fff", padding: "6.5px 4rem", borderRadius: "25px", fontWeight: "550" }}>Credit Card</button>
                          </div>
                        </p>

                        {this.state.payWithStripe === true && <Payment

                          checkOutBtnEnable={this.checkOutBtnEnable}
                          service_provider_id={this.props.location.state.currentServiceProvider.id}
                          service_availed={this.state.service_availed}
                          cost={this.state.costAccumulation}
                          email={this.state.email}
                        />}
                      </div>
                    </div>
                    <p className='mt-1 text-center'>
                      <label style={{ color: "gray", fontSize: "1.3rem", textAlign: "center" }}>Or Pay With</label>
                      <div>
                        <button
                          onClick={this.payWithPayPal}
                          style={{ background: "#1F4690", border: "0", fontSize: "1.3rem", color: "#fff", padding: "6.5px 4rem", borderRadius: "25px", fontWeight: "550" }}>PayPal</button>
                      </div>
                    </p>
                    <Row>
                      {this.state.payWithPayPal === true && <Col md={12} className="mt-4">
                        <Paypal
                          cost={this.state.costAccumulation}
                          checkOutBtnEnable={this.checkOutBtnEnable}
                        />
                      </Col>}
                    </Row>
                    <button
                      className='HireDetails-btn mb-5 mt-0 btn-disable-style'
                      onClick={this.formCheckOut}
                      disabled={this.state.CheckOut}>Place Order</button>
                  </Col>

                  <Col></Col>
                  <Col xs={0} md={3}></Col>
                </Row>
              </Container>
            </Form>
            <Footer />
          </>}
      </React.Fragment>
    );
  }
}
export default HireDetails;