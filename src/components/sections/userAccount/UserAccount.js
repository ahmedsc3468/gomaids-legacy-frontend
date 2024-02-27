import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/auth.service';

import UserImage from './userImage';
import axios from 'axios';
import config from "../../../config.json";
import { useEffect } from 'react';

export default function PopoverPopupState(props) {
  const history = useHistory()
  const userObj=AuthService.getCurrentUser();

 
  return (
    <PopupState variant="popover" popupId="user-popup-popover">
      {(popupState) => (
        <div style={{marginTop: '0.8rem'}}>
          <div  {...bindTrigger(popupState)}>
          <UserImage
          user_image={userObj.user && userObj.user.image ? userObj.user.image: userObj.avatar}
          username={userObj.user && userObj.user.username? userObj.user.username : userObj.username}
          />
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
           <div className="user-profile-menu-container">

        {!props.dontShowDashboard &&<div className='user-account-dashboard-link'>
            <Link to="/Userdashboard">
                <p className='dashboard'>
                  <FontAwesomeIcon icon={faChalkboardUser}
                  className="user-profile-menu"
              
                  />
                  Dashboard
                  </p>

            </Link>

          </div>}


          <div className='user-account-dashboard-link'>

        
          <p className='dashboard'
              onClick={()=>{
                AuthService.logout()
                history.push('/login')
              }}
              >
              <FontAwesomeIcon icon={faRightFromBracket}
                className="user-profile-menu"
              
            
              />
                Logout
          </p>
          
        </div>
        </div>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}