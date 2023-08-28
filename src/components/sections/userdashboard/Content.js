import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import Userprofile from "../userprofile/Content";
import Userservice from "../userservice/Content";
import ChatBox from "../userchatbox/Content";
import Calendly from "./Views";
import AllOrder from "../servicetakerorderdetails/AllOrder";
import Wallet from "../wallet/Content";
import PaymentMethod from "../wallet/paymentMehtod";
import Dispute from "../dispute/Content";
import ViewDispute from "../dispute/ViewDispute";
import ChangePassword from "../ChangePassword/Content";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StripeConfiguration from "./StripeConfiguration";
import "../../../assets/MyCSS/dashboardsetting.css"
import { LogIn } from "react-feather";
import { BrowserRouter, Route,Switch} from 'react-router-dom';
import config from "../../../config.json";

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currenttab:null,
            currentTab:null
        }
    }

    async componentDidMount() {
        const usersession = JSON.parse(localStorage.getItem("user"));

            //  this.setState({currenttab:'userprofile', user: usersession.user, currentTab: "userprofile" });
        
    
        var tabtoshow=localStorage.getItem("currenttab");
        if(tabtoshow===null){
          var  tabtoshow="userprofile";
        }
        if(tabtoshow==="chatbox"){
            this.setState({currenttab:"chatbox", user: usersession.user, currentTab: "chatbox" });
            localStorage.removeItem("currenttab");
 
        }
        if((tabtoshow==="userprofile")){
            this.setState({currenttab:"userprofile", user: usersession.user, currentTab: "userprofile" });
         
        }
        if((tabtoshow==="AllOrder")){
            this.setState({currenttab:"AllOrder", user: usersession.user, currentTab: "AllOrder" });
            localStorage.removeItem("currenttab");
        }
        // console.log(this.state.currentTab);
    
    
    }

    render() {
        let user = AuthService.getCurrentUser();
       
        let tabtodispaly=this.state.currentTab;
        // console.log("from render",tabtodispaly);
            return (
                <>  
                    <Tab.Container id="left-tabs" activeKey={tabtodispaly}> 
                
                        <Row
                            className="padding:10 cust-userdashboard-container"
                            style={{
    
                            }}
                        >
                            <Col sm={2} className="custom_leftposition">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'userprofile' })}>
                                        <Nav.Link eventKey="userprofile">
                                            User Profile
                                        </Nav.Link>
                                    </Nav.Item>
                                    {
                                        user?.role.name === 'service_provider' && (<> <Nav.Item onClick={() => this.setState({ currentTab: 'userservice' })}>
                                            <Nav.Link eventKey="userservice" >
                                                User Service
                                            </Nav.Link>
                                        </Nav.Item>
                                            <Nav.Item onClick={() => this.setState({ currentTab: 'Calendly' })}>
                                                <Nav.Link eventKey="Calendly">
                                                    User Availability
                                                </Nav.Link>
                                            </Nav.Item></>)
                                    }
                                     {user?.role.name === 'service_provider' && (<> <Nav.Item onClick={() => this.setState({ currentTab: 'Stripe' })}>
                                        <Nav.Link eventKey="Stripe">
                                            Payment Configuration
                                        </Nav.Link>
                                    </Nav.Item></>)}
                                    
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'AllOrder' })}>
                                        <Nav.Link eventKey="AllOrder">
                                            My Orders
                                        </Nav.Link>
                                    </Nav.Item>
                                    {user?.role.name === 'service_taker' && (<> <Nav.Item onClick={() => this.setState({ currentTab: 'PaymentMethod' })}>
                                        <Nav.Link eventKey="PaymentMethod">
                                            Payment Methods
                                        </Nav.Link>
                                    </Nav.Item></>)}
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'Wallet' })}>
                                        <Nav.Link eventKey="Wallet">
                                            Wallet
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'Dispute' })}>
                                        <Nav.Link eventKey="Dispute">
                                            Create Dispute
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'ViewDispute' })}>
                                        <Nav.Link eventKey="ViewDispute">
                                            View Dispute
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'chatbox' })}>
                                        <Nav.Link eventKey="chatbox">
                                            Chat
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item onClick={() => this.setState({ currentTab: 'ChangePassword' })}>
                                        <Nav.Link eventKey="ChangePassword">
                                            Change password
                                        </Nav.Link>
                                    </Nav.Item>
    
    
    
    
                                    {/* <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
                                        <Link to="/myChat">
                                            Chat
                                        </Link>
                                    </div> */}
    
                                </Nav>
                            </Col>
                            <Col sm={9} className="custom_tabcontent">
                                <Tab.Content>
                                    <Tab.Pane eventKey="userprofile">
                                        {this.state.currentTab === "userprofile" && <Userprofile user={this.state.user} />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="userservice">
                                        {this.state.currentTab === "userservice" && <Userservice />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Calendly">
                                        {this.state.currentTab === "Calendly" && <Calendly />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="AllOrder">
                                        {this.state.currentTab === "AllOrder" && <AllOrder />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="PaymentMethod">
                                        {this.state.currentTab === "PaymentMethod" && <PaymentMethod />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Wallet">
                                        {this.state.currentTab === "Wallet" && <Wallet />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Dispute">
                                        {this.state.currentTab === "Dispute" && <Dispute />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="ViewDispute">
                                        {this.state.currentTab === "ViewDispute" && <ViewDispute />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Stripe">
                                        {this.state.currentTab === "Stripe" && <StripeConfiguration />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="chatbox">
                                        {this.state.currentTab === "chatbox" && <ChatBox />}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="ChangePassword">
                                        {this.state.currentTab === "ChangePassword" && <ChangePassword />}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                
                </>
            );
        }
        // console.log("user p:",user)
    }

export default UserDetails;
