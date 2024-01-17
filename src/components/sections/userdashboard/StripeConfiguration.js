import { Form } from "semantic-ui-react";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import "../../../assets/MyCSS/userdashboard.css";
import config from "../../../config.json";
import swal from "sweetalert";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import CircularProgress from "@mui/material/CircularProgress";

class StripeConfiguration extends Component {
  constructor(props) {
    super(props);
    let user = AuthService.getCurrentUser();
    this.state = {
      user_id: user.id,
      paymentConfigShow: "stripe",
      stripe_publishable_key: "",
      stripe_secret: "",
      paypal_client_id: "",
      paypal_client_secret: "",
      isPending: true,
    };
  }

  paymentConfig = (e) => {
    if (e.target.name === "stripe")
      this.setState({ [e.target.name]: e.target.value });
  };

  // handleChange = (event) => {

  // }

  async componentDidMount() {
    try {
      let user = AuthService.getCurrentUser();
      const getConfig = await axios.get(
        config.SERVER_URL + `/api/userconfiguration`,
        {
          headers: authHeader(),
          // cancelToken: this.source.token
        }
      );

      const getUser = await axios.get(
        config.SERVER_URL + `/api/user/${user.id}`,
        {
          headers: authHeader(),
          // cancelToken: this.source.token
        }
      );

      const getSpecificUser = getUser.data.data;

      const UserDetails = getConfig.data.data;

      this.setState({
        SpecificUser: getSpecificUser,
        user: user,
        stripe_publishable_key: UserDetails.stripe_publishable_key,
        stripe_secret: UserDetails.stripe_secret,
        paypal_client_id: UserDetails.paypal_client_id,
        paypal_client_secret: UserDetails.paypal_client_secret,
        isPending: false,
        routing_number: "",
        account_number: "",
        account_type: "individual",
        fname: getSpecificUser.fname,
        lname: getSpecificUser.lname,
        email: getSpecificUser.email,
        phone: getSpecificUser.mobile_no,
        dob: getSpecificUser.dob,
        addres: getSpecificUser.location.street_address,
        city: getSpecificUser.location.city,
        state: getSpecificUser.location.state,
        country: getSpecificUser.location.country,
        postal_code: getSpecificUser.location.postal_code,
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      stripe_publishable_key,
      stripe_secret,
      paypal_client_id,
      paypal_client_secret,
      routing_number,
      account_number,
      account_type,
      fname,
      lname,
      email,
      phone,
      dob,
      addres,
      city,
      state,
      country,
      postal_code,
    } = this.state;

    if (
      this.state.paymentConfigShow === "stripe" &&
      stripe_publishable_key &&
      stripe_secret
    ) {
      //http://127.0.0.1:8000/api/configurepayment

      try {
        await axios.put(
          config.SERVER_URL + "/api/configurepayment",
          {
            stripe_publishable_key,
            stripe_secret,
          },
          {
            headers: authHeader(),
          }
        );
        swal(
          "SuccessFull!",
          "Stripe Configration Added Successfully!",
          "success"
        );
      } catch (ex) {}
    } else if (
      this.state.paymentConfigShow === "paypal" &&
      paypal_client_id &&
      paypal_client_secret
    ) {
      try {
        await axios.put(
          config.SERVER_URL + "/api/configurepayment",
          {
            paypal_client_id,
            paypal_client_secret,
          },
          {
            headers: authHeader(),
          }
        );
        swal(
          "SuccessFull!",
          "Paypal Configration Added Successfully!",
          "success"
        );
      } catch (ex) {}
    } else if (this.state.paymentConfigShow === "bank") {
      try {
        const bank = await axios.post(
          config.SERVER_URL + "/api/add-bank",
          {
            routing_number,
            account_number,
            account_type,
            fname,
            lname,
            email,
            phone,
            dob,
            addres,
            city,
            state,
            country,
            postal_code,
          },
          {
            headers: authHeader(),
          }
        );
        if (bank.data?.success === false) {
          swal("Error!", bank.data.message, "warning");
        } else {
          swal("SuccessFull!", bank.data?.message, "success");
        }
      } catch (ex) {}
    } else {
      swal("Error!", "please enter values in the input fields.", "warning");
    }
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSelectChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <>
        {this.state.isPending ? (
          <div className="text-center">
            {" "}
            <CircularProgress color="success" />
          </div>
        ) : (
          <Form
          // onSubmit={this.handleSubmit}
          >
            <Row className="mb-4 cust-payment-container">
              <Col md={5} style={{ marginTop: "40px" }}>
                <h2 className="text-center cust-payment-h">
                  Payment Configuration
                </h2>
              </Col>
            </Row>

            <Row className="mb-4 cust-stripeconfiguration-container">
              <Col></Col>
              <Col md={5}>
                {/* <h5
                        className="text-center cust-stripeconfiguration-header"
                    >Stripe Configuration</h5> */}
              </Col>

              <Col></Col>
            </Row>
            <Row className="cust-radio-select-container">
              {/* <Col>
                    </Col> */}
              <Col md={5} style={{ textAlign: "center" }}>
                <>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Select Configuration Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={this.state.paymentConfigShow}
                      onChange={(e) => {
                        this.setState({ paymentConfigShow: e.target.value });
                      }}
                    >
                      <FormControlLabel
                        value="stripe"
                        control={<Radio />}
                        label="Stripe"
                      />
                      <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label="Paypal"
                      />
                      <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label="Bank"
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              </Col>
            </Row>

            {this.state.paymentConfigShow === "stripe" && (
              <>
                <Row>
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Stripe Publish Key
                    </label>
                    <input
                      name="stripe_publishable_key"
                      type="text"
                      placeholder="Enter your Stripe Publish Key.."
                      value={this.state.stripe_publishable_key}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <br />
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Stripe Secret Key
                    </label>
                    <input
                      name="stripe_secret"
                      type="text"
                      placeholder="Enter your Stripe Secret Key.."
                      value={this.state.stripe_secret}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </>
            )}

            {this.state.paymentConfigShow === "paypal" && (
              <>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Paypal Client ID
                    </label>
                    <input
                      name="paypal_client_id"
                      type="text"
                      placeholder="Enter your Paypal Client ID.."
                      value={this.state.paypal_client_id}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>

                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Paypal Secret Key
                    </label>
                    <input
                      name="paypal_client_secret"
                      type="text"
                      placeholder="Enter your Stripe Secret Key.."
                      value={this.state.paypal_client_secret}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </>
            )}
            {this.state.paymentConfigShow === "bank" && (
              <>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder Type
                    </label>
                    <select
                      name="account_type"
                      value={this.state.account_type}
                      onChange={this.handleSelectChange}
                    >
                      <option key="Individual" value="individual">
                        Individual
                      </option>
                    </select>
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Routing Number
                    </label>
                    <input
                      name="routing_number"
                      type="text"
                      placeholder="Enter Account's Routing Number"
                      value={this.state.routing_number}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Number
                    </label>
                    <input
                      name="account_number"
                      type="number"
                      placeholder="Enter Account Number"
                      value={this.state.account_number}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder First Name
                    </label>
                    <input
                      name="fname"
                      type="text"
                      placeholder="Account Holder First Name"
                      value={this.state.fname}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder Last Name
                    </label>
                    <input
                      name="lname"
                      type="text"
                      placeholder="Account Holder Last Name"
                      value={this.state.lname}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder email
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Account Holder email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Account Holder phone Number"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Date Of Birth
                    </label>
                    <input
                      name="dob"
                      type="date"
                      placeholder="Account Holder dob"
                      value={this.state.dob}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={2}>
                    <label className="label-style-configuration">Country</label>
                    <input
                      name="country"
                      type="text"
                      readOnly
                      placeholder="Account Holder Country"
                      value={this.state.country}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="label-style-configuration">State</label>
                    <input
                      name="state"
                      type="text"
                      placeholder="Account Holder State"
                      value={this.state.state}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={2}>
                    <label className="label-style-configuration">City</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Account Holder City"
                      value={this.state.city}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col md={3}>
                    <label className="label-style-configuration">
                      Postal Code
                    </label>
                    <input
                      name="postal_code"
                      type="text"
                      placeholder="Postal Code"
                      value={this.state.postal_code}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
                <Row className="mb-4">
                  <Col></Col>
                  <Col md={5}>
                    <label className="label-style-configuration">
                      Account Holder Address
                    </label>
                    <input
                      name="addres"
                      type="text"
                      placeholder="Account Holder Address"
                      value={this.state.addres}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                  <Col></Col>
                </Row>
              </>
            )}

            <Row className="text-center">
              <Col></Col>
              <Col md={5} style={{ marginBottom: "1rem" }}>
                <Button variant="success" onClick={this.handleSubmit}>
                  Save And Continue
                </Button>
                <br />
                {/* <Button variant="success"
                            style={{
                                backgroundColor: "#036905", color: "#fff", borderRadius: "5px",
                                paddingLeft: "15px", paddingRight: "15px", letterSpacing: "0.3px"
                            }}
                        >Save</Button> */}
              </Col>
              <Col></Col>
            </Row>
          </Form>
        )}
      </>
    );
  }
}

export default StripeConfiguration;
