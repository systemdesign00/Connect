
//import './App.css';
import Order from '../../components/Order/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import UpdateDisabledOutlinedIcon from '@mui/icons-material/UpdateDisabledOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined'
import {Grid,InputAdornment,Autocomplete,Avatar,Stack,TextField,
IconButton,Typography,Container,Badge, Radio
} from '@mui/material';
import FullPopup from '../../layouts/FullPopup';
import Input from '../../components/Users/Input';
import RadioGroup from '../../hooks/RadioGroup';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { useNavigate } from "react-router-dom";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import { styled } from '@mui/material/styles';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Notification from "../../layouts/Notification";
import * as TownCity from "../../Services/TownCity";
import * as userService from "../../Services/userService";
import { PRIMARY_URL ,createAPIEndpoint, ENDPIONTS} from '../../api';
import { useForm, Form } from '../../components/Ventor/useForm';
import Popup from '../../layouts/Popup';
import Select from 'hooks/Select';
import CssBaseline from '@mui/material/CssBaseline';

import Card from "@mui/material/Card";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import axios from 'axios';

// Soft UI Dashboard React components
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';



// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import DatePicker from '../../layouts/DatePicker';

// @mui material components

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "../../context";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import DataTable from "examples/Tables/DataTable";
// Material Dashboard 2 React example components
import { COLORS } from '../../layouts/Colors';


import { createTheme, ThemeProvider } from '@mui/material/styles';



import { red, green ,blue} from '@mui/material/colors';
import { MonetizationOn } from '@mui/icons-material';

const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })

const Inputs = styled('input')({
  display: 'none',
});


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

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
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
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(2.0);
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
function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{userService.customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};
function Ventors() {
   const styles= useStyles();
    const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
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

  


  
const navigate = useNavigate();
  const Fetchuser=()=>{
      createAPIEndpoint(ENDPIONTS.VENTOR).primaryfetchAll()
   
    .then(response=>{
      setData(response.data);
    })
  }

  const Createuser=async()=>{
      createAPIEndpoint(ENDPIONTS.VENTOR).primarycreate(values)
          
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
     createAPIEndpoint(ENDPIONTS.VENTOR).updateventor(values.id,values)
   
    .then(response=>{
       Fetchuser();
      var dataNew=data;
       setOrderListVisibilityEdit(false);
       dataNew.forEach(users=>{
        if(values.id===users.id){
          users.fullName=values.fullName;
          users.mobile=values.mobile;
          users.city=values.city;
          users.secondarymobile=values.secondarymobile;
           users.balance=values.balance;
          users.status=values.status;
           users.notes=values.notes;
          users.hireDate=values.hireDate;
           users.type=values.type;
          users.acname=values.acname;
     users.acno=values.acno;
     users.isfccode=values.isfccode;
     users.branch=values.branch;
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
  const onDelete = id => {
        setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.VENTOR).deleteventor(id)
                   .then(res => {
                   Fetchuser();
                resetForm()
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }
const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);



    const openListOfOrdersFull = () => {
        setOrderListVisibilityFull(true);
    }
 

 
  const EditOrRemove=(users)=>{
    setValues(users);
   openListOfOrdersEdit()
  }
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
        resetForm
    } = useForm(userService.initialFValuesventor, true, validate);

const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            createAPIEndpoint(ENDPIONTS.VENTOR).createventor(values)
          
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

 values.joins = values.ventorId + ' ' + '⤅' + values.fullName + ' ' + '⤅' + ' ' +  values.city + ' ' + '⤅' + ' ' + values.mobile;

const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
     createAPIEndpoint(ENDPIONTS.VENTOR).fetchAll()
   
    .then(response=>{
      setData(response.data);
    })

   // fetchData();
  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <StyledAvatar  sx={{ bgcolor: 'grey'}}  src={image} name={name} size="sm" variant="rounded">
             
                  </StyledAvatar>
    
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
         <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {email}
          </MDTypography>
      
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="button" color="info" fontWeight="medium">
       📞 {description}
      </MDTypography>
      <MDTypography variant="caption" display="block" color="text"
      
      fontWeight="medium"> {title} </MDTypography>
    </MDBox>
  );
 
const columns = [
      { Header: "VENTORS", accessor: "author", width: "30%", align: "left" },
      { Header: "CONTACT", accessor: "function", align: "left" },
      { Header: "ID", accessor: "status", align: "center" },
      { Header: "TYPE", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ]

    const highlightSearchTerm = (text) => {
    if (!searchTerm) {
      return text;
    }

    const searchTermRegex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(searchTermRegex).map((part, index) => (
      searchTermRegex.test(part) ? <mark key={index}>{part}</mark> : part
    ));
  };
  const getBadgeColor = (type) => {
    switch (type) {
        case 'Gold':
            return 'error'; // Change this to the desired color for type1
        case 'Silver':
            return 'warning'; // Change this to the desired color for type2
        case 'Sterling Silver':
            return 'info'; // Change this to the desired color for type3
       // Change this to the desired color for type4
        default:
            return 'defaultColor'; // Change this to the default color if type is not matched
    }
};
const rows = data.filter((item) => {
    // Customize the conditions based on your data structure
    return (
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.secondarymobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (((item.id) + 0).toString(8)).padStart(3, '0').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }).map((item) => ( {
        author: <Author image={item.imageSrc} name={highlightSearchTerm(item.fullName)} email={highlightSearchTerm(item.secondarymobile)}/>,
        function: <Job title={highlightSearchTerm(item.city)} description={highlightSearchTerm(item.mobile)} />,
        status: (
          <MDBox ml={-1}>
            <MDBadge onClick={() => EditOrRemoves(item)} badgeContent={(((item.id) + 0).toString(8)).padStart(3, '0')} color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
           <MDBox ml={-1}>
            <MDBadge  badgeContent={item.type} color={getBadgeColor(item.type)}  size="sm" />
          </MDBox>
        ),
        action: (
          <>
<ThemeProvider theme={blueTheme}>
 <Button className={`${styles.roots}`} style={{ backgroundColor: "#ABD1FF"}}  onClick={() => EditOrRemove(item)}>
  <AutoFixHighOutlinedIcon  fontSize="small"  onClick={() => EditOrRemove(item)}/>
  </Button>
 </ThemeProvider>
                
                &nbsp;&nbsp;
                 <ThemeProvider theme={redTheme}>
  <Button className={`${styles.roots}`} style={{  backgroundColor: '#ffbfbf'}} > 
    <DeleteSweepTwoToneIcon  fontSize="small" 
    onClick={() => {
                    //deleteOrder(item.id)
                    setConfirmDialog({
                      isOpen: true,
                      //avatarimage:item.imageSrc,
                      title: 'Are you sure to delete this record?',
                       subTitle: 'Action Cannot be Reverted?' ,
                        onConfirm: () => { onDelete(item.id) }
                    });
                  } } 
    />
                                                </Button>
                                            </ThemeProvider>
      </>
        ),
      }))

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                //bgColor="info"
                bgColor={sidenavColor}
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  VENTOR INFO
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={3}
                >
                  <MDBox>
                    <MDButton
                      onClick={openListOfOrders}
                      variant="gradient"
                      color={sidenavColor}
                      fullWidth
                      startIcon={
                        <AddTaskOutlinedIcon onClick={openListOfOrders} />
                      }
                    >
                      Add
                    </MDButton>
                  </MDBox>

                  <MDBox width="12rem" ml="auto">
                    <MDInput
                      type="text"
                      placeholder="Search Ventor"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </MDBox>
                </MDBox>

                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  canSearch={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Popup
        title="New Ventor"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              <Input
                name="fullName"
                label="Ventor Name"
                fullWidth
                error={errors.fullName}
                value={values.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonAddAltOutlinedIcon style={{ color: "#007FFF" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Input
                type="number"
                label="Mobile"
                name="mobile"
                fullWidth
                error={errors.mobile}
                value={values.mobile}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInTalkOutlinedIcon style={{ color: "#007FFF" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Autocomplete
                options={TownCity.optionsss}
                //options={userService.optionsss}
                freeSolo
                onChange={handleChange}
                value={values.city}
                renderInput={(params) => {
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
                }}
              />
              <Autocomplete
                options={userService.gettype}
                //options={userService.optionsss}
                freeSolo
                onChange={handleChange}
                value={values.type}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = "off";
                  return (
                    <TextField
                      {...params}
                      name="type"
                      //error={errors.customerId}
                      value={values.type}
                      inputProps={inputProps}
                      label="Type"
                      variant="outlined"
                      onBlur={handleChange}
                      fullWidth
                    />
                  );
                }}
              />

              <Stack direction="row" alignItems="center" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    src={values.imageSrc}
                    sx={{ width: 50, height: 50, bgcolor: "white" }}
                  >
                    <img src="https://img.icons8.com/fluency/65/image.png" />
                  </Avatar>
                </StyledBadge>

                <label htmlFor="image-uploader">
                  <Inputs
                    accept="image/*"
                    onChange={showPreview}
                    id="image-uploader"
                    type="file"
                  />
                  <IconButton
                    color="info"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={userService.gettypestatus}
                //options={userService.optionsss}
                freeSolo
                onChange={handleChange}
                value={values.status}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = "off";
                  return (
                    <TextField
                      {...params}
                      name="status"
                      //error={errors.customerId}
                      value={values.status}
                      inputProps={inputProps}
                      label="Status"
                      variant="outlined"
                      onBlur={handleChange}
                      fullWidth
                    />
                  );
                }}
              />
              <TextField
                //  size='small'
                label="GSTIN"
                name="secondarymobile"
                fullWidth
                value={values.secondarymobile}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInTalkOutlinedIcon style={{ color: "#007FFF" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                // size='small'
                label="Balance"
                name="balance"
                fullWidth
                value={values.balance}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceOutlinedIcon
                        style={{ color: "#007FFF" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* <TextField
          hidden
                label="Joins"
                name="joins"
                fullWidth
                  value={values.joins}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} /> */}
              <TextField
                size="small"
                multiline
                label="Notes"
                name="notes"
                fullWidth
                value={values.notes}
                onChange={handleChange}
              />

              <div>
                <Grid container spacing={2}>
                  <Grid item>
                    <MDBox pt={2}>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                      >
                        <MDBox>
                          <MDButton
                            type="submit"
                            variant="gradient"
                            color="info"
                            //color={sidenavColor}
                            fullWidth
                            startIcon={<SendTimeExtensionOutlinedIcon />}
                          >
                            Add Ventor
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Grid>
                  <Grid item>
                    <MDBox pt={2}>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                      >
                        <MDBox>
                          <MDButton
                            onClick={resetForm}
                            variant="gradient"
                            color="info"
                            //color={sidenavColor}
                            fullWidth
                            startIcon={
                              <RotateLeftOutlinedIcon onClick={resetForm} />
                            }
                          >
                            Reset
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <br />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {" "}
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <MonetizationOn color="info" />
                  </Grid>
                  <Grid item xs="auto">
                    BANK INFO
                  </Grid>
                </Grid>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="Account Holder Name"
                    name="acname"
                    fullWidth
                    value={values.acname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    type="number"
                    label="Account No"
                    name="acno"
                    fullWidth
                    value={values.acno}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="ISFC Code"
                    name="isfccode"
                    fullWidth
                    value={values.isfccode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="Account Branch"
                    name="branch"
                    fullWidth
                    value={values.branch}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Form>
      </Popup>
      <Popup
        title="Edit Customer"
        openPopup={orderListVisibilityEdit}
        setOpenPopup={setOrderListVisibilityEdit}
      >
        <form className={styles.root} id="create-course-form">
          <Grid container>
            <Grid item xs={6}>
              <TextField
                name="fullName"
                label="Ventor Name"
                fullWidth
                onChange={handleChange}
                value={values && values.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonAddAltOutlinedIcon style={{ color: "#9678b6" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Mobile"
                name="mobile"
                fullWidth
                onChange={handleChange}
                value={values && values.mobile}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInTalkOutlinedIcon style={{ color: "#9678b6" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                options={TownCity.optionsss}
                freeSolo
                onChange={handleChange}
                value={values && values.city}
                renderInput={(params) => {
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
                      fullWidth
                    />
                  );
                }}
              />
              <Autocomplete
                options={userService.gettype}
                //options={userService.optionsss}
                freeSolo
                onChange={handleChange}
                value={values && values.type}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = "off";
                  return (
                    <TextField
                      {...params}
                      name="type"
                      //error={errors.customerId}
                      value={values && values.type}
                      inputProps={inputProps}
                      label="Type"
                      variant="outlined"
                      onBlur={handleChange}
                      fullWidth
                    />
                  );
                }}
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

              <Stack direction="row" alignItems="center" spacing={2}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    src={values && values.imageSrc}
                    sx={{ width: 50, height: 50, bgcolor: "white" }}
                  >
                    <img src="https://img.icons8.com/fluency/65/image.png" />
                  </Avatar>
                </StyledBadge>

                <label htmlFor="image-uploader">
                  <Inputs
                    accept="image/*"
                    onChange={showPreview}
                    id="image-uploader"
                    type="file"
                  />
                  <IconButton
                    color="info"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={userService.gettypestatus}
                //options={userService.optionsss}
                freeSolo
                onChange={handleChange}
                value={values && values.status}
                renderInput={(params) => {
                  const inputProps = params.inputProps;
                  inputProps.autoComplete = "off";
                  return (
                    <TextField
                      {...params}
                      name="status"
                      //error={errors.customerId}
                      value={values && values.status}
                      inputProps={inputProps}
                      label="Status"
                      variant="outlined"
                      onBlur={handleChange}
                      fullWidth
                    />
                  );
                }}
              />

              <TextField
                label="GSTIN"
                name="secondarymobile"
                fullWidth
                value={values && values.secondarymobile}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneInTalkOutlinedIcon style={{ color: "#007FFF" }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Balance"
                name="balance"
                fullWidth
                value={values && values.balance}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBalanceOutlinedIcon
                        style={{ color: "#007FFF" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                multiline
                label="Notes"
                name="notes"
                fullWidth
                value={values && values.notes}
                onChange={handleChange}
              />
              {/* <TextField
                label="Joins"
                name="joins"
                fullWidth
                onChange={handleChange}
                 value={values && values.joins}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#9678b6'}}/></InputAdornment>,
          }} /> */}
              <div>
                <MDBox p={2} width="50%">
                  <MDButton
                    onClick={() => Updateuser()}
                    variant="gradient"
                    color={sidenavColor}
                    fullWidth
                    startIcon={
                      <UpdateDisabledOutlinedIcon
                        onClick={() => Updateuser()}
                      />
                    }
                  >
                    Update
                  </MDButton>
                </MDBox>
              </div>
            </Grid>
          </Grid>
          <br />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {" "}
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <MonetizationOn color="info" />
                  </Grid>
                  <Grid item xs="auto">
                    BANK INFO
                  </Grid>
                </Grid>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="Account Holder Name"
                    name="acname"
                    fullWidth
                    value={values && values.acname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="Account No"
                    name="acno"
                    fullWidth
                    value={values && values.acno}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="ISFC Code"
                    name="isfccode"
                    fullWidth
                    value={values && values.isfccode}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    multiline
                    label="Account Branch"
                    name="branch"
                    fullWidth
                    value={values && values.branch}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </form>
      </Popup>
      <FullPopup
        openPopup={orderListVisibilityFull}
        setOpenPopup={setOrderListVisibilityFull}
      >
        <Container
          justifycontent="center"
          style={{ paddingBottom: 20 }}
          maxWidth="xd"
        >
          <Order />
        </Container>
      </FullPopup>
      <Popup
        title="Ventor Details"
        openPopup={orderListVisibilityEdits}
        setOpenPopup={setOrderListVisibilityEdits}
      >
        <Grid container spacing={30}>
          <Grid item xs="auto">
            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"Full Name : "}
              {values && values.fullName}
            </MDTypography>
            <Div></Div>
            <Div></Div>
            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"City : "}
              {values && values.city}
            </MDTypography>
            <Div></Div>
            <Div></Div>
            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"Mobile Number: "}
              {values && values.mobile}
            </MDTypography>
          </Grid>
          <Grid item xs="auto">
            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"GSTIN : "}
              {values && values.secondarymobile}
            </MDTypography>
            <Div></Div>
            <Div></Div>
            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"Status : "}
              {values && values.status}
            </MDTypography>
            <Div></Div>
            <Div></Div>

            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              {"Balance : "}
              {"$"}
              {values && values.balance}
              {"/-"}
            </MDTypography>
            <Div></Div>
            <Div></Div>

            <MDTypography
              display="block"
              variant="button"
              color="info"
              fontWeight="medium"
            ></MDTypography>
          </Grid>
        </Grid>
        <MDTypography
          display="block"
          variant="button"
          color="info"
          fontWeight="medium"
        >
          {"Notes : "}
          {values && values.notes}
        </MDTypography>
        <Div></Div>
        <Div></Div>

        <Grid spacing={16}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {" "}
                <Grid container spacing={2}>
                  <Grid item xs="auto">
                    <PersonAddAltOutlinedIcon color="primary" />
                  </Grid>
                  <Grid item xs="auto">
                    BANK INFO
                  </Grid>
                </Grid>{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={30}>
                <Grid item xs="auto">
                  <MDTypography
                    display="block"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                  >
                    {"Account Holder Name : "}
                    {values && values.acname}
                  </MDTypography>
                  <Div></Div>
                  <Div></Div>
                  <MDTypography
                    display="block"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                  >
                    {"Account number : "}
                    {values && values.acno}
                  </MDTypography>
                  <Div></Div>
                  <Div></Div>
                  <MDTypography
                    display="block"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                  >
                    {"ISFC Code : "}
                    {values && values.isfccode}
                  </MDTypography>
                  <Div></Div>
                  <Div></Div>
                  <MDTypography
                    display="block"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                  >
                    {"Branch : "}
                    {values && values.branch}
                  </MDTypography>
                  <Div></Div>
                  <Div></Div>
                </Grid>
                <Grid item xs="auto">
                  <Avatar
                    src={values && values.imageSrc}
                    variant="rounded"
                    sx={{ height: 150, width: 150 }}
                  >
                    <img src="https://img.icons8.com/fluency/65/image.png" />
                  </Avatar>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </DashboardLayout>
  );
}

export default Ventors;
