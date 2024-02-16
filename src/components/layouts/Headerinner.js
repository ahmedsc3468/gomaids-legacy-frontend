import NotificationCount from "../sections/Notification/NotificationCount";
import config from "../../config.json";
import UserAccount from "../sections/userAccount/UserAccount";
import Notification from "../sections/Notification/Content";
import AuthService from "../../services/auth.service";
import logo from "../../assets/img/logo/logo.png";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import authHeader from "../../services/auth-header";
import Menu from "./Menu";
import axios from "axios";

class Headerinner extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      navmethod: false,
      userDetials: AuthService.getCurrentUser(),
      NotificationsUnread: "",
      Notifications: [],
      isTop: "",
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  // Navigation
  toggleNav() {
    if (this._isMounted) {
      this.setState({
        navmethod: !this.state.navmethod,
      });
    }
  }

  getNotifications = async () => {
    // console.log("getNotifications getNotifications!!!!!!!")
    const user = AuthService.getCurrentUser();
    // console.log("user::",user);
    // if(user.role[0]==="service_provider"){
    if (user) {
      const fetchNotificationData = axios.get(
        config.SERVER_URL + `/api/notification`,
        {
          headers: authHeader(),
        }
      );

      const { data } = await fetchNotificationData;

      //    console.log('dataaa:',data)

      const temp = data.data.data.filter((x) => x.status === 0).length;
      //    console.log("Noti Count")
      this.setState({ Notifications: data.data.data });
      this.setState({ NotificationsUnread: temp });
    }

    // }
  };

  // window.Echo.private(`new_notificaion.${current_user.id}`).listen("NotificaionSent", (
  //     e) => {
  //     console.log('Listening for new notification')
  //     getNotifications()
  // })

  // Sticky Header

  componentDidMount() {
    this._isMounted = true;
    const user = AuthService.getCurrentUser();
    // this.getNotifications()

    window.addEventListener(
      "scroll",
      () => {
        if (this._isMounted) {
          this.setState({
            isTop: window.scrollY > 100,
          });
        }
      },
      false
    );

    window.Echo.private(`notification_${user && user.id}`).listen(
      "NotificationSent",
      (e) => {
        // console.log('Listening for new notification')
        this.getNotifications();
      }
    );

    // window.Echo.private(`notification_${this.state && this.state.userDetials.id}`).listen("NotificationSent", (
    //     e) => {
    //     console.log('Listening for new notification')
    //     this.getNotifications()
    // })
    // await this.getNotifications();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  readAllMsgs = async () => {
    const { userDetials } = this.state;
    try {
      const { data } = await axios.post(
        config.SERVER_URL + `/api/readnotification/${userDetials.id}/`,
        {
          headers: authHeader(),
        }
      );

      this.setState({ NotificationsUnread: 0 });
    } catch (ex) {}
  };
  render() {
    const stickyheader = this.state.isTop ? "fixed-nav" : "";
    const r = this.props.dontShowPosition ? this.props.dontShowPosition : "";

    // console.log("rr:")
    return (
      // <header
      //   className={`head-type-2 head-type-3 inner-header ${stickyheader} ${r}`}
      // >
      <header className={`head-type-1 ${stickyheader} ${r}`}>
        <div className="container-fluid">
          <div className="row align-items-center no-gutters">
            <div className="col-lg-2">
              <div className="d-flex align-self-stretch logo-class">
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
            <div className="col-lg-10">
              <div className="header-1">
                <nav
                  className={classNames("main-menu-1 menu-2", {
                    active: this.state.navmethod,
                  })}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <Menu />
                    <div className="header-1">
                      <nav
                        className={classNames("menu-2", {
                          active: this.state.navmethod,
                        })}
                      >
                        <div className="d-flex justify-content-end align-items-center ml-15">
                          <span className="headerprofile">
                            {!this.state.userDetials ? (
                              <Link
                                to="/login"
                                className="head-1-book ml-15 mr-30"
                              >
                                Login
                              </Link>
                            ) : (
                              <UserAccount />
                            )}
                          </span>
                          <span className="headerprofile">
                            {!this.state.userDetials ? (
                              <Link to="/signup" className="head-1-book mr-30">
                                SignUp
                              </Link>
                            ) : (
                              <span></span>
                            )}
                          </span>
                          <span className="ml-4 notificationsphone ">
                            {this.state.userDetials && (
                              <Notification
                                Notifications={this.state.Notifications}
                                readAllMsgs={this.readAllMsgs}
                              />
                            )}
                            <div className="hd-inner-notification MuiPaper-elevation8">
                              {this.state.userDetials && (
                                <NotificationCount
                                  count={this.state.NotificationsUnread}
                                />
                              )}
                            </div>
                          </span>
                        </div>
                      </nav>
                    </div>
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

export default Headerinner;
