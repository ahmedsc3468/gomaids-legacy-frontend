'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  CheckCircle,
  LinkOff,
  SwapHoriz,
  ArrowForward,
  Warning as WarningIcon,
  OpenInNew,
} from '@mui/icons-material';

export default function StripeConnectButton({
  onConnect,
  onDisconnect,
  isConnected = false,
  connectedAccountName = 'Your Stripe Account',
  connectedAccountId = 'acct_123456789',
  hasErrors,
  errorData,
}) {
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleConnect = () => {
    setConnecting(true);

    // Call the onConnect callback if provided
    if (onConnect) {
      onConnect();
    }
  };

  const handleDisconnect = async () => {
    setOpenDialog(false);
    setDisconnecting(true);

    if (onDisconnect) {
      const success = await onDisconnect();
      if (!success) {
        setDisconnecting(false);
        // Handle error
        return;
      }
    }

    // Reset state after successful disconnect
    setDisconnecting(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formatRequirement = (requirement) => {
    return requirement
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };
  return (
    <>
      <Card sx={{ maxWidth: 400, mx: 'auto', boxShadow: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                height: 40,
                width: 40,
                background: 'linear-gradient(to right, #6772e5, #9e89ef)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 512'
                style={{ height: 24, width: 24, color: 'white' }}
                fill='currentColor'
              >
                <path d='M165 144.7l-43.3 9.2-.2 142.4c0 26.3 19.8 43.3 46.1 43.3 14.6 0 25.3-2.7 31.2-5.9v-33.8c-5.7 2.3-33.7 10.5-33.7-15.7V221h33.7v-37.8h-33.7zm89.1 51.6l-2.7-13.1H213v153.2h44.3V233.3c10.5-13.8 28.2-11.1 33.9-9.3v-40.8c-6-2.1-26.7-6-37.1 13.1zm92.3-72.3l-44.6 9.5v36.2l44.6-9.5zM44.9 228.3c0-6.9 5.8-9.6 15.1-9.7 13.5 0 30.7 4.1 44.2 11.4v-41.8c-14.7-5.8-29.4-8.1-44.1-8.1-36 0-60 18.8-60 50.2 0 49.2 67.5 41.2 67.5 62.4 0 8.2-7.1 10.9-17 10.9-14.7 0-33.7-6.1-48.6-14.2v40c16.5 7.1 33.2 10.1 48.5 10.1 36.9 0 62.3-15.8 62.3-47.8 0-52.9-67.9-43.4-67.9-63.4zM640 261.6c0-45.5-22-81.4-64.2-81.4s-67.9 35.9-67.9 81.1c0 53.5 30.3 78.2 73.5 78.2 21.2 0 37.1-4.8 49.2-11.5v-33.4c-12.1 6.1-26 9.8-43.6 9.8-17.3 0-32.5-6.1-34.5-26.9h86.9c.2-2.3.6-11.6.6-15.9zm-87.9-16.8c0-20 12.3-28.4 23.4-28.4 10.9 0 22.5 8.4 22.5 28.4zm-112.9-64.6c-17.4 0-28.6 8.2-34.8 13.9l-2.3-11H363v204.8l44.4-9.4.1-50.2c6.4 4.7 15.9 11.2 31.4 11.2 31.8 0 60.8-23.2 60.8-79.6.1-51.6-29.3-79.7-60.5-79.7zm-10.6 122.5c-10.4 0-16.6-3.8-20.9-8.4l-.3-66c4.6-5.1 11-8.8 21.2-8.8 16.2 0 27.4 18.2 27.4 41.4.1 23.9-10.9 41.8-27.4 41.8zm-126.7 33.7h44.6V183.2h-44.6z' />
              </svg>
            </Box>
            <Typography variant='h6' component='h3' sx={{ fontWeight: 600 }}>
              {isConnected ? 'Stripe Connected' : 'Connect with Stripe'}
            </Typography>
          </Box>

          {isConnected ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: hasErrors ? 'warning.light' : 'success.light',
                  color: hasErrors
                    ? 'warning.contrastText'
                    : 'success.contrastText',
                  p: 2,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                {hasErrors ? (
                  <WarningIcon sx={{ mr: 1 }} />
                ) : (
                  <CheckCircle sx={{ mr: 1 }} />
                )}
                <Box sx={{ ml: 1 }}>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {connectedAccountName}
                  </Typography>
                  <Typography variant='caption'>
                    ID: {connectedAccountId}
                  </Typography>
                  {hasErrors && errorData && (
                    <Typography
                      variant='caption'
                      sx={{ display: 'block', mt: 0.5, fontWeight: 500 }}
                    >
                      {errorData.message}
                    </Typography>
                  )}
                </Box>
              </Box>

              {hasErrors && errorData && (
                <Alert
                  severity='error'
                  sx={{
                    mb: 2,
                    '& .MuiAlert-message': { width: '100%' },
                  }}
                >
                  <AlertTitle>Account requirements pending</AlertTitle>

                  {errorData.currently_due.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        Currently due:
                      </Typography>
                      <List dense disablePadding sx={{ pl: 2 }}>
                        {errorData.currently_due.map((item, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              display: 'list-item',
                              listStyleType: 'disc',
                              py: 0,
                            }}
                          >
                            <ListItemText
                              primary={formatRequirement(item)}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {errorData.errors.length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        Issues to resolve:
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1.5,
                        }}
                      >
                        {errorData.errors.map((error, index) => (
                          <Paper
                            key={index}
                            variant='outlined'
                            sx={{ p: 1.5, bgcolor: 'background.paper' }}
                          >
                            <Typography
                              variant='body2'
                              sx={{ fontWeight: 500 }}
                            >
                              {formatRequirement(error.requirement)}
                            </Typography>
                            <Typography variant='body2' sx={{ mt: 0.5 }}>
                              {error.reason}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Button
                    variant='outlined'
                    color='error'
                    size='small'
                    startIcon={<OpenInNew />}
                    onClick={() =>
                      window.open(
                        'https://dashboard.stripe.com/account',
                        '_blank',
                      )
                    }
                    sx={{ mt: 2 }}
                  >
                    Complete requirements in Stripe Dashboard
                  </Button>
                </Alert>
              )}
              {/* <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'success.light',
                  color: 'success.contrastText',
                  p: 2,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <CheckCircle sx={{ mr: 1 }} />
                <Box sx={{ ml: 1 }}>
                  <Typography variant='body2' sx={{ fontWeight: 500 }}>
                    {connectedAccountName}
                  </Typography>
                  <Typography variant='caption'>
                    ID: {connectedAccountId}
                  </Typography>
                </Box>
              </Box> */}

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  onClick={handleOpenDialog}
                  disabled={disconnecting}
                  variant='outlined'
                  color='error'
                  startIcon={<LinkOff />}
                  sx={{ flex: 1 }}
                >
                  {disconnecting ? (
                    <CircularProgress size={20} color='error' />
                  ) : (
                    'Disconnect'
                  )}
                </Button>

                <Button
                  onClick={handleConnect}
                  variant='outlined'
                  color='primary'
                  startIcon={!connecting ? <SwapHoriz /> : null}
                  sx={{ flex: 1 }}
                >
                  {connecting ? (
                    <CircularProgress size={20} color='error' />
                  ) : (
                    'Switch Account'
                  )}
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant='body2' color='text.secondary'>
                Your Stripe account is connected and ready to process payments.
                You can disconnect or switch to a different account at any time.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                Connect your Stripe account to start accepting payments and
                manage your transactions.
              </Typography>

              <Button
                onClick={handleConnect}
                disabled={connecting}
                variant='contained'
                fullWidth
                sx={{
                  background: 'linear-gradient(to right, #6772e5, #9e89ef)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #5469d4, #8b7ae8)',
                  },
                  textTransform: 'none',
                  py: 1.5,
                  mb: 2,
                }}
                endIcon={!connecting ? <ArrowForward /> : null}
              >
                {connecting ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress
                      size={20}
                      color='inherit'
                      sx={{ mr: 1 }}
                    />
                    Connecting...
                  </Box>
                ) : (
                  'Connect with Stripe'
                )}
              </Button>

              <Typography variant='caption' color='text.secondary'>
                By connecting, you agree to Stripe's Terms of Service and
                Privacy Policy.
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Disconnect Stripe Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to disconnect your Stripe account? This will
            remove all payment processing capabilities until you connect another
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDisconnect} color='error' variant='contained'>
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
