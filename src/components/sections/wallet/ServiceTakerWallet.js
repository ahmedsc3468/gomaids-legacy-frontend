import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';

import Loader from '../Loader/Loader';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Badge,
  Input,
} from 'reactstrap';
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  CreditCard,
} from 'react-feather';

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

const ServiceTakerWallet = (props) => {
  const { financeDetail } = props;
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Add custom CSS styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 42px;
        height: 42px;
      }
      .badge.rounded-pill {
        padding: 0.25rem 0.5rem;
        color:#fff;
      }
      .bg-light-primary {
        background-color: rgba(115, 103, 240, 0.12) !important;
      }
      .bg-light-success {
        background-color: rgba(40, 199, 111, 0.12) !important;
      }
      .bg-light-warning {
        background-color: rgba(255, 159, 67, 0.12) !important;
      }
      .bg-light-danger {
        background-color: rgba(234, 84, 85, 0.12) !important;
      }
      .bg-light-info {
        background-color: rgba(0, 207, 232, 0.12) !important;
      }
      .text-primary {
        color: #7367f0 !important;
      }
      .text-success {
        color: #28c76f !important;
      }
      .text-warning {
        color: #ff9f43 !important;
      }
      .text-danger {
        color: #ea5455 !important;
      }
      .text-info {
        color: #00cfe8 !important;
      }
      .react-dataTable .table-responsive {
        overflow-x: auto;
      }
      .cursor-pointer {
        cursor: pointer;
      }
      .payout-btn {
        padding: 0.3rem 0.5rem;
        font-size: 0.75rem;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Summary Cards */}
      <Row className='match-height mb-2'>
        <Col lg='6' md='6' sm='12'>
          <Card>
            <CardBody>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h2 className='font-weight-bolder mb-0'>
                    {formatCurrency(financeDetail.total_spent)}
                  </h2>
                  <p className='card-text'>Total Spent</p>
                </div>
                <Avatar color='light-primary' icon={<DollarSign size={18} />} />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg='6' md='6' sm='12'>
          <Card>
            <CardBody>
              <div className='d-flex justify-content-between align-items-center'>
                <div>
                  <h2 className='font-weight-bolder mb-0'>
                    {formatCurrency(financeDetail.pending_payments)}
                  </h2>
                  <p className='card-text'>Pending Payments</p>
                </div>
                <Avatar color='light-warning' icon={<Clock size={18} />} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ServiceTakerWallet;
