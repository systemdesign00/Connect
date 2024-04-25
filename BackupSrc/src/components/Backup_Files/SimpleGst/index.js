import React from 'react'
import Newin from './Newin'
import { useForm } from '../../hooks/useForm';
import OrderedFoodItems from './OrderedFoodItems';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as userService from "../../Services/userService";
let today = new Date();
const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const getFreshModelObject = () => ({
    id: '',
    orderNumber: generateOrderNumber(),
    customerUID:'',
    fullName: '',
    mobile: '',
    city:'',
    imageName: '',
    aadhaarnumber:'',
    pannumber:'',
    goldrate:'',
    silverrate:'',
    imageSrc: defaultImageSrc,
    imageFile: null,
    discou:'',
    gCash:'',
    onlinecash:'',
    statuss:'DONE',
    gTotal: 0,
    debitcash:0,
    deletedOrderItemIds: '',
    hireDate:formattedDate,
    //hireDate:today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
    //hireDate:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
    orderDetails: [],
    orderPercent:[],
    oldorderDetails: [],
    oldorderDetailsilver: [],
    watageitems:[],
    fancyitems:[],
    pieceitems:[],
    addorderDetails:[],
    stockaddorderDetails:[]
})


export default function Esestimate(props) {
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

    } = useForm(getFreshModelObject);

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
              
                <Newin 
                
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

            <OrderedFoodItems 
                 {...{
                    values,
                    setValues
                }}
            />

        </Grid>
    )
}
