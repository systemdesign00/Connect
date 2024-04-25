import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { roundTo2DecimalPoint } from "../../utils/index";
import TableCell from '@mui/material/TableCell';
import  Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
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
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
import Rategcut from './Rategcut';
import Pdf from "react-to-pdf";
import html2canvas from 'html2canvas';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { ConfirmProvider } from "material-ui-confirm";
import Cash from './Cash';
import Printimg from '../../Icons/print.png'
import OGold from '../../Icons/goldo.png';
import OSilver from '../../Icons/silvero.png';
import WGold from '../../Icons/wgold.png';
import Cashimg from '../../Icons/cash.png';
import Taximg from '../../Icons/tax.png';
import Oldcash from './Oldcash';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
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



export default function Pendinglist(props,initialFValues,initialFValuesilver,initialFValuescash,initialFValuesold,initialFValueswastage,initialFValueswastagecash,initialFValuesfancy,
  initialFValuesratecut,initialFValuespiece,setOrderId) {
    const classes = useStyles();

  const [valuetabs, setValuetabs] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };
  
const { values, setValues,ops } = props;

    let orderedFoodItems = values.orderDetails;
    let orderedFoodItemsilver = values.ordersilverDetails
    let orderedratecutitems = values.ratecutitems;
    let orderpieceitems = values.pieceitems;
    
    
    let oldorderedFoodItems = values.oldorderDetails;
    let ordercash = values.ordercashDetails;
    let orderedfancyitems = values.fancyitems;
    let ordercashitems = values.cashitems;

    let ordereditems = values.watageitems;
   
   
      
    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const removeFoodItemsilver = (index, id) => {
      //debugger;
      let x = { ...values };
      x.ordersilverDetails = x.ordersilverDetails.filter((_, i) => i !== index);
      if (id !== 0)
          x.deletedOrderItemIds += id + ',';
      setValues({ ...x });
  }
  const removecash = (index, id) => {
    //debugger;
    let x = { ...values };
    x.ordercashDetails = x.ordercashDetails.filter((_, i) => i !== index);
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
    const removeFoodItemratecut = (index, id) => {
      //debugger;
      let x = { ...values };
      x.ratecutitems = x.ratecutitems.filter((_, i) => i !== index);
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
                    foodItem.Tfiness = Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100).toFixed(3);
                   foodItem.rate = data.rate
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax) : Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate;
        setValues({...x});
        setIsEditing(false)
        //resetInputField()
      }

      const updatesilver = (idx) => {
        let x ={...values};
      
        let foodItem = x.ordersilverDetails[idx];
        foodItem.foodItemName = datasilver.foodItemName
           foodItem.foodItemPrice = datasilver.foodItemPrice
              foodItem.quantity = datasilver.quantity
              foodItem.tax = datasilver.tax
             foodItem.lessweight = datasilver.lessweight
                  foodItem.netweight = Number(datasilver.foodItemPrice - datasilver.lessweight)
                    foodItem.Tfiness = Number(((datasilver.foodItemPrice - datasilver.lessweight) * datasilver.tax ) / 100).toFixed(3);
                   foodItem.rate = datasilver.rate
              foodItem.discount = datasilver.discount
 foodItem.subtotal = Number(datasilver.foodItemPrice * datasilver.rate);
        setValues({...x});
        setIsEditingsilver(false)
        //resetInputField()
      }

      const updatecash = (idx) => {
        let x ={...values};
      
        let foodItem = x.ordercashDetails[idx];
        foodItem.foodItemName = datacashitems.foodItemName
           foodItem.foodItemPrice = datacashitems.foodItemPrice
              foodItem.quantity = datacashitems.quantity
              foodItem.tax = datacashitems.tax
             foodItem.lessweight = datacashitems.lessweight
                  foodItem.netweight = Number(datacashitems.foodItemPrice - datacashitems.lessweight)
                    foodItem.Tfiness = Number(((datacashitems.foodItemPrice - datacashitems.lessweight) * datacashitems.tax ) / 100).toFixed(3);
                   foodItem.rate = datacashitems.rate
              foodItem.discount = datacashitems.discount
 foodItem.subtotal = Number(datacashitems.foodItemPrice * datacashitems.rate);
        setValues({...x});
        setIsEditingcash(false)
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

      const updateratecut = (idx) => {
        let x ={...values};
      
        let foodItem = x.ratecutitems[idx];
        foodItem.foodItemName = dataratecut.foodItemName
           foodItem.foodItemPrice = dataratecut.foodItemPrice
              foodItem.quantity = dataratecut.quantity
              foodItem.tax = Number((dataratecut.foodItemPrice * 1)/dataratecut.rate).toFixed(3)
              foodItem.rate = dataratecut.rate
              foodItem.discount = dataratecut.discount
 foodItem.subtotal = newkey === dataratecut.type ?  (dataratecut.foodItemPrice * 1)  : (dataratecut.foodItemPrice * 1)
        setValues({...x});
        setIsEditingratecut(false)
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
                    foodItem.Tfinesss = Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs)/100).toFixed(3);
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
const [oldListVisibilitycash, setOldListVisibilitycash] = useState(false);
const [silverListVisibility, setsilverListVisibility] = useState(false);
const [nonstockListVisibility, setnonstockListVisibility] = useState(false);
const [oldsilverListVisibility, setOldsilverListVisibility] = useState(false);
const [oldsilverListVisibilitycut, setOldsilverListVisibilitycut] = useState(false);
const [wastageListVisibility,setwastageListVisibility] = useState(false);
 
const openListOfOld = () => {
        setOldListVisibility(true);
    }

    const openListOfOldcash = () => {
      setOldListVisibilitycash(true);
  }
const openListOfOldsilver = () => {
   setOldsilverListVisibility(true);
}


const openListOfOldsilvercut = () => {
  setOldsilverListVisibilitycut(true);
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
            setDatasilver({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatacashitems({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatafancy({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDataratecut({
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

const tday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const resetInputField = () => {
        setData(initialFValues);

    };

    initialFValuescash = {
      id: '',
      type:'silver',
      netweight:'',
      lessweight:'',
      foodItemId: '',
      Tfiness:'',
       salesdate:new Date(),
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
      netweight:'',
      lessweight:'',
      foodItemId: '',
      Tfiness:'',
       salesdate:new Date(),
      foodItemName: '',
      quantity:'',
      foodItemPrice: '',
      rate:'',
      tax: '',
      discount:'',
      subtotal:0
  }
    initialFValues = {
        id: '',
        type:'silver',
        netweight:'',
        lessweight:'',
        foodItemId: '',
        Tfiness:'',
         salesdate:new Date(),
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
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotal:0
    }
    initialFValuesratecut= {
      id: '',
      type:'fancy',
      model:'pcs',
      foodItemId: '',
       salesdate:new Date(),
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
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        subtotal:0
    }
      initialFValueswastage = {
        id: '',
        type:'wastage',
        foodItemId: '',
         salesdate:new Date(),
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
         salesdate:new Date(),
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
          salesdate:new Date(),
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
    const [datacashitems, setDatacashitems] = useState(initialFValuescash)
    const [datasilver, setDatasilver] = useState(initialFValuesilver)
   // const [datapiece, setDatapiece] = useState(initialFValuespiece)
     const [datafancy, setDatafancy] = useState(initialFValuesfancy)
     const [dataratecut, setDataratecut] = useState(initialFValuesratecut)

  const [dataold, setDataold] = useState(initialFValuesold)

  const [datawastage, setDatawastage] = useState(initialFValueswastage)
   const [datawastagecash, setDatawastagecash] = useState(initialFValueswastagecash)
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
}
function handlesilver(e) {
  const newdata = { ...datasilver }
  newdata[e.target.id] = e.target.value
  setDatasilver(newdata)
}
function handlecash(e) {
  const newdata = { ...datacashitems }
  newdata[e.target.id] = e.target.value
  setDatacashitems(newdata)
}
 function handlefancy(e) {
        const newdatafancy = { ...datafancy }
        newdatafancy[e.target.id] = e.target.value
        setDatafancy(newdatafancy)
}
function handleratecut(e) {
  const newdatafancy = { ...dataratecut }
  newdatafancy[e.target.id] = e.target.value
  setDataratecut(newdatafancy)
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

const [currentIdsilver, setCurrentIdsilver] = useState(0)
const [isEditingsilver, setIsEditingsilver] = useState(false)

const [currentIdcash, setCurrentIdcash] = useState(0)
const [isEditingcash, setIsEditingcash] = useState(false)

 const [currentIdfancy, setCurrentIdfancy] = useState(0)
const [isEditingfancy, setIsEditingfancy] = useState(false)

const [currentIdratecut, setCurrentIdratecut] = useState(0)
const [isEditingratecut, setIsEditingratecut] = useState(false)

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
        if (currentIdsilver != 0) {
          setDatasilver({
              ...orderedFoodItemsilver.find(x => x.id == currentIdsilver)
          })
          
      }
      if (currentIdcash != 0) {
        setDatacashitems({
            ...ordercash.find(x => x.id == currentIdcash)
        })
        
    }
         if (currentIdfancy != 0) {
            setDatafancy({
                ...orderedfancyitems.find(x => x.id == currentIdfancy)
            })
            
        }

        if (currentIdratecut != 0) {
          setDataratecut({
              ...orderedratecutitems.find(x => x.id == currentIdratecut)
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
    }, [currentId,currentIdsilver,currentIdcash,currentIdold,currentIdfancy,currentIdratecut,currentIdwastage,currentIdwastagecash])
 
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
   const submitOrder = e => {
    //e.preventDefault();
    
        if (values.id == 0) {
         // setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                 reloadgpurchase();
                //.catch(
                  //      errorsound.play(),
                  //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
        }
        else {
            createAPIEndpoint(ENDPIONTS.PENDINGORDER).update(values.id, values)
                .then(res => {
                 // audioupdate.play()
                    setOrderId(0);
                     //getFreshModelObject()
                    setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                })
                 .catch(err => console.log(err))
                 reloadgpurchase();
               // .catch(
             //errorsound.play(),
                //  setNotify({ isOpen: true, message: "Error Updating Data",severity:"warning" ,variant:"filled"}));
        
    }

}
  const handleClickOpen = () => {
    setOpen(true);
    submitOrder();
    reloadgpurchase();
    fetchall()
  
  };
  const [opens, setOpens] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy here
  
    const copyToClipBoard = async copyMe => {
      setOpens(true);
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };
  const handleClose = () => {
    setOpen(false);
  };
  const [productspg, setProductspg] = useState([]);
  const [allProductspg, setAllProductspg] = useState([]);

  const [productspgs, setProductspgs] = useState([]);
  const [allProductspgs, setAllProductspgs] = useState([]);

  const [productspgrc, setProductspgrc] = useState([]);
  const [allProductspgrc, setAllProductspgrc] = useState([]);

  const [productspgc, setProductspgc] = useState([]);
  const [allProductspgc, setAllProductspgc] = useState([]);

  
 //let oldorderedFoodItems = values.oldorderDetails;
  const [productspgod, setProductspgod] = useState([]);
  const [allProductspgod, setAllProductspgod] = useState([]);
//   let ordercash = values.ordercashDetails;
  const [productspgoc, setProductspgoc] = useState([]);
  const [allProductspgoc, setAllProductspgoc] = useState([]);
//let orderedfancyitems = values.fancyitems;
  const [productspgf, setProductspgf] = useState([]);
  const [allProductspgf, setAllProductspgf] = useState([]);
// let ordercashitems = values.cashitems;
  const [productspgci, setProductspgci] = useState([]);
  const [allProductspgci, setAllProductspgci] = useState([]);

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
//var cashbalance =  values.ordersilverDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var orderpieceitemscash  = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldorderpieceitemscash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldcashbalances =  values.ordercashDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage  + resultpcs ;
 var totalfinesss = values.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0) + values.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0) + Number(values.cashreceivedonline);
  
 var totalfinessss = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
 
 const purchasewtsil = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
let a = (purchasewtsil?.reduce((total,currentValue) => total = total + currentValue,0));
const currentDate = new Date(); // Replace this with your actual date filter logic


const [transactions, setTransactions] = useState([]);

  useEffect(() => {
     createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    // Fetch data from API
   

   
  }, []);

  const fetchall = () => {
    createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
  }
const purchasewtsilaa = transactions.map(item =>
  item.orderNumber === values.orderNumber ?
    item.orderDetails
      .filter(detail => new Date(detail.salesdate) < currentDate) // Adjust the date filter logic
      .reduce((total, currentValue) => total + Number(currentValue.Tfiness), 0)
    : 0
);

const totalTfiness = purchasewtsilaa.reduce((total, currentValue) => total + currentValue, 0);

const totalTfinessToday = productspg.map(item =>
  item.orderNumber === values.orderNumber ?
    item.orderDetails
      .filter(detail => new Date(detail.salesdate) === currentDate) // Adjust the date filter logic
      .reduce((total, currentValue) => total + Number(currentValue.Tfiness), 0)
    : 0
);

console.log("to"+totalTfinessToday);
console.log(totalTfiness);

const purchasewtsils = productspgrc.map(item =>item.orderNumber == values.orderNumber ?(item?.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
let b = (purchasewtsils?.reduce((total,currentValue) => total = total + currentValue,0));

var totalfiness = ((Number(a)+Number(b)) + Number(values.cashreceivedonline)).toFixed(3)

var totalab = ((Number(a)+Number(b))).toFixed(3)
const silcal = productspgs.map(item =>item.orderNumber == values.orderNumber ?(item?.ordersilverDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let aa = (silcal?.reduce((total,currentValue) => total = total + currentValue,0));

const cascal = productspgc.map(item =>item.orderNumber == values.orderNumber ?(item?.pieceitems.reduce((total, currentValue) =>  total = total + currentValue.subtotal,0)):"")
let bb = (cascal?.reduce((total,currentValue) => total = total + currentValue,0));

var cashbalance = (Number(aa)+Number(bb))


const purchasewtod = productspgod.map(item =>item.orderNumber == values.orderNumber ?(item?.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0)):"")
let aod = (purchasewtod?.reduce((total,currentValue) => total = total + currentValue,0));

const purchasewtf = productspgf.map(item =>item.orderNumber == values.orderNumber ?(item?.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
let bf = (purchasewtf?.reduce((total,currentValue) => total = total + currentValue,0));

var adjustfiness = (Number(aod)+Number(bf) + Number(values.onlinecash)).toFixed(3)

var abcde = (Number(totalab) - Number(adjustfiness)).toFixed(3)
const abcd = new Date().toLocaleDateString != new Date().toLocaleDateString ? 0 : abcde
const orderc = productspgoc.map(item =>item.orderNumber == values.orderNumber ?(item?.ordercashDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let aoc = (orderc?.reduce((total,currentValue) => total = total + currentValue,0));

const orderci = productspgci.map(item =>item.orderNumber == values.orderNumber ?(item?.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let bci = (orderci?.reduce((total,currentValue) => total = total + currentValue,0));

var oldcashbalance = (Number(aoc)+Number(bci))

 // var totalfiness = values.orderDetails.reduce((total, currentValue) => total = total +   Number(((currentValue.foodItemPrice - currentValue.lessweight) * currentValue.tax)/100),0)
  var cashfiness = values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
  
   //var adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(((currentValue.foodItemPrices - currentValue.lessweights) * currentValue.taxs)/100),0)         
var adjustfinesss = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0) + Number(cashfiness)
   
   var netbalancefiness =  Number(totalfiness - adjustfiness)
   const Total = data.foodItemPrice * data.quantity

   let  Equity = Number(values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
         values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);

         
        let filtered = allProductspg.map(product => ({
          ...product,
          orderDetails: product.orderDetails.filter(child => {
            let productDate = new Date(child["salesdate"]);
            return productDate.salesdate !== today.salesdate;
          })
        }))
       
let netnew  = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")        
//let netnew = filtered?.map(item =>item.orderNumber == values.orderNumber ? item.orderDetails.map(row=>row.salesdate) == item.orderDetails.map(row=>row.salesdate)?"":(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
//let netnew = (?.reduce((total,currentValue) => total = Number(total + currentValue.Tfiness),0));
         
//const purchasewtsils = productspgrc.map(item =>item.orderNumber == values.orderNumber ?(item?.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
//let b = (purchasewtsils?.reduce((total,currentValue) => total = total + currentValue,0));




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

   const [alignment, setAlignment] = React.useState('InGots');

  const handleChanges = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  

  const reloadgpurchase = () =>{
    createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
              .then(res => {
                setProductspg(res.data);
                setAllProductspg(res.data);
                setProductspgs(res.data);
                setAllProductspgs(res.data);
                setProductspgrc(res.data);
                setAllProductspgrc(res.data);
                setProductspgc(res.data);
                setAllProductspgc(res.data);

                setProductspgod(res.data);
                setAllProductspgod(res.data);
                setProductspgoc(res.data);
                setAllProductspgoc(res.data);
                setProductspgf(res.data);
                setAllProductspgf(res.data);
                setProductspgci(res.data);
                setAllProductspgci(res.data);

                
              })
              .catch(err => console.log(err))
  }
  const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());

    useEffect(()=>{
     createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
              .then(res => {
                setProductspg(res.data);
                setAllProductspg(res.data);
                setProductspgs(res.data);
                setAllProductspgs(res.data);
                setProductspgrc(res.data);
                setAllProductspgrc(res.data);
                setProductspgc(res.data);
                setAllProductspgc(res.data);

                setProductspgod(res.data);
                setAllProductspgod(res.data);
                setProductspgoc(res.data);
                setAllProductspgoc(res.data);
                setProductspgf(res.data);
                setAllProductspgf(res.data);
                setProductspgci(res.data);
                setAllProductspgci(res.data);

                
              })
              .catch(err => console.log(err))

        },[])
  const handleSelectpg = (date) =>{
    // let filtered = allProductspg.filter((product) => {item.oldorderDetails.filter((row) =>{
 let filtered = allProductspg.map(product => ({
   ...product,
   orderDetails: product.orderDetails.filter(child => {
     let productDate = new Date(child["salesdate"]);
     return(productDate>= date.selection.startDate &&
       productDate<= date.selection.endDate);
   })
 }))
 .filter(item => item.orderDetails.length > 0)
     setStartDate(date.selection.startDate);
     setEndDate(date.selection.endDate);
     setProductspg(filtered);

     let filtereds = allProductspgs.map(products => ({
      ...products,
      ordersilverDetails: products.ordersilverDetails.filter(child => {
        let productDate = new Date(child["salesdate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
    }))
    .filter(item => item.ordersilverDetails.length > 0)
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
        setProductspgs(filtereds);

        let filteredrc = allProductspgrc.map(productrc => ({
          ...productrc,
          ratecutitems: productrc.ratecutitems.filter(child => {
            let productDate = new Date(child["salesdate"]);
            return(productDate>= date.selection.startDate &&
              productDate<= date.selection.endDate);
          })
        }))
        .filter(item => item.ratecutitems.length > 0)
            setStartDate(date.selection.startDate);
            setEndDate(date.selection.endDate);
            setProductspgrc(filteredrc);

            let filteredc = allProductspgc.map(productc => ({
              ...productc,
              pieceitems: productc.pieceitems.filter(child => {
                let productDate = new Date(child["salesdate"]);
                return(productDate>= date.selection.startDate &&
                  productDate<= date.selection.endDate);
              })
            }))
            .filter(item => item.pieceitems.length > 0)
                setStartDate(date.selection.startDate);
                setEndDate(date.selection.endDate);
                setProductspgc(filteredc);

                let filteredod = allProductspgod.map(productod => ({
                  ...productod,
                  oldorderDetails: productod.oldorderDetails.filter(child => {
                    let productDate = new Date(child["salesdate"]);
                    return(productDate>= date.selection.startDate &&
                      productDate<= date.selection.endDate);
                  })
                }))
                .filter(item => item.oldorderDetails.length > 0)
                    setStartDate(date.selection.startDate);
                    setEndDate(date.selection.endDate);
                    setProductspgod(filteredod);

                    let filteredoc = allProductspgoc.map(productoc => ({
                      ...productoc,
                      ordercashDetails: productoc.ordercashDetails.filter(child => {
                        let productDate = new Date(child["salesdate"]);
                        return(productDate>= date.selection.startDate &&
                          productDate<= date.selection.endDate);
                      })
                    }))
                    .filter(item => item.ordercashDetails.length > 0)
                        setStartDate(date.selection.startDate);
                        setEndDate(date.selection.endDate);
                        setProductspgoc(filteredoc);

                        let filteredf = allProductspgf.map(productf => ({
                          ...productf,
                          fancyitems: productf.fancyitems.filter(child => {
                            let productDate = new Date(child["salesdate"]);
                            return(productDate>= date.selection.startDate &&
                              productDate<= date.selection.endDate);
                          })
                        }))
                        .filter(item => item.fancyitems.length > 0)
                            setStartDate(date.selection.startDate);
                            setEndDate(date.selection.endDate);
                            setProductspgf(filteredf);


                            let filteredci = allProductspgci.map(productci => ({
                              ...productci,
                              cashitems: productci.cashitems.filter(child => {
                                let productDate = new Date(child["salesdate"]);
                                return(productDate>= date.selection.startDate &&
                                  productDate<= date.selection.endDate);
                              })
                            }))
                            .filter(item => item.cashitems.length > 0)
                                setStartDate(date.selection.startDate);
                                setEndDate(date.selection.endDate);
                                setProductspgci(filteredci);

                        
   };

   const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  const convertToImage = async (componentRef) => {
    const canvas = await html2canvas(componentRef);
    return canvas.toDataURL('image/png');
  };
  const downloadImage = (dataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleConvertToImage = async () => {
    const imageDataUrl = await convertToImage(componentRef.current);
    //const fileName = "myImage.png";
    const fileName = `${values.shopName}.png`;
    console.log('Image Data URL:', imageDataUrl);
    downloadImage(imageDataUrl, fileName);
    // Now you can use the imageDataUrl as needed (e.g., display it or save it).
  };

  

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
      NEW RECORDS
        </Typography>
        <Grid
  container
  
  direction="column"
  
 
  
>

  <Grid >
  <ThemeProvider theme={blackTheme}>
            <Button className={`${classes.root} `}  >
              <Badge badgeContent={orderedFoodItems.length} color="primary" > 
      <Tooltip title="Add Item"   arrow> 
        <img src={Printimg} height={35} onClick={handleClickOpen}/> 
         </Tooltip>
    </Badge>
        
          </Button>
   </ThemeProvider>
     
  </Grid>   
   
</Grid> 
 
  {/* <IconButton onClick={openListwastage}>
 <img src="https://img.icons8.com/material/30/FAB005/increase-decimal.png"/>
       
 
        </IconButton> */}


    <IconButton onClick={openListnonstock}>
  
    <Stack>
    <img src={Cashimg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >CASH</Box>
    </Stack>
  </IconButton>
  <Tooltip title="RATE CUT"   arrow> 
        <IconButton onClick={openListOfOldsilvercut}>
        <Stack>
        <img src={Taximg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >RATE CUT</Box>
    </Stack>  


  </IconButton>
         </Tooltip>
    <IconButton onClick={openListsilver}>
    <Stack>
    <img src={OSilver} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >SILVER</Box>
    </Stack>
      
  </IconButton>

<IconButton onClick={openListOfOrders}>

<Stack>
<img src={OGold} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >GOLD</Box>
    </Stack>    
 
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
                <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
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
    orderedFoodItemsilver.map((item ,idx) => {
    resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
   //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
    result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
          return (
              <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              {/*   <TableCell  component="th" scope="row">{
        noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
        <TableCell>
          <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
        </TableCell>
                                  <TableCell  >
                                   
                             {
          isEditingsilver === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Item" name="foodItemName" id="foodItemName" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datasilver.foodItemName} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div >{item.foodItemName}</Div>
      }
                                  </TableCell>
       
                                  <TableCell >
                                      <>
{
          isEditingsilver === idx ? 
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
          name="foodItemPrice" id="foodItemPrice" value={datasilver.foodItemPrice} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {item.foodItemPrice}g</Div>
      }
                           </>
                                  </TableCell>


                                  <TableCell >
                                      <>
{
          isEditingsilver === idx ? newval === item.type ? "-" :
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
          name="lessweight" id="lessweight" value={datasilver.lessweight} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
      }
                           </>
                                  </TableCell>

                                  <TableCell >
                                    
              {
          isEditingsilver ===idx ? 
                <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(datasilver.foodItemPrice  - datasilver.lessweight))}</Div>
          :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
      }
    </TableCell>
                                       <TableCell >
                                     {
          isEditingsilver ===idx ? newval === item.type ? "-" :
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
     value={datasilver.tax} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
      }
                                     
                                  </TableCell>
                                    <TableCell>

{  isEditingsilver ===idx ? newval === datasilver.type ? "-": (((datasilver.foodItemPrice - datasilver.lessweight) * datasilver.tax ) / 100).toFixed(3)
       :  <Div > {newval === item.type ? "-" : (((item.foodItemPrice - item.lessweight) * item.tax ) / 100).toFixed(3) }</Div>    
                                   }
                               
                            </TableCell>
                             <TableCell>
                                {/*newval === item.type ? item.rate :rates */}
                                  {
          isEditingsilver === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Rate" name="rate" id="rate" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datasilver.rate} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div >{item.rate}</Div>
      }
                                    </TableCell> 
                        
    
                               
                      
                                 <TableCell>
                        
{  isEditingsilver ===idx ? newval === datasilver.type ?  Math.round((datasilver.foodItemPrice * datasilver.rate) + Number(datasilver.tax)) : NumberFormat(Math.round(Number(((datasilver.foodItemPrice - datasilver.lessweight) * datasilver.tax ) / 100) * datasilver.rate))
       :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                   }
                                 </TableCell>

                                  <TableCell >
                                    {
                                       isEditingsilver === idx ? 
                                     
                                    <ThemeProvider theme={blueTheme}>
                                         
                                        
                                            <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                         onClick={(e)=>updatesilver(idx)}>
                                          
                                          <SaveAsOutlinedIcon  fontSize="medium"/>
                                          </Button>
                                          
                                          
                                    
                                      </ThemeProvider>
          :
                                    <ThemeProvider theme={greenTheme}>
                                          <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                   onClick={()=>{
                                        setCurrentIdsilver(item.id) 
                                        setIsEditingsilver(idx,true)
                                   }} >
                                           
                                              <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                          
                                      </ThemeProvider>
      }
                                      <ThemeProvider theme={redTheme}>
                                          <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                          onClick={e => removeFoodItemsilver(idx, item.orderDetailId)}
                                          > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                          </Button>
                                      </ThemeProvider>
                                  </TableCell>

                                  

                              </TableRow>
          );
        })}
        
              {
               orderedratecutitems.map((dataaratecut,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                  <Div >{new Date(dataaratecut.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemName} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >-</Div></TableCell>
                                           <TableCell><Div >-</Div></TableCell>
                                             <TableCell><Div >-</Div></TableCell>
                                              <TableCell><Div >-</Div></TableCell>
                                               <TableCell>
                                                {
                                                   isEditingratecut === idx ?  <Div >{((dataaratecut.foodItemPrice * 1) / dataratecut.rate).toFixed(3)}</Div> :
                                                    <Div >{dataaratecut.tax}</Div>
                                                }
                                               </TableCell>
                                      {/*  <TableCell >
                                            <>
{
                isEditingratecut === idx ? 
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
                name="foodItemPrice" id="foodItemPrice" value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          
                            
            <TableCell>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell> */}
                <TableCell>

                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.rate}</Div>
            }
                                        </TableCell>

              
                   <TableCell>
                { 

      
             isEditingratecut ===idx ? newkey === dataratecut.type ?  <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
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
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
             :   <Div > {Math.round(dataaratecut.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          
                                           {
                                             isEditingratecut === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updateratecut(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdratecut(dataaratecut.id) 
                                              setIsEditingratecut(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemratecut(idx, dataaratecut.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}

              {
               orderpieceitems.map((datapcs,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/*  <TableCell  component="th" scope="row">{
              noId == datapcs.foodItemId ?  <KeyOffTwoToneIcon/> :datapcs.foodItemId  }</TableCell> */}
                <TableCell>
                <Div >{new Date(datapcs.salesdate).toLocaleDateString()}</Div>
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
                            {((totalfiness))}G
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
                            {((adjustfiness))}G
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
                title="Cash"
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
               {/*  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
     
                  </TabPanel> */}
               <Non_stocksilver
         {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         />   
              
            </ItemPopup>
              <ItemPopup
                title="Cash"
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
      

        <Stack>
        <img src={Cashimg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >CASH</Box>
    </Stack>    
 
  </IconButton>
         </Tooltip>

      <Tooltip title="RATE CUT"   arrow> 
        <IconButton onClick={openListOfOldsilver}>
        <Stack>
        <img src={Taximg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >RATE CUT</Box>
    </Stack>  


  </IconButton>
         </Tooltip>
         <Tooltip title="Net Rate"   arrow> 
        <IconButton onClick={openListOfOldcash}>
        <Stack>
        <img src={OSilver} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >Net Rate</Box>
    </Stack>  

</IconButton>
         </Tooltip>
 
 <Tooltip title="GOLD-SILVER INGOTS"   arrow> 
        <IconButton onClick={openListOfOld}>
        <Stack>
        <img src={WGold} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >GOLD INGOTS</Box>
    </Stack>  

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
                <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
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
    ordercash.map((item ,idx) => {
    resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
   //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
    result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
          return (
              <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              {/*   <TableCell  component="th" scope="row">{
        noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
        <TableCell>
          <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
        </TableCell>
                                  <TableCell  >
                                   
                             {
          isEditingcash === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Item" name="foodItemName" id="foodItemName" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datacashitems.foodItemName} onChange={(e) => handlecash(e)} />
          </form>
          : <Div >{item.foodItemName}</Div>
      }
                                  </TableCell>
       
                                  <TableCell >
                                      <>
{
          isEditingcash === idx ? 
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
          name="foodItemPrice" id="foodItemPrice" value={datacashitems.foodItemPrice} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {item.foodItemPrice}g</Div>
      }
                           </>
                                  </TableCell>


                                  <TableCell >
                                      <>
{
          isEditingcash === idx ? newval === item.type ? "-" :
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
          name="lessweight" id="lessweight" value={datacashitems.lessweight} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
      }
                           </>
                                  </TableCell>

                                  <TableCell >
                                    
              {
          isEditingcash ===idx ? 
                <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(datacashitems.foodItemPrice  - datacashitems.lessweight))}</Div>
          :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
      }
    </TableCell>
                                       <TableCell >
                                     {
          isEditingcash ===idx ? newval === item.type ? "-" :
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
     value={datacashitems.tax} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
      }
                                     
                                  </TableCell>
                                    <TableCell>

{  isEditingcash ===idx ? newval === datacashitems.type ? "-": (((datacashitems.foodItemPrice - datacashitems.lessweight) * datacashitems.tax ) / 100).toFixed(3)
       :  <Div > {newval === item.type ? "-" : (((item.foodItemPrice - item.lessweight) * item.tax ) / 100).toFixed(3) }</Div>    
                                   }
                               
                            </TableCell>
                             <TableCell>
                                {/*newval === item.type ? item.rate :rates */}
                                  {
          isEditingcash === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Rate" name="rate" id="rate" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datacashitems.rate} onChange={(e) => handlecash(e)} />
          </form>
          : <Div >{item.rate}</Div>
      }
                                    </TableCell> 
                        
    
                               
                      
                                 <TableCell>
                        
{  isEditingcash ===idx ? newval === datacashitems.type ?  Math.round((datacashitems.foodItemPrice * datacashitems.rate) + Number(datacashitems.tax)) : NumberFormat(Math.round(Number(((datacashitems.foodItemPrice - datacashitems.lessweight) * datacashitems.tax ) / 100) * datacashitems.rate))
       :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                   }
                                 </TableCell>

                                  <TableCell >
                                    {
                                       isEditingcash === idx ? 
                                     
                                    <ThemeProvider theme={blueTheme}>
                                         
                                        
                                            <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                         onClick={(e)=>updatecash(idx)}>
                                          
                                          <SaveAsOutlinedIcon  fontSize="medium"/>
                                          </Button>
                                          
                                          
                                    
                                      </ThemeProvider>
          :
                                    <ThemeProvider theme={greenTheme}>
                                          <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                   onClick={()=>{
                                        setCurrentIdcash(item.id) 
                                        setIsEditingcash(idx,true)
                                   }} >
                                           
                                              <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                          
                                      </ThemeProvider>
      }
                                      <ThemeProvider theme={redTheme}>
                                          <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                          onClick={e => removecash(idx, item.orderDetailId)}
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
                <Div >{new Date(datacash.salesdate).toLocaleDateString()}</Div>
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
                  <Div >{new Date(dataafancy.salesdate).toLocaleDateString()}</Div>
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
                                {((totalfiness))}G
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
                            {((adjustfiness))}G
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
                title="Gold"
                openPopupitem={orderListVisibility}
                setOpenPopupitem={setOrderListVisibility}>
                 
                 
          {/*       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                  </TabPanel>*/}
                   <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
                 
            </ItemPopup> 
               <ItemPopup
                title="Ingots"
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
                title="Net Rate"
                openPopupitem={oldListVisibilitycash}
                setOpenPopupitem={setOldListVisibilitycash}>
                 
                <Oldcash
                    {...{
                      setOldListVisibilitycash,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
            <ItemPopup
                title="Rate Cut"
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
           
            <ItemPopup
                title="Rate Cut ---"
                openPopupitem={oldsilverListVisibilitycut}
                setOpenPopupitem={setOldsilverListVisibilitycut}>
                 
                <Rategcut 
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
               <Box className="watermark">
         <Box height='150.5px'>
           
        </Box>

 {
 
 alignment === "InGots" ? 
 <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
           <TableCell><h3>{values.shopName}</h3></TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ><h3>{new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
               
                
            })}</h3></TableCell>
           
          
          </TableRow>
           
          <TableRow>
       {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Date</TableCell>*/}
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Item</TableCell>
            {/*    <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net WT</TableCell>
         <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> 
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Less WT</TableCell>*/}
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Weight</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}}  >Purity</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Balance </TableCell>
        {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Debit</TableCell>*/}
            
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
      
         <TableCell >{/*
           productspg.map(item =>
            item.orderNumber == values.orderNumber ? item.orderDetails.map((row)=>new Date(row.salesdate).toLocaleDateString()) == new Date().toLocaleDateString() ?
            "add":"no":"ordernum")
           */}</TableCell>
            
              <TableCell ></TableCell>
            
      
            <TableCell sx={{ fontWeight:"bold"}}>OB:</TableCell>
         
            <TableCell sx={{ fontWeight:"bold"}}>{Number(values.cashreceivedonline).toFixed(3)}G</TableCell>
                                          
            </TableRow>
            
            {productspg.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.orderDetails?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell >{row.foodItemName}</TableCell>
                        {/*   <TableCell >{item.quantity}</TableCell> */}
                      <TableCell >{row.foodItemPrice+"G"}</TableCell>
                      {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
                <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
                   <TableCell >{row.tax == 0 ? "-" : row.tax+"%"}</TableCell>
                   
                   <TableCell >{newval === row.type ? "-" :row.Tfiness+"G"}</TableCell>
                  
                  
                    </TableRow>
                      )):"")}
{productspgrc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ratecutitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                 
                     <TableCell sx={{fontWeight:""}}>{row.foodItemName+"-->"+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                         <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                   {/* <TableCell >-</TableCell> */}
                    {/* <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
                    <TableCell >100%</TableCell>
                      <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                    
                   
                  
                   </TableRow>
                      )):"")}
{productspgs.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ordersilverDetails?.map((row) =>
            <TableRow key={row.id}>
    {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
              <TableCell sx={{fontWeight:""}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
                {/*   <TableCell >{item.quantity}</TableCell> */}
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
              {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
        <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
           <TableCell >{ "-" }</TableCell>
           
           <TableCell >{ "-" }</TableCell>
          
          
            </TableRow>
                      )):"")}



        
        {productspgc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.pieceitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell sx={{fontWeight:""}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                         {/*  <TableCell >{item.quantity}</TableCell> */}
                            <TableCell >-</TableCell>
                           {/*   <TableCell >-</TableCell>
                                <TableCell >-</TableCell>*/}
                                <TableCell >-</TableCell>
                                <TableCell >-</TableCell>
                                {/*    <TableCell >-</TableCell>
                                <TableCell >-</TableCell>
                  <TableCell >{item.foodItemPrice}</TableCell> 
                     <TableCell >-</TableCell>*/}
                      
                    </TableRow>
                      )):"")}
         
         

<TableRow sx={{border: "none",
  boxShadow: "none"}}>

              <TableCell sx={{border: "none", fontWeight:"bold",
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(cashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",
  boxShadow: "none"}}>Net WT:</TableCell>
                   
       
      <TableCell sx={{fontWeight:"bold"}} > {((totalfiness))}G</TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
              <TableCell sx={{fontWeight:"bold"}} >Purchase</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
                   
       
   
                   <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",
  boxShadow: "none"}} ></TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",
  boxShadow: "none"}}>OB:</TableCell>
                   
                   <TableCell sx={{fontWeight:"bold"}}>{(Number(values.onlinecash).toFixed(3))}G</TableCell> 
      
              
            </TableRow>
            <Snackbar
           
        message="Copied"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpens(false)}
        open={opens}
      >
         <Alert  severity="info"  variant="filled">
          Copied! Closing Balance:{(Number(totalfiness) - Number(adjustfiness)).toFixed(3)}G
        </Alert></Snackbar>      
            {productspgod.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.oldorderDetails?.map((row) =>
            <TableRow key={row.id}>
      {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
              <TableCell >{row.foodItemNames}</TableCell>
              
              <TableCell>{row.foodItemPrices+"G"}</TableCell>
           {/* <TableCell>{oldnewval === dataold.type ? "-" : item.lessweights+"G"}</TableCell> 
              <TableCell >{roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights)).toFixed(3)+"G"}</TableCell> */}
            <TableCell >{row.taxs +"%"}</TableCell>
        
                  <TableCell >{(((row.foodItemPrices - row.lessweights) * row.taxs ) / 100).toFixed(3)+"G"}</TableCell>
               
            
            </TableRow>
                      )):"")}


{productspgf.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.fancyitems?.map((row) =>
            <TableRow key={item.id}>
    {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
             {/* <TableCell >{item.foodItemName}</TableCell>*/}
              <TableCell sx={{fontWeight:""}}>{row.foodItemName+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                  <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
            {/* <TableCell >-</TableCell> 
             <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
               <TableCell >100%</TableCell>
            
               <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
               
            
           
            </TableRow>
                      )):"")}

{productspgoc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ordercashDetails?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell sx={{fontWeight:""}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
                        {/*   <TableCell >{item.quantity}</TableCell> */}
                      <TableCell >{row.foodItemPrice+"G"}</TableCell>
                      {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
                <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
                   <TableCell >{ "-" }</TableCell>
                   
                   <TableCell >{ "-" }</TableCell>
                  
                  
                    </TableRow>
                      )):"")}




{productspgci.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.cashitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(datacash.salesdate).toLocaleDateString()}</TableCell>*/}
            <TableCell sx={{fontWeight:""}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                <TableCell >-</TableCell>
                <TableCell >-</TableCell>
               <TableCell >-</TableCell>
          
             
              </TableRow>
                      )):"")} 
 

              
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(oldcashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",
  boxShadow: "none"}}>Net WT:</TableCell>
                   
                   <TableCell sx={{fontWeight:"bold"}}>{((adjustfiness))}G</TableCell> 
      
              
            </TableRow>
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",
  boxShadow: "none"}} >Closing Cash Bal:{NumberFormat((Number(cashbalance)) - (Number(oldcashbalance)))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{fontWeight:"bold"}}>Closing Balance:</TableCell>
 <TableCell sx={{fontWeight:"bold"}} onClick={() => copyToClipBoard((Number(totalfiness) - Number(adjustfiness)).toFixed(3))}>
  {(Number(totalfiness) - Number(adjustfiness)).toFixed(3)}G
{ /* (Number(values.purchasewt)+Number(values.cashreceivedonline) - Number(values.pannumber)).toFixed(3)G*/}
  </TableCell>
              
            </TableRow>

           

 { /* <><TableRow>

  <TableCell></TableCell>
  <TableCell></TableCell>

  <TableCell>Net [InGots]:</TableCell>
  <TableCell>  {((totalfiness)).toFixed(3)}G</TableCell>
  <TableCell>-</TableCell>
  <TableCell>-</TableCell>
  
</TableRow><TableRow>

    <TableCell></TableCell>
    <TableCell></TableCell>

    <TableCell>Credit [InGots]:</TableCell>
    <TableCell></TableCell>
    <TableCell>{((adjustfiness)).toFixed(3)}G</TableCell>
    <TableCell>-</TableCell>
  

  </TableRow><TableRow>

    <TableCell></TableCell>
    <TableCell></TableCell>

    <TableCell>Closing Balance :</TableCell>
    <TableCell></TableCell>
    <TableCell></TableCell>
    <TableCell>  {(Number(totalfiness) - Number(adjustfiness)).toFixed(3)}G</TableCell>
   <TableCell>{Number(values.cashreceivedonline).toFixed(3) + "G"}</TableCell>
  
 

  </TableRow></> */}



       
    
         
        </TableBody>
      </Table>
    </TableContainer> 
:

<TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
           <TableCell><h3>{values.shopName}</h3></TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
             <TableCell ></TableCell>
             <TableCell >{new Date().toLocaleDateString()}</TableCell>
          </TableRow>
           
          <TableRow>
          <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Date</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Item</TableCell>
            <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net WT</TableCell>
           {/*  <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> */}
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Less WT</TableCell>
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Gross WT</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}}  >Finess</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net Finess</TableCell>
         {/*  <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit Finess</TableCell>*/}
           
              <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Rate</TableCell>
            <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Debti Amount</TableCell>
            <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit Amount</TableCell>
            <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Balance Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       

         {orderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
         <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>
              <TableCell >{item.foodItemName}</TableCell>
                {/*   <TableCell >{item.quantity}</TableCell> */}
              <TableCell >{item.foodItemPrice+"G"}</TableCell>
              <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
        <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> 
           <TableCell >{item.tax == 0 ? "-" : item.tax+"%"}</TableCell>
           
           <TableCell >{newval === item.type ? "-" :item.Tfiness+"G"}</TableCell>
        
            <TableCell >{item.rate}</TableCell>
         
              <TableCell >                              
 { 
             isEditing ===idx ? newval === data.type ? NumberFormat(Math.round((data.foodItemPrice * silrate) + Number(data.tax))) : NumberFormat((data.foodItemPrice * data.quantity * rates) - (data.discount * data.foodItemPrice * data.quantity * rates) / 100 + data.tax * (data.foodItemPrice * data.quantity * rates) / 100 )
             :   NumberFormat(Math.round(item.subtotal))
                                         }</TableCell>
                                           <TableCell >-</TableCell>
                                           <TableCell >-</TableCell>
            </TableRow>
          ))}
        
      
         
          {orderpieceitems.map((item,idx) => (
            <TableRow key={item.id}>
            <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>
              <TableCell >{item.foodItemName}</TableCell>
                 {/*  <TableCell >{item.quantity}</TableCell> */}
                    <TableCell >-</TableCell>
                     <TableCell >-</TableCell>
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
        <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>
              <TableCell >{item.foodItemNames}</TableCell>
              
              <TableCell>{item.foodItemPrices+"G"}</TableCell>
              <TableCell>{oldnewval === dataold.type ? "-" : item.lessweights+"G"}</TableCell>
              <TableCell >{roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights)).toFixed(3)+"G"}</TableCell> 
            <TableCell >{item.taxs +"%"}</TableCell>
           
                  <TableCell >{(((item.foodItemPrices - item.lessweights) * item.taxs ) / 100).toFixed(3)+"G"}</TableCell>
              
               <TableCell >{item.rate}</TableCell>
             
            
                      <TableCell >-</TableCell>
                      
              <TableCell >                              
{ 
 isEditingold ===idx ? oldnewval === dataold.type ? NumberFormat(Math.round(('-'+dataold.foodItemPrices - dataold.quantitys) * dataold.rate)) : NumberFormat(('-'+dataold.foodItemPrices - dataold.quantitys ) * dataold.rate )          
    : NumberFormat(Math.round('-'+item.subtotals))
            }</TableCell>
                   <TableCell >-</TableCell>
            </TableRow>
          ))}

           {orderedfancyitems.map((item,idx) => (
            <TableRow key={item.id}>
        <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>
              <TableCell >{item.foodItemName}</TableCell>
                  <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>
             <TableCell >-</TableCell>
             <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>
               <TableCell >100%</TableCell>
               <TableCell >-</TableCell>
               <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>
                     
                        <TableCell >{item.rate}</TableCell>  
                        <TableCell >-</TableCell>
              <TableCell >   
                 { 
 isEditingfancy ===idx ? newkey === data.type ? NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate )) )) :  NumberFormat(Math.round( (Number(data.foodItemPrice) * Number(data.rate ))))
             :  NumberFormat(Math.round(item.subtotal))
                                         }                           
</TableCell>
           
            </TableRow>
          ))}
 
   {ordercashitems.map((datacash,idx) => (
    <TableRow key={datacash.id}>
   <TableCell > {new Date(datacash.salesdate).toLocaleDateString()}</TableCell>
      <TableCell >{datacash.foodItemName}</TableCell>
      <TableCell >-</TableCell>
     <TableCell >-</TableCell>
     <TableCell >-</TableCell>
     <TableCell >-</TableCell>
       <TableCell >-</TableCell>
       <TableCell >-</TableCell>
       <TableCell >-</TableCell>
           
  
      <TableCell >{NumberFormat(datacash.foodItemPrice)}</TableCell>                    
      <TableCell >-</TableCell>
   
    </TableRow>
  ))}
              

<TableRow>
<TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                           
                              <TableCell></TableCell>
                              <TableCell>Net Value:</TableCell>
                              <TableCell>{NumberFormat(Math.round(newitem))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell >-</TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                              
                                <TableCell></TableCell>
                                <TableCell>Credit:</TableCell>
                                <TableCell></TableCell>
                                <TableCell>{NumberFormat(+Math.round(news))}</TableCell>
                                <TableCell >-</TableCell>
                              </TableRow>
                              <TableRow>
                              <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                      
                                <TableCell></TableCell>
                                <TableCell>Balance:</TableCell>
                               <TableCell>{NumberFormat(values.cashreceived)}</TableCell>
                               <TableCell></TableCell>
                               <TableCell>{NumberFormat((Number(values.gTotal)) - Number(Equity) - (-Number(values.cashreceived)))}</TableCell>

                              </TableRow>
                            
                   


       
    
         
        </TableBody>
      </Table>
    </TableContainer> 
    }

         
              
         </Box>
 
          </DialogContentText>
          <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChanges}
      aria-label="Platform"
    >
      <ToggleButton value="InGots">InGots</ToggleButton>
      <ToggleButton value="Cash">Cash</ToggleButton>
    
    </ToggleButtonGroup>
<ReactToPrint
        trigger={() =>  <IconButton color="info" >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> 
<Button className={`${classes.rootbutton}`}
              color="primary"
              variant="outlined"
              style={{ backgroundColor: 'secondary' }}
           
            >
  
                <Pdf targetRef={componentRef} filename={`${values.shopName}.pdf`}>
                        {({ toPdf }) => <PictureAsPdfOutlinedIcon onClick={toPdf}/>}
                      </Pdf>
            </Button>
            <Button  onClick={handleConvertToImage}>IMAGE</Button>
     <Button onClick={reloadgpurchase}>REload</Button>
            <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectpg}
      />
        </DialogContent>
       
      </Dialog>
       
    </Paper>
    </Grid>
    </Grid>
   
  );
}
