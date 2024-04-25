import React from 'react'
import Newin from './Newin'
import { useForm } from '../../hooks/useForm';
import OrderedFoodItems from './OrderedFoodItems';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as userService from "../../Services/userService";
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
let today = new Date();
const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const currentDate = new Date();

  // Format the date to "day, month, year"
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const generateRandomAlphanumeric = (length) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  };
  const  generateTwoDigitAlphanumeric = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  const  getSequentialNumber = () => {
    // In a real-world scenario, you might fetch the latest sequential number from a database.
    // For simplicity, I'm using a random number here.
    return Math.floor(Math.random() * 10000)
      .toString()
      .padStart(2, "0");
  }
  const generateBillNumber = () => {
    // Generate a combination of six numbers and letters
    const sixDigitAlphanumeric = generateRandomAlphanumeric(6);
    const sequentialNumber = getSequentialNumber();
    const generatedString = generateTwoDigitAlphanumeric();
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    // Customize the format as needed
    const billNumber = `SJ${sixDigitAlphanumeric}${generatedString}`;
  
    return billNumber;
  };
const getFreshModelObject = () => ({
    id: '',
    billNo:generateBillNumber(),
    orderNumber: generateOrderNumber(),
    customerUID:'',
    fullName: '',
    mobile: '',
    city:'',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null,
    discou:'',
    gCash:'',
    onlinecash:'',
    status:'',
    amountdebit:'',
    cashreceived:'',
    cashreceivedonline:'',
    balance:'',
    scGst:'',
    pannumber:'',
    aadhaarnumber:'',
    gTotal: 0,
    debitcash:0,
    deletedOrderItemIds: '',
    hireDate:formattedDate,
   // hireDate:today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
    //hireDate:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
    orderDetails: [],
    oldorderDetails: [],
    watageitems:[],
    fancyitems:[],
    pieceitems:[],
    addorderDetails:[],
    stockaddorderDetails:[]
})


export default function Oldpurchase(props) {
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
const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
       palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
    },
  },
      }),
    [], // [prefersDarkMode]
  );
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
