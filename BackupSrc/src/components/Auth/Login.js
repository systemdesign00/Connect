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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '../../theme/index'
import { useNavigate ,Link} from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiAlert from '@mui/material/Alert';
import Notification from '../../layouts/Notification';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
import Loginicon from '../../Icons/login.gif'
import Visibleicon from '../../Icons/visible.png'
import UnVisibleicon from '../../Icons/unvisible.png'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login(props) {

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
                        usenavigate('/Home')

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
            fetch("https://localhost:3001/User/",{
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
       
            <img src={Loginicon} />
       
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
            <TextField
            
              value={username} onChange={e => usernameupdate(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus />

             <FormControl fullWidth>
          <InputLabel >Password</InputLabel>
            <OutlinedInput
              value={password} onChange={e => passwordupdate(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
               id="password"
              
              type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                {showPassword ? <img src={UnVisibleicon} /> : <img src={Visibleicon} />}
                </IconButton>
              </InputAdornment>
            }
              />
             </FormControl>

            <Button
              onClick={ProceedLogin}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link to={'/register'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider> 
    
    <Notification
                {...{ notify, setNotify }} /></>
  );
}