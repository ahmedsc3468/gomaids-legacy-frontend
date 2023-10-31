import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { Grid } from "semantic-ui-react";
import config from "../../../config.json";
import SaveCard from "../StripePayment/SaveCard";
import UpdateCard from "../StripePayment/UpdateCard";
import { Card, CardBody, Col, Row } from "reactstrap";
import authHeader from "../../../services/auth-header";
import "../../../assets/MyCSS/userdashboard.css";
import CircularProgress from '@mui/material/CircularProgress';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const stripePromise = loadStripe('pk_test_51NiH9YEKvKY3WrKz1TnxITwiI9FQDsGht8IRFjxlwNYRu3N0CMfMBclQ09XxM1rjX1NfgV453L7UFCpervgCEctv00aLdDMpiv');
class PaymentMethod extends Component {
  constructor(props) {
    super(props);

    let user = AuthService.getCurrentUser();

    this.state = {
      user_id: user.id,
      user_payments: [],
      user_payment: null,
      isAddingCard: false,
      error: null,
      showEditPaymentConfigForm: false,
      paymentConfigurationId: 0,
    };

    this.source = axios.CancelToken.source();
  }

  handleAddCard = () => {
    this.setState({ isAddingCard: true });
  };

  handleCardSubmit = async (error, paymentMethod) => {
    if (error) {
      console.error(error);
      this.setState({ error: error.message });
    } else {
      const token = paymentMethod.id;
      // Send the token to your server or perform any necessary actions

      // Example: Display the token in the console
      console.log('Token:', token);

      // Perform any additional logic here, such as saving the token to your database

      // Reset the form and state
      this.setState({ isAddingCard: false, error: null });
    }
  };

  toggleEditForm = (paymentConfigurationId) => {
    this.setState({
      showEditPaymentConfigForm: !(this.state.showEditPaymentConfigForm),
      paymentConfigurationId: paymentConfigurationId
    })
  }

  deletePaymentConfiguration = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover these payment details.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(
            config.SERVER_URL + `/api/payment-configurations/${id}`,
            {
              headers: authHeader(),
              cancelToken: this.source.token
            }
          )
          
          this.setState({
            user_payments: this.state.user_payments.filter((config) => {
              return config.id != id
            })
          })

          swal("Card Details Deleted Successfully!", "Your payment configuration details have been removed.", "success")
        } catch (e) {
          console.log(e)
        }
      }
    });
  }

  loadPaymentConfig = async () => {
    try {
      let paymentDetails = await axios.get(config.SERVER_URL + '/api/getallconfigurations', {
        headers: authHeader(),
        cancelToken: this.source.token
      });

      if (paymentDetails.data.data.length === 0) {
        console.log("no payment methods");
        this.setState({ user_payment: paymentDetails.data.data });
        return;
      }

      this.setState({
        user_payments: paymentDetails.data.data,
        isAddingCard: false,
        error: null,
        user_payment: paymentDetails.data.data
      })
            
    } catch (e) {
      console.log(e);
    }
  }

  async componentDidMount() {
    await this.loadPaymentConfig()
  }

  componentWillUnmount() {
    if (this.source)
      this.source.cancel('Payment Method component was unmounted');
  }

  render() {
    const { user_payments, isAddingCard, error } = this.state;
    let user = AuthService.getCurrentUser();

        return ( 
            <> {this.state.user_payment == null ? <div className="text-center"> <CircularProgress color="success" />
            </div> : <Grid.Column
                className='cust-wallet-container'
            >

                { !(this.state.showEditPaymentConfigForm) && <Row>
                  { this.state.user_payments.length > 0 &&
                    <Col sm='12'>
                        <Card>
                            <CardBody>
                            <Row className="custom_row">
                      <Col className="align-self-center custom_col_pm custom_cd_title">
                        <h6 className="custom_font">Type</h6>
                      </Col>
                      <Col className="align-self-center custom_cardnum custom_col_pm custom_cd_title">
                        <h6 className="custom_font">Card Number</h6>
                      </Col>
                      <Col className="align-self-center custom_col_pm custom_cd_title">
                        <h6 className="custom_font">Expiry Month</h6>
                      </Col>
                      <Col className="align-self-center custom_exp_mn custom_col_pm custom_cd_title">
                        <h6 className="custom_font">Expiry Year</h6>
                      </Col>
                      <Col className="align-self-center custom_col_pm custom_cd_title">
                        <h6 className="cust-pad-status-h6 custom_font">Status</h6>
                      </Col>
                      <Col className="align-self-center custom_col_pm custom_cd_title">
                        <h6 className="cust-pad-status-h6 custom_font"></h6>
                      </Col>
                    </Row>
                            </CardBody>
                        </Card>
                    </Col> }
                    { this.state.user_payments.length < 1 ? 
                   (<div className="custom_empty_div">
                   <Col sm='12'>
                       <Card className="mobilecard" style={{"marginBottom":"15px"}}>
                           <CardBody>
                           <Row>
                          <Col className="align-self-center text-center">
                            <h5 className='pb-3'>You Don't Have Any Saved Card</h5>
                            {isAddingCard ? (
                              <button className="btn btn-blue mt-15 mb-15 btn-lg btn-shine" onClick={this.handleAddCard}>Add Card</button>
                            ) : (
                              <div>
                            <Elements stripe={stripePromise}>
                              <SaveCard onResponse={this.loadPaymentConfig}
                              cost={6}
                              checkOutBtnEnable={false}
                              service_provider_id={"savecard"}
                              email={user.email}
                              
                              />
                            </Elements>
			
                                {error && <div>{error}</div>}
                              </div>
                            )}
                          </Col>
                        </Row>
                           </CardBody>
                       </Card>
                   </Col>
               </div>) : 
                    this.state.user_payments.map((paym, key) => {

                        return (
                        <Col sm='12' key={key}>
                            <Card style={{"marginBottom":"15px"}}>
                                <CardBody>
                                    <Row className="custom_sn">
                                        <Col className="align-self-center custom_cd_title cust_visa">
                                            {paym.card_brand}
                                        </Col>
                                        <Col className="align-self-center cust-pad-card custom_cd_title cust_42_42">
                                            {paym.card_no} 
                                        </Col>
                                        <Col className="align-self-center cust-pad-exp-mn custom_cd_title cust_4_">
                                            {paym.expiry_month}
                                        </Col>
                                        <Col className="align-self-center custom_cd_title">
                                            {paym.expiry_year} 
                                        </Col>
                                        <Col className="align-self-center custom_cd_title">
                                            {paym.default_status==='3' ? "Cancelled":""}
                                            {paym.default_status==='1' ? "In-Use":""}
                                            {paym.default_status==='2' ? "Completed":""}
                                        </Col>
                                        <Col className="align-self-center custom_cd_title">
                                          <FontAwesomeIcon style={{cursor: 'pointer'}} icon={faEdit} onClick={() => this.toggleEditForm(paym.id)} />
                                          <FontAwesomeIcon style={{cursor: 'pointer', marginLeft: '12px'}} icon={faTrash} onClick={() => {this.deletePaymentConfiguration(paym.id)}} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>)
                    })}
                    

                </Row> }

                { this.state.showEditPaymentConfigForm &&                 
                  <Row>
                    <div className="custom_empty_div">
                    <Col sm='12'>
                        <Card className="mobilecard" style={{"marginBottom":"15px"}}>
                            <CardBody>
                            <Row>
                            <Col className="align-self-center text-center">
                              <FontAwesomeIcon style={{cursor: 'pointer'}} className='float-left' icon={faArrowLeft} onClick={this.toggleEditForm} />
                              <h5 className="pb-3">Update Card Details</h5>
                              <div>
                                <Elements stripe={stripePromise}>
                                  <UpdateCard 
                                    onResponse={this.loadPaymentConfig}
                                    paymentConfigurationId={this.state.paymentConfigurationId}
                                  />
                                </Elements>
                              </div>
                              
                            </Col>
                          </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
                  </Row>
                }

            </Grid.Column>}
            </>
        );
    }
}
export default PaymentMethod;