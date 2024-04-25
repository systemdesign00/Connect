/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import  React,{useEffect,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '../../../theme/index'
import { useNavigate ,Link} from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';
import Notification from '../../../layouts/Notification';
import { createAPIEndpoint, ENDPIONTS } from "../../../api/index";
import Loginicon from '../../../Icons/login.gif'
import Visibleicon from '../../../Icons/visible.png'
import UnVisibleicon from '../../../Icons/unvisible.png'


// react-router-dom components


// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
 const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const [notify, setNotify] = useState({ isOpen: false })
    const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



    const usenavigate=useNavigate();

    useEffect(()=>{
sessionStorage.clear();
    },[]);

    const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')
   const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            console.log('proceed');
               fetch("https://serdb.onrender.com/api/User/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    errorsound.play()
                   setNotify({ isOpen: true, message: 'Please Enter valid username!.',severity:"error",autoHideDuration:3000 });
                   
                } else {
                    if (resp.password === password) {
                       setNotify({ isOpen: true, message: 'Success.',severity:"success" });
                       
                        sessionStorage.setItem('username',username);
                        //sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/dashboards')

                    }else{
                        errorsound.play()
                       setNotify({ isOpen: true, message: 'Please Enter valid credentials!.',severity:"error",autoHideDuration:3000 });
                      
                    }
                }
            }).catch((err) => {
                 setNotify({ isOpen: true, message: 'Login Failed due to :' + err.message,severity:"error",autoHideDuration:3000 });
              
            });
        }
    }


    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={"username": username,"password": password};
            fetch("http://192.168.1.213:3001/User/",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                   // toast.error('Login failed, invalid credentials');
                }else{
                    // toast.success('Success');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                }
                // if (Object.keys(resp).length === 0) {
                //     toast.error('Please Enter valid username');
                // } else {
                //     if (resp.password === password) {
                //         toast.success('Success');
                //         sessionStorage.setItem('username',username);
                //         usenavigate('/')
                //     }else{
                //         toast.error('Please Enter valid credentials');
                //     }
                // }
            }).catch((err) => {
                //toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
              errorsound.play()
           setNotify({ isOpen: true, message: 'Enter username!.',severity:"error",autoHideDuration:3000 });
        }
        if (password === '' || password === null) {
            result = false;
              errorsound.play()
          setNotify({ isOpen: true, message: 'Enter  password!.',severity:"error",autoHideDuration:3000 });
        }
        return result;
    }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <PeopleAltRoundedIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <VerifiedUserRoundedIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <KeyRoundedIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} autocomplete="off">
          <MDBox component="form" onSubmit={handleSubmit} role="form"  >
            <MDBox mb={2} autocomplete="off">
              <MDInput 
               autocomplete="off"
              value={username} onChange={e => usernameupdate(e.target.value)}
             required
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            fullWidth 
              
              
              />
            </MDBox>
            <MDBox mb={2}>
                <MDInput 
              value={password} onChange={e => passwordupdate(e.target.value)}
                  autocomplete="off"
                   required
              fullWidth
           
              name="password"
              label="Password"
               id="password"
                   
                    type={showPassword ? 'text' : 'password'}
                     InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  //onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <img src={UnVisibleicon} /> : <img src={Visibleicon} />}
                </IconButton>
            </InputAdornment>
          ),
        }}
        
               />

              
            </MDBox>
           
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={ProceedLogin}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
         <Notification
                {...{ notify, setNotify }} />
    </BasicLayout>
  );
}

export default Basic;
