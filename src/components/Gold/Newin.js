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
            createAPIEndpoint(ENDPIONTS.STANDARDGST).fetchById(orderId)
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
let totalgst=  Number(newitemtotal + makingcal + (Number(hallmarkingcal))) - values.gCash
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
          temp.status = values.city != 0 ? "" : "This field is required.";
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

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.id == 0) {
                createAPIEndpoint(ENDPIONTS.STANDARDGST).create(values)
                    .then(res => {
                      audio.play()
                       resetFormControls();
                       // resetForm()
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                    //.catch(
                      // errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            }
            else {
                createAPIEndpoint(ENDPIONTS.STANDARDGST).update(values.id, values)
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
values.city = searchSelectedCountry && searchSelectedCountry.city    || values.city
values.pannumber = searchSelectedCountry && searchSelectedCountry.pannumber  || values.pannumber
values.aadhaarnumber = searchSelectedCountry && searchSelectedCountry.aadhaarnumber  || values.aadhaarnumber

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
                            label="fullName"
                            name="fullName"
                            value={values.fullName}
                            error={errors.fullName}
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
                            value={values.city}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} /> 
  </Grid>
  
  
    <Grid item xs={5.5}>
    <TextField fullWidth 
                       error={errors.mobile}
                       size="small" focused inputProps={{ inputMode: 'numeric' }} 
                       label="Mobile" name="mobile"
     id="mobile" value={values.mobile} onChange={handleInputChange} />
{/*
      <TextField 
        inputProps={{ readOnly: true }}
              fullWidth
                size="small"
                            label="Grand Total"
                            name="gTotal"
                          error
                            value={NumberFormat(values.gTotal)}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} /> */}
   
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
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} /> 
  </Grid>
  <Grid item xs={5.5}>
 <TextField fullWidth 
                       error={errors.aadhaarnumber}
                       size="small" focused inputProps={{ inputMode: 'numeric' }} 
                       label="Aadhaar Number" name="aadhaarnumber"
     id="aadhaarnumber" value={values.aadhaarnumber} onChange={handleInputChange} />
   
  </Grid>
  
</Grid>
                    </Grid>
  
    
   
  

    
    
  
  
</Grid>
                    </Grid>
       
<Grid item xs={6}>
<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={4}>
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
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} /> 
      
      
  </Grid>
  <Grid item xs={4}>
    
       <TextField
           
             name="status"
             size='small'
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
                 <AttachMoneyOutlinedIcon/>
                </InputAdornment>
              ),
            }}
          />
        

</Grid>
  <Grid item xs={4}>
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
  <Grid item xs={4}>
    
       <TextField 
    color='secondary'
              error
              fullWidth
               //color='success'
               focused
                size="small"
                  onChange={handleInputChange}
                            label="Round Off"
                            name="gCash"
                              //error={errors.gCash}
                            value={values.gCash}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} />  
      </Grid>
  <Grid item xs={4}>
  <Grid container spacing={2} columns={8}>
  <Grid item xs={4}>
  <TextField 
      color='secondary'
      fullWidth
              // color='error'
               focused
                size="small"
                  onChange={handleInputChange}
                 
                            label="HallMarking Charge"
                            name="debitcash"
                            value={values.debitcash}
                           /> 
  </Grid>
  <Grid item xs={4}>
  <TextField 
    color='secondary'
               error
                size="small"
                  onChange={handleInputChange}
                  fullWidth
                            label="Making Charges"
                            name="onlinecash"
                            value={values.onlinecash}
                          /> 
  </Grid>
</Grid>
   
   
  </Grid>
  <Grid item xs={4}>
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
   <TextField 
      color='secondary'
      fullWidth
              // color='error'
               focused
                size="small"
                  onChange={handleInputChange}
                 
                            label="Cash"
                            name="cashreceived"
                            value={values.cashreceived}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
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
                            label="GPAY/PHONEPAY/AMAZONPAY"
                            name="cashreceivedonline"
                            value={values.cashreceivedonline}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} />  
        
    
   
  </Grid>
</Grid>
     
     
             
                   
                    </Grid>
                </Grid>
            </Form>
             <Notification
                {...{ notify, setNotify }} />

                 <Popup
                title="GOLD"
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

