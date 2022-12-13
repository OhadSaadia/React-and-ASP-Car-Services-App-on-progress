import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../GlobalContexts';
import api from './api';
import { validEmailRegex, validateSignForm } from './Functions/Validations/SignValidations';
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Sign(props) {

  let title = props.title;
  const {isAuthenticated , setIsAuthenticated} = React.useContext(AuthContext);
  const [isSubmited, setSubmited] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [errors, setErrors] = useState({ email: '', password: '' , confirmPassword:''});
  const [isFormValid, setIsFormValid] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  let navigate = useNavigate();
    
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let userData = {
      email: data.get('email'),
      password: `A-${data.get('password')}b`,
      confirmPassword:`A-${data.get('confirmPassword')}b`
    };

    //Check the rememberMe Option
    let isRememeberMe = data.get('remeberMe');
    if (isRememeberMe) userData.isRememeberMe = true;
    else userData.isRememeberMe = false;

    //Check the form validation
    if (!validateSignForm(errors, userData)) {
      setIsFormValid(false);
      return;
    } else {
      setIsFormValid(true);
    }

    //seting the submit state to true for the credentials
    

    //posting to the api
    api.post(`Accounts/sign${title}`, userData )
      .then(res => {
        if (res.status == 200 ) {
          localStorage.setItem("Token", res.data)
          setIsAuthenticated(true);
          navigate('/');
        }
        else {
          setIsAuthenticated(false);
          setSubmited(true);
          localStorage.clear();
        }
      })
      .catch((e) =>{
        setIsAuthenticated(false);
        navigate('errorpage');
      })
  };


  const handleCheckBoxChange = e => {
    e.persist();
    setRememberMe(!rememberMe);
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let errorsInsert = errors;
    switch (name) {
      case 'email':
        errorsInsert.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        setEmailInput(value);
        break;
      case 'password':
        errorsInsert.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        setPasswordInput(value);
        break;
      case 'confirmPassword':
        errorsInsert.confirmPassword =
        value != passwordInput
          ? 'Confirm Password must be match to password!'
          : '';
      setConfirmPasswordInput(value);
      break;
    }
    setErrors(errorsInsert);
  }

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
            Sign {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {
              isSubmited && 
              <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'red',
                border: 'solid 1px',
                borderRadius: 1,
                fontSize: 'big'
              }}>
                {
                  title == "in" ?
                    <text>Email and password don't match our records.</text>
                    :
                    <text>You are already sign up.
                      <Link href="/signin" variant="body2">
                        try login
                      </Link>
                    </text>
                }

              </Box>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailInput}
              onChange={handleChange}

            />
            {
              errors.email.length > 0 &&
              <span style={{ color: 'red' }}>{errors.email}</span>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordInput}
              onChange={handleChange}
            />
            {
              errors.password.length > 0 &&
              <span style={{ color: 'red' }}>{errors.password}</span>
            }
            {
              title == "up" &&
              <>
                <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="ConfirmPassword"
                type="password"
                id="confirmPassword"
                value={confirmPasswordInput}
                onChange={handleChange}
                />
                {
                  errors.confirmPassword.length > 0 &&
                  <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                }
              </>
            }
            <FormControlLabel
              control={<Checkbox checked={rememberMe} name='remeberMe' color="primary" onChange={handleCheckBoxChange} />}
              label="Remember me"
            />
            {
              !isFormValid &&
              <Box sx={{
                marginTop: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'red',
                border: 'solid 1px',
                borderRadius: 1,
                fontSize: 'big'
              }}>
                You must enter a valid email and password
              </Box>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign {title}
            </Button>
            <Grid container>
              {
                title == "in" ?
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                  :
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
              }
            </Grid>

          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}