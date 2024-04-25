import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { Grid , List, ListItem, ListItemText, Paper, InputBase, IconButton, ListItemSecondaryAction,CardActionArea} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import * as index from '../../api/index';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {NumberFormat} from '../../Services/NumberFormat';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {
 Avatar,
  ListSubheader,
Box,

Typography,
  InputAdornment} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
//import IconButton from '@mui/material/IconButton';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
//import ListItemText from '@mui/material/ListItemText';
//import PlusOneIcon from '@mui/icons-material/PlusOne';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//import CustomizedInputBase from '../../api/Search';
import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
//import { DatePicker } from '@mui/lab';
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

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

export default function OldSilver(props, initialFValues) {

    const { values, setValues, setOldsilverListVisibility,recordForEdit } = props;
    let oldorderedFoodItemssilver = values.oldorderDetailsilver;

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
                && oldorderedFoodItemssilver.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, oldorderedFoodItemssilver])
  
let today = new Date();

const Todaysales = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const oldaddFoodItem = oldfoodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            type:'oldsilver',
            foodItemId: oldfoodItem.id || generateOrderNumber(),
            quantitys: oldfoodItem.quantitys,
             salesdate:Todaysales,
            taxs: oldfoodItem.taxs,
            foodItemPrices: oldfoodItem.foodItemPrices ,  //data.prices
            foodItemNames: oldfoodItem.foodItemNames ,
            rate:oldfoodItem.rate,
            discounts: oldfoodItem.discounts ,  //data.fullname 
            subtotals:(oldfoodItem.foodItemPrices - oldfoodItem.quantitys ) * b || Math.round(total)
        }
        setValues({
            ...values,
            oldorderDetailsilver: [...values.oldorderDetailsilver, x]
        })
        setOldsilverListVisibility(false);
        resetInputField()
    }
 const submitOrder = e => {
        e.preventDefault();
         
           oldaddFoodItem(oldfoodItem)
               
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
             }
 
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        type:'oldsilver',
        foodItemId: '',
        quantitys:1,
         salesdate:Todaysales,
        foodItemNames: '',
        foodItemPrices: '',
        taxs: 0,
        rate:0,
        discounts:'',
        subtotals:0
    }
    const [oldfoodItem, setData] = useState(initialFValues)
    function handle(e) {
        const newdata = { ...oldfoodItem }
        newdata[e.target.id] = e.target.value
        setData(newdata)


        //console.log(newdata)
    }
 const handleInputChange = e => {
        const { name, value } = e.target
        setData({
            ...oldfoodItem,
            [name]: value
        })
    }
    const handleChange = (e) => {
        e.preventDefault()
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
        const dataUrl = index.BASE_URL+`SilverItem`;
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

  const [selectedCountry, setSelectedCountry] = useState();
  console.log("selectedCountry", selectedCountry);

  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((obj) => {
    if (obj.foodName === selectedCountry) {
      return true;
    }
    return false;
  });
  console.log("searchSelectedCountry", searchSelectedCountry);
   
   const [display, setdisplay] = useState([]);

     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.OLD_SILVER).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
    }, [])
const rates =   display.map(item => (item.rate))
  //foodItem.foodItemName = searchSelectedCountry && searchSelectedCountry.foodName

    //foodItem.foodItemPrice =searchSelectedCountry && searchSelectedCountry.price
oldfoodItem.taxs = 'old'
oldfoodItem.discounts = 1
 
const a = (oldfoodItem.foodItemPrices - oldfoodItem.quantitys)
const b = oldfoodItem.rate 
const total = a * b;
 
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
oldfoodItem.subtotals = Math.round(total)
    return (
        <>
<TableContainer component={Paper}>
      <Table style={{ Width: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name </TableCell>
            <TableCell >Weight</TableCell>
            <TableCell >Wastage</TableCell>
            <TableCell >Rate</TableCell>
           <TableCell >Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
             
           <TableRow>
          
               <TableCell>
                   <form onSubmit={submitOrder}>
 <TextField focused size="small" style = {{width: 200}}inputProps={{ inputMode: 'numeric' }} label="ItemName" name="foodItemNames" id="foodItemNames" value={oldfoodItem.foodItemNames} onChange={handleInputChange} />
  </form>
   </TableCell>
        <TableCell>
            <form onSubmit={submitOrder}>
              <TextField focused size="small" style = {{width: 100}}inputProps={{ inputMode: 'numeric' }} label="Weight" name="foodItemPrices" id="foodItemPrices" value={oldfoodItem.foodItemPrices} onChange={handleInputChange} />
 </form>
       </TableCell>
        <TableCell>
            <form onSubmit={submitOrder}>
         <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Wastage" name="quantitys" id="quantitys" value={oldfoodItem.quantitys} onChange={handleInputChange} />
 </form>
 </TableCell>
   <TableCell>
       <form onSubmit={submitOrder}>
   <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Rate" name="rate" id="rate" value={oldfoodItem.rate} onChange={handleInputChange} />
        </form>
          </TableCell>        
   
  
           <TableCell>
               <form onSubmit={submitOrder}>
     <TextField focused size="small"  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CurrencyRupeeOutlinedIcon />
            </InputAdornment>
          ),
        }} style = {{width: 150}} label="Total" name="subtotals" id="subtotals" value={NumberFormat(oldfoodItem.subtotals)} onChange={handleInputChange} disabled/>
            </form>
             </TableCell> 
    
           <TableCell>
 <Grid container columnSpacing={{ xs: 1, sm: 2, md:3}}>
  <Grid item >
 <Button type="submit" variant="contained" size="small" onClick={submitOrder} >Submit</Button>
  </Grid>
  <Grid item >
  <Button  variant="contained" size="small" onClick={ resetInputField} >Reset</Button>
  </Grid>
  
</Grid>
          </TableCell> 
                   
          </TableRow>

        </TableBody>

      </Table>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
      <Div>{"Item Name : "}{oldfoodItem.foodItemNames}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Grant Total: "}{NumberFormat(Math.round(total))}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Weight : "}{oldfoodItem.foodItemPrices}</Div>
        <Div>{"Rate : "}{oldfoodItem.rate}</Div>
  </Grid>
  <Grid item xs={6}>
      <Div>{"Percent : "}{oldfoodItem.quantitys}</Div>
      <Div>{"Rupees in Words : "}{wordify(Math.round(total))}{" /-"}</Div>
  </Grid>
</Grid>
  
    </TableContainer>

            
        </>
    )
}
 