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

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import ThemeProvider from '../../../theme/index'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from '../../../layouts/Notification';
import { createAPIEndpoint, ENDPIONTS } from "../../../api/index";
//import { MuiOtpInput } from 'mui-one-time-password-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import Registericon from '../../../Icons/register.gif'
import Visibleicon from '../../../Icons/visible.png'
import UnVisibleicon from '../../../Icons/unvisible.png'
import * as userService from "../../../Services/userService";
// react-router-dom components
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import MDAvatar from 'components/MDAvatar';



//import './App.css';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {Toolbar} from '@mui/material';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import Badge from '@mui/material/Badge';
import TableCell from '@mui/material/TableCell';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import UpdateDisabledOutlinedIcon from '@mui/icons-material/UpdateDisabledOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import { Autocomplete } from '@mui/material';

import TableRow from '@mui/material/TableRow';

import Select from '../../../hooks/Select';
import RadioGroup from '../../../hooks/RadioGroup';
import DatePicker from '../../../layouts/DatePicker';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Search } from "@mui/icons-material";
import Popup from '../../../layouts/Popup';
import Rating from '@mui/material/Rating';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';

//import { TableBody, TableCell ,TableHead ,TableRow} from '@material-ui/core';
import Check from '@mui/icons-material/Check';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Order from '../../../components/Order/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConfirmDialog from '../../../layouts/ConfirmDialog';

import * as TownCity from "../../../Services/TownCity";
import useTable from './useTables';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
//import { FormControl } from '@material-ui/core';
//import { FormControlLabel } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { PRIMARY_URL} from '../../../api';
import { useForm, Form } from './useForm';
import Input from './Input';

import FullPopup from '../../../layouts/FullPopup';
import OrFo from '../../../components/Order/OrFo';
import { red, green ,blue} from '@mui/material/colors';
import { COLORS } from '../../../layouts/Colors';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

const Inputs = styled('input')({
  display: 'none',
});

const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));



function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{userService.customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(2.5);
  }
  `}`;
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const useStyles = makeStyles((theme) => ({
 
  icons:{
    cursor: 'pointer'
  }, 
  adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },

  pageContent: {
    margin: useTheme().spacing(5),
    padding: useTheme().spacing(3),
    
},
  roots: {
        minWidth: 0,
        margin: useTheme().spacing(0.2)
    },
root:{
    '& .MuiFormControl-root' :{
        width:'80%',
        margin:useTheme().spacing(1)
      
    }
},


table:{
  marginTop: useTheme().spacing(3),
  
  '& thead th': {
       //fontSize:'40',
       fontWeight: '900',
      color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
  },
  '& tbody td': {
      fontWeight: '300',
  },
  '& tbody tr:hover': {
      backgroundColor: '#f4f5fd',
      cursor: 'pointer',
  },
  pageContent:{
      margin:useTheme().spacing(5),
      padding:useTheme().spacing(3)

  },
},

menuButton: {
  marginRight: useTheme().spacing(2),
},
title: {
  flexGrow: 1,
},
newButton: {
  position: 'absolute',
  right: '1px'
  
},
searchInput: {
  width: '65%'
},
background: {
  default: "#f4f5fd"
},
}));

 


function Cover() {
  const styles= useStyles();
 const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
const [orderListVisibility, setOrderListVisibility] = useState(false);
const [orderListVisibilityEdit, setOrderListVisibilityEdit] = useState(false);

const [orderListVisibilityEdits, setOrderListVisibilityEdits] = useState(false);
const openListOfOrders = () => {
        setOrderListVisibility(true);
        resetForm()
    }

const openListOfOrdersEdit = () => {
        setOrderListVisibilityEdit(true);
    }

    const openListOfOrdersEdits = () => {
        setOrderListVisibilityEdits(true);
    }
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' ,variant:''})
  const [data, setData]=useState([]);
  

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })


  const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCells);




 
 
  

  
const navigate = useNavigate();
  const Fetchuser=()=>{
      createAPIEndpoint(ENDPIONTS.USER).primaryfetchAll()
   
    .then(response=>{
      setData(response.data);
    })
  }

  const Createuser=async()=>{
      createAPIEndpoint(ENDPIONTS.USER).primarycreate(values)
          
    .then(response=>{
      setData(data.concat(response.data))
      console.log(response.data)
      
      setOrderListVisibility(false);
      
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        severity: 'success',
        //variant:"filled"
    })
    })
        
    
  }

  const Updateuser=async()=>{
     createAPIEndpoint(ENDPIONTS.USER).primaryupdate(values.id,values)
   
    .then(response=>{
       Fetchuser();
      var dataNew=data;
       setOrderListVisibilityEdit(false);
       dataNew.forEach(users=>{
        if(values.id===users.id){
          users.fullName=values.fullName;
          users.mobile=values.mobile;
          users.city=values.city;
          users.aadhaarnumber=values.aadhaarnumber;
           users.pannumber=values.pannumber;
          users.hireDate=values.hireDate;
           users.gender=values.gender;
        }
      })
      setData(dataNew);
     setNotify({
        isOpen: true,
        message: 'Updated Successfully',
        severity:"info",
        //variant:"filled"

    })
    })
  }
const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);



    const openListOfOrdersFull = () => {
        setOrderListVisibilityFull(true);
    }
 


  

 const onDelete = id => {
        setConfirmDialog(false)
        
       createAPIEndpoint(ENDPIONTS.USER).primarydelete(id)
                   .then(res => {
                   Fetchuser();
                resetForm()
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
   
  }
  const EditOrRemove=(users)=>{
    setValues(users);
   openListOfOrdersEdit()
  }
const EditOrRemoves=(users)=>{
    setValues(users);
   openListOfOrdersEdits()
  }



  const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
               temp.fullName = fieldValues.fullName ? "" : "This field is required!"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required!"
      
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
     const {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        handleChangecode,
        resetForm
    } = useForm(userService.userRegister, true, validate);
const handleSubmit = e => {
        e.preventDefault()
         if(otp == 1100){
        if (validate()) {
            createAPIEndpoint(ENDPIONTS.USER).primarycreate(values)
          .then(response=>{
             setData(data.concat(response.data))
             //console.log(response.data)
              //setOrderListVisibility(false);
       setNotify({isOpen: true, message: 'Submitted Successfully', severity: 'success',
        //variant:"filled"
    })
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
  useEffect( () =>{
    Fetchuser();
 },[])

values.id = values.username
 const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: userService.defaultImageSrc
            })
        }
    }


 
 const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')

    
 const [otp, setOtp] = React.useState('')

  const handleChangeotp = (newValue) => {
    setOtp(newValue)
  }



 



  



  return (
    <CoverLayout image={bgImage}>
      <Card sx={{width:400}}>
        <MDBox
       
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={-5}
          p={4}
          mb={-5}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            <MDBox  mb={-0.5} mx={0.25} color="white">
              <Icon color="inherit" fontSize="inherit">
                favorite
              </Icon>
            </MDBox> WELCOME
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your Credentials to register
          </MDTypography>
        </MDBox>
 <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 ,pt:4, pb:3 ,px:3}}>
          <MDBox mb={3} mx={16}>
                <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values.imageSrc} sx={{ width: 80, height: 80 ,bgcolor: 'white'}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
      </StyledBadge>
       
                          <label htmlFor="image-uploader">
        <Inputs accept="image/*"  onChange={showPreview} id="image-uploader" type="file"  />
        <IconButton color="info" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                  </Stack> 
          </MDBox>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <Input
                name="username"
                label="USERNAME"
                fullWidth
                   error={errors.username}
                value={values.username}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>


              </Grid>
              <Grid item xs={12} sm={6}>
                
                <Input
                name="fullName"
                label="Full Name"
                fullWidth
                   error={errors.fullName}
                value={values.fullName}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                name="mobile"
                label="MOBILE"
                fullWidth
                   error={errors.mobile}
                value={values.mobile}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

          
              </Grid>
              <Grid item xs={12} sm={6}>
              <Input
                name="city"
                label="CITY"
                fullWidth
                   error={errors.city}
                value={values.city}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
              </Grid>
                <Grid item xs={12} >
           
           <Input
                name="email"
                label="EMAIL"
                fullWidth
                   error={errors.email}
                value={values.email}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
              </Grid>
                <Grid item xs={12} sm={10}>
              <RadioGroup
                name="gender"
               
                onChange={handleChange}
                row
                value={values.gender}
              items={userService.genderItems} /> 
              </Grid>
              
                <Grid item xs={12} >
              <Input
                name="password"
                label="PASSWORD"
                fullWidth
                   error={errors.password}
                value={values.password}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

         

          
              </Grid>
          {/*    <Grid item xs={12} sm={6}>
              <Input
                name="cpassword"
                label="CONFIRM PASSWORD"
                fullWidth
                   error={errors.cpassword}
                value={values.cpassword}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
        </Grid>*/}
            </Grid>
                 
          <MDTypography
              
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Registration Code
                </MDTypography>
     <OTPInput
 value={otp}
      onChange={handleChangeotp}
      autoFocus
      OTPLength={4}
      otpType="number"
      disabled={false}
      secure
    />
       <MDButton variant="gradient" color="info" fullWidth  type="submit"  sx={{ mt: 3, mb: 2 }}>
                sign up
              </MDButton>
            
           
            
         
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
        
          </Box>

      </Card>
      <Notification
        {...{ notify, setNotify }} />
    </CoverLayout>
  );
}

export default Cover;
