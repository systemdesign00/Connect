import React, { useState, useEffect,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import ButtonGroup from '@mui/material/ButtonGroup';
import { SlCalender } from "react-icons/sl";
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Check from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import TableBody from '@mui/material/TableBody';
import Toolbar from '@mui/material/Toolbar';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import { styled } from '@mui/material/styles';
import TableCell , { tableCellClasses } from '@mui/material/TableCell';
import * as userService from "../../Services/userService";
import TableHead from '@mui/material/TableHead';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import ReactToPrint from 'react-to-print';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DatePicker from '../../hooks/DatePicker';
import {NumberFormat} from '../../Services/NumberFormat';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import DirectionsIcon from '@mui/icons-material/Directions';
import useTable from './useTables';
import { COLORS } from '../../layouts/Colors';
import Popup from '../../layouts/Popup';
import { useDownloadExcel } from 'react-export-table-to-excel';
import Draggable from 'react-draggable';
import jsPDF from "jspdf";
import Estimate from '../../img/estimate.png';
import { red, green ,blue} from '@mui/material/colors';
import Pdf from "react-to-pdf";
import { DateRangePicker } from 'react-date-range';
import Image_placeholder from '../../img/image_placeholder.png'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Printicon from '../../Icons/print.png'
import Pdficon from '../../Icons/pdf.gif'
import axios from 'axios';
import '../../assets/css/material-dashboard.css?v=3.1.0'
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })
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
const useStyles = makeStyles(theme => ({
 roots: {
        minWidth: 0,
        margin: useTheme().spacing(0.2)
    },
root:{
    '& .MuiFormControl-root' :{
        width:'80%',
        margin:useTheme().spacing(1)
      
    }
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
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            //border: 'none'
        }
    }

}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function OrderList(props) {
    const classes = useStyles();
    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;
 const tableRef = useRef();
const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')
//const [data, setData]=useState([]);
const [data, setData]=useState([]);

const [selectedIds, setSelectedIds] = useState([]);
const [deleting, setDeleting] = useState(false);

const [allProducts, setAllProducts] = useState([]);

const [startDate,setStartDate]= useState(new Date());
const [endDate,setEndDate]= useState(new Date());
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
              setData(res.data);
              setAllProducts(res.data);
            })
             .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
     const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();
  const componentRef = useRef();

  useEffect( () => {
      clearTimeout(timerRef.current);
    },[]);

    const handleSelect = (date) =>{
      let filtered = allProducts.filter((product)=>{
        let productDate = new Date(product["hireDate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
      setStartDate(date.selection.startDate);
      setEndDate(date.selection.endDate);
      setData(filtered);
    };
  
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

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
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.GSESTIMATE).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }
    /*   const deleteOrder = id => {
           setConfirmDialog({
               ...confirmDialog,
               isOpen: false
           })
   
   
   
       }*/
const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };
       const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCellsestimate);


const handleSearchcustomer = e => {
    const searchText = e.target.value.toLowerCase();
    setFilterFn({
        fn: items => {
            if (searchText === "")
                return items;
            else {
                const filteredItems = items.filter(x => 
                    x.fullName.toLowerCase().includes(searchText) ||
                    x.city.toLowerCase().includes(searchText) || 
                    x.mobile.toLowerCase().includes(searchText) ||
                    x.status.toLowerCase().includes(searchText)
                );

                // Map through filtered items and apply highlighting
                const highlightedItems = filteredItems.map(item => {
                    return {
                        ...item,
                        fullName: highlightText(item.fullName, searchText),
                        city: highlightText(item.city, searchText),
                        mobile: highlightText(item.mobile, searchText),
                          status: highlightText(item.status, searchText)
                    };
                });

                return highlightedItems;
            }
        }
    });
};

const highlightText = (text, searchText) => {
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.split(regex).map((part, index) => {
        return part.match(regex) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part;
    });
};

const generateNewId = () => {
  // Implement your logic to generate a new ID
  // You can use a library like uuid or generate it based on your requirements
  // For simplicity, we're using a random number here
  return Math.floor(Math.random() * 1000);
};
const [deletedData, setDeletedData] = useState(null);
const [responseMessage, setResponseMessage] = useState(null);
const onDelete = async (id) => {
  setConfirmDialog({
      ...confirmDialog,
      isOpen: false
   })
  
 createAPIEndpoint(ENDPIONTS.GSESTIMATE).delete(id)
             .then(res => {
             fetchAlled();
             resetFormControls();
             })
             .catch(
                 //errorsound.play(),
             // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
             setNotify({ isOpen: true, message: 'Deleted successfully.' }));

    const itemIndex = data.findIndex((item) => item.id === id);
          const currentDate = new Date();
       const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
            if (itemIndex !== -1) {
               const newId = generateNewId();
               //const deletedItem = data[itemIndex];
               const deletedItem = {
                ...data.find(item => item.id === id),
                id: newId,
                 hireDate: formattedDate,
              };
               const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
               setData(updatedData);
               setDeletedData(deletedItem);
               fetchAlled();
               try {
                const response =  axios.post('https://serdb.onrender.com/api/DelEstimatebill', deletedItem);
                 //const apiUrl = 'https://serdb.onrender.com/api/DelEstimatebill'; // Replace with your API endpoint
                 
         
                 if (response.ok) {
                   const responseData = await response.json();
                   fetchAlled();
                   setResponseMessage(responseData.message);
                 } else {
                   const errorData = await response.json();
                   setResponseMessage(`Error: ${errorData.message}`);
                 }
               } catch (error) {
                 console.error('Error posting deleted data to API:', error);
                 setResponseMessage('Error posting deleted data to API');
               }
              
             }
 
}

  
    /*
       const deleteOrder = id => {
           if (window.confirm('Are you sure to delete this record?')) {
               createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                   .then(res => {
                       setOrderListVisibility(false);
                       setOrderId(0);
                       resetFormControls();
                       setNotify({ isOpen: true, message: 'Deleted successfully.' });
                   })
                   .catch(err => console.log(err))
           }
       }*/
  let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
       
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3')
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

{/*Cash Count */}

let cashcountreceived = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.gCash),0));
let cashcountonline = Number(orderList.reduce((total, currentValue) => total = total + Number(currentValue.onlinecash),0));

let totalcash = Number(cashcountreceived) + Number(cashcountonline)

let netweight = Number(savedatapercent) + Number(savedataadddatawastage) + Number(savedataadd)
let netoldgoldweight = Number(saveoldcalc) 
let netoldsilverweight =  Number(saveoldsilver) 
//const inputTS = Date.parse(input);
//const result = orderList.filter(d=> d.hireDate === isToday);
const edited = "Balance";

const handleDelete = (index,e) => {
      setOrderList(orderList.filter((v, i) => i !== index));
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   

  const [Equalizepg, setEqualizepg] = useState(false);
  const openEqualizepg = () => {
          setEqualizepg(true);
      }
const Todaysales = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
 

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: Todaysales,
        sheet: 'Users'
    })
//const ref = React.createRef();
     const reportTemplateRef = useRef(null);
 // values.city = searchSelectedCountry &&searchSelectedCountry.city   
const handleGeneratePdf = () => {
    const doc = new jsPDF({
     unit: 'px',
	format: "a2",
      orientation:"portrait"
    });

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save(Todaysales);
      }
    });
  };
   const [Data,setdata]=useState(userService.initialFValuess)
  const [orderListVisibilityEdit, setOrderListVisibilityEdit] = useState(false);
  const openListOfOrdersEdit = () => {
        setOrderListVisibilityEdit(true);
    }
  const EditOrRemove=(item)=>{
    setdata(item);
   handleClickOpen()
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
   var resultpcs = 0
  var resultpcs = Data?.pieceitems?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  Data?.watageitems?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    var resultadd =  Data?.addorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
       var stockresultadd =  Data?.stockaddorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  Number(Data?.fancyitems?.reduce((total, currentValue) => total = total + Number(currentValue.subtotal),0));
  var result = 0
  var resultpcss = 0
  var results = Data?.orderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0
  var oldresultsilver = 0
  var addpercent = Data?.orderPercent?.reduce((total, currentValue) => total = total + currentValue.subtotal,0)
  var newitem = Data?.orderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultfancy) + resultpcs + Number(resultadd) + Number(stockresultadd) + Number(addpercent);
  var oldsilver = Data?.oldorderDetailsilver?.reduce((total, currentValue) => total = total + currentValue.subtotals,0)  
  var news = Data?.oldorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + Number(oldsilver)          
    
  
  useEffect(() => {
    // Fetch data from the API
    axios.get('https://serdb.onrender.com/api/Gsestimate')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const [showDeleteButton, setShowDeleteButton] = useState(true)
  const handleCheckboxChange = (id) => {
     const isSelected = selectedIds.includes(id);
    // Update the visibility of the delete button
    setShowDeleteButton(isSelected);
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (id) => {
     const isSelected = selectedIds.includes(id);
    // Update the visibility of the delete button
    setShowDeleteButton(isSelected);
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < datas().length) {
      setSelectedIds(datas().map(item => item.id));
    } else {
      setShowDeleteButton(!isSelected);
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    // Start the deletion process
    setDeleting(true);
  };

  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;

    if (deleting) {
      intervalId = setInterval(() => {
        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeleting(false);
          clearInterval(intervalId);
        } else {
          // Delete the first selected item from the API
          const idToDelete = selectedIds[0];

          axios.delete(`https://serdb.onrender.com/api/Gsestimate/${idToDelete}`)
            .then(response => {
              console.log('Deletion successful:', response.data);
              // Update the local data state after deletion
              setData(datas().filter(item => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch(error => console.error('Error deleting data:', error));

        const itemIndex = data.findIndex((item) => item.id === idToDelete);
          const currentDate = new Date();
       const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
            if (itemIndex !== -1) {
               const newId = generateNewId();
               //const deletedItem = data[itemIndex];
               const deletedItem = {
                ...data.find(item => item.id === idToDelete),
                id: newId,
                 hireDate: formattedDate,
              };
              const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
              setData(updatedData);
              setDeletedData(deletedItem);
              fetchAlled();
              try {
                const response =  axios.post('https://serdb.onrender.com/api/DelEstimatebill', deletedItem);
              /*  const apiUrl = 'https://serdb.onrender.com/api/DelEstimatebill'; // Replace with your API endpoint
                const response =  fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(deletedItem),
                  
                }
                );*/
        
                if (response.ok) {
                  const responseData =  response.json();
                  fetchAlled();
                  setResponseMessage(responseData.message);
                } else {
                  const errorData =  response.json();
                  setResponseMessage(`Error: ${errorData.message}`);
                }
              } catch (error) {
                console.error('Error posting deleted data to API:', error);
                setResponseMessage('Error posting deleted data to API');
              }
             
            }
        }
      }, 1000); // Interval duration in milliseconds (adjust as needed)
    }

    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deleting, selectedIds, datas()]);


return (
        <>
  
        {/* <Chip variant="outlined" label={"GOLD:"+Number(netweight).toFixed(3)} color="primary" />
        &nbsp;&nbsp; <Chip variant="outlined" label={"SILVER:"+Number(savedatasilver).toFixed(3)} color="success" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"92.5-SILVER:"+Number(savedatasilverfancy).toFixed(3)} color="error" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_GOLD:"+Number(netoldgoldweight).toFixed(3)} color="secondary" />
          &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_SILVER:"+Number(netoldsilverweight).toFixed(3)} color="default" />
    &nbsp;&nbsp;  <Chip variant="outlined" label={"CASH:"+NumberFormat(Number(totalcash))} color="default" />  */ }
       
       
      <Container component={Paper}>    
      <div >
      <div >
        <div>
          <div class="card-header p-0 position-relative mt-n2 mx-1 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">LIST OF INVOICE</h6>
            </div>
          </div>
          <Toolbar>
        <div>
          {/* Input field */}
          {showDeleteButton && (

          
  <Grid item xs={8}>
<FormControl  sx={{ m: 3 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search Customer</InputLabel>
          <OutlinedInput
          sx={{width:'200%'}}
            id="outlined-adornment-amount"
            onChange={handleSearchcustomer}
            startAdornment={<InputAdornment position="start"><SlCalender onClick={openEqualizepg} color='info' /></InputAdornment>}
         label="Search Customer"
          />
</FormControl>
  </Grid>
 
  





            
          )}
          {/* Delete button */}
          {!showDeleteButton && (
            <Button onClick={handleDeleteSelected} variant="contained" color="secondary" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Selected'}
            </Button>
          )}
        </div>
      </Toolbar>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" > <Checkbox {...label} onClick={handleSelectAll} disabled={deleting} />  </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" 
                    onClick={() => handleSort('fullName')}>author  </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    onClick={() => handleSort('city')}>city/town</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    onClick={() => handleSort('mobile')}>contact</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" 
                    onClick={() => handleSort('hireDate')}>date</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                   onClick={() => handleSort('status')} >status</th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                    {
                            datas().map(item => (
<tr class="hover-effect"> <td class="hover-effect">
                      <div class="d-flex px-2 py-1">
                        <div>
                          <Checkbox {...label}  size="small" 
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}/>
                        </div>
                        
                      
                      </div>
                    </td>
                    <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="https://img.icons8.com/fluency/48/user-male-circle--v1.png" class="avatar avatar-sm me-3 border-radius-lg" />
                        </div>
                    
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-xl">{item.fullName}</h6>
                          <p class="text-xs text-secondary mb-0">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <h6 class="text-xl font-weight-bold mb-0 ">{item.city}</h6>
                      <h6 class="text-xl font-weight-bold mb-1"></h6>
                    </td>
                     <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <h6 class="text-xl font-weight-bold mb-2"></h6>
                      <h6 class="text-xl font-weight-bold mb-2">{item.mobile}</h6>
                    </td>
                    <td class="align-middle text-center text-sm" class="hover-effect"  class="cell-with-space"
                    onClick={e => showForUpdate(item.id)}>
                      
                     {
             new Date().toLocaleDateString() == new Date(item.hireDate).toLocaleDateString() ? 
                      <span class="badge badge-sm bg-gradient-danger">{
                        new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
                      }</span> :
                         <span class="badge badge-sm bg-gradient-secondary">{
                          new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
                         }</span>
                     }
                    </td>
                 <td class="align-middle text-center hover-effect" onClick={e => showForUpdate(item.id)}>
  {

    (edited === "Balance" && item.status === "Balance") ?
      <span class="badge badge-sm bg-gradient-warning">{item.status}</span> :
      <span class="badge badge-sm bg-gradient-success">{item.status}</span>
  }
</td>

  <td class="align-middle" class="cell-with-space">
{

    (edited === "Balance" && item.status === "Balance") ?
    <ButtonGroup size="small" aria-label="small button group">
      </ButtonGroup> :
       <ButtonGroup size="small" aria-label="small button group">
        <>
          <Button color="secondary" variant="contained">
         <DeleteOutlineTwoToneIcon
                                      
                                      //onClick={() => {onDelete(item.id)
                                     // audio.play();
                                      //}} 
                                          onClick={() => {
                                       //deleteOrder(item.id)
                                        audio.play();
                                               setConfirmDialog({
                                                  isOpen: true,
                                                    //avatarimage:item.imageSrc,
                                                   title: 'Are you sure to delete this record?',
                                                  subTitle: "You can't undo this operation",
                                                  onConfirm: () => { onDelete(item.id) }
                                               })
                                           }}
                                            />
         </Button>
&nbsp;
          <Button color="success" variant="contained"
       onClick={() => EditOrRemove(item)}>
         <OpenInNewOffOutlinedIcon  fontSize="small"  onClick={() => EditOrRemove(item)}/>
         </Button>
        </>
      </ButtonGroup>
    
  }
    </td>
                    
                  </tr>
                            ))}
                  
                
                 
                 
                  
                  
                </tbody>
              </table>
               <TblPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>    
 
            
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            

            <Popup
                title="DATE FILTER"
                openPopup={Equalizepg}
                setOpenPopup={setEqualizepg}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
            </Popup>

           <Dialog
        maxWidth={50}
        onBackdropClick="false"
        open={open}
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        PaperComponent={PaperComponent}
        aria-describedby="alert-dialog-description">
         <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6"  style={{ flexGrow: 0.97}}>
                     {Data.fullName}
                    </Typography>
                    <Button className={`${classes.rootbutton}`}
              color="error"
              variant="outlined"
              style={{ backgroundColor: 'error' }}
              onClick={handleClickQuery}
            >
              {query !== 'idle'}
             <Pdf targetRef={componentRef} filename={"EstimateReport.pdf"}>
                        {({ toPdf }) => <img src={Pdficon} height={35}  onClick={toPdf}/>}
                      </Pdf>
            </Button>
            &nbsp;
                     <Button className={`${classes.rootbutton}`}
                        color="info"
                        style={{  backgroundColor: 'lightblue'}} 
                        onClick={handleClickQuery}
                        >
                            {query !== 'idle' }
                        <ReactToPrint
                        trigger={() =><img src={Printicon} height={35}  />}
                        content={() => componentRef.current}/>
                    </Button>
                    &nbsp;
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
    <img src={Estimate} height="30%" width="100%" /> 
          {/*<Box height='50px'>

          </Box>*/}
          <TableContainer>
             <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
                  <TableHead>
                      <TableRow>
                          <TableCell></TableCell>
                          <TableCell>{Data.fullName}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{Data.mobile}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{Data.city}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                             {
                  new Date(Data.hireDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
                 }
                          </TableCell>
                      </TableRow>
                  </TableHead>
              </Table>
             <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
                  <TableHead>
                      <TableRow>
                          <TableCell sx={{ color: 'blue' }}>Item</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Qty</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Weight</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Wastage</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>+Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Debit</TableCell>
                           <TableCell > <TableCell></TableCell>
  <TableCell></TableCell></TableCell>
                          <TableCell sx={{ color: 'blue' }}>Net Balance</TableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>

                      {Data?.orderPercent?.map((item, idx) => (
                          //totalweigth = Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.tax+"%"}</TableCell>

                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </TableRow>
                      ))}
                       {Data?.stockaddorderDetails?.map((item, idx) => (
                         // wastageweight = Number(ordereditems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>

                              <TableCell>-</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.tax}</TableCell>
                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </TableRow>
                      ))}
                      {Data?.addorderDetails?.map((item, idx) => (
                         // wastageweight = Number(ordereditems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>

                              <TableCell>-</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.tax}</TableCell>
                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </TableRow>
                      ))}
                      {Data?.watageitems?.map((item, idx) => (
                          //totalweigthpercent = Number(orderedFoodItemspercent.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                      <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>
                              <TableCell>{ item.tax }</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>
                              { NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </TableRow>
                      ))}
                      {Data?.orderDetails?.map((item, idx) => (
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                                 <TableCell>{item.foodItemPrice}g</TableCell>
                              <TableCell>-</TableCell>
                                <TableCell>{item.rate}</TableCell>
                           

                               <TableCell>{item.tax}</TableCell>
                              <TableCell>{NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                          </TableRow>
                      ))}
                       {Data?.fancyitems?.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                  <TableCell >{item.quantity}</TableCell>
              <TableCell>{item.foodItemPrice}g</TableCell>
              <TableCell >-</TableCell>
               <TableCell >{item.rate}</TableCell>
                  <TableCell >-</TableCell>

                      
              <TableCell >   
                 { 
NumberFormat(Math.round(item.subtotal))
                                         }                           
</TableCell>
            <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          ))}
          {Data?.pieceitems?.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
                    <TableCell >-</TableCell>
                     <TableCell >-</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
               
               <TableCell >-</TableCell>
               <TableCell >{NumberFormat(Math.round(item.subtotal)) }</TableCell>
               <TableCell ></TableCell>
                <TableCell ></TableCell>
            </TableRow>
          ))}
                      


                     
   </TableBody>
              </Table>
          <Divider/>


     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
       
        <TableBody>
          
              <TableRow >
               
  <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}> <TableCell/></TableCell>
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
  }}>Net Value:</TableCell>
                
              <TableCell sx={{
    color: 'green',
    fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem))}</TableCell>
          <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell>
    <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell>
    <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell>
    <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell>
    <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}></TableCell>
  
            </TableRow>

              <TableRow >
              
          <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}>
   <TableCell/>
  <TableCell/>

  </TableCell>
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

  }}></TableCell>
                
   <TableCell  sx={{color: 'black',
fontWeight: "600"
  }}></TableCell>  
 </TableRow>
           
        </TableBody>
       
      </Table>
 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Sales Adjustment
      </Typography>
       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
                  <TableHead>
                      <TableRow>
                          <TableCell sx={{ color: 'blue' }}>Item</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Qty</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Weight</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Wastage</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Rate</TableCell>
                         <TableCell sx={{ color: 'blue' }}></TableCell>
                          <TableCell sx={{ color: 'blue' }}>
                            <TableCell/>
                             <TableCell/>
                          </TableCell>
                          <TableCell sx={{ color: 'blue' }}>Credit</TableCell>
                          <TableCell > <TableCell></TableCell>
  <TableCell></TableCell></TableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>
 {Data?.oldorderDetails?.map((item, idx) => (
                      <TableRow key={item.id}>
                              <TableCell>{item.foodItemNames}</TableCell>
                               <TableCell>-</TableCell>
                              <TableCell>{item.foodItemPrices}g</TableCell>
                               <TableCell>{item.quantitys}</TableCell>
                             <TableCell>{item.rate}</TableCell>
                                 <TableCell></TableCell>
                                    <TableCell></TableCell>
                              <TableCell> { NumberFormat(Math.round(item.subtotals))}</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
 {Data?.oldorderDetailsilver?.map((item, idx) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.foodItemNames}</TableCell>
                               <TableCell>-</TableCell>
                              <TableCell>{item.foodItemPrices}g</TableCell>
                               <TableCell>{item.quantitys}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                                 <TableCell></TableCell>
                                    <TableCell></TableCell>
                              <TableCell>{ NumberFormat(Math.round(item.subtotals))}</TableCell>
                            <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                       </TableBody>
              </Table>
          

          <Divider/>


     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
       
        <TableBody>
       
  
        <TableRow >
               
               <TableCell sx={{color: 'blue',
             fontWeight: "600"
               }}> </TableCell>
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
               }}> <img width="25" height="25" src="https://img.icons8.com/wired/64/cash.png" alt="cash"/></TableCell>
                             
                           <TableCell sx={{
                 color: 'black',
                 fontWeight: "600"
               }} > {NumberFormat(Math.round(newitem))}</TableCell>
                       <TableCell sx={{
                 
             color: 'black',
             fontWeight: "600"
               }}></TableCell> 
             
               <TableCell sx={{
                 
             color: 'black',
             fontWeight: "600"
               }}></TableCell>
                         </TableRow> 
                         <TableRow >
               
               <TableCell sx={{color: 'blue',
             fontWeight: "600"
               }}> </TableCell>
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
               }}> <img width="25" height="25" src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/100/external-tax-basic-ui-elements-2.2-sbts2018-outline-color-sbts2018.png" alt="external-tax-basic-ui-elements-2.2-sbts2018-outline-color-sbts2018"/></TableCell>
                             
                           <TableCell sx={{
                 color: 'black',
                 fontWeight: "600"
               }} >    {NumberFormat(Number(newitem*3)/100)}</TableCell>
                       <TableCell sx={{
                 
             color: 'black',
             fontWeight: "600"
               }}></TableCell> 
             
               <TableCell sx={{
                 
             color: 'black',
             fontWeight: "600"
               }}></TableCell>
                         </TableRow> 
              <TableRow >
               
  <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}> {"Cash :" +NumberFormat((Number(Data.gCash)))}</TableCell>
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
  }}>Net Value</TableCell>
                
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem)+Number(newitem*3)/100)}</TableCell>
          <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Math.round(news))}</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Data.gTotal )}</TableCell>
            </TableRow>

              <TableRow >
              
          <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}>
    {"Online :"+ NumberFormat(Number(Data.onlinecash))}
  
  </TableCell>
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

  }}>Net Cash</TableCell>
                
              
           {
           
  Math.sign((Data.gTotal - (Number(Data.gCash) + Number(Data.onlinecash)) + (Number(Data.debitcash)) )) === -1 ? 
          <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(Data.debitcash)))}</TableCell> :
            <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(Data.debitcash)))}</TableCell>
  
}

    
               
            {
  Math.sign((Data.gTotal - (Number(Data.gCash) + Number(Data.onlinecash)) + (Number(Data.debitcash)) )) === 1 ? 
          <TableCell   sx={{color: 'red',
fontWeight: "600"
  }}>
    {NumberFormat((Number(Data.gCash) + Number(Data.onlinecash))  )}

  </TableCell>
   :
            <TableCell  sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(Data.gCash) + Number(Data.onlinecash))  )}</TableCell>
}

<TableCell  sx={{color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Data.gTotal - (Number(Data.gCash) + Number(Data.onlinecash)) + (Number(Data.debitcash)) )}</TableCell>  
 </TableRow>
           
        </TableBody>
       
      </Table>
 </TableContainer>
 </Box>

 </DialogContentText>
     </DialogContent>
  </Dialog>


  
        </>
    )
}
