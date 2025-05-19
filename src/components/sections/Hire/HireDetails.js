'use client';

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Dimmer } from 'semantic-ui-react';
import { MapPin, Calendar, Clock, Check } from 'react-feather';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import moment from 'moment';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Loader from '../Loader/Loader';

// Components
import Header from '../../layouts/Headerinner';
import Footer from '../../layouts/Footer';
import Breadcrumb from '../../layouts/Breadcrumb';
import Address from './AddressAutoComplete';
import Payment from '../StripePayment/StripeContainer';
import Paypal from '../Payment/PayPal';
// Services
import authHeader from '../../../services/auth-header';
import config from '../../../config.json';

// CSS for Airbnb-like styling
const styles = {
  pageContainer: {
    backgroundColor: '#f7f7f7',
    padding: '40px 0',
    minHeight: 'calc(100vh - 200px)',
  },
  checkoutContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    padding: '24px',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#222',
    marginBottom: '15px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  lastRow: {
    borderBottom: 'none',
  },
  infoText: {
    color: '#333',
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    padding: '24px',
    position: 'sticky',
    top: '20px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#222222',
  },
  subSectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#222222',
  },
  formLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#222222',
  },
  formControl: {
    height: '48px',
    borderRadius: '8px',
    border: '1px solid #dddddd',
    padding: '0 16px',
    fontSize: '16px',
    width: '100%',
    marginBottom: '16px',
  },
  formControlError: {
    border: '1px solid #ff385c',
  },
  errorText: {
    color: '#ff385c',
    fontSize: '14px',
    marginTop: '-12px',
    marginBottom: '16px',
  },
  addresserrorText: {
    color: '#ff385c',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '16px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#dddddd',
    margin: '24px 0',
  },
  primaryButton: {
    backgroundColor: '#0b6818',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'transform 0.1s ease',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#222222',
    border: '1px solid #222222',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'transform 0.1s ease',
    marginBottom: '0',
  },
  paypalButton: {
    backgroundColor: '#0070ba',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
    transition: 'transform 0.1s ease',
  },
  infoIcon: {
    marginRight: '12px',
    color: '#717171',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  priceLabel: {
    fontSize: '16px',
    color: '#222222',
  },
  priceValue: {
    fontSize: '16px',
    color: '#222222',
    fontWeight: '500',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #dddddd',
  },
  totalLabel: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#222222',
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#222222',
  },
  successBadge: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    border: '1px solid #28a745',
    display: 'flex',
    alignItems: 'center',
  },
  successIcon: {
    color: '#28a745',
    marginRight: '12px',
  },
  successText: {
    color: '#28a745',
    fontSize: '16px',
    fontWeight: '500',
  },
  paymentOptionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#222222',
    textAlign: 'center',
  },
  paymentButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
};

function HireDetails() {
  const history = useHistory();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Redirect if user is a service provider
  useEffect(() => {
    if (user && user.role && user.role.name === 'service_provider') {
      history.push('/');
    }
  }, []);

  // Calculate time and cost
  const calculateInitialCost = () => {
    let startTime = moment(location.state.slot_start_time, 'hh:mm A').format(
      'H',
    );
    let endTime = moment(location.state.slot_end_time, 'hh:mm A').format('H');

    if (endTime === '0') endTime = '24';
    if (startTime === '0') startTime = '24';

    const diff = Number.parseInt(endTime) - Number.parseInt(startTime);
    return Math.abs(diff) * location.state.servicePrice;
  };

  // State
  const [formData, setFormData] = useState({
    date: location.state.date,
    slot_start_time: location.state.slot_start_time,
    slot_end_time: location.state.slot_end_time,
    service_availed: location.state.serviceAvailed,
    additionalNotes: location.state.additionalNotes,
    costPerHour:
      location.state.currentServiceProvider.user.service_price.price_per_hour,
    costAccumulation: calculateInitialCost(),
    email: user ? user.email : '',
    user: user ? user.username : '',
    sameAsBillingAddress: false,
    billingAddress: '',
    service_address: '',
    city: '',
    state: '',
    country: '',
  });

  // UI state
  const [uiState, setUiState] = useState({
    isPending: false,
    payWithPayNow: false,
    payWithPayPal: false,
    payWithStripe: false,
    getConfigr: false,
    stripePromise: null,
    orderId: null,
    orderPlaced: false,
  });
  const [isLoading, setIsLoader] = useState(false);
  // Validation errors
  const [errors, setErrors] = useState({
    billingAddressError: '',
    cityError: '',
    stateError: '',
    service_addressError: '',
    countryError: '',
  });

  // Handle form field changes
  const onChangeTextFields = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox for same billing address
  const checkBoxCheck = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      sameAsBillingAddress: checked,
      billingAddress: checked ? prev.service_address : '',
    }));
  };

  // Update address fields from Address component
  const updateCity = (value) => {
    setErrors({ ...errors, cityError: '' });
    setFormData((prev) => ({ ...prev, city: value }));
  };

  const updateState = (value) => {
    setErrors({ ...errors, stateError: '' });

    setFormData((prev) => ({ ...prev, state: value }));
  };

  const updateCountry = (value) => {
    setErrors({ ...errors, countryError: '' });
    setFormData((prev) => ({ ...prev, country: value }));
  };
  const updateServiceAddress = (value) => {
    setErrors({ ...errors, service_addressError: '' });

    setFormData((prev) => ({ ...prev, service_address: value }));
  };
  const updateBillingAddress = (value) => {
    setErrors({ ...errors, billingAddressError: '' });

    setFormData((prev) => ({ ...prev, billingAddress: value }));
  };

  // Validate form fields
  const validateFields = () => {
    const newErrors = {
      cityError: formData.city ? '' : 'This field is required',
      stateError: formData.state ? '' : 'This field is required',
      countryError: formData.country ? '' : 'This field is required',
      service_addressError: formData.service_address
        ? ''
        : 'This field is required',
      billingAddressError: formData.billingAddress
        ? ''
        : 'This field is required',
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // Place order first, then proceed to payment
  const placeOrder = async () => {
    if (uiState.isPending) return;

    if (!validateFields()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Parse the order_date string into a Date object
    const dateObject = new Date(formData.date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    const parsedDate = `${year}/${month}/${date}`;

    const orderData = {
      service_taker_id: user.id,
      service_provider_id: location.state.currentServiceProvider.id,
      order_date: parsedDate,
      slot_start_time: formData.slot_start_time,
      slot_end_time: formData.slot_end_time,
      cost: formData.costAccumulation,
      status: '0', // Set to pending until payment is complete
      service_address: formData.service_address,
      billing_address: formData.sameAsBillingAddress
        ? formData.service_address
        : formData.billingAddress,
      state: formData.state,
      country: formData.country,
      city: formData.city,
      service: formData.service_availed,
      per_hour_rate: location.state.servicePrice,
      additionalNotes: formData.additionalNotes,
    };

    try {
      const response = await axios.post(
        config.SERVER_URL + '/api/order',
        orderData,
        {
          headers: authHeader(),
        },
      );

      // Store the order ID for payment processing
      setUiState((prev) => ({
        ...prev,
        isPending: false,
        orderId: response.data.id || response.data.order_id,
        orderPlaced: true,
      }));

      toast.success('Order placed successfully! Please complete payment.');
    } catch (error) {
      setUiState((prev) => ({ ...prev, isPending: false }));
      toast.error('Failed to place order. Please try again.');
    }
  };

  // Complete order after payment
  const completeOrder = async () => {
    if (!uiState.orderId) {
      toast.error('Order ID not found. Please try again.');
      return;
    }

    setUiState((prev) => ({ ...prev, isPending: true }));

    try {
      // Update order status to confirmed (1)
      await axios.put(
        `${config.SERVER_URL}/api/order/${uiState.orderId}`,
        { status: '1' },
        { headers: authHeader() },
      );

      history.replace('/order/thankyou');
    } catch (error) {
      setUiState((prev) => ({ ...prev, isPending: false }));
      toast.error('Failed to complete order. Please contact support.');
    }
  };

  const checkout = async ({ paymentId = '', paymentMethod = 'wallet' }) => {
    // Call the placeOrder function to place the order
    if (!validateFields()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Parse the order_date string into a Date object
    const dateObject = new Date(formData.date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    const parsedDate = `${year}/${month}/${date}`;

    const orderData = {
      service_taker_id: user.id,
      service_provider_id: location.state.currentServiceProvider.id,
      order_date: parsedDate,
      user_id: user?.id,
      email: user?.email,
      slot_start_time: formData.slot_start_time,
      slot_end_time: formData.slot_end_time,
      amount: formData.costAccumulation,
      status: '0', // Set to pending until payment is complete
      service_address: formData.service_address,
      billing_address: formData.sameAsBillingAddress
        ? formData.service_address
        : formData.billingAddress,
      state: formData.state,
      country: formData.country,
      city: formData.city,
      service: formData.service_availed,
      per_hour_rate: location.state.servicePrice,
      additionalNotes: formData.additionalNotes,
      paymentId,
      paymentMethod,
    };

    try {
      setIsLoader(true);
      const response = await axios.post(
        config.SERVER_URL + '/api/checkout',
        orderData,
        {
          headers: authHeader(),
        },
      );
      const orderResponse = response?.data;
      console.log('status response', orderResponse);
      if (orderResponse?.success === true) {
        history.replace('/order/thankyou', { orderData: orderResponse });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsLoader(false);
    }
  };
  // Pay with saved card
  const payWithPayNow = async (e) => {
    e.preventDefault();

    const paymentData = {
      amount: formData.costAccumulation,
      user_id: user.id,
      order_id: uiState.orderId,
    };

    try {
      const payment = await axios.post(
        config.SERVER_URL + '/api/pay',
        paymentData,
        {
          headers: authHeader(),
        },
      );

      if (payment.data.success === true) {
        swal({
          icon: 'success',
          title: 'Payment Successful!',
          text: "Your order will be completed in 5 seconds. If not, please click 'Complete Order'",
          timer: 4000,
        });
        placeOrder();
      } else {
        swal(
          'Payment Unsuccessful',
          'Please use the credit card section for payment as no saved card details were found.',
          'warning',
        );
      }
    } catch (error) {
      swal(
        'Sorry Payment Failed',
        "Your payment couldn't be processed please try again.",
        'danger',
      );
    }
  };

  // Pay with PayPal
  const payWithPayPal = (e) => {
    e.preventDefault();

    setUiState((prev) => ({ ...prev, payWithPayPal: true }));
  };

  // Pay with Stripe
  const payWithStripe = (e) => {
    e.preventDefault();

    // if (!uiState.orderId) {
    //   toast.error('Please place your order first');
    //   return;
    // }

    setUiState((prev) => ({ ...prev, payWithStripe: true }));
  };

  // Handle payment completion callback
  const handlePaymentComplete = () => {
    setTimeout(() => {
      completeOrder();
    }, 5000);
  };

  // Load Stripe on component mount
  useEffect(() => {
    const loadStripeInstance = async () => {
      toast.success(
        "Your service has been booked temporarily will get unbooked If you don't confirm payment within 10 minutes",
      );

      const stripePromise = await loadStripe(config?.STRIPE_PUBLIC_KEY);
      setUiState((prev) => ({ ...prev, stripePromise }));

      try {
        const getConfig = await axios.get(
          config.SERVER_URL + '/api/getconfigurations',
          { headers: authHeader() },
        );

        if (getConfig.data.message === 'Record found ') {
          setUiState((prev) => ({ ...prev, getConfigr: true }));
        }
      } catch (error) {
        // Handle error silently
      }
    };

    loadStripeInstance();
  }, []);

  if (uiState.isPending) {
    return (
      <Dimmer active inverted>
        <Loader size='large' indeterminate>
          Loading
        </Loader>
      </Dimmer>
    );
  }

  // Format date for display
  const formattedDate = moment(formData.date).format('dddd, MMMM D, YYYY');

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb breadcrumb={{ pagename: 'CheckOut' }} />
      <ToastContainer autoClose={10000} />

      <div style={styles.pageContainer}>
        <Container style={styles.checkoutContainer}>
          {/* <h1
            style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '32px',
              color: '#222222',
            }}
          >
            Checkout
          </h1> */}

          <Row>
            {/* Left Column - Form */}
            <Col md={7}>
              {/* User Information Card */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Your Information</h2>

                <div style={styles.infoRow}>
                  <span style={styles.formLabel}>Full Name:</span>
                  <span style={styles.infoText}>{formData.user}</span>
                </div>

                <div style={styles.infoRow}>
                  <span style={styles.formLabel}>Email:</span>
                  <span style={styles.infoText}>{formData.email}</span>
                </div>
              </div>

              {/* Service Address Card */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Service Address</h2>

                <div style={{ marginBottom: '16px' }}>
                  <label style={styles.formLabel}>Service Address</label>
                  <Address
                    placeholder={'Enter Service Address'}
                    name='service_address'
                    value={formData.service_address}
                    updateCity={updateCity}
                    updateState={updateState}
                    updateCountry={updateCountry}
                    updateServiceAddress={updateServiceAddress}
                  />
                  {errors.service_addressError && (
                    <div style={styles.addresserrorText}>
                      {errors.service_addressError}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={styles.formLabel}>Country</label>
                  <input
                    type='text'
                    placeholder='Country'
                    value={formData.country}
                    name='country'
                    onChange={onChangeTextFields}
                    style={{
                      ...styles.formControl,
                      ...(errors.countryError ? styles.formControlError : {}),
                    }}
                  />

                  {errors.countryError && (
                    <div style={styles.errorText}>{errors.countryError}</div>
                  )}
                </div>

                <Row>
                  <Col md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={styles.formLabel}>State</label>
                      <input
                        type='text'
                        placeholder='State'
                        value={formData.state}
                        name='state'
                        onChange={onChangeTextFields}
                        style={{
                          ...styles.formControl,
                          ...(errors.stateError ? styles.formControlError : {}),
                        }}
                      />
                      {errors.stateError && (
                        <div style={styles.errorText}>{errors.stateError}</div>
                      )}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={styles.formLabel}>City</label>
                      <input
                        type='text'
                        placeholder='City'
                        value={formData.city}
                        name='city'
                        onChange={onChangeTextFields}
                        style={{
                          ...styles.formControl,
                          ...(errors.cityError ? styles.formControlError : {}),
                        }}
                      />
                      {errors.cityError && (
                        <div style={styles.errorText}>{errors.cityError}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Billing Address Card */}
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Billing Address</h2>

                <div style={{ marginBottom: '16px' }}>
                  <label style={styles.formLabel}>Billing Address</label>
                  <input
                    type='text'
                    placeholder='Billing Address'
                    value={
                      formData.sameAsBillingAddress
                        ? formData.service_address
                        : formData.billingAddress
                    }
                    name='billingAddress'
                    onChange={onChangeTextFields}
                    style={{
                      ...styles.formControl,
                      ...(errors.billingAddressError
                        ? styles.formControlError
                        : {}),
                    }}
                  />
                  {/* <Address
                    placeholder={'Enter Billing Address'}
                    name='billingAddress'
                    value={
                      formData.sameAsBillingAddress
                        ? formData.billingAddress
                        : formData.service_address
                    }
                    updateServiceAddress={updateBillingAddress}
                    updateCity={() => {}}
                    updateState={() => {}}
                    updateCountry={() => {}}
                  /> */}

                  {errors.billingAddressError && (
                    <div style={styles.addresserrorText}>
                      {errors.billingAddressError}
                    </div>
                  )}

                  <div style={{ marginTop: '8px' }}>
                    <input
                      type='checkbox'
                      id='sameAsBilling'
                      onChange={checkBoxCheck}
                      style={{ marginRight: '8px' }}
                    />
                    <label
                      htmlFor='sameAsBilling'
                      style={{ fontSize: '14px', color: '#222222' }}
                    >
                      Same as service address
                    </label>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              {!uiState.orderPlaced && (
                <>
                  {/* <button
                    onClick={placeOrder}
                    disabled={uiState.isPending}
                    style={styles.primaryButton}
                  >
                    Place Order
                  </button> */}

                  <div style={styles.card}>
                    <h2 style={styles.sectionTitle}>Payment Methods</h2>

                    <div style={styles.paymentButtons}>
                      {/* Saved Card Payment */}
                      {user.customer_id !== null && (
                        <button onClick={checkout} style={styles.primaryButton}>
                          Pay with Saved Card/Wallet
                        </button>
                      )}

                      {/* Credit Card Payment */}
                      <button
                        onClick={payWithStripe}
                        style={styles.secondaryButton}
                      >
                        Pay with Credit Card
                      </button>

                      {/* PayPal Payment */}
                      <button
                        onClick={payWithPayPal}
                        style={styles.paypalButton}
                      >
                        Pay with PayPal
                      </button>
                    </div>

                    {/* Stripe Payment Form */}
                    {uiState.payWithStripe && (
                      <div style={{ marginTop: '24px' }}>
                        <Payment
                          checkOutBtnEnable={handlePaymentComplete}
                          service_provider_id={
                            location.state.currentServiceProvider.id
                          }
                          service_availed={formData.service_availed}
                          cost={formData.costAccumulation}
                          email={formData.email}
                          checkout={checkout}
                        />
                      </div>
                    )}

                    {/* PayPal Payment Form */}
                    {uiState.payWithPayPal && (
                      <div style={{ marginTop: '24px' }}>
                        <Paypal
                          cost={formData.costAccumulation}
                          checkOutBtnEnable={handlePaymentComplete}
                          checkout={checkout}
                        />
                      </div>
                    )}

                    {/* Complete Order Button */}
                    {/* <div style={{ marginTop: '24px' }}>
                      <button
                        onClick={completeOrder}
                        disabled={uiState.isPending}
                        style={{
                          ...styles.primaryButton,
                          backgroundColor: '#28a745',
                        }}
                      >
                        Complete Order
                      </button>
                    </div> */}
                  </div>
                </>
              )}

              {/* Order Success Message */}
              {uiState.orderPlaced && (
                <div style={styles.successBadge}>
                  <Check style={styles.successIcon} size={20} />
                  <div style={styles.successText}>
                    Order #{uiState.orderId} placed successfully! Please
                    complete payment.
                  </div>
                </div>
              )}

              {/* Payment Options */}
              {uiState.orderPlaced && (
                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>Payment Methods</h2>

                  <div style={styles.paymentButtons}>
                    {/* Saved Card Payment */}
                    {user.customer_id !== null && (
                      <button
                        onClick={payWithPayNow}
                        style={styles.primaryButton}
                      >
                        Pay with Saved Card
                      </button>
                    )}

                    {/* Credit Card Payment */}
                    <button
                      onClick={payWithStripe}
                      style={styles.secondaryButton}
                    >
                      Pay with Credit Card
                    </button>

                    {/* PayPal Payment */}
                    <button onClick={payWithPayPal} style={styles.paypalButton}>
                      Pay with PayPal
                    </button>
                  </div>

                  {/* Stripe Payment Form */}
                  {uiState.payWithStripe && (
                    <div style={{ marginTop: '24px' }}>
                      <Payment
                        checkOutBtnEnable={handlePaymentComplete}
                        service_provider_id={
                          location.state.currentServiceProvider.id
                        }
                        service_availed={formData.service_availed}
                        cost={formData.costAccumulation}
                        email={formData.email}
                        order_id={uiState.orderId}
                      />
                    </div>
                  )}

                  {/* PayPal Payment Form */}
                  {uiState.payWithPayPal && (
                    <div style={{ marginTop: '24px' }}>
                      <Paypal
                        cost={formData.costAccumulation}
                        checkOutBtnEnable={handlePaymentComplete}
                        order_id={uiState.orderId}
                      />
                    </div>
                  )}

                  {/* Complete Order Button */}
                  <div style={{ marginTop: '24px' }}>
                    <button
                      onClick={completeOrder}
                      disabled={uiState.isPending}
                      style={{
                        ...styles.primaryButton,
                        backgroundColor: '#28a745',
                      }}
                    >
                      Complete Order
                    </button>
                  </div>
                </div>
              )}
            </Col>

            {/* Right Column - Order Summary */}
            <Col md={5}>
              <div style={styles.summaryCard}>
                <h2 style={styles.sectionTitle}>Order Summary</h2>

                {/* Service Details */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={styles.subSectionTitle}>
                    {formData.service_availed}
                  </h3>

                  <div style={styles.infoRow}>
                    <Calendar style={styles.infoIcon} size={18} />
                    <span style={styles.infoText}>{formattedDate}</span>
                  </div>

                  <div style={styles.infoRow}>
                    <Clock style={styles.infoIcon} size={18} />
                    <span style={styles.infoText}>
                      {formData.slot_start_time} - {formData.slot_end_time}
                    </span>
                  </div>

                  <div style={styles.infoRow}>
                    <MapPin style={styles.infoIcon} size={18} />
                    <span style={styles.infoText}>
                      {formData.service_address
                        ? formData.service_address
                        : 'Address not provided yet'}
                    </span>
                  </div>
                </div>

                <div style={styles.divider}></div>

                {/* Price Breakdown */}
                <div>
                  <h3 style={styles.subSectionTitle}>Price Details</h3>

                  <div style={styles.priceRow}>
                    <span style={styles.priceLabel}>Service Rate</span>
                    <span style={styles.priceValue}>
                      ${location.state.servicePrice}/hr
                    </span>
                  </div>

                  <div style={styles.priceRow}>
                    <span style={styles.priceLabel}>Duration</span>
                    <span style={styles.priceValue}>
                      {moment(formData.slot_end_time, 'hh:mm A').diff(
                        moment(formData.slot_start_time, 'hh:mm A'),
                        'hours',
                      )}{' '}
                      hours
                    </span>
                  </div>

                  <div style={styles.totalRow}>
                    <span style={styles.totalLabel}>Total</span>
                    <span style={styles.totalValue}>
                      ${formData.costAccumulation}
                    </span>
                  </div>
                </div>

                {/* Order Status */}
                {uiState.orderPlaced && (
                  <div style={{ marginTop: '24px' }}>
                    <div style={styles.divider}></div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#28a745',
                          marginRight: '8px',
                        }}
                      ></div>
                      <span style={{ color: '#28a745', fontWeight: '500' }}>
                        Order Placed
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '8px',
                        opacity: '0.5',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#ff385c',
                          marginRight: '8px',
                        }}
                      ></div>
                      <span style={{ fontWeight: '500' }}>Payment Pending</span>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default HireDetails;
