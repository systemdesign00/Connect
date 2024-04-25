import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';

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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
import { roundTo2DecimalPoint } from "../../utils/index";
import Notification from "../../layouts/Notification";
import Popup from '../../layouts/Popup';
import OrderList from './OrderList';
 /* const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom  ref={ref} {...props} />;
});*/



export default function OrFo(props) {
 const [open, setOpen] = React.useState(false);

  

  const handleClose = () => {
    setOpen(false);
  };
const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls } = props;
   
    // const [customerList, setCustomerList] = useState([]);
    const [customerList] = useState([]);
    const [orderListVisibility, setOrderListVisibility] = useState(false);
    const [orderId, setOrderId] = useState(0);
    const [notify, setNotify] = useState({ isOpen: false })

    /* useEffect(() => {
         createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
             .then(res => {
                 let customerList = res.data.map(item => ({
                     id: item.fullName,
                     title: item.customerName
                 }));
                 customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                 setCustomerList(customerList);
             })
             .catch(err => console.log(err))
     }, []) */


    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.tax / 100) * (item.quantity * item.foodItemPrice) + (item.quantity * item.foodItemPrice);
        }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(values.orderDetails)]);

    useEffect(() => {
        if (orderId === 0) resetFormControls()
        else {
            createAPIEndpoint(ENDPIONTS.ORDER).fetchById(orderId)
                .then(res => {
                    setValues(res.data);
                    setErrors({});
                })
                 .catch(err => console.log(err))
                //.catch(
                  //  errorsound.play(),
                  //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning",variant:"filled" }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);
const validateForm = (fieldValues = values) => {
    let temp = { ...errors }

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required."


    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile ? "" : "This field is required."
        
 temp.orderDetails = fieldValues.orderDetails.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp
    });
     return Object.values(temp).every(x => x === "");
  }
  /*
    const validateForm = () => {
        let temp = {};
        temp.fullName = values.fullName !== 0 ? "" : "This field is required.";
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
                createAPIEndpoint(ENDPIONTS.ORDER).create(values)
                    .then(res => {
                      audio.play()
                        resetFormControls();
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                   // .catch(
                     //     errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning",variant:"filled" }));
            }
            else {
                createAPIEndpoint(ENDPIONTS.ORDER).update(values.id, values)
                    .then(res => {
                      audioupdate.play()
                        setOrderId(0);
                        setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                    })
                     .catch(err => console.log(err))
                  //  .catch(
                    //     errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Updating Data",severity:"warning",variant:"filled" }));
            }
        }

    }
    const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')

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
                <TextField label="Customer"
                            name="fullName"
                          
                                fullWidth
                            value={values.fullName}
                            onChange={handleInputChange}
                            options={customerList}
                            error={errors.fullName ? true : false}
                            InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlinedIcon />
            </InputAdornment>
          ),
        }} />
        <Typography  color="secondary">
                {errors.fullName ? "This Field is Required !"  : ""}
              </Typography>
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
                <TextField label="mobile"
                            name="mobile"
                                fullWidth
                            value={values.mobile}
                            onChange={handleInputChange}
                            options={customerList}
                            error={errors.mobile}
                           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermPhoneMsgOutlinedIcon />
            </InputAdornment>
          ),
        }} />
       <Typography  color="secondary">
                {errors.fullName ? "This Field is Required !"  : ""}
              </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
             <TextField disabled
               fullWidth
                            label="Grand Total"
                            name="gTotal"
                            value={values.gTotal}
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
        >
        <Box   sx={{
           marginRight:6,
           marginLeft:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>

              </Grid>
              <Grid item xs={6} sm={6}>
                 <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        <Box   sx={{
           marginRight:-31,
           marginLeft:1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
    <Grid container spacing={7}>
              <Grid item xs={6} sm={6}>
                 <ButtonGroup size="small" aria-label="small button group">
       <Button type="submit" size="small" variant="contained" endIcon={<SendIcon />}>Submit</Button>
   <Button
          size="small"
         aria-label="select merge strategy"
          aria-haspopup="menu"
        
        >
          <RotateLeftOutlinedIcon  onClick={resetForm}/>
        </Button>
      </ButtonGroup>
              
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button size="small" variant="contained" onClick={openListOfOrders}>View</Button>
             
              </Grid>
              </Grid>
            </Box>
          
              </Grid>
              </Grid>
            </Box>
             </Box>
            </form>
             <Notification
                {...{ notify, setNotify }} />

                 <Popup
                title="List of Orders"
                openPopup={orderListVisibility}
                setOpenPopup={setOrderListVisibility}>
                <OrderList
                    {...{ setOrderId, setOrderListVisibility, resetFormControls, setNotify }} />
            </Popup>
           
                <Dialog sx={{
        m: 0, p: 2 ,
       
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
          {/*
         <form  noValidate autoComplete="off">
                 <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        <Box component="form" noValidate  sx={{
           marginRight:-2,
           marginLeft:-2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                 InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyOutlinedIcon/>
            </InputAdornment>
          ),
        }}
                  autoComplete="given-name"
                  name="Customer ID"
                  required
                  fullWidth
                  id="Customer ID"
                  label="Customer ID"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                 InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutlinedIcon />
            </InputAdornment>
          ),
        }}
                  required
                  fullWidth
                  id="Customer Name"
                  label="Customer Name"
                  name="Customer Name"
                  autoComplete="family-name"
                />
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
        <Box component="form" noValidate  sx={{
             marginRight:-2,
           marginLeft:-2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                   InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PermPhoneMsgOutlinedIcon />
            </InputAdornment>
          ),
        }}
                  autoComplete="given-name"
                  name="Phone Number"
                  required
                  fullWidth
                  id="Phone Number"
                  label="Phone Number "
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
             <AttachMoneyOutlinedIcon/>
            </InputAdornment>
          ),
        }}
                  required
                  fullWidth
                  id="Total"
                  label="Total"
                  name="Total"
                  autoComplete="family-name"
                />
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
        >
        <Box component="form" noValidate  sx={{
           marginRight:6,
           marginLeft:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
    <Grid container spacing={2}>
              <Grid item xs={6} sm={6}>

              </Grid>
              <Grid item xs={6} sm={6}>
                 <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        <Box component="form" noValidate  sx={{
           marginRight:-32,
           marginLeft:2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
  
            </Box>
          
              </Grid>
              </Grid>
            </Box>
             </Box>
            </form>
        */}
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
