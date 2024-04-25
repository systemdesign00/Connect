import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import { COLORS } from '../../layouts/Colors';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Check from '@mui/icons-material/Check';
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
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import DatePicker from '../../hooks/DatePicker';
import {NumberFormat} from '../../Services/NumberFormat';
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
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
      useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setData(res.data)
            })
            .catch(err => console.log(err))
}, [])
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
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
   
        const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
            
        })
       createAPIEndpoint(ENDPIONTS.PURCHASESILVER).delete(id)
                   .then(res => {
                createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setData(res.data)
            })
            .catch(err => console.log(err))
                   resetFormControls();
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.' }));
       
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
    return (
        <>
             <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search Customer</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={handleSearchcustomer}
            startAdornment={<InputAdornment position="start"><SearchIcon color='info' /></InputAdornment>}
            endAdornment={<InputAdornment position="start"><MenuIcon color='error' /></InputAdornment>}
           
            label="Search Customer"
          />
        </FormControl>
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                     <TblHead />
                 {/*   <TableHead>
                        <TableRow>
                            <TableCell >Order No.</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>City/Town</TableCell>
                            <TableCell>Mobile</TableCell>
                              <TableCell>Date</TableCell>
                          <TableCell>Status</TableCell> 
                            <TableCell></TableCell>
                        </TableRow>
    </TableHead> */}
                    <TableBody>
                        {
                             datas().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                              
                                </Box>
                                         
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{item.ventorName}</TableCell>
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
                                         {
               edited == item.status ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={item.status}  color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell  > 
          <Chip label={item.status}  color="success" variant="outlined" 
            icon={<Check fontSize="small" />}/>
          </TableCell>
      
              }
                                   
            </TableCell> 
                                    <TableCell>

                                           {
               edited == item.status ? 
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
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
