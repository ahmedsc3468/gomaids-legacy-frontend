import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { Grid } from "semantic-ui-react";
import config from "../../../config.json";
import SaveCard from "../StripePayment/SaveCard";
import { Card, CardBody, Col, Row } from "reactstrap";
import authHeader from "../../../services/auth-header";
import "../../../assets/MyCSS/userdashboard.css";
import CircularProgress from '@mui/material/CircularProgress';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51N81HLEV0lK1ixr0TxK8VjbgtlaL5oXGKPVLu2aREGH0xmY3AtfapiAqzCU794VqKruVzBBBL9LNFV4DaqKr5rD800woztwUTP');

class CardForm extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements, handleCardSubmit } = this.props;
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    handleCardSubmit(error, paymentMethod);
  };

  render() {
    const { elements, stripe } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button className="btn btn-blue mt-15 mb-15 btn-lg btn-shine" type="submit">Save Card</button>
      </form>
    );
  }
}

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

  async componentDidMount() {
    try {
      let payMenthod = await axios.get(config.SERVER_URL + '/api/getallconfigurations', {
        headers: authHeader(),
        cancelToken: this.source.token
      });

      if (payMenthod.data.data.length === 0) {
        console.log("no payment methods");
        this.setState({ user_payment: payMenthod.data.data });
        return;
      }

      this.setState({
        user_payments: payMenthod.data.data,
        isAddingCard: false,
        error: null,
        user_payment: payMenthod.data.data
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  componentWillUnmount() {
    if (this.source)
      this.source.cancel('Payment Method component was unmounted');
  }

  render() {
    const { user_payments, isAddingCard, error } = this.state;
    let user = AuthService.getCurrentUser();


        // const title = (user.role.name === 'service_taker') ?`Service Provider` : `Service Taker` 
        return ( 
            <> {this.state.user_payment == null ? <div className="text-center"> <CircularProgress color="success" />
            </div> : <Grid.Column
                className='cust-wallet-container'
            >

                <Row>
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
                    </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    {this.state.user_payments.length < 1 ? 
                   <div className="custom_empty_div">
                   <Col sm='12'>
                       <Card className="mobilecard" style={{"marginBottom":"15px"}}>
                           <CardBody>
                           <Row>
                          <Col className="align-self-center text-center">
                            <h5>You Don't Have Any Saved Card</h5>
                            {isAddingCard ? (
                              <button className="btn btn-blue mt-15 mb-15 btn-lg btn-shine" onClick={this.handleAddCard}>Add Card</button>
                            ) : (
                              <div>
                            <Elements stripe={stripePromise}>
			<SaveCard onResponse={this.componentDidMount}
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
               </div> : 
                    this.state.user_payments.map((paym, key) => {

                        let status = ''
                        let color = ''
                        if (paym.status === 0) {
                            status = 'Pending'
                            color = 'info'
                        } else if (paym.status === 1) {
                            status = 'Assigned'
                            color = 'primary'
                        } else if (paym.status === 2) {
                            status = 'Completed'
                            color = 'success'
                        } else if (paym.status === 3) {
                            status = 'Cancelled'
                            color = 'danger'
                        }
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
                                            {/* <Link to={`order_details_${paym.id}`}> (View Order) </Link> */}
                                        </Col>
                                        <Col className="align-self-center cust-pad-exp-mn custom_cd_title cust_4_">
                                            {paym.expiry_month}
                                        </Col>
                                        <Col className="align-self-center custom_cd_title">
                                            {paym.expiry_year} 
                                            {/* <Link to={`order_details_${paym.id}`}> (View Order) </Link> */}
                                        </Col>
                                        {/* <Col className="align-self-center">
                                            {paym.cost}$
                                        </Col> */}
                                        <Col className="align-self-center custom_cd_title">
                                            {paym.default_status==='3' ? "Cancelled":""}
                                            {paym.default_status==='1' ? "In-Use":""}
                                            {paym.default_status==='2' ? "Completed":""}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>)
                    })}
                    

                </Row>

            </Grid.Column>}
            </>
        );
    }
}
export default PaymentMethod;