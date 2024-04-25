import React, { useState, useEffect ,useMemo } from 'react'
import { createAPIEndpoint, ENDPIONTS,deleteUser } from "../../api";
import { Grid , List, ListItem, ListItemText, Paper, IconButton, ListItemSecondaryAction,CardActionArea} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Autocomplete,Box } from '@mui/material';
import * as index from '../../api/index';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Table from '@mui/material/Table';
import {NumberFormat} from '../../Services/NumberFormat';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {ListSubheader,InputAdornment} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ConfirmDialog from '../../layouts/ConfirmDialog';

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


export default function PieceItems(props, initialFValues) {

 
    const { values, setValues, nonstockListVisibility,recordForEdit } = props;
    let orderpieceitems = values.pieceitems;
 const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

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
                && orderpieceitems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, orderpieceitems])
   let today = new Date();

const Todaysales = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            type:'pcs',
            model:'pcs',
            foodItemId: foodItem.id || generateOrderNumber(),
            quantity: foodItem.quantity,
           salesdate:Todaysales,
            foodItemPrice: foodItem.foodItemPrice ,  //data.prices
            foodItemName: foodItem.foodItemName ,
            
            subtotal:total
        }
        setValues({
            ...values,
            pieceitems: [...values.pieceitems, x]
        })
        //nonstockListVisibility(false);
        resetInputField()
    }

 

 
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        type:'pcs',
        model:'pcs',
        foodItemId: '',
        quantity:1,
         salesdate:Todaysales,
        foodItemName: '',
        foodItemPrice: '',
       
        subtotal:0
    }
    const [foodItem, setData] = useState(initialFValues)
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
const deleteUserData = async (id) => {
        await deleteUser(id);
        //getAllUsers();
    }
const [countryState, setCountryState] = useState({
    loading: false,
    countries: [],
    errorMessage: "",
  });
const [countryStates, setCountryStates] = useState({
    loadings: false,
    countriess: [],
    errorMessages: "",
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
        const dataUrls = index.BASE_URL+`wholestock`;
        const dataUrl = index.BASE_URL+`Silver`;
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
const fetchDatas = async () => {
      try {
        // fetch spinner
        setCountryStates({
          ...countryStates,
          loadings: true,
        });

        //  fetch data
        const dataUrls = index.BASE_URL+`wholestock`;
        //const dataUrl = `https://serdb.onrender.com/api/Silver`;
        const response = await axios.get(dataUrls);
        setCountryStates({
          ...countryStates,
          countriess: response.data,
          loadings: false,
        });
      } catch (error) {
        setCountryStates({
          ...countryStates,
          loadings: false,
          errorMessages: "Sorry Something went wrong",
        });
      }
    };
    fetchData();
     fetchDatas();
  }, []);
  const { loading, errorMessage, countries } = countryState;
    const { loadings, errorMessages, countriess } = countryStates;
  console.log("loading", loading);
  console.log("countries", countries);
  console.log("errorMessage", errorMessage);

 const fit = countries.map((item) => item.name)
  const [selectedCountry, setSelectedCountry] = useState(fit[0]);

   const fits= countriess.map((item) => item.id)
  const [selectedCountrys, setSelectedCountrys] = useState(fits[0]);
  console.log("selectedCountry", selectedCountry);

 
  const ops = () => {
   setConfirmDialog({
                      isOpen: true,
                      //avatarimage:item.imageSrc,
                      title: 'Are you sure to delete this record?',
                      subTitle: "You can't undo this operation",
                        onConfirm: () => {  }
                    });
    } 
    
  const searchSelectedCountry = countries.find((obj) => {
    if (obj.name === selectedCountry) {
      return true;
    }
    return false;
  });

  const searchSelectedCountrys = countriess.find((user) => {
    if (user.id === selectedCountrys) {
       return true,deleteUserData(user.id);
    }
    return false;
  });
  console.log("searchSelectedCountry", searchSelectedCountry);
   
  
 const [display, setdisplay] = useState([]);
const [silverrate, setsilverrate] = useState([]);
const submitOrder = e => {
        e.preventDefault();
         
           addFoodItem(foodItem)
             
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
        }
     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
             .then(res => {
                 let silverrate = res.data.map(item => (
                     item.id,
                      item.rate
                 ));
                 //customerList = [{ id: 0, title: 'Select' }].concat(customerList);
                 setsilverrate(silverrate);
             })
             .catch(err => console.log(err))

        createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
    }, [])

const rates =   display.map(item => (item.rate))
 // foodItem.foodItemName = searchSelectedCountry &&  searchSelectedCountry.name

//foodItem.foodItemPrice =searchSelectedCountrys && searchSelectedCountrys.weight
//foodItem.tax = searchSelectedCountry &&searchSelectedCountry.price
//foodItem.rate = searchSelectedCountry &&  searchSelectedCountry.rate

  const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => fit.filter((item) => containsText(item, searchText)),
    [searchText]
  );

   const displayedOptionss = useMemo(
    () => fits.filter((item) => containsText(item, searchText)),
    [searchText]
  );
const a = foodItem.foodItemPrice * foodItem.quantity 
const taxRate = foodItem.tax ;

const total = a ;
foodItem.subtotal = total;
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
    return (
        <>
        <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
           <TableContainer component={Paper}>
      <Table style={{ Width: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell> Select Item  </TableCell>
         {/*     <TableCell>Tag Id </TableCell> */}
            <TableCell >Weight</TableCell>
            <TableCell >Quantity</TableCell>
            
           {/* <TableCell >Discount</TableCell> */}
           <TableCell >Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
             
           <TableRow>
          
               <TableCell>
                   <form onSubmit={submitOrder}>
          <TextField focused size="small" style = {{width: 100}}  label="ItemName" name="foodItemName" id="foodItemName" value={foodItem.foodItemName} onChange={handleInputChange} />
</form>
                 
   </TableCell>
   
   {/*
   <TableCell>
                 <FormControl size="small" style = {{width: 200}}>
          <InputLabel id="search-select-label">Tag ID</InputLabel>
        <Select
            select={true}
          // Disables auto focus on MenuItems and allows TextField to be in focus
         MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              getContentAnchorEl: null
            }}
          labelId="search-select-label"
          id="search-select"
         
             value={selectedCountrys}
                  onChange={(e) => setSelectedCountrys(e.target.value)}
          label="Tag ID"
          renderValue={() => selectedCountrys}
          label="Tag ID"
          
          onClose={() => setSearchText("")}>
        
          <ListSubheader>
            <TextField
              size="small"
            
              autoFocus
              placeholder="Enter Tag ID..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptionss.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>     

   </TableCell>
       */}
        <TableCell>
            <form onSubmit={submitOrder}>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Rate" name="foodItemPrice" id="foodItemPrice" value={foodItem.foodItemPrice} onChange={handleInputChange} />
</form>

       </TableCell>
        <TableCell>
            <form onSubmit={submitOrder}>
         <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="quantity" name="quantity" id="quantity" value={foodItem.quantity}  onChange={handleInputChange} />
  </form>
   </TableCell>

   
  {/* <TableCell>
           <TextField focused size="small" style = {{width: 100}} label="Discount" name="discount" id="discount" value={foodItem.discount } onChange={handleInputChange} />
  </TableCell>  */}      
   { /*<TableCell>
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
        }} style = {{width: 150}} label="Total" name="subtotal" id="subtotal" value={NumberFormat(Math.round(total)) || NumberFormat(foodItem.subtotal)} onChange={handleInputChange} disabled/>
           </form>
             </TableCell> 

           <TableCell>
 <Grid container columnSpacing={{ xs: 1, sm: 2, md:3}}>
  <Grid item >
 <Button type="submit" variant="contained" size="small" onClick={submitOrder}  >Submit</Button>
  </Grid>
  <Grid item >
  <Button  variant="contained" size="small" onClick={ ops} >Reset</Button>
  </Grid>
  
</Grid>
          </TableCell> 
                   
          </TableRow>

        </TableBody>

      </Table>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
      <Div>{"Item Name : "}{foodItem.foodItemName}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Grant Total: "}{NumberFormat(Math.round(total))}</Div>
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


        </>
    )
}
 