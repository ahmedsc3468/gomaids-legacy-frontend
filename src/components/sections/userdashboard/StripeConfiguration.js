import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import swal from 'sweetalert';
import authHeader from '../../../services/auth-header';
import AuthService from '../../../services/auth.service';
import config from '../../../config.json';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import StripeConnectButton from '../StripePayment/StripeConnectButton';
import { CssBaseline, Box, Snackbar, Alert, Button } from '@mui/material';

// Create a styled button with Stripe's branding colors
const StripeButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6772e5 30%, #9e89fa 90%)',
  color: 'white',
  padding: '8px 16px',
  boxShadow: '0 3px 5px 2px rgba(103, 114, 229, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #5469d4 30%, #8879e0 90%)',
  },
}));

const StripeConfiguration = () => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [stripeConfig, setStripeConfig] = useState({
    paymentConfigShow: 'stripe',
    stripe_publishable_key: '',
    stripe_secret: '',
    paypal_client_id: '',
    paypal_client_secret: '',
    isPending: true,
  });
  const [isConnected, setIsConnected] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    name: 'Stripe Business Account',
    id: 'acct_1N2j3k4L5m6N7o8P',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  /**
   * used to check stripe connection
   */
  const checkStripeConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        config.SERVER_URL + '/api/stripe/check-connection',
        {
          method: 'GET',
          headers: authHeader(),
        },
      );
      const data = await response.json();
      if (data.connected) {
        if (data?.errors?.length > 0) {
          setHasErrors(true);
          setErrorData(data);
        }

        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
      setAccountInfo(data);

      setLoading(false);
    } catch (error) {
      console.log('Error checking Stripe connection:', error);
    }
  };

  /**
   * used to remove stripe connection
   */
  const handleDisconnect = async () => {
    try {
      const response = await fetch(
        config.SERVER_URL + '/api/stripe/remove-account',
        {
          method: 'POST',
          headers: authHeader(),
        },
      );
      const data = await response.json();

      if (data.success) {
        setSnackbar({
          open: true,
          message: 'Stripe account disconnected successfully',
          severity: 'info',
        });
        setIsConnected(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log('Error removing Stripe account:', error);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let currentUser = AuthService.getCurrentUser();
        setUser(currentUser);

        const [configResponse, userResponse] = await Promise.all([
          axios.get(config.SERVER_URL + `/api/userconfiguration`, {
            headers: authHeader(),
          }),
          axios.get(config.SERVER_URL + `/api/user/${currentUser.id}`, {
            headers: authHeader(),
          }),
        ]);

        const userDetails = userResponse.data.data;
        const userConfig = configResponse.data.data;

        setStripeConfig({
          ...stripeConfig,
          SpecificUser: userDetails,
          stripe_publishable_key: userConfig.stripe_publishable_key,
          stripe_secret: userConfig.stripe_secret,
          paypal_client_id: userConfig.paypal_client_id,
          paypal_client_secret: userConfig.paypal_client_secret,
          isPending: false,
          routing_number: '',
          account_number: '',
          account_type: 'individual',
          fname: userDetails.fname,
          lname: userDetails.lname,
          email: userDetails.email,
          phone: userDetails.mobile_no,
          dob: userDetails.dob,
          addres: userDetails.location.street_address,
          city: userDetails.location.city,
          state: userDetails.location.state,
          country: userDetails.location.country,
          postal_code: userDetails.location.postal_code,
        });
      } catch (error) {
        console.log(error);
      }
    }

    //fetchData();
    checkStripeConnection();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      stripe_publishable_key,
      stripe_secret,
      paypal_client_id,
      paypal_client_secret,
      routing_number,
      account_number,
      account_type,
      fname,
      lname,
      email,
      phone,
      dob,
      addres,
      city,
      state,
      country,
      postal_code,
      paymentConfigShow,
    } = stripeConfig;

    try {
      if (
        paymentConfigShow === 'stripe' &&
        stripe_publishable_key &&
        stripe_secret
      ) {
        await axios.put(
          config.SERVER_URL + '/api/configurepayment',
          { stripe_publishable_key, stripe_secret },
          { headers: authHeader() },
        );
        swal(
          'Successful!',
          'Stripe Configuration Added Successfully!',
          'success',
        );
      } else if (
        paymentConfigShow === 'paypal' &&
        paypal_client_id &&
        paypal_client_secret
      ) {
        await axios.put(
          config.SERVER_URL + '/api/configurepayment',
          { paypal_client_id, paypal_client_secret },
          { headers: authHeader() },
        );
        swal(
          'Successful!',
          'Paypal Configuration Added Successfully!',
          'success',
        );
      } else if (paymentConfigShow === 'bank') {
        const bank = await axios.post(
          config.SERVER_URL + '/api/add-bank',
          {
            routing_number,
            account_number,
            account_type,
            fname,
            lname,
            email,
            phone,
            dob,
            addres,
            city,
            state,
            country,
            postal_code,
          },
          { headers: authHeader() },
        );

        if (bank.data?.success === false) {
          swal('Error!', bank.data.message, 'warning');
        } else {
          swal('Successful!', bank.data?.message, 'success');
        }
      } else {
        swal('Error!', 'Please enter values in the input fields.', 'warning');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setStripeConfig({ ...stripeConfig, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setStripeConfig({ ...stripeConfig, [e.target.name]: e.target.value });
  };

  const handleConnect = async () => {
    try {
      const response = await fetch(config.SERVER_URL + '/api/stripe/account', {
        method: 'POST',
        headers: authHeader(),
      });
      const data = await response.json();
      window.location.href = data.url; // Redirect user to Stripe onboarding
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <CircularProgress color='success' />
        </div>
      ) : (
        <form>
          <Row className='mb-4 cust-payment-container'>
            <Col md={5} style={{ marginTop: '40px' }}>
              <h2 className='text-center cust-payment-h'>
                Payment Configuration
              </h2>
            </Col>
          </Row>

          <Row className='mb-4 cust-stripeconfiguration-container'>
            <Col md={5}>{/* Stripe Configuration */}</Col>
          </Row>

          <Row className='cust-radio-select-container'>
            <Col md={5} style={{ textAlign: 'center' }}>
              {/* Radio buttons for payment methods */}
            </Col>
          </Row>

          {stripeConfig.paymentConfigShow === 'stripe' && (
            <>
              <Row>
                <Col className='d-flex justify-content-center'>
                  <StripeConnectButton
                    isConnected={isConnected}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                    connectedAccountName={accountInfo?.email}
                    connectedAccountId={accountInfo?.id}
                    hasErrors={hasErrors}
                    errorData={errorData}
                  />
                </Col>
              </Row>
            </>
          )}

          {stripeConfig.paymentConfigShow === 'paypal' && (
            <>{/* PayPal inputs */}</>
          )}

          {stripeConfig.paymentConfigShow === 'bank' && (
            <>{/* Bank details inputs */}</>
          )}

          {/* Submit button */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant='filled'
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </form>
      )}
    </>
  );
};

export default StripeConfiguration;
