import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Autocomplete } from '@mui/material';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import DatePicker from '../../hooks/DatePicker';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
import { roundTo2DecimalPoint,roundTo2DecimalPoints } from "../../utils/index";
import Notification from "../../layouts/Notification";
import Popup from '../../layouts/Popup';

import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stocklist from './Stocklist';
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

export default function Stockform(props) {
 const [open, setOpen] = React.useState(false);

const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls  } = props;
   



    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({ isOpen: false })

        
   useEffect(() => {

       let gTotal = values.orderDetails.reduce((tempTotal, item) => {
        
         return tempTotal + item.weight;
          }, 0);

        let tcount = values.orderDetails.length
        
      
     
        setValues({
            ...values,
            gTotal:roundTo2DecimalPoints(gTotal),
            tcount:tcount
        }) 
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values.orderDetails)]);

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
            createAPIEndpoint(ENDPIONTS.STOCK).fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                .catch(err => console.log(err))
                 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);
const validateForm = (fieldValues = values) => {
    let temp = { ...errors }

    if ("itemname" in fieldValues)
      temp.itemname = fieldValues.itemname ? "" : "This field is required."


    if ("size" in fieldValues)
      temp.size =
        fieldValues.size ? "" : "This field is required."
        
 temp.orderDetails = fieldValues.orderDetails.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp
    });
     return Object.values(temp).every(x => x === "");
  }
  /*
    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId !== 0 ? "" : "This field is required.";
        temp.pMethod = values.pMethod !== "none" ? "" : "This field is required.";
        temp.orderDetails = values.orderDetails.length !== 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }*/

    const resetForm = () => {
        resetFormControls();
        setOrderId(0);
          
    }

    const submitOrder = e => {
        e.preventDefault();
        if (validateForm()) {
            if (values.id == 0) {
                createAPIEndpoint(ENDPIONTS.STOCK).create(values)
                    .then(res => {
                      audio.play()
                        resetFormControls();
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                  
            }
            else {
                createAPIEndpoint(ENDPIONTS.STOCK).update(values.id, values)
                    .then(res => {
                      audioupdate.play()
                        setOrderId(0);
                        setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                    })
                     .catch(err => console.log(err))
                 
            }
        }

    }

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/win11shutdown.mp3')
const audioupdate = new Audio('https://www.winhistory.de/more/winstart/mp3/wfw311.mp3')

    return (
        <>
            <form onSubmit={submitOrder}>

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
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                              
               <TextField disabled label="Order Number"
               size="small"
                            name="orderNumber"
                                fullWidth
                            value={values.orderNumber}
                            InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlinedIcon/>
            </InputAdornment>
          ),
        }} />
              </Grid>
              <Grid item xs={6} sm={6}>
               <TextField label="Item Name"
               size="small"
                            name="itemname"
                        inputProps={{ inputMode: 'numeric' }}
                              fullWidth
                            value={values.itemname}
                            onChange={handleInputChange}
                    error={errors.itemname}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermPhoneMsgOutlinedIcon />
            </InputAdornment>
          ),
        }} />
               
              </Grid>
              </Grid>
              
              </Box>
               <Box
          sx={{
            marginTop: 2,
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
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                        <TextField label="Size"
                        size="small"
                            name="size"
                        inputProps={{ inputMode: 'numeric' }}
                              fullWidth
                            value={values.size}
                            onChange={handleInputChange}
                    error={errors.size}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermPhoneMsgOutlinedIcon />
            </InputAdornment>
          ),
        }} />
              
              
              </Grid>
              <Grid item xs={6} sm={6}>
                
             <TextField disabled
               fullWidth
                size="small"
                            label="Total Weight"
                            name="gTotal"
                            value={values.gTotal }
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }} />
              </Grid>
              </Grid>
            </Box>


         <Box
          sx={{
            marginTop: 2,
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
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
             <TextField label="Type"
                        size="small"
                            name="type"
                       // inputProps={{ inputMode: 'numeric' }}
                              fullWidth
                            value={values.type}
                            onChange={handleInputChange}
                    error={errors.type}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermPhoneMsgOutlinedIcon />
            </InputAdornment>
          ),
        }} />  
     
              </Grid>
              <Grid item xs={6} sm={6}>
                  
            <ButtonGroup variant="outlined" aria-label="outlined button group">
 <ButtonGroup size="small" aria-label="small button group">
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Submit</Button>
   <Button
          size="small"
         aria-label="select merge strategy"
          aria-haspopup="menu"
        
        >
          <RotateLeftOutlinedIcon  onClick={ resetFormControls}/>
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
            </Box>

           
            </form>
             <Notification
                {...{ notify, setNotify }} />

                 <Popup
                title="Silver Inventory "
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
             <Stocklist
                    {...{ setOrderId, setOrderListVisibility, resetFormControls, setNotify }} /> 
            </Popup>
     
           
        </>
    )
}
