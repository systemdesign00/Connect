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

export default function In(props) {
    const classes = useStyles();
    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
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
   
   
   
       }
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
        
            <TableContainer component={Paper} >
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell >Order No.</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Payed With</TableCell>
                            <TableCell>Grand Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderList.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.orderNumber}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.customerId}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.pMethod}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.gTotal}
                                    </TableCell>
                                    <TableCell>
                                        <DeleteOutlineTwoToneIcon
                                            color="secondary"
                                            //onClick={e => deleteOrder(item.id)} 
                                            onClick={() => {
                                              
                                                  audio.play()

                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => {
                                                        createAPIEndpoint(ENDPIONTS.ORDER).delete(item.id)
                                                            .then(res => {
                                                                setOrderListVisibility(false);
                                                                setOrderId(0);
                                                                resetFormControls();
                                                                setNotify({ isOpen: true, message: 'Deleted successfully.',severity:"warning" });
                                                            })
                                                            .catch(err => console.log(err))
                                                    }
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
