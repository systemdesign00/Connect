import React from 'react'
import OrFo from './OrFo'
import { useForm } from '../../hooks/useForm';
import OrIt from './OrIt';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();

const getFreshModelObject = () => ({
    id: '',
    orderNumber: generateOrderNumber(),
    customerId: '',
    Phone: '+91',
    gTotal: 0,
    deletedOrderItemIds: '',
    orderDetails: []
})


export default function List(props) {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);



    return (
       
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <OrFo
                    {...{
                        values,
                        setValues,
                        errors,
                        setErrors,
                        handleInputChange,
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

            <OrIt 
         
                 {...{
                    values,
                    setValues
                }}
            />

        </Grid>
    )
}
