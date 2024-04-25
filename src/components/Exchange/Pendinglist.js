import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
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
import Newfancy from './Newfancy';
import Non_stocksilver from './Non_stocksilver';
import Non_stockfancy from './Non_stockfancy';
import { ConfirmProvider } from "material-ui-confirm";
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
            //color: useTheme().palette.primary.main,
            //backgroundColor: useTheme().palette.primary.light,
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
    table: {
        '& thead th': {
            fontWeight: '600',
           //color: useTheme().palette.primary.main,
            backgroundColor: useTheme().palette.primary.light,
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



export default function Pendinglist(props,initialFValues,initialFValuesold,initialFValuesoldfancy,initialFValuesfancy,initialFValuespiece) {
    const classes = useStyles();

  const [valuetabs, setValuetabs] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };
  
const { values, setValues,ops } = props;
  
    let orderedFoodItems = values.orderDetails;
    let oldorderedFoodItems = values.oldorderDetails;
    let orderedfancyitems = values.cashitems;
    let orderedoldcashitems = values.oldcashitems;
      
    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

    

    const removeFoodItemfancy = (index, id) => {
        //debugger;
        let x = { ...values };
        x.cashitems = x.cashitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
 const removeFoodItemoldfancy = (index, id) => {
        //debugger;
        let x = { ...values };
        x.oldcashitems = x.oldcashitems.filter((_, i) => i !== index);
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
                   foodItem.rate = data.rate
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax) : Number((data.foodItemPrice * data.tax ) / 100) * data.rate;
        setValues({...x});
        setIsEditing(false)
        //resetInputField()
      }

      const newkey = 'fancy';
      const updatefancy = (idx) => {
        let x ={...values};
      let foodItem = x.cashitems[idx];
        foodItem.foodItemName = datafancy.foodItemName
           foodItem.foodItemPrice = datafancy.foodItemPrice
          foodItem.subtotal =  datafancy.foodItemPrice  
        setValues({...x});
        setIsEditingfancy(false)
        
      }
 
      const updateoldfancy = (idx) => {
        let x ={...values};
      let foodItem = x.oldcashitems[idx];
        foodItem.foodItemName = dataoldfancy.foodItemName
           foodItem.foodItemPrice = dataoldfancy.foodItemPrice
          foodItem.subtotal =  dataoldfancy.foodItemPrice  
        setValues({...x});
        setIsEditingoldfancy(false)
        
      }
     
      
const oldnewval = 'oldsilver';

     const oldupdate = (idx) => {
        let x ={...values};
      
        let foodItem = x.oldorderDetails[idx];
        foodItem.foodItemNames = dataold.foodItemNames
           foodItem.foodItemPrices = dataold.foodItemPrices
            foodItem.taxs = dataold.foodItem
   foodItem.subtotals =  oldnewval === dataold.type ?  (dataold.foodItemPrices): Number((dataold.foodItemPrices * dataold.taxs ) / 100) * dataold.rate; 
             
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
            setDataoldfancy({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDataold({
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

    initialFValuesfancy = {
        id: '',
       
        foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
      foodItemPrice: '',
      subtotal:0
    }
     initialFValuesoldfancy = {
        id: '',
      foodItemId: '',
         salesdate:Todaysales,
        foodItemName: '',
        
        foodItemPrice: '',
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
        rate:'',
        taxs: '',
        discounts:'',
        subtotals:0
    }
    const [data, setData] = useState(initialFValues)
    const [datafancy, setDatafancy] = useState(initialFValuesfancy)
const [dataoldfancy, setDataoldfancy] = useState(initialFValuesoldfancy)
  const [dataold, setDataold] = useState(initialFValuesold)


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
 function handleoldfancy(e) {
        const newdataoldfancy = { ...dataoldfancy }
        newdataoldfancy[e.target.id] = e.target.value
        setDataoldfancy(newdataoldfancy)
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
 const [currentIdoldfancy, setCurrentIdoldfancy] = useState(0)
const [isEditingoldfancy, setIsEditingoldfancy] = useState(false)
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
         if (currentIdoldfancy != 0) {
            setDataoldfancy({
                ...orderedoldcashitems.find(x => x.id == currentIdoldfancy)
            })
            
        }
         if (currentIdold != 0) {
            setDataold({
                ...oldorderedFoodItems.find(x => x.id == currentIdold)
            })
            
        }
        
    }, [currentId,currentIdold,currentIdfancy,currentIdoldfancy])
 
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

   var resultfancy =  values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
   var resultoldfancy =  values.oldcashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)
  var oldresult = 0
  var oldresults = 0
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)  + Number(resultfancy);
  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + Number(resultoldfancy);          
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


    <IconButton onClick={openListnonstock}>
   <img src="https://img.icons8.com/external-wanicon-flat-wanicon/35/000000/external-necklace-brazilian-carnival-wanicon-flat-wanicon.png"/>

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
             <TableCell>Item Code</TableCell>
            <TableCell>ItemName</TableCell>
            <TableCell>Weight</TableCell>
               <TableCell>Touch</TableCell>
                <TableCell>T.Finess</TableCell>
                <TableCell>Rate</TableCell>
            <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          orderedFoodItems.map((item ,idx) => {
          

          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)           
          result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0))     
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                       <TableCell  component="th" scope="row">{
              noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell>
                                        <TableCell  >
                                         
                                   {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
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
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={data.foodItemPrice} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.foodItemPrice  }</Div>
            }
                                 </>
                                        </TableCell>
                                             <TableCell >
                                           {
                isEditing ===idx ? 
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
           value={data.tax} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.tax }</Div>
            }
                                           
                                        </TableCell>
                                          <TableCell>

                                            { 

      
             isEditing ===idx ? newval === data.type ?  0 : ((data.foodItemPrice * data.tax ) / 100).toFixed(3)
             :    <Div > {((item.foodItemPrice * item.tax ) / 100).toFixed(3) }</Div>
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
                              
 { 

      
             isEditing ===idx ? newval === data.type ?  Math.round((data.foodItemPrice * data.rate) + Number(data.tax)) : Math.round(Number((data.foodItemPrice * data.tax ) / 100) * data.rate)
             :   <Div > { Math.round(item.subtotal)}</Div>
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
               orderedfancyitems.map((dataafancy,idx) => (
                 //orderedoldcashitems
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                        <TableCell >
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
                                        
                              
          
                 <TableCell > <Div >-</Div> </TableCell>
                            
            <TableCell>  -   </TableCell>
                <TableCell>-</TableCell>
                   <TableCell>
                { 

      
             isEditingfancy ===idx ?  Math.round( (Number(datafancy.foodItemPrice)) ) 
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
              
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={5}>Subtotal</TableCell>
           <TableCell ><Typography  display="block"  style={{color:'green'}}>
 {
 NumberFormat(Number(Math.round(newitem)))
 //NumberFormat((Math.round(Math.round(newitem) * (Number(values.cgst) + Number(values.sgst)) / 100 ) + Math.round((Number(values.cgst) + Number(values.sgst)) + newitem)))

 }
      </Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>OldItems</TableCell>
            <TableCell > <Typography  display="block"  style={{color:'red'}}>
 {NumberFormat(Number(Math.round(news)).toFixed(2))}
      </Typography></TableCell>
            
          </TableRow>
          <TableRow>
               <TableCell colSpan={5}>Total</TableCell>
            <TableCell >  <Typography  display="block"  style={{color:'blue'}}>
 {NumberFormat(values.gTotal.toFixed(2)) % 1 === 0
                          ? NumberFormat(values.gTotal.toFixed(2))
                          : NumberFormat(values.gTotal.toFixed(2))}
      </Typography></TableCell>
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
                 
                 <h5>non gold wastage</h5>
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
                title="Cash"
                openPopupitem={nonstockListVisibility}
                setOpenPopupitem={setnonstockListVisibility}>
                 
                <Newfancy
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
   <img src="https://img.icons8.com/color/36/000000/silver-ore.png"/>
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
            <TableCell>ItemName</TableCell>
            <TableCell>Weight</TableCell>
             <TableCell>Touch</TableCell>
              <TableCell>T.Finess</TableCell>
             <TableCell>Rate</TableCell>
             <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
         oldorderedFoodItems.map((item ,idx) => {
          oldresults = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) +  Number(values.oldcashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0));           
          oldresult = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) +  Number(values.oldcashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0));           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                       
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
           inputProps={{ inputMode: 'numeric' }} label="taxs" name="taxs" id="taxs" 
           value={dataold.taxs} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.taxs }</Div>
            }
                                           
                                        </TableCell>
                                        <TableCell>
                                               { 

      
             isEditingold ===idx ? oldnewval === dataold.type ?  0 : ((dataold.foodItemPrices * dataold.taxs ) / 100).toFixed(3)
             :    <Div > {((item.foodItemPrices * item.taxs ) / 100).toFixed(3) }</Div>
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
                                            isEditingold ===idx ? oldnewval === dataold.type ? Math.round(dataold.foodItemPrices  * dataold.rate) : Math.round(Number((dataold.foodItemPrices * dataold.taxs ) / 100) * dataold.rate )         
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
               orderedoldcashitems.map((dataafancy,idx) => (
          
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                 {
                isEditingoldfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataoldfancy.foodItemName} onChange={(e) => handleoldfancy(e)} />
                </form>
                : <Div >{dataafancy.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >-</Div></TableCell>
                                        <TableCell >
                                            <>
{
                isEditingoldfancy === idx ? 
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
                name="foodItemPrice" id="foodItemPrice" value={dataoldfancy.foodItemPrice} onChange={(e) => handleoldfancy(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                 <TableCell > <Div >-</Div> </TableCell>
                            
            <TableCell>  -   </TableCell>
              
                   <TableCell>
                { 

      
             isEditingoldfancy ===idx ?  Math.round( (Number(dataoldfancy.foodItemPrice)) ) 
             :   <Div > {Math.round(dataafancy.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          {
                                             isEditingoldfancy === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updateoldfancy(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdoldfancy(dataafancy.id) 
                                              setIsEditingoldfancy(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemoldfancy(idx, dataafancy.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}
              <TableRow>
            <TableCell rowSpan={3} />
       <TableCell colSpan={2}>NewItem</TableCell>
            <TableCell >
              <Typography  display="block"  style={{color:'green'}}>
 {NumberFormat(Math.round(newitem))}
      </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>SubTotal</TableCell>
            <TableCell >
               <Typography  display="block"  style={{color:'red'}}>
 {NumberFormat(oldresults)}
      </Typography>
            </TableCell>
           
          </TableRow>
          
           
          <TableRow>
            <TableCell colSpan={2} >Total</TableCell>
            <TableCell >
              <Typography display="block"  style={{color:'blue'}}>
{NumberFormat(values.gTotal.toFixed(2)) % 1 === 0
                          ? NumberFormat(values.gTotal.toFixed(2))
                          : NumberFormat(values.gTotal.toFixed(2))}
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
                 
                  <Newfancy
                    {...{
                       setOldsilverListVisibility,
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
           <TableCell>{values.fullName}</TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ></TableCell>
             <TableCell ></TableCell>
            <TableCell >{values.hireDate}</TableCell>
          </TableRow>
           
          <TableRow>
           <TableCell>Item</TableCell>
             <TableCell >Qty</TableCell>
            <TableCell >Weight</TableCell>
            <TableCell >Wastage</TableCell>
             <TableCell >Rate</TableCell>
            <TableCell >Pct</TableCell>
            <TableCell >C.Amount</TableCell>
            <TableCell >D.Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {orderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
           <TableCell >-</TableCell>
            <TableCell >{item.rate}</TableCell>
              <TableCell >{item.tax}</TableCell>
              <TableCell >                              
 { 
             isEditing ===idx ? newval === data.type ? NumberFormat(Math.round((data.foodItemPrice * silrate) + Number(data.tax))) : NumberFormat((data.foodItemPrice * data.quantity * rates) - (data.discount * data.foodItemPrice * data.quantity * rates) / 100 + data.tax * (data.foodItemPrice * data.quantity * rates) / 100 )
             :   NumberFormat(Math.round(item.subtotal))
                                         }</TableCell>
                                           <TableCell >-</TableCell>
            </TableRow>
          ))}
          

          {orderedfancyitems.map((item,idx) => (
            //orderedoldcashitems
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
            </TableRow>
          ))}

         <TableRow>
        <TableCell rowSpan={8} />
            <TableCell colSpan={3}>New_Item</TableCell>
            <TableCell >{NumberFormat(Math.round(newitem))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Old_Item</TableCell>
           
            <TableCell >{NumberFormat('-'+Math.round(oldresult))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Grand_Total</TableCell>
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
