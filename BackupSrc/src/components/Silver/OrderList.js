import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import { COLORS } from '../../layouts/Colors';
import Check from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
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
import sin from '../../img/sj.png'
import { red, green ,blue} from '@mui/material/colors';
import  { tableCellClasses } from '@mui/material/TableCell';
import Pdf from "react-to-pdf";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

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
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
     const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.STANDARDGSTSILVER).fetchAll()
            .then(res => {
                setData(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STANDARDGSTSILVER).fetchAll()
            .then(res => {
              
                setData(res.data)
                   setSearchList(res.data);
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
const handleSearchweight = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.fullName.toLowerCase().includes(target.value))
                
        }
    })
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

  const EditOrRemove=(item)=>{
    setdata(item);
   handleClickOpen()
  }
        const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
         })
       createAPIEndpoint(ENDPIONTS.STANDARDGSTSILVER).delete(id)
                   .then(res => {
                    createAPIEndpoint(ENDPIONTS.STANDARDGSTSILVER).fetchAll()
                    .then(res => {
                      
                        setOrderList(res.data)
                           setSearchList(res.data);
                    })
                    .catch(err => console.log(err))
                   resetFormControls();
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.' }));
       
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
const edited = "BALANCE";

 var iddate = Data.hireDate;
  var lastFive = iddate.substr(iddate.length - 4);
    var nextyear = Number(lastFive) + Number(1);

 var making = Data?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
   //const making = stockaddorderedFoodItems.map((item,idx) => (item.foodItemPrice))
let oldcal =  Data?.oldorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.subtotals),0);
 
 let totalweigth = Data?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  let totalweigths = Data?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0);
  //let netweights =  Number(totalweigth )+ Number(totalweigths)
  let netweights =  Number(totalweigth )
  const totalpcs = Number(Data?.orderDetails?.length);
  let totalweigthold = Data?.oldorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrices),0);
  let netweightolds =  Number(totalweigthold)
  const totalpcsold = Number(Data?.oldorderDetails?.length);
  
  const hallmarkingcal = Data?.stockaddorderDetails?.length * Data.debitcash;
const makingcal = Number(making * Data.onlinecash);
let totalgst=  Number(Data.gTotal + makingcal + (Number(hallmarkingcal)) - Data.gCash)       
  const gstpertotal = Number((totalgst * 1.5)/100);
  const oldgstpertotal = Number((Data.oldTotal * 1.5)/100);

   function getDictionary() {
    return validateDictionary("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    function validateDictionary(dictionary) {
        for (let i = 0; i < dictionary.length; i++) {
            if(dictionary.indexOf(dictionary[i]) !== dictionary.lastIndexOf(dictionary[i])) {
                console.log('Error: The dictionary in use has at least one repeating symbol:', dictionary[i])
                return undefined
            }
        }
        return dictionary
    }
}

  function numberToEncodedLetter(number) {
    //Takes any number and converts it into a base (dictionary length) letter combo. 0 corresponds to an empty string.
    //It converts any numerical entry into a positive integer.
    if (isNaN(number)) {return undefined}
    number = Math.abs(Math.floor(number))

    const dictionary = getDictionary()
    let index = number % dictionary.length
    let quotient = number / dictionary.length
    let result
    
    if (number <= dictionary.length) {return numToLetter(number)}  //Number is within single digit bounds of our encoding letter alphabet

    if (quotient >= 1) {
        //This number was bigger than our dictionary, recursively perform this function until we're done
        if (index === 0) {quotient--}   //Accounts for the edge case of the last letter in the dictionary string
        result = numberToEncodedLetter(quotient)
    }

    if (index === 0) {index = dictionary.length}   //Accounts for the edge case of the final letter; avoids getting an empty string
    
    return result + numToLetter(index)

    function numToLetter(number) {
        //Takes a letter between 0 and max letter length and returns the corresponding letter
        if (number > dictionary.length || number < 0) {return undefined}
        if (number === 0) {
            return ''
        } else {
            return dictionary.slice(number - 1, number)
        }
    }
}


    return (
        <>
        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
      // value={searchKey}
      //onChange={e => setSearchKey(e.target.value)}
       onChange={handleSearchweight}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Customer"
        inputProps={{ 'aria-label': 'Search Customer' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon/>
      </IconButton>
    </Paper>
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                  <TblHead />
                    {/*<TableHead>
                        <TableRow>
                            <TableCell >Bill No</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>City/Town</TableCell>
                            <TableCell>Mobile</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Aadhar No</TableCell>
                            <TableCell>Grand Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
    </TableHead>*/}
                    <TableBody>
                        {
                            datas().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                          {item.id}
                                       {/* <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                            </Avatar> */}
                                    </TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.city}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.mobile}
                                    </TableCell>
                                     {
               isToday == item.hireDate ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={item.hireDate} onClick={e => showForUpdate(item.id)} color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell  > 
        {item.hireDate}
          </TableCell>
      
              }
              <TableCell>
                  <Chip label={item.aadhaarnumber}  color="success" variant="outlined" 
            icon={<Check fontSize="small" />}/>
                  </TableCell>
              <TableCell
                                        onClick={e => showForUpdate(item.id)}>
          {(item.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)).toFixed(3)}G
         [{(item.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)).toFixed(3)}]  
                                    </TableCell>
                                    
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {NumberFormat(Number(item.cashreceived) + Number(item.cashreceivedonline))}
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
             <Pdf targetRef={componentRef} filename={`${Data.id}-${Data.fullName}.pdf`}>
                        {({ toPdf }) => <PictureAsPdfOutlinedIcon onClick={toPdf}/>}
                      </Pdf>
            </Button>
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
                   <Box width='794px' className="watermark">
       { /* <Box height='150.5px'> */}
         
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
      {Data.fullName}
      </Typography>
     
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}} >
      {Data.city}
      </Typography>
       <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      {Data.mobile}
      </Typography>
      
     </Grid>
  
  <Grid item xs={6}>
  <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
  Tax Invoice No : SJ:{Data.id}/{lastFive},Date : {Data.hireDate}
  </Typography>
  <Divider sx={{ bgcolor: "black" }}/>
  <Box height='10px'></Box>
   
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Pan No: {Data.pannumber}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Aadhaar No: {Data.aadhaarnumber}
      </Typography>
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
  <Grid item xs={6}>
  
  </Grid>
</Grid>
       
  <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
          
          
           
          <TableRow>
             <TableCell sx={{color: 'blue'}}>S.No</TableCell>
           <TableCell sx={{color: 'blue'}}>Description</TableCell>
            <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
             {/* 
             <TableCell sx={{color: 'blue'}}>Purity</TableCell>
              <TableCell sx={{color: 'blue'}}>HUID</TableCell>
           <TableCell sx={{color: 'blue'}}>Qty</TableCell>*/}
            <TableCell sx={{color: 'blue'}}>Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>UOM</TableCell>
            {/*<TableCell sx={{color: 'blue'}} >Wastage</TableCell>*/}
             <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            {/*<TableCell sx={{color: 'blue'}}>+Rate</TableCell>*/}
        {/*    <TableCell sx={{color: 'blue'}}>Debit</TableCell>*/}
            {/*<TableCell sx={{color: 'blue'}}>Credit</TableCell>*/}
               <TableCell sx={{color: 'blue'}}>Total</TableCell>
               
          </TableRow>
        </TableHead>
      
        <TableBody>
        
          {
           Data?.orderDetails?.map((item,idx) => (
            <TableRow key={item.id}>
               <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemName}</StyledTableCell>
                <StyledTableCell >{item.HSN_Code}</StyledTableCell>
                 {/*
                 <StyledTableCell >{item.Purity}</StyledTableCell>
                  <StyledTableCell >{item.HUID}</StyledTableCell>
             
            *<TableCell >{item.quantity}</TableCell>*/}
              <StyledTableCell >{item.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                        {/* <TableCell >-</TableCell>*/}
                <StyledTableCell >{item.rate}</StyledTableCell>
                  {/*   <TableCell >{item.tax}</TableCell>*/}
     
              <StyledTableCell > {NumberFormat((item.subtotal)) }</StyledTableCell>
               
            </TableRow>
          ))}
          {
           Data?.fancyitems?.map((item,idx) => (
            <TableRow key={item.id}>
               <StyledTableCell >{numberToEncodedLetter(idx + 1)}</StyledTableCell>
                <StyledTableCell >{item.foodItemName}</StyledTableCell>
                <StyledTableCell >{item.HSN}</StyledTableCell>
                 {/*
                 <StyledTableCell >{item.Purity}</StyledTableCell>
                  <StyledTableCell >{item.HUID}</StyledTableCell>
             
                  <TableCell >{item.quantity}</TableCell>*/}
              <StyledTableCell >{item.foodItemPrice}</StyledTableCell>
              <StyledTableCell >{item.UOM}</StyledTableCell>
                        {/* <TableCell >-</TableCell>*/}
                <StyledTableCell >{item.rate}</StyledTableCell>
                  {/*   <TableCell >{item.tax}</TableCell>*/}
     
              <StyledTableCell > {NumberFormat((item.subtotal)) }</StyledTableCell>
               
            </TableRow>
          ))}

          
        

 

        </TableBody>
      </Table>
<Divider/>

<Divider/>


       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
       
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
  }}>{NumberFormat(Data.gTotal)}</TableCell>           
                          
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
  }}>{NumberFormat(makingcal)}</TableCell>           
                          
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
  }}></TableCell>
         <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Data.gTotal + makingcal + (Number(hallmarkingcal)) )}</TableCell>           
                        
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
  }}>Less :Trade Rebate</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Data.gCash)}</TableCell>           
                          
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
  }}>{NumberFormat((Data.gTotal + makingcal + (Number(hallmarkingcal))) - Data.gCash )}</TableCell>           
                        
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
  }}>Add:
  &nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;
  
  CGST 1.5%</TableCell>
        <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(gstpertotal)}</TableCell>           
                          
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
  &nbsp;&nbsp;&nbsp;&nbsp;
    SGST 1.5%</TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(gstpertotal)}</TableCell>           
                          
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
                
              <TableCell >Grant Total </TableCell>
          <TableCell>:</TableCell> 

  <TableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(((Data.gTotal + makingcal + (Number(hallmarkingcal)) ) + (gstpertotal + gstpertotal)) - Number(Data.gCash))}</TableCell>   &nbsp;&nbsp;&nbsp;&nbsp;        
                          
               </TableRow>
               

              { /*

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
                
              <TableCell >Grant Total</TableCell>
          <TableCell>:</TableCell> 

  <StyledTableCell sx={{
   
color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.abs(((values.gTotal + makingcal + (Number(hallmarkingcal)) - Number(values.gCash)) + gstpertotal + gstpertotal) - Number(oldcal)))}</StyledTableCell>           
                          
</TableRow> */}
        </TableBody>
          
      </Table>

 <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
      Sales Adjustment
      </Typography>

      {/*<Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
   
      </Typography>*/}
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebill}>
        <TableHead>
           <TableRow>
            <TableCell sx={{color: 'blue'}}>S.No</TableCell>
              <TableCell sx={{color: 'blue'}}>Description</TableCell>
              <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
          <TableCell sx={{color: 'blue'}}>Net Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>Loss Weight</TableCell>
             <TableCell sx={{color: 'blue'}}>Gross Weight</TableCell>
         <TableCell sx={{color: 'blue'}} >Rate</TableCell>
            <TableCell sx={{color: 'blue'}}>Total</TableCell>
             </TableRow>
        </TableHead>
       <TableBody>
        { Data?.oldorderDetails?.map((item ,idx) =>  (
            <TableRow key={item.id}>
                <StyledTableCell >{idx + 1}</StyledTableCell>
                <StyledTableCell >{item.foodItemNames}</StyledTableCell>
                <StyledTableCell >{item.HSN_CODE}</StyledTableCell>
                 <StyledTableCell >{item.foodItemPrices}</StyledTableCell>
                  <StyledTableCell >{item.quantitys}</StyledTableCell>
                  <StyledTableCell >{Number(item.foodItemPrices) - Number(item.quantitys)}</StyledTableCell>
              <StyledTableCell >{item.rate}</StyledTableCell>
               <StyledTableCell > {NumberFormat((item.subtotals)) }</StyledTableCell>
               
            </TableRow>
          ))}
          </TableBody>
      </Table>

      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.tablebillmaking}>
        <TableBody>
         <TableRow >
             &nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
 }}>Total Value</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
   color: 'black',
fontWeight: "600"
 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(oldcal)}</TableCell>           
             </TableRow>
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
 }}>Grand Total</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
   color: 'black',
fontWeight: "600"
 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.abs(Math.round((Data.gTotal + makingcal + (Number(hallmarkingcal)) - Number(Data.gCash)) + gstpertotal + gstpertotal) - Number(oldcal)))}</TableCell> &nbsp;&nbsp;        
             </TableRow>
              </TableBody>
  </Table>
      
WT:{netweightolds.toFixed(3)}g ,PCS:{totalpcsold} || &nbsp;&nbsp;&nbsp;Cash:{NumberFormat(Data.cashreceived)} ,&nbsp;&nbsp;Online:{NumberFormat(Data.cashreceivedonline)} &nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;
 Amount Received:{NumberFormat(Number(Data.cashreceived)+Number(Data.cashreceivedonline))}
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 Amount Debit:{NumberFormat(Number(Data.status))}
    
    </TableContainer> 
     { /*<Typography variant="body1" gutterBottom>
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

         

         <Box height="5vh"> </Box>
            
{/* <Grid container spacing={4}>
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
</Grid> */}
<Grid container spacing={3}>
  <Grid item xs>
    
  </Grid>
 {/* <Grid item xs={6}>
     <Typography variant="body1" gutterBottom>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       Thank You for being a Customer 
               </Typography>
</Grid> */}
  <Grid item xs>
    
  </Grid>
</Grid>

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
