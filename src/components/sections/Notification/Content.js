import * as React from 'react';
import {
  IconButton,
  Popover,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  Stack,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material';
import CustomNotificationIcon from './CustomNotificationIcon';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import config from '../../../config.json';
import authService from '../../../services/auth.service';
import { useHistory } from 'react-router-dom';

import './Notification.css';

export default function NotificationPanel() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState([]);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [page, setPage] = React.useState(1); // New page state
  const [loading, setLoading] = React.useState(false); // Track loading state
  const user = authService.getCurrentUser();
  const history = useHistory();

  const getNotifications = async () => {
    if (loading) return; // Prevent multiple fetches at once
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(
        config.SERVER_URL + `/api/notification?page=${page}`,
        {
          headers: authHeader(),
        },
      );
      setNotification((prevNotifications) => {
        const newNotifications = data.data.data.filter(
          (item) => !prevNotifications.some((prev) => prev.id === item.id), // Adjust logic as needed
        );
        const notiList = JSON.stringify([
          ...newNotifications,
          ...prevNotifications,
        ]);
        return JSON.parse(notiList);
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Handle redirections based on notification type (simplified for brevity)
  const redirection_tab = (conversation_id, orderid, not_title) => {
    if (conversation_id != undefined && not_title == 'New Message') {
      console.log(conversation_id);
      localStorage.setItem('order_id', conversation_id);
      localStorage.setItem('currenttab', 'chatbox');
      window.location.href = '/Userdashboard';
    }
    if (not_title == 'order Update' && orderid != undefined) {
      localStorage.setItem('currenttab', 'AllOrder');
      window.location.href = `/order_details_${orderid}`;
    }
    if (not_title == 'Order Recieved') {
      localStorage.setItem('currenttab', 'AllOrder');
      window.location.href = '/Userdashboard';
    } else {
      localStorage.setItem('currenttab', 'AllOrder');
      window.location.href = '/Userdashboard';
    }
  };

  // Toggle popover state
  const handleOpen = (event) => {
    setNotificationCount(0);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const data = { user_id: user && user.id };
    try {
      axios.put(config.SERVER_URL + `/api/readnotification`, data, {
        headers: authHeader(),
      });
      getNotifications();
    } catch (ex) {}
  };

  /**
   * Format Date
   * @param {*} dateStr
   * @returns
   */
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  };

  /**
   * Set background Color by type in notification
   * @param {*} type
   * @returns
   */
  const getBackgroundColor = (type) => {
    switch (type) {
      case 'Order Recieved':
        return '#28a745'; // Green
      case 'New Order':
        return '#007bff'; // Blue
      case 'Accept Order':
        return '#fd7e14'; // Orange
      case 'Order cancelled':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Default color (gray)
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  // Handle scroll event to detect when the user reaches the bottom
  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight <=
      event.target.scrollTop + event.target.clientHeight + 5;
    if (bottom) {
      setPage((prevPage) => prevPage + 1); // Increment page number to load more notifications
    }
  };
  React.useEffect(() => {
    window.Echo.private(`notification_${user && user.id}`).listen(
      'NotificationSent',
      () => {
        setNotificationCount((prevCount) => prevCount + 1);
        getNotifications();
      },
    );
  }, []);

  React.useEffect(() => {
    getNotifications();
  }, [page]);
  return (
    <div>
      {/* Notification Bell Icon */}
      <IconButton onClick={handleOpen} aria-describedby={id}>
        <CustomNotificationIcon notificationCount={notificationCount} />
      </IconButton>

      {/* Popover for Notifications */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px', // Rounded corners for the popover
            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 30px 0px', // Soft shadow for depth
          },
        }}
      >
        <Paper
          sx={{
            maxWidth: '400px',
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #ffffff, #f1f8ff)', // Soft gradient background
          }}
        >
          <div className='notification-header'>
            <Typography variant='h6' gutterBottom sx={{ color: '#1976d2' }}>
              Notifications
            </Typography>
            <Button onClick={handleClose} className='notification-msg-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                fill='currentColor'
                viewBox='0 0 256 256'
              >
                <path d='M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z'></path>
              </svg>
            </Button>
          </div>

          {/* Notification List */}
          {notification?.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='body1'
                sx={{
                  color: '#888',
                  fontWeight: '500',
                }}
              >
                No notifications available.
              </Typography>
            </Box>
          ) : (
            <List
              onScroll={handleScroll}
              sx={{ maxHeight: '350px', overflowY: 'auto' }}
            >
              {notification?.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: '16px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    bgcolor:
                      item?.status === '0'
                        ? 'rgba(173, 216, 230, 0.5)'
                        : 'transparent',
                  }}
                >
                  <Stack
                    direction='row'
                    spacing={1}
                    alignItems='center'
                    sx={{
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      redirection_tab(
                        JSON.parse(item?.data)?.conversation_id,
                        JSON.parse(item?.data)?.order_id,
                        item.title,
                      )
                    }
                  >
                    <Avatar
                      alt={item?.title}
                      sx={{
                        bgcolor: getBackgroundColor(item?.title),
                        color: '#fff', // Optional: text color (white) for contrast
                      }}
                    >
                      {item?.title[0]}
                    </Avatar>
                    <div>
                      <Typography variant='body2'>
                        <Typography variant='subtitle2' component='span'>
                          {item?.title || '--'}
                        </Typography>{' '}
                        {item?.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#667085',
                          fontSize: '12px',
                          fontWeight: '400',
                        }}
                        variant='caption'
                        display='block'
                      >
                        {formatDate(item.created_at) || 'Unknown Date'}
                      </Typography>
                    </div>
                  </Stack>
                  {/* <IconButton
                    color="secondary"
                    size="small"
                    aria-label="Remove"
                    sx={{
                      color: "rgb(50, 56, 62)", // Setting the color here
                    }}
                  >
                    <CloseIcon />
                  </IconButton> */}
                </ListItem>
              ))}
            </List>
          )}
          {/* Loader for loading more notifications */}
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '16px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Popover>
    </div>
  );
}
