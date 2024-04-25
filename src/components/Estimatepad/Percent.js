import React, { useState, useEffect ,useMemo} from 'react'
import { createAPIEndpoint, ENDPIONTS ,deleteUser} from "../../api";
import Notification from "../../layouts/Notification";
import { Grid , Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import * as index from '../../api/index';
import Autocomplete from '@mui/material/Autocomplete';
import TableBody from '@mui/material/TableBody';
import {NumberFormat} from '../../Services/NumberFormat';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { roundTo2DecimalPoint } from "../../utils/index";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CardContent from '@mui/material/CardContent';
import {ListSubheader,InputAdornment} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import * as userService from "../../Services/userService";
import ErrorSound from '../../Sounds/error.mp3'
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

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
            //display: 'block',
            //color: '#000',
        },
        '& .MuiButtonBase-root': {
           // display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            //backgroundColor: 'transparent'
        }
    }
}))

export default function Percent(props, initialFValuespercent) {

    const { values, setValues, setnonstockListVisibility,recordForEdit } = props;
    let orderedFoodItemspercent = values.orderPercent;

    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {

        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))


    }, [])


useEffect(() => {
        if (recordForEdit != null)
            setData({
                ...recordForEdit,
                
            })
    }, [recordForEdit])
    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.foodName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && orderedFoodItemspercent.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItemspercent])
    let today = new Date();

const tday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            itemType:'gold',
            foodItemId: foodItem.foodItemId,
            salesdate:new Date(),
            quantity: foodItem.quantity,
            tax: foodItem.tax,
            rate:foodItem.rate,
            foodItemPrice: foodItem.foodItemPrice ,  //data.prices
            foodItemName: foodItem.foodItemName ,
            discount: foodItem.discount ,  //data.fullname 
            subtotal:Math.round(total)
        }
        setValues({
            ...values,
            orderPercent: [...values.orderPercent, x]
        })
        setnonstockListVisibility(false);
        resetInputField()
    }
 const addFoodItems = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            preType:foodItem.preType,
            foodItemId:  generateOrderNumber(),
            quantity: foodItem.quantity,
            tax: foodItem.tax,
            foodItemPrice: foodItem.price ,  //data.prices
            foodItemName: foodItem.foodName ,
            discount: foodItem.discount , 
             subtotal:Math.round(total)
        }
        setValues({
            ...values,
            orderPercent: [...values.orderPercent, x]
        })
               setnonstockListVisibility(false);
        //resetInputField()
    }
 
    const resetInputField = () => {
        setData(initialFValuespercent);

    };
   
    initialFValuespercent = {
        id: '',
        foodItemId: '',
        preType:'',
        salesdate:new Date(),
        itemType:'gold',
        quantity:1,
        foodItemName: '',
        rate:'',
        foodItemPrice: '',
        tax: '',
        discount:'',
        subtotal:0
    }
    const [foodItem, setData] = useState(initialFValuespercent)
     const [notify, setNotify] = useState({ isOpen: false })
    function handle(e) {
        const newdata = { ...foodItem }
        newdata[e.target.id] = e.target.value
        setData(newdata)


        //console.log(newdata)
    }
 const handleInputChange = e => {
        const { name, value } = e.target
        setData({
            ...foodItem,
            [name]: value
        })
    }
    const handleChange = (e) => {
        e.preventDefault()
    }
     const [errors,setErrors] = useState()

 const validateForm = () => {
        let temp = {};
        temp.foodItemName = foodItem.foodItemName != 0 ? "" : "This field is required!"
        //temp.mobile = values.mobile != "none" ? "" : "This field is required.";
       
         temp.foodItemPrice = foodItem.foodItemPrice != 0 ? "" : "This field is required.";
        //  temp.gCash = values.gCash != 0 ? "" : "This field is required.";
          temp.tax = foodItem.tax != 0 ? "" : "This field is required.";
        //temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        //temp.watageitems = values.watageitems.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }
    const errorsound = new Audio(ErrorSound)
    const submitOrder = e => {
        e.preventDefault();
          if (validateForm()) {
               addFoodItem(foodItem)
             
               
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            
            
          }else{
            setNotify({ isOpen: true, message: "Fill All the Fields",severity:"warning" ,variant:"filled"});
             errorsound.play()
          }
        }
           

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
        const dataUrl = index.BASE_URL+`FoodItem`;
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
 const fit = countries.map((item) => item.foodName)
  const [selectedCountry, setSelectedCountry] = useState(fit[0]);
  console.log("selectedCountry", selectedCountry);

     
  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((user) => {
    if (user.foodName === selectedCountry) {
    
       return true;
   
    
    }
    return false;
  });

  console.log("searchSelectedCountry", searchSelectedCountry);
   
  
 const [display, setdisplay] = useState([]);

     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
    }, [])
const rates =   display.map(item => (item.rate))
//foodItem.foodItemId = searchSelectedCountry && searchSelectedCountry.orderNumber
  //foodItem.foodItemName = searchSelectedCountry && searchSelectedCountry.foodName

  //foodItem.foodItemPrice =searchSelectedCountry && searchSelectedCountry.itemWeight
//foodItem.tax = searchSelectedCountry && searchSelectedCountry.price
 //foodItem.quantity = 1
foodItem.rate = rates
 const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => fit.filter((item) => containsText(item, searchText)),
    [searchText]
  );
const a = foodItem.foodItemPrice * rates 
const taxRate = (foodItem.tax * a) / 100;
//const discountRate = (foodItem.discount * a) / 100;
//const total = a - discountRate + taxRate;
const total = a  + taxRate;
const wordify = (num) => {
   const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
   const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
   const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
   const formatTenth = (digit, prev) => {
      return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
   };
   const formatOther = (digit, next, denom) => {
      return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
   };
   let res = "";
   let index = 0;
   let digit = 0;
   let next = 0;
   let words = [];
   if (num += "", isNaN(parseInt(num))){
      res = "";
   }
   else if (parseInt(num) > 0 && num.length <= 10) {
      for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
         case 0:
            words.push(formatOther(digit, next, ""));
         break;
         case 1:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 2:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
            break;
         case 3:
            words.push(formatOther(digit, next, "Thousand"));
            break;
         case 4:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 5:
            words.push(formatOther(digit, next, "Lakh"));
            break;
         case 6:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 7:
            words.push(formatOther(digit, next, "Crore"));
            break;
         case 8:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 9:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
      };
      res = words.reverse().join("")
   } else res = "";
   return res
};
foodItem.subtotal = Math.round(total);
    return (
        <>
<TableContainer component={Paper}>
      <Table style={{ Width: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
             
            <TableCell>Item Name </TableCell>
         <TableCell>Quantity</TableCell>
            <TableCell >Weight</TableCell>
            <TableCell >Percent</TableCell>
          <TableCell >Rate</TableCell> 
           <TableCell >Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
             
           <TableRow>
           
         <TableCell>
          <form onSubmit={submitOrder}>
            <Autocomplete
    
    options={userService.ornamentitem}
     freeSolo
     onChange={handleInputChange}
     value={foodItem.foodItemName}
    renderInput={params => {
     
        const inputProps = params.inputProps;
        inputProps.autoComplete = "off";
       
        
        return (
          <TextField
            {...params}
             name="foodItemName"
             //error={errors.customerId}
             value={foodItem.foodItemName}
            inputProps={inputProps}
              style = {{width: 200}}
            label="Ornaments"  
            variant="outlined"
            onBlur={handleInputChange}
            fullWidth
            
          />
            );
      }
    }
/>
   { /* <TextField focused size="small" style = {{width: 100}}  label="foodItemName" name="foodItemName" id="foodItemName" value={foodItem.foodItemName} onChange={handleInputChange} />*/}
       </form>
       </TableCell>
        <TableCell>
              <form onSubmit={submitOrder}>
        <TextField focused size="small"  disabled style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Quantity" name="quantity" id="quantity" value={foodItem.quantity}
           onChange={handleInputChange} />
</form>
       </TableCell>
        <TableCell>
              <form onSubmit={submitOrder}>
          <TextField focused size="small"     style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Weight" name="foodItemPrice" id="foodItemPrice" value={foodItem.foodItemPrice} onChange={handleInputChange} />
</form>
       </TableCell>
        <TableCell>
              <form onSubmit={submitOrder}>
         <TextField focused size="small"    style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Percent" name="tax" id="tax" value={foodItem.tax }  onChange={handleInputChange} />
  
</form>
 </TableCell>
 <TableCell>
       <form onSubmit={submitOrder}>
           <TextField focused size="small" style = {{width: 100}} label="Rate" name="rate" id="rate" value={foodItem.rate } onChange={handleInputChange} />
           </form>
          </TableCell> 
 { /*
   <TableCell>
           <TextField focused size="small" style = {{width: 100}} label="Discount" name="discount" id="discount" value={foodItem.discount } onChange={handleInputChange} />
          </TableCell>        
   <TableCell>
  <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="taxs" name="taxs" id="taxs" value={oldfoodItem.taxs}  onChange={handleInputChange} />
   </TableCell> */ }  
  
           <TableCell>
                 <form onSubmit={submitOrder}>
     <TextField focused size="small"  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeOutlinedIcon />
            </InputAdornment>
          ),
        }} style = {{width: 150}} label="Total" name="total" id="total" value={NumberFormat(Math.round(total)) || NumberFormat(foodItem.subtotal)} onChange={handleInputChange} disabled/>
            </form>
             </TableCell> 
    
           <TableCell>
<Grid container columnSpacing={{ xs: 1, sm: 2, md:3}}>
  <Grid item >
 <Button type="submit" variant="contained" size="small" onClick={submitOrder}>Submit</Button>
  </Grid>
  <Grid item >
  <Button  variant="contained" size="small" onClick={ resetInputField} >Reset</Button>
  </Grid>
  
</Grid>
          </TableCell> 
                   
          </TableRow>

        </TableBody>

      </Table>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
  <Grid item xs={6}>
      <Div>{"Item Name : "}{foodItem.foodItemName}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Grant Total:  "}{NumberFormat(Math.round(total))}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Weight : "}{foodItem.foodItemPrice}</Div>
        <Div>{"Rate : "}{rates}</Div>
  </Grid>
  <Grid item xs={6}>
      <Div>{"Percent : "}{foodItem.tax}</Div>
      <Div>{"Rupees in Words : "}{wordify(Math.round(total))}{" /-"}</Div>
  </Grid>
</Grid>
  
    </TableContainer>

   <Notification
                {...{ notify, setNotify }} />
        </>
    )
}
 