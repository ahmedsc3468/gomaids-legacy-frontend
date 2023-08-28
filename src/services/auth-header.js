export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
//  console.log("auth-header userObject", user)
  if (user && user.accessToken) {
    // console.log("Access Token:: ",user.accessToken)
    return { Authorization: 'Bearer ' + user.accessToken };
  } 
  else {
    return {};
  }
}


