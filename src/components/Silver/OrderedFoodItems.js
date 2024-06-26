import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { List, ListItem, ListItemText, ListItemAvatar,ListItemSecondaryAction } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
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
import QRcode from '../../img/qr.png';
import Fade from '@mui/material/Fade';
import Gold from '../../img/gold.png'
import FLOGO from '../../img/flogo.png'
import { COLORS } from '../../layouts/Colors';
import info from '../../img/info.png'
import sin from '../../img/sj.png'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Notification from "../../layouts/Notification";
import { styled } from '@mui/material/styles';
import NonStock from './NonStock';
import Golwast from './Golwast';
import {NumberFormat} from '../../Services/NumberFormat';
import FancyItem from './FancyItem';
import NonStockwastage from './NonStockwastage'
import Non_stocksilver from './Non_stocksilver';
import Non_stockfancy from './Non_stockfancy';
import AddNon_Stock from './AddNon_Stock';
import Add_Stock from './Add_Stock';
import { ConfirmProvider } from "material-ui-confirm";
import Draggable from 'react-draggable';
import  { tableCellClasses } from '@mui/material/TableCell';
import './syle.css'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
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
    tablebill: {
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
            cursor: 'pointer',
        },
        
    },
    tablebillmaking: {
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



export default function OrderedFoodItems(props,initialFValues,addinitialFValues,stockaddinitialFValues,initialFValuesold,initialFValueswastage,initialFValuesfancy,initialFValuespiece) {
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
    let addorderedFoodItems = values.addorderDetails;
     let stockaddorderedFoodItems = values.stockaddorderDetails;
      
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
    const newval = 'silver';
    
      const update = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderDetails[idx];
        foodItem.foodItemName = data.foodItemName
           foodItem.foodItemPrice = data.foodItemPrice
              foodItem.quantity = data.quantity
              foodItem.tax = data.tax
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate)  : (data.foodItemPrice * data.quantity * data.rate) - (data.discount * data.foodItemPrice * data.quantity * data.rate) / 100 + data.tax * (data.foodItemPrice * data.quantity * data.rate) / 100 
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

      const itemwastages = 'wastage';
       const updatewastage = (idx) => {
        let x ={...values};
      
        let foodItem = x.watageitems[idx];
        foodItem.foodItemName = datawastage.foodItemName
           foodItem.foodItemPrice = datawastage.foodItemPrice
              foodItem.quantity = datawastage.quantity
              foodItem.tax = datawastage.tax
              foodItem.discount = datawastage.discount
 foodItem.subtotal = itemwastages === datawastage.type ? ( Number(datawastage.foodItemPrice) + Number(datawastage.tax)) * datawastage.rate : ( Number(datawastage.foodItemPrice) + Number(datawastage.tax )) * datawastage.rate;
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
              foodItem.rate = dataold.rate
   foodItem.subtotals =  oldnewval === dataold.type ?  (dataold.foodItemPrices - dataold.quantitys) * dataold.rate : (dataold.foodItemPrices - dataold.quantitys ) * dataold.rate           
              foodItem.discounts = dataold.discounts
        setValues({...x});
        setIsEditingold(false)
        //resetInputField()
      }


  
const [oldListVisibility, setOldListVisibility] = useState(false);
const [silverListVisibility, setsilverListVisibility] = useState(false);
const [nonstockListVisibility, setnonstockListVisibility] = useState(false);
const [oldsilverListVisibility, setOldsilverListVisibility] = useState(false);
const [wastageListVisibility,setwastageListVisibility] = useState(false);
 const [orderListVisibility, setOrderListVisibility] = useState(false);
 
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

const openListOfOrders = () => {
        setOrderListVisibility(true);
    }
       const { recordForEdit } = props;
    //let orderedFoodItems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    //const [searchList, setSearchList] = useState([]);
    //const [searchKey, setSearchKey] = useState('');
    const [dense, setDense] = useState(true);
  
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
        HSN_Code:'7113',
        Purity:'22K916',
        UOM:'GMS',
        HUID:'',
        foodItemId: '',
         salesdate:today,
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
        HSN_Code:'7113',
        Purity:'22K916',
        UOM:'GMS',
        HUID:'',
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
        HSN_Code:'7113',
        Purity:'22K916',
        UOM:'GMS',
        HUID:'',
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
        HSN_Code:'7113',
        Purity:'22K916',
        UOM:'GMS',
        HUID:'',
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
   // const [datapiece, setDatapiece] = useState(initialFValuespiece)
     const [datafancy, setDatafancy] = useState(initialFValuesfancy)

  const [dataold, setDataold] = useState(initialFValuesold)

  const [datawastage, setDatawastage] = useState(initialFValueswastage)
  const [dataadd, setDataadd] = useState(addinitialFValues)
  const [stockdataadd, stocksetDataadd] = useState(stockaddinitialFValues)
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

    const handleChange = (e) => {
        e.preventDefault()
     }
     var iddate = values.hireDate;
     var lastFive = iddate.substr(iddate.length - 4);
     var nextyear = Number(lastFive) + Number(1);
    
   
     const [notify, setNotify] = useState({ isOpen: false })
 const [currentId, setCurrentId] = useState(0)
const [isEditing, setIsEditing] = useState(false)
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
    }, [currentId,currentIdold,currentIdfancy,currentIdwastage,currentIdadd,stockcurrentIdadd])
 
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

   const [openold, setOpenold] = React.useState(false);

  const handleClickOpenold = () => {
    setOpenold(true);
  };

  const handleCloseold = () => {
    setOpenold(false);
  };
    var resultpcs = 0
  var resultpcs = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    var resultadd =  values.addorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
       var stockresultadd =  values.stockaddorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultfancy) + resultpcs + Number(resultadd) + Number(stockresultadd);
  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0)           
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
 let gsttotal = Number(Math.round((newitem * 3)/100));
  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );
var making = orderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
   //const making = stockaddorderedFoodItems.map((item,idx) => (item.foodItemPrice))
let oldcal =  oldorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
 
 let totalweigth = orderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let totalweigths = addorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  //let netweights =  Number(totalweigth )+ Number(totalweigths)
  let netweights =  Number(totalweigth )
  const totalpcs = Number(orderedFoodItems.length);
  let totalweigthold = oldorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0);
  let netweightolds =  Number(totalweigthold)
  const totalpcsold = Number(oldorderedFoodItems.length);
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
  const hallmarkingcal = stockaddorderedFoodItems.length * values.debitcash;
const makingcal = Number(making * values.onlinecash);
let totalgst=  Number(values.gTotal + makingcal + (Number(hallmarkingcal)) - values.gCash)       
  const gstpertotal = Number((totalgst * 1.5)/100);
  const oldgstpertotal = Number((values.oldTotal * 1.5)/100);
  function getDictionary() {
    return validateDictionary("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    function validateDictionary(dictionary) {
        for (let i = 0; i < dictionary.length; i++) {
            if(dictionary.indexOf(dictionary[i]) !== dictionary.lastIndexOf(dictionary[i])) {
                console.log('Error: The dictionary in use has at least one repeating symbol:', dictionary[i])
                return undefined
            }
        }
        return dictionary
    }
}
  function numberToEncodedLetter(number) {
    //Takes any number and converts it into a base (dictionary length) letter combo. 0 corresponds to an empty string.
    //It converts any numerical entry into a positive integer.
    if (isNaN(number)) {return undefined}
    number = Math.abs(Math.floor(number))

    const dictionary = getDictionary()
    let index = number % dictionary.length
    let quotient = number / dictionary.length
    let result
    
    if (number <= dictionary.length) {return numToLetter(number)}  //Number is within single digit bounds of our encoding letter alphabet

    if (quotient >= 1) {
        //This number was bigger than our dictionary, recursively perform this function until we're done
        if (index === 0) {quotient--}   //Accounts for the edge case of the last letter in the dictionary string
        result = numberToEncodedLetter(quotient)
    }

    if (index === 0) {index = dictionary.length}   //Accounts for the edge case of the final letter; avoids getting an empty string
    
    return result + numToLetter(index)

    function numToLetter(number) {
        //Takes a letter between 0 and max letter length and returns the corresponding letter
        if (number > dictionary.length || number < 0) {return undefined}
        if (number === 0) {
            return ''
        } else {
            return dictionary.slice(number - 1, number)
        }
    }
}


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
       NEW Items
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


   {/* <IconButton onClick={openListnonstock}>
   <img src="https://img.icons8.com/external-wanicon-flat-wanicon/35/000000/external-necklace-brazilian-carnival-wanicon-flat-wanicon.png"/>

  </IconButton>
      */}
    <IconButton onClick={openListsilver}>
   
        <img src="https://img.icons8.com/color/38/000000/silver-bars.png"/>
  </IconButton>

{/*<IconButton onClick={openListOfOrders}>
<img src="https://img.icons8.com/external-vectorslab-flat-vectorslab/40/000000/external-gold-bar-project-management-and-web-marketing-vectorslab-flat-vectorslab.png"/>
       
 
</IconButton>*/}
    </Toolbar>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table }>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>HSN</TableCell>
           <TableCell>Weight</TableCell>
               <TableCell>UOM</TableCell>
                <TableCell>Rate</TableCell>
    
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
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
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
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
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
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="tax" name="tax" id="tax" 
           value={dataadd.tax} onChange={(e) => addhandle(e)} />
                </form>
                : <Div > {adddataa.tax }</Div>
            }
             </TableCell>
               
                   <TableCell>
                { 

      
             isEditingadd ===idx ? additem === dataadd.type ? Math.round(Number(dataadd.foodItemPrice) * (Number(dataadd.tax) + Number(rates))) :  Math.round(Number(dataadd.foodItemPrice) * (Number(dataadd.tax) + Number(rates)))
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
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
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
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
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
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="tax" name="tax" id="tax" 
           value={stockdataadd.tax} onChange={(e) => stockaddhandle(e)} />
                </form>
                : <Div > {stockadddataa.tax }</Div>
            }
              </TableCell>
                   <TableCell>
                { 

      
             stockisEditingadd ===idx ? stockadditem === stockdataadd.type ? Math.round(Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax) + Number(rates))) :  Math.round(Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax) + Number(rates)))
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
               ordereditems.map((dataa,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={datawastage.foodItemPrice} onChange={(e) => handlewastage(e)} />
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
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="tax" name="tax" id="tax" 
           value={datawastage.tax} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div > {dataa.tax }</Div>
            }
                                           
                                        </TableCell>
                            
              <TableCell >{dataa.rate}</TableCell>
                <TableCell>-</TableCell>
                   <TableCell>
                { 

      
             isEditingwastage ===idx ? itemwastages === data.type ? Math.round( (Number(datawastage.foodItemPrice) + Number(datawastage.tax )) * rates) :  Math.round( (Number(datawastage.foodItemPrice) + Number(datawastage.tax )) * rates)
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
         



             <TextField label="Description" name="foodItemName" id="foodItemName" 
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
             <TableCell><Div >{item.HSN_Code}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="medium"
          variant="standard"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={data.foodItemPrice} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.foodItemPrice  }</Div>
            }
                                 </>
                                        </TableCell>
                                          <TableCell>
                                          <Div > {item.UOM  }</Div>
                                          </TableCell>
                                   <TableCell>
                                         {
                                           
                                         newval === item.type ? item.rate :
                                         item.rate}
                                          </TableCell> 
                              
          
                                
                                       <TableCell>
                              
 { 

      
             isEditing ===idx ? newval === data.type ? Math.round(Number(data.foodItemPrice * data.rate)) : Math.round((data.foodItemPrice * data.quantity * rates) - (data.discount * data.foodItemPrice * data.quantity * rates) / 100 + data.tax * (data.foodItemPrice * data.quantity * rates) / 100) 
             :   <Div > {Math.round(item.subtotal)}</Div>
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
         <TextField label="Description" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              
             value={datafancy.foodItemName} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >{dataafancy.HSN}</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
         
                inputProps={{ inputMode: 'numeric' }} label="Weight" 
                name="foodItemPrice" id="foodItemPrice" value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          <TableCell >
                                           
                 <Div >{dataafancy.UOM}</Div>
            
                                           
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
                                        </TableCell>
           
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
    
      <List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   Total Value 
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(values.gTotal)}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
  Making Charges 
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(makingcal)}
 </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>


<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
 
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  
  {NumberFormat(values.gTotal + makingcal + (Number(hallmarkingcal)) )}
 
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>
<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   Discount
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
 
  {NumberFormat(values.gCash)}
 
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
 Taxable  Total  
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
 
  {NumberFormat(values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash))}
  
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
  CGST 1.5%
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
{NumberFormat(gstpertotal)}
 
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   SGST 1.5%
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(gstpertotal)}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   Amount(Round Off)
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(Math.round((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal))}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

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
                    }}
                />
    </ConfirmProvider>
        
      </TabPanel>

       <TabPanel value={valuetabs} index={1}>
         <ConfirmProvider>
         <FancyItem 
          {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         
         />
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
        <LocalPrintshopOutlinedIcon onClick={handleClickOpenold}/> 
         </Tooltip>
    </Badge>
        
          </Button>
   </ThemeProvider>
             </InputAdornment>
          }}
        />
     
  </Grid> 

      <Tooltip title="Old Silver Item"   arrow> 
        <IconButton onClick={openListOfOldsilver}>
   <img src="https://img.icons8.com/color/36/000000/silver-ore.png"/>
  </IconButton>
         </Tooltip>

    
    
{/*
      <Tooltip title="Old Gold Item"   arrow> 
        <IconButton onClick={openListOfOld}>
<img src="https://img.icons8.com/fluency/36/000000/gold-ore.png"/>
</IconButton>
         </Tooltip>*/}
 

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
         



             <TextField label="Description" name="foodItemNames" id="foodItemNames" 
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
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Wastage" name="quantitys" id="quantitys" 
           value={dataold.quantitys} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item. quantitys }</Div>
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
                : <Div > { item.rate }</Div>
            }
               
                                        
                                         </TableCell>
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
              <TableRow>
          
      </TableRow>
            
         
        </TableBody>
      </Table>
     <List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   Total Value 
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(values.oldTotal)}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>



<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
  CGST -1.5%
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
{NumberFormat(oldgstpertotal)}
 
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   SGST -1.5%
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(oldgstpertotal)}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

<List dense={dense}>
      <ListItem  >
      <ListItemAvatar>
        </ListItemAvatar>
      <ListItemText primary={<Grid container spacing={3}>
  <Grid item xs>
   Amount
  </Grid>
  <Grid item xs>
  </Grid>
  <Grid item xs>
    :
  </Grid>
  <Grid item xs>
  {NumberFormat(values.oldTotal - Number(oldgstpertotal + oldgstpertotal))}
  </Grid>
</Grid>} />
<ListItemSecondaryAction>
 </ListItemSecondaryAction>
</ListItem></List>

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
        <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
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
                        trigger={() =><LocalPrintshopOutlinedIcon  />}
                        content={() => componentRef.current}/>
                    </Button>
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleClose}>
                   <CloseOutlined/>
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
               <Box width='794px' className="watermark">
       { /* <Box height='150.5px'> */}
         
       <img src={sin} height="40%" width="100%"/>
        
      {/* <Grid container spacing={4}>
  <Grid item xs={4}>
  <Grid container spacing={2} columns={16}>
  <Grid item xs='auto'>

  <img src={FLOGO} height="90"/> 
  
  </Grid>
  <Grid item xs='auto'>
  <Box height='10px'>
    </Box>
<img src={QRcode} height="60"/>
</Grid>
  <Grid item xs='auto'>
    
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black',fontSize:'15px'}}> 
      GST NO:391019029111
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black',fontSize:'15px'}}> 
      BIS LN : CM/L - 6700004412
      </Typography>
  </Grid>
</Grid>
   
  </Grid>
  
  <Grid item xs={5}>
  
  <Typography variant="h4" gutterBottom display="block" sx={{fontWeight: 'bold',color:'black'}}>
  GOLD
    
      </Typography>
      
      <Typography variant="subtitle2"  sx={{fontWeight: 'bold',color:'black'}}>
      Kadar Mydeen Pallivasal Street,
      </Typography>
      <Typography variant="subtitle2"  sx={{fontWeight: 'bold',color:'black'}}>
      Pettai Kadayanallur (Taluka)
      </Typography>
      <Typography variant="subtitle2"  sx={{fontWeight: 'bold',color:'black'}}>
      Tenkasi District,Tamil Nadu 627751.
      </Typography>
  </Grid>
  <Grid item xs>
   
    <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Phone :92781726711
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;92781726711
      </Typography>
     
  </Grid>
  
          </Grid> */}
{/*<Divider sx={{ bgcolor: "black" }}/> */}
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>

                      
                        <Typography variant="subtitle1" gutterBottom>
        Billed To
      </Typography>
     
       <Typography variant="h5" gutterBottom  sx={{fontWeight: 'bold',color:'black',fontStyle: 'italic'}}>
      {values.fullName}
      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
      {values.city}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      {values.mobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Tax Invoice No : SJ:{values.id}/{lastFive},Date : {values.hireDate}
  </Typography>
  <Divider sx={{ bgcolor: "black" }}/>
  <Box height='10px'></Box>
   
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Pan No: {values.pannumber}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Aadhaar No: {values.aadhaarnumber}
      </Typography>
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          
          
           
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
            <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
             {/* 
             <TableCell sx={{color: 'blue'}}>Purity</TableCell>
              <TableCell sx={{color: 'blue'}}>HUID</TableCell>
           <TableCell sx={{color: 'blue'}}>Qty</TableCell>*/}
            <TableCell sx={{color: 'blue'}}>Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>UOM</TableCell>
            {/*<TableCell sx={{color: 'blue'}} >Wastage</TableCell>*/}
             <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            {/*<TableCell sx={{color: 'blue'}}>+Rate</TableCell>*/}
        {/*    <TableCell sx={{color: 'blue'}}>Debit</TableCell>*/}
            {/*<TableCell sx={{color: 'blue'}}>Credit</TableCell>*/}
               <TableCell sx={{color: 'blue'}}>Total</TableCell>
               
          </TableRow>
        </TableHead>
      
        <TableBody>
        
          {
           orderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
               <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemName}</StyledTableCell>
                <StyledTableCell >{item.HSN_Code}</StyledTableCell>
                 {/*
                 <StyledTableCell >{item.Purity}</StyledTableCell>
                  <StyledTableCell >{item.HUID}</StyledTableCell>
             
            *<TableCell >{item.quantity}</TableCell>*/}
              <StyledTableCell >{item.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                        {/* <TableCell >-</TableCell>*/}
                <StyledTableCell >{item.rate}</StyledTableCell>
                  {/*   <TableCell >{item.tax}</TableCell>*/}
     
              <StyledTableCell > {NumberFormat((item.subtotal)) }</StyledTableCell>
               
            </TableRow>
          ))}
          {
           orderedfancyitems.map((item,idx) => (
            <TableRow key={item.id}>
               <StyledTableCell >{numberToEncodedLetter(idx + 1)}</StyledTableCell>
                <StyledTableCell >{item.foodItemName}</StyledTableCell>
                <StyledTableCell >{item.HSN}</StyledTableCell>
                 {/*
                 <StyledTableCell >{item.Purity}</StyledTableCell>
                  <StyledTableCell >{item.HUID}</StyledTableCell>
             
                  <TableCell >{item.quantity}</TableCell>*/}
              <StyledTableCell >{item.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                        {/* <TableCell >-</TableCell>*/}
                <StyledTableCell >{item.rate}</StyledTableCell>
                  {/*   <TableCell >{item.tax}</TableCell>*/}
     
              <StyledTableCell > {NumberFormat((item.subtotal)) }</StyledTableCell>
               
            </TableRow>
          ))}

          
        

 

        </TableBody>
      </Table>
<Divider/>

<Divider/>


       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
       
        <TableBody>
          
              <TableRow >
              &nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <TableCell> </TableCell>

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
  }}>Total Value of Supply</TableCell>
  
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal)}</TableCell>           
                          
               </TableRow>
   

              <TableRow >
               
  <TableCell> </TableCell>
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
  }}>Add:Making Charges</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(makingcal)}</TableCell>           
                          
               </TableRow>
<TableRow >
               
  <TableCell> </TableCell>
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
  }}></TableCell>
         <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gTotal + makingcal + (Number(hallmarkingcal)) )}</TableCell>           
                        
               </TableRow>
          
                  <TableRow >
               
  <TableCell> </TableCell>
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
  }}>Less :Trade Rebate</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(values.gCash)}</TableCell>           
                          
               </TableRow>
                <TableRow >
               
  <TableCell> </TableCell>
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
  }}>Taxable Value of Supply</TableCell>
         <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat((values.gTotal + makingcal + (Number(hallmarkingcal))) - values.gCash )}</TableCell>           
                        
               </TableRow>
                <TableRow >
               
  <TableCell> </TableCell>
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
  }}>Add:
  &nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;
  
  CGST 1.5%</TableCell>
        <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(gstpertotal)}</TableCell>           
                          
               </TableRow>
                <TableRow >
               
  <TableCell> </TableCell>
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
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;
    SGST 1.5%</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(gstpertotal)}</TableCell>           
                          
               </TableRow>
             
                <TableRow >
               
  <TableCell>WT:{netweights.toFixed(3)}g ,PCS:{totalpcs}</TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
                    
              <TableCell></TableCell>
                    
              <TableCell></TableCell>
                
              <TableCell >Grant Total </TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(((values.gTotal + makingcal + (Number(hallmarkingcal)) ) + (gstpertotal + gstpertotal)) - Number(values.gCash))}</TableCell>   &nbsp;&nbsp;&nbsp;&nbsp;        
                          
               </TableRow>
               

              { /*

                <TableRow >
               
  <TableCell> </TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
                    
              <TableCell></TableCell>
                    
              <TableCell></TableCell>
                
              <TableCell >Grant Total</TableCell>
          <TableCell>:</TableCell> 

  <StyledTableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.abs(((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal) - Number(oldcal)))}</StyledTableCell>           
                          
</TableRow> */}
        </TableBody>
          
      </Table>

 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Sales Adjustment
      </Typography>

      {/*<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
   
      </Typography>*/}
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
           <TableRow>
            <TableCell sx={{color: 'blue'}}>S.No</TableCell>
              <TableCell sx={{color: 'blue'}}>Description</TableCell>
              <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
          <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>Loss Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>Gross Weight</TableCell>
         <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            <TableCell sx={{color: 'blue'}}>Total</TableCell>
             </TableRow>
        </TableHead>
       <TableBody>
        { oldorderedFoodItems.map((item ,idx) =>  (
            <TableRow key={item.id}>
                <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemNames}</StyledTableCell>
                <StyledTableCell >{item.HSN_CODE}</StyledTableCell>
                 <StyledTableCell >{item.foodItemPrices}</StyledTableCell>
                  <StyledTableCell >{item.quantitys}</StyledTableCell>
                  <StyledTableCell >{Number(item.foodItemPrices) - Number(item.quantitys)}</StyledTableCell>
              <StyledTableCell >{item.rate}</StyledTableCell>
               <StyledTableCell > {NumberFormat((item.subtotals)) }</StyledTableCell>
               
            </TableRow>
          ))}
          </TableBody>
      </Table>

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
        <TableBody>
         <TableRow >
             &nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
 }}>Total Value</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
   color: 'black',
fontWeight: "600"
 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(oldcal)}</TableCell>           
             </TableRow>
             <TableRow >
             &nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <TableCell> </TableCell>
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
 }}>Grand Total</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
   color: 'black',
fontWeight: "600"
 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.abs(Math.round((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal) - Number(oldcal)))}</TableCell> &nbsp;&nbsp;        
             </TableRow>
              </TableBody>
  </Table>
      
WT:{netweightolds.toFixed(3)}g ,PCS:{totalpcsold} || &nbsp;&nbsp;&nbsp;Cash:{NumberFormat(values.cashreceived)} ,&nbsp;&nbsp;Online:{NumberFormat(values.cashreceivedonline)} &nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
 Amount Received:{NumberFormat(Number(values.cashreceived)+Number(values.cashreceivedonline))}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 Amount Debit:{NumberFormat(Number(values.status))}
    
    </TableContainer> 
     { /*<Typography variant="body1" gutterBottom>
       Declaration
      </Typography>
        <Typography variant="body1" gutterBottom>
       The above jewells mentioned in the invoice are according to my specification and I purchased/sold the jewells 
       after  Verification
</Typography>
  <Typography variant="body1" gutterBottom>
        Making Charges Rs35.00/- per Gold article.The Consumercan get the purity of the hallmarked jewellery/artifact
        verified from any of the BIS recognized A&H Centre.
     </Typography>
*/}
               
               
         </Box>

         

         <Box height="5vh"> </Box>
            
{/* <Grid container spacing={4}>
  <Grid item xs={5}>
     <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Customer Signature
      </Typography>
  
  </Grid>
  <Grid item xs={4}>
  <Typography variant="h5" gutterBottom display="block" sx={{fontWeight: 'bold',color:'black'}}>
    
      </Typography>
  </Grid>
  <Grid item xs>
    <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Authorized Signature
      </Typography>
  </Grid>
</Grid> */}
<Grid container spacing={3}>
  <Grid item xs>
    
  </Grid>
 {/* <Grid item xs={6}>
     <Typography variant="body1" gutterBottom>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       Thank You for being a Customer 
               </Typography>
</Grid> */}
  <Grid item xs>
    
  </Grid>
</Grid>

          </DialogContentText>
       
{ /*<ReactToPrint
        trigger={() =>  <IconButton color="info" >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> */}
        </DialogContent>
       
      </Dialog>
       

          <Dialog
        maxWidth={50}
        onBackdropClick="false"
        open={openold}
        hideBackdrop
        onClose={handleCloseold}
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
                        trigger={() =><LocalPrintshopOutlinedIcon  />}
                        content={() => componentRef.current}/>
                    </Button>
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleCloseold}>
                   <CloseOutlined/>
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
               <Box width='794px'>
       { /* <Box height='150.5px'> */}
         
       <img src={info} height="40%" width="100%"/>
        
    
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>

                      
                        <Typography variant="subtitle1" gutterBottom>
        Billed To
      </Typography>
     
       <Typography variant="h5" gutterBottom  sx={{fontWeight: 'bold',color:'black',fontStyle: 'italic'}}>
      {values.fullName}
      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
      {values.city}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      {values.mobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Tax Invoice No : {values.id} / {lastFive}-{nextyear} 
  </Typography>
  
   
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Date : {values.hireDate}
      </Typography>
      
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          
          
           
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
            <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
            {/* <TableCell sx={{color: 'blue'}}>Purity</TableCell>*/}
             {/* <TableCell sx={{color: 'blue'}}>HUID</TableCell> */}
            {/* <TableCell sx={{color: 'blue'}}>Qty</TableCell>*/}
            <TableCell sx={{color: 'blue'}}>Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>Wastage</TableCell>
             <TableCell sx={{color: 'blue'}}>UOM</TableCell>
            {/*<TableCell sx={{color: 'blue'}} >Wastage</TableCell>*/}
             <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            {/*<TableCell sx={{color: 'blue'}}>+Rate</TableCell>*/}
        {/*    <TableCell sx={{color: 'blue'}}>Debit</TableCell>*/}
            {/*<TableCell sx={{color: 'blue'}}>Credit</TableCell>*/}
               <TableCell sx={{color: 'blue'}}>Total</TableCell>
               
          </TableRow>
        </TableHead>
      
        <TableBody>
          
          { oldorderedFoodItems.map((item ,idx) =>  (
            <TableRow key={item.id}>
               <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemNames}</StyledTableCell>
                <StyledTableCell >{item.HSN_CODE}</StyledTableCell>
                 {/*<StyledTableCell >{item.Purity}</StyledTableCell>*/}
                 {/* <StyledTableCell >{item.HUID}</StyledTableCell> */}
             
                   {/*<TableCell >{item.quantity}</TableCell>*/}
              <StyledTableCell >{item.foodItemPrices}</StyledTableCell>
                  <StyledTableCell >{item.quantitys}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                        {/* <TableCell >-</TableCell>*/}
                <StyledTableCell >{item.rate}</StyledTableCell>
                  {/*   <TableCell >{item.tax}</TableCell>*/}
     
              <StyledTableCell > {NumberFormat((item.subtotals)) }</StyledTableCell>
               
            </TableRow>
          ))}
          </TableBody>
      </Table>
<Divider/>

<Divider/>


       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
       
        <TableBody>
          
              <TableRow >
              &nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <TableCell> </TableCell>

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
  }}>Total Value of Supply</TableCell>
  
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;{NumberFormat(values.oldTotal)}</TableCell>           
                          
               </TableRow>
   

                
                
               
               
                <TableRow >
               
  <TableCell> </TableCell>
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
  }}>Sub:
  &nbsp;&nbsp;&nbsp;&nbsp;
  
  
  CGST -1.5%</TableCell>
        <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;{NumberFormat(Math.abs(oldgstpertotal))}</TableCell>           
                          
               </TableRow>
                <TableRow >
               
  <TableCell> </TableCell>
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
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;
    SGST -1.5%</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;{NumberFormat(Math.abs(oldgstpertotal))}</TableCell>           
                          
               </TableRow>
                <TableRow >
               
  <TableCell> </TableCell>
   <TableCell></TableCell>
  <TableCell></TableCell>
                    <TableCell></TableCell>
                        <TableCell></TableCell>
                         <TableCell></TableCell>
                          <TableCell></TableCell>
                    
              <TableCell></TableCell>
                    
              <TableCell></TableCell>
                
              <TableCell >Amount </TableCell>
          <TableCell>:</TableCell> 

  <StyledTableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>&nbsp; {NumberFormat(values.oldTotal - Number(oldgstpertotal + oldgstpertotal))}</StyledTableCell>           
                          
               </TableRow>
        </TableBody>
          
      </Table>




      

     

    
    </TableContainer> 
     { /*<Typography variant="body1" gutterBottom>
       Declaration
      </Typography>
        <Typography variant="body1" gutterBottom>
       The above jewells mentioned in the invoice are according to my specification and I purchased/sold the jewells 
       after  Verification
</Typography>
  <Typography variant="body1" gutterBottom>
        Making Charges Rs35.00/- per Gold article.The Consumercan get the purity of the hallmarked jewellery/artifact
        verified from any of the BIS recognized A&H Centre.
     </Typography>
*/}
               
               
         </Box>
         <Box height="5vh"> </Box>
            
 <Grid container spacing={4}>
  <Grid item xs={5}>
     <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Customer Signature
      </Typography>
  
  </Grid>
  <Grid item xs={4}>
  <Typography variant="h5" gutterBottom display="block" sx={{fontWeight: 'bold',color:'black'}}>
    
      </Typography>
  </Grid>
  <Grid item xs>
    <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Authorized Signature
      </Typography>
  </Grid>
</Grid>
<Grid container spacing={3}>
  <Grid item xs>
    
  </Grid>
  <Grid item xs={6}>
     <Typography variant="body1" gutterBottom>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Thank You for being a customer of Dhanish Gold
               </Typography>
  </Grid>
  <Grid item xs>
    
  </Grid>
</Grid>
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
