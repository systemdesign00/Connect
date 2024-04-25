import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
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

export default function Stockdisplay(props) {
    const classes = useStyles();
    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')

    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.WHOLE).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.WHOLE).fetchAll()
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
        const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
            
        })
       createAPIEndpoint(ENDPIONTS.WHOLE).delete(id)
                   .then(res => {
                   fetchAlled();
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
       
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3')
    return (
        <>
        
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Order No.</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Payed With</TableCell>
                              <TableCell>Date-Time</TableCell>
                          
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderList.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell
                                       >
                                        <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.id}
                                </Box>
                                         
                                        </Avatar>
                                    </TableCell>
                                    <TableCell
                                       >
                                        {item.itemname}
                                    </TableCell>
                                    <TableCell
                                       >
                                        {item.size}
                                    </TableCell>
                                    <TableCell
                                       >
                                        {item.weight}
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
