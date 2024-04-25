import React, { useState, useEffect ,useMemo } from 'react'
import { createAPIEndpoint, ENDPIONTS,deleteUsersilver } from "../../api";
import { Grid , Paper,  IconButton, ListItemSecondaryAction,CardActionArea} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl'
import Notification from "../../layouts/Notification";
import { Autocomplete,Box } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import * as index from '../../api/index';
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
import {NumberFormat} from '../../Services/NumberFormat';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useConfirm } from "material-ui-confirm";
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Silver(props, initialFValues) {

  const [valuetab, setValuetab] = React.useState(0);

  const handleChangetab = (event, newValue) => {
    setValuetab(newValue);
  };

    const { values, setValues, setsilverListVisibility,recordForEdit } = props;
    let orderedFoodItems = values.orderDetails;
const confirm = useConfirm();
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
                && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItems])
   let today = new Date();
   const currentDate = new Date();

   // Format the date to "day, month, year"
   const formattedDate = currentDate.toLocaleDateString('en-IN', {
     day: 'numeric',
     month: 'long',
     year: 'numeric',
   });
const tday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            type:'silver',
            foodItemId: foodItem.id || generateOrderNumber(),
            quantity: foodItem.quantity,
            rate:foodItem.rate,
            tax: foodItem.tax,
            huid:foodItem.huid,
            uom:foodItem.uom,
            hsncode:foodItem.hsncode,
             goldrate:foodItem.goldrate,
            silverrate:foodItem.silverrate,
            salesdate:formattedDate,
            foodItemPrice: foodItem.foodItemPrice ,  //data.prices
            foodItemName: foodItem.foodItemName ,
            discount: foodItem.discount ,  //data.fullname 
            subtotal:total
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
        setsilverListVisibility(false);
        resetInputField()
    }

 
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        type:'silver',
        foodItemId: '',
        quantity:1,
        huid:'',
        uom:'GMS',
         goldrate:'',
        silverrate:'',
        hsncode:'7113',
        salesdate:formattedDate,
        foodItemName: '',
        foodItemPrice: '',
        rate:0,
        tax: '',
        discount:'',
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
        const dataUrl = index.BASE_URL+`GstSilverStock`;
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
 const fit = countries.map((item) => item.orderNumber)
  const [selectedCountry, setSelectedCountry] = useState(fit[0]);
  console.log("selectedCountry", selectedCountry);
const deleteUserDatasilver = async (id) => {
  
   
   if (validateForm()) {
    deleteUsersilver(id);
                 addFoodItem(foodItem)
             
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            
            
          }else{
            setNotify({ isOpen: true, message: "Fill All the Fields",severity:"warning" ,variant:"filled"});
             errorsound.play()
          }
        //getAllUsers();
    }

     
  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((user) => {
    if (user.orderNumber === selectedCountry) {
      
       return true, confirm({allowClose:false, description: 
        <Box sx={{fontWeight: "600",color:'black'}}>
Are You Sure to Add this Item <span style={{ color: 'red' }}>{user.itemName}</span> of Weight <span style={{ color: 'red' }}>{user.itemWeight}g</span>?.
       </Box>
      })
      .then(() =>  deleteUserDatasilver(user.id))
      .catch(() => setsilverListVisibility(false));
       }
    return false;
  });

  console.log("searchSelectedCountry", searchSelectedCountry);
     const [notify, setNotify] = useState({ isOpen: false })
  const [errors,setErrors] = useState()
   const errorsound = new Audio(ErrorSound)
  const validateForm = () => {
        let temp = {};
        temp.foodItemName = searchSelectedCountry && searchSelectedCountry.itemName != 0 ? "" : "This field is required!"
        //temp.mobile = values.mobile != "none" ? "" : "This field is required.";
       
         temp.foodItemPrice = searchSelectedCountry && searchSelectedCountry.itemWeight != 0 ? "" : "This field is required.";
        //  temp.gCash = values.gCash != 0 ? "" : "This field is required.";
          temp.tax = searchSelectedCountry && searchSelectedCountry.itemPrice != 0 ? "" : "This field is required.";
        //temp.orderDetails = values.orderDetails.length != 0 ? "" : "This field is required.";
        //temp.watageitems = values.watageitems.length != 0 ? "" : "This field is required.";
        setErrors({ ...temp });
        return Object.values(temp).every(x => x === "");
    }
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

      const [display, setdisplay] = useState([]);
 const [displaysil, setdisplaysil] = useState([]);
     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.RATES).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.RATES).fetchAll()
            .then(res => {
              
                setdisplaysil(res.data)
            })
            .catch(err => console.log(err))
    }, [])
const rates =   display.map(item => (item.gold))
const ratessil =   displaysil.map(item => (item.silver))

foodItem.goldrate = rates;
foodItem.silverrate = ratessil;
foodItem.foodItemId = searchSelectedCountry &&
                          searchSelectedCountry.orderNumber
  foodItem.foodItemName = searchSelectedCountry &&
                          searchSelectedCountry.itemName

  foodItem.foodItemPrice =searchSelectedCountry && searchSelectedCountry.itemWeight
foodItem.tax = searchSelectedCountry &&
                          searchSelectedCountry.itemPrice


foodItem.rate = ratessil
 foodItem.quantity = 1
  const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => fit.filter((item) => containsText(item, searchText)),
    [searchText]
  );

const a = foodItem.foodItemPrice * foodItem.rate 
const taxRate = Number(foodItem.tax * foodItem.foodItemPrice);
const total = Number(foodItem.foodItemPrice * foodItem.rate) + Number(taxRate);
foodItem.subtotal = Math.round(total);
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
           <TableContainer component={Paper}>
      <Table style={{ Width: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name </TableCell>
      {/* <TableCell>Quantity </TableCell> */}
            <TableCell >Weight</TableCell>
            <TableCell >AddPrice</TableCell>
            <TableCell >Rate</TableCell>
           {/* <TableCell >Discount</TableCell> */}
           <TableCell >Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
             
           <TableRow>
          
               <TableCell>
                 <FormControl size="small" style = {{width: 200}}>
          <InputLabel id="search-select-label">Select Item</InputLabel>
        <Select
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
         
             value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
          label="Select  Item"
          renderValue={() => selectedCountry}
          
          
          onClose={() => setSearchText("")}
          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
       
        >
          {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Type to search..."
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
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>   

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
       
       <TableCell>
            <form onSubmit={submitOrder}>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric',  readOnly: true,}} label="Quantity" name="quantity" id="quantity" value={foodItem.quantity} onChange={handleInputChange} />
</form>

       </TableCell> */}
        <TableCell>
            <form onSubmit={submitOrder}>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric',  readOnly: true,}} label="Weight" name="foodItemPrice" id="foodItemPrice" value={foodItem.foodItemPrice} onChange={handleInputChange} />
</form>

       </TableCell>
        <TableCell>
            <form onSubmit={submitOrder}>
         <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric',  readOnly: true,}} label="AddPrice" name="tax" id="tax" value={foodItem.tax  ? foodItem.tax : 0}  onChange={handleInputChange} />
  </form>
   </TableCell>

    <TableCell>
        <form onSubmit={submitOrder}>
      <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric',  readOnly: true,}} label="Rate" name="rate" id="rate" value={foodItem.rate} onChange={handleInputChange} />
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
        }} style = {{width: 150}} label="Total" name="subtotal" id="subtotal" value={NumberFormat(Math.round(total)) || NumberFormat(foodItem.subtotal)} onChange={handleInputChange} inputProps={{ inputMode: 'numeric',  readOnly: true,}}/>
           </form>
             </TableCell> 

           <TableCell>
 <Grid container columnSpacing={{ xs: 1, sm: 2, md:3}}>
  <Grid item >
 <Button type="submit" variant="contained" size="small" onClick={submitOrder}  >Submit</Button>
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
 