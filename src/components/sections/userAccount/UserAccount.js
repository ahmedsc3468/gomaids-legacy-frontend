import * as React from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import axios from 'axios';
import config from '../../../config.json';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import OrdersIcon from '@mui/icons-material/ShoppingCart'; // Appropriate icon for "Orders"
import DashboardIcon from '@mui/icons-material/Dashboard'; // Appropriate icon for "Dashboard"
import { deepPurple } from '@mui/material/colors';

export default function PopoverPopupState(props) {
  const history = useHistory();
  const userObj = AuthService.getCurrentUser();
  const { avatar, username, email, fullName } = userObj || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = (path) => {
    handleClose();
    history.push(path); // Navigate to Userdashboard
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ width: 45, height: 45 }}
              src={config.SERVER_URL + '/' + avatar || ''}
            >
              {!avatar && userObj?.fullName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          minWidth: 250, // Increase width directly on Menu component
          '& .MuiPaper-root': {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User info header */}
        <MenuItem
          onClick={handleClose}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingY: 2,
            paddingX: 2,
          }}
        >
          <Box display='flex' alignItems='center'>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              {username ? username[0].toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography variant='body1' fontWeight='bold'>
                {fullName || 'Username'}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {email || 'user@example.com'}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleItemClick('/Userdashboard')}>
          <ListItemIcon>
            <DashboardIcon fontSize='small' />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            AuthService.logout();
            history.push('/login');
          }}
        >
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
