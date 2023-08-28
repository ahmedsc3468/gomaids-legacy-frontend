
import emergencyicon from '../../assets/img/icons/emergency.png';
import UserAccount from "../sections/userAccount/UserAccount";
import Notification from '../sections/Notification/Content';
import AuthService from "../../services/auth.service";
import logo from '../../assets/img/logo/logo.png';
import chef from '../../assets/img/service/chef.png'
import maid from '../../assets/img/service/maid55.png'
import cook from '../../assets/img/service/1.png'
import NotificationCount from "../sections/Notification/NotificationCount";
import axios from 'axios';
import config from '../../config.json';
import React, { Component } from 'react';
import authHeader from '../../services/auth-header';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {Row,Col} from "react-bootstrap";
import Menu from './Menu';
import '../../assets/MyCSS/home-pages.css';
import '../../assets/css/userAccountProfile.css';
import '../../assets/MyCSS/allorders.css';
import '../../assets/css/notification.css';
import { AlignJustify } from 'react-feather';

class Header extends Component {

  
    constructor(props) {
        
        super(props);
        
        this.state = {
            navmethod: false,
             userDetials : AuthService.getCurrentUser(),
             NotificationsUnread:""
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    
    // Navigation
    toggleNav() {
        this.setState({
            navmethod: !this.state.navmethod
        });
    }

    getNotifications=async ()=>{
        // console.log("getNotifications getNotifications!!!!!!!")
        const user=AuthService.getCurrentUser();
      
        // if(user.role[0]==="service_provider"){
            if(user){
                const {data}= await axios.get(config.SERVER_URL+`/api/notification`,{
                headers:authHeader()
              });
            
             
             
               const temp=data.data.data.filter(x=>x.status===0).length
             
               
               this.setState({NotificationsUnread:temp})
          
            }
            // mosa1122
            
            // }


    }
    // Sticky Header
   async componentDidMount() {
        this._isMounted=true;
        this.getNotifications()
        // console.log("unreadnotification",this.state.NotificationsUnread);
        window.addEventListener('scroll', () => {

            if(this._isMounted){
                this.setState({
                    isTop: window.scrollY > 100
                });
            }
           
        }, false);
        const user=AuthService.getCurrentUser();
        window.Echo.private(`notification_${user && user.id}`).listen("NotificationSent", (
            e) => {
            this.getNotifications()
        })
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    
    render() {
        const stickyheader = this.state.isTop ? 'fixed-nav' : '';
        return (
            <header className={`head-type-1 ${stickyheader}`}>
                <div className="container-fluid">
                    <div className="row align-items-center no-gutters">
                    <div className="col-lg-2">
                            <div className="d-flex align-self-end logo-class">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={logo} alt="" />
                                    </Link>
                                </div>
                                <div
                                    className={classNames("mobile-trigger", {
                                        active: this.state.navmethod,
                                    })}
                                    onClick={this.toggleNav}
                                >
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-3">
                            <div className="d-flex justify-content-center align-items-center">
                                    <a className="serivce-image">
                                        <img src={chef} alt="" />
                                    </a>
                                    <a className="serivce-image">
                                        <img src={maid} alt="" />
                                    </a>
                                
                                    <a className="serivce-image">
                                        <img src={cook} alt="" />
                                    </a>
                                </div>
                        </div> */}
                        <div className="col-lg-10">
                            <div className="d-flex justify-content-center align-items-center">
                                <nav
                                    className={classNames(
                                        "main-menu-1 menu-2",
                                        { active: this.state.navmethod }
                                    )}
                                >
                            <div className="d-flex justify-content-end align-items-center">
                        <Menu />
                        <span className='headerprofile'>
                        {!this.state.userDetials ?
                        <Link to="/login" 
                        className="head-1-book ml-15 mr-30">Login/SignUp
                        </Link>
                        :
                        <UserAccount />
                        }
                        </span>
                        <span className="ml-4 ">
                      
                        {this.state.userDetials && 
                                        <Notification
                                        count={this.state.NotificationsUnread}
                                        getNotificationsCount={this.getNotifications}
                                        className="MuiPaper-elevation8"
                                        />
                     
                        }
                         {this.state.userDetials && 
                                        <NotificationCount
                                        count={this.state.NotificationsUnread}
                                        
                                        />
                     
                         } 
                        
                     </span> 
                     
                                    </div>

                                   
                                    
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;