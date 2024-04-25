import React, { useState, useEffect,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from '../../api'
import { roundTo2DecimalPoint,roundTo2DecimalPoints } from "../../utils/index";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined'; 
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
import Pdf from "react-to-pdf";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
const ref = React.createRef();


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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


export default function Estimatereport() {
    const classes = useStyles();
 //const componentRef = useRef();
  
  const [valuetabss, setValuetabss] = React.useState(0);
  let today = new Date();


  const [valuetab, setValuetab] = React.useState(0);

  const handleChangetab = (event, newValue) => {
    setValuetab(newValue);
  };


const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
  const handleChangetabss = (event, newValue) => {
    setValuetabss(newValue);
  };
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
    const [searchKeys, setSearchKeys] = useState(isToday);
    
const [foodItemssilver, setFoodItemssilver] = useState([]);
     const [searchListssilver, setSearchListssilver] = useState([]);
    const [searchKeyssiver, setSearchKeyssilver] = useState(isToday);

    const [foodItemsfancysilver, setFoodItemsfancysilver] = useState([]);
     const [searchListsfancysilver, setSearchListsfancysilver] = useState([]);
    const [searchKeysfancysiver, setSearchKeysfancysilver] = useState(isToday);
    
   const [foodItemspiece, setFoodItemspiece] = useState([]);
     const [searchListspiece, setSearchListspiece] = useState([]);
    const [searchKeyspiece, setSearchKeyspiece] = useState(isToday);
    
    const [foodItemspurchase, setFoodItemspurchase] = useState([]);
     const [searchListspurchase, setSearchListspurchase] = useState([]);
    const [searchKeyspurchase, setSearchKeyspurchase] = useState(isToday);

    const [foodItemspurchasesil, setFoodItemspurchasesil] = useState([]);
     const [searchListspurchasesil, setSearchListspurchasesil] = useState([]);
    const [searchKeyspurchasesil, setSearchKeyspurchasesil] = useState(isToday);

      const [foodItemsp, setFoodItemsp] = useState([]);
     const [searchListsp, setSearchListsp] = useState([]);
    const [searchKeysp, setSearchKeysp] = useState(isToday);

    {/*useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchLists(res.data);

                 setFoodItemssilver(res.data);
                setSearchListssilver(res.data);

                setFoodItemsfancysilver(res.data);
                setSearchListsfancysilver(res.data);

                setFoodItemspiece(res.data);
                setSearchListspiece(res.data);

            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
            .then(res => {
                setFoodItemspurchase(res.data);
                setSearchListspurchase(res.data);
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
                setFoodItemspurchasesil(res.data);
                setSearchListspurchasesil(res.data);
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
                setFoodItemsp(res.data);
                setSearchListsp(res.data);
            })
            .catch(err => console.log(err))
 }, [])
*/}
 
    useEffect(() => {
        let x = [...foodItems];
        let c = [...foodItemssilver];
        let a = [...foodItemsfancysilver];
        let e = [...foodItemspiece];
        let g = [...foodItemspurchase];
         let i = [...foodItemsp];
         let k = [...foodItemspurchasesil];
        x = x.filter(y => {
            return y.hireDate.toLowerCase().includes(searchKeys)
                
        });
         c = c.filter(d => {
            return d.hireDate.toLowerCase().includes(searchKeyssiver)
                
        });
         a = a.filter(b => {
            return b.hireDate.toLowerCase().includes(searchKeysfancysiver)
                
        });
         e = e.filter(f => {
            return f.hireDate.toLowerCase().includes(searchKeyspiece)
                
        });
        g = g.filter(h => {
            return h.hireDate.toLowerCase().includes(searchKeyspurchase)
                
        });
         
        
         i = i.filter(j => {
            return j.hireDate.toLowerCase().includes(searchKeysp)
                
        }); 
        k = k.filter(l => {
          return l.hireDate.toLowerCase().includes(searchKeyspurchasesil)
              
      }); 
        setSearchLists(x);
         setSearchListssilver(c);
           setSearchListsfancysilver(a);
            setSearchListspiece(e);
             setSearchListspurchase(g);
              setSearchListsp(i);
              setSearchListspurchasesil(k);
    }, [searchKeys,searchKeyssiver,searchKeysfancysiver,searchKeyspiece,searchKeyspurchase,searchKeyspurchasesil,searchKeysp])
  
      
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const [productspo, setProductspo] = useState([]);
    const [allProductspo, setAllProductspo] = useState([]);

    const [productspg, setProductspg] = useState([]);
    const [allProductspg, setAllProductspg] = useState([]);

    const [productsps, setProductsps] = useState([]);
    const [allProductsps, setAllProductsps] = useState([]);

    const [productsoldgold, setProductsoldgold] = useState([]);
    const [allProductsoldgold, setAllProductsoldgold] = useState([]);

    const [productsoldsilver, setProductsoldsilver] = useState([]);
    const [allProductsoldsilver, setAllProductsoldsilver] = useState([]);

    const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());
  
    useEffect(()=>{
      createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
              .then(res => {
                setProducts(res.data);
                setAllProducts(res.data);
  
              })
              .catch(err => console.log(err))
              createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
              .then(res => {
                setProductspg(res.data);
                setAllProductspg(res.data);
              })
              .catch(err => console.log(err))
  
              createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
              .then(res => {
                setProductsps(res.data);
                setAllProductsps(res.data);
              })
              .catch(err => console.log(err))
  
              createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
              .then(res => {
                setProductspo(res.data);
                setAllProductspo(res.data);
              })
              .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
              .then(res => {
                setProductsoldgold(res.data);
                setAllProductsoldgold(res.data);
  
              })

              createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).fetchAll()
              .then(res => {
                setProductsoldsilver(res.data);
                setAllProductsoldsilver(res.data);
  
              })
  
    },[])
    const reloadgpurchase = () =>{
      createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
              .then(res => {
                setProducts(res.data);
                setAllProducts(res.data);
  
              })
              .catch(err => console.log(err))
              createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
              .then(res => {
                setProductspg(res.data);
                setAllProductspg(res.data);
              })
              .catch(err => console.log(err))
  
              createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
              .then(res => {
                setProductsps(res.data);
                setAllProductsps(res.data);
              })
              .catch(err => console.log(err))
  
              createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
              .then(res => {
                setProductspo(res.data);
                setAllProductspo(res.data);
              })
              .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
              .then(res => {
                setProductsoldgold(res.data);
                setAllProductsoldgold(res.data);
  
              })

              createAPIEndpoint(ENDPIONTS.OLDSILVERPURCHASE).fetchAll()
              .then(res => {
                setProductsoldsilver(res.data);
                setAllProductsoldsilver(res.data);
  
              })
     }
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
  
    const handleSelectpo = (date) =>{
      let filtered = allProductspo.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProductspo(filtered);
    };

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
    };


    const handleSelectps = (date) =>{
      // let filtered = allProductspg.filter((product) => {item.oldorderDetails.filter((row) =>{
   let filtered = allProductsps.map(product => ({
     ...product,
     orderDetailsilver: product.orderDetailsilver.filter(child => {
       let productDate = new Date(child["salesdate"]);
       return(productDate>= date.selection.startDate &&
         productDate<= date.selection.endDate);
     })
   }))
   .filter(item => item.orderDetailsilver.length > 0)
       setStartDate(date.selection.startDate);
       setEndDate(date.selection.endDate);
       setProductsps(filtered);
     };
 
   {/* const handleSelectps = (date) =>{
      let filtered = allProductsps.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProductsps(filtered);
    };
  */}
    const handleSelectoldgold = (date) =>{
      let filtered = allProductsoldgold.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProductsoldgold(filtered);
    };

    const handleSelectoldsilver = (date) =>{
      let filtered = allProductsoldsilver.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setProductsoldsilver(filtered);
    };
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

 const noId = 0;
  
  const goldcolumns = [
  { id: 'itemcode', label: 'Ventor',minWidth: 100 },
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
    const [Equalizepo, setEqualizepo] = useState(false);
const openEqualizepo = () => {
        setEqualizepo(true);
    }

    const [Equalizepg, setEqualizepg] = useState(false);
    const openEqualizepg = () => {
            setEqualizepg(true);
        }

        const [Equalizeps, setEqualizeps] = useState(false);
        const openEqualizeps = () => {
                setEqualizeps(true);
            }

            const [Equalizegldpur, setEqualizegldpur] = useState(false);
const openEqualizegldpur = () => {
        setEqualizegldpur(true);
    }
    const [Equalizeslvpur, setEqualizeslvpur] = useState(false);
    const openEqualizeslvpur = () => {
            setEqualizeslvpur(true);
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

const componentRef = useRef();
const purchasewt =   productspg.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(purchasewt.reduce((total,currentValue) => total = total + currentValue,0))
let netpurchasewt = purchasewt.reduce((total,currentValue) => total = total + currentValue,0);

const purchasewtsil =   productsps.map(item => (item.orderDetailsilver.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(purchasewtsil.reduce((total,currentValue) => total = total + currentValue,0))
let netpurchaseswt = purchasewtsil.reduce((total,currentValue) => total = total + currentValue,0);

 const newval = 'silver';

{/*const purchasewtp =   searchListsp.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(purchasewtp.reduce((total,currentValue) => total = total + currentValue,0))
let netpurchasewtp = purchasewtp.reduce((total,currentValue) => total = total + currentValue,0); */}

const purchasewtp =   productspo.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(purchasewtp.reduce((total,currentValue) => total = total + currentValue,0))
let netpurchasewtp = purchasewtp.reduce((total,currentValue) => total = total + currentValue,0);

const purchasewtps =   productspo.map(item => (item.orderDetails.reduce((total, currentValue) => total = newval === currentValue.type ? total + Number(currentValue.foodItemPrice) : "",0)));
console.log(purchasewtps.reduce((total,currentValue) => total = total + currentValue,0))
let netpurchasewtps = purchasewtps.reduce((total,currentValue) => total = total + currentValue,0);

  const adddatapercent =   products.map(item => (item.orderPercent.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatapercent.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapercent = adddatapercent.reduce((total,currentValue) => total = total + currentValue,0);

const adddatawastage =   products.map(item => (item.watageitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatawastage.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadddatawastage = adddatawastage.reduce((total,currentValue) => total = total + currentValue,0);

const adddataadd =   products.map(item => (item.addorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataadd.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadd = adddataadd.reduce((total,currentValue) => total = total + currentValue,0);

const pending =   searchListsp.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(pending.reduce((total,currentValue) => total = total + currentValue,0))
let pendingcal = pending.reduce((total,currentValue) => total = total + currentValue,0) - (netpurchasewtps);



const adddataaddper =   products.map(item => (item.stockaddorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataaddper.reduce((total,currentValue) => total = total + currentValue,0))
let savedataaddper = adddataaddper.reduce((total,currentValue) => total = total + currentValue,0);

const adddatasilver =   products.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilver.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilver = adddatasilver.reduce((total,currentValue) => total = total + currentValue,0) + netpurchasewtps;

const adddatasilverfancy =   searchListsfancysilver.map(item => (item.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilverfancy = adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0);

const adddatapiece =   searchListspiece.map(item => (item.pieceitems.reduce((total, currentValue) => total = total + Number(currentValue.quantity),0)));
console.log(adddatapiece.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapiece = adddatapiece.reduce((total,currentValue) => total = total + currentValue,0);

{/*OLD CALCULATION  {searchListsp?.map(item => (item.orderDetails.map((row) => */ }
const oldcalgold =   products.map(item => (item.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldcalgold.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldcalc = oldcalgold.reduce((total,currentValue) => total = total + currentValue,0);

const oldsilvercalc =   searchListssilver.map(item => (item.oldorderDetailsilver.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldsilver = oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0);

//old purchase
const oldcalgoldpurchase =   productsoldgold.map(item => (item.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldcalgoldpurchase.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldcalcpurchase = oldcalgoldpurchase.reduce((total,currentValue) => total = total + currentValue,0);

const oldsilvercalcpurchase =   productsoldsilver.map(item => (item.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldsilvercalcpurchase.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldsilverpurchase = oldsilvercalcpurchase.reduce((total,currentValue) => total = total + currentValue,0);
//let cashcountreceived = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.gCash),0));
//let cashcountonline = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.onlinecash),0));

let netweight = Number(savedatapercent) + Number(savedataadddatawastage) + Number(savedataadd) + Number(savedataaddper) + Number(pendingcal)
let netoldgoldweight = Number(saveoldcalc) 
let netoldsilverweight =  Number(saveoldsilver) 

let netoldgoldpurchase = Number(saveoldcalcpurchase)
let netoldsilverpurchase = Number(saveoldsilverpurchase)

//let totalcash = Number(cashcountreceived) + Number(cashcountonline)
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

console.log(searchKeys)
  var goldstk = displaygoldstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var silverstk = displaysilverstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
  return (
    <><>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabss} onChange={handleChangetabss} centered>
          <Tab label="Gold Sales Report" {...a11yProps(0)} />
          <Tab label="Silver Sales Report " {...a11yProps(1)} />
          <Tab label="Fancy Sales Report " {...a11yProps(2)} />
           <Tab label="AWATING SALES" {...a11yProps(3)} /> 
           <Tab label="PURCHASE" {...a11yProps(4)} /> 
          
        </Tabs>
      </Box>
      <TabPanel value={valuetabss} index={0}>
        <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
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
                        <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
                      </IconButton>
                      
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={handleClickOpen} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <LocalPrintshopOutlinedIcon onClick={handleClickOpen} />
            </Button>
                          
                        </Tooltip>
                      </IconButton>
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map(item =>(item.orderPercent.map((row) => 
         
                 <TableRow  key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}

                   
                      {products.map(item => (item.addorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}
                      {products.map(item => (item.watageitems.map((row) => <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                       <TableCell component="th" scope="row">{row.id}</TableCell>
                       <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        </TableRow>
                      )))}
{/* starts here */}
{products.map(item => (item.stockaddorderDetails.map((row) => <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                       <TableCell component="th" scope="row">{row.id}</TableCell>
               <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        </TableRow>
                      )))}


                     

  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        

                        <TableCell style={{ fontWeight: '600' }}>Net Sales WT:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netweight.toFixed(3) + "G"}</TableCell>
<TableCell style={{ fontWeight: '600' }}>Whole Sales Wt:</TableCell>
           <TableCell style={{ fontWeight: '600', color: 'red' }}>{(Number(netpurchasewtp).toFixed(3) - netpurchasewtps) + "G"} </TableCell>
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Old_Gold
                      </Typography>
                      <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
                    </Grid>

                  </Grid>




                </Toolbar>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table stickyHeader aria-label="sticky table" className={classes.table}>
                    <TableHead>

                      <TableRow>

                        {goldcolumns.map((column) => (
                          <TableCell
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {products?.map(item => (item.oldorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                      
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldgoldweight.toFixed(3) + "g"}</TableCell>
                     
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
        <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
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
                        onClick={openEqualize}
                      >
                      <img src="https://img.icons8.com/color/30/000000/silver-bars.png" />
                      </IconButton>
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
                        </Tooltip>
                      </IconButton>
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
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {products.map(item => (item.orderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
             <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                    
                      </TableRow>
                      )))}

                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       
 <TableCell style={{ fontWeight: '600' }}>Net Sales Wt:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{Number(savedatasilver).toFixed(3) + "G"}</TableCell>
<TableCell style={{ fontWeight: '600' }}>Whole Sales WT:</TableCell>
<TableCell style={{ fontWeight: '600', color: 'red' }}>{ netpurchasewtps + "G"} </TableCell>
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Old Silver
                      </Typography>
                      <img src="https://img.icons8.com/color/30/000000/silver-bars.png" />
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
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {products.map(item => (item.oldorderDetailsilver.map((row) => <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                     
                      </TableRow>
                      )))}





                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldsilverweight.toFixed(3) + "g"}</TableCell>

                       
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
        <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>

              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Fancy_Items
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualize} >
<img src="https://img.icons8.com/external-others-dmitry-mirolyubov/30/null/external-jewelry-shop-departments-set-3-others-dmitry-mirolyubov.png" /> 
                      </IconButton>
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
                        </Tooltip>
                      </IconButton>
                    </Grid>


                  </Grid>




                </Toolbar>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table stickyHeader aria-label="sticky table" className={classes.table}>
                    <TableHead>

                      <TableRow>

                        {fancycolumns.map((column) => (
                          <TableCell
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {products.map(item => (item.fancyitems.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                     
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{savedatasilverfancy.toFixed(3) + "g"}</TableCell>
                   
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Piece_Items
                      </Typography>
                      <img src="https://img.icons8.com/color/30/000000/chain.png" />
                    </Grid>
                    <Grid xs={6}>
                      

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
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

{products.map(item => (item.pieceitems.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{noId == row.foodItemId ? <KeyOffTwoToneIcon /> : row.foodItemId}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.quantity }</TableCell>
                      <TableCell>{row.foodItemPrice}</TableCell>
                       <TableCell>{row.subtotal}</TableCell>
                      </TableRow>
                      )))}

                     




                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Total Piece:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{savedatapiece + "PCS"}</TableCell>

       

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
        <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        AWATING SALES
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualizepo}
                      >
                        <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
                      </IconButton>
                      
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={handleClickOpen} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <LocalPrintshopOutlinedIcon onClick={handleClickOpen} />
            </Button>
                          
                        </Tooltip>
                      </IconButton>
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                     
                    
                    
                      {productspo.map(item => (item.orderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                    <TableCell component="th" scope="row">{item.shopName}</TableCell>
                    <TableCell>{new Date(row["salesdate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}

                     

                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        

                        <TableCell style={{ fontWeight: '600' }}>Gold:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{(Number(netpurchasewtp).toFixed(3) - netpurchasewtps) + "G"}</TableCell>
<TableCell style={{ fontWeight: '600' }}>Silver:</TableCell>
           <TableCell style={{ fontWeight: '600', color: 'red' }}>{Number(netpurchasewtps)  + "G"} </TableCell>
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Old_Gold
                      </Typography>
                      <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
                    </Grid>

                  </Grid>




                </Toolbar>
                <TableContainer sx={{ maxHeight: 470 }}>
                  <Table stickyHeader aria-label="sticky table" className={classes.table}>
                    <TableHead>

                      <TableRow>

                        {goldcolumns.map((column) => (
                          <TableCell
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {searchLists?.map(item => (item.oldorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                      
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldgoldweight.toFixed(3) + "g"}</TableCell>
                     
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>

              </Paper>



            </Grid>


          </Grid>

        </Box>
      </TabPanel>
      <TabPanel value={valuetabss} index={4}>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetab} onChange={handleChangetab} centered aria-label="basic tabs example">
          <Tab label="GOLD PURCHASE" {...a11yProps(0)} />
          <Tab label="SILVER PURCHASE" {...a11yProps(1)} />
        
        </Tabs>
      </Box>
      <CustomTabPanel value={valuetab} index={0}>
      <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                       Gold Purchase
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualizepg}
                      >
                        <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
                      </IconButton>
                      
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={handleClickOpen} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <LocalPrintshopOutlinedIcon onClick={handleClickOpen} />
            </Button>
                        
                        </Tooltip>
                      </IconButton>

                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                     
                    
                    
                      {productspg.map(item => (item.orderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                    <TableCell sx={{ backgroundColor: "#FDE37F"}} component="th" scope="row">{item.ventorName}</TableCell>

                  <TableCell sx={{ backgroundColor: "#FDE37F"}}>{new Date(row["salesdate"]).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ backgroundColor: "#FDE37F"}}>{row.foodItemName}</TableCell>
                        <TableCell sx={{ backgroundColor: "#FDE37F"}}>{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}

                     

                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        

                        <TableCell style={{ fontWeight: '600' }}>Purchase-G:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netpurchasewt.toFixed(3) + "G"}</TableCell>
<TableCell style={{ fontWeight: '600' }}>Purchase-S:</TableCell>
           <TableCell style={{ fontWeight: '600', color: 'red' }}>{netpurchaseswt.toFixed(3) + "G"} </TableCell>
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Old_Gold Purchase
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualizegldpur}
                      >
                           <img src="https://img.icons8.com/color/30/000000/gold-bars.png" />
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {productsoldgold?.map(item => (item.oldorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                      
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldgoldpurchase.toFixed(3) + "g"}</TableCell>
                     
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>

              </Paper>



            </Grid>


          </Grid>

        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={valuetab} index={1}>
      <Box sx={{ marginRight: 2, marginLeft: 2, paddingTop: '7px' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Paper sx={{ width: '100%' }}>
                <Toolbar
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                  }}
                >
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                       Silver Purchase
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualizeps}
                      >
                        <img src="https://img.icons8.com/color/30/000000/silver-bars.png" />
                      </IconButton>
                      
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={handleClickOpen} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <LocalPrintshopOutlinedIcon onClick={handleClickOpen} />
            </Button>
                          
                        </Tooltip>
                      </IconButton>
                      <IconButton color="primary">
                        <Tooltip title="Print" arrow>
                           <Button className={`${classes.rootbutton}`} 
                           onClick={reloadgpurchase} 
              color="info"
              style={{ backgroundColor: 'lightblue' }} >
              <RotateLeftOutlinedIcon onClick={reloadgpurchase} />
            </Button>
                          
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                
{productsps.map(item => (item.orderDetailsilver.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                    <TableCell sx={{ backgroundColor: "#c0c0c0"}} component="th" scope="row">{item.ventorName}</TableCell>
                    <TableCell sx={{ backgroundColor: "#c0c0c0"}}>{new Date(row["salesdate"]).toLocaleDateString()}</TableCell>
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}}>{row.foodItemName}</TableCell>
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}}>{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}
                     

                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        

                        <TableCell style={{ fontWeight: '600' }}>Purchase-G:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netpurchasewt.toFixed(3) + "G"}</TableCell>
<TableCell style={{ fontWeight: '600' }}>Purchase-S:</TableCell>
           <TableCell style={{ fontWeight: '600', color: 'red' }}>{netpurchaseswt.toFixed(3) + "G"} </TableCell>
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
                  <Grid container rowSpacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Old_Silver Purchase
                      </Typography>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={openEqualizeslvpur}
                      >
                            <img src="https://img.icons8.com/color/30/000000/silver-bars.png" />
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
                            key={column.id}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {productsoldsilver?.map(item => (item.oldorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{new Date(item["hireDate"]).toLocaleDateString()}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                      
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldsilverpurchase.toFixed(3) + "g"}</TableCell>
                     
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>

              </Paper>



            </Grid>


          </Grid>

        </Box>
      </CustomTabPanel>
    
    </Box>
        
      </TabPanel>
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
                openPopup={Equalizepo}
                setOpenPopup={setEqualizepo}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectpo}
      />
            </Popup>

            <Popup
                title="DATE FILTER GOLD PURCHASE"
                openPopup={Equalizepg}
                setOpenPopup={setEqualizepg}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectpg}
      />
            </Popup>

            <Popup
                title="DATE FILTER SILVER PURCHASE"
                openPopup={Equalizeps}
                setOpenPopup={setEqualizeps}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectps}
      />
            </Popup>
            <Popup
                title="DATE FILTER"
                openPopup={Equalizegldpur}
                setOpenPopup={setEqualizegldpur}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectoldgold}
      />
      
            </Popup>

            <Popup
                title="DATE FILTER"
                openPopup={Equalizeslvpur}
                setOpenPopup={setEqualizeslvpur}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectoldsilver}
      />
      
            </Popup>
      <Dialog
        maxWidth={50}
       //onBackdropClick="false"
        open={open}
        hideBackdrop
         onClose={(event, reason) => {
        if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
          handleClose()
        }
    }}
        //onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        PaperComponent={PaperComponent}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" style={{ flexGrow: 0.97 }}>
             Sales Report
            </Typography>
            <Button className={`${classes.rootbutton}`}
              color="secondary"
              variant="outlined"
              style={{ backgroundColor: 'secondary' }}
              onClick={handleClickQuery}
            >
              {query !== 'idle'}
             <Pdf targetRef={componentRef} filename={"EstimateReport.pdf"}>
                        {({ toPdf }) => <PictureAsPdfOutlinedIcon onClick={toPdf}/>}
                      </Pdf>
            </Button>
             
            <Button className={`${classes.rootbutton}`}
              color="info"
              style={{ backgroundColor: 'lightblue' }}
              onClick={handleClickQuery}
            >
              {query !== 'idle'}
              <ReactToPrint
                trigger={() => <LocalPrintshopOutlinedIcon />}
                content={() => componentRef.current} />
            </Button>
            <Button className={`${classes.rootbutton}`}
              color="error"
              style={{ backgroundColor: '#ffbfbf' }}
              onClick={handleClose}>
              <CloseOutlined />
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
              <TableContainer>

                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>ITEM ID</StyledTableCell>
                      <StyledTableCell>SALES DATE</StyledTableCell>
                      <StyledTableCell>NAME</StyledTableCell>
                      <StyledTableCell>ITEM NAME</StyledTableCell>
                     <StyledTableCell>GROSS WEIGHT</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                
                    {searchLists?.map(item => (item.orderPercent.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                  
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}
                    {searchLists?.map(item => (item.addorderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                    
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}
                     
                    {searchLists?.map(item => (item.watageitems.map((row) => <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                  
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}

                  
                    {searchLists?.map(item => (item.oldorderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemNames}</TableCell>
                  
                      <TableCell>{row.foodItemPrices + "G"}</TableCell>

                    </TableRow>
                    )))}
                   
                    {searchLists?.map(item => (item.orderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                     
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

               
                    </TableRow>
                    )))}
                
                    {searchLists.map(item => (item.oldorderDetailsilver.map((row) => <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                       <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemNames}</TableCell>
           
                      <TableCell>{row.foodItemPrices + "G"}</TableCell>

                    </TableRow>
                    )))}
                  
                    {searchLists.map(item => (item.fancyitems.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                     
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>
                      </TableRow>
                    )))}
  {searchLists.map(item => (item.pieceitems.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell >{item.fullName}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity+"PCS"}</TableCell>
                
                      </TableRow>
                    )))}

{searchListsp?.map(item => (item.orderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                    <TableCell sx={{ backgroundColor: "#c0c0c0"}}  component="th" scope="row">{row.id}</TableCell>
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}} >{item.hireDate}</TableCell>
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}} >{item.shopName}</TableCell>
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}} >{row.foodItemName}</TableCell>
                      
                        <TableCell sx={{ backgroundColor: "#c0c0c0"}} >{row.foodItemPrice + "G"}</TableCell>
                       </TableRow>
                      )))}
                  </TableBody>
                </Table>
                <Divider />
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Weight</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
             GOLD
              </TableCell>
              <TableCell align="right">{Number(netweight).toFixed(3) + "G"}</TableCell>
               <TableCell component="th" scope="row">
               OLD GOLD
              </TableCell>
              <TableCell align="right">{Number(netoldgoldweight).toFixed(3) + "G"}</TableCell>
              </TableRow>
          
          <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
               SILVER
              </TableCell>
              <TableCell align="right">{Number(savedatasilver).toFixed(3) + "G"}</TableCell>
               <TableCell component="th" scope="row">
               OLD SILVER
              </TableCell>
              <TableCell align="right">{Number(netoldsilverweight).toFixed(3) + "G"}</TableCell>
              </TableRow>
              <TableRow
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
               92.5 STERLING
              </TableCell>
              <TableCell align="right">{Number(savedatasilverfancy).toFixed(3) + "G"}</TableCell>
               <TableCell component="th" scope="row">
               NET CASHFLOW
              </TableCell>
              <TableCell align="right">{/*NumberFormat(Number())*/}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

{/*
 <Chip variant="outlined" label={"GOLD:" + Number(netweight).toFixed(3) + "G"} color="primary" />
&nbsp;&nbsp; <Chip variant="outlined" label={"SILVER:" + Number(savedatasilver).toFixed(3) + "G"} color="success" />
&nbsp;&nbsp;  <Chip variant="outlined" label={"92.5-SILVER:" + Number(savedatasilverfancy).toFixed(3) + "G"} color="error" />
&nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_GOLD:" + Number(netoldgoldweight).toFixed(3) + "G"} color="secondary" />
&nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_SILVER:" + Number(netoldsilverweight).toFixed(3) + "G"} color="default" />
&nbsp;&nbsp;  <Chip variant="outlined" label={"CASH:" + NumberFormat(Number(totalcash))} color="default" />
*/}


              </TableContainer>




            </Box>

          </DialogContentText>

          {/*<ReactToPrint
            trigger={() =>  <IconButton color="info" >
              <LocalPrintshopOutlinedIcon  />
            </IconButton>}
            content={() => componentRef.current}
    /> */}
        </DialogContent>

      </Dialog>

      {/*  <Popup
                 title={goldsearchKey}
                 openPopup={Equalize}
                 setOpenPopup={setEqualize}>
                  
           <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>Item Type</TableCell>
              <TableCell>Item Count</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {findgold(goldsearchList,key).map((row) => (
             <TableRow
               key={row.foodItemName}
             
             >
               <TableCell >
                 {row.foodItemName}
               </TableCell>
               <TableCell >{row.occurrence}</TableCell>
              
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
           </Popup> */}
      <Notification
        notify={notify}
        setNotify={setNotify} />
    </></>
    
  );
}
