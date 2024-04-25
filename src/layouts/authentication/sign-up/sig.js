import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {InputAdornment , Container,Button, TextField, IconButton ,Typography,Toolbar} from '@mui/material';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import Badge from '@mui/material/Badge';
import TableCell from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import UpdateDisabledOutlinedIcon from '@mui/icons-material/UpdateDisabledOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import { Autocomplete } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TableRow from '@mui/material/TableRow';
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
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
import Box from '@mui/material/Box';
//import { TableBody, TableCell ,TableHead ,TableRow} from '@material-ui/core';
import Check from '@mui/icons-material/Check';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Order from '../../../components/Order/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import ConfirmDialog from '../../../layouts/ConfirmDialog';
import Notification from "../../../layouts/Notification";
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
import { PRIMARY_URL ,createAPIEndpoint, ENDPIONTS} from '../../../api';
import { useForm, Form } from './useForm';
import Input from './Input';
import * as userService from "../../../Services/userService";
import FullPopup from '../../../layouts/FullPopup';
import OrFo from '../../../components/Order/OrFo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { red, green ,blue} from '@mui/material/colors';
import { COLORS } from '../../../layouts/Colors';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ConfirmPasswordDialog from './ConfirmPasswordDialog';
import MDAlert from 'components/MDAlert';

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

 


export default function User() {
 
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
} = useTable(data, filterFn,userService.headCellsuser);




 
 
    
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "admin")
                return items;
            else
                return items.filter(x => x.fullName.toLowerCase().includes(target.value) ||
                 x.mobile.toLowerCase().includes(target.value) ||  x.city.toLowerCase().includes(target.value))
                
        }
    })
}

  
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
const Updateuser = () => {
  createAPIEndpoint(ENDPIONTS.USER)
    .primaryupdate(values.id, values)
    .then((response) => {
      setOrderListVisibilityEdit(false);
      Fetchuser();
      if (response && response.success) {
        Fetchuser(); // Assuming Fetchuser is a function that fetches user data, adjust as needed

        const updatedData = data.map((user) =>
          user.id === values.id
            ? {
                ...user,
                id: values && values.username,
                fullName: values.fullName,
                mobile: values.mobile,
                city: values.city,
                email: values.email,
                username: values.username,
                password: values.password,
                hireDate: values.hireDate,
                gender: values.gender,
              }
            : user
        );

        setData(updatedData);

        setNotify({
          isOpen: true,
          message: 'Updated Successfully',
          severity: 'info',
        });
      } else {
        console.error('Update failed. Response:', response);
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
    });
};

  
  const Updateusers=async()=>{
     createAPIEndpoint(ENDPIONTS.USER).primaryupdate(values.userId,values)
   
    .then(response=>{
       Fetchuser();
      var dataNew=data;
       setOrderListVisibilityEdit(false);
       dataNew.forEach(users=>{
        if(values.userId===users.userId){
            users.id=values.username;
          users.fullName=values.fullName;
          users.mobile=values.mobile;
          users.city=values.city;
          users.email=values.email;
           users.username=values.username;
                users.password=values.password;
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
  {/*const Deleteuser=async()=>{
    await axios.delete(PRIMARY_URL+user.id)
    .then(response=>{
      setData(data.filter(users=>users.id!==user.id));
     setConfirmDialog(false)
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        severity: 'error',
        //variant:"filled"
    })
    })
  }*/}


  

 const onDeletes = id => {
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
const [isDialogOpen, setDialogOpen] = useState(false);
 const [password, setPassword] = useState('');
  const handleEditButtonClick = () => {
    setDialogOpen(true);
  };

  const handleConfirmPassword = () => {
    
    //alert('Data edited successfully!');
    setDialogOpen(false);
  };

  const handleAdditionalFunction = () => {
    openListOfOrdersEdit()
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
const resetPassword = () => {
    setPassword('');
    //password('')
  };
  const EditOrRemove=(users)=>{
    setValues(users);


   handleEditButtonClick()
  }

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [passwordd, setPasswordd] = useState('');
  const [id, setId] = useState(null); // Assuming 'id' is part of your component state

  const onDelete = (userId) => {
    setId(userId); // Set the 'id' before showing the confirmation dialog
    setIsConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    if (passwordd === '1100') {
      // Perform user deletion logic with the stored 'id'
      createAPIEndpoint(ENDPIONTS.USER)
        .primarydelete(id)
        .then((res) => {
          Fetchuser();
          resetForm();
        })
        .catch((error) => {
          setNotify({ isOpen: true, message: 'Deleting failed.', severity: 'warning' });
        });
    } else {
      // Handle incorrect password
      setNotify({ isOpen: true, message: 'Incorrect password. User not deleted.', severity: 'error' });
    }

    // Reset state
    setIsConfirmationVisible(false);
    setPasswordd('');
    setId(null);
  };

  const handleCancelDelete = () => {
    // Cancel the deletion process
    setIsConfirmationVisible(false);
    setPassword('');
    setId(null);
  };


const EditOrRemoves=(users)=>{
    setValues(users);
   openListOfOrdersEdits()
  }
  const [copySuccess, setCopySuccess] = useState('');

// your function to copy here

  const copyToClipBoard = async copyMe => {
    openListOfOrdersFull()
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };
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
        if (validate()) {
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
    }
  useEffect( () =>{
    Fetchuser();
 },[])


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
const resetImg = () =>{
  values.imageSrc = ''
}
  
const reset=()=>{
  document.getElementById("create-course-form").reset();
}

 
 const edited = "Pending";
  const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
       palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
    },
  },
      }),
    [], // [prefersDarkMode]
  );
  const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    let min = 1000;
    let max = 9999;
  const  getRandomNumber = () => Math.round(Math.random() * (max - min) + min).toString();
values.id= values.username
 values.joins = values.customerId + ' ' + '⤅' + values.fullName + ' ' + '⤅' + ' ' +  values.city + ' ' + '⤅' + ' ' + values.mobile;
 //values.customerId =values.fullName.charAt(0) + values.customerId;
 const helperText = "Once The Username is Registered You Cannot Change It!"; 
 return (

       <>
        <Dialog open={isConfirmationVisible} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm the deletion, please enter your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={passwordd}
            onChange={(e) => setPasswordd(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} sx={{color:'red'}}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        <ConfirmPasswordDialog
        open={isDialogOpen}   resetPassword={resetPassword}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmPassword}
        onPasswordConfirmed={handleAdditionalFunction}
          password={password} // Pass the password state to the ConfirmPasswordDialog
        setPassword={setPassword} // Pass the setPassword function to update the password state
      />
     
     <ThemeProvider theme={theme} >
      <CssBaseline />
          < >
      <Toolbar sx={{height:100}}>

        <TextField
          label="Search User"
          variant="outlined"
          className={styles.searchInput}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Search onClick={openListOfOrdersFull} />
            </InputAdornment>)
          }}
          onChange={handleSearch} />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="outlined"
          size="small"
          onClick={openListOfOrders}
          color="primary" className={styles.newButton} startIcon={<AddTaskOutlinedIcon />}>
          Add User
        </Button>

      </Toolbar>
      <Table className={styles.table}>
        <TblHead />

        <TableBody>
          {datas().map(users => (
            <TableRow key={users.id}>
              <TableCell>
                  <StyledAvatar src={users.imageSrc} sx={{ bgcolor: 'grey'}}>
                   <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='primary'>
                               {users.fullName.charAt(0)}
                                </Box>
                  </StyledAvatar>
              
              </TableCell>
              <TableCell>
                <Box fontWeight="fontWeightBold" fontSize={16}>{users.id}</Box>
               </TableCell>
              <TableCell >
                 <Box fontWeight="fontWeightBold" fontSize={16}>{users.fullName}</Box>
            </TableCell>
              <TableCell>
                  <Box fontWeight="fontWeightBold" fontSize={16}>{users.mobile}</Box>
                </TableCell>
          
              <TableCell onClick={() => copyToClipBoard(users.city)}>
                           <Box fontWeight="fontWeightBold" fontSize={16}>{users.city}</Box>
             </TableCell>
             
            
            <TableCell  > 
                 <Box fontWeight="fontWeightBold" fontSize={16}>{users.email}</Box>

          </TableCell>
             
              
           
       
              <TableCell>
                    
                           <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${styles.roots}`} style={{ backgroundColor: "#ABD1FF"}} 
                                           onClick={() => EditOrRemove(users)}>
                                             
                                            
                                                
                                                <AutoFixHighOutlinedIcon  fontSize="small"/>
                                                </Button>
                                            </ThemeProvider>
                

                &nbsp;&nbsp;
                 <ThemeProvider theme={redTheme}>
  <Button className={`${styles.roots}`} style={{  backgroundColor: '#ffbfbf'}} > 
  <DeleteSweepTwoToneIcon  fontSize="small" onClick={() => onDelete(users.id)} />
                                                </Button>
                                            </ThemeProvider>
                

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    

    </>
    <Popup
      title="New User"
      openPopup={orderListVisibility}
      setOpenPopup={setOrderListVisibility}>
 
         <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Input
             
           helperText={<FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>}
                name="username"
                label="User Name"
                fullWidth
                error={errors.username}
                value={values.username}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
    
              <Input
                label="Mobile"
                name="mobile"
                fullWidth
                   error={errors.mobile}
                  value={values.mobile}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
            
<Autocomplete
    
    options={TownCity.optionsss}
     freeSolo
     onChange={handleChange}
     value={values.city}
    renderInput={params => {
     
        const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
       
        
        return (
          <TextField
            {...params}
             name="city"
             //error={errors.customerId}
             value={values.city}
            inputProps={inputProps}
            
            label="City"  
            variant="outlined"
            onBlur={handleChange}
            fullWidth
            
          />
            );
      }
    }
/>
   
 <TextField
                label="Password"
                name="password"
                fullWidth
                  value={values.password}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
          <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
      </StyledBadge>
       
                          <label htmlFor="image-uploader">
        <Inputs accept="image/*"  onChange={showPreview} id="image-uploader" type="file"  />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                  </Stack> 
            </Grid>
            <Grid item xs={6}>
              {/*<Select
                name="status"
                label="Status"
                onChange={handleChange}
                  value={values.status}
                //value={values.departmentId}
                //onChange={handleInputChange}
        options={userService.getDepartmentCollection()} />*/}

         <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                  value={values.fullName}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
  
             <TextField
                label="Email"
                name="email"
                fullWidth
                  value={values.email}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
         <RadioGroup
                name="gender"
                label="Gender"
                onChange={handleChange}
                
                value={values.gender}
                //onChange={handleInputChange}
                items={userService.genderItems} /> 
         {/* <TextField
          hidden
                label="Joins"
                name="joins"
                fullWidth
                  value={values.joins}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} /> */ }
           <DatePicker
            id="hireDate" 
              orientation="landscape"
                        name="hireDate"
                        label="Hire Date"
                        inputFormat="dd/MM/yyyy"
                        value={values.hireDate}
                        onChange={handleChange}
                         renderInput={(params) => <TextField {...params} />}
                    />
     
           { 
/*
              <RadioGroup
                name="gender"
                label="Gender"
                onChange={handleChange}
                
                value={values.gender}
                //onChange={handleInputChange}
                items={userService.genderItems} /> */}

              <div>
                <Grid container spacing={2} >
  <Grid item > 
  
    <Button variant="contained"  startIcon={<SendTimeExtensionOutlinedIcon />}  type="submit">Submit</Button>
  </Grid>
  <Grid item >
     <Button variant="contained" startIcon={<RotateLeftOutlinedIcon />}  onClick={resetForm} >reset</Button>
  </Grid>
</Grid>
               
            
                
              </div>
            </Grid>
          </Grid>
        </Form>
      </Popup>
      <Popup
        title="Edit Profile"
        openPopup={orderListVisibilityEdit}
        setOpenPopup={setOrderListVisibilityEdit}>

        <form className={styles.root} id="create-course-form">
          <Grid container>
            <Grid item xs={6}>
              <TextField
              error
           helperText="Cannot Change Username!Need To Change Delete and Re-register Account"
                name="username"
                label="User Name"
                fullWidth
                onChange={handleChange}
                value={values && values.username} 
                  InputProps={{
                            readOnly: true,

            startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />

              <TextField
                label="Mobile"
                name="mobile"
                fullWidth
                onChange={handleChange}
                value={values && values.mobile}
                   InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />
            <Autocomplete
     options={TownCity.optionsss}
     freeSolo
     onChange={handleChange}
     value={values && values.city}
    renderInput={params => {
     const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
       return (
          <TextField
            {...params}
             name="city"
             //error={errors.customerId}
             value={values && values.city}
            inputProps={inputProps}
            
            label="City"  
            variant="outlined"
            onBlur={handleChange}
            fullWidth/>
            );
      }
    }
/>
            {/*  <TextField
                label="City"
                name="city"
                fullWidth
                onChange={handleChange}
                value={values && values.city}
                   InputProps={{
            startAdornment: <InputAdornment position="start"><LocationCityOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} /> */}
 <TextField
                label="Password"
                name="password"
                fullWidth
                onChange={handleChange}
                value={values && values.password}
                   InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />
           <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values && values.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
      </StyledBadge>
       
                          <label htmlFor="image-uploader">
        <Inputs accept="image/*"  onChange={showPreview} id="image-uploader" type="file"  />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
         <IconButton color="primary"  component="span" onClick={resetImg}>
          <RotateLeftOutlinedIcon/>
        </IconButton>
      </label>
                  </Stack> 
            </Grid>
            <Grid item xs={6}>
            {/*  <Select
                name="status"
                label="Status"
                onChange={handleChange}
                value={values && values.status}
                //value={values.departmentId}
                //onChange={handleInputChange}
        options={userService.getDepartmentCollection()} />*/}
 <TextField
                name="fullName"
                label="Full Name"
                fullWidth
                onChange={handleChange}
                value={values && values.fullName} 
                  InputProps={{
            startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />

                 <TextField
                label="Email"
                name="email"
                fullWidth
                onChange={handleChange}
                 value={values && values.email}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#9678b6'}}/></InputAdornment>,
          }} />
          <RadioGroup
                name="gender"
                label="Gender"
                onChange={handleChange}
                value={values && values.gender}
                //value={values.gender}
                //onChange={handleInputChange}
                items={userService.genderItems} />
              {/* <TextField
                label="Joins"
                name="joins"
                fullWidth
                onChange={handleChange}
                 value={values && values.joins}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#9678b6'}}/></InputAdornment>,
          }} /> */}
             <DatePicker
            id="hireDate" 
              orientation="landscape"
                        name="hireDate"
                        label="Hire Date"
                        inputFormat="dd/MM/yyyy"
                     value={values && values.hireDate}
                        onChange={handleChange}
                         renderInput={(params) => <TextField {...params} />}
                    />
           

            { /* <RadioGroup
                name="gender"
                label="Gender"
                onChange={handleChange}
                value={values && values.gender}
                //value={values.gender}
                //onChange={handleInputChange}
                items={userService.genderItems} />
     */}
              <div>
                <Button variant="contained" startIcon={<UpdateDisabledOutlinedIcon />} onClick={() => Updateuser()}>Update</Button>
               
              </div>
            </Grid>
          </Grid>
        </form>
      </Popup>
      <FullPopup
       openPopup={orderListVisibilityFull}
        setOpenPopup={setOrderListVisibilityFull}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      
   
    
<Order />

    </Container>
       
      
      </FullPopup>
     
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
        <Notification
        notify={notify}
        setNotify={setNotify} />
        
        </ThemeProvider>
         
        </>
     

    
  );
}


