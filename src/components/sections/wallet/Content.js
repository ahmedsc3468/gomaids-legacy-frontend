import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import { Grid } from 'semantic-ui-react';
import config from '../../../config.json';
import authHeader from '../../../services/auth-header';
import '../../../assets/MyCSS/userdashboard.css';
import CircularProgress from '@mui/material/CircularProgress';
import ServiceProviderWallet from './ServiceProviderWallet';
import ServiceTakerWallet from './ServiceTakerWallet';
// Custom Avatar component to avoid import errors
const Avatar = ({ color, icon }) => {
  const getColorClass = (colorName) => {
    const colorMap = {
      'light-primary': 'bg-light-primary text-primary',
      'light-success': 'bg-light-success text-success',
      'light-warning': 'bg-light-warning text-warning',
      'light-danger': 'bg-light-danger text-danger',
      'light-info': 'bg-light-info text-info',
    };
    return colorMap[colorName] || 'bg-light-secondary text-secondary';
  };

  return (
    <div className={`avatar ${getColorClass(color)}`}>
      <div className='avatar-content'>{icon}</div>
    </div>
  );
};

const Wallet = () => {
  const [user, setUser] = useState(null);

  const [financeDetails, setFinanceDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const source = axios.CancelToken.source();
  // Fetch current user info and set service provider
  const fetchFinanceDetail = async (userId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${config.SERVER_URL}/api/wallet/stats/${userId}`,
        {
          headers: authHeader(),
          cancelToken: source.token,
        },
      );

      const financeDataTemp = response.data?.data;
      setFinanceDetails(financeDataTemp);
    } catch (error) {
      console.error('Failed to fetch user:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        if (currentUser?.id) {
          fetchFinanceDetail(currentUser.id); // Fetch service provider data
        }
      } catch (e) {
        console.error('Error fetching data:', e.message);
      }
    };

    fetchData();

    return () => {
      source.cancel('Wallet component was unmounted');
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <CircularProgress color='success' />
        </div>
      ) : (
        <Grid.Column className='cust-wallet-container'>
          {user?.role?.name === 'service_provider' && (
            <ServiceProviderWallet financeDetail={financeDetails} />
          )}
          {user?.role?.name === 'service_taker' && (
            <ServiceTakerWallet financeDetail={financeDetails} />
          )}
        </Grid.Column>
      )}
    </>
  );
};

export default Wallet;
