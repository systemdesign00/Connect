import  React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '../../theme/index'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from '../../layouts/Notification';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
//import { MuiOtpInput } from 'mui-one-time-password-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import Registericon from '../../Icons/register.gif'
import Visibleicon from '../../Icons/visible.png'
import UnVisibleicon from '../../Icons/unvisible.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
       Connect
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function Register() {
   const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
 const [phone, phonechange] = useState("");
   const [notify, setNotify] = useState({ isOpen: false })
 
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter the value in ';
        if (id === null || id === '') {
            isproceed = false;
             errorsound.play()
            setNotify({ isOpen: true, message: 'Enter  User Name!.',severity:"error",autoHideDuration:3000 });
        }

        if (password === null || password === '') {
            isproceed = false;
             errorsound.play()
             setNotify({ isOpen: true, message: 'Enter  Password!.',severity:"error",autoHideDuration:3000 });
        }

        if (name === null || name === '') {
            isproceed = false;
             errorsound.play()
           setNotify({ isOpen: true, message: 'Enter  Full Name!.',severity:"error",autoHideDuration:3000 });
        }
        
        if (phone === null || phone === '') {
            isproceed = false;
             errorsound.play()
            setNotify({ isOpen: true, message: 'Enter  Mobile Number!.',severity:"error",autoHideDuration:3000 });
        }

        return isproceed;
    }
 const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  let validotp = 1100;

    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { id, name, password, phone};
            if(otp == 1100){
                    if (IsValidate()) {
            //console.log(regobj);
            createAPIEndpoint(ENDPIONTS.USER).create(regobj)
                    .then(res => {
                        setNotify({ isOpen: true, message: 'Registered successfully.!.',severity:"success",autoHideDuration:3000 });
                toast.success('Registered successfully.')
                navigate('/');
                    
               }).catch((err) => {
                  setNotify({ isOpen: true, message: 'Failed :' + 'User Already Exists!',severity:"error",autoHideDuration:3000 });
                toast.error('Failed :' + err.message);
                errorsound.play()
                 })
        }
            }else{
                      setNotify({ isOpen: true, message: 'Invalid Security Registration!',severity:"error",autoHideDuration:3000 });
                            errorsound.play()
                    }
          
    }

    {
      /*ThemeProvider theme={defaultTheme}> */
    }
  return (
    <><ThemeProvider >
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
          <img src={Registericon} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handlesubmit} sx={{ mt: 4 }}  autocomplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={id} onChange={e => idchange(e.target.value)}
                  autocomplete="off"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                 <TextField
                 value={password} onChange={e => passwordchange(e.target.value)}
                  autocomplete="off"
                   required
              fullWidth
              name="password"
              label="Password"
               id="password"
                  autoFocus 
                    type={showPassword ? 'text' : 'password'}
                     InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <img src={UnVisibleicon} /> : <img src={Visibleicon} />}
                </IconButton>
            </InputAdornment>
          ),
        }}
           
                  />
                 
              
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={name} onChange={e => namechange(e.target.value)}
                  required
                  fullWidth
                  id="Fullname"
                  label="Full Name"
                  name="Fullname" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={phone} onChange={e => phonechange(e.target.value)}
                  required
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  id="mobile" />
              </Grid>
               <Grid item xs={12}>
{/*<MuiOtpInput value={otp} onChange={handleChange} /> */ }
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={5}>
   <Typography  color="green" gutterBottom>
      Registeration Code :
      </Typography>
  </Grid>
  <Grid item xs={6}>
     <OTPInput
 value={otp}
      onChange={handleChange}
      autoFocus
      OTPLength={4}
      otpType="number"
      disabled={false}
      secure
    />
  </Grid>
 
</Grid>



               </Grid>
   
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider><Notification
        {...{ notify, setNotify }} /></>
  );
}