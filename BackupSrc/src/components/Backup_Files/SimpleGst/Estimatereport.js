import React, { useState, useEffect,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from '../../api'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{ tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import TableHead from '@mui/material/TableHead';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import DatePicker from '../../hooks/DatePicker';
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

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
  const handleChangetabss = (event, newValue) => {
    setValuetabss(newValue);
  };


    const [orderList, setOrderList] = useState([]);
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

 const [value, setValue] = React.useState(null);
  
  //orderList.map(item => (item.watageitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
  console.log(value)
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GSESTIMATE).salesprimaryfetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))

          { /* createAPIEndpoint(ENDPIONTS.SALESPCSITEMS).salespcsfetchAll()
            .then(res => {
              
                setOrderListpcs(res.data)
            })
            .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.SALESFANCYITEMS).salesfancyfetchAll()
            .then(res => {
              
                setOrderListfancy(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.SALESOLDGOLDREPORT).salesoldgoldprimaryfetchAll()
            .then(res => {
              
                setOrderListoldgold(res.data)
            })
            .catch(err => console.log(err))
            
            createAPIEndpoint(ENDPIONTS.SALESREPORTSILVER).salessilverprimaryfetchAll()
            .then(res => {
              
                setOrderListsilver(res.data)
            })
            .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.SALESOLDSILVERREPORTSILVER).salesoldsilverprimaryfetchAll()
            .then(res => {
              
                setOrderListoldsilver(res.data)
            })
            .catch(err => console.log(err))
                createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASEREPORT).salesoldsilverprimaryfetchAll()
            .then(res => {
              
                setOrderListoldpurchase(res.data)
            })
          .catch(err => console.log(err)) */}
    }, [])
 
    useEffect(() => {
       createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
             
                goldsetSearchList(res.data);
            })
            .catch(err => console.log(err))
{/*
            createAPIEndpoint(ENDPIONTS.SALESFANCYITEMS).fetchAll()
            .then(res => {
             
                fancysetSearchList(res.data);
            })
            createAPIEndpoint(ENDPIONTS.SALESPCSITEMS).fetchAll()
            .then(res => {
             
                piecesetSearchList(res.data);
            })
            .catch(err => console.log(err))
            .catch(err => console.log(err))

        createAPIEndpoint(ENDPIONTS.GSTSALESREPORTSILVER).fetchAll()
            .then(res => {
             
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.SALESOLDSILVERREPORTSILVER).fetchAll()
            .then(res => {
             
                setoldSearchList(res.data);
            })
            .catch(err => console.log(err))
             createAPIEndpoint(ENDPIONTS.SALESOLDGOLDREPORT).fetchAll()
            .then(res => {
             
                oldgoldsetSearchList(res.data);
            })
            .catch(err => console.log(err))
 createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASEREPORT).salesoldsilverprimaryfetchAll()
            .then(res => {
              
                setOrderListoldpurchase(res.data)
            })
          .catch(err => console.log(err)) */}
    }, [])
    
     {/*
      useEffect(() => {
        let x = [...orderListsilver];
        let a = [...orderListoldsilver];
        let c = [...orderList];
        let e = [...orderListoldgold];
        let g = [...orderListfancy];
        let i = [...orderListpcs];
        let j = [...orderListoldpurchase];
        x = x.filter(y => {
            return y.salesdate.toLowerCase().includes(searchKey.toLocaleLowerCase())
         });
         a = a.filter(b => {
            return b.salesdate.toLowerCase().includes(oldsearchKey.toLocaleLowerCase())
         });
         c = c.filter(d => {
            return d.salesdate.toLowerCase().includes(goldsearchKey.toLocaleLowerCase())
         });
         e = e.filter(f => {
            return f.salesdate.toLowerCase().includes(oldgoldsearchKey.toLocaleLowerCase())
         });
         g= g.filter(h => {
            return h.salesdate.toLowerCase().includes(fancysearchKey.toLocaleLowerCase())
         });
         i= i.filter(l => {
            return l.salesdate.toLowerCase().includes(piecesearchKey.toLocaleLowerCase())
         });
          j= j.filter(m => {
            return m.salesdate.toLowerCase().includes(oldpurchasesearchKey.toLocaleLowerCase())
         });
           oldpurchasesetSearchList(j);
         piecesetSearchList(i);
         fancysetSearchList(g);
         oldgoldsetSearchList(e);
         goldsetSearchList(c);
         setSearchList(x);
     setoldSearchList(a);   
    }, [searchKey,oldsearchKey,goldsearchKey,oldgoldsearchKey,fancysearchKey,piecesearchKey,oldpurchasesearchKey])
  */}


     //const resultgold = orderList.filter(d=> d.salesdate === isToday);
 //const resultsilver = orderListsilver.filter(d=> d.salesdate === valuedate);
  //const resultoldgold = orderListoldgold.filter(d=> d.salesdate === isToday);
  //const resultoldsilver = orderListoldsilver.filter(d=> d.salesdate === isToday); 15-10-2022
  
    const subtotals = goldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrice)
    
  }, 0);
   const subtotalspcs = piecesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.quantity)
    
  }, 0);
    const subtotalssilver = searchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrice)
    
  }, 0);

      const subtotalssfancy = fancysearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrice)
    
  }, 0);
 const subtotalsoldgold = oldgoldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrices)
    
  }, 0);
  const subtotalsoldsilver = oldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrices)
    
  }, 0);
  const subtotalsoldpurchase = oldpurchasesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.foodItemPrices)
    
  }, 0);
  //cash
  const subtotalscash = goldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotal)
    
  }, 0);
   const subtotalspcscash = piecesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotal)
    
  }, 0);
    const subtotalssilvercash = searchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotal)
    
  }, 0);

      const subtotalssfancycash = fancysearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotal)
    
  }, 0);
 const subtotalsoldgoldcash = oldgoldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotals)
    
  }, 0);
  const subtotalsoldsilvercash = oldsearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotals)
    
  }, 0);
    const subtotalscasholdpurchase = oldpurchasesearchList.reduce((prev, curr) => {
   
      return prev + Number(curr.subtotals)
    
  }, 0);
 
  const Fetchuser=()=>{
      createAPIEndpoint(ENDPIONTS.GSTSALESREPORT).salesprimaryfetchAll()
   
    .then(response=>{
      goldsetSearchList(response.data);
    })
  }

   const Fetchuserpcs=()=>{
      createAPIEndpoint(ENDPIONTS.SALESPCSITEMS).salespcsfetchAll()
   
    .then(response=>{
      piecesetSearchList(response.data);
    })
  }
    const Fetchuseroldgold=()=>{
       createAPIEndpoint(ENDPIONTS.SALESOLDGOLDREPORT).salesoldgoldprimaryfetchAll()
            .then(res => {
              
                oldgoldsetSearchList(res.data)
            })
            .catch(err => console.log(err))
  }
  const Fetchusersilver=()=>{
      createAPIEndpoint(ENDPIONTS.GSTSALESREPORTSILVER).salessilverprimaryfetchAll()
   
    .then(response=>{
      setSearchList(response.data);
    })
  }
  const Fetchuseroldsilver=()=>{
      createAPIEndpoint(ENDPIONTS.GSTSALESREPORTSILVER).salesoldsilverprimaryfetchAll()
   
    .then(response=>{
      setoldSearchList(response.data);
    })
  }
  const Fetchuserfancy=()=>{
      createAPIEndpoint(ENDPIONTS.SALESFANCYITEMS).salesfancyfetchAll()
   
    .then(response=>{
      fancysetSearchList(response.data);
    })
  }
   const Fetchuseroldpurchase=()=>{
      createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASEREPORT).salesfancyfetchAll()
   
    .then(response=>{
      fancysetSearchList(response.data);
    })
  }
const noId = 0;
   const onDelete = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.GSTSALESREPORT).salesprimarydelete(id)
                   .then(res => {
                   Fetchuser();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }

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

    const onDeletesilver = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.GSTSALESREPORTSILVER).salessilverprimarydelete(id)
                   .then(res => {
                   Fetchusersilver();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }
    const onDeleteoldgold = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.SALESOLDGOLDREPORT).salesoldgolddelete(id)
                   .then(res => {
                   Fetchuseroldgold();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    } 
      const onDeleteoldsilver = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.SALESOLDSILVERREPORTSILVER).salesoldsilverprimarydelete(id)
                   .then(res => {
                   Fetchuseroldsilver();
               
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    }
    const onDeletefancy = id => {
       // setConfirmDialog(false)
       createAPIEndpoint(ENDPIONTS.SALESFANCYITEMS).salesfancydelete(id)
                   .then(res => {
                   Fetchuserfancy();
               
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
  const adddatapercent =   orderList.map(item => (item.orderPercent.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatapercent.reduce((total,currentValue) => total = total + currentValue,0))
let savedatapercent = adddatapercent.reduce((total,currentValue) => total = total + currentValue,0);

const adddatawastage =   orderList.map(item => (item.watageitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatawastage.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadddatawastage = adddatawastage.reduce((total,currentValue) => total = total + currentValue,0);

const adddataadd =   orderList.map(item => (item.addorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddataadd.reduce((total,currentValue) => total = total + currentValue,0))
let savedataadd = adddataadd.reduce((total,currentValue) => total = total + currentValue,0);

const adddatasilver =   orderList.map(item => (item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilver.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilver = adddatasilver.reduce((total,currentValue) => total = total + currentValue,0);

const adddatasilverfancy =   orderList.map(item => (item.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
console.log(adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0))
let savedatasilverfancy = adddatasilverfancy.reduce((total,currentValue) => total = total + currentValue,0);

{/*OLD CALCULATION */ }
const oldcalgold =   orderList.map(item => (item.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldcalgold.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldcalc = oldcalgold.reduce((total,currentValue) => total = total + currentValue,0);

const oldsilvercalc =   orderList.map(item => (item.oldorderDetailsilver.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0)));
console.log(oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0))
let saveoldsilver = oldsilvercalc.reduce((total,currentValue) => total = total + currentValue,0);

let cashcountreceived = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.gCash),0));
let cashcountonline = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.onlinecash),0));

let netweight = Number(savedatapercent) + Number(savedataadddatawastage) + Number(savedataadd)
let netoldgoldweight = Number(saveoldcalc) 
let netoldsilverweight =  Number(saveoldsilver) 

let totalcash = Number(cashcountreceived) + Number(cashcountonline)


  return (
    <><>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabss} onChange={handleChangetabss} centered>
          <Tab label="Gold Sales Report" {...a11yProps(0)} />
          <Tab label="Silver Sales Report " {...a11yProps(1)} />
          <Tab label="Fancy Sales Report " {...a11yProps(2)} />
          {/* <Tab label="OLD PURCHASES || JOB WORK " {...a11yProps(3)} /> */}
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

                      {orderList?.map(item => (item.orderPercent.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}
                      {orderList?.map(item => (item.addorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}
                      {orderList?.map(item => (item.watageitems.map((row) => <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netweight.toFixed(3) + "g"}</TableCell>

                        {/* <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
      <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalscash)}</TableCell> */}
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

                      {orderList?.map(item => (item.oldorderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldgoldweight.toFixed(3) + "g"}</TableCell>
                        {/*
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
                      <img src="https://img.icons8.com/color/30/000000/silver-bars.png" />
                    </Grid>
                    <Grid xs={6}>
                      <TextField
                        label="Search by Date"
                        variant='standard'
                        value={searchKey}
                        onChange={e => setSearchKey(e.target.value)}
                        placeholder="Search by Date"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarTodayOutlined />
                            </InputAdornment>
                          ),
                        }} />

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

                      {orderList?.map(item => (item.orderDetails.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}

                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{Number(savedatasilver).toFixed(3) + "g"}</TableCell>

                        {/*  <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
       <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalssilvercash)}</TableCell> */}
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

                      {orderList.map(item => (item.oldorderDetailsilver.map((row) => <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemNames}</TableCell>
                        <TableCell>{row.foodItemPrices + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}





                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{netoldsilverweight.toFixed(3) + "g"}</TableCell>

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
                      <img src="https://img.icons8.com/external-others-dmitry-mirolyubov/30/null/external-jewelry-shop-departments-set-3-others-dmitry-mirolyubov.png" />
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

                      {orderList.map(item => (item.fancyitems.map((row) => <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell>{row.salesdate}</TableCell>
                        <TableCell>{row.foodItemName}</TableCell>
                        <TableCell>{row.foodItemPrice + "G"}</TableCell>
                        {/*  <TableCell >{row.rate}</TableCell>
             <TableCell >{row.tax}</TableCell>
        <TableCell >{row.subtotal}</TableCell> */}
                        {/* <TableCell > <DeleteSweepOutlinedIcon  color='error' fontSize="small" onClick={() => onDelete(row.id)} />
              </TableCell>*/}
                      </TableRow>
                      )))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{savedatasilverfancy.toFixed(3) + "g"}</TableCell>
                        {/*
        <TableCell style={{ fontWeight: '600'}}>Cash:</TableCell>
    <TableCell style={{ fontWeight: '600',color:'red'}}>{NumberFormat(subtotalssfancycash)}</TableCell> */}
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
                        }} />

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

                      {piecesearchList.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{noId == row.foodItemId ? <KeyOffTwoToneIcon /> : row.foodItemId}</TableCell>
                          <TableCell>{row.salesdate}</TableCell>
                          <TableCell>{row.foodItemName}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.foodItemPrice}</TableCell>


                          <TableCell>{row.subtotal}</TableCell>
                          <TableCell> <DeleteSweepOutlinedIcon color='error' fontSize="small" onClick={() => onDeletepcs(row.id)} />
                          </TableCell>

                        </TableRow>
                      ))}




                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Total Piece:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{subtotalspcs + "PCS"}</TableCell>

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
                        OLD PURCHASES
                      </Typography>
                      <img src="https://img.icons8.com/external-others-dmitry-mirolyubov/30/null/external-jewelry-shop-departments-set-3-others-dmitry-mirolyubov.png" />
                    </Grid>
                    <Grid xs={6}>
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
                        }} />

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
                          <TableCell component="th" scope="row">{noId == row.foodItemId ? <KeyOffTwoToneIcon /> : row.foodItemId}</TableCell>
                          <TableCell>{row.salesdate}</TableCell>
                          <TableCell>{row.foodItemNames}</TableCell>
                          <TableCell>{row.foodItemPrices}</TableCell>
                          <TableCell>{row.quantitys}</TableCell>
                          <TableCell>{(Number(row.foodItemPrices) - Number(row.quantitys)).toFixed(3)}</TableCell>

                          <TableCell>{row.rate}</TableCell>
                          <TableCell>{NumberFormat(Math.round(row.subtotals))}</TableCell>
                          <TableCell><DeleteSweepOutlinedIcon color='error' fontSize="small" onClick={() => onDeleteoldpurchase(row.id)} /></TableCell>


                        </TableRow>
                      ))}


                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Weight:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{subtotalsoldpurchase.toFixed(3) + "g"}</TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Cash:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{NumberFormat(subtotalscasholdpurchase)}</TableCell>
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
                        }} />

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

                      {piecesearchList.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">{noId == row.foodItemId ? <KeyOffTwoToneIcon /> : row.foodItemId}</TableCell>
                          <TableCell>{row.salesdate}</TableCell>
                          <TableCell>{row.foodItemName}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.foodItemPrice}</TableCell>


                          <TableCell>{row.subtotal}</TableCell>
                          <TableCell> <DeleteSweepOutlinedIcon color='error' fontSize="small" onClick={() => onDeletepcs(row.id)} />
                          </TableCell>

                        </TableRow>
                      ))}




                      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row"> </TableCell>

                        <TableCell style={{ fontWeight: '600' }}>Total Piece:</TableCell>
                        <TableCell style={{ fontWeight: '600', color: 'red' }}>{subtotalspcs + "PCS"}</TableCell>

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
       //onBackdropClick="false"
        open={open}
        hideBackdrop
         onClose={(event, reason) => {
        if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            // Set 'open' to false, however you would do that with your particular code.
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
              {/*values.fullName*/}
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
                      <StyledTableCell>ITEM NAME</StyledTableCell>
                      <StyledTableCell>QUANTITY</StyledTableCell>
                      <StyledTableCell>GROSS WEIGHT</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                
                    {orderList?.map(item => (item.orderPercent.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}
                    {orderList?.map(item => (item.addorderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}
                     
                    {orderList?.map(item => (item.watageitems.map((row) => <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

                    </TableRow>
                    )))}

                  
                    {orderList?.map(item => (item.oldorderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemNames}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{row.foodItemPrices + "G"}</TableCell>

                    </TableRow>
                    )))}
                   
                    {orderList?.map(item => (item.orderDetails.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

               
                    </TableRow>
                    )))}
                
                    {orderList.map(item => (item.oldorderDetailsilver.map((row) => <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemNames}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{row.foodItemPrices + "G"}</TableCell>

                    </TableRow>
                    )))}
                  
                    {orderList.map(item => (item.fancyitems.map((row) => <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell>{row.salesdate}</TableCell>
                      <TableCell>{row.foodItemName}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.foodItemPrice + "G"}</TableCell>

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
              <TableCell align="right">{NumberFormat(Number(totalcash))}</TableCell>
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
