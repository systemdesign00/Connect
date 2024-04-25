import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: useTheme().spacing(1)
        }
    },
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: useTheme().spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: useTheme().spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function Edit(props, initialFValues) {

    const { values, setValues, seteditListVisibility,recordForEdit} = props;

   
    const classes = useStyles();



   
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            foodItemId: foodItem.id || generateOrderNumber(),
            quantity: 1,
            tax: foodItem.tax || edit.tax,
            foodItemPrice: foodItem.foodItemPrice || edit.foodItemPrice,  //data.prices
            foodItemName: foodItem.foodItemName || edit.foodItemName, //data.fullname 
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }
    const resetInputField = () => {
        setedit(initialFValues);

    };
    useEffect(() => {
        if (recordForEdit != null)
            setedit({
                ...recordForEdit,
                
            })
    }, [recordForEdit])
    initialFValues = {
        id: '',
        foodItemId: '',
        foodItemName: '',
        foodItemPrice: '',
        tax: ''
    }
    const [edit, setedit] = useState(initialFValues)
    function handle(e) {
        const newdata = { ...edit }
        newdata[e.target.id] = e.target.value
        setedit(newdata)
 }
    
    const handleChange = (e) => {
        e.preventDefault()
 resetInputField()
    }
const additems = (e) => {
        
        addFoodItem(edit)
        seteditListVisibility(false);
        resetInputField()
    }
   
        
       
    
    return (
        <>
 <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
                <TextField label="foodItemName" name="foodItemName" id="foodItemName" value={edit.foodItemName} onChange={(e) => handle(e)} />
                <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" value={edit.foodItemPrice} onChange={(e) => handle(e)} />
                <TextField label="tax" name="tax" id="tax" value={edit.tax} onChange={(e) => handle(e)} />
                <Button type="submit" variant="contained" size="small" onClick={additems} >Update</Button>
                  <Button  variant="contained" size="small" onClick={ resetInputField} >Reset</Button>
            </form>
          
        </>
    )
}
