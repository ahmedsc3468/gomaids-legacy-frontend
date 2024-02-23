import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Segment } from "semantic-ui-react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import authHeader from "../../../services/auth-header";
import config from "../../../config.json";
import Popover from "@mui/material/Popover";
import authService from "../../../services/auth.service";
import Button from "@mui/material/Button";
import { Bell } from "react-feather";
import * as React from "react";
import { data } from "jquery";
import { useEffect } from "react";
import { SpaceBarOutlined } from "@material-ui/icons";

export default function PopoverPopupState(props) {
  const [notification, setNotification] = React.useState([]);
  const [notificationstatus, setNotificationstatus] = React.useState(null);

  const user = authService.getCurrentUser();

  const getNotifications = async () => {
    if (user && user.role.name === "service_provider") {
      // console.log(authHeader())
      // console.log(config.SERVER_URL+`/api/notification`)
      const { data } = await axios.get(
        config.SERVER_URL + `/api/notification`,
        {
          headers: authHeader(),
        }
      );
      const mydata = data;
      // console.log("error",mydata)
      if (mydata.data.data.length > 0) {
        localStorage.setItem("mydata", mydata.data.data[0].status);
      }

      setNotification(data.data.data);
      setNotificationstatus(data.data.data[0]?.status);
    } else if (user && user.role.name === "service_taker") {
      // console.log(authHeader())
      // console.log(config.SERVER_URL+`/api/notification`)
      const { data } = await axios.get(
        config.SERVER_URL + `/api/notification`,
        {
          headers: authHeader(),
        }
      );
      const mydata = data;
      if (mydata.data.data.length > 0) {
        localStorage.setItem("mydata", mydata.data.data[0].status);
      }
      setNotification(data.data.data);
      setNotificationstatus(data.data.data[0]?.status);
    }
  };
  React.useEffect(() => {
    getNotifications();

    window.Echo.private(`notification_${user && user.id}`).listen(
      "NotificationSent",
      (e) => {
        //  console.log('Listening for new notification')
        getNotifications();
      }
    );
  }, []);
  const open = async () => {
    console.log(authHeader());
    const data = { user_id: user && user.id };
    localStorage.setItem("mydata", 1);
    localStorage.setItem("currenttab", "AllOrder");
    try {
      await axios.put(config.SERVER_URL + `/api/readnotification`, data, {
        headers: authHeader(),
      });
      await props.getNotificationsCount();
      getNotifications();
      setNotificationstatus(data.data.data[0]?.status);
      // localStorage.setItem("mydata",data.data.data[0]?.status)
      console.log("notifications", getNotifications());
    } catch (ex) {}
  };
  var mydata = localStorage.getItem("mydata");
  // localStorage.removeItem("mydata")
  //var datata=notification[0]?.data;
  var datata = notification[0]?.data;
  useEffect(() => {
    //var datata=notification[0]?.data;;
    // console.log("datata",datata)
    if (datata) {
      var obj = JSON.parse(datata);
      // console.log("datata",obj.order_id)
    }
  }, []);
  //   var obj = JSON.parse(datata);
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className="cus_noty" style={{}}>
          {localStorage.getItem("mydata") === "0" ? (
            <span
              className="counter"
              style={
                {
                  // Ensure the red dot is positioned above the bell icon
                }
              }
            >
              {" "}
            </span>
          ) : (
            <></>
          )}
          <span {...bindTrigger(popupState)} className="notification-bell">
            <Bell onClick={open} />
          </span>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <div className="notification-content">
              <div className="heading-notification-container">
                <strong>
                  <h4 className="heading-notification">Notifications</h4>
                </strong>
              </div>

              <div className="notification-width notification-wrapper">
                {notification.length > 0 &&
                  notification.map((takerNotification) => (
                    <Segment key={takerNotification.id}>
                      <a href="/Userdashboard">
                        <p style={{ color: "#102043", fontWeight: "400" }}>
                          {takerNotification.description}
                        </p>
                      </a>
                    </Segment>
                  ))}
              </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
