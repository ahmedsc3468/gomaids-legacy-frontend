import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import ctaicon from "../../../assets/img/other/tag.png";
import { Modal, Form } from "react-bootstrap";
import { Button, Dimmer, Loader } from "semantic-ui-react";
import axios from "axios";
import swal from "sweetalert";
import config from '../../../config.json'
// import 'react-modal/styles/react-modal.css';
class Cta extends Component {
  constructor(props) {
    let user = AuthService.getCurrentUser();
    super(props);
    this.state = {
      user_role: user ? user.role.name : "notsignin",
      showModal: false,
      email: '',
      csrfToken: ''
    };
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });

  };
  openModal() {
    this.setState({ showModal: true });
  }
  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handleSubmit = () => {
    const response = axios.post(`${config.SERVER_URL}/api/sendRegisterEmail`, {
      email: this.state.email
    }).then(response => {
      // console.log("emailresult", response);
      if (response?.data?.success) {
        swal("Email Sent Successfully", "Please check your email!", "success");
        AuthService.login(this.state.email, response?.data?.password).then(res => {
          if (res === undefined) {
            this.setState({
              loader: false,
              error: "Email or password Invalid"
            });
          } else {
            if (res.data.role.name === "service_taker") {
              this.props.history.replace("/find-a-services");
            } else {
              this.props.history.replace("/Userdashboard");
            }
          }
        });
      }
      this.setState({ email: "" });
      this.setState({ showModal: false });
    })  
    .catch(function (error){
      swal("Failed !", "Please try again", "failed")
    })
    // console.log("emailresult",response);
    // if(response?.data?.success == true){
    //   swal("Email Sent Successfully", "Please check your email !", "success")
    //   AuthService.login(this.state.email, response?.password).then(
    //     (res) => {

    //       if (res === undefined) {

    //         this.setState({
    //           loader: false,
    //           error: "Email or password Invalid"
    //         });
    //       }
    //       else {
    //         if(res.data.role.name=="service_taker"){

    //           this.props.history.replace("/find-a-services");
    //         }else{
    //           this.props.history.replace("/Userdashboard");
    //         }
    //       }
    //     }
    //   );
    // }
    console.log(response)
    this.setState({ email: '' })
    this.setState({ showModal: false });
  }

  render() {
    const isLoggedIn = this.state.user_role;
    return (
      <section className="cta-footer off-cta relative pt-45 pb-45 bg-blue">
        <div className="container">
          <Modal className="modal-center" show={this.state.showModal}>
                <Modal.Header className="justify-content-center">
                  <Modal.Title>Signup Now</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-left py-2">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <Button className="btn-secondary" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                  <Button className="btn-secondary" onClick={this.handleCloseModal}>
                    Close
                  </Button>
                </Modal.Body>
          </Modal>
          <div className="row align-items-center z-5">
            <div className="col-lg-8 text-center text-lg-left">
              <h2 className="white fs-40 f-700 mb-10">
                25% Off for New Customers
              </h2>
              <p className="white mb-0 fs-16">
                SignUp and Grab This Opportunity.
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
              </p>
            </div>
            <div className="col-lg-4  text-center text-lg-right mt-md-15">
              {isLoggedIn === "notsignin" ? (
                <button
                  onClick={this.handleOpenModal}
                  className="btn btn-black shine-btn"
                >
                  Sign Up Now
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-black shine-btn"
                  disabled
                >
                  {" "}
                  Sign Up Now
                </button>
              )}
            </div>
          </div>
        </div>
        <img src={ctaicon} className="cta-cl-bg" alt="" />
      </section>
    );
  }
}

export default Cta;