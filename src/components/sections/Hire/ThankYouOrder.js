import * as React from 'react';
import Breadcrumb from '../../layouts/Breadcrumb';
import MetaTags from 'react-meta-tags';
import Header from '../../layouts/Headerinner';
import Footer from '../../layouts/Footer';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './ThankYou.css';

const ThankYouPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData?.data;
  const formatDate = (dateString, locale = 'en-US', options = {}) => {
    if (!dateString) return 'N/A';

    const defaultOptions = {
      weekday: 'short', // e.g., Mon
      month: 'short', // e.g., Mar
      day: 'numeric', // e.g., 30
      year: 'numeric', // e.g., 2024
    };
    console.log('dateString', dateString);
    return new Date(dateString).toLocaleString(locale, {
      ...defaultOptions,
      ...options,
    });
  };
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';

    // Split the time string (e.g., "11:00:00" -> [11, 00, 00])
    const [hours, minutes] = timeString.split(':').map(Number);

    // Convert to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    return `${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };
  return (
    <>
      <div style={{ backgroundColor: '#e2ecea' }}>
        <MetaTags>
          <title> GoMaids | Thankyou</title>
          <meta name='description' content='#' />
        </MetaTags>
        <Header />
        {/* <Breadcrumb breadcrumb={{ pagename: 'Thank you' }} /> */}

        <h2
          className='thank-you-title'
          style={{ marginTop: '4rem', marginBottom: '1rem' }}
        >
          Thank You
        </h2>
        <h2
          className='success-message'
          style={{ marginTop: '1rem', marginBottom: '3rem' }}
        >
          Your Order has been placed Successfully
        </h2>

        <div className='booking-message'>
          <p>
            We have received your order on GoMaids and waiting for the{' '}
            {orderData?.service_provider?.fname}{' '}
            {orderData?.service_provider?.lname} to accept the order. We will
            let you know as soon as the Service Provider has accepted the order.
          </p>
        </div>

        <div className='booking-details'>
          <h3>Your order details are as below:</h3>
          <table>
            <tbody>
              <tr>
                <td>Order Key:</td>
                <td>{orderData?.order_key}</td>
              </tr>
              <tr>
                <td>Booked For Date:</td>
                <td>{formatDate(orderData?.order_date)}</td>
              </tr>
              <tr>
                <td>Start Time:</td>
                <td>{formatTime(orderData?.slot_start_time)}</td>
              </tr>
              <tr>
                <td>End Time:</td>
                <td>{formatTime(orderData?.slot_end_time)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='book-again'>
          <Link to='/' className='book-again-button'>
            Click Here if you would like to book another service!
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ThankYouPage;
