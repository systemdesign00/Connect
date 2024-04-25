import React, { useState, useEffect,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from '../../api'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { roundTo2DecimalPoint,roundTo2DecimalPoints } from "../../utils/index";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles ,useTheme} from '@mui/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import { NumberFormat } from '../../Services/NumberFormat';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ReactToPrint from 'react-to-print';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Notification from "../../layouts/Notification";
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { TextField } from '@mui/material';
import { CalendarTodayOutlined } from '@mui/icons-material';
import Popup from '../../layouts/Popup';
import Draggable from 'react-draggable';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Golds from '../../Icons/goldreport.png'
import Silvers from '../../Icons/silverreport.png'
import Fancys from '../../Icons/fancyreport.png'

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
const useStyles = makeStyles(theme => ({

    table: {
        '& thead th': {
            fontWeight: '600',
           // color: useTheme().palette.primary.main,
            //backgroundColor: useTheme().palette.primary.light,
        },
        
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
      
    },
    tablebill: {
        '& thead th': {
            fontWeight: '600',
            //color: useTheme().palette.primary.main,
            //backgroundColor: useTheme().palette.primary.light,
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
    }

}))


export default function Stock() {
    const classes = useStyles();
  const [valuetabss, setValuetabss] = React.useState(0);
  let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
  const handleChangetabss = (event, newValue) => {
    setValuetabss(newValue);
  };


    const [orderList, setOrderList] = useState([]);
    const [orderListgst, setOrderListgst] = useState([]);
    const [orderListsilvergst, setOrderListsilvergst] = useState([]);
     const [orderListpcs, setOrderListpcs] = useState([]);
    const [orderListoldgold, setOrderListoldgold] = useState([]);
    const [orderListsilver, setOrderListsilver] = useState([]);
      const [orderListoldsilver, setOrderListoldsilver] = useState([]);
        const [orderListfancy, setOrderListfancy] = useState([]);
          const [orderListoldpurchase, setOrderListoldpurchase] = useState([]);

           const [searchKey, setSearchKey] = useState(isToday);
    const [searchList, setSearchList] = useState([]);

    const [oldsearchKey, oldsetSearchKey] = useState(isToday);
    const [oldsearchList, setoldSearchList] = useState([]);

      const [goldsearchKey, goldsetSearchKey] = useState(isToday);
    const [goldsearchList, goldsetSearchList] = useState([]);

      const [oldgoldsearchKey, oldgoldsetSearchKey] = useState(isToday);
    const [oldgoldsearchList, oldgoldsetSearchList] = useState([]);

     const [fancysearchKey, fancysetSearchKey] = useState(isToday);
    const [fancysearchList, fancysetSearchList] = useState([]);

     const [piecesearchKey, piecesetSearchKey] = useState(isToday);
    const [piecesearchList, piecesetSearchList] = useState([]);

    const [oldpurchasesearchKey, oldpurchasesetSearchKey] = useState(isToday);
     const [oldpurchasesearchList, oldpurchasesetSearchList] = useState([]);
     const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' ,variant:''})
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
const [foodItems, setFoodItems] = useState([]);
     const [searchLists, setSearchLists] = useState([]);
      
     const [foodItemspercentage, setFoodItemspercentage] = useState([]);
     const [searchListspercentage, setSearchListspercentage] = useState([]);

     const [foodItemsilver, setFoodItemsilver] = useState([]);
     const [searchListsilver, setSearchListsilver] = useState([]);

     const [foodItemsilver2, setFoodItemsilver2] = useState([]);
     const [searchListsilver2, setSearchListsilver2] = useState([]);

      const [foodItemsold, setFoodItemsold] = useState([]);
     const [searchListsold, setSearchListsold] = useState([]);

     const [foodItemsfancy, setFoodItemsfancy] = useState([]);
     const [searchListsfancy, setSearchListsfancy] = useState([]);

    const [searchKeys, setSearchKeys] = useState(isToday);

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [productsil, setProductsil] = useState([]);
    const [allProductsil, setAllProductsil] = useState([]);

    

    const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());
  

      useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STANDARDGST).fetchAll()
            .then(res => {
                //setFoodItems(res.data);
                //setSearchLists(res.data);
                setProducts(res.data);
                setAllProducts(res.data);
             })
            .catch(err => console.log(err))
          

             createAPIEndpoint(ENDPIONTS.SIMPLEGST).fetchAll()
            .then(res => {
                //setFoodItemspercentage(res.data);
                //setSearchListspercentage(res.data);
                setProducts(res.data);
                setAllProducts(res.data);
             })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.STANDARDGSTSILVER).fetchAll()
            .then(res => {
                //setFoodItemsilver(res.data);
                //setSearchListsilver(res.data);
               // setProductsil(res.data);
                //setAllProductsil(res.data);
             })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
            .then(res => {
              
                 //setFoodItemsilver2(res.data);
                //setSearchListsilver2(res.data);
                setProductsil(res.data);
                setAllProductsil(res.data);
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
            .then(res => {
                setFoodItemsold(res.data);
                setSearchListsold(res.data);
             })
            .catch(err => console.log(err))

 }, [])

    useEffect(() => {
        let x = [...foodItems];
        let a = [...foodItemspercentage];
        let c = [...foodItemsilver];
        let e = [...foodItemsilver2];
        let g = [...foodItemsold];
      
        x = x.filter(y => {
            return y.hireDate.toLowerCase().includes(searchKeys)
         });
         a = a.filter(b => {
            return b.hireDate.toLowerCase().includes(searchKeys)
         });
         c = c.filter(d => {
            return d.hireDate.toLowerCase().includes(searchKeys)
         });
          e = e.filter(f => {
            return f.hireDate.toLowerCase().includes(searchKeys)
         });
          g = g.filter(h => {
            return h.hireDate.toLowerCase().includes(searchKeys)
         });
        
        setSearchLists(x);
        setSearchListspercentage(a);
        setSearchListsilver(c);
         setSearchListsilver2(e);
           setSearchListsold(g);
        
    }, [searchKeys])
 
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STANDARDGST).salesprimaryfetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
             createAPIEndpoint(ENDPIONTS.SIMPLEGST).salesprimaryfetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
             createAPIEndpoint(ENDPIONTS.QSILVERGST).salesprimaryfetchAll()
            .then(res => {
              
                setOrderListsilvergst(res.data)
            })
            .catch(err => console.log(err))
            

    }, [])
    
    const handleSelect = (date) =>{
      let filtered = allProducts.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProducts(filtered);
    };

    const handleSelectsil = (date) =>{
      let filtered = allProductsil.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProductsil(filtered);
    };
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }
    
   const subtotalspcs = piecesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.quantity)
    
  }, 0);
    const subtotalssilver = searchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrice)
    
  }, 0);

      const subtotalssfancy = fancysearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrice)
    
  }, 0);
 
  const subtotalsoldpurchase = oldpurchasesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrices)
    
  }, 0);
  const subtotalscasholdpurchase = oldpurchasesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotals)
    
  }, 0);
 
  

   const Fetchuserpcs=()=>{
      createAPIEndpoint(ENDPIONTS.SALESPCSITEMS).salespcsfetchAll()
   
    .then(response=>{
      piecesetSearchList(response.data);
    })
  }
    
  
   const Fetchuseroldpurchase=()=>{
      createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASEREPORT).salesfancyfetchAll()
   
    .then(response=>{
      fancysetSearchList(response.data);
    })
  }
const noId = 0;
   

     const onDeletepcs = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.SALESPCSITEMS).salespcsdelete(id)
                   .then(res => {
                   Fetchuserpcs();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }

      
    
    
     const onDeleteoldpurchase = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASEREPORT).salesfancydelete(id)
                   .then(res => {
                   Fetchuseroldpurchase();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }
              
     const goldcolumns = [
  { id: 'itemcode', label: 'HUID',minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'left',
   
  }
];

const oldgoldcolumns = [
  { id: 'itemcode', label: 'ItemID',minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'left',
   
  }
]
const fancycolumns = [
  { id: 'itemcode', label: 'Item Code', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'left',
   
  }
];
const piececolumns = [
  { id: 'itemcode', label: 'Item Code', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    align: 'left',
   
  },
  {
    id: 'rate',
    label: 'Rate',
    minWidth: 100,
    align: 'left',
   
  },
  
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 170,
    align: 'left',
    
  }
];

const oldcolumns = [
  { id: 'itemcode', label: 'Item Code', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'left',
   
  }
];

const columns = [
  { id: 'itemcode', label: 'HUID', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'weight',
    label: 'Weight',
    minWidth: 100,
    align: 'left',
   
  }
];
const oldpurchases = [
  { id: 'itemcode', label: 'Item Code', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'itemname',
    label: 'Item Name',
    minWidth: 100,
    align: 'left',
    
  },
  {
    id: 'netweight',
    label: 'Net Weight',
    minWidth: 100,
    align: 'left',
   
  },
  {
    id: 'lessweight',
    label: 'Less Weight',
    minWidth: 100,
    align: 'left',
   
  },
  
  {
    id: 'rate',
    label: 'Rate',
    minWidth: 170,
    align: 'left',
    
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'left',
    
  }
];
const [Equalize, setEqualize] = useState(false);
const openEqualize = () => {
        setEqualize(true);
    }

    const [Equalizes, setEqualizes] = useState(false);
    const openEqualizes = () => {
            setEqualizes(true);
        }

    let key = 'foodItemName'
const findgold = (arr, key) => {
  let arr2 = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
}
  console.log(findgold(goldsearchList,key))
const componentRef = useRef();

const adddatapercent =   products.map(item => (item?.stockaddorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatapercent.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapercent = adddatapercent.reduce((total,currentValue) => total = total + currentValue,0);

const adddataadd =   products.map(item => (item?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataadd.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadd = adddataadd.reduce((total,currentValue) => total = total + currentValue,0);
//new gst
const adddatapercents =   products.map(item => (item?.stockaddorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatapercents.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapercents = adddatapercents.reduce((total,currentValue) => total = total + currentValue,0);

const adddataadds =   products.map(item => (item?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataadds.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadds = adddataadds.reduce((total,currentValue) => total = total + currentValue,0);

const adddatapercentss =   products.map(item => (item?.orderPercent?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatapercents.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapercentss = adddatapercentss.reduce((total,currentValue) => total = total + currentValue,0);

const adddataaddss =   products.map(item => (item?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataadd.reduce((total,currentValue) => total = total + currentValue,0))
let savedataaddss = adddataaddss.reduce((total,currentValue) => total = total + currentValue,0);

const adddatasilver =   productsil.map(item => (item?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilver.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilver = adddatasilver.reduce((total,currentValue) => total = total + currentValue,0);

const savedatasilvers = 0;
/*
const adddatasilvers =   productsil.map(item => (item?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilvers.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilvers = adddatasilvers.reduce((total,currentValue) => total = total + currentValue,0);
*/
let silvertotal = Number(savedatasilver) + Number(savedatasilvers)

const adddatasilverfancy =   searchListsilver.map(item => (item?.fancyitems?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilverfancy = adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0);

const adddatasilverfancys=   searchListsilver2.map(item => (item?.fancyitems?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilverfancys.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilverfancys = adddatasilverfancys.reduce((total,currentValue) => total = total + currentValue,0);

let fancytotal = Number(savedatasilverfancy) + Number(savedatasilverfancys)
{/*OLD CALCULATION */ }
const oldcalgold =   searchListsold.map(item => (item?.oldorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldcalgold.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldcalc = oldcalgold.reduce((total,currentValue) => total = total + currentValue,0);

const oldsilvercalc =   orderList.map(item => (item?.oldorderDetailsilver?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldsilver = oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0);

let cashcountreceived = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.gCash),0));
let cashcountonline = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.onlinecash),0));

let netweight = Number(savedatapercent) + Number(savedataadd) + Number(savedatapercents) + Number(savedataadds) + Number(savedatapercentss) + Number(savedataaddss)
let netoldgoldweight = Number(saveoldcalc) 
let netoldsilverweight =  Number(saveoldsilver) 

let totalcash = Number(cashcountreceived) + Number(cashcountonline)
const [displaygoldstk, setdisplaygoldstk] = useState([]);
const [displaysilverstk, setdisplaysilverstk] = useState([]);

useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).fetchAll()
            .then(res => {
              
                setdisplaygoldstk(res.data)
            })
            .catch(err => console.log(err))
             createAPIEndpoint(ENDPIONTS.GSTSILVERSTOCK).fetchAll()
            .then(res => {
              
                setdisplaysilverstk(res.data)
            })
            .catch(err => console.log(err))
}, [])


  var goldstk = displaygoldstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var silverstk = displaysilverstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);

  return (
    <>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabss} onChange={handleChangetabss} centered>
          <Tab  icon={<img src={Golds} height="30" />} label="Gold Sales Report" {...a11yProps(0)} />
          <Tab  icon={<img src={Silvers} height="30" />} label="Silver Sales Report " {...a11yProps(1)} />
         <Tab  icon={<img src={Fancys} height="30" />} label="Fancy Sales Report " {...a11yProps(2)} />
         {/* <Tab label="OLD PURCHASES || JOB WORK " {...a11yProps(3)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={valuetabss} index={0}>
        <Box sx={{marginRight:2,marginLeft:2,paddingTop:'7px'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
    <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Gold
        </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openEqualize}
          >
            <img src="https://img.icons8.com/color/30/000000/gold-bars.png"/>
          </IconButton>
          <IconButton color="primary" >
<Tooltip title="Print"   arrow> 
        <LocalPrintshopOutlinedIcon onClick={handleClickOpen}/> 
         </Tooltip>
</IconButton>
      
  </Grid>
 
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {goldcolumns.map((column) => (
                <TableCell
                  key={column.id} >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
          {
   products?.map(item => (item?.stockaddorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
               <TableCell  component="th" scope="row">{
           row.HUID  }</TableCell>
             <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))}      
   {
   products?.map(item => (item?.addorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.HUID  }</TableCell>
           <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
   {
   products?.map(item => (item?.orderPercent?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.huid  }</TableCell>
           <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
          
   {
   products?.map(item => (item?.addorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.huid  }</TableCell>
             <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
   
   {
   products?.map(item => (item?.orderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.huid  }</TableCell>
               <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}

   {
   products?.map(item => (item?.stockaddorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.huid  }</TableCell>
              <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
    
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
             <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{netweight.toFixed(3)+"g"}</TableCell>
            <TableCell style={{ fontWeight: '600' }}>Net Stock WT:</TableCell>
           <TableCell style={{ fontWeight: '600', color: 'red' }}>{roundTo2DecimalPoint(goldstk)+"G"} </TableCell>
            </TableRow>

        </TableBody>
        </Table>
      
      </TableContainer>
      
    </Paper>

    
  
  </Grid>
  <Grid item xs={6}>
    <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
         OLD GOLD PURCHASE
        </Typography>
        <img src="https://img.icons8.com/color/30/000000/gold-bars.png"/>
  </Grid>
  
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {oldgoldcolumns.map((column) => (
                <TableCell
                  key={column.id}
                 //align={column.align}
                  //style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
         {
   searchListsold?.map(item => (item?.oldorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
              <TableCell>{item.hireDate}</TableCell>
              <TableCell >{row.foodItemNames}</TableCell>
              <TableCell >{row.foodItemPrices+"G"}</TableCell>
             
          </TableRow>
   )))}
       

           <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
                 
                <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{netoldgoldweight.toFixed(3)+"g"}</TableCell>
             { /*
               <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
                <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalsoldgoldcash)}</TableCell>*/}
            </TableRow>
     
        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>


    
  </Grid>
  
  
</Grid>
       
     </Box>
      </TabPanel>
      <TabPanel value={valuetabss} index={1}>
        <Box sx={{marginRight:2,marginLeft:2,paddingTop:'7px'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
    <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Silver
        </Typography>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={openEqualizes}
          >
        <img src="https://img.icons8.com/color/30/000000/silver-bars.png"/>
          </IconButton>
      
  </Grid>
  <Grid  xs={6}>
 
    </Grid>
 
</Grid>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                 //align={column.align}
                  //style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
            {
   productsil?.map(item => (item?.orderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
             <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))}
             {/*
   productsil?.map(item => (item?.orderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
                <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))
               */}
         
       <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
       
       <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
        <TableCell style={{ fontWeight: '600' ,color:'red'}}>{Number(silvertotal).toFixed(3)+"g"}</TableCell>
            <TableCell style={{ fontWeight: '600' }}>Net Stock WT:</TableCell>
<TableCell style={{ fontWeight: '600', color: 'red' }}>{roundTo2DecimalPoint(silverstk)+"G"} </TableCell>
            
            </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  
  </Grid>
  <Grid item xs={6}>

     <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Old Silver
        </Typography>
        <img src="https://img.icons8.com/color/30/000000/silver-bars.png"/>
  </Grid>
  
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {oldcolumns.map((column) => (
                <TableCell
                  key={column.id}
                 //align={column.align}
                  //style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
           {
   orderList.map(item => (item?.oldorderDetailsilver?.map((row) => 
   <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemNames}</TableCell>
              <TableCell >{row.foodItemPrices+"G"}</TableCell>
               {/*  <TableCell >{row.rate}</TableCell>
                    <TableCell >{row.tax}</TableCell>
               <TableCell >{row.subtotal}</TableCell> */}
            {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} /> 
                  </TableCell>*/}
          </TableRow>
   )))}
                
       

          
     
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
                
                <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{netoldsilverweight.toFixed(3)+"g"}</TableCell>
             
              {/* <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
                <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalsoldsilvercash)}</TableCell> */}
            </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
    
     
    
  </Grid>
  
  
</Grid>
       
     </Box>
      </TabPanel>
     <TabPanel value={valuetabss} index={2}>
  <Box sx={{marginRight:2,marginLeft:2,paddingTop:'7px'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>

 <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Fancy_Items
        </Typography>
    <img src="https://img.icons8.com/external-others-dmitry-mirolyubov/30/null/external-jewelry-shop-departments-set-3-others-dmitry-mirolyubov.png"/>
  </Grid>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
      
        <DesktopDatePicker
     format="D-M-YYYY"
          label="Select Date"
          value={searchLists}
          onChange={(newValue) => setSearchKeys(newValue.format("D-M-YYYY"))}
        />
      </DemoContainer>
    </LocalizationProvider>
 
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {fancycolumns.map((column) => (
                <TableCell
                  key={column.id} >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
           {
   searchListsilver.map(item => (item?.fancyitems?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
              <TableCell>{item.hireDate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
               </TableRow>
   )))}
                   {
   searchListsilver2.map(item => (item?.fancyitems?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
           row.id  }</TableCell>
              <TableCell>{item.hireDate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
               </TableRow>
   )))}    
           
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
             
                <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{fancytotal.toFixed(3)+"g"}</TableCell>
         
            </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>


  
  </Grid>
  <Grid item xs={6}>

 <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Piece_Items
        </Typography>
        <img src="https://img.icons8.com/color/30/000000/chain.png"/>
  </Grid>
  <Grid  xs={6}>
   
  </Grid>
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {piececolumns.map((column) => (
                <TableCell
                  key={column.id} >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
          {piecesearchList.map((row) => (
             <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
              noId == row.foodItemId ?  <KeyOffTwoToneIcon/> :row.foodItemId  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
                   <TableCell >{row.quantity}</TableCell>
             <TableCell >{row.foodItemPrice}</TableCell>
          
            
              <TableCell >{row.subtotal}</TableCell>
               <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDeletepcs(row.id)}  
                    />
                  </TableCell>
          
            </TableRow>
          ))}
                
           
            
     
<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
                
                <TableCell style={{ fontWeight: '600'}}>Total Piece:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{subtotalspcs+"PCS"}</TableCell>
           
           {/*    <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
                <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalspcscash)}</TableCell> */}
        
            </TableRow>

        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>

    
  </Grid>
  
  
</Grid>
       
     </Box>
     </TabPanel>

      <TabPanel value={valuetabss} index={3}>
  <Box sx={{marginRight:2,marginLeft:2,paddingTop:'7px'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>

 <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          OLD PURCHASES
        </Typography>
    <img src="https://img.icons8.com/external-others-dmitry-mirolyubov/30/null/external-jewelry-shop-departments-set-3-others-dmitry-mirolyubov.png"/>
  </Grid>
  <Grid  xs={6}>
   <TextField
          label="Search by Date"
          variant='standard'
            value={oldpurchasesearchKey}
                    onChange={e => oldpurchasesetSearchKey(e.target.value)}
                    placeholder="Search by Date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayOutlined />
            </InputAdornment>
          ),
        }}
      
      />
   
  </Grid>
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {oldpurchases.map((column) => (
                <TableCell
                  key={column.id}
                 //align={column.align}
                  //style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
          {oldpurchasesearchList.map((row) => (
             <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
              noId == row.foodItemId ?  <KeyOffTwoToneIcon/> :row.foodItemId  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemNames}</TableCell>
             <TableCell >{row.foodItemPrices}</TableCell>
              <TableCell >{row.quantitys}</TableCell>
              <TableCell >{(Number(row.foodItemPrices) - Number(row.quantitys)).toFixed(3)}</TableCell>
      
                  <TableCell >{row.rate}</TableCell>
                      <TableCell >{NumberFormat(Math.round(row.subtotals))}</TableCell>
      <TableCell><DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDeleteoldpurchase(row.id)}/></TableCell>
          

            </TableRow>
          ))}
                
           
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
             
                <TableCell style={{ fontWeight: '600'}}>Weight:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{subtotalsoldpurchase.toFixed(3)+"g"}</TableCell>
          
               <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
           <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalscasholdpurchase)}</TableCell> 
            </TableRow>
        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>


  
  </Grid>
  <Grid item xs={6}>

 <Paper sx={{ width: '100%' }}>
       <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        
      }}
    >
          <Grid container rowSpacing={1} >
  <Grid item xs={6}>
  <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Piece_Items
        </Typography>
        <img src="https://img.icons8.com/color/30/000000/chain.png"/>
  </Grid>
  <Grid  xs={6}>
   <TextField
          label="Search by Date"
          variant='standard'
            value={piecesearchKey}
                    onChange={e => piecesetSearchKey(e.target.value)}
                    placeholder="Search by Date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarTodayOutlined />
            </InputAdornment>
          ),
        }}
      
      />
   
  </Grid>
 
</Grid>
        
     

   
    </Toolbar>
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            
            <TableRow>
              
              {piececolumns.map((column) => (
                <TableCell
                  key={column.id}
                 //align={column.align}
                  //style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
           <TableBody>
           
          {piecesearchList.map((row) => (
             <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell  component="th" scope="row">{
              noId == row.foodItemId ?  <KeyOffTwoToneIcon/> :row.foodItemId  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
                   <TableCell >{row.quantity}</TableCell>
             <TableCell >{row.foodItemPrice}</TableCell>
          
            
              <TableCell >{row.subtotal}</TableCell>
               <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDeletepcs(row.id)}  
                    />
                  </TableCell>
          
            </TableRow>
          ))}
                
           
            
     
<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell component="th" scope="row"> </TableCell>
                
                <TableCell style={{ fontWeight: '600'}}>Total Piece:</TableCell>
              <TableCell style={{ fontWeight: '600' ,color:'red'}}>{subtotalspcs+"PCS"}</TableCell>
           
           {/*    <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
                <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalspcscash)}</TableCell> */}
        
            </TableRow>

        </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>

    
  </Grid>
  
  
</Grid>
       
     </Box>
     </TabPanel>
     
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
                       {/*values.fullName*/}
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
               <Box width='794px' height="800px" className="watermark">
              {/*  <img src={Estimate} height="20%" width="100%" />
             <Box height='50px'>
           
          </Box> */}
       <TableContainer >
       
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          <TableRow>
             
              <TableCell>CUSTOMER INFO</TableCell>
          <TableCell>SALES DATE</TableCell>
           <TableCell>ITEM NAME</TableCell>
           <TableCell>HUID</TableCell>
            <TableCell>GROSS WEIGHT</TableCell>
          </TableRow>
        </TableHead>
      
        <TableBody>
{                                
   searchLists?.map(item => (item?.stockaddorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell  >{item.fullName}</TableCell>
               <TableCell  >{row.HUID  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))}      
   {
   searchLists?.map(item => (item?.addorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell  >{item.fullName}</TableCell>
               <TableCell >{row.HUID  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
          {
   searchListspercentage?.map(item => (item?.stockaddorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
             <TableCell  >{item.fullName}</TableCell>
               <TableCell  >{row.huid  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))}      
   {
   searchListspercentage?.map(item => (item?.addorderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                 <TableCell  >{item.fullName}</TableCell>
               <TableCell >{row.huid}</TableCell>
               <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
    {
   searchListspercentage?.map(item => (item?.orderDetails?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                 <TableCell  >{item.fullName}</TableCell>
               <TableCell >{ row.huid  }</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
             </TableRow>
   )))}      
   {
   searchListspercentage?.map(item => (item?.orderPercent?.map((row) => 
   <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell  >{item.fullName}</TableCell>
               <TableCell  >{row.huid}</TableCell>
              <TableCell>{row.salesdate}</TableCell>
              <TableCell >{row.foodItemName}</TableCell>
              <TableCell >{row.foodItemPrice+"G"}</TableCell>
          </TableRow>
   )))}
    
       
     
  
          
   
        </TableBody>
      </Table>
<Divider/>


      
    <Chip variant="outlined" label={"GOLD:"+Number(netweight).toFixed(3)+"G"} color="primary" />
        &nbsp;&nbsp; <Chip variant="outlined" label={"SILVER:"+Number(savedatasilver).toFixed(3)+"G"} color="success" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"92.5-SILVER:"+Number(savedatasilverfancy).toFixed(3)+"G"} color="error" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_GOLD:"+Number(netoldgoldweight).toFixed(3)+"G"} color="secondary" />
          &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_SILVER:"+Number(netoldsilverweight).toFixed(3)+"G"} color="default" />
         &nbsp;&nbsp;  <Chip variant="outlined" label={"CASH:"+NumberFormat(Number(totalcash))} color="default" />  
   
    
    
    </TableContainer> 


         
              
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
 <Popup
                title="DATE FILTER"
                openPopup={Equalize}
                setOpenPopup={setEqualize}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
          </Popup> 
          <Popup
                title="DATE FILTER"
                openPopup={Equalizes}
                setOpenPopup={setEqualizes}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectsil}
      />
          </Popup> 
    <Notification
        notify={notify}
        setNotify={setNotify} />
        </>
  );
}
