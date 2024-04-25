import React, { useState, useEffect,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Check from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import TableBody from '@mui/material/TableBody';
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
import sin from '../../img/sj.png'
import Pdf from "react-to-pdf";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Printicon from '../../Icons/print.png'
import Closeicon from '../../Icons/close.png'
import Pdficon from '../../Icons/pdf.gif'
import axios from 'axios';
import ProgressBar from '../../layouts/Spinner'
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
tablemain: {
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
  '& tbody td': {
      fontWeight: '600',
  },
  '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
  },
  '& .MuiTableCell-root': {
      //border: 'none'
  },
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
         createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
            .then(res => {
              setData(res.data);
              setAllProducts(res.data);
            })
             .catch(err => console.log(err))

              createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
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
        createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
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

       const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCellsgst);
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
       
       createAPIEndpoint(ENDPIONTS.QSILVERGST).delete(id)
                   .then(res => {
                   fetchAlled();
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
                const response =  axios.post('https://serdb.onrender.com/api/Delsilvergstbill', deletedItem);
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

{/*const onDelete = async (id) => {
  setConfirmDialog({
      ...confirmDialog,
      isOpen: false
   })
  
 createAPIEndpoint(ENDPIONTS.QSILVERGST).delete(id)
             .then(res => {
             fetchAlled();
             resetFormControls();
             })
             .catch(
                 //errorsound.play(),
             // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
             setNotify({ isOpen: true, message: 'Deleted successfully.' }));

             const itemIndex = data.findIndex((item) => item.id === id);
  
             if (itemIndex !== -1) {
               const deletedItem = data[itemIndex];
               const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
               setData(updatedData);
               setDeletedData(deletedItem);
               fetchAlled();
               try {
                const response =  axios.post('https://serdb.onrender.com/api/Delsilvergstbill', deletedItem);
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
*/}

  
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
const edited = "BALANCE";

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
 // Data.city = searchSelectedCountry &&searchSelectedCountry.city   
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

  var iddate = new Date(Data.hireDate).toLocaleDateString()
  var lastFive = iddate.substr(iddate.length - 4);
  const openListOfOrdersEdit = () => {
        setOrderListVisibilityEdit(true);
    }
  const EditOrRemove=(item)=>{
    setdata(item);
   handleClickOpen()
  }

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
   
  let addstockpercentage = Data?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)
  let addpercentwt = Data?.orderPercent?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)
    let totalweigth = Data?.stockaddorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let totalweigths = Data?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
   let sterlingweigh = Data?.fancyitems?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let netweights =  Number(totalweigth )+ Number(totalweigths) + Number(addpercentwt) + Number(addstockpercentage) + Number(sterlingweigh)

  const totalstkpercent = Number(Data?.orderDetails?.length);
  const totalpercent = Number(Data?.orderPercent?.length);
  const totalpcsaddstock = Number(Data?.stockaddorderDetails?.length);
  const totalpcsadd = Number(Data?.addorderDetails?.length);
    const totalpcssterling = Number(Data?.fancyitems?.length);
  const nettotalpcs = Number(totalpercent) + Number(totalpcsaddstock) + Number(totalpcsadd) + Number(totalstkpercent) + Number(totalpcssterling)

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
  axios.get('https://serdb.onrender.com/api/QSilverGST')
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

const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const [successMessage, setSuccessMessage] = useState(null);

useEffect(() => {
  let intervalId;

  if (deleting) {
    intervalId = setInterval(async () => {
      const idToDelete = selectedIds[0];
      const totalItems = selectedIds.length;
      let completedItems = 0;
      try {
        // Delete the first selected item from the API
        await axios.delete(`https://serdb.onrender.com/api/QSilverGST/${idToDelete}`);
        console.log('Deletion successful:', idToDelete);

        // Update local data state after deletion
        setData(data.filter(item => item.id !== idToDelete));

        // Remove the deleted item from the selectedIds array
        setSelectedIds(selectedIds.slice(1));

        // Create a new ID for the deleted item
        const newId = generateNewId();

        // Modify the deleted item with the new ID
        const deletedItem = {
          ...data.find(item => item.id === idToDelete),
          id: newId,
        };

        // Post the modified deleted item to the API
        await axios.post('https://serdb.onrender.com/api/Delsilvergstbill', deletedItem);
        console.log('Posted modified deleted item to Delgoldgstbill:', deletedItem);
        setSuccessMessage(`Item ${idToDelete} successfully deleted and posted.`);
        completedItems++;
        const newProgress = (completedItems / totalItems) * 100;
        setProgress(newProgress);
        setBuffer(newProgress);

        // You can also update your state or perform other actions here

      } catch (error) {
        console.error('Error deleting or posting data:', error);
      }

      if (selectedIds.length === 0) {
        // Stop the interval if there are no more selected items
        setDeleting(false);
        clearInterval(intervalId);
      }
    }, 1000); // Interval duration in milliseconds (adjust as needed)
  }
  let timeoutId;

  if (successMessage) {
    // Set a timeout to clear the success message after 5000 milliseconds (adjust as needed)
    timeoutId = setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  }
  // Cleanup: Clear interval on component unmount
  return () => clearInterval(intervalId);

}, [deleting, selectedIds, data,successMessage]);
let oldcal =  Data?.oldsilveritems?.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
  return (
        <>
   
 
        {/* <Chip variant="outlined" label={"GOLD:"+Number(netweight).toFixed(3)} color="primary" />
        &nbsp;&nbsp; <Chip variant="outlined" label={"SILVER:"+Number(savedatasilver).toFixed(3)} color="success" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"92.5-SILVER:"+Number(savedatasilverfancy).toFixed(3)} color="error" />
        &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_GOLD:"+Number(netoldgoldweight).toFixed(3)} color="secondary" />
          &nbsp;&nbsp;  <Chip variant="outlined" label={"OLD_SILVER:"+Number(netoldsilverweight).toFixed(3)} color="default" />
    &nbsp;&nbsp;  <Chip variant="outlined" label={"CASH:"+NumberFormat(Number(totalcash))} color="default" />  */ }
      
           
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
                <Table className={classes.tablemain} >
                   {/*    <TblHead />*/}
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
               
                <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Net Weight</Box></TableCell>
                   <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Grand Total</Box></TableCell>
                   <TableCell > <Box fontWeight="fontWeightBold" fontSize={15}>Actions</Box></TableCell>
                  
                   </TableRow>
</TableHead> 
                    <TableBody>
                        {
                            datas().map(item => (
                              
                                <TableRow key={item.id}>
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
                                      <Box fontWeight="fontWeightBold" fontSize={16}>
         {item.billNo}{item.id}
      </Box>   
                                      {/*  <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                            </Avatar> */}
                                    </TableCell>
                                    <TableCell>
                                          <Box fontWeight="fontWeightBold" fontSize={16}>
        {item.fullName}
      </Box>   </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        <Box fontWeight="fontWeightBold" fontSize={16}>
        {item.city}
      </Box>  
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                    <Box fontWeight="fontWeightBold" fontSize={16}>
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
        <Chip label={              <Box fontWeight="fontWeightBold" fontSize={16}>
       {new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
      </Box> } onClick={e => showForUpdate(item.id)} color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell  onClick={e => showForUpdate(item.id)}> 
          <Box fontWeight="fontWeightBold" fontSize={16}>
    {new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
      </Box>
          </TableCell>
      
              }
              
                  <TableCell     
                                        onClick={e => showForUpdate(item.id)}>
          {(item.orderPercent.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0) + 
          item.addorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0) +
          item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0) + 
          item.stockaddorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0) +
          item.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)).toFixed(3)}G
    
                                 
                                    </TableCell>
                            <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                            <Box fontWeight="fontWeightBold" fontSize={16}>
          {NumberFormat(Number(item.gCash) + Number(item.onlinecash))}
      </Box>  
                                  
                                    </TableCell>
                                    <TableCell>
                                      <ButtonGroup size="small" aria-label="small button group">
   {
               edited == item.status ? 
                <TableCell >
              </TableCell>
     
       : 
         <ThemeProvider theme={redTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#ffbfbf"}} >
         <DeleteOutlineTwoToneIcon
                                      color="error"
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
       </ThemeProvider>
       }
      {/*  <ThemeProvider theme={blueTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#ABD1FF"}} 
      >
       <ReactToPrint
                        trigger={() =><LocalPrintshopOutlinedIcon  fontSize="small" />}
                        content={() => componentRef.current}/>
         </Button>
      </ThemeProvider> */}
  <ThemeProvider theme={greenTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#cdffcd"}} 
       onClick={() => EditOrRemove(item)}>
         <OpenInNewOffOutlinedIcon  fontSize="small"  onClick={() => EditOrRemove(item)}/>
         </Button>
       </ThemeProvider>
 
</ButtonGroup>
                                          
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
             <Pdf targetRef={componentRef} filename={`${Data.id}-${Data.fullName}.pdf`}
              options={{ orientation: 'portrait', unit: 'pt', format: [900,600] }}
                //options={{ orientation: 'portrait', unit: 'pt', format: [900, 1000] }}
             >
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
                 <img src={Closeicon} height={35}  />
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
         
          <Box width='800px' height="1000px" className="watermark">
    <img src={sin} height="30%" width="100%"/>
          {/*<Box height='50px'>

          </Box>*/}
             <Grid container columnSpacing={{ xs: 1, sm: 2, md: 25 }}>
    <Grid item xs={6}>

                      
      <Typography variant="subtitle1" gutterBottom>
      
         <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 𝔅𝔦𝔩𝔩𝔢𝔡 𝔗𝔬</span>
      </Typography>
     
       <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold',color:'black',fontStyle:'italic'}}>
     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NAME: {(Data.fullName).toUpperCase()}</span>

      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CITY/TOWN:{Data.city}</span>
     
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MOBILE:{Data.mobile}</span>
    
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
       {/*PAN NO:{Data.pannumber}*/} 
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AADHAAR NO:{Data.aadhaarnumber}</span>
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     {/*  AADHAAR NO: {Data.aadhaarnumber}*/}
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
  {/* <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  TAX INVOICE NO : SJ:{Data.id}/{lastFive},Date:{new Date(Data.hireDate).toLocaleDateString()}
  </Typography>
 <Divider sx={{ bgcolor: "black" }}/> 
  <Box height='10px'></Box>*/}
   {/*<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  TAX INVOICE NO : SJ:{Data.id}/{lastFive},Date : {new Date(Data.hireDate).toLocaleDateString()}
  </Typography>
<Divider sx={{ bgcolor: "black" }}/> 
  <Box height='10px'></Box>*/}
<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     GOLD: {Data.goldrate}/GMS
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
     SILVER: {Data.silverrate}/GMS
      </Typography>
    <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      STATE OF SUPPLY: TAMILNADU-627751
      </Typography>
    
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
          <TableContainer>
        
             <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
                  <TableHead>
                      <TableRow>
                          <TableCell sx={{ color: 'blue' }}>Description</TableCell>
                          <TableCell sx={{ color: 'blue' }}>HSN/SAC</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Weight</TableCell>
                          {/*<TableCell sx={{ color: 'blue' }}>Wastage</TableCell>*/}
                          <TableCell sx={{ color: 'blue' }}>Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>+Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>UOM</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Total</TableCell>
                         {/* <TableCell sx={{ color: 'blue' }}>Credit</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Net Balance</TableCell>*/}
                      </TableRow>
                  </TableHead>

                  <TableBody>

                      {Data?.orderPercent?.map((item, idx) => (
                          //totalweigth = Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName+"["+item.huid+"]"}</TableCell>
                              <TableCell>{item.hsncode}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>
                             {/*<TableCell>-</TableCell>*/}
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.tax+"%"}</TableCell>
                             <TableCell>{item.uom}</TableCell>
                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                             {/* <TableCell>-</TableCell>
                              <TableCell>-</TableCell> */}
                          </TableRow>
                      ))}
                      {Data?.addorderDetails?.map((item, idx) => (
                         // wastageweight = Number(ordereditems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                            <TableCell>{item.foodItemName+"["+item.huid+"]"}</TableCell>
                              <TableCell>{item.hsncode}</TableCell>
                              <TableCell>{item.foodItemPrice}g</TableCell>
                             {/*<TableCell>-</TableCell>*/}
                              <TableCell>{item.rate}</TableCell>
                           <TableCell>{ item.tax === "" ? "-" : item.tax}</TableCell>
                               <TableCell>{item.uom}</TableCell>
                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                             {/* <TableCell>-</TableCell>
                              <TableCell>-</TableCell>*/}
                          </TableRow>
                      ))}
                      {/*Data?.watageitems?.map((item, idx) => (
                          //totalweigthpercent = Number(orderedFoodItemspercent.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                      <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}</TableCell>
                              <TableCell>{ item.tax }</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>
                              { NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))*/}
                      {Data?.orderDetails?.map((item, idx) => (
                          <TableRow key={item.id}>
                                 <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.hsncode}</TableCell>
                                 <TableCell>{item.foodItemPrice}g</TableCell>
                             {/*<TableCell>-</TableCell>*/}
                                <TableCell>{item.rate}</TableCell>
                           <TableCell>{ item.tax === "" ? "-" : item.tax}</TableCell>
                             <TableCell>{item.uom}</TableCell>
                              <TableCell>{NumberFormat(Math.round(item.subtotal))}</TableCell>
                               {/* <TableCell>-</TableCell>
                              <TableCell>-</TableCell>*/}
                          </TableRow>
                      ))}
                      {Data?.stockaddorderDetails?.map((item, idx) => (
                          <TableRow key={item.id}>
                                 <TableCell>{item.foodItemName+"["+item.huid+"]"}</TableCell>
                              <TableCell>{item.hsncode}</TableCell>
                                 <TableCell>{item.foodItemPrice}g</TableCell>
                             {/*<TableCell>-</TableCell>*/}
                                <TableCell>{item.rate}</TableCell>
                          <TableCell>{ item.tax === "" ? "-" : item.tax}</TableCell>
                             <TableCell>{item.uom}</TableCell>
                              <TableCell>{NumberFormat(Math.round(item.subtotal))}</TableCell>
                               {/* <TableCell>-</TableCell>
                              <TableCell>-</TableCell>*/}
                          </TableRow>
                      ))}
                       
                    {Data?.fancyitems?.map((item, idx) => (
                          <TableRow key={item.id}>
                                 <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.hsncode}</TableCell>
                                 <TableCell>{item.foodItemPrice}g</TableCell>
                            
                                <TableCell>{item.rate}</TableCell>
                            <TableCell >-</TableCell>
                             <TableCell>{item.uom}</TableCell>
                               <TableCell>{NumberFormat(Math.round(item.subtotal))}</TableCell>
                              
                              
                          </TableRow>
                       ))}

                   

                       <TableRow className={classes.tablerow}>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                            <TableCell></TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>Net Value</TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Math.round(newitem))}</TableCell>
                           </TableRow>

                         <TableRow className={classes.tablerow}>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                            <TableCell></TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>CGST@1.5%</TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Number(newitem*1.5)/100)}</TableCell>
                           </TableRow>

                            <TableRow className={classes.tablerow}>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                            <TableCell></TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>SGST@1.5%</TableCell>
                        <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Number(newitem*1.5)/100)}</TableCell>
                           </TableRow>

                        
                                 <TableRow className={classes.tablerow}>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                            <TableCell></TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>Grant Total</TableCell>
                        <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Math.round(Number(newitem) + (((newitem*1.5)/100) + ((newitem*1.5)/100))))}</TableCell>
                           </TableRow>
                         
                     

{
  Data.oldbillno !== '' ?
  <> 
    <TableRow className={classes.tablerow}>
                              <TableCell>@BILL NO:{Data.oldbillno}{Data.oldbillid}</TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                            <TableCell></TableCell>
                          <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>Sales Adjustment</TableCell>
                        <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Data.oldsilveramount)}</TableCell>
                           </TableRow>
   <TableRow className={classes.tablerow}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>Net Amount</TableCell>
                      <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>
{NumberFormat(Math.round(Number(newitem) + (((newitem*1.5)/100) + ((newitem*1.5)/100)))
                      - Number(Data.oldsilveramount))}</TableCell>
                    </TableRow>
  {
Data.oldsilveramount > Number(newitem) + (((newitem*1.5)/100) + ((newitem*1.5)/100)) ? 
    ""
: <TableRow className={classes.tablerow}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>Less:Rebate</TableCell>
                    <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat((Number(Math.round(Number(newitem) + (((newitem * 1.5) / 100) + ((newitem * 1.5) / 100)))) 
                      - Number(Data.oldsilveramount)) - (Number(Data.gCash) + Number(Data.onlinecash)))}</TableCell>
</TableRow>
}
                  <TableRow className={classes.tablerow}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      {
                       Data.oldsilveramount > Number(newitem) + (((newitem*1.5)/100) + ((newitem*1.5)/100)) ?
                              <><TableCell sx={{ wordBreak: "break-all", padding: '8px' }}>Payout</TableCell>
                              <TableCell sx={{ wordBreak: "break-all", padding: '8px' }}>{NumberFormat((Number(Data.payout)))}</TableCell></> :

                              <><TableCell sx={{ wordBreak: "break-all", padding: '8px' }}>Amount Received</TableCell>
                              <TableCell sx={{ wordBreak: "break-all", padding: '8px' }}>{NumberFormat((Number(Data.gCash) + Number(Data.onlinecash)))}</TableCell></>
                      }

                    </TableRow>
                    
                    </>
       :
       <>
       <TableRow className={classes.tablerow}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Less:Rebate</TableCell>
                    <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat(Number(Math.round(Number(newitem) + (((newitem * 1.5) / 100) + ((newitem * 1.5) / 100)))) -
                      (Number(Data.gCash) + Number(Data.onlinecash)))}</TableCell>
                  </TableRow>
                  <TableRow className={classes.tablerow}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Amount Received</TableCell>
                      <TableCell sx={{wordBreak:"break-all",padding: '8px'}}>{NumberFormat((Number(Data.gCash) + Number(Data.onlinecash)))}</TableCell>
                    </TableRow>
                    
                    </>
       
   }
         
         

                       </TableBody>
              </Table>
          

          <Divider/>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
                  <TableHead>
                      
                  </TableHead>
                    <Box width='150px'>
    </Box>
                  <TableBody>

                        <TableRow className={classes.tablerow}>
                              <TableCell>WT:{Number(netweights).toFixed(3)}GMS,PCS:{nettotalpcs}</TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                        <TableCell></TableCell>
                               <TableCell></TableCell>
                           </TableRow>
</TableBody>
              </Table>
          

     <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
       
        <TableBody>
          
   {
          Data.oldsilveramount > Number(newitem) + (((newitem*1.5)/100) + ((newitem*1.5)/100)) ? 
                <>
                <TableRow>
                             <TableCell sx={{
                              color: 'blue',
                              fontWeight: "600"
                            }}> {"Payout :" + NumberFormat((Number(Data.payout)))}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                            <TableCell></TableCell>
                          </TableRow>
                          </>
                 : 
 <>
                 <TableRow>

                            <TableCell sx={{
                              color: 'blue',
                              fontWeight: "600"
                            }}> {"Cash :" + NumberFormat((Number(Data.gCash)))}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                            <TableCell></TableCell>
                          </TableRow><TableRow>

                              <TableCell sx={{
                                color: 'blue',
                                fontWeight: "600"
                              }}>
                                {"Online :" + NumberFormat(Number(Data.onlinecash))}

                              </TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>

                            </TableRow>
                            
                            </>

                            }
           
        </TableBody>
         {wordify((Number(Data.gCash) + Number(Data.onlinecash)))}
      </Table>
    
 </TableContainer>
            
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
   
      </Typography>
  </Grid>
</Grid> 
 </Box>

 </DialogContentText>
     </DialogContent>
  </Dialog>


  
        </>
    )
}
