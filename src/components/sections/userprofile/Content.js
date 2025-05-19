import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AuthService from '../../../services/auth.service';
import config from '../../../config.json';
import authHeader from '../../../services/auth-header';
import Joi from 'joi-browser';
import swal from 'sweetalert';
import CircularProgress from '@mui/material/CircularProgress';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns'; // You can also use other date adapters
import { Modal } from 'react-bootstrap';
import Progress from './progress';
import Loader from '../Loader/Loader';
import Address from '../Hire/AddressAutoComplete';
import {
  Box,
  Grid,
  Container,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  LinearProgress,
  InputAdornment,
  Autocomplete,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckIcon from '@mui/icons-material/Check';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import UploadIcon from '@mui/icons-material/Upload';

const schema = {
  username: Joi.string().required().label('User  Name'),
  image: Joi.string().required().label('image'),
  fname: Joi.string().required().label('First name'),
  lname: Joi.string().required().label('Last Name'),
  email: Joi.string().required().label('Email'),
  password: Joi.string().required().label('Password'),
  dob: Joi.string().required().label('date of Birth'),
  mobile_no: Joi.string().required().label('Mobile Number'),
  street_address: Joi.string().required().label('Street Address'),
  country: Joi.string().required().label('Country Name'),
  state: Joi.string().required().label('State Name'),
  city: Joi.string().required().label('City Name'),
  default_address: Joi.string().required().label('Default Address'),
  postal_code: Joi.string().required().label('Postal Code'),
  role_id: Joi.string().required().label('Chose Service Type'),
  name: Joi.string().required().label('Service Name'),
  description: Joi.string().required().label('Service Description'),
  isLoading: false,
};

const UserDetails = () => {
  const [userDet, setUserDet] = useState(AuthService.getCurrentUser());
  const [profileImage, setProfileImage] = useState('');
  const [identityImage, setIdentityImage] = useState('');
  const [state, setState] = useState({
    role: userDet.role[0],
    user_id: userDet.id,
    username: userDet.username,
    fname: userDet.fname,
    lname: userDet.lname,
    email: '',
    password: '',
    c_password: '',
    dob: '',
    identity: '',
    mobile_no: '',
    image: userDet.avatar,
    street_address: '',
    country: '',
    state: '',
    city: '',
    default_address: '',
    role_id: '',
    postal_code: '',
    isPending: true,
    confrm: '',
    isOpen: false,
    isClose: false,
    otpError: '',
    is_verified: userDet.is_verified,
    profile_completion: '',
    profile_completion_message: [],
  });

  const handleInputChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setState({ ...state, [name]: value });
  };

  const handleDateChange = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setState({ ...state, dob: formattedDate });
  };

  const onChangeModal = (e) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setState({ ...state, [name]: value });
  };

  const handleImageUpload = (event) => {
    const name = event.target.name;
    if (event.target.files[0]) {
      console.log('image file', event.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if (name === 'image') {
          const imageUrl = URL.createObjectURL(event.target.files[0]);
          setProfileImage(imageUrl);
          setState({ ...state, image: reader.result });
        } else if (name === 'identity') {
          const identityUrl = URL.createObjectURL(event.target.files[0]);
          setIdentityImage(identityUrl);
          setState({ ...state, identity: reader.result });
        }
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const optp = async (event) => {
    event.preventDefault();
    const ob = {
      otp: state.verifyCode,
      mobile_no: state.mobile_no,
    };
    try {
      const result = await axios.post(
        config.SERVER_URL + `/api/verifymobile`,
        ob,
        {
          headers: authHeader(),
        },
      );
      if (result.data.success === false) {
        setState({ ...state, otpError: result.data.message });
      } else {
        swal('success!', ' Your mobile number has been verified!', 'success');
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = async () => {
    setState({ ...state, verifyCode: '' });
  };

  const submit = async (event) => {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      icon: 'warning',
      buttons: ['No', 'Yes, I am sure!'],
      dangerMode: true,
    }).then(async function (isConfirm) {
      if (isConfirm) {
        setState({
          ...state,
          // image: state.image.replace(config.SERVER_URL + '/', ''),
          // identity: state.identity.replace(config.SERVER_URL + '/', ''),
          isLoading: true,
        });
        const update = await axios.put(
          config.SERVER_URL + `/api/user/${userDet.id}/profile`,
          state,
        );
        setState({
          ...state,
          // image: config.SERVER_URL + '/' + update.data.data.image,
          // identity: config.SERVER_URL + '/' + update.data.data.identity,
          isLoading: false,
        });
        swal('Updated!', 'Your Profile Has Been Update!', 'success');
        localStorage.removeItem('DD');
      }
    });
  };

  const handleAddress = (address, city, Countystate, country, postal_code) => {
    setState({
      ...state,
      city: city,
      country: country,
      state: Countystate,
      postal_code: postal_code,
      street_address: address,
      default_address: address,
    });
  };

  const openModal = async () => {
    await axios.put(
      config.SERVER_URL + `/api/user/${state.user_id}`,
      { mobile_no: state.mobile_no },
      {
        headers: authHeader(),
      },
    );
    const requestBody = {
      email: state.email,
      mobile_no: state.mobile_no,
    };
    const { data } = await axios.post(
      config.SERVER_URL + `/api/verifyphone`,
      requestBody,
      {
        headers: authHeader(),
      },
    );
    if (data.success === false) {
      swal('Error!', 'Something went wrong.', 'danger');
    }
    setState({ ...state, isOpen: true });
  };

  const closeModal = () => {
    setState({ ...state, isOpen: false, otpError: false });
    resetForm();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUserData = axios.get(
      config.SERVER_URL + `/api/user/${userDet.id}`,
      {
        headers: authHeader(),
      },
    );
    fetchUserData.then((response) => {
      const UserDetails = response.data.data;
      let temp_profile_completion =
        parseInt(UserDetails.profile_completion) > 100
          ? '100'
          : UserDetails.profile_completion;
      setProfileImage(config.SERVER_URL + '/' + UserDetails.image);
      setIdentityImage(config.SERVER_URL + '/' + UserDetails.identity);
      setState({
        ...state,
        country: UserDetails.location?.country,
        state: UserDetails.location?.state,
        city: UserDetails.location?.city,
        street_address: UserDetails.location?.street_address,
        default_address: UserDetails.location?.street_address,
        postal_code: UserDetails.location?.postal_code,
        username: UserDetails.username,
        fname: UserDetails.fname,
        lname: UserDetails.lname,
        email: UserDetails.email,
        password: UserDetails.password,
        dob: UserDetails.dob,
        identity: config.SERVER_URL + '/' + UserDetails.identity,
        mobile_no: UserDetails.mobile_no,
        image: config.SERVER_URL + '/' + UserDetails.image,
        isPending: false,
        is_verified: UserDetails.is_verified,
        profile_completion: temp_profile_completion,
        profile_completion_message: UserDetails.profile_completion_message,
      });
    });
  }, []);

  return (
    <div>
      {state.isLoading && <Loader />}
      {state.isPending ? (
        <div className='text-center'>
          <CircularProgress color='success' />
        </div>
      ) : (
        <Container maxWidth='md'>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              border: '1px solid #e0e0e0',
            }}
          >
            <form>
              {/* Profile Status */}
              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                  }}
                >
                  <Typography variant='h6' fontWeight='medium'>
                    Profile Status
                  </Typography>
                </Box>
                <Progress profile_completion={state.profile_completion} />
                {state.profile_completion_message?.length > 0 && (
                  <div>
                    <p>
                      <b>
                        Complete Your Profile: You need to fulfill the following
                        details to complete your profile.
                      </b>
                    </p>
                  </div>
                )}
                {state?.profile_completion_message?.map((message) => {
                  return <div className='text-danger'>{message}</div>;
                })}
                <span className='text-danger'>{state.error}</span>
              </Box>

              {/* Profile Image */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={profileImage}
                    alt='Profile Picture'
                    sx={{
                      width: 100,
                      height: 100,
                      border: '4px solid #e9f5eb',
                    }}
                  />

                  <Box
                    component='label'
                    htmlFor='profile-image-upload'
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#0b6818',
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                      '&:hover': {
                        backgroundColor: '#0a5714',
                      },
                    }}
                  >
                    <CameraAltIcon sx={{ color: 'white', fontSize: 18 }} />
                  </Box>
                  <input
                    id='profile-image-upload'
                    type='file'
                    accept='image/*'
                    name='image'
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </Box>
              </Box>

              <Grid container spacing={3}>
                {/* Username */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Username'
                    name='username'
                    value={state.username}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.username && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.username}
                    </div>
                  )}
                </Grid>

                {/* First Name and Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='fname'
                    label='First Name'
                    value={state.fname}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.fname && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.fname}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='lname'
                    label='Last Name'
                    value={state.lname}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.lname && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.lname}
                    </div>
                  )}
                </Grid>

                {/* Email and Date of Birth */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='email'
                    label='Email'
                    value={state.email}
                    onChange={handleInputChange}
                    InputProps={{ readOnly: true }}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.email && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.email}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label='Date of Birth'
                      mode='legacy'
                      name='dob'
                      value={state.dob}
                      onChange={handleDateChange}
                      maxDate={new Date()}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  {state.errors && state.errors.dob && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.dob}
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}></Grid>

                {/* Mobile Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name='mobile_no'
                    label='Mobile Number'
                    value={state.mobile_no}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <PhoneIcon color='primary' fontSize='small' />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {state.errors && state.errors.mobile_no && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.mobile_no}
                    </div>
                  )}
                </Grid>

                {/* Address Section */}
                <Grid item xs={12}>
                  <Typography
                    variant='subtitle1'
                    fontWeight='medium'
                    sx={{ mb: 2 }}
                  >
                    Address
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Address
                    page='userdetail streetAddress'
                    handleAddress={handleAddress}
                    currentAddress={state?.street_address}
                  />
                  {/* <Autocomplete
                    freeSolo
                    options={[]}
                    value={state?.street_address}
                    name='street_address'
                    onChange={handleInputChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Service Address'
                        variant='outlined'
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position='start'>
                              <LocationOnIcon
                                color='primary'
                                fontSize='small'
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  /> */}
                  {state.errors && state.errors.street_address && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.street_address}
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Country'
                    name='country'
                    value={state.country}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.country && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.country}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='State'
                    name='state'
                    value={state.state}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.state && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.state}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='City'
                    name='city'
                    value={state.city}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.city && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.city}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Postal Code'
                    name='postal_code'
                    value={state.postal_code}
                    onChange={handleInputChange}
                    variant='outlined'
                    InputLabelProps={{ shrink: true }}
                  />
                  {state.errors && state.errors.postal_code && (
                    <div
                      style={{
                        color: '#DA1212',
                        fontWeight: '500',
                        fontSize: '0.95rem',
                      }}
                    >
                      {state.errors.postal_code}
                    </div>
                  )}
                </Grid>

                {/* Identity Verification */}
                <Grid item xs={12}>
                  <Typography
                    variant='subtitle1'
                    fontWeight='medium'
                    sx={{ mb: 2 }}
                  >
                    Identity Verification
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </Grid>

                <Grid item xs={12}>
                  <Card variant='outlined' sx={{ mb: 2 }}>
                    <CardContent
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <img
                          src={identityImage}
                          alt='Identity Document'
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: 150,
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                      <Button
                        component='label'
                        variant='outlined'
                        startIcon={<UploadIcon />}
                        sx={{
                          color: '#0b6818',
                          borderColor: '#0b6818',
                          '&:hover': {
                            borderColor: '#0a5714',
                            backgroundColor: 'rgba(11, 104, 24, 0.04)',
                          },
                        }}
                      >
                        Change Driver's License / Passport
                        <input
                          type='file'
                          accept='image/*,.pdf'
                          onChange={handleImageUpload}
                          name='identity'
                          style={{ display: 'none' }}
                        />
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <button
                    type='submit'
                    className='btn btn-black btn-block mt-20'
                    onClick={(event) => submit(event)}
                  >
                    Update Profile
                  </button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      )}
      <Modal show={state.isOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Verification Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Box sx={{ mb: 2 }}>
              <label>Enter Verification Code</label>
              <input
                name='verifyCode'
                type='text'
                maxLength={4}
                placeholder='Verification Code'
                value={state.verifyCode}
                onChange={onChangeModal}
              />

              {state.otpError && (
                <div
                  style={{
                    color: '#DA1212',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                  }}
                >
                  {state.otpError}
                </div>
              )}
            </Box>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button
            className='ui inverted green button another_service_btn'
            onClick={optp}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDetails;
