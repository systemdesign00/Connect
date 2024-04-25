import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import { COLORS } from '../../layouts/Colors';
import  Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import Badge from '@mui/material/Badge';
import * as userService from "../../Services/userService";
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useTable from '../GSEstimate/useTables';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Popup from '../../layouts/Popup';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from '../../hooks/DatePicker';
import {NumberFormat} from '../../Services/NumberFormat';
import axios from 'axios';
const useStyles = makeStyles(theme => ({

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
            border: 'none'
        }
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
const [opens, setOpens] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy here
  
    const copyToClipBoard = async copyMe => {
      setOpens(true);
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };
  

const [selectedIds, setSelectedIds] = useState([]);
const [deleting, setDeleting] = useState(false);


const [products, setProducts] = useState([]);
const [allProducts, setAllProducts] = useState([]);

const [startDate,setStartDate]= useState(new Date());
const [endDate,setEndDate]= useState(new Date());
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     
    
    const [Equalizepg, setEqualizepg] = useState(false);
const openEqualizepg = () => {
        setEqualizepg(true);
    }
    const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
      useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
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
} = useTable(data, filterFn,userService.headcellsVentors);

const handleSearchcustomer = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.shopName.toLowerCase().includes(target.value))
                
        }
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
  setData(filtered);
};

const selectionRange = {
  startDate: startDate,
  endDate: endDate,
  key: 'selection',
}
const [deletedData, setDeletedData] = useState(null);
const [responseMessage, setResponseMessage] = useState(null);
const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
            
        })
       createAPIEndpoint(ENDPIONTS.PENDINGORDER).delete(id)
                   .then(res => {
                createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
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
                     const deletedItem = data[itemIndex];
                     const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
                     setData(updatedData);
                     setDeletedData(deletedItem);
                     fetchAlled();
                     try {
                      const response =  axios.post('https://serdb.onrender.com/api/Delwholesalebill', deletedItem);
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

//const inputTS = Date.parse(input);
//const result = orderList.filter(d=> d.hireDate === isToday);
const edited = "BALANCE";

  
useEffect(() => {
  // Fetch data from the API
  axios.get('https://serdb.onrender.com/api/Pending')
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
  if (selectedIds.length < datas().length) {
    setSelectedIds(datas().map(item => item.id));
  } else {
    setSelectedIds([]);
  }
};

const handleDeleteSelected = () => {
  // Start the deletion process
  setDeleting(true);
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

        axios.delete(`https://serdb.onrender.com/api/Pending/${idToDelete}`)
          .then(response => {
            console.log('Deletion successful:', response.data);
            // Update the local data state after deletion
            setData(datas().filter(item => item.id !== idToDelete));
            // Remove the deleted item from the selectedIds array
            setSelectedIds(selectedIds.slice(1));
          })
          .catch(error => console.error('Error deleting data:', error));

          const itemIndex = data.findIndex((item) => item.id === idToDelete);

          if (itemIndex !== -1) {
            const deletedItem = data[itemIndex];
            const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
            setData(updatedData);
            setDeletedData(deletedItem);
            fetchAlled();
            try {
              const response =  axios.post('https://serdb.onrender.com/api/Delwholesalebill', deletedItem);
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
        
        <Stack
   direction={{ xs: 'column', sm: 'row' }}
   spacing={{ xs: 1, sm: 2, md: 4 }}
>

<FormControl  sx={{ m: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Search Ventors</InputLabel>
              <OutlinedInput
             sx={{width:'100%'}}
                id="outlined-adornment-amount"
                onChange={handleSearchcustomer}
                startAdornment={<InputAdornment position="start"><SearchIcon color='info' /></InputAdornment>}
             label="Search Customer"
              />
    </FormControl>
    <FormControl  sx={{ m: 3 }}>
            <IconButton  onClick={openEqualizepg}>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/calendar.png" alt="calendar"/>
    </IconButton>
     </FormControl> 

     <FormControl  sx={{ m: 3 }}>
    <Chip icon={<DeleteOutlineTwoToneIcon />}  onClick={handleDeleteSelected} 
    label=  {deleting ? 'Deleting...' : 'Delete Selected'} variant="outlined"  disabled={deleting}/>
    
    </FormControl>
</Stack>

          
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                    {/*  <TblHead />*/}
                   <TableHead>
                        <TableRow>
                        <TableCell><Checkbox {...label} onClick={handleSelectAll} disabled={deleting} /> </TableCell>
                            <TableCell >Bill No</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>City/Town</TableCell>
                            <TableCell>Mobile</TableCell>
                              <TableCell>Date</TableCell>
                          <TableCell>Balance</TableCell> 
                          <TableCell>Cash Balance</TableCell> 
                            <TableCell></TableCell>
                        </TableRow>
    </TableHead> 
                    <TableBody>
                        {
                             datas().map(item => (
                                <TableRow key={item.id}>
                                   <Snackbar
           
           message="Copied"
           anchorOrigin={{ vertical: "top", horizontal: "center" }}
           autoHideDuration={2000}
           onClose={() => setOpens(false)}
           open={opens}
         >
            <Alert  severity="info"  variant="filled">
             Copied! Closing Balance:{(item.Purebalance)}G
           </Alert></Snackbar>  
                                    <TableCell
                                      >
                                      <Box fontWeight="fontWeightBold" fontSize={16}>
                                      <Checkbox {...label}  size="small" 
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}/>
                                     
      </Box>   
                                      {/*  <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                            </Avatar> */}
                                    </TableCell>
                                    <TableCell>
                                          <Box fontWeight="fontWeightBold" fontSize={16}>
        {item.id}
      </Box>   </TableCell>
                                    <TableCell  onClick={e => showForUpdate(item.id)}>{item.shopName}</TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.city}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.mobile}
                                    </TableCell >
                                     {
               new Date().toLocaleDateString() == new Date(item.hireDate).toLocaleDateString() ? 
                <TableCell onClick={e => showForUpdate(item.id)}>
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={new Date(item.hireDate).toLocaleDateString()} onClick={e => showForUpdate(item.id)} color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell   onClick={e => showForUpdate(item.id)}> 
        {new Date(item.hireDate).toLocaleDateString()}
          </TableCell>
      
              }
             
                                    <TableCell >
                                         {
               item.Purebalance > 0 ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        onClick={() => copyToClipBoard(item.Purebalance)}
      >
        <Chip onClick={() => copyToClipBoard(item.Purebalance)} label={item.Purebalance+"G"}  color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell > 
          <Chip  onClick={() => copyToClipBoard(item.Purebalance)} label={item.Purebalance+"G"}  color="info" variant="outlined" 
          />
          </TableCell>
      
              }
                                   
            </TableCell> 
                                    <TableCell>

                                           {
                item.Purebalance > 0 ? 
                <TableCell  >
                  
         
        </TableCell>
     
       : 
          <TableCell  > 
        <DeleteOutlineTwoToneIcon
                                            sx={{color:'red'}}
                                            //onClick={e => deleteOrder(item.id)} 
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
                                            }} />
          </TableCell>
      
              }
                                        

                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
                  <TblPagination />
            </TableContainer>
            <Popup
                title="DATE FILTER"
                openPopup={Equalizepg}
                setOpenPopup={setEqualizepg}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
