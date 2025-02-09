import React, { useState, useEffect } from "react";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import AuthHeader from "../../../services/auth-header";
import axios from "axios";
import { Card, CardBody, Col, Row } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Grid,
  Fab,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "../../../assets/MyCSS/home-pages.css";
import "../../../assets/MyCSS/chatUpdateSetting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import "./chat.css";

const useStyles = makeStyles({
  selected: {
    backgroundColor: "#b5d9b6",
    color: "#00000",
    "& .MuiListItemIcon-root": {
      backgroundColor: "#b5d9b6",
      // color: "white"
    },
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    minHeight: "410px",
    borderTop: "2px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
    padding: "10px",
    marginBottom: "10px",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
    // height: '60vh',
    overflowY: "auto",
    maxHeight: "520px",
  },
  messageArea: {
    height: "46vh",
    padding: "8px",
    overflowY: "auto",
    "&::-webkit-scrollbar-track": {
      borderRadius: "10px",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
      backgroundColor: "#F5F5F5",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      webkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, .3)",
      backgroundColor: "#555",
    },
  },

  emptyChat: {
    padding: "20px",
  },
});

export default function Messanger() {
  const classes = useStyles();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [sideBarMessages, setSideBarMessages] = useState([]);
  const [convoRecepient, setConvoRecepient] = useState(null);
  const [singleChatMessages, setSingleChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const user = AuthService.getCurrentUser();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chatIsPending, setChatIsPending] = useState(true);
  const [userChat, setUserChat] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [newMessageConversationId, setNewMessageConversationId] =
    useState(null);
  const [scrollCheck, setScrollCheck] = useState(0);
  const [msgSendingStatus, setmsgSendingStatus] = useState(false);

  const messageRef = useRef(null);

  useEffect(() => {
    getConversations();
    window.Echo.private(`message_${user?.id}`).listen("MessageSent", (e) => {
      getConversations();
      setNewMessageConversationId(e.conversation_id);
    });
  }, []);

  useEffect(() => {
    if (
      newMessageConversationId !== null &&
      newMessageConversationId == singleChatMessages[0]?.conversation_id
    ) {
      getSingleChatMessages(newMessageConversationId);
      seeMessages(newMessageConversationId);
      setScrollCheck(scrollCheck + 1);
    }
    setNewMessageConversationId(null);
  }, [newMessageConversationId]);

  useEffect(async () => {
    console.log(localStorage);
    const { data: lastMessageObj } = await axios.get(
      config.SERVER_URL + `/api/allchats`,
      { headers: AuthHeader() }
    );
    console.log(lastMessageObj);
    if (localStorage.getItem("order_id")) {
      lastMessageObj.data.map((obj) => {
        console.log(obj.id);
        if (obj.id == localStorage.getItem("order_id")) {
          setSelectedIndex(obj?.id);
          getSingleChatMessages(obj?.id);
          setConvoRecepient(
            user.id === obj?.user_one.id ? obj?.user_two : obj?.user_one
          );
          setOrderStatus(obj?.status);
          setConversationId(obj?.id);
        }
      });
    } else {
      setSelectedIndex(lastMessageObj.data[0]?.id);
      getSingleChatMessages(lastMessageObj.data[0]?.id);
      setConvoRecepient(
        user.id === lastMessageObj.data[0]?.user_one.id
          ? lastMessageObj.data[0]?.user_two
          : lastMessageObj.data[0]?.user_one
      );
      setOrderStatus(lastMessageObj.data[0]?.status);
      setConversationId(lastMessageObj.data[0]?.id);
    }
    // seeMessages(lastMessageObj.data[0]?.id);
  }, []);

  const getConversations = async () => {
    const { data: lastMessageObj } = await axios.get(
      config.SERVER_URL + `/api/allchats`,
      { headers: AuthHeader() }
    );
    setSideBarMessages(lastMessageObj.data);

    // console.log(lastMessageObj.data);
    //  console.log(" ::::: LINE 104 ::::: ", lastMessageObj.data)
    if (lastMessageObj.data.length === 0) {
      setUserChat({ userChat: lastMessageObj.data });
      setScrollCheck(scrollCheck + 1);
      //  console.log(" ::::: LINE 107 ::::: ", setUserChat({userChat:lastMessageObj.data}))
    }
  };
  const getSingleChatMessages = async (conversation_id) => {
    const { data: messagesObj } = await axios.get(
      config.SERVER_URL + "/api/singlechat/" + conversation_id,
      { headers: AuthHeader() }
    );
    // if (messagesObj?.data?.length > 0){
    setChatIsPending(false);
    // }
    // console.log('single chat messages ', messagesObj.data)
    setSingleChatMessages(messagesObj.data);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const data = {
        reciever_id: convoRecepient.id,
        conversation_id: conversationId,
        message,
      };

      setmsgSendingStatus(true);
      const response = await axios.post(`${config.SERVER_URL}/api/chat`, data, {
        headers: AuthHeader(),
      });
      if (response.status === 200) {
        await getSingleChatMessages(conversationId);
        setMessage("");
        setmsgSendingStatus(false);
        getConversations();
        setSelectedIndex(conversationId);
        setScrollCheck(scrollCheck + 1);
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      sendMessage();
    }
  };

  const displayLastChatMessage = (message, width) => {
    if (typeof message === "undefined") {
      return null;
    }

    if (message.length >= width) {
      return message.substr(0, width - 3) + "...";
    }

    return message;
  };

  const seeMessages = async (id) => {
    try {
      await axios.put(
        config.SERVER_URL + `/api/v2/chat/see-messages/${id}`,
        {},
        { headers: AuthHeader() }
      );
      getConversations();
      setScrollCheck(scrollCheck + 1);
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   if (messageRef.current) {
  //     messageRef.current.scrollIntoView(
  //       {
  //         behavior: 'smooth',
  //         block: 'end',
  //         inline: 'nearest'
  //       })
  //   }
  // })

  useEffect(() => {
    if (messageRef.current) {
      setTimeout(() => {
        messageRef.current.scrollTop = messageRef.current.scrollHeight;
      }, 100);
    }
  }, [scrollCheck, singleChatMessages]);

  return (
    <div>
      {sideBarMessages.length == null ? (
        <div className="text-center">
          {" "}
          <CircularProgress color="success" />
        </div>
      ) : (
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={`${classes.borderRight500} `}>
            <div className="chat-sb-header">
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              <span className="h5 fw-normal" style={{ marginLeft: "5px" }}>
                Inbox
              </span>
            </div>
            <Divider />
            {/* <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider /> */}
            {sideBarMessages.length < 1 ? (
              <div className="custom_empty_div_chat">
                <Col sm="12">
                  <Card>
                    <CardBody>
                      <Row>
                        <Col className="align-self-center">
                          <p>You Don't Have Any Chat</p>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            ) : (
              <List key={"sideBarMessages"}>
                {sideBarMessages
                  .filter((conversation) => {
                    return conversation.order.status != 0;
                  })
                  .map((conversation, index) => {
                    var chatlen = conversation.chats.length;
                    // get data of conversation recepient
                    const recepient =
                      user.id === conversation.user_one.id
                        ? conversation.user_two
                        : conversation.user_one;

                    return (
                      <React.Fragment key={conversation.id}>
                        <ListItem
                          alignItems="flex-start"
                          button
                          className={
                            selectedIndex === conversation.id
                              ? classes.selected
                              : ""
                          }
                          onClick={(e) => {
                            setSelectedIndex(conversation.id);
                            getSingleChatMessages(conversation.id);
                            setOrderStatus(conversation.order.status);
                            setConversationId(conversation.id);
                            seeMessages(conversation.id);
                            // console.log('order status 2', orderStatus);
                            setConvoRecepient(
                              user.id === conversation.user_one.id
                                ? conversation.user_two
                                : conversation.user_one
                            );
                          }}
                        >
                          <ListItemAvatar className="d-none d-lg-block">
                            <Avatar
                              alt={`recepient_${recepient.id}_image`}
                              src={`${config.SERVER_URL}/${recepient.image}`}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <div className="d-flex justify-content-between">
                                <span>
                                  {recepient.fname} {recepient.lname}
                                </span>
                                <small className="text-muted d-none d-lg-block">{`(${conversation.order.order_key})`}</small>
                              </div>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography
                                  className="d-block d-lg-none d-xl-none d-xxl-none fw-bold text-dark"
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                >
                                  {`(${conversation.order.order_key})`}
                                </Typography>
                                <div className="d-flex  justify-content-between">
                                  <Typography
                                    className=""
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                  >
                                    {displayLastChatMessage(
                                      conversation?.chats[chatlen - 1]?.message,
                                      56
                                    )}
                                  </Typography>
                                  <h6 className="d-inline pr-1">
                                    <span className="badge bg-success text-white rounded-circle">
                                      {conversation?.chats?.filter(
                                        (chat) =>
                                          chat.sender_id != user.id &&
                                          chat.is_seen == 0
                                      ).length || ""}
                                    </span>
                                  </h6>
                                </div>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
              </List>
            )}
          </Grid>
          {!chatIsPending ? (
            <Grid item xs={9}>
              <List
                key="chatMessages"
                id="chatgrid"
                className={classes.messageArea}
                ref={messageRef}
              >
                {singleChatMessages.map((message, index) => {
                  const align =
                    message.sender_user.id === user.id ? "right" : "left ";
                  const _date = new Date(message.created_at);
                  return (
                    <ListItem key={message.id} align={align}>
                      <Grid container>
                        <Grid item xs={12} align={align}>
                          <Avatar
                            alt="User Picture"
                            src={`${config.SERVER_URL}/${message.sender_user.image}`}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            style={{ marginRight: "20px" }}
                            align={align}
                            primary={message.message}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            align={align}
                            secondary={_date.toLocaleString("en-US", {
                              timeZone: userTimezone,
                            })}
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>

              <Divider />

              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    onKeyPress={handleKeyPress}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    label="Type Something"
                    fullWidth
                  />
                  {msgSendingStatus && <p className="msg-status">sending...</p>}
                </Grid>
                <Grid xs={1} align="right" onClick={sendMessage}>
                  <Fab style={{ background: "#036905" }} aria-label="add">
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" inverse />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h5" className={classes.emptyChat}>
              ... Select a Conversation ...
            </Typography>
          )}
        </Grid>
      )}
    </div>
  );
}
