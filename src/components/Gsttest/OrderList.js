import React, { useState, useEffect } from 'react'
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
const useStyles = makeStyles(theme => ({

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

    const [orderList, setOrderList] = useState([]);
     const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.GSTESTIMATE).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.GSTESTIMATE).fetchAll()
            .then(res => {
              
                setOrderList(res.data)
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
        const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
         })
       createAPIEndpoint(ENDPIONTS.GSTESTIMATE).delete(id)
                   .then(res => {
                   fetchAlled();
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
       value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
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
                            <TableCell >Order No</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>City/Town</TableCell>
                            <TableCell>Mobile</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Status</TableCell>
                            <TableCell>Grand Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            searchList.map(item => (
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
             
                                    
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {NumberFormat(Number(item.cashreceived) + Number(item.cashreceivedonline))}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteOutlineTwoToneIcon
                                            color="secondary"
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
                                            }}

                                        />

                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
            </TableContainer>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
