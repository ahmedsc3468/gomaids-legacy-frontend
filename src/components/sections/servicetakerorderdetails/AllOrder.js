import axios from "axios";
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
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import Rate from "../userdashboard/RateUs";
import CircularProgress from "@mui/material/CircularProgress";
import "../../../assets/MyCSS/allorders.css";
import swal from "sweetalert";

class AllOrder extends Component {
  constructor(props) {
    super(props);

    let user = AuthService.getCurrentUser();

    this.state = {
      user_id: user.id,
      order_slot_start_time: "",
      order_slot_end_time: "",
      order_status: "",
      service_provider_image: "",
      orderStartTimeData: [],
      orderEndTimeData: [],
      orderStatusData: [],
      spImageData: [],
      user_orders: [],
      user_order: null,
    };

    this.source = axios.CancelToken.source();
  }

  statusChange = async (e, id) => {
    let order_status = "";
    if (e == 1) {
      order_status = "accept";
    }
    if (e == 3) {
      order_status = "cancel";
    }
    swal({
      title: "Are you sure?",
      text: `Do you want to ${order_status} the order? You will not be able to revert this action.`,
      icon: "info",
      buttons: {
        confirm: "Yes",
        cancel: "No",
      },
    }).then(async (value) => {
      if (value) {
        try {
          const {
            data: { data },
          } = await axios.put(
            config.SERVER_URL + `/api/changeorderstatus/${id}`,
            { status: e },
            {
              headers: authHeader(),
            }
          );

          const updatedUserOrders = this.state.user_orders.map((order) => {
            if (order.id === data.id) order.status = data.status;
            return order;
          });

          this.setState({ user_orders: updatedUserOrders });

          if (data.status == 1) {
            swal(
              "Order Accepted Successfully!",
              `You have accepted order # ${data.order_key}`,
              "success"
            );
          } else if (data.status == 3) {
            swal(
              "Order Cancelled Successfully!",
              `You have cancelled order # ${data.order_key}`,
              "success"
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  async componentDidMount() {
    try {
      // const userSession = JSON.parse(localStorage.getItem("user"));
      let user = AuthService.getCurrentUser();
      // console.log(userSession, user)

      this.setState({ user: user });
      // const { data } = await axios.get(
      //     config.SERVER_URL + `/api/user/${user.id}`,
      //     {
      //         headers: authHeader(),
      //     }
      // );
      // Getting Order data
      let generalOrder = await axios.get(
        config.SERVER_URL + "/api/orders_user",
        {
          headers: authHeader(),
          cancelToken: this.source.token,
        }
      );
      // console.log("Order Api Data ::::::", generalOrder.data.data)

      if (generalOrder.data.data.length === 0) {
        // console.log("no orders")
        this.setState({ user_order: generalOrder.data.data });
        // console.log("55",this.setState({user_order: generalOrder.data.data}))
        return;
      }

      // let userOrders = [];
      // for( let i=0; i<generalOrder.data.data.length; i++)
      // {
      //     userOrders.push(
      //         {
      //             order_slot_start_time:generalOrder[i].slot_start_time,
      //             order_slot_end_time:generalOrder[i].slot_end_time,
      //             order_status:generalOrder[i].status,
      //             service_provider_image:generalOrder[i].service_provider_image,
      //         }
      //     )
      // }

      this.setState({
        user_orders: generalOrder.data.data,
        user_order: generalOrder.data.data,
      });
      // console.log("orders",this.state.user_orders);
      // this.setState({
      //     order_key: UserDetails.service_takers.orders.order_key,
      //     order_date: UserDetails.service_takers.orders.order_date,
      //     order_slot_start_time: UserDetails.service_takers.orders.slot_start_time,
      //     order_slot_end_time: UserDetails.service_takers.orders.slot_end_time,
      //     order_service_address: UserDetails.service_takers.orders.service_address,
      //     order_billing_address: UserDetails.service_takers.orders.billing_address,
      //     order_status: UserDetails.service_takers.orders.status,
      //     service_provider_name: UserDetails.service_takers.orders.service_provider.user.fname,
      //     service_provider_cost: UserDetails.service_takers.orders.cost,
      //     service_provider_mobile_no: UserDetails.service_takers.orders.service_provider.user.mobile_no,
      //     service_provider_rating: UserDetails.service_takers.orders.service_provider.user.rating,
      // });
    } catch (e) {
      console.log(e.message);
    }
  }

  componentWillUnmount() {
    if (this.source) this.source.cancel("All Orders component was unmounted");
  }

  render() {
    let user = AuthService.getCurrentUser();
    // console.log(":::::: USER :::::::", user)
    // console.log(this.state.user_orders)

    const title =
      user.role.name === "service_taker" ? `Service Provider` : `Service Taker`;

    return (
      <>
        {" "}
        {this.state.user_order == null ? (
          <div id="CustomAllorders" className="text-center">
            {" "}
            <CircularProgress color="success" />{" "}
          </div>
        ) : (
          <Grid.Column
            //     style={{
            //         maxWidth: 950,
            //         paddingTop: 10,
            //         marginLeft: 150,
            //         paddingBottom: 30,
            //     }
            // }
            className="custom_order_ra"
          >
            <Row>
              <Col sm="12" className="custom1_col-sm-12">
                <Card>
                  <CardHeader>
                    <Row>
                      <h6 className="mobileon" style={{ display: "none" }}>
                        All Orders
                      </h6>
                      <Col
                        className="align-self-center text-center mobileonlye"
                        md="3"
                      >
                        <h6>{title}</h6>
                      </Col>
                      <Col className="align-self-center custom_cost mobileonlye">
                        <h6>Cost</h6>
                      </Col>
                      <Col className="align-self-center custom_timefrom mobileonlye">
                        <h6>Date</h6>
                      </Col>
                      <Col className="align-self-center custom_timefrom mobileonlye">
                        <h6>Time (From)</h6>
                      </Col>
                      <Col className="align-self-center mobileonlye">
                        <h6>Time (To)</h6>
                      </Col>

                      <Col className="align-self-center custom_status custom_statustb mobileonlye">
                        <h6>Status</h6>
                      </Col>

                      <Col className="align-self-center mobileonlye">
                        <h6>Actions</h6>
                      </Col>
                      <Col></Col>

                      {/* <Col className="align-self-center">
            <h6>Dispute</h6>
        </Col> */}
                      {/* { user && user.role && user.role.name === 'service_taker'
        &&<Col  className="align-self-center">
        <h6 >Rate</h6>
    </Col>} */}
                    </Row>
                  </CardHeader>
                </Card>
              </Col>

              {this.state.user_orders.length < 1 ? (
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
                            <h5>You Don't Have Any Order</h5>
                          </Col>
                          <Col className="align-self-center"></Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </div>
              ) : (
                this.state.user_orders.map((order, key) => {
                  let status = "";
                  let color = "";
                  const userImage =
                    user && user.role && user.role.name === "service_taker"
                      ? order.service_provider.user.image
                      : order.service_taker.user.image;
                  const fullName =
                    user && user.role && user.role.name === "service_taker"
                      ? `${order.service_provider.user.fname} ${order.service_provider.user.lname}`
                      : `${order.service_taker.user.fname} ${order.service_taker.user.lname}`;

                  if (parseInt(order.status) === 0) {
                    status = "Pending";
                    color = "info";
                  } else if (parseInt(order.status) === 1) {
                    status = "Accepted";
                    color = "primary";
                  } else if (parseInt(order.status) === 2) {
                    status = "Completed";
                    color = "success";
                  } else if (parseInt(order.status) === 3) {
                    status = "Cancelled";
                    color = "danger";
                  } else if (parseInt(order.status) === 5) {
                    status = "Paid";
                    color = "success";
                  }

                  return (
                    <Col sm="12" key={key} style={{ fontSize: "0.926rem" }}>
                      <Card className="mobilecard">
                        <CardBody className="custom_card-body">
                          <Row className="custom_row">
                            <Col className="align-self-center" md="3">
                              <img
                                src={config.SERVER_URL + "/" + userImage}
                                style={{
                                  width: "46px",
                                  height: "46px",
                                  objectFit: "contain",
                                  borderRadius: "50%",
                                }}
                              />
                              <span className="ml-1">{fullName}</span>
                            </Col>

                            <Col className="align-self-center mobileonwly">
                              ${order.cost}
                            </Col>

                            <Col className="align-self-center mobileonwly">
                              {order.order_date}
                            </Col>

                            <Col className="align-self-center mobileonwly">
                              {order.slot_start_time}
                            </Col>
                            <Col className="align-self-center mobileonwly">
                              {order.slot_end_time}
                            </Col>

                            <Col className="align-self-center mobileonwly">
                              <Badge
                                className={`${color} text-light py-1 px-2`}
                              >
                                {status}
                              </Badge>
                            </Col>

                            <Col className="mobilebook">
                              <Button variant="primary" size="tiny">
                                {" "}
                                <Link to={`order_details_${order.id}`}>
                                  {" "}
                                  View Details{" "}
                                </Link>
                              </Button>
                            </Col>
                            {user.role.name === "service_taker" && (
                              <>
                                <Col className="mobilebook">
                                  <Button variant="primary" size="tiny">
                                    <Link
                                      to={`/service-details/${order.service_provider.id}`}
                                    >
                                      Book Again{" "}
                                    </Link>
                                  </Button>
                                </Col>
                              </>
                            )}
                            {/* <Col>
            <Button className="ui button order_SendMessage_button" onClick={() => this.statusChange(1)} > Accepted</Button>
        </Col> */}

                            {user.role.name === "service_provider" && (
                              <>
                                {" "}
                                <Col>
                                  <Dropdown
                                    onSelect={(e) =>
                                      this.statusChange(e, order.id)
                                    }
                                    disabled={order.status != 0}
                                  >
                                    <Dropdown.Toggle
                                      variant="success"
                                      id="dropdown-basic"
                                      size="sm"
                                    >
                                      Status
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        eventKey="1"
                                        disabled={order.status != 0}
                                      >
                                        Accept
                                      </Dropdown.Item>
                                      <Dropdown.Item
                                        eventKey="3"
                                        disabled={order.status != 0}
                                      >
                                        Cancel
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </Col>
                              </>
                            )}

                            {/* <Col>
            <Button variant="primary"> Dispute </Button>
        </Col> */}

                            {/* {user && user.role && user.role.name === 'service_taker' && 
        <Col>
        <Rate/>
        
    </Col>} */}
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          </Grid.Column>
        )}
      </>
    );
  }
}
export default AllOrder;
