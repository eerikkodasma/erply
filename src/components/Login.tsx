import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/AuthReducer';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../reducers/NewsReducer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Typography,
  Grid,
  Container,
  CssBaseline,
  Box,
} from '@mui/material';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const theme = createTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && token) {
      if (token.length !== 32) {
            setError("Token needs to have at least 32 characters")
      } else {
        // try to fetch articles. If error then token is incorrect.
        let result = await dispatch(fetchNews({ token }))
        if (result.hasOwnProperty('error')) {
          if (result.payload) {
            // Authentication error
            setError(result.payload as string)
          } else {
            // system failure
            setError("Something wrong with the request. Please try again soon")
          }
        } else {
          dispatch(login({ email, token }));
          navigate('/news');
        }
      }
    } else {
      setError('Please enter both email and API token');
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="token"
                label="API Token"
                type="text"
                id="token"
                autoComplete="current-token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="https://newsapi.org/register" variant="body2" target="_blank">
                    {"Don't have an API token? Get one here."}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  );  
};

export default Login;
