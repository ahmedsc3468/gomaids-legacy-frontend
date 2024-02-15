import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import { UserDetials } from "../../../actions/userDetials";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Joi from "joi-browser";
import Address from "../Hire/AddressAutoComplete";
import "../../../assets/MyCSS/setupwizard.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

class UserDetails extends Component {
  schema = {
    // dob: Joi.string().required().label("Date Of Birth"),
    //        mobile_no: Joi.string().required().label("Mobile No"),
    street_address: Joi.string().required().label("Address"),
    country: Joi.string().required().label("Country"),
    city: Joi.string().required().label("City"),
    postal_code: Joi.string().required().label("Postal Code"),
    rawImage: Joi.string().required().label("Image"),
    state: Joi.string().required().label("State"),
    identity: Joi.string().required().label("identity"),
  };

  constructor(props) {
    let user = AuthService.getCurrentUser();
    console.log("authService: ", AuthService);
    console.log("userData: ", user);
    console.log("props: ", props);
    super(props);

    this.handleUserDetails = this.handleUserDetails.bind(this);
    // console.log("props.userDetailsData.country::",props.userDetailsData)
    this.state = {
      user_id: user && user.id,
      role: user && user.role.name,
      // dob: props.userDetailsData.dob || "",
      passport_no: props.userDetailsData.passport_no || "",
      //            mobile_no: props.userDetailsData.mobile_no || "",
      street_address: props.userDetailsData.street_address || "",
      city: props.userDetailsData.city || "",
      errors: {},
      state: props.userDetailsData.state || "",
      country: props.userDetailsData.country || "",
      postal_code: props.userDetailsData.postal_code || "",
      rawImage: props.userDetailsData.image || "",
      image: "",
      successful: false,
      cities: [],
      message: "",
      imageSelected: false,
      showInputFile: false,
      identity: props.userDetailsData.identity || "",
      isloading: false,
    };
  }

  populateCityDropDown = async (state) => {
    const { data: cities } = await axios.get(
      config.SERVER_URL + `/api/city/${state}`
    );

    this.setState({ cities: cities.data });
  };

  onChangeTextFields = (e) => {
    const errorMessage = this.validateProperty(e.currentTarget);

    const errors = { ...this.state.errors };
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else {
      delete errors[e.currentTarget.name];
      this.setState({ errors });
    }

    let Name = e.currentTarget.name;
    console.log("TESTNG FOR POSTAL CODE", Name);

    if (Name === "country") {
      this.populateStateDropDown(e.currentTarget.value);
    } else if (Name === "state") {
      this.populateCityDropDown(e.currentTarget.value);
    } else if (Name === "postal_code") {
      this.populatePostCodeDropDown(e.currentTarget.value);
    } else if (Name === "rawImage") {
      if (e.target.files[0]) {
        const reader = new FileReader();
        const val = e.currentTarget.value;
        reader.addEventListener("load", () => {
          this.setState({ image: reader.result, imageSelected: true });
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    } else if (Name === "identity") {
      // console.log("identity!!")
      if (e.target.files[0]) {
        const reader = new FileReader();
        const val = e.currentTarget.value;
        reader.addEventListener("load", () => {
          this.setState({ identity: reader.result });
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
    ///asd
    this.setState({ [Name]: e.currentTarget.value, errors });
  };

  validate = () => {
    let obj = {
      // dob: this.state.dob,
      //            mobile_no: this.state.mobile_no,
      street_address: this.state.street_address,
      country: this.state.country,
      city: this.state.city,
      postal_code: this.state.postal_code,
      rawImage: this.state.rawImage,
      identity: this.state.identity,
      state: this.state.state,
    };
    const { error } = Joi.validate(obj, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    let errors = {};
    if (error) {
      for (let item of error.details) {
        errors[item.path] = item.message;
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ value, name }) => {
    let dataProperty = { [name]: value };
    let subSchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(dataProperty, subSchema);

    return error ? error.details[0].message : null;
  };

  populateStateDropDown = (value) => {
    // let that = this;
    // axios
    //     .get(config.SERVER_URL + `/api/state/${value}`)
    //     .then(function (response) {
    //         console.log(response.data.data);
    //         //  this.state.state = response.data.data
    //         that.setState({
    //             state: response.data.data,
    //         });
    //         console.log(that.state.state);
    //     });
    // this.setState({
    //     country: value,
    // });
  };

  populatePostCodeDropDown = (value) => {};

  myInterval = setInterval(() => {
    const city = localStorage.getItem("city");
    const country = localStorage.getItem("country");
    //       console.log("country:",localStorage.getItem("country"))
    const state = localStorage.getItem("state");
    const postal_code = localStorage.getItem("postal_code");
    if (city && country && state && postal_code)
      this.setState({
        city,
        country: localStorage.getItem("country"),
        state: state,
        postal_code,
      });

    if (!localStorage.getItem("defaultAddress"))
      this.setState({ default_address: "" });
    if (!localStorage.getItem("streetAddress")) {
      this.setState({ street_address: "" });
    }
    if (localStorage.getItem("streetAddress")) {
      this.setState({ street_address: localStorage.getItem("streetAddress") });
    }

    if (localStorage.getItem("defaultAddress")) {
      this.setState({
        default_address: localStorage.getItem("defaultAddress"),
      });
    }
  }, 1000);

  completeLater = async (e) => {
    let that = this;
    e.preventDefault();
    let user = AuthService.getCurrentUser();
    const obj = {
      dob: this.state.dob,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      user_id: user.id,
      postal_code: this.state.postal_code,
      default_address: this.state.default_address,
      image: this.state.image,
      identity: that.state.identity,
    };

    try {
      await axios.put(config.SERVER_URL + `/api/user/${user.id}/profile`, obj, {
        headers: authHeader(),
      });

      that.props.setUserDetails({
        user_id: user.id,
        role: this.state.role,
        dob: this.state.dob,
        passport_no: this.state.passport_no,
        //                        mobile_no: this.state.mobile_no,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        postal_code: this.state.postal_code,
        default_address: this.state.default_address,
        image: this.state.image,
        identity: this.state.identity,
      });
      if (user.role.name === "service_provider") {
        // console.log("role!!!")
        that.props.nextStep();
      } else if (user.role.name === "service_taker") {
        that.props.history.push("/");
      }
    } catch (ex) {
      return;
    }
  };

  saveAndContinue = async (e) => {
    this.setState({ isloading: true });
    console.log(e);
    let that = this;
    e.preventDefault();
    let errors = this.validate();
    if (errors) {
      console.log(errors);
      this.setState({ errors });
      this.setState({ isloading: false });
      return;
    }

    let user = AuthService.getCurrentUser();

    const obj = {
      //                mobile_no: this.state.mobile_no,
      // dob: this.state.dob,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      user_id: user.id,
      postal_code: this.state.postal_code,
      default_address: this.state.street_address,
      image: this.state.image,
      identity: that.state.identity,
    };
    // console.log(":::::: 301 ::::::", obj)

    try {
      await axios
        .put(config.SERVER_URL + `/api/user/${user.id}/profile`, obj, {
          headers: authHeader(),
        })
        .then(function (response) {
          const latLng = {
            lat: response.data.data.lat,
            lng: response.data.data.lng,
          };
          console.log("latLng: ", latLng);
          localStorage.setItem("latLng", JSON.stringify(latLng));
        });

      that.props.setUserDetails({
        user_id: user.id,
        role: this.state.role,
        dob: this.state.dob,
        passport_no: this.state.passport_no,
        //                        mobile_no: this.state.mobile_no,
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        postal_code: this.state.postal_code,
        default_address: this.state.default_address,
        image: this.state.image,
        identity: this.state.identity,
      });
      if (user.role.name === "service_provider") {
        this.setState({ isloading: false });
        // console.log("role!!!")
        that.props.nextStep();
      } else if (user.role.name === "service_taker") {
        this.setState({ isloading: false });
        that.props.history.push("/");
      }
    } catch (ex) {
      this.setState({ isloading: false });
      return;
    }
  };

  handleUserDetails(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });
  }

  handleImageUpload(e) {}
  async componentDidMount() {
    window.scrollTo(0, 0);
    // if(!user){
    //     console.log("!user")

    //     props.history.push("/Setupwizard")
    // }
    localStorage.removeItem("state");
    localStorage.removeItem("city");
    localStorage.removeItem("country");
    localStorage.removeItem("defaultAddress");
    localStorage.removeItem("streetAddress");
    this.setState({ country: "" });

    let user = AuthService.getCurrentUser();

    this.setState({ user_id: user && user.id });
    // await this.getCities();

    if (this.props.userDetailsData && this.props.userDetailsData.country) {
      // console.log(this.props.userDetailsData)
      this.populateStateDropDown(this.props.userDetailsData.country);
    }

    // axios
    //     .get(config.SERVER_URL + `/api/country`, this.state)
    //     .then(function (response) {
    //         console.log(response);
    //         that.setState({ country: response.data.data });
    //     });

    setTimeout(() => {
      if (
        sessionStorage.getItem("reload") === null &&
        localStorage.getItem("user") !== null
      ) {
        sessionStorage.setItem("reload", true);
       // window.location.reload();
      } else {
        sessionStorage.removeItem("reload");
      }
    }, 2000);
  }
  radioBtn = (e) => {
    if (e.target.name === "flexRadioDefault")
      this.setState({ showInputFile: true });
    else if (e.target.name === "flexRadioDefault")
      this.setState({ showInputFile: true });
    console.log(e.target.name);
  };
  render() {
    return (
      <div className="position-relative">
        {this.state.isloading && (
          <div className="page_loader_global">
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

        <Grid.Column className="setupwizard-user-details position-relative">
          <Header
            textAlign="center"
            className="setupwizard-user-details-header"
          >
            <h1>Profile Details</h1>
          </Header>

          <Form
            onSubmit={this.handleUserDetails}
            ref={(e) => {
              this.form = e;
            }}
          >
            <Segment>
              <Button onClick={this.completeLater}>Complete Later</Button>
            </Segment>
            <Segment>
              {/* <Form.Field>
                            <label>Date Of Birth</label>
                            <input
                                name="dob"
                                type="date"
                                max={new Date().toISOString().split('T')[0]}
                                placeholder="Date Of Birth"
                                value={this.state.dob}
                                onChange={this.onChangeTextFields}
                            //defaultValue={values.dob}
                            />
                            {
                                this.state.errors.dob
                                &&
                                <span className="text-danger">
                                    {
                                        this.state.errors.dob

                                    }
                                </span>
                            }
                        </Form.Field> */}

              {/* <Form.Field>
                            <label>Mobile Number</label>
                            <input
                                name="mobile_no"
                                type="number"
                                placeholder="Phone Number"
                                value={this.state.mobile_no}
                                onChange={this.onChangeTextFields}
                            />
                            {
                                this.state.errors.mobile_no &&
                                <span className="text-danger">
                                    {
                                        this.state.errors.mobile_no
                                    }
                                </span>
                            }
                        </Form.Field> */}

              <Form.Field>
                <label>
                  Address<span class="red-star">*</span>
                </label>
                <Address
                  page="setUpWizard streetAddress"
                  name="street_address"
                  value={this.state.street_address}
                />
                {/* <input
                                name="street_address"
                                type="text"
                                placeholder="Street Address"
                                value={this.state.street_address}
                                onChange={this.onChangeTextFields}
                         
                            /> */}
                {this.state.errors.street_address && (
                  <span className="text-danger">
                    {this.state.errors.street_address}
                  </span>
                )}
                {/* <input
                                name="default_address"
                                type="text"
                                placeholder="Default Address"
                                value={this.state.default_address}
                                onChange={this.onChangeTextFields}
                          
                            /> */}
                {/* <Address
                                 page="setUpWizard defaultAddress"
                                 name="default_address"
                                 value={this.state.default_address} 
                               
                                />
                            {
                                this.state.errors.default_address &&
                                <span className="text-danger">
                                    {
                                        this.state.errors.default_address
                                    }
                                </span>
                            } */}

                <label>
                  Location<span class="red-star">*</span>
                </label>

                <input
                  type="select"
                  className="form-control"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChangeTextFields}
                  placeholder="country"
                />
                {/* <option>-- Choose Country --</option>
                                {this.state.country.map((value, key) => {
                                    const countryName = value.name.replace(
                                        "_",
                                        " "
                                    );
                                    return (
                                        <option value={value.id} key={key}>
                                            {countryName}
                                        </option>
                                    );
                                })} */}
                {/* </select> */}

                {this.state.errors.country && (
                  <span className="text-danger">
                    {this.state.errors.country}
                  </span>
                )}
                <input
                  type="select"
                  className="form-control"
                  name="state"
                  value={this.state.state}
                  onChange={this.onChangeTextFields}
                  placeholder="state"
                />
                {/* <option>-- Choose State --</option>
                                {this.state.state.map((value, key) => {
                                    const stateName = value.name.replace(
                                        "_",
                                        " "
                                    );
                                    return (
                                        <option value={value.id} key={key}>
                                            {stateName}
                                        </option>
                                    );
                                })}
                            </select> */}

                {this.state.errors.state && (
                  <span className="text-danger">{this.state.errors.state}</span>
                )}

                <input
                  type="select"
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChangeTextFields}
                  placeholder="city"
                />
                {/* <option>-- Choose City --</option>
                                {this.state.cities.map((value, key) => {
                                    return (
                                        <option value={value.id} key={key}>
                                            {value.name}
                                        </option>
                                    );
                                })} */}

                {this.state.errors.city && (
                  <span className="text-danger">{this.state.errors.city}</span>
                )}
                <input
                  name="postal_code"
                  type="text"
                  placeholder="postal code"
                  value={this.state.postal_code}
                  onChange={this.onChangeTextFields}
                  // onChange={this.props.handleChange('postal_code')}
                  // defaultValue={values.postal_code}
                />
                {this.state.errors.postal_code && (
                  <span className="text-danger">
                    {this.state.errors.postal_code}
                  </span>
                )}
              </Form.Field>

              <Form.Field>
                <label>
                  User Picture<span class="red-star">*</span>
                </label>
                <input
                  name="rawImage"
                  type="file"
                  placeholder="User Picture"
                  onChange={this.onChangeTextFields}
                  value={this.state.rawImage}
                  accept=".jpg,.png,.pdf"
                />
                {this.state.errors.rawImage && (
                  <span className="text-danger">
                    {this.state.errors.rawImage}
                  </span>
                )}
              </Form.Field>

              <label>
                Identity<span class="red-star">*</span>
              </label>
              <Segment>
                <span className="d-flex justify-content-center mt-3">
                  <span>
                    <input
                      className="form-check-input"
                      style={{ marginLeft: "1px" }}
                      onChange={this.radioBtn}
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                      style={{ marginLeft: "20px" }}
                      name="driversLicense"
                    >
                      Driver's License
                    </label>
                  </span>

                  <span>
                    <span style={{ marginLeft: "3rem" }}>
                      <input
                        className="form-check-input"
                        onChange={this.radioBtn}
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                        name="passportNumber"
                      >
                        Passport Number
                      </label>
                    </span>
                  </span>
                </span>
                {this.state.errors.identity && (
                  <span className="text-danger">
                    {this.state.errors.identity}
                  </span>
                )}

                {this.state.showInputFile === true && (
                  <span>
                    <div>
                      <label className="mt-3">Upload Image</label>
                    </div>
                    <span>
                      <input
                        type="file"
                        name="identity"
                        onChange={this.onChangeTextFields}
                        placeholder="Upload"
                        accept=".jpg,.png,.pdf"
                        required
                      />
                    </span>
                  </span>
                )}
              </Segment>
            </Segment>

            <Segment>
              <Button onClick={this.completeLater}>Complete Later</Button>
              <Button onClick={this.saveAndContinue}>Save And Continue</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    );
  }
}

// export default UserDetails;

const mapStateToProps = (state) => {
  return {
    userDetailsData: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserDetails: (data) => dispatch(UserDetials(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDetails)
);
