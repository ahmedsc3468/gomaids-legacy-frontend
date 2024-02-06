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
import swal from "sweetalert";
import { withRouter } from "react-router-dom";
class EmailVerify extends Component {
  objectSchema = Joi.object({
    label: Joi.string().required().label("Service").required(),
    value: Joi.number().required().label("Service").required(),
  }).required();

  schema = {
    email: Joi.string().required().label("Email"),
    otp: Joi.string().required().label("Otp"),
  };

  constructor(props) {
    super(props);
    // let user = AuthService.getCurrentUser();

    //console.log("hang checking::",user.id);

    this.state = {
      // user_id: user.id,
      email: "",
      otp: "",
      errors: {},
      save_continue_button_disable: true,
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

  onChangeOTP = (e) => {
    this.setState({ otp: e.currentTarget.value });
  };

  validate = () => {
    let obj = {
      email: this.state.email,
      otp: this.state.otp,
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

  saveAndContinue = async (e) => {
    e.preventDefault();
    let that = this.props;
    try {
      const {
        data: { data },
      } = await axios.post(`${config.SERVER_URL}/api/verifymailcode`, {
        email: this.state.email,
        code: this.state.otp,
      });
      console.log(data);
      if (data.is_verified === 1) {
        swal("SuccessFull!", "Email Verified.", "success").then(() => {
          that.history.push("/number-verification");
        });
      } else {
        swal(
          "Invalid Verification Code",
          "The verification code you entered is invalid.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  sendOTP = async (e) => {
    e.preventDefault();

    let errors = this.validate();
    // let user = AuthService.getCurrentUser();
    console.log(errors);
    if (errors.email) {
      // console.log(errors)
      this.setState({ errors });
      return;
    }

    try {
      const { data } = await axios.post(`${config.SERVER_URL}/api/verifymail`, {
        email: this.state.email,
      });

      this.setState({ save_continue_button_disable: false });

      console.log("verifyEmail Response ", data);

      swal(
        "SuccessFull!",
        "Verification Code Sent Successfully! Please Check your Email!",
        "success"
      );
    } catch (error) {
      console.error(error);
    }

    console.log("userselected");
  };

  render() {
    return (
      <Grid.Column className="setupwizard-personal-details">
        <Header
          textAlign="center"
          className="setupwizard-personal-details-header"
        >
          <h1>Verify Your Detail</h1>
        </Header>
        <Form
          ref={(e) => {
            this.form = e;
          }}
        >
          <Segment>
            <Form.Field>
              <label>Verify your Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your Email"
                value={this.state.email}
                onChange={this.onChangeTextFields}
              />
              {this.state.errors.email && (
                <span className="text-danger">{this.state.errors.email}</span>
              )}
            </Form.Field>
            <Form.Field>
              <Button type="submit" onClick={this.sendOTP}>
                Send OTP
              </Button>
            </Form.Field>
            <Form.Field>
              <input
                name="otp"
                type="text"
                placeholder="Enter your OTP"
                value={this.state.otp}
                onChange={this.onChangeOTP}
              />
              {this.state.errors.otp && (
                <span className="text-danger">{this.state.errors.otp}</span>
              )}
            </Form.Field>
            <Form.Field>
              <Button
                onClick={this.saveAndContinue}
                disabled={this.state.save_continue_button_disable ?? ""}
              >
                Verify
              </Button>
            </Form.Field>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default withRouter(EmailVerify);
