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
import Autocomplete from '@mui/material/Autocomplete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {NumberFormat} from '../../Services/NumberFormat';
import TableRow from '@mui/material/TableRow';
import { roundTo2DecimalPoint } from "../../utils/index";
import * as index from '../../api/index';
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

export default function SearchFoodItems(props, initialFValues) {

    const { values, setValues, setOrderListVisibility,recordForEdit } = props;
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

const Todaysales = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            itemType:'gold',
             HSN_Code:foodItem.HSN_Code,
        Purity:foodItem.Purity,
        UOM:foodItem.UOM,
            HUID:foodItem.HUID,
            foodItemId: foodItem.foodItemId,
            quantity: foodItem.quantity,
            tax: foodItem.tax,
             salesdate:Todaysales,
             rate:foodItem.rate,
            foodItemPrice: foodItem.foodItemPrice ,  //data.prices
            foodItemName: foodItem.foodItemName ,
            discount: foodItem.discount ,  //data.fullname 
            subtotal:Math.round(total)
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
        setOrderListVisibility(false);
        resetInputField()
    }
 const addFoodItems = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            
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
            orderDetails: [...values.orderDetails, x]
        })
        setOrderListVisibility(false);
        //resetInputField()
    }
 
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        foodItemId: '',
        itemType:'gold',
        HSN_Code:'7113',
        Purity:'22K916',
        UOM:'GMS',
        HUID:'',
         salesdate:Todaysales,
        quantity:1,
        foodItemName: '',
        foodItemPrice: '',
        tax: '',
        rate:'',
        discount:'',
        subtotal:0
    }
    const [foodItem, setData] = useState(initialFValues)
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
    const errorsound = new Audio(ErrorSound)
    const submitOrder = e => {
        e.preventDefault();
          if (validateForm()) {
               addFoodItem(foodItem)
             
                createAPIEndpoint(ENDPIONTS.SALESREPORT).salescreate(foodItem)
                    .then(res => {
                      //audio.play()
                       //resetFormControls();
                      // resetForm()
                        setNotify({ isOpen: true, message: 'New Item is Added.',severity:"success" ,variant:'filled'});
                    })
                     .catch(err => console.log(err))
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
            
            createAPIEndpoint(ENDPIONTS.GSTSALESREPORT).salescreate(foodItem)
                    .then(res => {
                      //audio.play()
                       //resetFormControls();
                      // resetForm()
                        setNotify({ isOpen: true, message: 'New Item is Added.',severity:"success" ,variant:'filled'});
                    })
                     .catch(err => console.log(err))
          }else{
            setNotify({ isOpen: true, message: "Fill All the Fields",severity:"warning" ,variant:"filled"});
             errorsound.play()
          }
        }

 /*   const submitOrder = e => {
        e.preventDefault();
         
           addFoodItem(foodItem)
                createAPIEndpoint(ENDPIONTS.SALESREPORT).salescreate(foodItem)
                    .then(res => {
                      //audio.play()
                       //resetFormControls();
                      // resetForm()
                        setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                    })
                     .catch(err => console.log(err))
                    //.catch(
                      //      errorsound.play(),
                      //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
       } */

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
        const dataUrl = index.BASE_URL+`GstGoldStock`;
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
 const fit = countries.map((item) => item.HUID)
  const [selectedCountry, setSelectedCountry] = useState(fit[0]);
  console.log("selectedCountry", selectedCountry);
const deleteUserData = async (id) => {
  await deleteUser(id);
       
    }

  const getFreshModelObject = () => {
    
           searchSelectedCountry.itemName=""
          searchSelectedCountry.itemWeight=""
        searchSelectedCountry.itemPrice=""
      // searchSelectedCountry.gTotal=""
  }
     
  //   find selected country data
  //search selected country
  const searchSelectedCountry = countries.find((user) => {
    if (user.HUID === selectedCountry) {
      
       return true,confirm({ allowClose:false, description: `Are You Sure to Add this Item ${user.itemName} of Weight ${user.itemWeight}g?.`})
      .then(() =>   deleteUserData(user.id))
      .catch(() => setOrderListVisibility(false));
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
foodItem.foodItemId = searchSelectedCountry &&
                          searchSelectedCountry.orderNumber
foodItem.HUID = searchSelectedCountry &&
                          searchSelectedCountry.HUID
  foodItem.foodItemName = searchSelectedCountry &&
                          searchSelectedCountry.itemName

  foodItem.foodItemPrice =searchSelectedCountry && searchSelectedCountry.itemWeight
foodItem.tax = searchSelectedCountry && searchSelectedCountry.itemPrice
 foodItem.rate = rates
 foodItem.quantity = 1

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
            <TableCell>Select Stock Item </TableCell>
          <TableCell >HUID_ID</TableCell> 
          <TableCell> Item Name </TableCell>
            <TableCell >Weight</TableCell>
            <TableCell >Percent</TableCell>
          
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
          label="Options"
          
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
    <TableCell>
          <form onSubmit={submitOrder}>
          <TextField   InputProps={{
          readOnly: true
        }} focused size="small" style = {{width: 100}}   name="HUID" id="HUID" value={foodItem.HUID} onChange={handleInputChange} />
       </form>
       </TableCell>
    <TableCell>
          <form onSubmit={submitOrder}>
          <TextField   InputProps={{
          readOnly: true
        }} focused size="small" style = {{width: 100}}   name="foodItemName" id="foodItemName" value={foodItem.foodItemName} onChange={handleInputChange} />
       </form>
       </TableCell>
        <TableCell>
              <form onSubmit={submitOrder}>
          <TextField  InputProps={{
          readOnly: true
        }} focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }}  name="foodItemPrice" id="foodItemPrice" value={foodItem.foodItemPrice} onChange={handleInputChange} />
</form>
       </TableCell>
        <TableCell>
              <form onSubmit={submitOrder}>
         <TextField    InputProps={{
          readOnly: true
        }} focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }}  name="tax" id="tax" value={foodItem.tax }  onChange={handleInputChange} />
  
</form>
 </TableCell>
 
   <TableCell>
       <form onSubmit={submitOrder}>
           <TextField  InputProps={{
          readOnly: true
        }}  focused size="small" style = {{width: 100}} label="Rate" name="rate" id="rate" value={foodItem.rate } onChange={handleInputChange} />
           </form>
          </TableCell> 
         
           { /*       
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
        }} style = {{width: 150}} label="Total" name="subtotal" id="subtotal" value={NumberFormat(Math.round(total)) || NumberFormat(foodItem.subtotal) } onChange={handleInputChange} disabled/>
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
 