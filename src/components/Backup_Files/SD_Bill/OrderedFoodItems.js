import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { COLORS } from '../../layouts/Colors';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import Silver from './Silver';
import PaidOutlinedIcon  from '@mui/icons-material/PaidOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import Divider from '@mui/material/Divider';
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
import Fade from '@mui/material/Fade';
import Gold from '../../img/gold.png'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Notification from "../../layouts/Notification";
import { styled } from '@mui/material/styles';
import NonStock from './NonStock';
import Golwast from './Golwast';
import Percent from './Percent';
import {NumberFormat} from '../../Services/NumberFormat';
import FancyItem from './FancyItem';
import NonStockwastage from './NonStockwastage'
import Non_stocksilver from './Non_stocksilver';
import Non_stockfancy from './Non_stockfancy';
import AddNon_Stock from './AddNon_Stock';
import Add_Stock from './Add_Stock';
import { ConfirmProvider } from "material-ui-confirm";
import Draggable from 'react-draggable';
import Estimate from '../../img/estimate.png';
import './style.css';
import Printicon from '../../Icons/print.png'
import Closeicon from '../../Icons/close.png'
import { Bolt } from '@mui/icons-material';
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
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
tablerow:{
 fontWeight: '600',
          color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
},
tablebill: {
        '& thead th': {
            fontWeight: '600',
            //color: COLORS.TableHeadColor,
      //backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '600',
        },
        
        '& tbody tr:hover': {
            //backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    },
    table: {
        '& thead th': {
            fontWeight: '600',
          color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '600',
        },
        '& tbody tr:hover': {
            //backgroundColor: '#fffbf2',
            //cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
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
    },
      rootbutton: {
        minWidth: 0,
        
    },
    dialogWrapper: {
        padding: useTheme().spacing(1),
        position: 'absolute',
        top: useTheme().spacing(0)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))



export default function OrderedFoodItems(props,initialFValues,addinitialFValues,stockaddinitialFValues,initialFValuesold,initialFValueswastage,initialFValuesfancy,initialFValuespiece,initialFValuespercent,initialFValuesilver) {
    const classes = useStyles();

  const [valuetabs, setValuetabs] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };
  
const { values, setValues,ops } = props;
  
    let orderedFoodItems = values.orderDetails;
    let oldorderedFoodItems = values.oldorderDetails;
    let oldorderedFoodItemssilver = values.oldorderDetailsilver;
    let ordereditems = values.watageitems;
    let orderedfancyitems = values.fancyitems;
    let orderpieceitems = values.pieceitems;
    let addorderedFoodItems = values.addorderDetails;
     let stockaddorderedFoodItems = values.stockaddorderDetails;
let orderedFoodItemspercent = values.orderPercent;
    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

     const removeFoodItempercent = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderPercent = x.orderPercent.filter((_, i) => i !== index);
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
const addremoveFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.addorderDetails = x.addorderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

    const stockaddremoveFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.stockaddorderDetails = x.stockaddorderDetails.filter((_, i) => i !== index);
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

    const oldremoveFoodItemsilver = (index, id) => {
        //debugger;
        let x = { ...values };
        x.oldorderDetailsilver = x.oldorderDetailsilver.filter((_, i) => i !== index);
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
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax * data.foodItemPrice) : (data.foodItemPrice * data.quantity * data.rate) - (data.discount * data.foodItemPrice * data.quantity * data.rate) / 100 + data.tax * (data.foodItemPrice * data.quantity * data.rate) / 100 
        setValues({...x});
        setIsEditing(false)
        //resetInputField()
      }
  const updatepercent = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderPercent[idx];
        foodItem.foodItemName = datapercent.foodItemName
           foodItem.foodItemPrice = datapercent.foodItemPrice
              foodItem.quantity = datapercent.quantity
              foodItem.tax = datapercent.tax
              foodItem.discount = datapercent.discount
               foodItem.subtotal = newval === datapercent.type ?  (datapercent.foodItemPrice * datapercent.rate) + Number(datapercent.tax * datapercent.foodItemPrice) : (datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) - (datapercent.discount * datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) / 100 + datapercent.tax * (datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) / 100 
 //foodItem.subtotal =  (data.foodItemPrice * data.quantity * data.rate) - (data.discount * data.foodItemPrice * data.quantity * data.rate) / 100 + data.tax * (data.foodItemPrice * data.quantity * data.rate) / 100 
        setValues({...x});
        setIsEditingpercent(false)
        //resetInputField()
      }
      const newkey = 'fancy';
      const updatefancy = (idx) => {
        let x ={...values};
      
        let foodItem = x.fancyitems[idx];
        foodItem.foodItemName = datafancy.foodItemName
           foodItem.foodItemPrice = datafancy.foodItemPrice
              foodItem.quantity = datafancy.quantity
              foodItem.tax = datafancy.tax
              foodItem.rate = datafancy.rate
              foodItem.discount = datafancy.discount
 foodItem.subtotal = newkey === datafancy.type ?  (datafancy.foodItemPrice * datafancy.rate)  : (datafancy.foodItemPrice * datafancy.rate)
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
              if (Number(foodItem.quantity) + value > 0) {
            foodItem.quantity += value;
          
        }
              //foodItem.tax = datafancy.tax
              //foodItem.rate = datafancy.rate
              //foodItem.discount = datafancy.discount
 foodItem.subtotal = Number(foodItem.foodItemPrice) * Number(foodItem.quantity)
        setValues({...x});
        setIsEditingfancy(false)
        //resetInputField()
      }

      const itemwastages = 'wastage';
       const updatewastage = (idx) => {
        let x ={...values};
      
        let foodItem = x.watageitems[idx];
        foodItem.foodItemName = datawastage.foodItemName
           foodItem.foodItemPrice = datawastage.foodItemPrice
              foodItem.quantity = datawastage.quantity
              foodItem.tax = datawastage.tax
              foodItem.discount = datawastage.discount
 foodItem.subtotal = itemwastages === datawastage.type ? Math.round( (Number(datawastage.foodItemPrice) +  Number(datawastage.tax)) * datawastage.rate)  : Math.round( (Number(datawastage.foodItemPrice) +  Number(datawastage.tax)) * datawastage.rate) 
        setValues({...x});
        setIsEditingwastage(false)
        //resetInputField()
      }
      const additem = 'add';
       const addupdate = (idx) => {
        let x ={...values};
      
        let foodItem = x.addorderDetails[idx];
        foodItem.foodItemName = dataadd.foodItemName
           foodItem.foodItemPrice = dataadd.foodItemPrice
              foodItem.quantity = dataadd.quantity
              foodItem.tax = dataadd.tax
              foodItem.discount = dataadd.discount
 foodItem.subtotal = additem === dataadd.type ? ( Number(dataadd.foodItemPrice) * (Number(dataadd.tax)+ Number(dataadd.rate)) ) :( Number(dataadd.foodItemPrice) * (Number(dataadd.tax)+ Number(dataadd.rate)) );
        setValues({...x});
        setIsEditingadd(false)
        //resetInputField()
      }

       const stockadditem = 'stockadd';
       const stockaddupdate = (idx) => {
        let x ={...values};
      
        let foodItem = x.stockaddorderDetails[idx];
        foodItem.foodItemName = stockdataadd.foodItemName
           foodItem.foodItemPrice = stockdataadd.foodItemPrice
              foodItem.quantity = stockdataadd.quantity
              foodItem.tax = stockdataadd.tax
              foodItem.discount = stockdataadd.discount
 foodItem.subtotal = stockadditem === stockdataadd.type ? ( Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax)+ Number(stockdataadd.rate)) ) :( Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax)+ Number(stockdataadd.rate)) );
        setValues({...x});
        stocksetIsEditingadd(false)
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
   foodItem.subtotals =  oldnewval === dataold.type ?  (dataold.foodItemPrices - dataold.quantitys) * dataold.rate : (dataold.foodItemPrices - dataold.quantitys ) * dataold.rate           
              foodItem.discounts = dataold.discounts
        setValues({...x});
        setIsEditingold(false)
        //resetInputField()
      }

      const oldupdatesilver = (idx) => {
        let x ={...values};
      
        let foodItem = x.oldorderDetailsilver[idx];
        foodItem.foodItemNames = dataoldsilver.foodItemNames
           foodItem.foodItemPrices = dataoldsilver.foodItemPrices
              foodItem.quantitys = dataoldsilver.quantitys
              foodItem.taxs = dataoldsilver.taxs
   foodItem.subtotals =  oldnewval === dataoldsilver.type ?  (dataoldsilver.foodItemPrices - dataoldsilver.quantitys) * dataoldsilver.rate : (dataoldsilver.foodItemPrices - dataoldsilver.quantitys ) * dataoldsilver.rate           
              foodItem.discounts = dataoldsilver.discounts
        setValues({...x});
        setIsEditingoldsilver(false)
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
            setDatapercent({
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
            setDataoldsilver({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatawastage({
                ...recordForEdit,
            })
            if (recordForEdit != null)
            setDataadd({
                ...recordForEdit,
            })
            if (recordForEdit != null)
            stocksetDataadd({
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

    initialFValuesilver = {
       id: '',
        type:'silver',
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
    initialFValuespercent = {
        id: '',
        foodItemId: '',
        salesdate:Todaysales,
        type:'silver',
        quantity:1,
        foodItemName: '',
        rate:'',
        foodItemPrice: '',
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
    addinitialFValues = {
        id: '',
        type:'add',
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
    stockaddinitialFValues = {
        id: '',
        type:'stockadd',
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
     initialFValuesold = {
        id: '',
        foodItemId: '',
         type:'oldsilver',
          salesdate:Todaysales,
        foodItemNames: '',
        quantitys:'',
        foodItemPrices: '',
        rate:0,
        taxs: '',
        discounts:'',
        subtotals:0
    }
    const [data, setData] = useState(initialFValues)
    const [datapercent, setDatapercent] = useState(initialFValuespercent)
   // const [datapiece, setDatapiece] = useState(initialFValuespiece)
     const [datafancy, setDatafancy] = useState(initialFValuesfancy)

  const [dataold, setDataold] = useState(initialFValuesold)
const [dataoldsilver, setDataoldsilver] = useState(initialFValuesilver)

  const [datawastage, setDatawastage] = useState(initialFValueswastage)
  const [dataadd, setDataadd] = useState(addinitialFValues)
  const [stockdataadd, stocksetDataadd] = useState(stockaddinitialFValues)
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
}
 function handlepercent(e) {
        const newdata = { ...datapercent }
        newdata[e.target.id] = e.target.value
        setDatapercent(newdata)
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
function addhandle(e) {
        const newdataadd = { ...dataadd }
        newdataadd[e.target.id] = e.target.value
        setDataadd(newdataadd)
}
function stockaddhandle(e) {
        const stocknewdataadd = { ...stockdataadd }
        stocknewdataadd[e.target.id] = e.target.value
        stocksetDataadd(stocknewdataadd)
}
 function handleold(e) {
        const newdataold = { ...dataold }
        newdataold[e.target.id] = e.target.value
        setDataold(newdataold)
}
function handleoldsilver(e) {
        const newdataold = { ...dataoldsilver }
        newdataold[e.target.id] = e.target.value
        setDataoldsilver(newdataold)
}
    const handleChange = (e) => {
        e.preventDefault()
     }

   
     const [notify, setNotify] = useState({ isOpen: false })
 const [currentId, setCurrentId] = useState(0)
const [isEditing, setIsEditing] = useState(false)

const [currentIdpercent, setCurrentIdpercent] = useState(0)
const [isEditingpercent, setIsEditingpercent] = useState(false)


 const [currentIdfancy, setCurrentIdfancy] = useState(0)
const [isEditingfancy, setIsEditingfancy] = useState(false)
 const [currentIdwastage, setCurrentIdwastage] = useState(0)
const [isEditingwastage, setIsEditingwastage] = useState(false)

 const [currentIdadd, setCurrentIdadd] = useState(0)
const [isEditingadd, setIsEditingadd] = useState(false)

const [stockcurrentIdadd, stocksetCurrentIdadd] = useState(0)
const [stockisEditingadd, stocksetIsEditingadd] = useState(false)

 const [currentIdold, setCurrentIdold] = useState(0)
const [isEditingold, setIsEditingold] = useState(false)

const [currentIdoldsilver, setCurrentIdoldsilver] = useState(0)
const [isEditingoldsilver, setIsEditingoldsilver] = useState(false)
  useEffect(() => {
        if (currentId != 0) {
            setData({
                ...orderedFoodItems.find(x => x.id == currentId)
            })
            
        }
        if (currentIdpercent != 0) {
            setDatapercent({
                ...orderedFoodItemspercent.find(x => x.id == currentIdpercent)
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
          if (currentIdoldsilver != 0) {
            setDataoldsilver({
                ...oldorderedFoodItemssilver.find(x => x.id == currentIdoldsilver)
            })
            }
         if (currentIdwastage != 0) {
            setDatawastage({
                ...ordereditems.find(x => x.id == currentIdwastage)
            })
          }
             if (currentIdadd != 0) {
            setDataadd({
                ...addorderedFoodItems.find(x => x.id == currentIdadd)
            })
          }
           if (stockcurrentIdadd != 0) {
            stocksetDataadd({
                ...stockaddorderedFoodItems.find(x => x.id == stockcurrentIdadd)
            })
          }
    }, [currentId,currentIdpercent,currentIdold,currentIdoldsilver,currentIdfancy,currentIdwastage,currentIdadd,stockcurrentIdadd])
 
    const [display, setdisplay] = useState([]);
   const [displaysil, setdisplaysil] = useState([]);
    const [displaysilold, setdisplaysilold] = useState([]);
     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
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
  var resultwastage =  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    var resultadd =  values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
       var stockresultadd =  values.stockaddorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  Number(values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.subtotal),0));
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0
  var oldresultsilver = 0
  var addpercent = values.orderPercent.reduce((total, currentValue) => total = total + currentValue.subtotal,0)
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultfancy) + resultpcs + Number(resultadd) + Number(stockresultadd) + Number(addpercent);
  var oldsilver = values.oldorderDetailsilver.reduce((total, currentValue) => total = total + currentValue.subtotals,0)  
  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + Number(oldsilver)          
    const Total = data.foodItemPrice * data.quantity
const componentRef = useRef();
  const Print = () => {
    window.print();
  }
  const visible = 'hideedit'

const vat = Number(values.cgst) + Number(values.sgst);
const taxRate = (vat * Math.round(newitem).toFixed(2)) / 100;
const scgst = Math.round(newitem).toFixed(2)  + taxRate;
   const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query === 'progress') {
      setQuery('progress');
      return;
    }

    setQuery('progress');
    timerRef.current = window.setTimeout(() => {
      setQuery('success');
    }, 2000);
  };
  let totalweigth;
  let wastageweight;
  let totalweigthpercent;
  let overtotal ;
  let  storepcs;

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
  //storepcs = Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.quantity),0)) 
  //+ Number(ordereditems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.quantity),0)) +
  //Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total) + Number(currentValue.quantity),0))
//let totalweigth =  Number(values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.foodItemPrice,0))  + Number(values.watageitems.reduce((total, currentValue) => total = total + currentValue.foodItemPrice,0)); 
  return (
    
    <Grid container spacing={2}>
    <Grid item xs={6}>
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6"
         
          
        >
       NEW Items
        </Typography>
        <Grid
  container
  
  direction="column"
  
 
  
>

  <Grid >
     <Button size="small"  onClick={handleClickOpen}>
      <Tooltip title="Add Item"   arrow> 
        <img src={Printicon} height={35} onClick={handleClickOpen}/> 
         </Tooltip>
    </Button> 
  
     
  </Grid>   
   
</Grid> 
 
  {/* <IconButton onClick={openListwastage}>
 <img src="https://img.icons8.com/material/30/FAB005/increase-decimal.png"/>
       
 
        </IconButton> */}


    <IconButton onClick={openListnonstock}>
    <Stack >
    <img src="https://img.icons8.com/external-wanicon-flat-wanicon/30/000000/external-necklace-brazilian-carnival-wanicon-flat-wanicon.png"/>
    <Box fontWeight="bold" style={{ fontSize: 10 }} >FANCY</Box>
</Stack>
 

  </IconButton>

    <IconButton onClick={openListsilver}>
    <Stack >
    <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/38/external-bangle-jewellery-flatart-icons-flat-flatarticons.png"/>
    <Box fontWeight="bold" style={{ fontSize: 10 }} >SILVER</Box>
    </Stack>

  </IconButton>

<IconButton onClick={openListOfOrders}>
<Stack >
<img src="https://img.icons8.com/external-stickers-smashing-stocks/38/external-Bangle-fashion-stickers-stickers-smashing-stocks.png"/>
<Box fontWeight="bold" style={{ fontSize: 10 }} >GOLD</Box>
    </Stack>   
 
</IconButton>
    </Toolbar>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table }>
        <TableHead>
          <TableRow>
            <TableCell>ItemName</TableCell>
            <TableCell>Qty</TableCell>
           <TableCell>Weight</TableCell>
               <TableCell>Wastage</TableCell>
                <TableCell>Rate</TableCell>
                 <TableCell>+Rate</TableCell>
                 <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {
               addorderedFoodItems.map((adddataa,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                 {
                isEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="outlined"
              
             value={dataadd.foodItemName} onChange={(e) => addhandle(e)} />
                </form>
                : <Div >{adddataa.foodItemName}</Div>
            }
                                        </TableCell>
                   <TableCell><Div >{adddataa.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
            variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={dataadd.foodItemPrice} onChange={(e) => addhandle(e)} />
                </form>
                : <Div > {adddataa.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                          <TableCell>-</TableCell>                 
                            
              <TableCell >{adddataa.rate}</TableCell>
              <TableCell >
                                           {
                isEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="outlined"
          
           inputProps={{ inputMode: 'numeric' }} label="+Rate" name="tax" id="tax" 
           value={dataadd.tax} onChange={(e) => addhandle(e)} />
                </form>
                : <Div > {adddataa.tax }</Div>
            }
             </TableCell>
               
                   <TableCell>
                { 

      
             isEditingadd ===idx ? additem === dataadd.type ? Math.round(Number(dataadd.foodItemPrice) * (Number(dataadd.tax) + Number(dataadd.rate))) :  Math.round(Number(dataadd.foodItemPrice) * (Number(dataadd.tax) + Number(dataadd.rate)))
             :   <Div > {Math.round(adddataa.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          {
                                             isEditingadd === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>addupdate(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdadd(adddataa.id) 
                                              setIsEditingadd(idx,true)
                                         }} size="small">
                                                 
                                                    <EditLocationOutlinedIcon   />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => addremoveFoodItem(idx, adddataa.addorderDetails)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}

{
               stockaddorderedFoodItems.map((stockadddataa,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                 {
                 stockisEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
         variant="outlined"
             
             value={stockdataadd.foodItemName} onChange={(e) => stockaddhandle(e)} />
                </form>
                : <Div >{stockadddataa.foodItemName}</Div>
            }
                                        </TableCell>
                   <TableCell><Div >{stockadddataa.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                 stockisEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={stockdataadd.foodItemPrice} onChange={(e) => stockaddhandle(e)} />
                </form>
                : <Div > {stockadddataa.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                <TableCell>-</TableCell>                          
                            
              <TableCell >{stockadddataa.rate}</TableCell>
        <TableCell >
                                           {
                 stockisEditingadd === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
       variant="outlined"
           
           inputProps={{ inputMode: 'numeric' }} label="+Rate" name="tax" id="tax" 
           value={stockdataadd.tax} onChange={(e) => stockaddhandle(e)} />
                </form>
                : <Div > {stockadddataa.tax }</Div>
            }
              </TableCell>
                   <TableCell>
                { 

      
             stockisEditingadd ===idx ? stockadditem === stockdataadd.type ? Math.round(Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax) + Number(stockdataadd.rate))) :  Math.round(Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax) + Number(stockdataadd.rate)))
             :   <Div > {Math.round(stockadddataa.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          {
                                             stockisEditingadd === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>stockaddupdate(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              stocksetCurrentIdadd(stockadddataa.id) 
                                              stocksetIsEditingadd(idx,true)
                                         }} size="small">
                                                 
                                                    <EditLocationOutlinedIcon   />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => stockaddremoveFoodItem(idx, stockadddataa.stockaddorderDetails)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}

  {
          orderedFoodItemspercent.map((item ,idx) => {
          resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
           resultadd = values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
         //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultadd);           
          result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultadd)) - values.discou;           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                       
                                        <TableCell  component="th" scope="row">
                                         
                                   {
                isEditingpercent === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         



             <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
     variant="outlined"
             
             value={datapercent.foodItemName} onChange={(e) => handlepercent(e)} />
                </form>
                : <Div >{item.foodItemName}</Div>
            }
                                        </TableCell>
             <TableCell><Div >{item.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingpercent === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="medium"
         variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={datapercent.foodItemPrice} onChange={(e) => handlepercent(e)} />
                </form>
                : <Div > {item.foodItemPrice  }</Div>
            }
                                 </>
                                        </TableCell>
                                          <TableCell>
                                        -
                                          </TableCell>
                                   <TableCell>
                                         {
                                           
                                         newval === item.type ? item.rate :
                                         item.rate}
                                          </TableCell> 
                              
          
                                          <TableCell >
                                           {
                isEditingpercent ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
       variant="outlined"
           
           inputProps={{ inputMode: 'numeric' }} label="+Rate" name="tax" id="tax" 
           value={datapercent.tax} onChange={(e) => handlepercent(e)} />
                </form>
                : newval === item.type ? <Div > {item.tax }</Div> : <Div > {item.tax +'%'}</Div>
                //+ "[" + Math.round((rates * item.tax)/100) + "]"
            }
                                           
                                        </TableCell>
                            
                                       <TableCell>
                              
 { 

      
             isEditingpercent ===idx ? newval === datapercent.type ?  Math.round(Number(datapercent.foodItemPrice * datapercent.rate) + Number(datapercent.tax * datapercent.foodItemPrice)) : Math.round((datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) - (datapercent.discount * datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) / 100 + datapercent.tax * (datapercent.foodItemPrice * datapercent.quantity * datapercent.rate) / 100) 
             :   <Div > { Math.round(item.subtotal)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditingpercent === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatepercent(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  />
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdpercent(item.id) 
                                              setIsEditingpercent(idx,true)
                                         }}  size="small">
                                                 
                                                    <EditLocationOutlinedIcon   />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItempercent(idx, item.orderDetailId)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}

              
{
               ordereditems.map((dataa,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                 {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
         variant="outlined"
              
             value={datawastage.foodItemName} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div >{dataa.foodItemName}</Div>
            }
                                        </TableCell>
                   <TableCell><Div >{dataa.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
         variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="Weight" id="foodItemPrice" value={datawastage.foodItemPrice} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div > {dataa.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          <TableCell >
                                           {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
         variant="outlined"
           
           inputProps={{ inputMode: 'numeric' }} label="+Rate" name="tax" id="tax" 
           value={datawastage.tax} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div > {dataa.tax }</Div>
            }
                                           
                                        </TableCell>
                            
              <TableCell >{dataa.rate}</TableCell>
                <TableCell>-</TableCell>
                   <TableCell>
                { 

      
             isEditingwastage ===idx ? itemwastages === data.type ? Math.round( (Number(datawastage.foodItemPrice) +  Number(datawastage.tax)) * datawastage.rate) :  Math.round( (Number(datawastage.foodItemPrice) +  Number(datawastage.tax)) * datawastage.rate)
             :   <Div > {Math.round(dataa.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          {
                                             isEditingwastage === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatewastage(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdwastage(dataa.id) 
                                              setIsEditingwastage(idx,true)
                                         }} size="small">
                                                 
                                                    <EditLocationOutlinedIcon   />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemwastage(idx, dataa.orderDetailId)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}


          {
          orderedFoodItems.map((item ,idx) => {
          resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
           resultadd = values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
         //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultadd);           
          result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultadd)) - values.discou;           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                       
                                        <TableCell  component="th" scope="row">
                                         
                                   {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         



             <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
     variant="outlined"
             
             value={data.foodItemName} onChange={(e) => handle(e)} />
                </form>
                : <Div >{item.foodItemName}</Div>
            }
                                        </TableCell>
             <TableCell><Div >{item.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="medium"
         variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={data.foodItemPrice} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.foodItemPrice  }</Div>
            }
                                 </>
                                        </TableCell>
                                          <TableCell>
                                        -
                                          </TableCell>
                                   <TableCell>
                                         {
                                           
                                         newval === item.type ? item.rate :
                                         item.rate}
                                          </TableCell> 
                              
          
                                          <TableCell >
                                           {
                isEditing ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
       variant="outlined"
           
           inputProps={{ inputMode: 'numeric' }} label="+Rate" name="tax" id="tax" 
           value={data.tax} onChange={(e) => handle(e)} />
                </form>
                : newval === item.type ? <Div > {item.tax }</Div> : <Div > {item.tax +'%'}</Div>
                //+ "[" + Math.round((rates * item.tax)/100) + "]"
            }
                                           
                                        </TableCell>
                            
                                       <TableCell>
                              
 { 

      
             isEditing ===idx ? newval === data.type ?  Math.round(Number(data.foodItemPrice * data.rate) + Number(data.tax * data.foodItemPrice)) : Math.round((data.foodItemPrice * data.quantity * data.rate) - (data.discount * data.foodItemPrice * data.quantity * data.rate) / 100 + data.tax * (data.foodItemPrice * data.quantity * data.rate) / 100) 
             :   <Div > { Math.round(item.subtotal)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditing === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>update(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  />
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentId(item.id) 
                                              setIsEditing(idx,true)
                                         }}  size="small">
                                                 
                                                    <EditLocationOutlinedIcon   />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItem(idx, item.orderDetailId)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}





              


 



          {
               orderedfancyitems.map((dataafancy,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="ItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="outlined"
              
             value={datafancy.foodItemName} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >{dataafancy.quantity}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
         variant="outlined"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          <TableCell >
                                           
                 <Div >-</Div>
            
                                           
                                        </TableCell>
                            
            <TableCell>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
        variant="outlined"
              
             value={datafancy.rate} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell>
                <TableCell>-</TableCell>
                   <TableCell>
                { 

      
             isEditingfancy ===idx ? newkey === data.type ? Math.round( (Number(datafancy.foodItemPrice) * Number(datafancy.rate )) ) :  Math.round( (Number(datafancy.foodItemPrice) * Number(datafancy.rate )))
             :   <Div > {Math.round(dataafancy.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          {
                                             isEditingfancy === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatefancy(idx)} size="small">
                                                
                                                <SaveAsOutlinedIcon  />
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdfancy(dataafancy.id) 
                                              setIsEditingfancy(idx,true)
                                         }} size="small">
                                                 
                                                    <EditLocationOutlinedIcon />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemfancy(idx, dataafancy.orderDetailId)}
                                               size="small" > <DeleteSweepOutlinedIcon  />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}
              {
               orderpieceitems.map((datapcs,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell> {datapcs.foodItemName}</TableCell>
             <TableCell> <ButtonGroup
                                            className={classes.buttonGroup}
                                            size="small">
                                            <Button size="small"
                                                onClick={e => updatepiece(idx, -1)}
                                            >-</Button>
                                            <Button size="small"
                                                disabled
                                            >{datapcs.quantity}</Button>
                                            <Button
                                                onClick={e => updatepiece(idx, 1)}
                                            >+</Button>
                                        </ButtonGroup></TableCell>
          <TableCell><Div> -</Div> </TableCell>
              <TableCell><Div> -</Div> </TableCell>
           <TableCell> {datapcs.foodItemPrice}</TableCell>
               <TableCell><Div> -</Div> </TableCell>
                   <TableCell>
               
               <Div > {datapcs.foodItemPrice * datapcs.quantity}</Div>
                                         
                                       </TableCell>
          
               <TableCell >

              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItempiece(idx, datapcs.orderDetailId)}
                                              size="small"  > <DeleteSweepOutlinedIcon   />
                                                </Button>
                                            </ThemeProvider>
                                        
                                        </TableCell>
            </TableRow>
          ))}
          <TableRow>
           
          </TableRow>
          </TableBody>
      </Table>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell ></TableCell>
     <TableCell sx={{
    color: 'green',
    fontWeight: "600"
  }}>Debit</TableCell>
  <TableCell sx={{
    color: 'red',
    fontWeight: "600"
  }}>Credit</TableCell>
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }}>Net Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
              <TableRow >
              
            
             
        <TableCell ></TableCell>
               <TableCell sx={{
    color: 'black',
    fontWeight:"600"
  }}>Net Credit / Debit</TableCell>
                
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem))}</TableCell>
          <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Math.round(news))}</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal )}</TableCell>
            </TableRow>

              <TableRow >
                 
              <TableCell ></TableCell>
               
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }}>Net Cash</TableCell>
                
{
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === -1 ? 
          <TableCell sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell> :
            <TableCell sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell>
  
}

    
               
            {
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === 1 ? 
          <TableCell sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}</TableCell> :
            <TableCell sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}</TableCell>
}
<TableCell sx={{color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )}</TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
    
            <ItemPopup
                title="Wastage"
                openPopupitem={wastageListVisibility}
              setOpenPopupitem={setwastageListVisibility}
                >
                 
                <Golwast
                    {...{
                      setwastageListVisibility,
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
          <Tab label="Non_Stock_Fancy" {...a11yProps(3)} />
        </Tabs>
      </Box>
   <TabPanel value={valuetabs} index={0}>
        <ConfirmProvider>
    <Silver
                    {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}/>
    </ConfirmProvider>
       </TabPanel>
       <TabPanel value={valuetabs} index={1}>
           <ConfirmProvider>
         <FancyItem 
          {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}/>
       </ConfirmProvider>
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
                
                <TabPanel value={valuetabs} index={3}>
       <Non_stockfancy 
       {...{ops,
                      //setsilverListVisibility,
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
          variant="h6"
         
          
        >
       OLD Items
        </Typography>
     

      <Tooltip title="Old Silver Item"   arrow> 
        <IconButton onClick={openListOfOldsilver}>
<Stack>
   <img src="https://img.icons8.com/color/36/000000/silver-ore.png"/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >OLD SILVER</Box>
    </Stack>
  </IconButton>
         </Tooltip>

    
    

      <Tooltip title="Old Gold Item"   arrow> 
     
        <IconButton onClick={openListOfOld}>
        <Stack>
<img src="https://img.icons8.com/fluency/30/000000/gold-ore.png"/>
<Box fontWeight="bold" style={{ fontSize: 7 }} >OLD GOLD</Box>
    </Stack>
   
</IconButton>
</Tooltip>
 

    </Toolbar>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader className={classes.table }>
        <TableHead>
          <TableRow>
            <TableCell>ItemName</TableCell>
            <TableCell>Weight</TableCell>
             <TableCell>Wastage/per</TableCell>
             <TableCell>Rate</TableCell>
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
                       
                                        <TableCell  component="th" scope="row">
                                   {
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         



             <TextField label="ItemName" name="foodItemNames" id="foodItemNames" 
              size="small"
          variant="outlined"
              
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
         variant="outlined"
          
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrices" id="foodItemPrices" value={dataold.foodItemPrices} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.foodItemPrices   }</Div>
            }
                                              
                                                  {
                                                    /*
                                                    {'$' + roundTo2DecimalPoint((item.tax / 100) * (item.quantity * item.foodItemPrice) + (item.quantity * item.foodItemPrice))}
                                                  */
                                                  }
                                                
                                                  

                                            </>
                                        </TableCell>
                                        <TableCell >
                                           {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="outlined"
          
           inputProps={{ inputMode: 'numeric' }} label="Wastage" name="quantitys" id="quantitys" 
           value={dataold.quantitys} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item. quantitys }</Div>
            }
                                           
                                        </TableCell>
                                        <TableCell>{item.rate} </TableCell>
                                       <TableCell>
                               

                                         { 
                                            isEditingold ===idx ? oldnewval === dataold.type ? Math.round((dataold.foodItemPrices - dataold.quantitys) * dataold.rate) : Math.round((dataold.foodItemPrices - dataold.quantitys ) * dataold.rate)           
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
         oldorderedFoodItemssilver.map((item ,idx) => {
          oldresultsilver = values.oldorderDetailsilver.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
          //oldresultsilver = values.oldorderDetailsilver.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       
                                        <TableCell  component="th" scope="row">
                                   {
                isEditingoldsilver === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         



             <TextField label="ItemName" name="foodItemNames" id="foodItemNames" 
              size="small"
          variant="outlined"
              
             value={dataoldsilver.foodItemNames} onChange={(e) => handleoldsilver(e)} />
                </form>
                : <Div >{item.foodItemNames}</Div>
            }
                                        </TableCell>
                                        <TableCell >
                                            <>
{
                isEditingoldsilver === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
         variant="outlined"
          
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrices" id="foodItemPrices" value={dataoldsilver.foodItemPrices} onChange={(e) => handleoldsilver(e)} />
                </form>
                : <Div > { item.foodItemPrices   }</Div>
            }
                                              
                                                  {
                                                    /*
                                                    {'$' + roundTo2DecimalPoint((item.tax / 100) * (item.quantity * item.foodItemPrice) + (item.quantity * item.foodItemPrice))}
                                                  */
                                                  }
                                                
                                                  

                                            </>
                                        </TableCell>
                                        <TableCell >
                                           {
                isEditingoldsilver ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="outlined"
          
           inputProps={{ inputMode: 'numeric' }} label="Wastage" name="quantitys" id="quantitys" 
           value={dataoldsilver.quantitys} onChange={(e) => handleoldsilver(e)} />
                </form>
                : <Div > { item. quantitys }</Div>
            }
                                           
                                        </TableCell>
                                        <TableCell>{item.rate} </TableCell>
                                       <TableCell>
                               

                                         { 
                                            isEditingoldsilver ===idx ? oldnewval === dataoldsilver.type ? Math.round((dataoldsilver.foodItemPrices - dataoldsilver.quantitys) * dataoldsilver.rate) : Math.round((dataoldsilver.foodItemPrices - dataoldsilver.quantitys ) * dataoldsilver.rate)           
                                            :  <Div > {Math.round(item.subtotals)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditingoldsilver === idx ? 
                 
                                          <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>oldupdatesilver(idx)
                                             
                                            }>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdoldsilver(item.id) 
                                              setIsEditingoldsilver(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => oldremoveFoodItemsilver(idx, item.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}
              <TableRow>
          
      </TableRow>
            
         
        </TableBody>
      </Table>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell ></TableCell>
     <TableCell sx={{
    color: 'green',
    fontWeight: "600"
  }}>Debit</TableCell>
  <TableCell sx={{
    color: 'red',
    fontWeight: "600"
  }}>Credit</TableCell>
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }}>Net Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
              <TableRow >
              
            
             
        <TableCell ></TableCell>
               <TableCell sx={{
    color: 'black',
    fontWeight:"600"
  }}>Net Credit / Debit</TableCell>
                
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem))}</TableCell>
          <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Math.round(news))}</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal )}</TableCell>
            </TableRow>

              <TableRow >
                 
              <TableCell ></TableCell>
               
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }}>Net Cash</TableCell>
                
{
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === -1 ? 
          <TableCell sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell> :
            <TableCell sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell>
  
}

    
               
            {
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === 1 ? 
          <TableCell sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}</TableCell> :
            <TableCell sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}</TableCell>
}
<TableCell sx={{color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )}</TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
      <ItemPopup
                title="List of Orders"
                openPopupitem={orderListVisibility}
                setOpenPopupitem={setOrderListVisibility}>
                 
                 
                 <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabs} onChange={handleChangetabs} textColor="secondary"
        indicatorColor="secondary" >
     <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/arcade/32/null/percentage.png"/> </>}   {...a11yProps(0)} />
          <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/windows/32/null/decrease-decimal.png"/> </>}  {...a11yProps(1)} />
            <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/arcade/32/null/plus-math.png"/> </>}  {...a11yProps(2)} /> 
          <Tab icon={<img src="https://img.icons8.com/arcade/32/null/percentage.png"/>} label="Non_Stock" {...a11yProps(3)} />
          <Tab icon={<img src="https://img.icons8.com/windows/32/null/decrease-decimal.png"/>} label="Non_Stock_Decimal" {...a11yProps(4)} />
          <Tab icon={<img src="https://img.icons8.com/arcade/32/null/plus-math.png"/>} label="AddNon_Stock" {...a11yProps(5)} />
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
        <ConfirmProvider>
         <Golwast
                    {...{
                      setOrderListVisibility,
                        values,
                        setValues
                    }}
                />
                    </ConfirmProvider>
      </TabPanel>
        <TabPanel value={valuetabs} index={2}>
          <ConfirmProvider>
        <Add_Stock
                    {...{
                      setOrderListVisibility,
                        values,
                        setValues
                    }}
                />
                </ConfirmProvider>
      </TabPanel> 
      <TabPanel value={valuetabs} index={3}>
        <Percent
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                  />
       {/* <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                  /> */}
      </TabPanel>
                 <TabPanel value={valuetabs} index={4}>
        <NonStockwastage
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
      </TabPanel>
        <TabPanel value={valuetabs} index={5}>
        <AddNon_Stock
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
                 
                <OldSilver
                    {...{
                      setOldsilverListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
           
              <Dialog
        maxWidth={50}
        onBackdropClick="false"
        open={open}
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        PaperComponent={PaperComponent}
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6"  style={{ flexGrow: 0.97}}>
                       {values.fullName}
                    </Typography>
                     <Button className={`${classes.rootbutton}`}
                        color="info"
                        style={{  backgroundColor: 'lightblue'}} 
                        onClick={handleClickQuery}
                        >
                            {query !== 'idle' }
                        <ReactToPrint
                        trigger={() =><img src={Printicon} height={25}  />}
                        content={() => componentRef.current}/>
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleClose}>
                      <img src={Closeicon} height={25}/>
                    </Button>
                </div>
            </DialogTitle>
            {query === 'success' ? (
          null
        ) : (
          <Fade
            in={query === 'progress'}
            style={{
              transitionDelay: query === 'progress' ? '100ms' : '0ms',
            }}
            unmountOnExit
          >
            <LinearProgress />
          </Fade>
        )}
            
        <DialogContent dividers>
          <DialogContentText ref={componentRef}>
              <Box width='850px' height="800px" className="watermark">
                <img src={Estimate} height="30%" width="100%" /> 
                {/*<Box width='794px' height="800px" >
              
             <Box height='170px'>
           
          </Box> */}
       <TableContainer >
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
       <TableHead>
          <TableRow>
           <TableCell></TableCell>
           <TableCell >{values.fullName}</TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
             <TableCell ></TableCell>
            <TableCell ></TableCell>
              <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell >{values.hireDate}</TableCell>
          </TableRow>
          </TableHead>
        </Table>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
        <TableHead>
          <TableRow>
           <TableCell sx={{color: 'blue'}}>Item</TableCell>
             <TableCell sx={{color: 'blue'}}>Qty</TableCell>
            <TableCell sx={{color: 'blue'}}>Weight</TableCell>
            <TableCell sx={{color: 'blue'}} >Wastage</TableCell>
             <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            <TableCell sx={{color: 'blue'}}>+Rate</TableCell>
            <TableCell sx={{color: 'blue'}}>Debit</TableCell>
            <TableCell sx={{color: 'blue'}}>Credit</TableCell>
               <TableCell sx={{color: 'blue'}}>Net Balance</TableCell>
          </TableRow>
        </TableHead>
      
        <TableBody>
          
          {stockaddorderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
                         <TableCell >-</TableCell>
                <TableCell >{item.rate}</TableCell>
                     <TableCell >{item.tax}</TableCell>
     
              <TableCell > {NumberFormat(Math.round(item.subtotal)) }</TableCell>
                <TableCell >-</TableCell>
                  <TableCell >-</TableCell>
            </TableRow>
          ))}
          {addorderedFoodItems.map((item,idx) => (
            totalweigth = Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total + currentValue.quantity),0)), 
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
               <TableCell >-</TableCell>
                  <TableCell >{item.rate}</TableCell>
                  <TableCell >{item.tax}</TableCell>
     
              <TableCell > {NumberFormat(Math.round(item.subtotal)) }</TableCell>
                <TableCell >-</TableCell>
                  <TableCell >-</TableCell>
            </TableRow>
          ))}
{ordereditems.map((item,idx) => (
   wastageweight = Number(ordereditems.reduce((total, currentValue) => total = Number(total + currentValue.quantity),0)), 
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
               
              <TableCell >{item.tax}</TableCell>
                  <TableCell >{item.rate}</TableCell>
               <TableCell >-</TableCell>
              <TableCell > {NumberFormat(Math.round(item.subtotal)) }</TableCell>
                <TableCell >-</TableCell>
                  <TableCell >-</TableCell>
            </TableRow>
          ))}
           {orderedFoodItemspercent.map((item,idx) => (
    totalweigthpercent = Number(orderedFoodItemspercent.reduce((total, currentValue) => total = Number(total + currentValue.quantity),0)), 

            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
           <TableCell >-</TableCell>
            <TableCell >{item.rate}</TableCell>
              <TableCell > {newval === item.type ? item.tax  :  item.tax +'%'}</TableCell>
              <TableCell >                              
 { 
             isEditingpercent ===idx ? newval === datapercent.type ? NumberFormat(Math.round((datapercent.foodItemPrice * silrate) + Number(datapercent.tax))) : NumberFormat((datapercent.foodItemPrice * datapercent.quantity * rates) - (datapercent.discount * datapercent.foodItemPrice * datapercent.quantity * rates) / 100 + datapercent.tax * (datapercent.foodItemPrice * datapercent.quantity * rates) / 100 )
             :   NumberFormat(Math.round(item.subtotal))
                                         }</TableCell>
                                           <TableCell >-</TableCell>
                                             <TableCell >-</TableCell>
            </TableRow>
          ))}
         {orderedFoodItems.map((item,idx) => (
    //totalweigth = orderedFoodItems.reduce((total, currentValue) => total = total + currentValue.quantity,0), 

            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
           <TableCell >-</TableCell>
            <TableCell >{item.rate}</TableCell>
              <TableCell > {newval === item.type ? item.tax  :  item.tax +'%'}</TableCell>
              <TableCell >                              
 { 
             isEditing ===idx ? newval === data.type ? NumberFormat(Math.round((data.foodItemPrice * silrate) + Number(data.tax))) : NumberFormat((data.foodItemPrice * data.quantity * rates) - (data.discount * data.foodItemPrice * data.quantity * rates) / 100 + data.tax * (data.foodItemPrice * data.quantity * rates) / 100 )
             :   NumberFormat(Math.round(item.subtotal))
                                         }</TableCell>
                                           <TableCell >-</TableCell>
                                             <TableCell >-</TableCell>
            </TableRow>
          ))}
          

          {orderedfancyitems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                  <TableCell >{item.quantity}</TableCell>
              <TableCell>{item.foodItemPrice}</TableCell>
              <TableCell >-</TableCell>
               <TableCell >{item.rate}</TableCell>
                  <TableCell >-</TableCell>

                      
              <TableCell >   
                 { 

      
             isEditingfancy ===idx ? newkey === data.type ? NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate )) )) :  NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate ))))
             :  NumberFormat(Math.round(item.subtotal))
                                         }                           
</TableCell>
            <TableCell >-</TableCell>
              <TableCell >-</TableCell>
            </TableRow>
          ))}
          {orderpieceitems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
                    <TableCell >-</TableCell>
                     <TableCell >-</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
               
               <TableCell >-</TableCell>
               <TableCell >{NumberFormat(Math.round(item.subtotal)) }</TableCell>
               <TableCell >-</TableCell>
                <TableCell >-</TableCell>
            </TableRow>
          ))}
{oldorderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemNames}</TableCell>
               <TableCell >-</TableCell>
              <TableCell>{item.foodItemPrices}</TableCell>
              <TableCell >{item.quantitys}</TableCell>
               <TableCell >{item.rate}</TableCell>
                  <TableCell >-</TableCell>
                      <TableCell >-</TableCell>
              <TableCell >                              
{ 
 isEditingold ===idx ? oldnewval === dataold.type ? NumberFormat(Math.round(('-'+dataold.foodItemPrices - dataold.quantitys) * dataold.rate)) : NumberFormat(('-'+dataold.foodItemPrices - dataold.quantitys ) * dataold.rate )          
    : NumberFormat(Math.round('-'+item.subtotals))
            }</TableCell>
              <TableCell >-</TableCell>
            </TableRow>
          ))}
          {oldorderedFoodItemssilver.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemNames}</TableCell>
               <TableCell >-</TableCell>
              <TableCell>{item.foodItemPrices}</TableCell>
              <TableCell >{item.quantitys}</TableCell>
               <TableCell >{item.rate}</TableCell>
                  <TableCell >-</TableCell>
                      <TableCell >-</TableCell>
              <TableCell >                              
{ 
 isEditingoldsilver ===idx ? oldnewval === dataoldsilver.type ? NumberFormat(Math.round(('-'+dataoldsilver.foodItemPrices - dataoldsilver.quantitys) * dataoldsilver.rate)) : NumberFormat(('-'+dataoldsilver.foodItemPrices - dataoldsilver.quantitys ) * dataoldsilver.rate )          
    : NumberFormat(Math.round('-'+item.subtotals))
            }</TableCell>
              <TableCell >-</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
<Divider/>


       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
       
        <TableBody>
           <TableRow >
           
       <TableCell sx={{color: 'blue',fontWeight: "600"
  }}> {"Debit :" +NumberFormat(Math.round(newitem))}</TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell sx={{
    color: 'black',
    fontWeight:"600"
  }}> Value</TableCell>
           <TableCell sx={{color: 'black',fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem))}</TableCell>
          <TableCell sx={{
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Math.round(news))}</TableCell> 
<TableCell sx={{color: 'black',fontWeight: "600"
  }}>{NumberFormat(values.gTotal )}</TableCell>
            </TableRow>

            <TableRow >
            <TableCell sx={{color: 'blue',fontWeight: "600"
  }}> {"Credit :" +NumberFormat(Math.round(news) + (Number(values.gCash) + Number(values.onlinecash)))}</TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell sx={{
    color: 'black',
    fontWeight:"600"
  }}>Cash</TableCell>
           <TableCell sx={{color: 'black',fontWeight: "600"
  }} ></TableCell>
          <TableCell sx={{
color: 'black',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash)))}</TableCell> 
<TableCell sx={{color: 'black',fontWeight: "600"
  }}>{NumberFormat((Number(values.gTotal) - (values.gCash)))}</TableCell>
            </TableRow>

            <TableRow >
       <TableCell sx={{color: 'blue',fontWeight: "600"
  }}> </TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell sx={{
    color: 'black',
    fontWeight:"600"
  }}>Online</TableCell>
           <TableCell sx={{color: 'black',fontWeight: "600"
  }} ></TableCell>
          <TableCell sx={{
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Number(values.onlinecash))}</TableCell> 
<TableCell sx={{color: 'black',fontWeight: "600"
  }}>{NumberFormat((Number((values.gTotal) - (values.gCash)) - (values.onlinecash)))}</TableCell>
            </TableRow>

 <TableRow >
              
          <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}>
    {"Balance :"+ NumberFormat( (Number((values.gTotal) -(values.gCash))- (values.onlinecash))+(Number(values.debitcash) ))}
  
  </TableCell>
    <TableCell></TableCell>
     <TableCell></TableCell>
            <TableCell></TableCell>
 <TableCell></TableCell>
  <TableCell></TableCell>
                          <TableCell></TableCell>
 <TableCell></TableCell>
 <TableCell></TableCell>
         <TableCell    sx={{

    color: 'black',
    fontWeight:"600",

  }}> Cash</TableCell>
                
              
           {
           
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === -1 ? 
          <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell> :
            <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(values.debitcash)))}</TableCell>
  
}

    
<TableCell  sx={{color: 'black',
fontWeight: "600"
  }}></TableCell>     
            {/*
  Math.sign((values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )) === 1 ? 
          <TableCell   sx={{color: 'red',
fontWeight: "600"
  }}>
    {NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}

  </TableCell>
   :
            <TableCell  sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(values.gCash) + Number(values.onlinecash))  )}</TableCell>
*/}
<TableCell  sx={{color: 'black',
fontWeight: "600"
  }}>{NumberFormat( (Number((values.gTotal) -(values.gCash))- (values.onlinecash))+(Number(values.debitcash) ))}</TableCell>     
{
  /*
<TableCell  sx={{color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal - (Number(values.gCash) + Number(values.onlinecash)) + (Number(values.debitcash)) )}
  </TableCell> 
*/ }
         
           </TableRow>
           
        </TableBody>
       
      </Table>
  
      GOLD:{ 
       Number(stockaddorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0))+
   Number(orderedFoodItemspercent.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)) +
      Number(ordereditems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)) +
      Number(addorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0))+"G"
    }
    {"("}
    {
       Number(stockaddorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0))+
       Number(orderedFoodItemspercent.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0)) +
      Number(ordereditems.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0)) +
      Number(addorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0))
    }
    {"PCS)"}
    &nbsp;&nbsp;
      SILVER:{Number(orderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)).toFixed(3)+"G" +
      "("+Number(orderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0))+"PCS"+")"
      
      }&nbsp;&nbsp;
    
    
    </TableContainer> 
{
    wordify((Number(values.gCash) + Number(values.onlinecash)))
  }

         
              
         </Box>
 
          </DialogContentText>
       
{ /*<ReactToPrint
        trigger={() =>  <IconButton color="info" >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> */}
        </DialogContent>
       
      </Dialog>
       
    </Paper>
    </Grid>
    </Grid>
   
  );
}
