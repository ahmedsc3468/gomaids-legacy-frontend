import React, { Component } from "react";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import Select from "react-select";
import Joi from "joi-browser";
import axios from "axios";
import { Row, Col } from "reactstrap";
import Switch from "@mui/material/Switch";
import "../../../assets/MyCSS/setupwizard.css";
import "../../../assets/MyCSS/loginpage.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
class PersonalDetails extends Component {
  objectSchema = Joi.object({
    label: Joi.string().required().label("Service").required(),
    value: Joi.number().required().label("Service").required(),
  }).required();

  objectSchema_language = Joi.object({
    label: Joi.string().required().label("language").required(),
    value: Joi.number().required().label("language").required(),
  }).required();

  schema = {
    dob: Joi.string().required().label("Date Of Birth"),
    service_type_id: Joi.number().required().label(" select a Service Type"),
    experience: Joi.string().required().label("Experience"),
    currency_id: Joi.number().required().label("Currency should be selected"),
    price: Joi.number().required().label("Price"),
    education: Joi.string().label("Education"),
    language_ids: Joi.array()
      .items(this.objectSchema_language)
      .required()
      .label("language"),
    description: Joi.string().required().label("Description"),
  };

  constructor(props) {
    super(props);
    let user = AuthService.getCurrentUser();
    this.languagesRef = React.createRef();

    //console.log("hang checking::",user.id);

    this.state = {
      user_id: user.id,
      description: "",
      experience: "",
      price: "",
      dob: "",
      education: "",
      servicetype: [],
      currencies: [],
      currency_id: "",
      service_type_id: "",
      language_ids: [],
      language: [],
      name: [],
      errors: {},
      message: "",
      auto_accept: true,
      servicesPayload: [],
      defaultCurrencyValue: { label: "", value: "" },
      isloading: false,
    };
  }

  onChangeTextFields = (e) => {
    const errorMessage = this.validateProperty(e.currentTarget);

    const errors = { ...this.state.errors };
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else {
      delete errors[e.currentTarget.name];
      this.setState({ errors });
    }

    let Name = e.currentTarget.name;

    this.setState({ [Name]: e.currentTarget.value, errors });
  };

  validate = () => {
    let obj = {
      service_type_id: this.state.service_type_id,
      experience: this.state.experience,
      price: this.state.price,
      //   education: this.state.education,
      currency_id: this.state.currency_id,
      language_ids: this.state.language_ids,
      description: this.state.description,
      dob: this.state.dob,
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

  saveAndContinue = (e) => {
    e.preventDefault();
    this.setState({ isloading: true });

    let errors = this.validate();
    let user = AuthService.getCurrentUser();

    if (errors) {
      // console.log(errors)
      this.setState({ errors });
      this.setState({ isloading: false });
      return;
    }

    // const servicetypeids = this.state.service_type_id.map(
    //     (service) => service.value
    // );
    // this.setState({ service_type_id: servicetypeids });

    // const languagesids = this.state.language_id.map(
    //     (service) => service.value
    // );
    // this.setState({ language_id: languagesids });

    const data = {
      service_type_id: this.state.service_type_id,
      user_id: this.state.user_id,
      experience: this.state.experience,
      education: this.state.education,
      price: this.state.price,
      currency_id: this.state.currency_id,
      language_ids: this.state.language_ids,
      description: this.state.description,
      dob: this.state.dob,
    };

    const obj = {
      dob: this.state.dob,
    };

    const servicesPayload = [...this.state.servicesPayload];
    servicesPayload.push(data);
    const service_types = { service_types: servicesPayload };

    try {
      axios
        .post(config.SERVER_URL + `/api/serviceprovider`, service_types, {
          headers: authHeader(),
        })
        .then(function (response) {
          // console.log(response);
        });

      axios
        .put(config.SERVER_URL + `/api/user/${user.id}/profile`, obj, {
          headers: authHeader(),
        })
        .then(function (response) {
          // console.log(response);
        });

      // axios
      //     .post(config.SERVER_URL + `/api/languagesuser`, data, {
      //         headers: authHeader(),
      //     })
      //     .then(function (response) {
      //         console.log(response);
      //     });
      this.setState({ isloading: false });
      this.props.nextStep();
    } catch (err) {
      this.setState({ isloading: false });
      // console.log(err)
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    let that = this;
    axios
      .get(config.SERVER_URL + `/api/servicetype`, {
        headers: authHeader(),
      })
      .then(function (response) {
        // console.log(response);
        that.setState({ servicetype: response.data.data.data });
      });

    axios
      .get(config.SERVER_URL + `/api/currency`, {
        headers: authHeader(),
      })
      .then(function (response) {
        // console.log(response);
        that.setState({ currencies: response.data.data.data });
        if (response.data.data.data.length > 0) {
          that.setState({ currency_id: response.data.data.data[0].id });
        }
      });
    axios
      .get(config.SERVER_URL + `/api/language?column=1&length=100`, {
        headers: authHeader(),
      })
      .then(function (response) {
        // console.log("::::::: 218 :::::::", response);
        that.setState({ language: response.data.data.data });
      });
  }

  getDropDownSerivces = () => {
    let temp = [];

    for (let i = 0; i < this.state.servicetype.length; i++) {
      temp.push({
        text: this.state.servicetype[i].name,
        value: this.state.servicetype[i].id,
      });
    }

    return temp;
  };
  getDropDownCurrencies = () => {
    let temp = [];

    for (let i = 0; i < this.state.currencies.length; i++) {
      temp.push({
        label: this.state.currencies[i].name,
        value: this.state.currencies[i].id,
      });
    }

    return temp;
  };

  getDropDownLanguage = () => {
    let temp = [];

    for (let i = 0; i < this.state.language.length; i++) {
      temp.push({
        label: this.state.language[i].name,
        value: this.state.language[i].id,
      });
    }
    return temp;
  };

  back = (e) => {
    this.props.prevStep();
  };

  servicesSelected = (event, data) => {
    this.setState({ service_type_id: data.value });

    // if (e[0]) {
    //     const errors = { ...this.state.errors };
    //     delete errors.service_type_id;
    //     this.setState({ errors });
    // }

    // const service_type_id = e;
    // this.setState({ service_type_id });
  };

  languageSelected = (e) => {
    if (e[0]) {
      const language_ids = [...this.state.language_ids];
      language_ids.push(e);
      this.setState({ language_ids: e });
    }

    // if (e[0]) {
    //     const errors = { ...this.state.errors };
    //     delete errors.language_id;
    //     this.setState({ errors });
    // }
    // const language_id = e;

    // this.setState({ language_id });
  };

  switch = async (e) => {
    try {
      this.setState({ auto_accept: e.target.checked });
      await axios.put(
        config.SERVER_URL + `/api/autoaccept/${this.state.user_id}`,
        {
          auto_accept: e.target.checked === false ? 0 : 1,
        },
        {
          headers: authHeader(),
        }
      );
    } catch (ex) {}
  };

  AddAnotherService = () => {
    // console.log("handleAnotherService")
    let errors = this.validate();

    if (errors) {
      // console.log(errors)
      this.setState({ errors });
      return;
    }

    // const languagesids = this.state.language_id.map(
    //     (service) => service.value
    // );
    // this.setState({ language_id: languagesids });
    const data = {
      service_type_id: this.state.service_type_id,
      user_id: this.state.user_id,
      experience: this.state.experience,
      education: this.state.education,
      price: this.state.price,
      currency_id: this.state.currency_id,
      language_ids: this.state.language_ids,
      description: this.state.description,
    };
    const servicesPayload = [...this.state.servicesPayload];
    servicesPayload.push(data);
    this.setState({ servicesPayload });
    const servicetype = this.state.servicetype.filter(
      (x) => x.id !== this.state.service_type_id
    );
    this.setState({
      service_type_id: "",
      experience: "",
      price: "",
      currency_id: "",
      language_ids: [],
      description: "",
      defaultCurrencyValue: { label: "", value: "" },
      education: "",
      servicetype,
    });
  };

  handleCurrency = (e) => {
    this.setState({ currency_id: e.value, defaultCurrencyValue: e });
  };
  render() {
    const { values } = this.props;
    const label = { inputProps: { "aria-label": "Switch demo" } };
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

        <Grid.Column className="setupwizard-personal-details position-relative">
          <Header
            textAlign="center"
            className="setupwizard-personal-details-header"
          >
            <h1>Personal Details</h1>
          </Header>
          <Form
            // onSubmit={this.saveAndContinue}
            ref={(e) => {
              this.form = e;
            }}
          >
            <Segment>
              <Form.Field>
                <label>
                  Date Of Birth <span class="red-star">*</span>
                </label>
                <input
                  name="dob"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Date Of Birth"
                  value={this.state.dob}
                  onChange={this.onChangeTextFields}
                  //defaultValue={values.dob}
                />
                {this.state.errors.dob && (
                  <span className="text-danger">{this.state.errors.dob}</span>
                )}
              </Form.Field>
            </Segment>

            <Segment>
              <Form.Field>
                <label>
                  Service Type<span class="red-star">*</span>
                </label>
                {/* <Select
                            onChange={this.servicesSelected}
                            name="service_type_id"
                            isMulti

                            options={this.getDropDownSerivces()}
                        /> */}
                <Dropdown
                  placeholder="Select Service"
                  fluid
                  selection
                  onChange={this.servicesSelected}
                  options={this.getDropDownSerivces()}
                  value={this.state.service_type_id}
                />
                {this.state.errors.service_type_id && (
                  <span className="text-danger">
                    {this.state.errors.service_type_id}
                  </span>
                )}
              </Form.Field>
              <Form.Field>
                <Row>
                  <Col md={8}>
                    <label>
                      Price Per hour<span class="red-star">*</span>
                    </label>
                    <input
                      name="price"
                      type="number"
                      placeholder="price"
                      onChange={this.onChangeTextFields}
                      value={this.state.price}
                      autoComplete="off"
                      min={0}
                    />
                    {this.state.errors.price && (
                      <span className="text-danger">
                        {this.state.errors.price}
                      </span>
                    )}
                  </Col>

                  <Col md={4}>
                    <label>
                      Currency<span class="red-star">*</span>
                    </label>
                    <Select
                      onChange={this.handleCurrency}
                      value={this.state.defaultCurrencyValue}
                      placeholder="Currency"
                      name="currency_id"
                      options={this.getDropDownCurrencies()}
                    />
                    {this.state.errors.currency_id && (
                      <span className="text-danger">
                        {this.state.errors.currency_id}
                      </span>
                    )}
                  </Col>
                </Row>
              </Form.Field>
              <Form.Field>
                <label>
                  Experience (In Years)<span class="red-star">*</span>
                </label>
                <input
                  name="experience"
                  type="text"
                  placeholder="Experience"
                  onChange={this.onChangeTextFields}
                  value={this.state.experience}
                />
                {this.state.errors.experience && (
                  <span className="text-danger">
                    {this.state.errors.experience}
                  </span>
                )}
              </Form.Field>

              <Form.Field>
                <label>Education</label>
                <input
                  name="education"
                  type="text"
                  placeholder="Education (optional)"
                  onChange={this.onChangeTextFields}
                  value={this.state.education}
                />
              </Form.Field>

              <Form.Field>
                <label>
                  Languages you can speak<span class="red-star">*</span>
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  onChange={this.languageSelected}
                  name="language_id"
                  isClearable={false}
                  isMulti
                  value={this.state.language_ids}
                  options={this.getDropDownLanguage()}
                  placeholder="Select Language"
                />
                {this.state.errors.language_id && (
                  <span className="text-danger">
                    {this.state.errors.language_id}
                  </span>
                )}
              </Form.Field>

              <Form.Field>
                <label>
                  Description<span class="red-star">*</span>
                </label>

                <textarea
                  id="w3review"
                  name="description"
                  placeholder="Description"
                  rows="4"
                  cols="50"
                  onChange={this.onChangeTextFields}
                  value={this.state.description}
                ></textarea>
                {this.state.errors.description && (
                  <span className="text-danger">
                    {this.state.errors.description}
                  </span>
                )}
                {/* <input
                            name="description"
                            type="textarea"
                            placeholder="Description"
                            onChange={this.onChangeDescription}
                        /> */}
              </Form.Field>

              <Form.Field>
                <Row>
                  <Col md={8} className="mt-0 mb-0">
                    <label>Auto Accept My Requests</label>
                    <Switch {...label} defaultChecked onChange={this.switch} />
                  </Col>

                  <Col md={3}></Col>
                </Row>

                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>
                  Save And Continue
                </Button>
                <button
                  className="ui inverted green button another_service_btn"
                  onClick={this.AddAnotherService}
                  disabled={this.state.servicetype.length === 1 ? true : false}
                >
                  Add Another Service
                </button>
              </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </div>
    );
  }
}
export default PersonalDetails;
