import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import config from '../../../config.json';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Col,
  Row,
  Badge,
} from 'reactstrap';
import authHeader from '../../../services/auth-header';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import Rate from '../userdashboard/RateUs';
import CircularProgress from '@mui/material/CircularProgress';
import '../../../assets/MyCSS/allorders.css';
import swal from 'sweetalert';
import {
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  CreditCard,
} from 'react-feather';

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
const AllOrder = () => {
  const user = AuthService.getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [completedOrders, setCompletedOrder] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [cancelledOrders, setCancelledOrder] = useState(0);
  const [userOrder, setUserOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [loading, setLoading] = useState(false);
  // Helper function to get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case '0':
        return 'warning';
      case '1':
        return 'info';
      case '2':
        return 'success';
      case '3':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const fetchOrders = async () => {
    try {
      const userId = user?.id;
      setLoading(true);
      const res = await axios.get(
        `${config.SERVER_URL}/api/orders/stats/${userId}`,
        {
          headers: authHeader(),
          params: {
            page: currentPage,
            per_page: perPage,
          },
        },
      );

      if (res.data.success) {
        setOrders(res.data.data.orders.data); // paginated orders
        setTotalOrders(res.data.data.stats.total_orders);
        setCompletedOrder(res.data.data.stats.completed_orders);
        setPendingOrders(res.data.data.stats.pending_orders);
        setCancelledOrder(res.data.data.stats.cancelled_orders);
        setUserOrder(res.data.data.orders.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleStatusChange = async (statusValue, orderId) => {
    let statusLabel = statusValue === '1' ? 'accept' : 'cancel';

    const confirmed = window.confirm(
      `Are you sure you want to ${statusLabel} the order?`,
    );

    if (!confirmed) return;

    try {
      const {
        data: { data },
      } = await axios.put(
        `${config.SERVER_URL}/api/changeorderstatus/${orderId}`,
        { status: statusValue },
        {
          headers: authHeader(),
        },
      );

      const updatedOrders = orders.map((order) =>
        order.id === data.id ? { ...order, status: data.status } : order,
      );
      setOrders(updatedOrders);

      alert(
        `Order ${
          statusLabel === 'accept' ? 'Accepted' : 'Cancelled'
        } Successfully!`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalOrders / perPage);
    const pageButtons = [];

    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <Button
          key={i}
          className={`${
            i === currentPage ? 'btn-primary' : 'btn-outline-primary'
          } mx-1`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    return <div className='text-center my-3'>{pageButtons}</div>;
  };

  const title =
    user.role.name === 'service_taker' ? `Service Provider` : `Service Taker`;

  return (
    <>
      {loading || userOrder === null ? (
        <div className='text-center'>
          <CircularProgress color='success' />
        </div>
      ) : (
        <div className='custom_order_ra'>
          <Row className='match-height mb-2'>
            <Col lg='3' md='6' sm='12'>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <h2 className='font-weight-bolder mb-0'>{totalOrders}</h2>
                      <p className='card-text'>Total Orders</p>
                    </div>
                    <Avatar
                      color='light-primary'
                      icon={<ShoppingBag size={18} />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg='3' md='6' sm='12'>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <h2 className='font-weight-bolder mb-0'>
                        {completedOrders}
                      </h2>
                      <p className='card-text'>Completed Orders</p>
                    </div>
                    <Avatar
                      color='light-success'
                      icon={<CheckCircle size={18} />}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg='3' md='6' sm='12'>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <h2 className='font-weight-bolder mb-0'>
                        {pendingOrders}
                      </h2>
                      <p className='card-text'>Pending Orders</p>
                    </div>
                    <Avatar color='light-warning' icon={<Clock size={18} />} />
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg='3' md='6' sm='12'>
              <Card>
                <CardBody>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <h2 className='font-weight-bolder mb-0'>
                        {cancelledOrders}
                      </h2>
                      <p className='card-text'>Cancelled Orders</p>
                    </div>
                    <Avatar color='light-danger' icon={<XCircle size={18} />} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm='12'>
              <Card>
                <CardHeader>
                  <Row>
                    <h6 className='mobileon' style={{ display: 'none' }}>
                      All Orders
                    </h6>
                    <Col
                      className='align-self-center text-center mobileonlye'
                      md='3'
                    >
                      <h6>{title}</h6>
                    </Col>
                    <Col className='align-self-center custom_cost mobileonlye'>
                      <h6>Cost</h6>
                    </Col>
                    <Col className='align-self-center custom_timefrom mobileonlye'>
                      <h6>Date</h6>
                    </Col>
                    <Col className='align-self-center custom_timefrom mobileonlye'>
                      <h6>Time (From)</h6>
                    </Col>
                    <Col className='align-self-center mobileonlye'>
                      <h6>Time (To)</h6>
                    </Col>
                    <Col className='align-self-center custom_status custom_statustb mobileonlye'>
                      <h6>Status</h6>
                    </Col>
                    <Col className='align-self-center mobileonlye'>
                      <h6>Actions</h6>
                    </Col>
                    <Col></Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>

            {orders.length === 0 ? (
              <Col sm='12'>
                <Card>
                  <CardBody>
                    <Row className='text-center'>
                      <Col>
                        <h5>You Don't Have Any Orders</h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ) : (
              orders.map((order, key) => {
                const role = user?.role?.name;
                const userImage =
                  role === 'service_taker'
                    ? order.service_provider.user.image
                    : order.service_taker.user.image;
                const fullName =
                  role === 'service_taker'
                    ? `${order.service_provider.user.fname} ${order.service_provider.user.lname}`
                    : `${order.service_taker.user.fname} ${order.service_taker.user.lname}`;

                const statusMap = {
                  0: { text: 'Pending', color: 'info' },
                  1: { text: 'Accepted', color: 'primary' },
                  2: { text: 'Completed', color: 'success' },
                  3: { text: 'Cancelled', color: 'danger' },
                  5: { text: 'Paid', color: 'success' },
                };

                const statusData = statusMap[parseInt(order.status)] || {
                  text: 'Unknown',
                  color: 'secondary',
                };

                return (
                  <Col sm='12' key={key} style={{ fontSize: '0.926rem' }}>
                    <Card className='mobilecard'>
                      <CardBody className='custom_card-body'>
                        <Row className='custom_row'>
                          <Col className='align-self-center flex-center' md='3'>
                            <img
                              src={`${config.SERVER_URL}/${userImage}`}
                              alt='User'
                              style={{
                                width: '46px',
                                height: '46px',
                                objectFit: 'contain',
                                borderRadius: '50%',
                              }}
                            />
                            <span className='ml-1'>{fullName}</span>
                          </Col>

                          <Col className='align-self-center mobileonwly'>
                            ${order.cost}
                          </Col>
                          <Col className='align-self-center mobileonwly'>
                            {order.order_date}
                          </Col>
                          <Col className='align-self-center mobileonwly'>
                            {order.slot_start_time}
                          </Col>
                          <Col className='align-self-center mobileonwly'>
                            {order.slot_end_time}
                          </Col>
                          <Col className='align-self-center mobileonwly'>
                            <Badge
                              className={`${statusData.color} text-light py-1 px-2 `}
                              color={getStatusBadgeColor(order.status)}
                              pill
                            >
                              {statusData.text}
                            </Badge>
                          </Col>

                          <Col className='mobilebook'>
                            <Button variant='primary' size='sm'>
                              <Link to={`order/details/${order.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </Col>

                          {role === 'service_taker' && (
                            <Col className='mobilebook'>
                              <Button variant='primary' size='sm'>
                                <Link
                                  to={`/service-details/${order.service_provider.id}`}
                                >
                                  Book Again
                                </Link>
                              </Button>
                            </Col>
                          )}

                          {role === 'service_provider' && (
                            <Col className='flex-center'>
                              <Dropdown
                                onSelect={(e) =>
                                  handleStatusChange(e, order.id)
                                }
                                disabled={order.status !== 0}
                              >
                                <Dropdown.Toggle
                                  variant='success'
                                  id='dropdown-basic'
                                  size='sm'
                                >
                                  Status
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    eventKey='1'
                                    disabled={order.status !== 0}
                                  >
                                    Accept
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    eventKey='3'
                                    disabled={order.status !== 0}
                                  >
                                    Cancel
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </Col>
                          )}
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>

          {/* Pagination */}
          {renderPagination()}
        </div>
      )}
    </>
  );
};

export default AllOrder;
