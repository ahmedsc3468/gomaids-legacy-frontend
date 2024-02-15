import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Dimmer,
  Loader,
  Label,
} from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";
import swal from "sweetalert";
import Select from "react-select";
import CircularProgress from "@mui/material/CircularProgress";
import { Card, CardBody, CardHeader, Row, Col, Badge } from "reactstrap";

class ViewDispute extends Component {
  // schema = {
  //     username: Joi.string().required().label("User Name"),
  //     order_key: Joi.string().required().label("Order Key"),
  //     title: Joi.string().required().label(" Dispute Title"),
  //     description: Joi.string().required().label("Dispute Description"),
  //     status: Joi.string().required().label("Status"),
  //     image: Joi.string().required().label("image"),
  // };

  constructor(props) {
    super(props);
    let user = AuthService.getCurrentUser();

    this.state = {
      role: user.role[0],
      user_id: user.id,
      username: user.username,
      order_key: [],
      order_key: "",
      title: "",
      description: "",
      status: 0,
      isPending: true,
      user_dispute: null,
    };

    this.source = axios.CancelToken.source();
  }
  validate = () => {
    const { error } = Joi.validate(
      {
        username: this.state.username,
        order_key: this.state.order_key,
        identity: this.state.identity,
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
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

  resetForm = async () => {
    this.setState({
      title: "",
      description: "",
      status: "",
    });
  };
  async componentDidMount() {
    try {
      const userSession = JSON.parse(localStorage.getItem("user"));
      let user = AuthService.getCurrentUser();

      this.setState({ user: user });
      const { data } = await axios.get(
        config.SERVER_URL + `/api/user/${user.id}`,
        {
          headers: authHeader(),
          cancelToken: this.source.token,
        }
      );

      let generalDispute = await axios.get(
        config.SERVER_URL + `/api/getalldisputesofuser/${user.id}`,
        {
          headers: authHeader(),
          cancelToken: this.source.token,
        }
      );
      // console.log("generalDispute Api Data ::::::", generalDispute.data.data.data)

      if (generalDispute.data.data.data.length === 0) {
        console.log("no Dispute");
        this.setState({ user_dispute: generalDispute.data.data.data });
        // console.log("100",this.setState({user_dispute: generalDispute.data.data.data}))
        return;
      }

      this.setState({
        user_dispute: generalDispute.data.data.data,
      });

      // console.log(":::::::: Dispute Page USER data :::::::", data)
      // console.log(":::::::: Dispute Service-Provider :::::::", data.data.service_providers)
      const allOrders = await axios.post(
        config.SERVER_URL + `/api/orders_user/${this.state.user_id}`,
        {
          headers: authHeader(),
        }
      );
      // console.log(":::::::: All Orders According To User Line 93 :::::::", allOrders.data.data.data)

      let ok = [...this.state.order_key];
      for (let i = 0; i < allOrders.data?.data?.data?.length; i++) {
        ok.push({
          label: allOrders.data?.data?.data[i].order_key,
          value: "" + allOrders.data?.data?.data[i].id,
        });
      }
      // console.log(":::::::: All Orders According To User After Map :::::::", ok)

      this.setState({ order_key: ok });

      this.setState({ username: this.state.username });
    } catch (e) {
      console.log(e.message);
    }
  }

  componentWillUnmount() {
    this.source.cancel("Dispute Component is unmounted");
  }

  handleInputChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    this.setState({
      [name]: value,
    });
  };
  onChangeSelectedFields = (e) => {
    const value = e.value;
    const label = e.label;
    this.setState({
      selectedOrderId: e,
    });
  };
  async submit() {
    const tempData = {
      user_id: this.state.user_id,
      order_id: parseInt(this.state.selectedOrderId.value),
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
    };
    // console.log('::::: TempData ::::', tempData)
    try {
      const update = await axios.post(
        config.SERVER_URL + `/api/dispute`,
        tempData,
        {
          headers: authHeader(),
        }
      );
      this.resetForm();
      swal(
        "Successful!",
        "Your Dispute Has Been Sent Successfully!",
        "success"
      );
    } catch (errors) {
      console.log(errors);
    }
  }
  render() {
    let user = AuthService.getCurrentUser();
    const title =
      user.role.name === "service_taker" ? `Service Provider` : `Service Taker`;
    return (
      <>
        {this.state.user_dispute == null ? (
          <div className="text-center">
            {" "}
            <CircularProgress color="success" />{" "}
          </div>
        ) : (
          <Grid.Column
            style={{}}
            className="cust-userdashboard-Viewdispute cus_cust-usr-Viewdispute "
          >
            <Row
              style={{
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <Row>
                      {/* <Col className="align-self-center text-center" md='3'>
                                        <h6>{title}</h6>
                                    </Col> */}
                      <Col className="align-self-center cus_ordkey">
                        <h6>Order Key</h6>
                      </Col>
                      <Col className="align-self-center cus_opnby ">
                        <h6>Opened By</h6>
                      </Col>
                      <Col className="align-self-center cus_opnfor mobileonlye">
                        <h6>Opened For</h6>
                      </Col>
                      <Col className="align-self-center cus_dispute_title mobileonlye">
                        <h6>Dispute Title</h6>
                      </Col>
                      <Col className="align-self-center cus_d_descriptiion mobileonlye">
                        <h6>Dispute Description</h6>
                      </Col>
                      <Col className="align-self-center cus_st">
                        <h6>Status</h6>
                      </Col>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            </Row>

            {this.state.user_dispute.length < 1 ? (
              <div className="custom_empty_div">
                {/* <Row>
                                    <Col className="align-self-center">
                                    <h5>You Have Not Any Order</h5>
                                    </Col>
                                </Row> */}
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col className="align-self-center"></Col>
                        <Col className="align-self-center">
                          <h5>You Don't Have Any Dispute</h5>
                        </Col>
                        <Col className="align-self-center"></Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            ) : (
              this.state.user_dispute.map((dispute, key) => {
                let status = "";
                let color = "";
                // const userImage = (user && user.role && user.role.name === 'service_taker') ? order.service_provider.user.image : order.service_taker.user.image
                const fullName =
                  user && user.role && user.role.name === "service_taker"
                    ? `${dispute.user_for.fname} ${dispute.user_for.lname}`
                    : `${dispute.user_for.fname} ${dispute.user_for.lname}`;

                if (parseInt(dispute.status) === 0) {
                  status = "Pending";
                  color = "info";
                } else if (parseInt(dispute.status) === 1) {
                  status = "Resolve";
                  color = "primary";
                } else if (parseInt(dispute.status) === 2) {
                  status = "Cancelled";
                  color = "danger";
                }

                return (
                  <Col sm="12" key={key}>
                    <Card>
                      <CardBody>
                        <Row>
                          {/*<Col className="align-self-center" md='3'>
                                                    {/* <img src={config.SERVER_URL + "/" + userImage} style={{
                                                        width: "46px",
                                                        height: "46px",
                                                        objectFit: "contain",
                                                        borderRadius: "50%"
                                                    }} />
                                                     <span className="ml-1">
                                                        {fullName}
                                                    </span> 
                                                </Col>
                                            */}
                          <Col className="align-self-center">
                            {dispute.order.order_key}
                          </Col>
                          <Col className="align-self-center ">
                            {dispute.user.fname} {dispute.user.lname}
                          </Col>
                          <Col className="align-self-center mobileonlye">
                            {fullName}
                          </Col>
                          <Col className="align-self-center mobileonlye">
                            {dispute.title}
                          </Col>
                          <Col className="align-self-center mobileonlye">
                            {dispute.description}
                          </Col>

                          {/*<Col className="align-self-center">
                                                    {order.slot_start_time.substring(0, 5)}
                                                </Col>
                                                <Col className="align-self-center">
                                                    {order.slot_end_time.substring(0, 5)}
                                                </Col>*/}

                          <Col className="align-self-center ">
                            <Badge className={`${color} text-light py-1 px-2`}>
                              {status}
                            </Badge>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })
            )}
            <br />
            <br />
            {/* <Form style = {{maxWidth:'50%', marginLeft: '13rem'}}>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.username}
                                    readOnly
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
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Order Key</label>
                                <Select
                                    id='order_key'
                                    name='order_key'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    options={this.state.order_key}
                                onChange={(e) => {
                                    console.log("selected order_id",e)
                                    this.onChangeSelectedFields(e)
                                }}
                                >
                                </Select>
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <Form.Field>
                                <label>Dispute Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.title && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.title}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <Form.Field>
                                <label> Dispute Description</label>

                                <input
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}

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
                            </Form.Field>
                        </div>
                    </div>

                    <button
                        
                    >
                        Submit
                    </button>
                </Form> */}
          </Grid.Column>
        )}
      </>
    );
  }
}
export default ViewDispute;
