import axios from "axios";
import configData from "../config.json";
const API_URL = `${configData.SERVER_URL}/api`;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  forgot_pass(email) {
    return axios
      .post(API_URL + "/forgot_pass", {
        email,
      })
      .then((response) => {
        if (response.data.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, email, password, fname, lname, role_id, mobile_no) {
    const registered_data = await axios.post(API_URL + "/register", {
      username,
      email,
      password,
      fname,
      lname,
      role_id,
      mobile_no,
    });

    if (
      registered_data.data.data !== undefined &&
      registered_data.data.data.accessToken
    ) {
      const accessToken = registered_data.data.data.accessToken;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const userData = registered_data.data.data;
      console.log("user data", userData);
      let url =
        API_URL + `/role/${role_id}/user/${registered_data.data.data.id}`;
      
      const roledata = await axios.post(url, {}, config);

      const newData = {
        ...userData,
        ...roledata.data.data,
      };
      localStorage.setItem("user", JSON.stringify(newData));
      return roledata;
    }else {
      return registered_data;
    }
    // return roledata;
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}
export default new AuthService();
