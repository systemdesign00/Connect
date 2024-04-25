import React from 'react'
import Newin from './Newin'
import { useForm } from '../../hooks/useForm';
import OrderedFoodItems from './OrderedFoodItems';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
//const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const currentDate = new Date();

// Format the date to "day, month, year"
const formattedDate = currentDate.toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const getFreshModelObject = () => ({
    id: '',
    orderNumber: generateOrderNumber(),
    fullName: '',
    mobile: '',
    city:'',
    discou:'',
    gCash:'',
    onlinecash:'',
    gTotal: 0,
    deletedOrderItemIds: '',
    hireDate:formattedDate,
    orderDetails: [],
    oldorderDetails: []
})


export default function Newindex(props) {
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