import React, { useState, useEffect ,useMemo} from 'react'
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Form from "../../layouts/Form";
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import * as index from '../../api/index';
//import Select from '@mui/material/Select';
import  Snackbar  from "@mui/material/Snackbar";
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//import Zoom from '@mui/material/Zoom';
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
import Select from '@mui/material/Select';
import CSelect from '../../hooks/Select';
import * as userService from "../../Services/userService";
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
export default function Pendingform(props) {
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
 values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);

 let  Equity = Number(values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
         values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
        let gTotal = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) +  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + 
 values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
        // let gTotal = Number(newitemtotal) - Number(Equity)
  let purchase =  values.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0) + values.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0); 

   let cashfiness = values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
   let adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0) + Number(cashfiness) 
   let netbalance = (Number(purchase) - Number(adjustfiness)).toFixed(3)
   setValues({
            ...values,
            gTotal: Math.round(gTotal),
            purchasewt:Number(purchase).toFixed(3),
            pannumber:Number(adjustfiness).toFixed(3),
            balance:Number(netbalance).toFixed(3)
        }) 
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values.orderDetails),JSON.stringify(values.oldorderDetails),JSON.stringify(values.watageitems),JSON.stringify(values.fancyitems),JSON.stringify(values.ratecutitems),JSON.stringify(values.pieceitems)]);

/*

    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            //return tempTotal + (item.tax / 100) * (item.quantity * item.foodItemPrice) + (item.quantity * item.foodItemPrice);
         return tempTotal + (item.quantity * item.foodItemPrice);
          }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);  
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values.orderDetails)]);
*/
    useEffect(() => {
        if (orderId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPIONTS.PURCHASE).fetchById(orderId)
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
/*const validateForm = (fieldValues = values) => {
    let temp = { ...errors }

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required."


    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile ? "" : "This field is required."
        
 //temp.orderDetails = fieldValues.orderDetails.length !== 0 ? "" : "This field is required.";
 //temp.watageitems = fieldValues.watageitems.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp
    });
     return Object.values(temp).every(x => x === "");
  } */
  /*
    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId !== 0 ? "" : "This field is required.";
        temp.pMethod = values.pMethod !== "none" ? "" : "This field is required.";
        temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }*/
    const [alignment, setAlignment] = React.useState('InGots');

    const handleChanges = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

   

  const handleClick = (copyMe) => {
    setOpens(true);
    navigator.clipboard.writeText(copyMe)
  };


  const [opens, setOpens] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');

    // your function to copy here
    
      const copyToClipBoard = async copyMe => {
        setOpens(true);
        try {
          await navigator.clipboard.writeText(copyMe);
          setCopySuccess('Copied!');
        } catch (err) {
          setCopySuccess('Failed to copy!');
        }
      };
    const validateForm = () => {
        let temp = {};
        temp.shopName = values.shopName != 0 ? "" : "This field is required!"
        temp.status = values.status != 0 ? "" : "This field is required!"
        //temp.mobile = values.mobile != "none" ? "" : "This field is required.";
        //temp.mobile = values.mobile !=0 ? "" : "Minimum 10 numbers required!"
        // temp.city = values.city != 0 ? "" : "This field is required.";
         // temp.gCash = values.gCash != 0 ? "" : "This field is required.";
        //temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        //temp.watageitems = values.watageitems.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }
const getFreshModelObject = () => {
                         values.shopName=''
                           values.mobile=''
                             values.city=''
                          searchSelectedCountry.shopName=""
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

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.id == 0) {
                createAPIEndpoint(ENDPIONTS.PURCHASE).create(values)
                    .then(res => {
                      audio.play()
                      resetFormControls();
                      
                      
                      // resetForm()
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            }
            else {
                createAPIEndpoint(ENDPIONTS.PURCHASE).update(values.id, values)
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
        const dataUrl = index.BASE_URL+`ventors`;
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
   let  Equity = Number(values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
         values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  console.log("searchSelectedCountry", searchSelectedCountry);
   let totalcash =  (Number(values.cashreceived));

values.shopName = searchSelectedCountry &&  searchSelectedCountry.fullName || values.shopName
values.imageSrc = searchSelectedCountry &&   searchSelectedCountry.imageSrc  || values.imageSrc
values.mobile = searchSelectedCountry && searchSelectedCountry.mobile || values.mobile
values.customerUID = searchSelectedCountry && searchSelectedCountry.customerId || values.customerId
values.city = searchSelectedCountry &&searchSelectedCountry.city    || values.city
//values.pannumber = searchSelectedCountry &&searchSelectedCountry.pannumber  || values.pannumber
values.aadhaarnumber = searchSelectedCountry &&searchSelectedCountry.aadhaarnumber  || values.aadhaarnumber   
values.Purebalance = (Number(values.purchasewt)+Number(values.cashreceivedonline) - (Number(values.pannumber) + Number(values.onlinecash))).toFixed(3);

    return (
        <>
             <Form onSubmit={submitOrder}>
                   <Box
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
          }}></Box>
                <Grid container>
                    <Grid item xs={6}>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
   <FormControl size="small" fullWidth>
          <InputLabel id="search-select-label">Select Customer</InputLabel>
        <Select
        
         MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              getContentAnchorEl: null
            }}
          labelId="search-select-label"
          id="search-select"
         
             value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
          label="Select Item"
          renderValue={() => selectedCountry}
          //label="Options"
          
          onClose={() => setSearchText("")} >
        
          <ListSubheader>
            <TextField
              size="small"
              
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  </Grid>
  <Grid item xs={6}>
    <TextField 
               style ={{width: '90%'}}
                size="small"
                 onChange={handleInputChange}
                            label="shopName"
                            name="shopName"
                            value={values.shopName}
                            error={errors.shopName}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
           <img src={Avatarimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
  </Grid>
  
</Grid>   
  <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
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
  </Grid>
  
  
    <Grid item xs={5.5}>
    <TextField fullWidth 
                       error={errors.mobile}
                       size="small" focused inputProps={{ inputMode: 'numeric' }} 
                       label="Mobile" name="mobile"
     id="mobile" value={values.mobile} onChange={handleInputChange}    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
           <img src={Mobileimg} height={25}/>
        </InputAdornment>
      ),
    }} />

   
 </Grid>

  
 <Grid item xs={12}>
                    
  <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
    <CSelect
    fullWidth
    error={errors.status}
                name="status"
                label="Status"
                onChange={handleInputChange}
                  value={values.status}
                //value={values.departmentId}
                //onChange={handleInputChange}
                options={userService.getDepartmentCollection()} 
                />

  </Grid>
  <Grid item xs={5.5}>
  <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChanges}
      aria-label="Platform"
    >
      <ToggleButton value="InGots">InGots</ToggleButton>
      <ToggleButton value="Cash">Cash</ToggleButton>
    
    </ToggleButtonGroup>
 {/*<TextField fullWidth 
                       error={errors.aadhaarnumber}
                       size="small" focused inputProps={{ inputMode: 'numeric' }} 
                       label="Aadhaar Number" name="aadhaarnumber"
     id="aadhaarnumber" value={values.aadhaarnumber} onChange={handleInputChange} 
     InputProps={{
      startAdornment: (
        <InputAdornment position="start">
           <img src={Aadhaar} height={25}/>
        </InputAdornment>
      ),
    }} />*/}
   
  </Grid>
  
</Grid>
                    </Grid>
  
    
   
  

    
    
  
  
</Grid>
                    </Grid>
    {
      alignment === "InGots" ? 
      
<Grid item xs={6}>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
  <TextField 
                fullWidth
                  inputProps={{ readOnly: true }}
                size="small"
                            label="Net Purchase WT"
                            name="purchasewt"
                        
                          value={(Number(values.purchasewt)+Number(values.cashreceivedonline)).toFixed(3)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
      
      
  </Grid>
  <Grid item xs={4}>
    <TextField 
              fullWidth
              inputProps={{ readOnly: true }}
                size="small"
                  onChange={handleInputChange}
                            label="Net Equity WT"
                            name="pannumber"
                            //error={errors.pannumber}
                            value={(Number(values.pannumber) + Number(values.onlinecash)).toFixed(3)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
     
        

</Grid>
  <Grid item xs={4}>
  <TextField 
  onClick={() => copyToClipBoard((Number(values.purchasewt)+Number(values.cashreceivedonline) - (Number(values.pannumber) + Number(values.onlinecash))).toFixed(3))}
    error
    fullWidth
    inputProps={{ readOnly: true }}
                size="small"
                //  onChange={handleInputChange}
                            label="Balance WT"
     value={(Number(values.purchasewt)+Number(values.cashreceivedonline) - (Number(values.pannumber) + Number(values.onlinecash))).toFixed(3)}
          //value={Number(values.balance).toFixed(3)}
   // value={(Number(values.balance) - (Number(values.cashreceivedonline))).toFixed(3)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />   
   </Grid>
</Grid>
<Snackbar
        message="Copied "
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={() => setOpens(false)}
        open={opens}
      />
        
               
                      <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
    
      
      </Grid>
  <Grid item xs={4}>
  <TextField 
    error
             fullWidth
                size="small"
                onChange={handleInputChange}
                            label="PURCHASE OB"
                            name="onlinecash"
                            value={values.onlinecash}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
 


   
   
  </Grid>
  <Grid item xs={4}>

  <TextField 
    error
             fullWidth
                size="small"
                onChange={handleInputChange}
                            label="OPENING BALANCE"
                            name="cashreceivedonline"
                            value={values.cashreceivedonline}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
   
  </Grid>
</Grid>

  <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
    
  <Grid container spacing={0.5}>
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
  <Grid item xs={6}>
   <ButtonGroup variant="outlined" aria-label="outlined button group">
 <ButtonGroup size="small" aria-label="small button group">
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Submit</Button>
   <Button
          size="small"
         aria-label="select merge strategy"
          aria-haspopup="menu"
        
        >
          <RotateLeftOutlinedIcon  onClick={ resetFormControls }/>
        </Button>
      </ButtonGroup>
  <Box
          sx={{
         marginLeft: 1,
           
          }}
        ></Box>
  
 <Button size="small" variant="contained" onClick={openListOfOrders} style={{backgroundColor:'black'}}>View</Button> 

</ButtonGroup>
  </Grid>
  
</Grid> 
      </Grid>
  <Grid item xs={4}>
 
        
   
  </Grid>
  <Grid item xs={4}>
   {/*openning balance field */}
        
    
   
  </Grid>
</Grid>
     
     
             
                   
                    </Grid> :

<Grid item xs={6}>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
 
      
      
  </Grid>
  <Grid item xs={4}>
  
     
        

</Grid>
  <Grid item xs={4}>

   </Grid>
</Grid>
                    
               
                      <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
    
       <TextField 
    color='secondary'
              error
              fullWidth
               //color='success'
               focused
                size="small"
                  onChange={handleInputChange}
                            label="Net Cash"
                            //name="gCash"
                              //error={errors.gCash}
                            value={NumberFormat(values.gTotal)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
      </Grid>
  <Grid item xs={4}>
 {/* 
  <TextField 
  fullWidth
    color='secondary'
               error
                size="small"
                  onChange={handleInputChange}
                  label="Amount Debit"
                            name="onlinecash"
                            value={values.onlinecash}
      /> */}
<TextField 
  fullWidth
    color='secondary'
               error
                size="small"
                  onChange={handleInputChange}
                  label="Net Equity Cash"
                    //name="onlinecash"
                   value={NumberFormat(Math.round(Equity))}
                   InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                       <img src={Cashimg} height={25}/>
                      </InputAdornment>
                    ),
                  }}
      /> 
  

   
   
  </Grid>
  <Grid item xs={4}>
  <TextField 
    color='secondary'
               error
                size="small"
                  onChange={handleInputChange}
                  fullWidth
                            label="Balance "
                            name="amountdebit"
                               value={NumberFormat((Number(values.gTotal)) - Number(Equity) -(-Number(values.cashreceived)))}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} />  
    
        
    
   
  </Grid>
</Grid>

  <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
    
  <Grid container spacing={0.5}>
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
  <Grid item xs={6}>
   <ButtonGroup variant="outlined" aria-label="outlined button group">
 <ButtonGroup size="small" aria-label="small button group">
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Submit</Button>
   <Button
          size="small"
         aria-label="select merge strategy"
          aria-haspopup="menu"
        
        >
          <RotateLeftOutlinedIcon  onClick={ resetFormControls }/>
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
  <Grid item xs={4}>
  
   
  </Grid>
  <Grid item xs={4}>
  <TextField 
      color='secondary'
      fullWidth
              // color='error'
               focused
                size="small"
                  onChange={handleInputChange}
                 
                            label="Cash [Debit]"
                            name="cashreceived"
                            value={values.cashreceived}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={Cashimg} height={25}/>
            </InputAdornment>
          ),
        }} /> 
    
   
  </Grid>
</Grid>
     
     
             
                   
                    </Grid>
}
                </Grid>
            </Form>
             <Notification
                {...{ notify, setNotify }} />

                 <Popup
                title="Pending"
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
