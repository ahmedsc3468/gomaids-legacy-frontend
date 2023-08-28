import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { Grid } from "semantic-ui-react";
import config from "../../../config.json";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap"
import authHeader from "../../../services/auth-header";
import "../../../assets/MyCSS/userdashboard.css"
import CircularProgress from '@mui/material/CircularProgress';

class Wallet extends Component {

    constructor(props) {
        super(props);

        let user = AuthService.getCurrentUser()

        this.state = {
            user_id: user.id,
            user_orders: [],
            user_amount: [],
            user_order: null,
            total_balance: null,
            toatal_balace_taker:null,
            net_income: null,
            pending_amount: null,
            in_progress: null,
        };

        this.source = axios.CancelToken.source()
    }

    async componentDidMount() {

        try {
            let user = AuthService.getCurrentUser();
            // console.log(userSession, user)

            this.setState({ user: user })

            // Getting Order data
            let generalOrder = await axios.get(config.SERVER_URL + '/api/orders_user',
                {
                    headers: authHeader(),
                    cancelToken: this.source.token
                });

            if (generalOrder.data.data.length === 0) {
                console.log("no orders")
                this.setState({user_order: generalOrder.data.data})
                console.log("55",this.setState({user_order: generalOrder.data.data}))
                return;
            }
            // Getting InProgress Status data
            const InProgressArr = generalOrder.data.data.filter(x => x.status === 1)
            const tempTotalProgress = InProgressArr.map(row => parseFloat(row.cost))
                .reduce((prev, current) => prev + current, 0)

            // Getting Complete Status data
            const filterArr = generalOrder.data.data.filter(x => x.status === 4)
            const tempTotalPending = filterArr.map(row => parseFloat(row.cost))
                .reduce((prev, current) => prev + current, 0)

            console.log(generalOrder.data.data)
            console.log(tempTotalPending)


            if (generalOrder.data.data[0].service_provider.user.wallet !== undefined) {
                this.setState({
                    user_orders: generalOrder.data.data,
                    net_income: generalOrder.data.data[0].service_provider.net_income,
                    total_balance: generalOrder.data.data[0].service_provider.user.wallet.balance,
                    toatal_balace_taker:generalOrder.data.data[0].service_taker.user.wallet.balance,
                    pending_amount: tempTotalPending,
                    in_progress: tempTotalProgress,
                    user_order: generalOrder.data.data,

                })
            }
            console.log("::::: 80 :::: ", this.state.user_order)
        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillUnmount() {
        if (this.source)
            this.source.cancel('Wallet component was unmounted')
    }
    render() {

        let user = AuthService.getCurrentUser();

        // const title = (user.role.name === 'service_taker') ?`Service Provider` : `Service Taker` 
        return ( 
            <> {this.state.user_order == null ? <div className="text-center"> <CircularProgress color="success" />
            </div> : <Grid.Column
                className='cust-wallet-container'
            >

                <Row>

                    <Col sm='12'>
                        <Card>
                            <CardHeader>
                                <Row>
                                    {
                                        user.role.name === 'service_provider' && (<>
                                            <Col className="align-self-center">
                                                <h6>Total Income</h6>
                                                <span> {this.state.net_income}$</span>

                                            </Col>

                                            <Col className="align-self-center">
                                                <h6>In Progress</h6>
                                                <span> {this.state.in_progress}$</span>

                                            </Col>

                                            <Col className="align-self-center">
                                                <h6>Pending</h6>
                                                <span>{this.state.pending_amount}$</span>

                                            </Col></>)
                                    }
                                    <Col className="align-self-center cust-wallet-info">
                                        <h6>Balance</h6>
                                        <span>{this.state.toatal_balace_taker}$</span>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                    

                    <Col sm='12'>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col className="align-self-center custom_w_date">
                                        <h6>Date</h6>
                                    </Col>
                                    <Col className="align-self-center custom_w_orderky">
                                        <h6>Order Key</h6>
                                    </Col>
                                    <Col className="align-self-center custom_w_amnt">
                                        <h6>Amount</h6>
                                    </Col>
                                    <Col className="align-self-center">
                                        <h6>Order Status</h6>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    {this.state.user_orders.length < 1 ? 
                    <div className="custom_empty_div">
                        {/* <Row>
                            <Col className="align-self-center">
                            <h5>You Have Not Any Balance</h5>
                            </Col>
                        </Row> */}
                        <Col sm='12'>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col className="align-self-center">
                                        </Col>
                                        <Col className="align-self-center">
                                        <h5>You Don't Have Any Balance</h5>
                                        </Col>
                                        <Col className="align-self-center">
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                    </div> : 
                    this.state.user_orders.map((order, key) => {

                        let status = ''
                        let color = ''
                        if (order.status === 0) {
                            status = 'Pending'
                            color = 'info'
                        } else if (order.status === 1) {
                            status = 'Assigned'
                            color = 'primary'
                        } else if (order.status === 2) {
                            status = 'Completed'
                            color = 'success'
                        } else if (order.status === 3) {
                            status = 'Cancelled'
                            color = 'danger'
                        }
                        return (
                        <Col sm='12' key={key}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col className="align-self-center custom_w_2022">
                                            {order.order_date}
                                        </Col>
                                        <Col className="align-self-center custom_w_2022">
                                            {order.order_key} <Link to={`order_details_${order.id}`}> (View Order) </Link>
                                        </Col>
                                        <Col className="align-self-center custom_w_2022">
                                            {order.cost}$
                                        </Col>
                                        <Col className="align-self-center custom_w_s_c">
                                            {order.status==='3' ? "Cancelled":""}
                                            {order.status==='1' ? "In-process":""}
                                            {order.status==='2' ? "Completed":""}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>)
                    })}
                    

                </Row>

            </Grid.Column>}
            </>
        );
    }
}
export default Wallet;