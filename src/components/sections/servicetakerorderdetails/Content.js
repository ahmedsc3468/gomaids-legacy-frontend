import axios from "axios";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import ChatBox from "../userchatbox/Content";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import userdashboard from "../userdashboard/Content";
import config from "../../../config.json";
import { Alert, Card, CardBody, CardHeader, CardFooter, CardTitle, Col, Row, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { Modal, Form } from "react-bootstrap"
import authHeader from "../../../services/auth-header";
import "../../../assets/css/style.css";
import "../../../assets/css/custom-style.css";
import Rate from "../userdashboard/RateUs";
import swal from "sweetalert";
import { useHistory, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



class ServiceTakerOrderDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            order: null,
            orderStatus: null,
            dropDownOpen: false,
            convoTargeted: null,
            spFeedbackTargeted: null,
            stFeedbackTargeted: null,
            feedbackMessage: '',
            feedbackStatus: null,
            showFeedBack: false,
            show: false,
            message: '',
            messageStatus: null,
            rating: null,
            order_status:null,
            user_orders: [],
            updateStatus: false,
            currentTab:null,
            convochat:[],
            service_taker_feedback:"",
            service_provider_feedback:"",
            total:null,
            loader: false
        };

        this.toggleDropDown = this.toggleDropDown.bind(this)
        this.orderStatusText = this.orderStatusText.bind(this)
        this.handleFeedBackClose = this.handleFeedBackClose.bind(this)
        this.handleFeedBackShow = this.handleFeedBackShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }


    async componentDidMount() {
        const user = AuthService.getCurrentUser()
        const order_id = this.props.match.params.order_id
        //console.log("::::: Order Id:::::", this.props.match.params)
        const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
        {
            headers: authHeader(),
        });
            
           
        this.setState({ order: order.data.data,
             convoTargeted: order.data.data?.conversation,
             convochat:order.data.data?.conversation?.chat,
             order_status:order.data.data.status,
             currentTab: 'userprofile',
             rating: parseInt(order.data.data.rating) ,
            total: parseInt(order.data.data.cost) + parseInt(order.data.data.tipamount || 0)
            })
            
    }
    async handleFeedBackClose() {
        const user = AuthService.getCurrentUser()
        const order_id = this.props.match.params.order_id
        //console.log("::::: Order Id:::::", this.props.match.params)

        const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
            {
                headers: authHeader(),
            });
        this.setState({
            order:order.data.data,
            convochat:order.data.data?.conversation?.chat,
          
            showFeedBack: false,
            feedbackStatus: null
        })
        
        // const order_id = this.props.match.params.order_id
        // const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
        //     {
        //         headers: authHeader(),
        //     });
        // this.setState({ order: order.data.data, convoTargeted: order.data.data.conversation })
        // console.log("::::: 69 :::::", order)
    }
    handleFeedBackShow() {
        this.setState({
            showFeedBack: true
        })
    }
    handleClose() {
        this.setState({
            show: false,
            messageStatus: null
        })
    }
    handleShow() {
        this.setState({
            show: true
        })
    }


    statusChange = async (a) =>  {
        const user = AuthService.getCurrentUser()
        
        if(user.role.name === 'service_provider')
        {
            const status = (a == "2")? "complete" : "cancel"
            const order_id = this.props.match.params.order_id
            const that = this

            swal({
                title: "Are you sure?",
                text: `Do you want to ${status} the order? You will not be able to revert this action.`,
                icon: "warning",
                buttons: [
                  'No, cancel it!',
                  'Yes, I am sure!'
                ],
                dangerMode: true,
              }).then(async function(isConfirm) {
                    if (isConfirm) {
                        that.setState({
                            loader: true
                        })

                        const { data } = await axios.put(config.SERVER_URL + `/api/changeorderstatus/${order_id}`, { status: a, sp_status:a },
                        {
                            headers: authHeader(),
                        });

                        localStorage.setItem("orderstate", "complete");

                        try {
                            const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
                            {
                                headers: authHeader(),
                            })
                        
                            that.setState({ 
                                order: order.data.data,
                                convoTargeted: order.data.data.conversation,
                                convochat: order.data.data.conversation.chat,
                                order_status : order.data.data.status,
                                rating: parseInt(order.data.data.rating),
                                rateshow: true
                            })

                            swal("Order Updated!", "Action successfully completed.", "success")
                        } catch(e) {
                            swal("Something went wrong", "Please try again later.", "warning")
                        }

                        that.setState({
                            loader: false
                        })
                    }
            })            
        } else {
            const order_id = this.props.match.params.order_id

            const { data } = await axios.put(config.SERVER_URL + `/api//${order_id}`, { status: a, st_status:a },
            {
                headers: authHeader(),
            });

            swal("Updated!", "Your Status Has Been Change!", "success")

            const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
            {
                headers: authHeader(),
            });

            this.setState({ 
                order: order.data.data,
                convoTargeted: order.data.data.conversation,
                convochat:order.data.data.conversation.chat,
                order_status:order.data.data.status,
                rating: parseInt(order.data.data.rating) 
            })
        }
    }

    refreshPage () { 
        window.location.reload(); 
      }
    orderStatusText() {
        switch (parseInt(this.state.orderStatus)) {
            case 0: 
                return 'Pending'
            case 1:
                return 'Assigned'
            case 2:
                return 'Completed'
            case 3:
                return 'Cancelled'
            case 5:
                return 'Paid'
            default:
                return false
        }
    }
    toggleDropDown() {

        this.setState({ dropDownOpen: !this.state.dropDownOpen })
    }

    feedbackSentTo = async (event, errors, values) => {
        event.preventDefault()
        console.log("FeedBack Call")

        const user = AuthService.getCurrentUser()
        const order_id = this.props.match.params.order_id
        if (this.state.feedbackMessage.trim() !== '') {

            if (user.role.name === 'service_provider') {
                const data = {
                    service_provider_feedback: this.state.feedbackMessage
                }

                this.setState({
                    feedbackMessage: '',
                    feedbackStatus: { body: 'Your FeedBack is being sent...', color: 'primary' }
                })

                try {
                    console.log("LINE 132", data)

                    const response = await axios.put(config.SERVER_URL + `/api/order/${order_id}`, data, { headers: authHeader() })
                    // console.log(response)
                    this.setState({
                        feedbackStatus: { body: 'FeedBack Sent', color: 'success' }

                    })
                    console.log("LINE 139", response)

                } catch (error) {
                    this.setState({
                        feedbackStatus: { body: 'FeedBack could not be sent', color: 'danger' }
                    })
                }
            }
            else {
                if (user.role.name === 'service_taker') {
                    const data = {
                        service_taker_feedback: this.state.feedbackMessage
                    }

                    this.setState({
                        feedbackMessage: '',
                        feedbackStatus: { body: 'Your FeedBack is being sent...', color: 'primary' }
                    })

                    try {
                        console.log("LINE 160", data)

                        const response = await axios.put(config.SERVER_URL + `/api/order/${order_id}`, data, { headers: authHeader() })

                        this.setState({
                            feedbackStatus: { body: 'FeedBack Sent', color: 'success' }

                        })
                        // console.log("LINE 167", data)

                    } catch (error) {
                        this.setState({
                            feedbackStatus: { body: 'FeedBack could not be sent', color: 'danger' }
                        })
                    }
                }

            }
        }
        const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
            {
                headers: authHeader(),
            });
        this.setState({
            order:order.data.data,
            convochat:order.data.data?.conversation?.chat,
            showFeedBack: false,
            feedbackStatus: null
        })
    }

    sentTo = async (event, errors, values) => {
        event.preventDefault()
        const user = AuthService.getCurrentUser()
        if (this.state.message.trim() !== '') {

            const reciever_id = (user.role.name === 'service_provider') ? this.state.order.service_taker.user_id : this.state.order.service_provider.user_id
            const data = {
                reciever_id,
                message: this.state.message
            }

            this.setState({
                message: '',
                messageStatus: { body: 'Your message is being sent...', color: 'primary' }
            })

            try {

                const response = await axios.post(config.SERVER_URL + `/api/chat`, data, { headers: authHeader() })

                this.setState({ messageStatus: { body: 'Message Sent', color: 'success' },
                convochat:response.data.data,
                convoTargeted: response.data.data.reciever_id })

            } catch (error) {
                this.setState({
                    messageStatus: { body: 'Message could not be sent', color: 'danger' }
                })
            }
        }
       
    }
    render() {
        const user = AuthService.getCurrentUser()
       
        return (
            <>
                {(this.state.loader) &&
                <div style={{position: 'fixed', top: '40%', right: '50%', zIndex: 9999}}> 
                    <div id="CustomAllorders" className="text-center"> <CircularProgress color="success" /> </div>
                </div>}
                {this.state.order === null ? <Dimmer active inverted><Loader size='large' indeterminate>Loading</Loader></Dimmer> :
                    <Row style={{
                        paddingTop: 10,
                        paddingBottom: 30,
                    }}>
                        <Col sm='10' md='8' lg='6' className="mx-auto">
                            <Row>
                                <Col sm='12'>
                                    <Card className="border border-dark">
                                        <CardBody>

                                            <Col sm='12'>
                                                <h5 className="mb-5 text-center">
                                                    <span >Order # </span>
                                                    <span> {this.state.order.order_key}</span>
                                                </h5>

                                            </Col>

                                            <Col className="align-self-center mb-1" sm='12'>
                                                <Row>
                                                    <Col sm='12' md='6'>
                                                        <div className="custom-card-title">Provider</div>
                                                        <img src={config.SERVER_URL + "/" + this.state.order.service_provider.user.image} className="circle-image my-2" />
                                                        <div>{`${this.state.order.service_provider.user.fname} ${this.state.order.service_provider.user.lname}`}</div>
                                                        <div>{this.state.order.service_provider.user.email}</div>

                                                        <div>{this.state.order.service_provider.user.mobile_no}</div>
                                                    </Col>
                                                    <Col sm='12' md='6'>
                                                        <div className="custom-card-title">Customer</div>
                                                        <img src={config.SERVER_URL + "/" + this.state.order.service_taker.user.image} className="circle-image my-2" />
                                                        <div> {`${this.state.order.service_taker.user.fname} ${this.state.order.service_taker.user.lname}`}
                                                            <div>
                                                                {this.state.order.service_taker.user.email}
                                                            </div>
                                                            <div>
                                                                {this.state.order.service_taker.user.mobile_no}</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <hr style={{ borderTop: "2px solid gray" }} />

                                            <Row>
                                                <Col className="align-self-center mb-1" sm='12'>
                                                    <Row>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Date</div>
                                                            <div className="font-weight-light">{this.state.order.order_date}</div>
                                                        </Col>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Start Time</div>
                                                            <div className="font-weight-light">{this.state.order.slot_start_time.substring(0, 5)}</div>
                                                        </Col>
                                                        <Col sm='12' md='4'>
                                                            <div className="">End Time</div>
                                                            <div className="font-weight-light">{this.state.order.slot_end_time.substring(0, 5)}</div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="align-self-center mb-1" sm='12'>
                                                    <Row>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Serivce Name</div>
                                                            <div className="font-weight-light">{this.state.order.selected_service}</div>
                                                        </Col>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Service Address</div>
                                                            <div className="font-weight-light" style={{ maxWidth: '10rem' }}>{this.state.order.service_address}</div>
                                                        </Col>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Billing Address</div>
                                                            <div className="font-weight-light" style={{ maxWidth: '10rem' }}>{this.state.order.billing_address}</div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="align-self-center mb-1" sm='12'>
                                                    <Row>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Taker FeedBack</div>
                                                            <div className="font-weight-light" style={{ maxWidth: '10rem' }}>{this.state.order.service_taker_feedback}</div>
                                                        </Col>
                                                        <Col sm='12' md='4'>
                                                            <div className="">Provider FeedBack</div>
                                                            <div className="font-weight-light" style={{ maxWidth: '10rem' }}>{this.state.order.service_provider_feedback}</div>
                                                        </Col>
                                                        {/* <Col sm='12' md='4'>
                                                            <div className="">Billing Address</div>
                                                            <div className="font-weight-light" style={{ maxWidth: '10rem' }}>{this.state.order.billing_address}</div>
                                                        </Col> */}
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="mt-5">
                                                <Col className="align-self-center mb-1" sm='12'>
                                                    <Row>
                                                        <Col sm='12' md='5' className="ml-auto" >
                                                            <div className="text-secondary">
                                                                <Row>
                                                                    <Col sm='5'>Per Hour Rate</Col>
                                                                    <Col sm='3' className="text-right">{this.state.order.per_hour_rate + "$"}</Col>
                                                                </Row>
                                                                <Row hidden={this.state.order.tipamount == null}>
                                                                    <Col sm='5'>Tip Amount</Col>
                                                                    <Col sm='3' className="text-right">{this.state.order.tipamount + "$"}</Col>
                                                                </Row>
                                                            </div>
                                                            {/* <div className="text-secondary">
                                                                <Row>
                                                                    <Col sm='5'>Booked Hours</Col>
                                                                    <Col sm='3' className="text-right">1</Col>
                                                                </Row>
                                                            </div> */}
                                                            <div className="font-weight-bold text-dark">
                                                                <Row>
                                                                    <Col sm='9'>
                                                                        <hr style={{ borderTop: "2px solid gray" }} className='' />
                                                                    </Col>
                                                                </Row>
                                                            </div>

                                                            <div className="font-weight-bold text-dark">
                                                                <Row>
                                                                    <Col sm='5'>Total</Col>
                                                                    <Col sm='3' className="text-right">{this.state.total  + "$"}</Col>
                                                                </Row>
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                </Col>
                                            </Row>

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="custom-row">
                                <Col md='5'>
                                    {/* <Button className="ui button order_print_button"> <Link className="text-light" to={`order_details_${this.state.order.id}`}> Print </Link></Button> */}
                                    <Button className="ui button order_back_button" onClick={() =>{localStorage.setItem("currenttab", "AllOrder"); this.props.history.goBack() }}>  Back</Button>
                                    {/* {user.role.name === 'service_taker' && (<>
                                    <Button className="ui button order_back_button" hidden={this.state.order.service_taker_feedback!=null || this.state.order.status!=2 }  onClick={this.handleFeedBackShow}> FeedBack</Button>
                                    </>)}
                                    {user.role.name === 'service_provider'&& (<>
                                    <Button className="ui button order_back_button" hidden={this.state.order.service_provider_feedback!=null || this.state.order.status!=2 }  onClick={this.handleFeedBackShow}> FeedBack</Button>
                                    </>)} */}
                                    {this.state.order.status === "2"  && (<>
                                    {user.role.name === 'service_taker' && this.state.order.rating === null &&  (<>
                                            <Rate disabled={this.state.order.rating != "null" }> FeedBack </Rate>
                                    </>)}
                                    </>)}
                                    {this.state.order.status === "2"  && (<>
                                    {user.role.name === 'service_provider' && this.state.order.sp_rating === null &&  (<>
                                            <Rate disabled={this.state.order.sp_rating != "null" }> FeedBack </Rate>
                                    </>)}
                                    </>)}
                                </Col>
                                <Col md='7' className="ml-auto">
                                        
                                    <Button className="ui button order_SendMessage_button" onClick={this.handleShow} hidden={this.state.order.status!="1"}> Send Message</Button>
                                    {/* {user.role.name === 'service_taker' && ( <>
                                     <Button className="ui button order_SendMessage_button" onClick={() => this.statusChange(2)} disabled={this.state.order.st_status =="2" || this.state.order.status =="3"  }> Complete</Button>
                                    <Button className="ui button order_SendMessage_button" onClick={() => this.statusChange(3)} disabled={this.state.order.status =="3" || this.state.order.st_status =="2" || this.state.order.status =="1"}> Cancel</Button>
                                    </>)}  */}
                                    {user.role.name === 'service_provider' && ( <>
                                     <Button className="ui button order_SendMessage_button" onClick={() => this.statusChange(2)} hidden={this.state.order.sp_status == "2" || this.state.order.status != "1"  || this.state.order.status == "5" }> Complete</Button>
                                     <Button className="ui button order_SendMessage_button" onClick={() => this.statusChange(3)} hidden={this.state.order.status =="2" ||this.state.order.sp_status =="2" || this.state.order.status =="3" || this.state.order.status =="5"}> Cancel</Button>
                                    </>)} 
                                    {/* <Dropdown onSelect={(e) => this.statusChange(e, order.id)}>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            Status
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="0">Pending</Dropdown.Item>
                                                            <Dropdown.Item eventKey="1">Assigned</Dropdown.Item>
                                                            <Dropdown.Item eventKey="2">Complete</Dropdown.Item>
                                                            <Dropdown.Item eventKey="3">Cancel</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown> */}

                                    {/* <Dropdown className="d-inline-block " isOpen={this.state.dropDownOpen} toggle={this.toggleDropDown}>
                                        <DropdownToggle className="ui button order_ChangeStatus_button ">Change Order Status</DropdownToggle>
                                        <DropdownMenu onClick={this.statusChange(2)}>
                                            {user.role.name === 'service_provider' && this.state.order.status === 0 && <DropdownItem>Assigned</DropdownItem>}
                                            <DropdownItem>Assigned</DropdownItem>
                                            <DropdownItem >Completed</DropdownItem>
                                            <DropdownItem >Cancelled</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown> */}
                                </Col>
                            </Row>


                        </Col>
                    </Row>}
                <Modal className="modal-center" show={this.state.show}>

                    {this.state.convochat ===undefined  ? <>
                        <Modal.Header>
                            <Modal.Title>Start A Conversation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Type a Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            {this.state.messageStatus && <Alert className='d-inline py-75 px-2 mr-1' color={this.state.messageStatus.color} >{this.state.messageStatus.body}</Alert>}
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.sentTo}>
                                Send
                            </Button>
                        </Modal.Footer>
                    </> : <>
                    
                        <Modal.Header className='justify-content-center'>
                            <Modal.Title>Please Open the Chat Panel</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-right py-2'>
                            {this.state.messageStatus && <Alert className='d-inline py-75 px-2 mr-1' color={this.state.messageStatus.color} >{this.state.messageStatus.body}</Alert>}
                            <Button className="ui button order_SendMessage_button" onClick={e => {
                                
                                localStorage.setItem("currenttab", "chatbox"); this.props.history.push('/userdashboard')}}>
                                Click Here
                            </Button>
                            <Button className="btn-secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Body>

                    </>}
                </Modal>
                <Modal className="modal-center" show={this.state.showFeedBack}>
                    <Modal.Header>
                        <Modal.Title>FeedBack</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea2"
                            >
                                <Form.Label>Write Your FeedBack</Form.Label>
                                <Form.Control as="textarea" rows={3} value={this.state.feedbackMessage} onChange={(e) => { this.setState({ feedbackMessage: e.target.value }) }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.feedbackStatus && <Alert className='d-inline py-75 px-2 mr-1' color={this.state.feedbackStatus.color} >{this.state.feedbackStatus.body}</Alert>}
                        <Button variant="secondary" onClick={this.handleFeedBackClose}>
                            Close
                        </Button>
                        <Button className="ui button send_button" onClick={this.feedbackSentTo}>
                            Send
                        </Button>
                    </Modal.Footer>
                    {/* <Modal.Header className='justify-content-center'>
                            <Modal.Title> Already give FeedBack</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='text-right py-2'>
                            {this.state.feedbackStatus && <Alert className='d-inline py-75 px-2 mr-1' color={this.state.feedbackStatus.color} >{this.state.feedbackStatus.body}</Alert>}
                            <Button className="btn-secondary" onClick={this.handleFeedBackClose}>
                                Close
                            </Button>
                        </Modal.Body> */}
                </Modal>
            </>
        );
    }
}
export default withRouter(ServiceTakerOrderDetails);