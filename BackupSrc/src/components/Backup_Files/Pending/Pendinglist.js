import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { roundTo2DecimalPoint } from "../../utils/index";
import TableCell from '@mui/material/TableCell';
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import { COLORS } from '../../layouts/Colors';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import Silver from './Silver';
import PaidOutlinedIcon  from '@mui/icons-material/PaidOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactToPrint from 'react-to-print';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green ,blue} from '@mui/material/colors';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import OldCal from './OldCal';
import SearchFoodItems from './SearchFoodItems';
import OldSilver from './OldSilver';
import ItemPopup from '../../layouts/ItemPopup';
import PieceItems from './PieceItems';
import Popup from '../../layouts/Popup';
//import companyLogo from '../../img/intro.png';
import Gold from '../../img/gold.png'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Notification from "../../layouts/Notification";
import { styled } from '@mui/material/styles';
import NonStock from './NonStock';
import {NumberFormat} from '../../Services/NumberFormat';
import FancyItem from './FancyItem';
//import NonStockwastage from './NonStockwastage'
import Non_stocksilver from './Non_stocksilver';
import Non_stockfancy from './Non_stockfancy';
import { ConfirmProvider } from "material-ui-confirm";
import Cash from './Cash';
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


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: useTheme().spacing(0.2)
    },
    tablebill: {
        '& thead th': {
            fontWeight: '600',
         color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            //backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    },
     tablerow: {
        '& thead th': {
            fontWeight: '600',
          color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '600',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        },
      },
    table: {
        '& thead th': {
            fontWeight: '600',
           color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
       /* '& tbody td': {
            fontWeight: '300',
        }, */
        '& tbody tr:hover': {
            //backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
       /* '& .MuiTableCell-root': {
            border: 'none'
        } */
    },

    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'block'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root ': {
            border: 'none',
            minWidth: '20px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontSize: '1.2em',
            color: '#000'
        }
    },

    deleteButton: {
        display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))



export default function Pendinglist(props,initialFValues,initialFValuesold,initialFValueswastage,initialFValueswastagecash,initialFValuesfancy,initialFValuespiece) {
    const classes = useStyles();

  const [valuetabs, setValuetabs] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };
  
const { values, setValues,ops } = props;
  
    let orderedFoodItems = values.orderDetails;
    let oldorderedFoodItems = values.oldorderDetails;
    let ordereditems = values.watageitems;
    let orderedfancyitems = values.fancyitems;
    let orderpieceitems = values.pieceitems;
    let ordercashitems = values.cashitems;
      
    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

     const removeFoodItempiece = (index, id) => {
        //debugger;
        let x = { ...values };
        x.pieceitems = x.pieceitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

    const removeFoodItemfancy = (index, id) => {
        //debugger;
        let x = { ...values };
        x.fancyitems = x.fancyitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

     const removeFoodItemwastage = (index, id) => {
        //debugger;
        let x = { ...values };
        x.watageitems = x.watageitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
  const removeFoodItemcash = (index, id) => {
        //debugger;
        let x = { ...values };
        x.cashitems = x.cashitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const oldremoveFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.oldorderDetails = x.oldorderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const newval = 'silver';
    
      const update = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderDetails[idx];
        foodItem.foodItemName = data.foodItemName
           foodItem.foodItemPrice = data.foodItemPrice
              foodItem.quantity = data.quantity
              foodItem.tax = data.tax
             foodItem.lessweight = data.lessweight
                  foodItem.netweight = Number(data.foodItemPrice - data.lessweight)
                    foodItem.Tfiness = Number((data.netweight * data.tax ) / 100).toFixed(3);
                   foodItem.rate = data.rate
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax) : Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate;
        setValues({...x});
        setIsEditing(false)
        //resetInputField()
      }

      const newkey = 'fancy';
      const updatefancy = (idx) => {
        let x ={...values};
      
        let foodItem = x.fancyitems[idx];
        foodItem.foodItemName = datafancy.foodItemName
           foodItem.foodItemPrice = datafancy.foodItemPrice
              foodItem.quantity = datafancy.quantity
              foodItem.tax = Number((datafancy.foodItemPrice * 1)/datafancy.rate).toFixed(3)
              foodItem.rate = datafancy.rate
              foodItem.discount = datafancy.discount
 foodItem.subtotal = newkey === datafancy.type ?  (datafancy.foodItemPrice * 1)  : (datafancy.foodItemPrice * 1)
        setValues({...x});
        setIsEditingfancy(false)
        //resetInputField()
      }

       const newpcs = 'pcs';
      const updatepiece = (idx,value) => {
        let x ={...values};
      
        let foodItem = x.pieceitems[idx];
        //foodItem.foodItemName = datapiece.foodItemName
           //foodItem.foodItemPrice = datapiece.foodItemPrice
              if (foodItem.quantity + value > 0) {
            foodItem.quantity += value;
          
        }
              //foodItem.tax = datafancy.tax
              //foodItem.rate = datafancy.rate
              //foodItem.discount = datafancy.discount
 foodItem.subtotal = foodItem.foodItemPrice * foodItem.quantity
        setValues({...x});
        setIsEditingfancy(false)
        //resetInputField()
      }

      const itemwastages = 'pcs';
       const updatewastage = (idx) => {
        let x ={...values};
      
        let foodItem = x.pieceitems[idx];
        foodItem.foodItemName = datawastage.foodItemName
           foodItem.foodItemPrice = datawastage.foodItemPrice
              foodItem.quantity = datawastage.quantity
              foodItem.tax = datawastage.tax
              foodItem.discount = datawastage.discount
 foodItem.subtotal = datawastage.foodItemPrice * datawastage.quantity;
        setValues({...x});
        setIsEditingwastage(false)
        //resetInputField()
      }

      const updatewastagecash = (idx) => {
        let x ={...values};
      
        let foodItem = x.cashitems[idx];
        foodItem.foodItemName = datawastagecash.foodItemName
           foodItem.foodItemPrice = datawastagecash.foodItemPrice
              foodItem.quantity = datawastagecash.quantity
              foodItem.tax = datawastagecash.tax
              foodItem.discount = datawastagecash.discount
 foodItem.subtotal = datawastagecash.foodItemPrice * datawastagecash.quantity;
        setValues({...x});
        setIsEditingwastagecash(false)
        //resetInputField()
      }
const oldnewval = 'oldsilver';

     const oldupdate = (idx) => {
        let x ={...values};
      
        let foodItem = x.oldorderDetails[idx];

         foodItem.foodItemNames = dataold.foodItemNames
           foodItem.foodItemPrices = dataold.foodItemPrices
              foodItem.quantitys = dataold.quantitys
              foodItem.taxs = dataold.taxs
             foodItem.lessweights = dataold.lessweights
                  foodItem.netweights = Number(dataold.foodItemPrices - dataold.lessweights)
                    foodItem.Tfinesss = Number((dataold.netweights * dataold.taxs ) / 100).toFixed(3);
                   foodItem.rate = dataold.rate
              foodItem.discounts = dataold.discounts
 foodItem.subtotals = oldnewval === dataold.type ? Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate : Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate;

 {/*       foodItem.foodItemNames = dataold.foodItemNames
           foodItem.foodItemPrices = dataold.foodItemPrices
              foodItem.quantitys = dataold.quantitys
              foodItem.taxs = dataold.taxs
                  foodItem.rate = dataold.rate
   foodItem.subtotals =  oldnewval === dataold.type ?  (dataold.foodItemPrices  * dataold.rate ): Number((dataold.foodItemPrices * dataold.taxs ) / 100) * dataold.rate; 
     foodItem.discounts = dataold.discounts */}
        setValues({...x});
        setIsEditingold(false)
        //resetInputField()
      }


  
const [oldListVisibility, setOldListVisibility] = useState(false);
const [silverListVisibility, setsilverListVisibility] = useState(false);
const [nonstockListVisibility, setnonstockListVisibility] = useState(false);
const [oldsilverListVisibility, setOldsilverListVisibility] = useState(false);
const [wastageListVisibility,setwastageListVisibility] = useState(false);
 
const openListOfOld = () => {
        setOldListVisibility(true);
    }

const openListOfOldsilver = () => {
   setOldsilverListVisibility(true);
}
const openListsilver = () => {
        setsilverListVisibility(true);
    }

const openListnonstock = () => {
  setnonstockListVisibility(true);
}

const openListwastage = () => {
  setwastageListVisibility(true);
}
const [orderListVisibility, setOrderListVisibility] = useState(false);
const openListOfOrders = () => {
        setOrderListVisibility(true);
    }
       const { recordForEdit } = props;
    //let orderedFoodItems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    //const [searchList, setSearchList] = useState([]);
    //const [searchKey, setSearchKey] = useState('');

  
    useEffect(() => {

        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                //setSearchList(res.data);
            })
            .catch(err=>console.log(err))


    }, [])


useEffect(() => {
        if (recordForEdit != null)
            setData({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatafancy({
                ...recordForEdit,
                
            })
            
            if (recordForEdit != null)
            setDataold({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatawastage({
                ...recordForEdit,
                
            })
             if (recordForEdit != null)
            setDatawastagecash({
                ...recordForEdit,
                
            })
    }, [recordForEdit])
   
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
   let today = new Date();

const Todaysales = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        type:'silver',
        netweight:'',
        lessweight:'',
        foodItemId: '',
        Tfiness:'',
         salesdate:Todaysales,
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotal:0
    }

    initialFValuesfancy = {
        id: '',
        type:'fancy',
        model:'pcs',
        foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotal:0
    }
     initialFValuespiece = {
        id: '',
        type:'pcs',
        model:'pcs',
        foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        subtotal:0
    }
      initialFValueswastage = {
        id: '',
        type:'wastage',
        foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotalwastage:0
    }

    initialFValueswastagecash = {
        id: '',
        type:'wastage',
        foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotalwastage:0
    }
     initialFValuesold = {
        id: '',
        foodItemId: '',
         type:'oldsilver',
          salesdate:Todaysales,
           netweights:'',
        lessweights:'',
        foodItemNames: '',
         Tfinesss:'',
        quantitys:'',
        foodItemPrices: '',
        rate:'',
        taxs: '',
        discounts:'',
        subtotals:0
    }
    const [data, setData] = useState(initialFValues)
   // const [datapiece, setDatapiece] = useState(initialFValuespiece)
     const [datafancy, setDatafancy] = useState(initialFValuesfancy)

  const [dataold, setDataold] = useState(initialFValuesold)

  const [datawastage, setDatawastage] = useState(initialFValueswastage)
   const [datawastagecash, setDatawastagecash] = useState(initialFValueswastagecash)
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
}

 function handlefancy(e) {
        const newdatafancy = { ...datafancy }
        newdatafancy[e.target.id] = e.target.value
        setDatafancy(newdatafancy)
}

 function handlewastage(e) {
        const newdatawastage = { ...datawastage }
        newdatawastage[e.target.id] = e.target.value
        setDatawastage(newdatawastage)
}
 function handlewastagecash(e) {
        const newdatawastage = { ...datawastagecash }
        newdatawastage[e.target.id] = e.target.value
        setDatawastagecash(newdatawastage)
}
 function handleold(e) {
        const newdataold = { ...dataold }
        newdataold[e.target.id] = e.target.value
        setDataold(newdataold)
}

    const handleChange = (e) => {
        e.preventDefault()
       
       
    }

   
     const [notify, setNotify] = useState({ isOpen: false })
 const [currentId, setCurrentId] = useState(0)
const [isEditing, setIsEditing] = useState(false)
 const [currentIdfancy, setCurrentIdfancy] = useState(0)
const [isEditingfancy, setIsEditingfancy] = useState(false)
 const [currentIdwastage, setCurrentIdwastage] = useState(0)
const [isEditingwastage, setIsEditingwastage] = useState(false)
 const [currentIdold, setCurrentIdold] = useState(0)
const [isEditingold, setIsEditingold] = useState(false)

const [isEditingwastagecash, setIsEditingwastagecash] = useState(false)
 const [currentIdwastagecash, setCurrentIdwastagecash] = useState(0)

  useEffect(() => {
        if (currentId != 0) {
            setData({
                ...orderedFoodItems.find(x => x.id == currentId)
            })
            
        }
         if (currentIdfancy != 0) {
            setDatafancy({
                ...orderedfancyitems.find(x => x.id == currentIdfancy)
            })
            
        }
         if (currentIdold != 0) {
            setDataold({
                ...oldorderedFoodItems.find(x => x.id == currentIdold)
            })
            
        }
         if (currentIdwastage != 0) {
            setDatawastage({
                ...orderpieceitems.find(x => x.id == currentIdwastage)
            })
         }
           if (currentIdwastagecash != 0) {
            setDatawastagecash({
                ...ordercashitems.find(x => x.id == currentIdwastagecash)
            })
         }
    }, [currentId,currentIdold,currentIdfancy,currentIdwastage,currentIdwastagecash])
 
    const [display, setdisplay] = useState([]);
   const [displaysil, setdisplaysil] = useState([]);
    const [displaysilold, setdisplaysilold] = useState([]);
     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
            .then(res => {
              
                setdisplaysil(res.data)
            })
            .catch(err => console.log(err))
              createAPIEndpoint(ENDPIONTS.OLD_SILVER).fetchAll()
            .then(res => {
              
                setdisplaysilold(res.data)
            })
            .catch(err => console.log(err))
    }, [])
const rates =   display.map(item => (item.rate))
const silrate = displaysil.map(item => (item.rate))
const oldsilrate = displaysilold.map(item => (item.rate))
const oldrategold = rates - 100
const subtotals = values.orderDetails.reduce((prev, curr) => {
   
      return prev + (curr.foodItemPrice * curr.quantity * rates) - (curr.discount * curr.foodItemPrice * curr.quantity * rates) / 100 + curr.tax * (curr.foodItemPrice * curr.quantity * rates) / 100;
    
  }, 0);
{/*const tot = values.orderDetails.reduce((prev, curr) => {
   
      return prev + (curr.foodItemPrices - curr.quantitys) * cd;
    
  }, 0);
*/}
   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    var resultpcs = 0
  var resultpcs = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultcash = 0
  var resultcash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0

  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + resultfancy + resultcash;

  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage  + resultpcs ;
 var totalfiness = values.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)
  // var totalfiness = values.orderDetails.reduce((total, currentValue) => total = total +   Number(((currentValue.foodItemPrice - currentValue.lessweight) * currentValue.tax)/100),0)
  var cashfiness = values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
  
   //var adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(((currentValue.foodItemPrices - currentValue.lessweights) * currentValue.taxs)/100),0)         
   var adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0) + Number(cashfiness)
   var netbalancefiness =  Number(totalfiness - adjustfiness)
   const Total = data.foodItemPrice * data.quantity
const componentRef = useRef();
  const Print = () => {  
    window.print();
  }
  const visible = 'hideedit'
const noId = 0;
const vat = Number(values.cgst) + Number(values.sgst);
const taxRate = (vat * Math.round(newitem).toFixed(2)) / 100;
const scgst = Math.round(newitem).toFixed(2)  + taxRate;
  const edited = "Balance";
   let totalcash =  (Number(values.cashreceived) + Number(values.cashreceivedonline));
  return (
    
    <Grid container spacing={2}>
    <Grid item xs={6}>
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar
    
    >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6"
         
          
        >
      PURCHASES
        </Typography>
        <Grid
  container
  
  direction="column"
  
 
  
>

  <Grid >
    <TextField
             sx={{ m: 1, width: '25ch' }}
          placeholder="Search Item"
  variant="standard"
  size="small"
         value={rates}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              
              <ThemeProvider theme={blackTheme}>
            <Button className={`${classes.root} `}  >
              <Badge badgeContent={orderedFoodItems.length} color="primary" > 
      <Tooltip title="Add Item"   arrow> 
        <LocalPrintshopOutlinedIcon onClick={handleClickOpen}/> 
         </Tooltip>
    </Badge>
        
          </Button>
   </ThemeProvider>
             </InputAdornment>
          }}
        />
     
  </Grid>   
   
</Grid> 
 
  {/* <IconButton onClick={openListwastage}>
 <img src="https://img.icons8.com/material/30/FAB005/increase-decimal.png"/>
       
 
        </IconButton> */}


    <IconButton onClick={openListnonstock}>
    <img src="https://img.icons8.com/fluency/35/null/cash--v1.png"/>

  </IconButton>

    <IconButton onClick={openListsilver}>
   
        <img src="https://img.icons8.com/color/38/000000/silver-bars.png"/>
  </IconButton>

<IconButton onClick={openListOfOrders}>
<img src="https://img.icons8.com/external-vectorslab-flat-vectorslab/40/000000/external-gold-bar-project-management-and-web-marketing-vectorslab-flat-vectorslab.png"/>
       
 
</IconButton>
    </Toolbar>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table }>
        <TableHead>
          <TableRow>
             <TableCell>Date</TableCell>
            <TableCell>ItemName</TableCell>
            <TableCell>Gross Weight</TableCell>
            <TableCell>Loss Weight</TableCell>
             <TableCell>Net Weight</TableCell>
               <TableCell>Purity</TableCell>
                <TableCell>Finess</TableCell>
                <TableCell>Rate</TableCell>
            <TableCell>Cash</TableCell>
                  <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          orderedFoodItems.map((item ,idx) => {
          resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
         //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
          result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    {/*   <TableCell  component="th" scope="row">{
              noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
              <TableCell>
                <Div >{item.salesdate}</Div>
              </TableCell>
                                        <TableCell  >
                                         
                                   {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Item" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={data.foodItemName} onChange={(e) => handle(e)} />
                </form>
                : <Div >{item.foodItemName}</Div>
            }
                                        </TableCell>
             
                                        <TableCell >
                                            <>
{
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Gross Weight" 
                name="foodItemPrice" id="foodItemPrice" value={data.foodItemPrice} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.foodItemPrice}g</Div>
            }
                                 </>
                                        </TableCell>


                                        <TableCell >
                                            <>
{
                isEditing === idx ? newval === item.type ? "-" :
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Loss Weight" 
                name="lessweight" id="lessweight" value={data.lessweight} onChange={(e) => handle(e)} />
                </form>
                : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
            }
                                 </>
                                        </TableCell>

                                        <TableCell >
                                          
                    {
                isEditing ===idx ? 
                      <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(data.foodItemPrice  - data.lessweight))}</Div>
                :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
            }
          </TableCell>
                                             <TableCell >
                                           {
                isEditing ===idx ? newval === item.type ? "-" :
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Purity" name="tax" id="tax" 
           value={data.tax} onChange={(e) => handle(e)} />
                </form>
                : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
            }
                                           
                                        </TableCell>
                                          <TableCell>

 {  isEditing ===idx ? newval === data.type ? "-": (((data.foodItemPrice - data.lessweight) * data.tax ) / 100).toFixed(3)
             :  <Div > {newval === item.type ? "-" : (((item.foodItemPrice - item.lessweight) * item.tax ) / 100).toFixed(3) }</Div>    
                                         }
                                     
                                  </TableCell>
                                   <TableCell>
                                      {/*newval === item.type ? item.rate :rates */}
                                        {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={data.rate} onChange={(e) => handle(e)} />
                </form>
                : <Div >{item.rate}</Div>
            }
                                          </TableCell> 
                              
          
                                     
                            
                                       <TableCell>
                              
 {  isEditing ===idx ? newval === data.type ?  Math.round((data.foodItemPrice * data.rate) + Number(data.tax)) : NumberFormat(Math.round(Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate))
             :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditing === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>update(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentId(item.id) 
                                              setIsEditing(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItem(idx, item.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}
              
        
              {
               orderpieceitems.map((datapcs,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/*  <TableCell  component="th" scope="row">{
              noId == datapcs.foodItemId ?  <KeyOffTwoToneIcon/> :datapcs.foodItemId  }</TableCell> */}
                <TableCell>
                <Div >{datapcs.salesdate}</Div>
              </TableCell>
              <TableCell> 
                {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastage.foodItemName} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div >{datapcs.foodItemName}</Div>
            }
                
                </TableCell>
              <TableCell> -</TableCell>
            
          <TableCell><Div> -</Div> </TableCell>
              <TableCell><Div> -</Div> </TableCell>
                  <TableCell><Div> -</Div> </TableCell>
              <TableCell><Div> -</Div> </TableCell>
           <TableCell>-</TableCell>
             
                   <TableCell>
               
             
                {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastage.foodItemPrice} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div >{datapcs.foodItemPrice}</Div>
            }
                
                
                                       </TableCell>
            <TableCell >
                                          {
                                             isEditingwastage === idx ? 
                                          <ThemeProvider theme={blueTheme}>
                                              <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatewastage(idx)}>
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                               </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdwastage(datapcs.id) 
                                              setIsEditingwastage(idx,true)
                                         }} >
                                               <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                        </ThemeProvider>
            }                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItempiece(idx, datapcs.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
             
            </TableRow>
          ))}

         
           <TableRow className={classes.tablerow}>
                             <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Pure :</TableCell>
                            <TableCell>
                                <Typography  display="block"  style={{color:'green'}}>
                            {((totalfiness)).toFixed(3)}G
                            </Typography>
                            </TableCell>
                          <TableCell>Cash :</TableCell>
                          <TableCell>
                            <Typography  display="block"  style={{color:'green'}}>
                            {NumberFormat(Math.round(newitem))}
                            </Typography></TableCell>
                           </TableRow>
            <TableRow className={classes.tablerow}>
                            <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Equity:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'blue'}}>
                            {((adjustfiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Equity :</TableCell>
                          <TableCell> 
                             <Typography  display="block"  style={{color:'blue'}}>
                            {
                            //NumberFormat(Math.round(values.onlinecash))
                           NumberFormat(Math.round(news))
                          }
                             </Typography>
                             </TableCell>
                           </TableRow>
                           <TableRow className={classes.tablerow}>
                         <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Balance:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'red'}}>
                            {((netbalancefiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Balance :</TableCell>
                          <TableCell>
                             <Typography  display="block"  style={{color:'red'}}>
                            {
                              
                            //NumberFormat(values.gTotal - ( Number(values.gCash) - Number(values.onlinecash)) - Math.round(news))
                            NumberFormat((Number(values.gTotal)) - Number(Math.round(news)) - (-totalcash))
                            
                            }
                          </Typography>
                          </TableCell>
                           </TableRow>

          

        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
    
            <ItemPopup
                title="Wastage"
                openPopupitem={wastageListVisibility}
                setOpenPopupitem={setwastageListVisibility}>
                 
               <Cash
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
             <ItemPopup
                title="Silver"
                openPopupitem={silverListVisibility}
                setOpenPopupitem={setsilverListVisibility}>
                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabs} onChange={handleChangetabs} textColor="secondary"
        indicatorColor="secondary" >
          <Tab label="Silver" {...a11yProps(0)} />
          <Tab label="Fancy" {...a11yProps(1)} />
         <Tab label="Non_Stock_Silver" {...a11yProps(2)} />
        
        </Tabs>
      </Box>
     <TabPanel value={valuetabs} index={0}>
        <Silver
                    {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
                />
      </TabPanel>

       <TabPanel value={valuetabs} index={1}>
         <FancyItem 
          {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         
         />
     
      </TabPanel>
       <TabPanel value={valuetabs} index={2}>
        <Non_stocksilver
         {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         />
     
      </TabPanel>
                
              
            </ItemPopup>
              <ItemPopup
                title="Piece"
                openPopupitem={nonstockListVisibility}
                setOpenPopupitem={setnonstockListVisibility}>
                 
                <PieceItems
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
    </Paper>
    </Grid>
     <Grid item xs={6}>
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar
    
    >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6" >
      Equity
        </Typography>
     

 <Tooltip title="CASH"   arrow> 
        <IconButton onClick={openListwastage}>
        <img src="https://img.icons8.com/fluency/35/null/cash--v1.png"/>
  </IconButton>
         </Tooltip>

      <Tooltip title="Old Silver Item"   arrow> 
        <IconButton onClick={openListOfOldsilver}>
        <img src="https://img.icons8.com/fluency/35/null/cash--v1.png"/>
  </IconButton>
         </Tooltip>

 <Tooltip title="Old Gold Item"   arrow> 
        <IconButton onClick={openListOfOld}>
<img src="https://img.icons8.com/fluency/36/000000/gold-ore.png"/>
</IconButton>
         </Tooltip>
 

    </Toolbar>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader className={classes.table }>
        <TableHead>
          <TableRow>
             <TableCell>Date</TableCell>
            <TableCell>ItemName</TableCell>
            <TableCell>Gross Weight</TableCell>
             <TableCell>Less Weight</TableCell>
              <TableCell>Net Weight</TableCell>
             <TableCell>Purity</TableCell>
              <TableCell>Finess</TableCell>
             <TableCell>Cash</TableCell>
             <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
         oldorderedFoodItems.map((item ,idx) => {
          oldresults = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
          oldresult = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                         <TableCell>
                <Div >{item.salesdate}</Div>
              </TableCell>
                                        <TableCell  component="th" scope="row">
                                         
                                   {
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
          <TextField label="foodItemName" name="foodItemNames" id="foodItemNames" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataold.foodItemNames} onChange={(e) => handleold(e)} />
                </form>
                : <Div >{item.foodItemNames}</Div>
            }
                                        </TableCell>
                                        <TableCell >
                                            <>
{
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrices" id="foodItemPrices" value={dataold.foodItemPrices} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.foodItemPrices   }</Div>
            } </>
                                        </TableCell>
                                             <TableCell >
                                            <>
{
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Less Weight" 
                name="lessweights" id="lessweights" value={dataold.lessweights} onChange={(e) => handleold(e)} />
                </form>
                : <Div > {oldnewval === dataold.type ? item.lessweights : item.lessweights   }</Div>
            } </>
                                        </TableCell>
           <TableCell >
                                          
                    {
                isEditingold ===idx ? 
                      <Div > {oldnewval === dataold.type ? roundTo2DecimalPoint(Number(dataold.foodItemPrices  - dataold.lessweights)) : roundTo2DecimalPoint(Number(dataold.foodItemPrices  - dataold.lessweights))}</Div>
                :    <Div > {oldnewval === dataold.type? roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights)) :roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights))}</Div>
            }
          </TableCell>
                                        
                                        <TableCell >
                                           {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="taxs" name="taxs" id="taxs" 
           value={dataold.taxs} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.taxs }%</Div>
            }
                                           
                                        </TableCell>
                                        <TableCell>
                                               { 

      
             isEditingold ===idx ? oldnewval === dataold.type ?  0 : (((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100).toFixed(3)
             :    <Div > {(((item.foodItemPrices - item.lessweights) * item.taxs ) / 100).toFixed(3) }</Div>
                                         }
                                          </TableCell>
                                        <TableCell> 
                                        {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Rate" name="rate" id="rate" 
           value={dataold.rate} onChange={(e) => handleold(e)} />
                </form>
                : <Div >{item.rate}</Div>
            }
                                        
                                        </TableCell>
                                       <TableCell>
                               

                                         { 
                                            isEditingold ===idx ? oldnewval === dataold.type ? Math.round(Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate )  : Math.round(Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate )         
                                            :  <Div > {Math.round(item.subtotals)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditingold === idx ? 
                 
                                          <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>oldupdate(idx)
                                             
                                            }>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdold(item.id) 
                                              setIsEditingold(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => oldremoveFoodItem(idx, item.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}
                {
               ordercashitems.map((datacash,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/*  <TableCell  component="th" scope="row">{
              noId == datapcs.foodItemId ?  <KeyOffTwoToneIcon/> :datapcs.foodItemId  }</TableCell> */}
                <TableCell>
                <Div >{datacash.salesdate}</Div>
              </TableCell>
              <TableCell> 
                {
                isEditingwastagecash === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastagecash.foodItemName} onChange={(e) => handlewastagecash(e)} />
                </form>
                : <Div >{datacash.foodItemName}</Div>
            }
                
                </TableCell>
              <TableCell> -</TableCell>
            
          <TableCell><Div> -</Div> </TableCell>
              <TableCell><Div> -</Div> </TableCell>
                  <TableCell><Div> -</Div> </TableCell>
              <TableCell><Div> -</Div> </TableCell>
           <TableCell>-</TableCell>
             
                   <TableCell>
               
             
                {
                isEditingwastagecash === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastagecash.foodItemPrice} onChange={(e) => handlewastagecash(e)} />
                </form>
                : <Div >{datacash.foodItemPrice}</Div>
            }
                
                
                                       </TableCell>
            <TableCell >
                                          {
                                             isEditingwastagecash === idx ? 
                                          <ThemeProvider theme={blueTheme}>
                                              <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatewastagecash(idx)}>
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                               </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdwastagecash(datacash.id) 
                                              setIsEditingwastagecash(idx,true)
                                         }} >
                                               <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                        </ThemeProvider>
            }                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemcash(idx, datacash.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
             
            </TableRow>
          ))}
                {
               orderedfancyitems.map((dataafancy,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                <Div >{dataafancy.salesdate}</Div>
              </TableCell>
              <TableCell>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemName} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >-</Div></TableCell>
                                           <TableCell><Div >-</Div></TableCell>
                                             <TableCell><Div >-</Div></TableCell>
                                              <TableCell><Div >-</Div></TableCell>
                                               <TableCell>
                                                {
                                                   isEditingfancy === idx ?  <Div >{((dataafancy.foodItemPrice * 1) / datafancy.rate).toFixed(3)}</Div> :
                                                    <Div >{dataafancy.tax}</Div>
                                                }
                                               </TableCell>
                                      {/*  <TableCell >
                                            <>
{
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          
                            
            <TableCell>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.rate} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell> */}
                <TableCell>

                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.rate} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell>

              
                   <TableCell>
                { 

      
             isEditingfancy ===idx ? newkey === data.type ?  <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form> : 
                 <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
             :   <Div > {Math.round(dataafancy.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          
                                           {
                                             isEditingfancy === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatefancy(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdfancy(dataafancy.id) 
                                              setIsEditingfancy(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemfancy(idx, dataafancy.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}
           <TableRow className={classes.tablerow}>
                            
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Pure :</TableCell>
                            <TableCell>
                                <Typography  display="block"  style={{color:'green'}}>
                            {((totalfiness)).toFixed(3)}G
                            </Typography>
                            </TableCell>
                          <TableCell>Cash :</TableCell>
                          <TableCell>
                            <Typography  display="block"  style={{color:'green'}}>
                            {NumberFormat(Math.round(newitem))}
                            </Typography></TableCell>
                           </TableRow>
            <TableRow className={classes.tablerow}>
                           
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Equity:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'green'}}>
                            {((adjustfiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Equity :</TableCell>
                          <TableCell> 
                             <Typography  display="block"  style={{color:'blue'}}>
                              {
                            //NumberFormat(Math.round(values.onlinecash))
                           NumberFormat(Math.round(news))
                          }
                             </Typography>
                             </TableCell>
                           </TableRow>
                           <TableRow className={classes.tablerow}>
                        
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Balance:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'green'}}>
                           {((netbalancefiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Balance :</TableCell>
                          <TableCell>
                             <Typography  display="block"  style={{color:'red'}}>
                         {
                         //NumberFormat(values.gTotal - ( Number(values.gCash) - Number(values.onlinecash)) - Math.round(news))
                            NumberFormat((Number(values.gTotal)) - Number(Math.round(news)) - (-totalcash))
                       }
                          </Typography>
                          </TableCell>
                           </TableRow>
             
           
        
        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
      <ItemPopup
                title="Place Pending Items"
                openPopupitem={orderListVisibility}
                setOpenPopupitem={setOrderListVisibility}>
                 
                 
                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabs} onChange={handleChangetabs} textColor="secondary"
        indicatorColor="secondary" >
          <Tab label="Stock" {...a11yProps(0)} />
         <Tab label="Non_Stock" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <TabPanel value={valuetabs} index={0}>
            <ConfirmProvider>
     <SearchFoodItems
                    {...{
                      setOrderListVisibility,
                        values,
                        setValues
                    }}
                />
    </ConfirmProvider>
      
      </TabPanel>
     
      <TabPanel value={valuetabs} index={1}>
        <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
      </TabPanel>
                 
            </ItemPopup>
               <ItemPopup
                title="Old"
                openPopupitem={oldListVisibility}
                setOpenPopupitem={setOldListVisibility}>
                 
                <OldCal
                    {...{
                      setOldListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
            <ItemPopup
                title="Old_Silver"
                openPopupitem={oldsilverListVisibility}
                setOpenPopupitem={setOldsilverListVisibility}>
                 
                <Non_stockfancy 
       {...{ops,
                      //setsilverListVisibility,
                        values,
                        setValues
                    }}
       />
            </ItemPopup>
           
              <Dialog
        maxWidth={50}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         
        <DialogContent>
          <DialogContentText ref={componentRef}>
               <Box >
         <Box height='150.5px'>
           
        </Box>

  <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          <TableRow>
           <TableCell>{values.shopName}</TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
             <TableCell ></TableCell>
            <TableCell >{values.hireDate}</TableCell>
          </TableRow>
           
          <TableRow>
           <TableCell>Item</TableCell>
            <TableCell >Weight</TableCell>
           {/*  <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> */}
           <TableCell >Finess</TableCell>
           <TableCell >Gross Finess</TableCell>
              <TableCell >Rate</TableCell>
            <TableCell >Net Amount</TableCell>
            <TableCell >Received</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {orderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                {/*   <TableCell >{item.quantity}</TableCell> */}
              <TableCell >{item.foodItemPrice}</TableCell>
      {/*     <TableCell >-</TableCell> */}
           <TableCell >{item.tax == 0 ? "-" : item.tax+"%"}</TableCell>
           <TableCell >{item.Tfiness}</TableCell>
            <TableCell >{item.rate}</TableCell>
         
              <TableCell >                              
 { 
             isEditing ===idx ? newval === data.type ? NumberFormat(Math.round((data.foodItemPrice * silrate) + Number(data.tax))) : NumberFormat((data.foodItemPrice * data.quantity * rates) - (data.discount * data.foodItemPrice * data.quantity * rates) / 100 + data.tax * (data.foodItemPrice * data.quantity * rates) / 100 )
             :   NumberFormat(Math.round(item.subtotal))
                                         }</TableCell>
                                           <TableCell >-</TableCell>
            </TableRow>
          ))}
        

         
          {orderpieceitems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                 {/*  <TableCell >{item.quantity}</TableCell> */}
                    <TableCell >-</TableCell>
                     <TableCell >-</TableCell>
                        <TableCell >-</TableCell>
             {/* <TableCell >{item.foodItemPrice}</TableCell> */}
               <TableCell >-</TableCell>
               <TableCell >{NumberFormat(Math.round(item.subtotal)) }</TableCell>
               <TableCell >-</TableCell>
              
            </TableRow>
          ))}
{oldorderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemNames}</TableCell>
              
              <TableCell>{item.foodItemPrices}</TableCell>
                <TableCell >{item.taxs +"%"}</TableCell>
                  <TableCell >{item.Tfiness}</TableCell>
               <TableCell >{item.rate}</TableCell>
             
            
                      <TableCell >-</TableCell>
              <TableCell >                              
{ 
 isEditingold ===idx ? oldnewval === dataold.type ? NumberFormat(Math.round(('-'+dataold.foodItemPrices - dataold.quantitys) * dataold.rate)) : NumberFormat(('-'+dataold.foodItemPrices - dataold.quantitys ) * dataold.rate )          
    : NumberFormat(Math.round('-'+item.subtotals))
            }</TableCell>
            </TableRow>
          ))}
           {orderedfancyitems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                  <TableCell >{item.quantity}</TableCell>
             <TableCell >-</TableCell>
              <TableCell >-</TableCell>
               <TableCell >-</TableCell>
                  <TableCell >-</TableCell>
                      
              <TableCell >   
                 { 
 isEditingfancy ===idx ? newkey === data.type ? NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate )) )) :  NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate ))))
             :  NumberFormat(Math.round(item.subtotal))
                                         }                           
</TableCell>
           
            </TableRow>
          ))}

{/*
 <TableRow>
        <TableCell rowSpan={8} />
            <TableCell colSpan={3}>doted_line</TableCell>
    
          
            <TableCell align="right">----------------------</TableCell>
            <TableCell align="right">----------------------</TableCell>
          </TableRow>
          */
}
         <TableRow>
        <TableCell rowSpan={8} />
            <TableCell colSpan={3}>Grand_Total</TableCell>
            <TableCell >{NumberFormat(Math.round(newitem))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Received</TableCell>
           
            <TableCell >{NumberFormat('-'+Math.round(news))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Balance/Debit Amount</TableCell>
            <TableCell >
                        {NumberFormat(Math.round(values.gTotal - values.discou))}</TableCell>
          </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer> 

    

         
              
         </Box>
 
          </DialogContentText>
       
<ReactToPrint
        trigger={() =>  <IconButton color="info" >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> 
        </DialogContent>
       
      </Dialog>
       
    </Paper>
    </Grid>
    </Grid>
   
  );
}
