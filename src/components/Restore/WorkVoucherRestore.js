import React,{useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Draggable from 'react-draggable';
import { makeStyles } from '@mui/styles';
import { red, green ,blue} from '@mui/material/colors';
import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';
import * as userService from "../../Services/userService";
import { styled } from '@mui/material/styles';
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import {NumberFormat} from '../../Services/NumberFormat';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Chip,Button } from '@mui/material';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RestoreFromTrash from '@mui/icons-material/RestoreFromTrash'
import Checkbox from '@mui/material/Checkbox';
import { COLORS } from '../../layouts/Colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import ReactToPrint from 'react-to-print';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Closeicon from '../../Icons/close.png'
import PDFicon from '../../Icons/pdf.gif'
import jsPDF from "jspdf";
import Estimate from '../../img/estimate.png';
import sin from '../../img/sj.png'
import Pdf from "react-to-pdf";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import Printicon from '../../Icons/print.png'
import Pdficon from '../../Icons/pdf.gif'
const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
     
      color: COLORS.TableHeadColor,
        backgroundColor: COLORS.TableBgColor,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f4f5fd',
        cursor: 'pointer',
       
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function GoldVoucherRestore() {
  const classes = useStyles();
    const [page, setPage] = React.useState(0);
 const [rowsPerPage, setRowsPerPage] = React.useState(1000000);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();
  const componentRef = useRef();

  useEffect( () => {
      clearTimeout(timerRef.current);
    },[]);
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

  const [value, setValue] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [apiDataeb, setApiDataeb] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
const [deleting, setDeleting] = useState(false);
const [deletings, setDeletings] = useState(false);
const handleCheckboxChange = (id) => {
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const handleSelectAll = () => {
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < apiData.length) {
      setSelectedIds(apiData.map(item => item.id));
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

          axios.delete(`https://serdb.onrender.com/api/Delgoldworkvoucherbill/${idToDelete}`)
            .then(response => {
              console.log('Deletion successful:', response.apiData);
              // Update the local data state after deletion
              setApiData(apiData.filter(item => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch(error => console.error('Error deleting data:', error));

            const itemIndex = apiData.findIndex((item) => item.id === idToDelete);
  
            if (itemIndex !== -1) {
              const deletedItem = apiData[itemIndex];
              const updatedData = [...apiData.slice(0, itemIndex), ...apiData.slice(itemIndex + 1)];
              setApiData(updatedData);
              setDeletedData(deletedItem);
        
              try {
                const response =  axios.post('https://serdb.onrender.com/api/WorkVoucher', deletedItem);
               // const apiUrl = 'https://serdb.onrender.com/api/Gsestimate'; // Replace with your API endpoint
               /* const response =  fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(deletedItem),
                });*/
        
                if (response.ok) {
                  const responseData =  response.json();
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
      }, 1000);
       // Interval duration in milliseconds (adjust as needed)
    }
   
    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deleting, selectedIds, apiData]);

  const handleDelete = () => {
    // Start the deletion process
    setDeletings(true);
  };

  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;

    if (deletings) {
      intervalId = setInterval(() => {
        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeletings(false);
          clearInterval(intervalId);
        } else {
          // Delete the first selected item from the API
          const idToDelete = selectedIds[0];

          axios.delete(`https://serdb.onrender.com/api/Delgoldworkvoucherbill/${idToDelete}`)
            .then(response => {
              console.log('Deletion successful:', response.apiData);
              // Update the local data state after deletion
              setApiData(apiData.filter(item => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch(error => console.error('Error deleting data:', error));

           
           
        }
      }, 1000);
       // Interval duration in milliseconds (adjust as needed)
    }
   
    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deletings, selectedIds, apiData]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://serdb.onrender.com/api/Delgoldworkvoucherbill'; // Replace with your API endpoint
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setApiData(data);
        } else {
          setError('Error fetching data from API');
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setError('Error fetching data from API');
      } finally {
        setLoading(false);
      }
    };
 
    fetchData();
    
  }, []); 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const EditOrRemove=(item)=>{
    setdata(item);
   handleClickOpen()
  }
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

 
  return (
    <>
       {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ flexGrow: 1 }}>
        
      <Grid container spacing={2} columns={16}>
      <Grid item xs={2}>
      <Box fontWeight="fontWeightBold" fontSize={15}>{selectedIds.length}</Box>
     </Grid>
   
        <Grid item xs={2}>
            
        <Chip icon={<RestoreFromTrash />} color='info' onClick={handleDeleteSelected} 
label=   {deleting ? 'Restoring...' : 'Restore'} variant="outlined"  disabled={deleting}/>
 </Grid>
        <Grid item xs={2}>
        <Chip icon={<DeleteOutlineTwoToneIcon />} color='error' onClick={handleDelete} 
label= {deleting ? 'Deleting...' : 'Delete'} variant="outlined"  disabled={deleting}/>
       
        </Grid>
      </Grid>
    </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <TableRow>
            <StyledTableCell>
            <Checkbox {...label}  size="small" 
                       onClick={handleSelectAll} disabled={deleting}/>
            </StyledTableCell>
            <StyledTableCell><Box fontWeight="fontWeightBold" fontSize={15}>REF NO</Box></StyledTableCell>
            <StyledTableCell ><Box fontWeight="fontWeightBold" fontSize={15}>DATE</Box></StyledTableCell>
            <StyledTableCell ><Box fontWeight="fontWeightBold" fontSize={15}>NAME</Box></StyledTableCell>
            <StyledTableCell ><Box fontWeight="fontWeightBold" fontSize={15}>CITY</Box></StyledTableCell>
            <StyledTableCell ><Box fontWeight="fontWeightBold" fontSize={15}>MOBILE</Box></StyledTableCell>
            <StyledTableCell ><Box fontWeight="fontWeightBold" fontSize={15}>ACTION</Box></StyledTableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {apiData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow key={row.id} >
                  <StyledTableCell >
                 <Checkbox {...label}  size="small" 
                    checked={selectedIds.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}/>
                 </StyledTableCell>
                 <StyledTableCell > <Box fontWeight="fontWeightBold" fontSize={15}>{row.billNo}</Box> </StyledTableCell>
                 {
               new Date().toLocaleDateString() == new Date(row["hireDate"]).toLocaleDateString() ? 
                <StyledTableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={              <Box fontWeight="fontWeightBold" fontSize={15}>
        {new Date(row.hireDate).toLocaleDateString()}
      </Box> }  color="error" variant="outlined"/>
      </StyledBadge>
         
        </StyledTableCell>
     
       : 
          <StyledTableCell > 
          <Box fontWeight="fontWeightBold" fontSize={15}>
          {new Date(row.hireDate).toLocaleDateString()}
      </Box>
          </StyledTableCell>
      
              }
                
           
                <StyledTableCell > <Box fontWeight="fontWeightBold" fontSize={15}>{row.fullName}</Box></StyledTableCell>
                 <StyledTableCell> <Box fontWeight="fontWeightBold" fontSize={15}>{row.city}</Box></StyledTableCell>
                 <StyledTableCell> <Box fontWeight="fontWeightBold" fontSize={15}>{row.mobile}</Box></StyledTableCell>
              <StyledTableCell>
              <ThemeProvider theme={greenTheme}>
     <Button className={`${classes.roots}`} style={{ backgroundColor: "#cdffcd"}} 
       onClick={() => EditOrRemove(row)}>
         <OpenInNewOffOutlinedIcon  fontSize="small"  onClick={() => EditOrRemove(row)}/>
         </Button>
       </ThemeProvider>
              </StyledTableCell>
               </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[{ label: 'All', value: 1000000 },5, 10, 25]}
        component="div"
        count={apiData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
    
    
    </Paper>

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
              color="secondary"
              variant="outlined"
              style={{ backgroundColor: 'secondary' }}
              onClick={handleClickQuery}
            >
              {query !== 'idle'}
             <Pdf targetRef={componentRef} filename={`${Data.id}-${Data.fullName}.pdf`}>
                        {({ toPdf }) =><img src={PDFicon} height="25" onClick={toPdf} />}
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
                        trigger={() =><img src={Printicon} height="25"  />}
                        content={() => componentRef.current}/>
                    </Button>
                    &nbsp; 
                    <Button className={`${classes.rootbutton}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={handleClose}>
                 <img src={Closeicon} height="25"  />
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
       TO
      </Typography>
     
       <Typography variant="h5" gutterBottom  sx={{fontWeight: 'bold',color:'black',fontStyle: 'italic'}}>
      {Data.fullName}
      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
      {Data.city}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      {Data.secondarymobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  TAX INVOICE NO :{Data.billNo}
  </Typography>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Date : {new Date(Data.hireDate).toLocaleDateString()}
  </Typography>
 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
   {/*Pan Number : {Data.pannumber}*/}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
    {/* Aadhaar Number : {Data.aadhaarnumber}*/}
      </Typography>
   
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >
  
<Divider/>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table}>
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
          
          
{Data?.oldorderDetails?.map((item,idx) => (
             <TableRow key={item.id}>
              <TableCell >{idx + 1}</TableCell>
              <TableCell >{item.foodItemNames}</TableCell>
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
             <TableCell >{Data?.oldorderDetails?.reduce((total, currentValue) => total = total + (((Number(currentValue.subtotals)/(currentValue.taxs/100)) - Number(currentValue.subtotals)) + Number(currentValue.subtotals)),0).toFixed(3)}g</TableCell>
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
      Authorized  Signatory
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
