
import AuthService from '../../../services/auth.service';
import React from 'react';
import config from "../../../config.json";
import Avatar from '@mui/material/Avatar';
import authHeader from '../../../services/auth-header';

import axios from 'axios';

const UserImage=({ user_image,username})=>{
  const [userProfileImg,setProfileImg]=React.useState("")
  React.useEffect(async()=>{ const userObj=AuthService.getCurrentUser();

    // console.log("useEffect!!!!!!!! UserAccount")
      const {data} =await axios.get(config.SERVER_URL+`/api/user/${userObj.id}`,
        { headers: authHeader() }
      )
      // console.log("img data:",data.data.image);
      setProfileImg(data.data.image)
      },[])

    return (
        <div className="profile-img-container">
          
         {userProfileImg?
         <span className="img-profile">
         <img
          // src="http://127.0.0.1:8000/images/users/user_placeholder.png" 
         src={config.SERVER_URL+"/"+userProfileImg}
         className="user-profile-img" style={{ObjectFit:"cover"}}
         />
         </span>
         :<Avatar
        />
        }
     
          <div>
                <small
                  className="username cus_usrname"
                >{username}
                </small>  
          </div>

        </div>
      );
    
}

export default UserImage;