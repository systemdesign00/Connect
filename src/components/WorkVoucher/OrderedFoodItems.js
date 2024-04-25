import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import { List, ListItem, ListItemText, ListItemAvatar,ListItemSecondaryAction } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
  import { TbFileDescription } from "react-icons/tb";
import { FaWeightScale } from "react-icons/fa6";
import { GiWeightScale } from "react-icons/gi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { MdTipsAndUpdates } from "react-icons/md";
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { COLORS } from '../../layouts/Colors';
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
import Printimg from '../../Icons/print.png'
import WGold from '../../Icons/wgold.png'
import Closeimg from '../../Icons/close.png'
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
  

const [isDialogOpen, setIsDialogOpen] = useState(false);
const [editingIndex, setEditingIndex] = useState(null);

const [editedData, setEditedData] = useState({
  foodItemNames: '',
  foodItemPrices: '',
  quantitys: '',
  rate:'',
  taxs:'',
  subtotals:'',
  discounts:''
  // Add other fields as needed
});


const handleCloseDialog = () => {
  setIsDialogOpen(false);
  setEditingIndex(null);
};


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
           foodItem.Purity = data.Purity
              foodItem.quantity = data.quantity
              foodItem.tax = data.tax
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax * data.foodItemPrice) : (data.foodItemPrice * data.quantity * data.rate) - (data.discount * data.foodItemPrice * data.quantity * data.rate) / 100 + data.tax * (data.foodItemPrice * data.quantity * data.rate) / 100 
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
              foodItem.Purity = dataadd.Purity
               foodItem.tax = dataadd.tax
              foodItem.discount = dataadd.discount
 foodItem.subtotal = additem === dataadd.type ? ( Number(dataadd.foodItemPrice) * (Number(dataadd.tax)+ Number(dataadd.rate)) ) :( Number(dataadd.foodItemPrice) * (Number(dataadd.tax)+ Number(dataadd.rate)));
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
                  foodItem.Purity = stockdataadd.Purity
              foodItem.tax = stockdataadd.tax
              foodItem.discount = stockdataadd.discount
              foodItem.rate = stockdataadd.rate
 foodItem.subtotal = stockadditem === stockdataadd.type ? ( Number(stockdataadd.foodItemPrice) * (Number(stockdataadd.tax)+ Number(stockdataadd.rate)) ) :( Number(stockdataadd.foodItemPrice) *  Number(stockdataadd.rate));
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
   foodItem.subtotals =  oldnewval === dataold.type ?  (dataold.foodItemPrices * dataold.quantitys) / 100 : (dataold.foodItemPrices * dataold.quantitys) / 100           
              foodItem.discounts = dataold.discounts
        setValues({...x});
        setIsEditingold(false)
        //resetInputField()
      }
const oldupdates = (idx, editedData) => {
  setValues((prevValues) => {
    const updatedOrderDetails = prevValues.oldorderDetails.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemNames: editedData.foodItemNames,
          foodItemPrices: editedData.foodItemPrices,
          quantitys: editedData.quantitys,
          taxs: editedData.taxs,
          //rate:editedData.rate,
          subtotals:
            oldnewval === editedData.type
              ?  (editedData.foodItemPrices * editedData.quantitys) / 100
              : (editedData.foodItemPrices * editedData.quantitys) / 100,
          discounts: editedData.discounts,
        };
      }
      return item;
    });

    return {
      ...prevValues,
      oldorderDetails: updatedOrderDetails,
    };
  });

  setIsEditingold(false);
};

const handleDialogSubmit = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  oldupdates(editingIndex, editedData);

  setIsDialogOpen(false);
  setEditingIndex(null);
};

  
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
        Purity:'91.60%',
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
        Purity:'91.60%',
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
        Purity:'91.60%',
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
  const [dense, setDense] = useState(true);
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
     var iddate = new Date(values.hireDate).toLocaleDateString();
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
var making = stockaddorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
   //const making = stockaddorderedFoodItems.map((item,idx) => (item.foodItemPrice))
   let oldcal =  oldorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
  let totalweigth = stockaddorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let totalweigths = addorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let netweights =  Number(totalweigth )+ Number(totalweigths)
  const totalpcs = Number(stockaddorderedFoodItems.length) + Number(addorderedFoodItems.length);
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
  const hallmarkingcal = Number(stockaddorderedFoodItems.length * values.debitcash) + Number(addorderedFoodItems.length * values.debitcash);
const makingcal = Number(values.gTotal * values.onlinecash)/100;
let totalgst=  Number(values.gTotal + makingcal + (Number(hallmarkingcal)))       
  const gstpertotal = Number((totalgst * 1.5)/100);
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
     <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar >
      <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6" >
      Work Voucher
        </Typography>
        <IconButton color="info" >
             <img src={Printimg} height={35} onClick={handleClickOpen}/> 
        </IconButton>
        
     <Tooltip title="Gold Ingots"   arrow> 
        <IconButton onClick={openListOfOld}>
<img src={WGold} height={35}/>
</IconButton>
         </Tooltip>



  </Toolbar>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader className={classes.table }>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Gross Weight</TableCell>
             <TableCell>Purity</TableCell>
             <TableCell>Net Purity</TableCell>
              <TableCell>Cu/Au Purity</TableCell>
             <TableCell>Copper</TableCell>
             <TableCell>Net Weight</TableCell>
             {/*<TableCell>Total</TableCell>*/}
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
                       
                                        <TableCell  component="th" scope="row" 
                                        onClick={() => {
    setEditingIndex(idx);
    setEditedData({
      foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }} >
                                         
                                   {
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         



             <TextField label="Description" name="foodItemNames" id="foodItemNames" 
             color='error'
             focused
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
                                        <TableCell  onClick={() => {
    setEditingIndex(idx);
    setEditedData({
     foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
                                            <>
{
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          color='error'
            focused
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
                                              
                                               
                                                  

                                            </>
                                        </TableCell>
                                        <TableCell  onClick={() => {
    setEditingIndex(idx);
    setEditedData({
     foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
                                           {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
          color='error'
            focused
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Purity" name="quantitys" id="quantitys" 
           value={dataold.quantitys} onChange={(e) => handleold(e)} />
                </form>
                : <Div > {item.quantitys}%</Div>
            }
                                           
                                        </TableCell>
                               
                                       <TableCell 
                                        onClick={() => {
    setEditingIndex(idx);
    setEditedData({
     foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
                               

                                         { 
                                            isEditingold ===idx ? oldnewval === dataold.type ? ((dataold.foodItemPrices * dataold.quantitys) / 100).toFixed(3) :( (dataold.foodItemPrices * dataold.quantitys) / 100).toFixed(3)          
                                            :  <Div > {(item.subtotals).toFixed(3)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell  onClick={() => {
    setEditingIndex(idx);
    setEditedData({
     foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
                                           {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
          color='error'
            focused
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Cu/Au" name="taxs" id="taxs" 
           value={dataold.taxs} onChange={(e) => handleold(e)} />
                </form>
                : <Div > {item.taxs}%</Div>
            }
                                           
                                        </TableCell>
 <TableCell  onClick={() => {
    setEditingIndex(idx);
    setEditedData({
     foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
   <Div > {((Number(item.subtotals)/(item.taxs/100)) - Number(item.subtotals)).toFixed(3)}g</Div>
 </TableCell>

  <TableCell  onClick={() => {
    setEditingIndex(idx);
    setEditedData({
      foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals:item.subtotals
      // Set other fields as needed
    });
    setIsDialogOpen(true);
  }}>
    
  <Div > {(((Number(item.subtotals)/(item.taxs/100)) - Number(item.subtotals)) + Number(item.subtotals)).toFixed(3)}g</Div>
 </TableCell>
                                        <TableCell >
                                          {/*
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
                                        */}
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
{    /*      <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/arcade/32/null/percentage.png"/> </>}   {...a11yProps(0)} />
          <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/windows/32/null/decrease-decimal.png"/> </>}  {...a11yProps(1)} />*/}
            <Tab icon={<> <img src="https://img.icons8.com/external-xnimrodx-blue-xnimrodx/32/null/external-stock-delivery-xnimrodx-blue-xnimrodx.png"/> <img src="https://img.icons8.com/arcade/32/null/plus-math.png"/> </>}  {...a11yProps(0)} />
         { /*<Tab icon={<img src="https://img.icons8.com/arcade/32/null/percentage.png"/>} label="Non_Stock" {...a11yProps(3)} />
          <Tab icon={<img src="https://img.icons8.com/windows/32/null/decrease-decimal.png"/>} label="Non_Stock_Decimal" {...a11yProps(4)} />*/}
          <Tab icon={<img src="https://img.icons8.com/arcade/32/null/plus-math.png"/>} label="AddNon_Stock" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={valuetabs} index={0}>
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
      <TabPanel value={valuetabs} index={1}>
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
                        trigger={() => <img src={Printimg} height={30}/> }
                        content={() => componentRef.current}/>
                    </Button>
                    &nbsp;
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleClose}>
                    <img src={Closeimg} height={30} onClick={handleClickOpen}/> 
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
         <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    WORK VOUCHER
      </Typography>
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
 DHANISH GOLD
    
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
      {values.secondarymobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  REF NO :{values.billNo}{values.id}
  </Typography>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Date : {new Date(values.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
  </Typography>
{/*Tax Invoice No : {values.id} / {lastFive}-{nextyear} , Date : {values.hireDate}
  </Typography>
 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     Pan Number : {values.pannumber}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     Aadhaar Number : {values.aadhaarnumber}
      </Typography>
   */ }
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >

<Divider/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
             {/* <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
           <TableCell sx={{color: 'blue'}}>Purity</TableCell>
              <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
              <TableCell sx={{color: 'blue'}}>less Weight</TableCell>*/}
         <TableCell sx={{color: 'blue'}}>Gross Weight</TableCell>
          <TableCell sx={{color: 'blue'}}>Purity</TableCell>
            {/* <TableCell sx={{color: 'blue'}}>UOM</TableCell>
           <TableCell sx={{color: 'blue'}} >Rate</TableCell>*/}
           <TableCell sx={{color: 'blue'}}>NetPurity </TableCell>
            <TableCell sx={{color: 'blue'}}>Copper </TableCell>
            <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
           </TableRow>
        </TableHead>
      <TableBody>
          
          
{oldorderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{idx + 1}</TableCell>
              <TableCell >{item.foodItemNames}</TableCell>
              {/*  <TableCell >{item.HSN_CODE}</TableCell>
            <TableCell >{item.Purity}</TableCell>*/}
              <TableCell>{item.foodItemPrices}g</TableCell>
              <TableCell >{item.quantitys}%</TableCell>
              <TableCell >{(Number(item.foodItemPrices * item.quantitys)/100).toFixed(3)}g</TableCell>
              <TableCell > {((Number(item.subtotals)/(item.taxs/100)) - Number(item.subtotals)).toFixed(3)}g</TableCell>
              <TableCell >{(((Number(item.subtotals)/(item.taxs/100)) - Number(item.subtotals)) + Number(item.subtotals)).toFixed(3)}g</TableCell>
              </TableRow>
          ))}

               <TableRow >
              <TableCell ></TableCell>
            <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
                <TableCell ></TableCell>
             <TableCell >Net Value:</TableCell>
            <TableCell >{oldorderedFoodItems.reduce((total, currentValue) => total = total + (((Number(currentValue.subtotals)/(currentValue.taxs/100)) - Number(currentValue.subtotals)) + Number(currentValue.subtotals)),0).toFixed(3)}g</TableCell>
              </TableRow>
       </TableBody>
      </Table>
<Divider/>

<Divider/>
      


       
<Typography variant="body1" gutterBottom>
     
   
      </Typography>
    
WT:{netweightolds.toFixed(3)}g ,PCS:{totalpcsold} 
</TableContainer> 
     { /*<Typography variant="body1" gutterBottom>
     values.cashreceived) + Number(values.cashreceivedonline
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
     <Box height="15vh"> </Box>
            
 <Grid container spacing={4}>
  <Grid item xs={5}>
     <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     
      </Typography>
   </Grid>
   
  <Grid item xs={4}>
  <Typography variant="h5" gutterBottom display="block" sx={{fontWeight: 'bold',color:'black'}}>
    
      </Typography>
  </Grid>
  <Grid item xs>
    <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Authorized Signatory
      </Typography>
  </Grid>
</Grid> 
{/*<Grid container spacing={3}>
  <Grid item xs>
    
  </Grid>
  <Grid item xs={6}>
     <Typography variant="body1" gutterBottom>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thank You for being a customer of Dhanish Gold
               </Typography>
  </Grid>
  <Grid item xs>
    
  </Grid>
</Grid> */}
          </DialogContentText>
       
{ /*<ReactToPrint
        trigger={() =>  <IconButton color="info" >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> */}
        </DialogContent>
       
      </Dialog>

      <ItemPopup
                title="EDIT DATA"
                openPopupitem={isDialogOpen}
                setOpenPopupitem={handleCloseDialog}>
               
                <form id="editForm" onSubmit={handleDialogSubmit}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemNames"
          id="foodItemNames"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedData.foodItemNames}
          onChange={(e) => setEditedData({ ...editedData, foodItemNames: e.target.value })}
        /> 
         <TextField
          label="WEIGHT"
          name="foodItemPrices"
          id="foodItemPrices"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedData.foodItemPrices}
          onChange={(e) => setEditedData({ ...editedData, foodItemPrices: e.target.value })}
        />
         <TextField
          label="PURITY"
          name="quantitys"
          id="quantitys"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedData.quantitys}
          onChange={(e) => setEditedData({ ...editedData, quantitys: e.target.value })}
        />
         <TextField
          label="NET PURITY"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={Number(editedData.foodItemPrices * editedData.quantitys)/100}
         
        />
         <TextField
          label="Copper (Cu/Au PURITY)"
          name="taxs"
          id="taxs"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
           <IoPricetagsOutline />
              </InputAdornment>
            ),
          }}
          value={editedData.taxs}
          onChange={(e) => setEditedData({ ...editedData, taxs: e.target.value })}
        />
         
 
<TextField
          label="NET COPPER WEIGHT"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={((Number(Number(editedData.foodItemPrices * editedData.quantitys)/100)/(editedData.taxs/100)) - Number(Number(editedData.foodItemPrices * editedData.quantitys)/100)).toFixed(3)}
         
        />
         <TextField
          label="NET WEIGHT"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
       value={(((Number(Number(editedData.foodItemPrices * editedData.quantitys)/100)/(editedData.taxs/100)) - Number(Number(editedData.foodItemPrices * editedData.quantitys)/100)) + Number(Number(editedData.foodItemPrices * editedData.quantitys)/100)).toFixed(3)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>





     
            </ItemPopup>

       
    </Paper>

  
   
  );
}
