import axios from "axios";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import config from "../../../config.json";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Col,
  Row,
  Badge,
} from "reactstrap";
import authHeader from "../../../services/auth-header";

class ServiceTakerOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null,
    };
  }

  async componentDidMount() {
    const order_id = this.props.match.params.order_id;
    //console.log("::::: Order Id:::::", this.props.match.params)

    const order = await axios.get(
      config.SERVER_URL + `/api/order/${order_id}`,
      {
        headers: authHeader(),
      }
    );
    this.setState({ order: order.data.data });
    // console.log("::::: Order :::::", order)
  }

  render() {
    let status = "";
    let color = "";

    if (this.state.order !== null) {
      if (this.state.order.status === 0) {
        status = "Order Pending";
        color = "info";
      } else if (this.state.order.status === 1) {
        status = "Order Assigned";
        color = "primary";
      } else if (this.state.order.status === 2) {
        status = "Order Completed";
        color = "success";
      } else if (this.state.order.status === 3) {
        status = "Order Cancelled";
        color = "danger";
      }
    }

    return (
      <>
        {this.state.order === null ? (
          <Dimmer active inverted>
            <Loader size="large" indeterminate>
              Loading
            </Loader>
          </Dimmer>
        ) : (
          <Row
            style={{
              paddingTop: 10,
              paddingBottom: 30,
            }}
          >
            <Col sm="10" md="8" lg="6" className="mx-auto">
              <Row>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col
                          className="align-self-center pl-3 text-center mt-1 mb-3"
                          sm="12"
                        >
                          <h4>Service Provider Info</h4>
                        </Col>
                        <Col className="align-self-center pl-3" sm="12" md="6">
                          <div>
                            <span className="font-weight-bold">
                              Order Number:{" "}
                            </span>
                            <span>{this.state.order.order_key}</span>
                          </div>
                        </Col>

                        <Col
                          className="align-self-center text-right"
                          sm="12"
                          md="6"
                        >
                          <span
                            className={`font-weight-bold py-1 px-2 border border-${color} text-${color}`}
                          >
                            {status}
                          </span>
                        </Col>
                        <Col className="align-self-center mt-3 mb-2" sm="12">
                          {/* <h6 className="mb-2">Service Provider Info</h6> */}
                        </Col>
                        <Col className="align-self-center text-center" sm="12">
                          <img
                            src={
                              config.SERVER_URL +
                              "/" +
                              this.state.order.service_provider.user.image
                            }
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "contain",
                              borderRadius: "50%",
                            }}
                          />
                        </Col>

                        <Col className="align-self-center mb-1" sm="12">
                          <Row>
                            <Col sm="12" md="4">
                              <div className="">Name</div>
                              <p className="font-weight-light">
                                {" "}
                                {`${this.state.order.service_provider.user.fname} ${this.state.order.service_provider.user.lname}`}
                              </p>
                            </Col>
                            <Col sm="12" md="4">
                              <div className="">Email</div>
                              <p className="font-weight-light">
                                {this.state.order.service_provider.user.email}
                              </p>
                            </Col>
                            <Col sm="12" md="4">
                              <div className="">Mobile Number</div>
                              <p className="font-weight-light">
                                {
                                  this.state.order.service_provider.user
                                    .mobile_no
                                }
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardHeader>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <CardTitle>
                        <h5>Service Provided To</h5>
                      </CardTitle>
                      <Row>
                        <Col className="align-self-center text-center" sm="12">
                          <img
                            src={
                              config.SERVER_URL +
                              "/" +
                              this.state.order.service_taker.user.image
                            }
                            style={{
                              width: "75px",
                              height: "75px",
                              objectFit: "contain",
                              borderRadius: "50%",
                            }}
                          />
                        </Col>
                        <Col
                          className="align-self-center text-center my-2 lead"
                          sm="12"
                        >
                          {`${this.state.order.service_taker.user.fname} ${this.state.order.service_taker.user.lname}`}
                        </Col>

                        <Col className="align-self-center mb-1" sm="12">
                          <h6 className="mb-2">Contact Info</h6>
                          <Row>
                            <Col sm="12" md="6">
                              <div className="">Email</div>
                              <p className="font-weight-light">
                                {this.state.order.service_taker.user.email}
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Mobile Number</div>
                              <p className="font-weight-light">
                                {this.state.order.service_taker.user.mobile_no}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                        <Col className="align-self-center" sm="12">
                          <h6 className="mb-2">Address Info</h6>
                          <Row>
                            <Col sm="12" md="6">
                              <div className="">Service Address</div>
                              <p className="font-weight-light">
                                {this.state.order.service_address}
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Billing Address</div>
                              <p className="font-weight-light">
                                {this.state.order.billing_address}
                              </p>
                            </Col>
                          </Row>
                        </Col>

                        <Col className="align-self-center" sm="12">
                          <h6 className="mb-2">Order Info</h6>
                          <Row>
                            <Col sm="12" md="6">
                              <div className="">Serivce Name</div>
                              <p className="font-weight-light">Cook</p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Total Order Cost</div>
                              <p className="font-weight-light">
                                {this.state.order.cost}$
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Order Cost Per Hour</div>
                              <p className="font-weight-light">
                                {this.state.order.cost}$
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Date</div>
                              <p className="font-weight-light">
                                {this.state.order.order_date}
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">Start Time</div>
                              <p className="font-weight-light">
                                {this.state.order.slot_start_time.substring(
                                  0,
                                  5
                                )}
                              </p>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="">End Time</div>
                              <p className="font-weight-light">
                                {this.state.order.slot_end_time.substring(0, 5)}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                {/* <Col sm='12'>
                                    <Card>
                                        <CardBody>
                                            <CardTitle><h5>Service Provided By</h5></CardTitle>
                                            <Row>
                                                <Col className="align-self-center text-center" sm='12'>
                                                    <img src={config.SERVER_URL + "/" + this.state.order.service_provider.user.image} style={{
                                                        width: "75px",
                                                        height: "75px",
                                                        objectFit: "contain",
                                                        borderRadius: "50%"
                                                    }} />
                                                </Col>
                                                <Col className="align-self-center text-center my-2 lead" sm='12'>
                                                    {`${this.state.order.service_provider.user.fname} ${this.state.order.service_provider.user.lname}`}
                                                </Col>

                                                <Col className="align-self-center mb-1" sm='12'>
                                                    <h6 className="mb-2">Contact Info</h6>
                                                    <Row>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Email</div>
                                                            <p className="font-weight-light">{this.state.order.service_provider.user.email}</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Mobile Number</div>
                                                            <p className="font-weight-light">{this.state.order.service_provider.user.mobile_no}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                                <Col className="align-self-center" sm='12'>
                                                    <h6 className="mb-2" >Order Info</h6>
                                                    <Row>

                                                        <Col sm='12' md='6'>
                                                            <div className="">Serivce Name</div>
                                                            <p className="font-weight-light">Cook</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Total Order Cost</div>
                                                            <p className="font-weight-light">{this.state.order.cost}$</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Order Cost Per Hour</div>
                                                            <p className="font-weight-light">{this.state.order.cost}$</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Date</div>
                                                            <p className="font-weight-light">{this.state.order.order_date}</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">Start Time</div>
                                                            <p className="font-weight-light">{this.state.order.slot_start_time.substring(0, 5)}</p>
                                                        </Col>
                                                        <Col sm='12' md='6'>
                                                            <div className="">End Time</div>
                                                            <p className="font-weight-light">{this.state.order.slot_end_time.substring(0, 5)}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col> */}
              </Row>
              <Button variant="primary">
                {" "}
                <Link to={`order_details_${this.state.order.id}`}> Print </Link>
              </Button>
            </Col>
          </Row>
        )}
      </>
    );
  }
  // <Col sm='10' md='8' lg='6' className="mx-auto">
  //                         <Row>
  //                             <Col sm='12'>
  //                                 <Card>
  //                                     <CardHeader>
  //                                         <Row>
  //                                             <Col className="align-self-center pl-3" sm='12' md='6' >
  //                                                 <div><span className="font-weight-bold">Order Number: </span><span>{this.state.order.order_key}</span></div>
  //                                             </Col>

  //                                             <Col className="align-self-center text-right" sm='12' md='6'>
  //                                                 <span className={`font-weight-bold py-1 px-2 border border-${color} text-${color}`}>{status}</span>
  //                                             </Col>
  //                                         </Row>
  //                                     </CardHeader>
  //                                 </Card>
  //                             </Col>
  //                             <Col sm='12'>
  //                                 <Card>
  //                                     <CardBody>
  //                                         <CardTitle><h5>Customer</h5></CardTitle>
  //                                         <Row>
  //                                             <Col className="align-self-center text-center" sm='12'>
  //                                                 <img src={config.SERVER_URL + "/" + this.state.order.service_taker.user.image} style={{
  //                                                     width: "75px",
  //                                                     height: "75px",
  //                                                     objectFit: "contain",
  //                                                     borderRadius: "50%"
  //                                                 }} />
  //                                             </Col>
  //                                             <Col className="align-self-center text-center my-2 lead" sm='12'>
  //                                                 {`${this.state.order.service_taker.user.fname} ${this.state.order.service_taker.user.lname}`}
  //                                             </Col>

  //                                             <Col className="align-self-center mb-1" sm='12'>
  //                                                 <h6 className="mb-2">Contact Info</h6>
  //                                                 <Row>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Email</div>
  //                                                         <p className="font-weight-light">{this.state.order.service_taker.user.email}</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Mobile Number</div>
  //                                                         <p className="font-weight-light">{this.state.order.service_taker.user.mobile_no}</p>
  //                                                     </Col>
  //                                                 </Row>
  //                                             </Col>
  //                                             <Col className="align-self-center" sm='12'>
  //                                                 <h6 className="mb-2" >Address Info</h6>
  //                                                 <Row>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Service Address</div>
  //                                                         <p className="font-weight-light">{this.state.order.service_address}</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Billing Address</div>
  //                                                         <p className="font-weight-light">{this.state.order.billing_address}</p>
  //                                                     </Col>
  //                                                 </Row>
  //                                             </Col>
  //                                         </Row>
  //                                     </CardBody>
  //                                 </Card>
  //                             </Col>
  //                             <Col sm='12'>
  //                                 <Card>
  //                                     <CardBody>
  //                                         <CardTitle><h5>Provider</h5></CardTitle>
  //                                         <Row>
  //                                             <Col className="align-self-center text-center" sm='12'>
  //                                                 <img src={config.SERVER_URL + "/" + this.state.order.service_provider.user.image} style={{
  //                                                     width: "75px",
  //                                                     height: "75px",
  //                                                     objectFit: "contain",
  //                                                     borderRadius: "50%"
  //                                                 }} />
  //                                             </Col>
  //                                             <Col className="align-self-center text-center my-2 lead" sm='12'>
  //                                                 {`${this.state.order.service_provider.user.fname} ${this.state.order.service_provider.user.lname}`}
  //                                             </Col>

  //                                             <Col className="align-self-center mb-1" sm='12'>
  //                                                 <h6 className="mb-2">Contact Info</h6>
  //                                                 <Row>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Email</div>
  //                                                         <p className="font-weight-light">{this.state.order.service_provider.user.email}</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Mobile Number</div>
  //                                                         <p className="font-weight-light">{this.state.order.service_provider.user.mobile_no}</p>
  //                                                     </Col>
  //                                                 </Row>
  //                                             </Col>

  //                                             <Col className="align-self-center" sm='12'>
  //                                                 <h6 className="mb-2" >Order Info</h6>
  //                                                 <Row>

  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Serivce Name</div>
  //                                                         <p className="font-weight-light">Cook</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Total Order Cost</div>
  //                                                         <p className="font-weight-light">{this.state.order.cost}$</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Order Cost Per Hour</div>
  //                                                         <p className="font-weight-light">{this.state.order.cost}$</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Date</div>
  //                                                         <p className="font-weight-light">{this.state.order.order_date}</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">Start Time</div>
  //                                                         <p className="font-weight-light">{this.state.order.slot_start_time.substring(0, 5)}</p>
  //                                                     </Col>
  //                                                     <Col sm='12' md='6'>
  //                                                         <div className="">End Time</div>
  //                                                         <p className="font-weight-light">{this.state.order.slot_end_time.substring(0, 5)}</p>
  //                                                     </Col>
  //                                                 </Row>
  //                                             </Col>
  //                                         </Row>
  //                                     </CardBody>
  //                                 </Card>
  //                             </Col>
  //                         </Row>
  //                         <Button variant="primary"> <Link to ={`order_details_${this.state.order.id}`}> Print </Link></Button>

  //                     </Col>
}
export default withRouter(ServiceTakerOrderDetails);
