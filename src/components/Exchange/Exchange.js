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
    imageSrc: defaultImageSrc,
    imageFile: null,
    discou:'',
    gCash:'',
    onlinecash:'',
    gTotal: 0,
    deletedOrderItemIds: '',
    hireDate:today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
    orderDetails: [],
    oldorderDetails: [],
   cashitems:[],
    oldcashitems:[],
    
    
    
})


export default function Exchange(props) {
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
