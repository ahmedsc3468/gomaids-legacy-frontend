import React, { useState, useEffect } from 'react';
import config from "../../../config.json"
import AuthService from "../../../services/auth.service";
import AuthHeader from "../../../services/auth-header";
import axios from 'axios';
import { Card, CardBody, CardHeader, CardFooter, CardTitle, Col, Row, Badge } from "reactstrap"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import swal from "sweetalert";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import CircularProgress  from '@mui/material/CircularProgress';
import "../../../assets/MyCSS/home-pages.css"
import "../../../assets/MyCSS/chatUpdateSetting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import {useRef } from 'react'


const useStyles = makeStyles({

  selected: {
    backgroundColor: "#b5d9b6",
    color: "#00000",
    '& .MuiListItemIcon-root': {
      backgroundColor:"#b5d9b6",
      // color: "white"
    }
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '90vh',
    borderTop: '2px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    padding: '10px'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
    height: '60vh',
    overflowY: 'scroll'
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto',
    '&::-webkit-scrollbar-track': {
      borderRadius: '10px',
      backgroundColor: '#F5F5F5'
    },
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#F5F5F5'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
      backgroundColor: '#555'
    }
  },
  
  emptyChat: {
    padding: '20px'
  },

});

export default function Messanger() {

const dummy = useRef();
  const classes = useStyles();
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [sideBarMessages, setSideBarMessages] = useState([]);
  const [convoRecepient, setConvoRecepient] = useState(null);
  const [singleChatMessages, setSingleChatMessages] = useState([]);
  const [message, setMessage] = useState('')
  const user = AuthService.getCurrentUser()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [chatIsPending, setChatIsPending] = useState(true)
  const [convoIsPending, setConvoIsPending] = useState(true)
  const [userChat, setUserChat] = useState(null)
  const [orderStatus, setOrderStatus] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  useEffect(() => {
    getConversations()
  }, [])

  window.Echo.private(`message_${user && user.id}`).listen("MessageSent", (
    e) => {
   
    // console.log(e)
    getConversations()
// console.log("e.conversation_id ",e.conversation_id );
// console.log("e.singleChatMessages",singleChatMessages[0]?.conversation_id);

    if (e.conversation_id == singleChatMessages[0]?.conversation_id) {
      // console.log('Listening for new chat')
      getSingleChatMessages(e.conversation_id)
    }
    
  })
 

  const getConversations = async () => {
    const { data: lastMessageObj } = await axios.get(config.SERVER_URL + `/api/allchats`, { headers: AuthHeader() })
    setSideBarMessages(lastMessageObj.data)
     console.log(" ::::: LINE 104 ::::: ", lastMessageObj.data)
    if(lastMessageObj.data.length === 0){
      setUserChat({userChat:lastMessageObj.data})
      //  console.log(" ::::: LINE 107 ::::: ", setUserChat({userChat:lastMessageObj.data}))
    }
    // dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  const getSingleChatMessages = async (conversation_id) => {

    const { data: messagesObj } = await axios.get(config.SERVER_URL + '/api/singlechat/' + conversation_id, { headers: AuthHeader() })
    // if (messagesObj?.data?.length > 0){
      setChatIsPending(false)
    // }

    setSingleChatMessages(messagesObj.data);
  }

  const sendMessage = async () => {
    if (message.trim() !== '') {
      const data = {
        reciever_id: convoRecepient.id,
        conversation_id: conversationId,
        message
      }
      console.log('chat recipient id', data.reciever_id);
      console.log('convoId ', conversationId);
      setMessage('');
      const response = await axios.post(`${config.SERVER_URL}/api/chat`, data, { headers: AuthHeader() })
      if (response.status === 200) {
        getSingleChatMessages(conversationId);
        getConversations();
      }
    }
    
    
  }
  const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        console.log('enter press here! ')
      }
    }
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  })
  const messageRef = useRef();
// console.log('single chat',sideBarMessages);
// console.log("userChat",userChat);
// console.log('single chat messages', singleChatMessages);
return (
    <div>
      {sideBarMessages.length == null ? <div className="text-center"> <CircularProgress color="success" /></div> :
    
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List key={user.id}>
              <ListItem button  >
                <ListItemIcon>
                  <Avatar alt="User Picture" src={`${config.SERVER_URL}/${user.avatar}`} />
                  <span className='' style={{"marginLeft":"5px"}}>{user.username}</span>

                </ListItemIcon>
                {/* <ListItemText primary={`${user.username}`}></ListItemText> */}
              </ListItem>
            </List>
            <Divider />
            {/* <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
          </Grid>
          <Divider /> */}
          {sideBarMessages.length < 1 ?
          <div className="custom_empty_div_chat">
          <Col sm='12'>
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
            </div> :
            <List key={'sideBarMessages'}>
              {sideBarMessages.map((conversation, index) => {
                  var chatlen=conversation.chats.length;
                // get data of conversation recepient
                const recepient = user.id === conversation.user_one.id ? conversation.user_two : conversation.user_one
                return (
                  <ListItem button key={conversation.id} className={selectedIndex === index ? classes.selected : ''} onClick={e => {
                    setConvoIsPending(true);
                    setSelectedIndex(index);
                    getSingleChatMessages(conversation.id);
                    setOrderStatus(conversation.order.status);
                    setConversationId(conversation.id);
                    console.log('order status 2', orderStatus);
                    setConvoRecepient(user.id === conversation.user_one.id ? conversation.user_two : conversation.user_one);
                  }}>
                    <ListItemIcon>
                      <Avatar alt={`recepient_${recepient.id}_image`} src={`${config.SERVER_URL}/${recepient.image}`} />
                      {/* <span className='online'>●</span> */}
                      <span className='' style={{"marginLeft":"5px"}}>{recepient.username}
                      <span className='' style={{"display":"block"}}>{conversation?.chats[chatlen-1]?.message}</span>
                      </span>
                    </ListItemIcon>
                    {/* <ListItemText primary={`${recepient.username}`}>{`${recepient.username}`} */}
                    
                    {/* </ListItemText> */}
                    {
                      recepient.status === 1 &&
                      <ListItemText secondary="" align="right"></ListItemText>
                    }
                    
                    <ListItemText className='orderkey'  primary={`(${conversation.order.order_key})`} align="right"></ListItemText>
                   
                  </ListItem>)
              })}

            </List>
            }
          </Grid>
          {!chatIsPending ? <Grid item xs={9} ref={messageRef}>
          <List key='chatMessages' id="chatgrid"className={classes.messageArea}>
              {singleChatMessages.map((message, index) => {
                const align = message.sender_user.id === user.id ? 'right' : 'left ';
              //  setOrderStatus(message.conversation.order.status);
               
                console.log("orderStatus ::217",orderStatus);
                const _date = new Date(message.created_at)
                return (
                  // window.scrollTo(0, 0);
                  <ListItem key={message.id} align={align}>
                    <Grid container>
                      <Grid item xs={12} align={align}>
                        <Avatar alt="User Picture" src={`${config.SERVER_URL}/${message.sender_user.image}`} />
                      </Grid>
                      <Grid item xs={12}>
                      <ListItemText style={{"marginRight":"20px"}} align={align} primary={message.message}></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText align={align} secondary={_date.toLocaleString('en-US', { timeZone: userTimezone })}></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              })}
              <span ref={dummy}></span>
            </List>
            
            <Divider />
         
             <Grid container style={{ padding: '20px' }} hidden={orderStatus != 1} >
              <Grid item xs={11}>
                <TextField id="outlined-basic-email" onKeyPress={handleKeyPress} value={message} onChange={(e) => { setMessage(e.target.value) }} label="Type Something" fullWidth />
              </Grid>
              <Grid xs={1} align="right" onClick={sendMessage}>
                <Fab style={{background: "#036905"}} aria-label="add"><FontAwesomeIcon icon={faPaperPlane} size="lg" inverse /></Fab>
              </Grid>
            </Grid>

          </Grid> : <Typography variant='h5' className={classes.emptyChat}>... Select a Conversation ...</Typography>}
        </Grid>
      
      
        }
    </div >
  );
}
