import React from 'react'
import { useFormpending } from './useFormpending';
import Pendingform from './Pendingform';
import Pendinglist from './Pendinglist';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as userService from "../../Services/userService";
let today = new Date();
const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const getFreshModelObjectpending = () => ({
    id: '',
    orderNumber: generateOrderNumber(),
    customerUID:'',
    shopName: '',
    mobile: '',
    city:'',
    imageName: '',
    status:'',
    imageSrc: defaultImageSrc,
    imageFile: null,
    discou:'',
    gCash:'',
    purchasewt:'',
    balance:'',
    onlinecash:'',
    cashreceived:'',
    cashreceivedonline:'',
     gTotal: 0,
    deletedOrderItemIds: '',
    hireDate:today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
    //hireDate:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
     orderDetails: [],
    oldorderDetails: [],
    watageitems:[],
    fancyitems:[],
    pieceitems:[],
    cashitems:[]
    
    
})


export default function Mainpending(props) {
const {recordForEdit} = props
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
       // showPreview,
        resetFormControls,
        //defaultImageSrc,

    } = useFormpending(getFreshModelObjectpending);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
              
                <Pendingform 
                
                recordForEdit={recordForEdit}
                 
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
                        
                        //defaultImageSrc,
                        resetFormControls
                    }}
                />
                <Box
          sx={{
            marginBottom: 2,
          
          }}
        ></Box>
            </Grid>
            {/*
            <Grid item xs={6}>
                <SearchFoodItems
                    {...{
                        values,
                        setValues
                    }}
                />
            </Grid>
                */}

            <Pendinglist 
                 {...{
                    values,
                    setValues
                }}
            />

        </Grid>
    )
}
