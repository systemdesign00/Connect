import React, { useState, useEffect ,useMemo} from 'react'
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Form from "../../layouts/Form";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import BSelect from '../../hooks/BSelect';
import axios from 'axios';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import * as userService from "../../Services/userService";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from '@mui/material/Autocomplete';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Stack,Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//import Zoom from '@mui/material/Zoom';
import * as index from '../../api/index';
import DatePicker from '../../hooks/DatePicker';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
import { roundTo2DecimalPoint } from "../../utils/index";
import Notification from "../../layouts/Notification";
import Popup from '../../layouts/Popup';
import OrderList from './OrderList';
import {NumberFormat }from '../../Services/NumberFormat';
 /* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom  ref={ref} {...props} />;
});*/
import ListSubheader from '@mui/material/ListSubheader';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Image_placeholder from '../../img/image_placeholder.png'
import Avatarimg from '../../Icons/avatar.png'
import Cityimg from '../../Icons/city.png'
import Mobileimg from '../../Icons/mobile.png'
import Aadhaar from '../../Icons/aadhaar.png'
import Panimg from '../../Icons/pan.png'
import Payimg from '../../Icons/pay.png'
import Cashimg from '../../Icons/cash.png'
const Input = styled('input')({
  display: 'none',
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
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
export default function Newin(props) {
 const [open, setOpen] = React.useState(false);

  

  const handleClose = () => {
    setOpen(false);
  };
const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls,defaultImageSrc ,validate } = props;
   
    const [customerList, setCustomerList] = useState([]);
    const [customerListphone, setCustomerListPhone] = useState([]);

    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({ isOpen: false })

    useEffect(() => {
         createAPIEndpoint(ENDPIONTS.BOOKS).fetchAll()
             .then(res => {
                 let customerList = res.data.map(item => (
                     item.id,
                      item.fullName
                 ));
                 //customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                 setCustomerList(customerList);
             })
             .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.BOOKS).fetchAll()
             .then(res => {
                 let customerListphone = res.data.map(item => (
                     item.id,
                      item.mobile
                 ));
                 //customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                 setCustomerListPhone(customerListphone);
             })
             .catch(err => console.log(err))
     }, []) 
        
   useEffect(() => {
let newitemtotal = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) +  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + 
Number(values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) + Number(values.stockaddorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
Number(values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) + values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
let gsttotals = Number(Math.round((newitemtotal * 3)/100));
let gTotal = newitemtotal;
//let gTotal = newitemtotal - values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);
    // let scGst = (newitemtotal + gsttotals) 
     //let scGst = (newitemtotal + gsttotals) - values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);
        setValues({
            ...values,
            gTotal: Math.round(gTotal),
            //scGst: Math.round(scGst)
        }) 
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values.orderDetails),JSON.stringify(values.oldorderDetails),JSON.stringify(values.watageitems),JSON.stringify(values.addorderDetails),JSON.stringify(values.stockaddorderDetails),JSON.stringify(values.fancyitems),JSON.stringify(values.pieceitems)]);


    useEffect(() => {
        if (orderId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
                  //  errorsound.play(),
                  //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

let newitemtotal = Number(values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +  Number(values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) + 
Number(values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) + Number(values.stockaddorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
Number(values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) + values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
let gsttotals = Number(Math.round((newitemtotal * 3)/100));
let addorderedFoodItems = values.addorderDetails;
let stockaddorderedFoodItems = values.stockaddorderDetails;
let oldorderedFoodItems = values.oldorderDetails;
const hallmarkingcal = (stockaddorderedFoodItems.length * values.debitcash) + (addorderedFoodItems.length * values.debitcash);
const makingcal = Number(newitemtotal * values.onlinecash)/100;
let totalgst=  Number(newitemtotal + makingcal + (Number(hallmarkingcal))) 
//let totalgst=  Number(newitemtotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash))             
  const gstpertotal = Number((totalgst * 1.5)/100);
//{NumberFormat((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal)}
values.scGst = Math.round((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal);
let oldcal =  oldorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
values.status = NumberFormat(Number(Math.round(oldcal)))
let  cashtotal = Number(values.cashreceived) + Number(values.cashreceivedonline)
let ckba = Number(values.scGst - Number(Math.round(oldcal)))
values.balance = (Number(ckba) - Number(cashtotal)) + Number(values.amountdebit);
///values.balance = (Number(values.scGst) - Number(oldcal)) - (Number(values.cashreceived) + Number(values.cashreceivedonline))
    const validateForm = () => {
        let temp = {};
        temp.fullName = values.fullName != 0 ? "" : "This field is required!"
        //temp.mobile = values.mobile != "none" ? "" : "This field is required.";
        temp.mobile = values.mobile.length > 9 ? "" : "Minimum 10 numbers required!"
         temp.city = values.city != 0 ? "" : "This field is required.";
        //  temp.gCash = values.gCash != 0 ? "" : "This field is required.";
          //temp.status = values.status != 0 ? "" : "This field is required.";
        //temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        //temp.watageitems = values.watageitems.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }
const getFreshModelObject = () => {
                         values.fullName=''
                           values.mobile=''
                             values.city=''
                          searchSelectedCountry.fullName=""
                              searchSelectedCountry.mobile=""
                                  searchSelectedCountry.city=""
                                      searchSelectedCountry.gTotal=""
  }
    const resetForm = () => {
      getFreshModelObject()
        resetFormControls();
        setOrderId(0);
            setSelectedCountry("")
    }

const resetValues = () => {
  
  values.fullName = ""; // Set to the initial value or an empty string
  values.imageSrc = ""; // Set to the initial value or an empty string
  values.mobile = ""; // Set to the initial value or an empty string
  values.customerUID = ""; // Set to the initial value or an empty string
  values.city = ""; // Set to the initial value or an empty string
  values.pannumber = ""; // Set to the initial value or an empty string
  values.aadhaarnumber = ""; 
  values.imageSrc = "";// Set to the initial value or an empty string
   values.oldbillno = "";
    values.balance  = "";
      values.amountdebit  = "";
    values.oldgoldamount = "";
    values.oldgolditems = [];
    values.onlinecash = '';
    values.gCash ='';
    values.orderDetails = [];
    values.orderPercent = [];
    values.addorderDetails = [];
    values.oldorderDetails = [];
};
const handleResetClick = () => {
  // Reset the Autocomplete and other text fields
  setInputValue('');
  setSelectedBook(null);

  // Check if setValues is defined before using it
  if (setValues) {
    setValues((prevValues) => ({
      fullName: '',
      imageSrc: '',
      mobile: '',
      customerUID: '',
      city: '',
      pannumber: '',
      aadhaarnumber: '',
      imageSrc:'',
       balance:'',
      amountdebit:'',
      oldbillno:'',
      oldgoldamount:'',
      oldgolditems:[],
     onlinecash : '',
    gCash :'',
    orderDetails : [],
  oldorderDetails: [],
   addorderDetails : [],
   stockaddorderDetails : [],
      ...prevValues, // Include other fields from the existing state
    }));
  }
};
 const submitOrderreset = e => {
        e.preventDefault();
       
            if (values.id == 0) {
                createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).fetchAll()
                    .then(res => {
                      //audio.play()
                   
                      resetValues()
                         handleResetClick()
                      setNotify({ isOpen: true, message: 'Form Reseted...!',severity:"warning" });
                    }) .catch(err => console.log(err))
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            }
            else {
                createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).fetchAll
                    .then(res => {
                      //audioupdate.play()
                        //setOrderId(0);
                         //getFreshModelObject()
                        //setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                    })
                     .catch(err => console.log(err))
                   // .catch(
                 //errorsound.play(),
                    //  setNotify({ isOpen: true, message: "Error Updating Data",severity:"warning" ,variant:"filled"}));
            }
          }
    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.id == 0) {
                createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).create(values)
                    .then(res => {
                      audio.play()
                       resetValues()
                         handleResetClick()
                      
                      
                      // resetForm()
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            }
            else {
                createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).update(values.id, values)
                    .then(res => {
                      audioupdate.play()
                        setOrderId(0);
                         getFreshModelObject()
                        setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                    })
                     .catch(err => console.log(err))
                   // .catch(
                 //errorsound.play(),
                    //  setNotify({ isOpen: true, message: "Error Updating Data",severity:"warning" ,variant:"filled"}));
            }
        }

    }

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

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
                imageSrc: defaultImageSrc
            })
        }
    }
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/win11shutdown.mp3')
const audioupdate = new Audio('https://www.winhistory.de/more/winstart/mp3/wfw311.mp3')
const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')
const [countryState, setCountryState] = useState({
    loading: false,
    countries: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch spinner
        setCountryState({
          ...countryState,
          loading: true,
        });

        //  fetch data
        const dataUrl = index.BASE_URL+`books`;
        const response = await axios.get(dataUrl);
        setCountryState({
          ...countryState,
          countries: response.data,
          loading: false,
        });
      } catch (error) {
        setCountryState({
          ...countryState,
          loading: false,
          errorMessage: "Sorry Something went wrong",
        });
      }
    };

    fetchData();
  }, []);
  const { loading, errorMessage, countries } = countryState;
  console.log("loading", loading);
  console.log("countries", countries);
  console.log("errorMessage", errorMessage);
 const fit = countries.map((item) => item.joins )
  const [selectedCountry, setSelectedCountry] = useState(fit);
  console.log("selectedCountry", selectedCountry);

  const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => fit.filter((item) => containsText(item, searchText)),
    [searchText]
  );
  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((obj) => {
    if (obj.joins === selectedCountry) {
      return true;
    }
    return false;
  });
  console.log("searchSelectedCountry", searchSelectedCountry);
   

values.fullName = searchSelectedCountry &&   searchSelectedCountry.fullName || values.fullName
values.imageSrc = searchSelectedCountry &&   searchSelectedCountry.imageSrc  || values.imageSrc
values.mobile = searchSelectedCountry && searchSelectedCountry.mobile || values.mobile
values.customerUID = searchSelectedCountry && searchSelectedCountry.customerId || values.customerId
values.city = searchSelectedCountry &&searchSelectedCountry.city    || values.city
values.pannumber = searchSelectedCountry &&searchSelectedCountry.pannumber  || values.pannumber
values.aadhaarnumber = searchSelectedCountry &&searchSelectedCountry.aadhaarnumber  || values.aadhaarnumber 
const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`https://serdb.onrender.com/api/Books`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleInputChanges = (event, value) => {
    setInputValue(value);
  };

const handleSuggestionChange = (event, value) => {
    setSelectedBook(value);

    // Manually update other fields based on selectedBook
    setValues((prevValues) => ({
      ...prevValues,
      fullName: value?.fullName || prevValues.fullName,
      imageSrc: value?.imageSrc || prevValues.imageSrc,
      mobile: value?.mobile || prevValues.mobile,
      customerUID: value?.customerId || prevValues.customerUID,
      city: value?.city || prevValues.city,
      pannumber: value?.pannumber || prevValues.pannumber,
      aadhaarnumber: value?.aadhaarnumber || prevValues.aadhaarnumber,
        imageSrc: value?.imageSrc || prevValues.imageSrc,
    }));
  };
 // Step 4: Custom filter function for searching across multiple fields
const filterOptions = (options, { inputValue }) => {
  const inputValueLower = inputValue.toLowerCase();
  return options.filter((option) => {
    const fullName = option.fullName || '';
    const city = option.city || '';
    const mobile = option.mobile || '';
    const aadhaarnumber = option.aadhaarnumber || '';
     const pannumber = option.pannumber || '';
      const id = option.id || '';

    return (
      fullName.toLowerCase().includes(inputValueLower) ||
      city.toLowerCase().includes(inputValueLower) ||
      mobile.toLowerCase().includes(inputValueLower) ||
     aadhaarnumber.toLowerCase().includes(inputValueLower) ||
      pannumber.toLowerCase().includes(inputValueLower) ||
    (((id) + 0).toString(8)).padStart(3, '0').toString().toLowerCase().includes(inputValueLower) 
    );
  });
};

const renderOption = (props, option, { inputValue }) => {
  const matches = option.fullName.toLowerCase().includes(inputValue.toLowerCase())
    || option.city.toLowerCase().includes(inputValue.toLowerCase())
    || option.mobile.toLowerCase().includes(inputValue.toLowerCase())
    || option.id.toString().toLowerCase().includes(inputValue.toLowerCase());

  const highlightMatches = (text, inputValue) => {
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => (
          part.toLowerCase() === inputValue.toLowerCase() ? (
            <span key={index} style={{ fontWeight: 'bold', background: 'yellow' }}>
              {part}
            </span>
          ) : (
            <span key={index}>
              {part}
            </span>
          )
        ))}
      </span>
    );
  };

  return (
    <Box {...props}>
      <Typography variant="body1" component="div">
      {highlightMatches((((option.id) + 0).toString(8)).padStart(3, '0'), inputValue)} = {highlightMatches(option.fullName, inputValue)} - {highlightMatches(option.city, inputValue)} - {highlightMatches(option.mobile, inputValue)}
      </Typography>
    </Box>
  );
};

return (
        <>
            <Form onSubmit={submitOrder}>
                 {/*  <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        <Box   sx={{
           marginRight:1,
           marginLeft:1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}></Box>*/}
              <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                       <Card id="delete-account"
                       sx={{
                         backgroundImage: 'url("https://slidebazaar.com/wp-content/uploads/2022/05/white-background-ppt-SB02298.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
                       }}
                       >
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <Grid item xs="auto">

     <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                             <Avatar  src={Image_placeholder} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
                               </Avatar>
                                </Box>
             
      </Avatar>
      </StyledBadge>
        </Stack> 

    
  </Grid>
        <MDTypography variant="h6" fontWeight="medium" sx={{color:'black'}}>
          Customer Info
        </MDTypography>
     
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Autocomplete
    freeSolo
    size="small"
      options={suggestions}
      getOptionLabel={(option) => option.fullName}
      value={selectedBook}
        filterOptions={filterOptions}
      onChange={handleSuggestionChange}
      inputValue={inputValue}
      onInputChange={handleInputChanges}
      renderInput={(params) => (
        <TextField {...params} label="Select Customer" variant="outlined" fullWidth />
      )}
      renderOption={renderOption}
    />
<Box sx={{height:20}}></Box>
    <TextField 
               fullWidth
               size="small"
                  onChange={handleInputChange}
                            label="City"
                            name="city"
                            error={errors.city}
                            value={values.city}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={Cityimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
<Box sx={{height:20}}></Box>

<TextField 
               fullWidth
               size="small"
                  onChange={handleInputChange}
                            label="Pan Number"
                            name="pannumber"
                            error={errors.pannumber}
                            value={values.pannumber}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
                <img src={Panimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 

          </Grid>
          <Grid item xs={12} md={6}>
           <TextField 
           fullWidth
           size="small"
                
                 onChange={handleInputChange}
                            label="fullName"
                            name="fullName"
                            value={values.fullName}
                            error={errors.fullName}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={Avatarimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
<Box sx={{height:20}}></Box>
 <TextField fullWidth  size="small"
                       error={errors.mobile}
                        focused inputProps={{ inputMode: 'numeric' }} 
                       label="Mobile" name="mobile"
     id="mobile" value={values.mobile} onChange={handleInputChange}  InputProps={{
      startAdornment: (
        <InputAdornment position="start">
         <img src={Mobileimg} height={25}/>
        </InputAdornment>
      ),
    }} />
<Box sx={{height:20}}></Box>
    <TextField fullWidth  size="small"
                       error={errors.aadhaarnumber}
                        focused inputProps={{ inputMode: 'numeric' }} 
                       label="Aadhaar Number" name="aadhaarnumber"
     id="aadhaarnumber" value={values.aadhaarnumber} onChange={handleInputChange} 
     InputProps={{
      startAdornment: (
        <InputAdornment position="start">
            <img src={Aadhaar} height={25}/>
        </InputAdornment>
      ),
    }} />
          </Grid>
        </Grid>
      </MDBox>
    </Card>

  
           
                    </Grid>
       
<Grid item xs={6}>

   <Card id="delete-account"
    sx={{
    backgroundImage: 'url("https://slidebazaar.com/wp-content/uploads/2022/05/white-background-ppt-SB02298.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
                       }}
   >
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
         Payment Method
        </MDTypography>
        <Grid item xs="auto">

     <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
    <img width="60" height="55" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-payment-technology-ecommerce-flaticons-flat-flat-icons.png" alt="external-payment-technology-ecommerce-flaticons-flat-flat-icons"/>
      </StyledBadge>
        </Stack> 

    
  </Grid>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
           <TextField 
                fullWidth
                  inputProps={{ readOnly: true }}
                 size="small"
                            label="Grand Total"
                            name="scGst"
                        
                            value={NumberFormat(values.scGst)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
<Box sx={{height:20}}></Box>
    <TextField 
    error
    fullWidth
           size="small"
                //  onChange={handleInputChange}
                            label="Balance"
                            name="discou"
                            value={NumberFormat(values.balance)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
        <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
<Box sx={{height:20}}></Box>

<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
    
  <Grid container spacing={0.5}>

  <Grid item xs={6}>
   <ButtonGroup variant="outlined" aria-label="outlined button group">
 <ButtonGroup size="small" aria-label="small button group">
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Submit</Button>
   <Button
          size="small"
         aria-label="select merge strategy"
          aria-haspopup="menu"
        
        >
          <RotateLeftOutlinedIcon  onClick={ submitOrderreset }/>
        </Button>
      </ButtonGroup>
  <Box
          sx={{
         marginLeft: 2,
           
          }}
        ></Box>
  
 <Button size="small" variant="contained" onClick={openListOfOrders} style={{backgroundColor:'black'}}>View</Button>   

</ButtonGroup>
  </Grid>
  
</Grid> 
      </Grid>
 </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
           <TextField
            size="small"
             name="status"

              error={errors.status}
             //error={errors.customerId}
             value={values.status}
            label="Old Gold"  
            variant="outlined"
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
             <img src={Cashimg} height={25}/>
                </InputAdornment>
              ),
            }}
          />
<Box sx={{height:20}}></Box>
 <TextField 
    color='secondary'
               error
              size="small"
                  onChange={handleInputChange}
                  fullWidth
                            label="Amount Debit"
                            name="amountdebit"
                            value={values.amountdebit}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
          <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
<Box sx={{height:20}}></Box>
   

          </Grid>
        </Grid>
      </MDBox>
    </Card>
</Grid>
                </Grid>

            </Form>
             <Notification
                {...{ notify, setNotify }} />

                 <Popup
                title="OLD SILVER PURCHASE"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList
                    {...{ setOrderId, setOrderListVisibility, resetFormControls, setNotify }} />
            </Popup>
     
                <Dialog sx={{
                  
       
       bottom: 200
     }}
     disableEscapeKeyDown={false}
     
     disablebackdropclick
        open={open}
       // TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"ADD ITEM"}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <OrderList
                    {...{ setOrderId, setOrderListVisibility, resetFormControls, setNotify }} />
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}

