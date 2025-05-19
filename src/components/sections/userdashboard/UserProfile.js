'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
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

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState(
    '/placeholder.svg?height=150&width=150',
  );
  const [identityImage, setIdentityImage] = useState(
    '/placeholder.svg?height=150&width=150',
  );
  const [profileData, setProfileData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: new Date('2024-10-24'),
    mobileNumber: '',
    address: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
  });

  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleIdentityImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setIdentityImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile data submitted:', profileData);
    // Handle form submission
  };

  return (
    <Container maxWidth='md'>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid #e0e0e0',
        }}
      >
        <form onSubmit={handleSubmit}>
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
              <Typography variant='body2' color='primary' fontWeight='medium'>
                100%
              </Typography>
            </Box>
            <LinearProgress
              variant='determinate'
              value={100}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#e9f5eb',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#0b6818',
                },
              }}
            />
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
                onChange={handleProfileImageChange}
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
                value={profileData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* First Name and Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='First Name'
                value={profileData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                value={profileData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Email and Date of Birth */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                value={profileData.email}
                InputProps={{ readOnly: true }}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>

            {/* Mobile Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Mobile Number'
                value={profileData.mobileNumber}
                onChange={(e) =>
                  handleInputChange('mobileNumber', e.target.value)
                }
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
              <Autocomplete
                freeSolo
                options={[]}
                value={profileData.address}
                onChange={(_, value) => handleInputChange('address', value)}
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
                          <LocationOnIcon color='primary' fontSize='small' />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Country'
                value={profileData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='State'
                value={profileData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='City'
                value={profileData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Postal Code'
                value={profileData.postalCode}
                onChange={(e) =>
                  handleInputChange('postalCode', e.target.value)
                }
                variant='outlined'
                InputLabelProps={{ shrink: true }}
              />
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
                      src={identityImage || '/placeholder.svg'}
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
                      onChange={handleIdentityImageChange}
                      style={{ display: 'none' }}
                    />
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                size='large'
                startIcon={<CheckIcon />}
                sx={{
                  mt: 2,
                  backgroundColor: '#0b6818',
                  '&:hover': {
                    backgroundColor: '#0a5714',
                  },
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
