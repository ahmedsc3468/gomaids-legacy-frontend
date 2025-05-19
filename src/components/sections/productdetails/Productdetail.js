'use client';

import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import config from '../../../config.json';
import AuthService from '../../../services/auth.service';
import authHeader from '../../../services/auth-header';
import axios from 'axios';
import Joi from 'joi-browser';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import '../../../assets/MyCSS/productdetail.css';
import CircularProgress from '@mui/material/CircularProgress';
import swal from 'sweetalert';
import { format, parse, isAfter, isBefore, isEqual } from 'date-fns';
import Loader from '../Loader/Loader';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Alert,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  CheckCircle,
  Chat,
} from '@mui/icons-material';
import TimeSlotSelector from './TimeSlotSelector';

function Productdetail() {
  const navigate = useHistory();
  const params = useParams();
  const location = useLocation();

  // Form validation schema
  const schema = {
    timeForm: Joi.string().required().label('Starting Time'),
    timeTo: Joi.string().required().label('Ending Time'),
    date: Joi.string().required().label('Date'),
    service: Joi.string().required().label('Service'),
  };

  // Initialize state
  const user = AuthService.getCurrentUser();
  let dateSplit = '';
  if (location.state !== undefined && location.state.date) {
    const temp = location.state.date.split('-');
    dateSplit = temp[0] + '-' + temp[1] + '-' + temp[2];
  }

  const [userId, setUserId] = useState(user ? user.id : '');
  const [hoursLeft, setHoursLeft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todaybit, setTodaybit] = useState(false);
  const [timeForm, setTimeForm] = useState(
    (location.state !== undefined && location.state.slot_start_time) || '',
  );
  const [timeTo, setTimeTo] = useState(
    (location.state !== undefined && location.state.slot_end_time) || '',
  );
  const [date, setDate] = useState((dateSplit !== '' && dateSplit) || '');
  const [slotUnavailable, setSlotUnavailable] = useState('');
  const [service, setService] = useState(
    (location.state !== undefined && location.state.serviceName) || '',
  );
  const [events, setEvents] = useState([]);
  const [slot_by_date, setSlotByDate] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentServiceProvider, setCurrentServiceProvider] = useState({});
  const [feedbackCurrentServiceProvider, setFeedbackCurrentServiceProvider] =
    useState({});
  const [providerServices, setProviderServices] = useState([]);
  const [servicePrice, setServicePrice] = useState('');
  const [rating, setRating] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [serviceprovider, setServiceprovider] = useState({});
  const [serviceprovider_services, setServiceproviderServices] = useState([]);
  const [serviceprovider_services_type, setServiceproviderServicesType] =
    useState([]);
  const [profileCompletion, setProfileCompletion] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Equivalent to componentDidMount
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchUserData = async () => {
      try {
        const user = AuthService.getCurrentUser();
        const {
          data: { data },
        } = await axios.get(config.SERVER_URL + `/api/user/${user.id}`, {
          headers: authHeader(),
        });
        setProfileCompletion(data.profile_completion);
      } catch (e) {
        console.log(e);
      }
    };

    const fetchServiceProviderData = async () => {
      const userID = params.serviceProviderID;

      try {
        const serviceProviders = await axios.get(
          config.SERVER_URL + `/api/serviceprovider/${userID}`,
          {
            headers: authHeader(),
          },
        );

        const providerServicesArray = [];

        const servicePriceValue =
          serviceProviders.data.data.serviceprovider_services[0].service_type
            .service_price.price_per_hour;

        setServicePrice(servicePriceValue);
        setServiceprovider(serviceProviders.data.data.user);
        setServiceproviderServices(
          serviceProviders.data.data.serviceprovider_services[0],
        );
        setServiceproviderServicesType(
          serviceProviders.data.data.serviceprovider_services,
        );

        serviceProviders.data.data.serviceprovider_services.forEach(
          (provider) => {
            providerServicesArray.push({
              id: provider.service_type.id,
              value: provider.service_type.name,
            });
          },
        );

        setProviderServices(providerServicesArray);
        setService(providerServicesArray[0]?.value);
        setCurrentServiceProvider(serviceProviders.data.data);

        // Fetch feedback data
        const feedbackServiceProviders = await axios.get(
          config.SERVER_URL + `/api/providerfeedbacks/${userID}`,
          {
            headers: authHeader(),
          },
        );

        const list = feedbackServiceProviders.data.data.data;
        setFeedbackCurrentServiceProvider([...list]);
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsPending(false);
      }
    };

    fetchUserData();
    fetchServiceProviderData();
  }, [params.serviceProviderID]);

  // Validation functions
  const validate = () => {
    const result = Joi.validate(
      {
        timeForm,
        timeTo,
        date,
        service,
      },
      schema,
      {
        abortEarly: false,
      },
    );

    if (!result.error) return null;

    const errorDetails = {};
    if (result.error) {
      for (const item of result.error.details) {
        errorDetails[item.path] = item.message;
      }
    }

    return Object.keys(errorDetails).length === 0 ? null : errorDetails;
  };

  const validateProperty = ({ value, name }) => {
    const dataProperty = { [name]: value };
    const subSchema = { [name]: schema[name] };

    const { error } = Joi.validate(dataProperty, subSchema);

    return error ? error.details[0].message : null;
  };

  const memberSince = (created_at) => {
    const date = new Date(created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const onChangeDate = async (date) => {
    if (date) {
      setIsLoading(true);
      const newDate = new Date(date);
      const now = new Date();

      if (now.getDate() === newDate.getDate()) {
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const totalMinutesLeft = (23 - currentHour) * 60 + (59 - currentMinute);
        const hoursLeft = Math.floor(totalMinutesLeft / 60);

        setHoursLeft(hoursLeft);
        setTodaybit(true);
      } else {
        setHoursLeft('');
        setTodaybit(false);
      }

      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      const formattedDate = `${month}/${day}/${year}`;

      setDate(formattedDate);

      const seleted_data = { date: formattedDate };
      const user_ID = params.serviceProviderID;

      try {
        const slots = await axios.post(
          config.SERVER_URL + `/api/slotbydate/${user_ID}`,
          seleted_data,
          {
            headers: authHeader(),
          },
        );
        const avaiable_slots = slots.data.data;
        setSlotByDate(avaiable_slots);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching slots:', error);
      }
    }
  };

  const hireNow = async ({ startTime, endTime }) => {
    setIsLoading(true);
    const userdetail = AuthService.getCurrentUser();

    if (userdetail?.role?.name !== 'service_taker') {
      swal({
        title: 'Please Login!',
        text: `Please Login as Customer to hire a service provider`,
        icon: 'info',
        buttons: {
          confirm: 'Okay',
        },
      });
      setIsLoading(false);
      return;
    }

    if (profileCompletion !== '100') {
      swal(
        'Incomplete User Profile',
        'Please complete your user profile details for hiring service providers.',
        'warning',
      );
      setIsLoading(false);
      return;
    }

    const serviceProviderID = params.serviceProviderID;
    const validationErrors = validate();

    if (validationErrors) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const service_taker = JSON.parse(localStorage.getItem('user'));

    if (!service_taker) {
      const obj = {
        currentServiceProvider,
        date,
        slot_start_time: startTime,
        slot_end_time: endTime,
        serviceProviderID: params.serviceProviderID,
        serviceName: service,
        serviceAvailed: service,
      };
      navigate.push('/signup/login/hire', { state: obj });
      setIsLoading(false);
      return;
    }

    const serviceDetails = {
      service_taker_id: service_taker.id || service_taker.user_id,
      date,
      slot_start_time: startTime,
      slot_end_time: endTime,
    };

    try {
      const resp = await axios.post(
        config.SERVER_URL + `/api/slots/${serviceProviderID}`,
        serviceDetails,
        {
          headers: authHeader(),
        },
      );

      if (resp.data.success) {
        const serviceObj =
          currentServiceProvider.serviceprovider_services?.filter(
            (x) => x.service_type.name === service,
          );
        const servicePriceValue =
          serviceObj[0].service_type.service_price.price_per_hour;
        navigate.push('/hire/details', {
          currentServiceProvider,
          date,
          slot_start_time: startTime,
          slot_end_time: endTime,
          serviceAvailed: service,
          servicePrice: servicePriceValue,
          additionalNotes,
        });
      } else {
        setIsLoading(false);
        if (resp?.data?.data?.error) {
          setSlotUnavailable(resp?.data?.data?.error);
        }
        else if (resp?.data?.message) {
          setSlotUnavailable(resp?.data?.message);
        }
      }
    } catch (ex) {
      console.log('ex', ex);
      setIsLoading(false);
      setSlotUnavailable('An unexpected error occurred.');
    }
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    const date = parse(time, 'HH:mm', new Date());
    return format(date, 'h:mm a'); // Format as 4:00 PM
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className='prdt-detail pt-90'>
        <div className='container'>
          <div className='row'>
            {/* Provider Profile Card */}
            <div className='col-lg-12'>
              <Card
                elevation={2}
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'stretch',
                    }}
                  >
                    {/* Provider Image */}
                    <Box
                      sx={{
                        width: { xs: '100%', md: '300px' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 4,
                        bgcolor: 'rgba(11, 104, 24, 0.03)',
                      }}
                    >
                      {currentServiceProvider.user !== undefined && (
                        <Avatar
                          src={`${config.SERVER_URL}/${currentServiceProvider.user.image}`}
                          alt={currentServiceProvider?.user?.username}
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          }}
                        />
                      )}
                    </Box>

                    {/* Provider Details */}
                    <Box
                      sx={{
                        flex: 1,
                        p: 4,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Rating
                              value={Number.parseInt(
                                currentServiceProvider.rating,
                              )}
                              size='small'
                              precision={0.5}
                              readOnly
                            />
                          </Box>

                          <Typography
                            variant='h4'
                            component='h2'
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {currentServiceProvider?.user?.username}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Chip
                              label='Maid/Cleaner'
                              color='primary'
                              size='small'
                              sx={{ mr: 2 }}
                            />
                            <Typography
                              variant='h6'
                              color='primary'
                              sx={{
                                fontWeight: 700,
                              }}
                            >
                              {`$${servicePrice}/hr`}
                            </Typography>
                          </Box>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                            gap: 2,
                            mb: 'auto',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <LocationOn fontSize='small' color='action' />
                            <Typography variant='body2'>
                              {currentServiceProvider?.user?.location?.city}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CalendarToday fontSize='small' color='action' />
                            <Typography variant='body2'>
                              Member since{' '}
                              {memberSince(currentServiceProvider?.created_at)}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <Chat fontSize='small' color='action' />
                            <Typography variant='body2'>
                              <span className='font-semibold'>Languages:</span>{' '}
                              {serviceprovider_services?.language ?? 'English'}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                            }}
                          >
                            <CheckCircle fontSize='small' color='action' />
                            <Typography variant='body2'>
                              {currentServiceProvider?.orders?.length} Orders
                              Completed
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </div>

            <div className='col-lg-12'>
              <Card
                elevation={2}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#0b6818',
                    py: 2,
                    px: 3,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <AccessTime />
                  <Box>
                    <Typography
                      variant='h5'
                      component='h2'
                      sx={{ fontWeight: 600, color: '#fff' }}
                    >
                      Book Service
                    </Typography>
                    <Typography variant='body2' sx={{ opacity: 0.9, mt: 0.5 }}>
                      Select your preferred date and time
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <div className='container'>
                      <div className='hireNow-date-container'>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                          <MobileDatePicker
                            mode='legacy'
                            name='date'
                            label='Select Date'
                            value={date}
                            onChange={onChangeDate}
                            minDate={new Date()}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    {errors && errors.date && !isLoading && (
                      <span className='text-danger error-date'>
                        {errors.date}
                      </span>
                    )}
                  </div>

                  {date && slot_by_date[0] === undefined && !isLoading && (
                    <Grid
                      container
                      spacing={2}
                      style={{ marginBottom: '2rem' }}
                    >
                      <Grid item xs={12}>
                        <Alert severity='warning'>
                          Provider is not available on the selected date.
                        </Alert>
                        {errors?.date && (
                          <Typography
                            variant='body2'
                            color='error'
                            style={{ marginTop: '0.5rem' }}
                          >
                            {errors.date}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  )}

                  {slot_by_date.length > 0 && (
                    <Grid container justifyContent='center' sx={{ mt: 4 }}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant='h6'
                          align='center'
                          fontWeight='bold'
                        >
                          Available Time Slots for Selected Date
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  {slot_by_date.length > 0 &&
                    slot_by_date.map((slot, i) => (
                      <Grid container spacing={2} key={i} sx={{ mt: 2 }}>
                        <Grid item xs={12} md={6}>
                          <Card elevation={1}>
                            <CardContent>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                Start Time
                              </Typography>
                              <Typography variant='body1'>
                                {formatTimeForDisplay(
                                  slot.hourly_slots.slot_start_time
                                    .split(':')
                                    .slice(0, 2)
                                    .join(':'),
                                )}
                              </Typography>
                              {errors?.date && (
                                <Typography variant='body2' color='error'>
                                  {errors.date}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Card elevation={1}>
                            <CardContent>
                              <Typography variant='subtitle1' fontWeight='bold'>
                                End Time
                              </Typography>
                              <Typography variant='body1'>
                                {formatTimeForDisplay(
                                  slot.hourly_slots.slot_end_time
                                    .split(':')
                                    .slice(0, 2)
                                    .join(':'),
                                )}
                              </Typography>
                              {errors?.date && (
                                <Typography variant='body2' color='error'>
                                  {errors.date}
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    ))}

                  <div className='col-lg-12'>
                    <div style={{ marginBottom: '2rem' }}>
                      {/* <div className='hireNow-date-container'>
                        <select
                          className='form-select form-select-lg'
                          aria-label='.form-select-lg example'
                          style={{
                            width: '100%',
                            height: '3.2rem',
                          }}
                          name='service'
                          onChange={onChangeTextFields}
                          value={providerServices[0]?.value}
                        >
                          <option disabled>Please select a service</option>

                          {providerServices.map((data, index) => (
                            <option key={index} value={data.value}>
                              {data.value}
                            </option>
                          ))}
                        </select>
                      </div> */}

                      {errors && errors.service && (
                        <span
                          className='text-danger error-date'
                          style={{ paddingLeft: '0' }}
                        >
                          {errors.service}
                        </span>
                      )}
                    </div>
                  </div>
                  {slot_by_date.length > 0 &&
                    slot_by_date.map((index, i) => (
                      <TimeSlotSelector
                        startTime={index.hourly_slots.slot_start_time}
                        endTime={index.hourly_slots.slot_end_time}
                        hireNow={hireNow}
                        additionalNotes={additionalNotes}
                        setAdditionalNotes={setAdditionalNotes}
                        slotStartTime={timeForm}
                        setSlotStartTime={setTimeForm}
                        slotEndTime={timeTo}
                        setSlotEndTime={setTimeTo}
                        slotUnavailable={slotUnavailable}
                        setSlotUnavailable={setSlotUnavailable}
                      />
                    ))}
                </CardContent>
              </Card>
              <div className='prdt-tabs row pt-md-25 mb-5'>
                <div className='col-md-12'>
                  <div className='prdt-tab mt-5 service-provider-nav-container'>
                    <Tab.Container defaultActiveKey='description'>
                      <Nav
                        variant='tabs'
                        className='nav nav-pills justify-content-center justify-content-sm-start'
                      >
                        <Nav.Item>
                          <Nav.Link eventKey='description'>
                            Description
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey='addinfo'>Detail</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey='reviews'>Reviews</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content className='pt-20'>
                        <Tab.Pane eventKey='description'>
                          <h4 className='mb-10 lh-13'></h4>
                          <p className='text-justify'>
                            {serviceprovider.detail}
                          </p>
                          {serviceprovider_services_type.map(
                            (service, index) => (
                              <React.Fragment key={index}>
                                <h4 className='mb-10 lh-13'>
                                  {service.service_type.name}
                                </h4>
                                <p className='text-justify'>
                                  {service.description}{' '}
                                </p>
                              </React.Fragment>
                            ),
                          )}
                        </Tab.Pane>
                        <Tab.Pane eventKey='addinfo'>
                          <div className='row align-items-center'>
                            <div className='col-12'>
                              <p className='text-justify'>
                                {serviceprovider.detail}{' '}
                              </p>
                              <table className='table table-bordered mb-0'>
                                <tbody>
                                  <tr>
                                    <th scope='row'>Name</th>
                                    <td>
                                      {currentServiceProvider.user !== undefined
                                        ? currentServiceProvider.user.fname +
                                          ' ' +
                                          currentServiceProvider.user.lname
                                        : ''}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope='row'>Address</th>
                                    <td>
                                      {currentServiceProvider.user !== undefined
                                        ? currentServiceProvider.user.location
                                            .city
                                        : ''}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope='row'>Orders Completed</th>
                                    <td>
                                      {currentServiceProvider.orders !==
                                      undefined
                                        ? currentServiceProvider.orders.length
                                        : ''}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope='row'>Rating</th>
                                    <td>
                                      {currentServiceProvider !== undefined
                                        ? currentServiceProvider.rating
                                        : ''}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope='row'>Member Since</th>
                                    <td>
                                      {memberSince(
                                        currentServiceProvider?.created_at,
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope='row'>Provider Level</th>
                                    <td>
                                      {currentServiceProvider !== undefined
                                        ? 'Level' +
                                          ' ' +
                                          currentServiceProvider.level
                                        : 'New Provider'}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey='reviews'>
                          <div className='review-wrp'>
                            {feedbackCurrentServiceProvider.length > 0 &&
                              feedbackCurrentServiceProvider.map(
                                (obj, index) => (
                                  <React.Fragment key={index}>
                                    {isPending ? (
                                      <div className='text-center'>
                                        <CircularProgress color='success' />
                                      </div>
                                    ) : (
                                      <div className='review-prdt'>
                                        <img
                                          src={`${config.SERVER_URL}/${obj.service_taker?.user?.image}`}
                                          className='user-img'
                                          alt=''
                                        />
                                        <h4>
                                          {obj.service_taker?.user?.username}
                                          <span className='date'>
                                            {obj.updated_at.substring(0, 10)}
                                          </span>
                                        </h4>
                                        <Rating
                                          value={Number.parseInt(obj.rating)}
                                          size='normal'
                                          precision={0.5}
                                          readOnly
                                        />
                                        <p className='text-justify'>
                                          {obj.service_taker_feedback}
                                        </p>
                                      </div>
                                    )}
                                  </React.Fragment>
                                ),
                              )}
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Productdetail;
