import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { createAPIEndpoint, ENDPIONTS} from '../../api';
import { styled } from '@mui/material/styles';
import {  Table, TableBody,  TableCell,TableHead, TableRow, Paper, Avatar,  Chip, Typography, TablePagination,
    TableFooter,TableContainer,Badge
 } from '@mui/material';
import {NumberFormat} from '../../Services/NumberFormat';

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

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 1000,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '70px',
        maxWidth: '90%'
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: useTheme().palette.primary.dark,
        color: useTheme().palette.getContrastText(useTheme().palette.primary.dark)
    },
    avatar: {
        backgroundColor: useTheme().palette.primary.light,
        color: useTheme().palette.getContrastText(useTheme().palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: useTheme().palette.secondary.dark
    },
    city: {
        fontWeight: 'bold',
        color: useTheme().palette.primary.main
    },
    mobile: {
        fontWeight: 'bold',
        color: useTheme().palette.error.dark
    },
    ordernumber:{
        fontWeight: 'bold',
        color: useTheme().palette.primary.dark
    },
    hiredate:{
        fontWeight: 'bold',
       // color: useTheme().palette.primary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.85rem',
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));
const STATUSES = ['Active', 'Pending', 'Blocked'];


function Cardview() {
  const classes = useStyles();
   const pages = [5, 10, 25]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [orderList, setOrderList] = useState([]);
    let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
     const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

 const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }


 

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Customer Logo</TableCell>
              <TableCell className={classes.tableHeaderCell}>Customer Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>City-Mobile</TableCell>
            <TableCell className={classes.tableHeaderCell}>Purchase Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>GTotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                 
                          <Avatar alt={row.imageSrc} src='.' className={classes.avatar}/>
                     
                </TableCell>
                 <TableCell>
                  
                 
                          <Typography className={classes.name}>{row.fullName}</Typography>
                          <Typography className={classes.ordernumber} variant="body2">{row.orderNumber}</Typography>
                
                
                </TableCell>
              <TableCell>
 <Typography className={classes.city}>{row.city}</Typography>
  <Typography className={classes.mobile} variant="body2">{row.mobile}</Typography>
                  
                </TableCell>
                {
               isToday == row.hireDate ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={row.hireDate}  color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell  > 
          <Chip label={row.hireDate}  color="default" variant="filled" 
           />
          </TableCell>
      
              }
            
              <TableCell>
                  <Typography 
                    className={classes.status}
                    
                  >{NumberFormat(Number(row.gCash) + Number(row.onlinecash))}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
           // rowsPerPageOptions={page}
           // component="div"
            count={orderList.length}
            //rowsPerPage={rowsPerPage}
            //page={page}
             onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default Cardview;