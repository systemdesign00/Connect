import React, { useState, useEffect ,useRef } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import Badge from '@mui/material/Badge';
import TableBody from '@mui/material/TableBody';
import sin from '../../img/sj.png'
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
import { red, green ,blue} from '@mui/material/colors';
import  { tableCellClasses } from '@mui/material/TableCell';

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
        
    },
    table: {
        '& thead th': {
            fontWeight: '600',
            color: useTheme().palette.primary.main,
            backgroundColor: useTheme().palette.primary.light,
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
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
     const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.DELIVERYCHELLAN).fetchAll()
            .then(res => {
                setData(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.DELIVERYCHELLAN).fetchAll()
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
} = useTable(data, filterFn);
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

   var iddate = Data.hireDate;
  var lastFive = iddate.substr(iddate.length - 4);
    var nextyear = Number(lastFive) + Number(1);

        const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
         })
       createAPIEndpoint(ENDPIONTS.DELIVERYCHELLAN).delete(id)
                   .then(res => {
                   createAPIEndpoint(ENDPIONTS.DELIVERYCHELLAN).fetchAll()
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
        <DirectionsIcon />
      </IconButton>
    </Paper>
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                    <TableHead>
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
                    </TableHead>
                    <TableBody>
                        {
                             datas().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                                        </Avatar>
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
                                           {NumberFormat(Number(item.amountdebit))}
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
         <Typography variant="subtitle1" gutterBottom sx={{fontWeight: 'bold',color:'black'}}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    DELIVERYCHELLAN
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
  Tax Invoice No : SJ-{Data.id} / {lastFive} , Date : {Data.hireDate}
{/*Tax Invoice No : {values.id} / {lastFive}-{nextyear} , Date : {values.hireDate}*/ }
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
            <TableCell sx={{color: 'blue'}}>HSN/SAC</TableCell>
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
         <TableCell >{item.HSN_CODE}</TableCell>
         <TableCell>{item.foodItemPrices}</TableCell>
              <TableCell >{item.UOM}</TableCell>
                  <TableCell >{item.rate}</TableCell>
                      <TableCell >{NumberFormat(Math.round(item.subtotals))}</TableCell>
              
              
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
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
  }}>Total Value</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
    color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Number(Math.round(oldcal)))}</TableCell>           
         </TableRow>
         { /*<TableRow >
              &nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              
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
  }}>Balance</TableCell>
  <TableCell>:</TableCell> 
<TableCell sx={{
    color: 'black',
fontWeight: "600"
  }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{NumberFormat(Math.abs(Math.round(((values.gTotal + makingcal + (Number(hallmarkingcal))) + (Math.round(gstpertotal + gstpertotal)  - Number(values.gCash)))  ) - Number(Math.round(oldcal))) )}</TableCell>           
         </TableRow> */}
      </TableBody>
</Table>
<Typography variant="body1" gutterBottom>
     
     {wordify(Number(Math.round(oldcal)))} 
      </Typography>
    
WT:{netweightolds.toFixed(3)}g ,PCS:{totalpcsold} || &nbsp;&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp;
 Amount Debited:{NumberFormat(Number(Data.amountdebit))}

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
