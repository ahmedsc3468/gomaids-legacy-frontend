import axios from "axios";
import configData from "../config.json"
const API_URL = `${configData.SERVER_URL}/api`;

class AuthService {
    
    login(email, password) {
        return axios
            .post(API_URL + "/login", {
                email,
                password
            })
            .then(response => {
                if (response.data.data.accessToken) {
                
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                
                }

                return response.data;
            }).catch(err => {
                console.log(err)
            });
    }
    forgot_pass(email) {
        return axios
            .post(API_URL + "/forgot_pass", {
                email
                
            })
            .then(response => {
                if (response.data.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data.data));
                }

                return response.data;
            }).catch(err => {
                console.log(err)
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, fname, lname, role_id, mobile_no) {

        return axios.post(API_URL + "/register", {
            username,
            email,
            password,
            fname,
            lname,
            role_id,
            mobile_no,
        })
            .then(response => {
                // console.log(response.data.data);
                if (response.data.data !== undefined && response.data.data.accessToken) {
                    const accessToken = response.data.data.accessToken;
                    const config = {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    };

                    const userData = response.data.data;
                    
                    console.log('user data', userData);
                    let url = API_URL + `/role/${role_id}/user/${response.data.data.id}`;
                    console.log("url:",url);
                    console.log('axios: ',axios);
                    axios.post(url,{},config).then(response => {
                        console.log('response: ',response);
                        const newData = {
                            ...userData,
                            ...response.data.data
                        }
                        console.log('new data',newData);
                        localStorage.setItem("user", JSON.stringify(newData));
                    })  
                    .catch(function (error) {
                        console.log('catch_error: ',error);
                    });
                }
                return response;
            });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}
export default new AuthService();