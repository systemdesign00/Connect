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
import Select from '@mui/material/Select';
import axios from 'axios';
import BSelect from '../../hooks/BSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
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
import * as userService from "../../Services/userService";
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
import OrderListitem from './OrderListitem';
import {NumberFormat }from '../../Services/NumberFormat';
 /* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom  ref={ref} {...props} />;
});*/
import ListSubheader from '@mui/material/ListSubheader';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Image_placeholder from '../../img/image_placeholder.png'
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
const { Order, setOrder, errors, setErrors,
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
            createAPIEndpoint(ENDPIONTS.ORDERITEM).fetchById(orderId)
                .then(res => {
                    setOrder(res.data);
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

    const validateForm = () => {
        let temp = {};
        temp.ventorName = Order.ventorName != 0 ? "" : "This field is required!"
        //temp.mobile = values.mobile != "none" ? "" : "This field is required.";
        temp.mobile = Order.mobile.length > 9 ? "" : "Minimum 10 numbers required!"
         temp.city = Order.city != 0 ? "" : "This field is required.";
          temp.gCash = Order.gCash != 0 ? "" : "This field is required.";
        //temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        //temp.watageitems = values.watageitems.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }
const getFreshModelObject = () => {
                         Order.ventorName=''
                           Order.mobile=''
                             Order.city=''
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

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (Order.id == 0) {
                createAPIEndpoint(ENDPIONTS.ORDERITEM).create(Order)
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
                createAPIEndpoint(ENDPIONTS.ORDERITEM).update(Order.id, Order)
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
                setOrder({
                    ...Order,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setOrder({
                ...Order,
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
        const dataUrl = index.BASE_URL+`Ventors`;
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
   

Order.ventorName =
    (searchSelectedCountry && searchSelectedCountry.fullName) ||
    Order.ventorName;
  Order.imageSrc =
    (searchSelectedCountry && searchSelectedCountry.imageSrc) ||
    Order.imageSrc;
  Order.mobile =
    (searchSelectedCountry && searchSelectedCountry.mobile) || Order.mobile;
  Order.customerUID =
    (searchSelectedCountry && searchSelectedCountry.customerId) ||
    Order.customerId;
  Order.city =
    (searchSelectedCountry && searchSelectedCountry.city) || Order.city;

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
                            label="VentorName"
                            name="ventorName"
                            value={Order.ventorName}
                            error={errors.ventorName}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
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
                            value={Order.city}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} /> 
  </Grid>
  <Grid item xs={6}>
     <BSelect
     
                            label="Status"
                            name="status"
                            value={Order.status}
                            onChange={handleInputChange}
                            options={userService.OrderMethods}
                        
                        />
   
    
  </Grid>
  
</Grid>
                    </Grid>

 <Grid item xs={6}>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
  <TextField  style ={{width: '90%'}} 
                       error={errors.mobile}
                       size="small" focused inputProps={{ inputMode: 'numeric' }} 
                       label="Mobile" name="mobile"
     id="mobile" value={Order.mobile} onChange={handleInputChange} />
  </Grid>
  <Grid item xs={6}>
    <BSelect
     
                            label="Type"
                            name="ventortype"
                            value={Order.ventortype}
                            onChange={handleInputChange}
                            options={userService.ventortypeMethods}
                        
                        />
   
    
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
      <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
        </Grid>
    <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={Order.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
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
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Order</Button>
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
                </Grid>
            </Form>
             <Notification
                {...{ notify, setNotify }} />

        <Popup
                title="Orders"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderListitem
                    {...{ setOrderId, setOrderListVisibility, resetFormControls, setNotify }} />
            </Popup>
     
        </>
    )
}
