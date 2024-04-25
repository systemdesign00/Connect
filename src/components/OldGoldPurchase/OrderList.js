import React, { useState, useEffect ,useRef } from 'react'
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Check from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import Badge from '@mui/material/Badge';
import TableBody from '@mui/material/TableBody';
import sin from '../../img/sj.png'
import { COLORS } from '../../layouts/Colors';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DatePicker from '../../hooks/DatePicker';
import {NumberFormat} from '../../Services/NumberFormat';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import useTable from './useTables';
import * as userService from "../../Services/userService";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Draggable from 'react-draggable';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import Button from '@mui/material/Button';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import DialogContent from '@mui/material/DialogContent';
import ReactToPrint from 'react-to-print';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import { red, green ,blue} from '@mui/material/colors';
import  { tableCellClasses } from '@mui/material/TableCell';
import Pdf from "react-to-pdf";
import Popup from '../../layouts/Popup';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Printimg from '../../Icons/print.png'
import Pdfimg from '../../Icons/pdf.png'
import Closeimg from '../../Icons/close.png'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import axios from 'axios';
import ProgressBar from '../../layouts/Spinner'
const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })

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
recentRow: {
    backgroundColor: '#ffcccb', // or any other color you want for highlighting
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
    table: {
        '& thead th': {
            fontWeight: '600',
           color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
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

const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')
  const [data, setData]=useState([]);

  const [selectedIds, setSelectedIds] = useState([]);
const [deleting, setDeleting] = useState(false);


  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
     const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
            .then(res => {
                setData(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
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
      const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCellsoldgold);

const highlight = (text, e) => {
  let targets = e.target;
  const regex = new RegExp(`(${targets})`, 'gi');
  return text.split(regex).map((part, index) => (
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  ));
};
const handleSearchcustomer = (e) => {
  let target = e.target;
  setFilterFn({
    fn: (items) => {
      if (target.value === "") return items;
      else
        return items
          .filter((x) =>
            x.fullName.toLowerCase().includes(target.value) ||
            x.billNo.toLowerCase().includes(target.value) ||
            x.city.toLowerCase().includes(target.value) ||
            x.mobile.toLowerCase().includes(target.value)
          )
          .map((item) => {
            const highlight = (text) => {
              const lowerCaseText = text.toLowerCase();
              const lowerCaseSearch = target.value.toLowerCase();
              const index = lowerCaseText.indexOf(lowerCaseSearch);

              if (index !== -1) {
                return (
                  <>
                    {text.substring(0, index)}
                    <mark>{text.substring(index, index + target.value.length)}</mark>
                    {text.substring(index + target.value.length)}
                  </>
                );
              } else {
                return text;
              }
            };

            return {
              ...item,
              fullName: highlight(item.fullName),
              billNo: highlight(item.billNo),
              city: highlight(item.city),
              mobile: highlight(item.mobile),
            };
          })
         
    },
  });
};




const [Equalizepg, setEqualizepg] = useState(false);
const openEqualizepg = () => {
        setEqualizepg(true);
    }
       const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();
  const componentRef = useRef();

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   

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

  const [Data,setdata]=useState(userService.initialFValuess)



  
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
  const EditOrRemove=(item)=>{
    setdata(item);
   handleClickOpen()
  }

   var iddate = new Date(Data.hireDate).toLocaleDateString();
  var lastFive = iddate.substr(iddate.length - 4);
    var nextyear = Number(lastFive) + Number(1);
    const [deletedData, setDeletedData] = useState(null);
    const [responseMessage, setResponseMessage] = useState(null);
    const generateNewId = () => {
  // Implement your logic to generate a new ID
  // You can use a library like uuid or generate it based on your requirements
  // For simplicity, we're using a random number here
  return Math.floor(Math.random() * 1000);
};
    

        const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
         })
       createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).delete(id)
                   .then(res => {
                   createAPIEndpoint(ENDPIONTS.OLDGOLDPURCHASE).fetchAll()
            .then(res => {
                setOrderList(res.data)
                
            })
             .catch(err => console.log(err))
                   resetFormControls();
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.' }));

                   const itemIndex = data.findIndex((item) => item.id === id);
  
                
             if (itemIndex !== -1) {
              const newId = generateNewId();
               //const deletedItem = data[itemIndex];
               const deletedItem = {
                ...data.find(item => item.id === id),
                id: newId,
              };
               const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
               setData(updatedData);
               setDeletedData(deletedItem);
               fetchAlled();
                     try {
                      const response =  axios.post('https://serdb.onrender.com/api/Deloldgoldbill', deletedItem);
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
    useEffect(() => {
        let x = [...orderList];
        x = x.filter(y => {
            return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase())
               
        });
        setSearchList(x);
    }, [searchKey])
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

//const inputTS = Date.parse(input);
//const result = orderList.filter(d=> d.hireDate === isToday);
const edited = "Balance";

 // var making = stockaddorderedFoodItems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
   //const making = stockaddorderedFoodItems.map((item,idx) => (item.foodItemPrice))
   let oldcal =  Data?.oldorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
  let totalweigth =  Data?.stockaddorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let totalweigths =  Data?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let netweights =  Number(totalweigth )+ Number(totalweigths)
  const totalpcs = Number(Data?.stockaddorderDetails?.length) + Number( Data?.addorderDetails?.length);
  let totalweigthold = Data?.oldorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0);
  let netweightolds =  Number(totalweigthold)
  const totalpcsold = Number(Data?.oldorderDetails?.length);
  const hallmarkingcal = Number(Data?.stockaddorderDetails?.length * Data.debitcash) + Number( Data?.addorderDetails?.length * Data.debitcash);
const makingcal = Number(Data.gTotal * Data.onlinecash)/100;
let totalgst=  Number(Data.gTotal + makingcal + (Number(hallmarkingcal)))       
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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

useEffect(() => {
  // Fetch data from the API
  axios.get('https://serdb.onrender.com/api/Oldgoldpurchase')
    .then(response => setData(response.data))
    .catch(error => console.error('Error fetching data:', error));
}, []);

const handleCheckboxChange = (id) => {
  // Update the selected IDs array based on checkbox changes
  if (selectedIds.includes(id)) {
    setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
  } else {
    setSelectedIds([...selectedIds, id]);
  }
};

const handleSelectAll = () => {
  // Select all items if not all are already selected, otherwise clear selection
  if (selectedIds.length < data.length) {
    setSelectedIds(data.map(item => item.id));
  } else {
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

        axios.delete(`https://serdb.onrender.com/api/Oldgoldpurchase/${idToDelete}`)
          .then(response => {
            console.log('Deletion successful:', response.data);
            // Update the local data state after deletion
            setData(data.filter(item => item.id !== idToDelete));
            // Remove the deleted item from the selectedIds array
            setSelectedIds(selectedIds.slice(1));
          })
          .catch(error => console.error('Error deleting data:', error));

          const itemIndex = data.findIndex((item) => item.id === idToDelete);

          if (itemIndex !== -1) {
             const newId = generateNewId();
               //const deletedItem = data[itemIndex];
               const deletedItem = {
                ...data.find(item => item.id === idToDelete),
                id: newId,
              };
               const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
               setData(updatedData);
               setDeletedData(deletedItem);
               fetchAlled();
            //const deletedItem = data[itemIndex];
            //const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
            //setData(updatedData);
           // setDeletedData(deletedItem);
           // fetchAlled();
            try {
              const response =  axios.post('https://serdb.onrender.com/api/Deloldgoldbill', deletedItem);
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
          
          <Toolbar
      sx={{
        borderRadius:1.5,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedIds.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedIds.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedIds.length} selected
        </Typography>
      ) : (
       
         <Grid container spacing={2} columns={16}>
  <Grid item xs={8}>
  <FormControl  sx={{ m: 3 }} fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Search Customer</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={handleSearchcustomer}
            startAdornment={<InputAdornment position="start"><SearchIcon color='info' /></InputAdornment>}
         label="Search Customer"
          />
</FormControl>
  </Grid>
  <Grid item xs={8}>
  <FormControl  sx={{ m: 3 }}>
        <IconButton  onClick={openEqualizepg}>
        <img width="48" height="48" src="https://img.icons8.com/fluency/48/calendar.png" alt="calendar"/>
</IconButton>
      


   </FormControl>
  </Grid>
</Grid>
      
      )}

      {selectedIds.length > 0 ? (
        <Tooltip title="Delete">
           {deleting ? <div style={{ marginTop: '10px' }}>
          
          <ProgressBar 
          label="Deleting..."
        trackColor="#333"
        indicatorColor="#f7c"
          size={50}
         progress={25}
         trackWidth={5}
         indicatorWidth={5}
         spinnerMode={true}
        />
      {/* <span>{progress.toFixed(2)}%</span>*/}
     </div>  :   <IconButton>
          <DeleteOutlineTwoToneIcon color='error' onClick={handleDeleteSelected} variant="outlined" disabled={deleting}/>
           </IconButton>}   
           
        
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
         
        </Tooltip>
      )}
    </Toolbar>
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                <TableHead>
                   
          
                   <TableRow>
                   <TableCell padding="checkbox">
                 <Checkbox 
                             checked={selectedIds.length > 0 && selectedIds.length === selectedIds.length}
                        {...label} onClick={handleSelectAll} disabled={deleting}
                        />
   </TableCell>
                     
               <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>REF NO</Box></TableCell>
              <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Customer</Box></TableCell>
               <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>City/Town</Box></TableCell>
               <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Mobile Number</Box></TableCell>
                <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Date</Box></TableCell>
{/*                <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Aadhaar Number</Box></TableCell>*/}
                <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Net Weight</Box></TableCell>
                   <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Grand Total</Box></TableCell>
                   <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Actions</Box></TableCell>
                  
                   </TableRow>
</TableHead> 
                    <TableBody>
                        {
                           datas().sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate)) 
                            .map(item => (
                              
              <TableRow key={item.id} 
              
              className={`${classes.tablerow} ${
        new Date(item.hireDate).toLocaleDateString() ===
        new Date(
          Math.max(
            ...datas().map(data => new Date(data.hireDate).getTime())
          )
        ).toLocaleDateString()
          ? classes.recentRow
          : ''
      }`}
              >
                                   <TableCell>
                                  <Box fontWeight="fontWeightBold" fontSize={15}>
                             <Checkbox {...label}  size="small" 
                                    disabled={deleting}
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}/>
                                              </Box>   
                                  </TableCell>
                                  <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                  {/*      <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                             </Avatar>*/}
                                <Box fontWeight="fontWeightBold" fontSize={15}>
        {item.billNo}{item.id}
      </Box>  
                                    </TableCell>
                                    <TableCell>  <Box fontWeight="fontWeightBold" fontSize={15}>
        {(item.fullName)}
      </Box>  </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                   <Box fontWeight="fontWeightBold" fontSize={15}>
        {item.city}
      </Box>  
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        <Box fontWeight="fontWeightBold" fontSize={15}>
        {item.mobile}
      </Box>  
                                    </TableCell>
                                     {
                new Date().toLocaleDateString() == new Date(item.hireDate).toLocaleDateString() ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={
            <Box fontWeight="fontWeightBold" fontSize={15}>
       {new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
          </Box>  
        } onClick={e => showForUpdate(item.id)} color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell  > 
        {  <Box fontWeight="fontWeightBold" fontSize={15}>
       {new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
          </Box> }
          </TableCell>
      
              }
            {/*  <TableCell>
             
                
        
          <Chip label={ <Box fontWeight="fontWeightBold" fontSize={15}>
        {item.aadhaarnumber}
      </Box>  }  color="success" variant="outlined" 
            icon={<Check fontSize="small" />}/>
      
      
            
            </TableCell>*/}
             <TableCell  > 
  
  <Box fontWeight="fontWeightBold" fontSize={15}>
  {item.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0).toFixed(3)}G
</Box> 
  
        
          </TableCell>
                                    
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                           {
                             <Box fontWeight="fontWeightBold" fontSize={15}>
                             {   NumberFormat(Number(item.amountdebit))}
                           </Box>  
                                        }
                                    </TableCell>
                                    <TableCell>

                                       <ThemeProvider theme={redTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#ffbfbf"}} 
          onClick={() => {
                                              audio.play();
                                              setConfirmDialog({
                                              isOpen: true,
                                                    //avatarimage:item.imageSrc,
                                              title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                  })}}>
         <DeleteOutlineTwoToneIcon
          fontSize="small" color="error"
                                            //onClick={e => deleteOrder(item.id)} 
                                             onClick={() => {
                                              audio.play();
                                              setConfirmDialog({
                                              isOpen: true,
                                                    //avatarimage:item.imageSrc,
                                              title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                  })}}/>
         </Button>
       </ThemeProvider>

        <ThemeProvider theme={greenTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#cdffcd"}} 
       onClick={() => EditOrRemove(item)}>
         <OpenInNewOffOutlinedIcon  fontSize="small"  onClick={() => EditOrRemove(item)}/>
         </Button>
       </ThemeProvider>

                                        

                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
                <TblPagination />
            </TableContainer>
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
        aria-describedby="alert-dialog-description"
      >
         <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6"  style={{ flexGrow: 0.97}}>
                       {Data.fullName}
                    </Typography>
                    <Button className={`${classes.rootbutton}`}
              color="secondary"
              variant="outlined"
              style={{ backgroundColor: 'secondary' }}
              onClick={handleClickQuery}
            >
              {query !== 'idle'}
             <Pdf targetRef={componentRef} filename={`${Data.id}-${Data.fullName}.pdf`}
               options={{ orientation: 'portrait', unit: 'pt', format: [900, 1000] }}
             >
                        {({ toPdf }) => <img src={Pdfimg} height={35} onClick={toPdf}/>}
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
                        trigger={() =><img src={Printimg} height={35}  />}
                        content={() => componentRef.current}/>
                    </Button>
                    &nbsp;
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleClose}>
                   <img src={Closeimg} height={35}/>
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
                 <Box width='900px' className="watermark">
       { /* <Box height='150.5px'> */}
         <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    OLD GOLD INVOICE
      </Typography>
       <img src={sin} height="40%" width="100%"/>
        
      {/* <Grid container spacing={4}>
  <Grid item xs={4}>
  <Grid container spacing={2} columns={15}>
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
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 30 }}>
  <Grid item xs={6}>

                      
                        <Typography variant="subtitle1" gutterBottom>
        Billed To
      </Typography>
     
       <Typography variant="h5" gutterBottom  sx={{fontWeight: 'bold',color:'black',fontStyle: 'italic'}}>
      Name:{Data.fullName}
      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
      City/Town:{Data.city}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Mobile:{Data.mobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
   REF NO :{Data.billNo}{Data.id}
  </Typography>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Date : {new Date(Data.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
  </Typography>
 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     Pan Number : {Data.pannumber}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     Aadhaar Number : {Data.aadhaarnumber}
      </Typography>
   
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >
  {/*    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
            <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
             <TableCell sx={{color: 'blue'}}>HUID</TableCell>
            
            <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>UOM</TableCell>
   
             <TableCell sx={{color: 'blue'}} >Rate</TableCell>
         
               <TableCell sx={{color: 'blue'}}>Total</TableCell>
           </TableRow>
        </TableHead>
      <TableBody>
           {stockaddorderedFoodItems.map((item,idx) => (
            <TableRow key={item.id}>
               <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemName}</StyledTableCell>
                <StyledTableCell >{item.HSN_Code}</StyledTableCell>
                 <StyledTableCell >{item.HUID}</StyledTableCell>
          
              <StyledTableCell >{item.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                      
                <StyledTableCell >{item.rate}</StyledTableCell>
          
          <StyledTableCell > {NumberFormat(Math.round(item.subtotal)) }</StyledTableCell>
           </TableRow>
          ))}

          
          {
            addorderedFoodItems.map((adddataa,idx) => (
            <TableRow key={adddataa.id}>
               <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{adddataa.foodItemName }</StyledTableCell>
                <StyledTableCell >{adddataa.HSN_Code}</StyledTableCell>
                 <StyledTableCell >{adddataa.HUID}</StyledTableCell>
               
              <StyledTableCell >{adddataa.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{adddataa.UOM}</StyledTableCell>
                   
                <StyledTableCell >{adddataa.rate}</StyledTableCell>
               
          <StyledTableCell > {NumberFormat(Math.round(adddataa.subtotal)) }</StyledTableCell>
           </TableRow>
          ))}
       </TableBody>
      </Table> */}

{
   /*    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
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
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.round(values.gTotal))}</TableCell> &nbsp;&nbsp;          
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
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.round(makingcal))}
  
  </TableCell>           
                          
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
  }}>HallMark Charges (INR/Per Unit)</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Number(hallmarkingcal)) }</TableCell>           
                          
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
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.round(values.gTotal + makingcal + (Number(hallmarkingcal)) ))}</TableCell>           
                        
               </TableRow>
                <TableRow >
               
  <TableCell></TableCell>
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
  &nbsp;&nbsp;&nbsp;&nbsp;
 
  CGST 1.5%</TableCell>
        <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(gstpertotal)}</TableCell>           
                          
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
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
    SGST 1.5%</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(gstpertotal)}</TableCell>           
                          
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
  }}>Less :Trade Discount</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.round(values.gCash))}</TableCell>           
                          
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
                
              <TableCell >Grand Total</TableCell>
          <TableCell>:</TableCell> 

  <StyledTableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.round(((values.gTotal + makingcal + (Number(hallmarkingcal))) + (gstpertotal + gstpertotal)) - Number(values.gCash)))}</StyledTableCell>           
                          
               </TableRow>
        </TableBody>
          
      </Table> 
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Sales Adjustment
      </Typography>
*/}
<Divider/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
             {/* <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
           <TableCell sx={{color: 'blue'}}>Purity</TableCell>*/}
              <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
              <TableCell sx={{color: 'blue'}}>less Weight</TableCell>
          <TableCell sx={{color: 'blue'}}>Gross Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>UOM</TableCell>
           <TableCell sx={{color: 'blue'}} >Rate</TableCell>
           <TableCell sx={{color: 'blue'}}>Total</TableCell>
           </TableRow>
        </TableHead>
      <TableBody>
          
          
{Data?.oldorderDetails?.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{idx + 1}</TableCell>
              <TableCell >{item.foodItemNames}</TableCell>
              {/*  <TableCell >{item.HSN_CODE}</TableCell>
            <TableCell >{item.Purity}</TableCell>*/}
              <TableCell>{item.foodItemPrices}</TableCell>
              <TableCell >{item.quantitys}</TableCell>
              <TableCell >{(Number(item.foodItemPrices) - Number(item.quantitys)).toFixed(3)}</TableCell>
             
              <TableCell >{item.UOM}</TableCell>
                  <TableCell >{item.rate}</TableCell>
                      <TableCell >{NumberFormat(Math.round(item.subtotals))}</TableCell>
              
              
            </TableRow>
          ))}

           <TableRow >
              <TableCell sx={{border:'none'}}></TableCell>
             <TableCell sx={{border:'none'}}></TableCell>
        <TableCell sx={{border:'none'}}></TableCell>
             <TableCell sx={{border:'none'}}></TableCell>
           <TableCell sx={{border:'none'}}></TableCell>
             <TableCell sx={{border:'none'}}></TableCell>
              <TableCell sx={{wordBreak:"break-all"}}>Net Value:</TableCell>
<TableCell >{NumberFormat(Number(Math.round(oldcal)))}</TableCell>
           </TableRow>

 <TableRow >
              <TableCell ></TableCell>
             <TableCell ></TableCell>
        <TableCell ></TableCell>
             <TableCell ></TableCell>
           <TableCell ></TableCell>
             <TableCell ></TableCell>
              <TableCell sx={{wordBreak:"break-all"}}>PayOut:</TableCell>
<TableCell >{NumberFormat(Number(Data.amountdebit))}</TableCell>
           </TableRow>
       </TableBody>
      </Table>

      <Divider/>

<Divider/>


       
<Typography variant="body1" gutterBottom>
     
     {wordify(Number(Math.round(oldcal)))} 
      </Typography>
    
WT:{netweightolds.toFixed(3)}g ,QTY:{totalpcsold} 
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
        </>
    )
}
