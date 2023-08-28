import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import authHeader from "../../../services/auth-header";
import AuthService from "../../../services/auth.service";
import Headerinner from "../../layouts/Headerinner";
import Footer from "../../layouts/Footer";
import config from "../../../config.json";
import React, { Component } from "react";
// import { Grid, Header, Segment, Button,Form } from "semantic-ui-react";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userExists: "",
      username: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
    };
  }

  onChangeTextFields = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  Continue = async () => {
    try {
      const { data } = await axios.post(
        config.SERVER_URL + "/api/useremail",
        { email: this.state.email },
        {
          headers: authHeader(),
        }
      );
      this.setState({ userExists: true });
      this.setState({ classStyle: "" });
      this.setState({ classStyle: "" });
    } catch (ex) {
      this.setState({ userExists: false });
      this.setState({ classStyle: "" });
      this.setState({ signupLoginBtn: "signup-login" });
    }
  };

  login = async () => {
    try {
      await axios.post(
        config.SERVER_URL + "/api/login",
        { email: this.state.email, password: this.state.password },
        {
          headers: authHeader(),
        }
      );
      await AuthService.login(this.state.email, this.state.password);

      this.props.history.push("/hire/details", this.props.location.state);
      //   this.props.history.push(`/service-details/${this.props.location.state.serviceProviderID}`,
      //       this.props.location.state
      //       );
    } catch (ex) {}
  };

  signUp = async () => {
    try {
      await AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.firstname,
        this.state.lastname,
        "3"
      );
      this.props.history.push("/hire/details", this.props.location.state);
      // this.props.history.push(`/service-details/${this.props.location.state.serviceProviderID}`,
      // this.props.location.state
      // );
    } catch (ex) {}
  };

  returnBtn = () => {
    if (this.state.userExists === true) {
      return (
        <Button
          variant="primary w-100"
          className={`rounded ${this.state.signupLoginBtn}`}
          onClick={this.login}
        >
          Login
        </Button>
      );
    } else if (this.state.userExists === false) {
      return (
        <Button
          variant="primary w-100"
          className={`rounded `}
          onClick={this.signUp}
        >
          SignUp
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary w-100"
          className={`rounded ${this.state.signupLoginBtn}`}
          onClick={this.Continue}
        >
          Continue
        </Button>
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <div>
            <Headerinner />
          </div>
          <div className=" my-3" >
            <Form>
              <Container>
                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <h3
                      style={{ color: "#102043" }}
                      className={`text-center`}
                    >
                      SIGNUP/LOGIN
                    </h3>
                  </Col>

                  <Col md={4}></Col>
                </Row>
                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>
                    <Form.Group className="">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={this.onChangeTextFields}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}></Col>
                </Row>

                {this.state.userExists === false && (
                  <>
                    <Row>
                      <Col md={4}></Col>
                      <Col md={4}>
                        <Form.Group className="">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={this.onChangeTextFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}></Col>
                    </Row>

                    <Row>
                      <Col md={4}></Col>
                      <Col md={4}>
                        <Form.Group className="">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Frist Name"
                            name="firstname"
                            onChange={this.onChangeTextFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}></Col>
                    </Row>

                    <Row>
                      <Col md={4}></Col>
                      <Col md={4}>
                        <Form.Group className="">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            onChange={this.onChangeTextFields}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}></Col>
                    </Row>
                  </>
                )}
                {(this.state.userExists === false ||
                  this.state.userExists === true) && (
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <Form.Group className="">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={this.onChangeTextFields}
                          name="password"
                          value={this.state.password}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}></Col>
                  </Row>
                )}

                {this.state.userExists === false && (
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                      <Form.Group className="">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm"
                          name="confirmPassword"
                          onChange={this.onChangeTextFields}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}></Col>
                  </Row>
                )}

                <Row>
                  <Col md={4}></Col>
                  <Col md={4}>{this.returnBtn()}</Col>

                  <Col md={4}></Col>
                </Row>
              </Container>
            </Form>
          </div>

          <div>
            <Footer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
