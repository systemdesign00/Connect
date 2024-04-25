import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {NumberFormat} from '../../Services/NumberFormat';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import  Avatar  from '@mui/material/Avatar';
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
const match = 'silver'
const oldmatch = 'oldsilver'
 let today = new Date();

const isTodays = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
          
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >
         <Avatar  src={row.imageSrc} sx={{ bgcolor: 'white'}} />
         
           </TableCell>
           <TableCell >
          {row.orderNumber}
        </TableCell>
        <TableCell > {row.hireDate} </TableCell>
       <TableCell >{row.fullName}</TableCell>
        <TableCell >{row.mobile}</TableCell>
        <TableCell >{row.city}</TableCell>
        <TableCell >{NumberFormat(Number(row.cashreceived) + Number(row.cashreceivedonline))}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
<Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History-(Gold And Silver)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>HUID</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell >Item Weight</TableCell>
                     <TableCell >+Rate</TableCell>
                         <TableCell >Rate</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.stockaddorderDetails.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                        <TableCell><Chip label={historyRow.HUID} filled color="error"/> </TableCell>
                      <TableCell><Chip label={historyRow.foodItemName} filled color="primary"/> </TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.tax}</TableCell>
                             <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.addorderDetails.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                        <TableCell><Chip label={historyRow.HUID} filled color="error"/> </TableCell>
                      <TableCell><Chip label={historyRow.foodItemName} filled color="primary"/> </TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.tax}</TableCell>
                             <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                   {row.watageitems.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                        <TableCell><Chip label={historyRow.HUID} filled color="error"/> </TableCell>
                      <TableCell><Chip label={historyRow.foodItemName} filled color="primary"/> </TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.tax}</TableCell>
                             <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.orderDetails.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                        <TableCell><Chip label={historyRow.HUID} filled color="error"/> </TableCell>
                      <TableCell>{
                      
                      match == historyRow.type ?
                      <Chip label={historyRow.foodItemName} filled/>
                       :   <Chip label={historyRow.foodItemName} filled color="primary"/> 
                      
                      
                      }</TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.tax}</TableCell>
                        <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.pieceitems.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                      
                      <TableCell><Chip label={historyRow.foodItemName} filled color="secondary" /> </TableCell>
                      <TableCell >-</TableCell>
                       <TableCell >{historyRow.quantity+"PCS"}</TableCell>
                             <TableCell >{historyRow.foodItemPrice}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.fancyitems.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                      <TableCell><Chip label={historyRow.foodItemName} filled color="secondary"/> </TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.quantity+"PCS"}</TableCell>
                             <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </Box>
          
              </Grid>
               <Grid item xs={6} md={6}>
 <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History-(Old Gold and Silver)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  
                    <TableCell>Date</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell >Item Weight</TableCell>
                     
                      <TableCell >Wastage</TableCell>
                       <TableCell >Rate</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.oldorderDetails.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell>
                        {historyRow.salesdate}
                      </TableCell>
                      <TableCell>{
                      
                      oldmatch == historyRow.type ?
                      <Chip label={historyRow.foodItemNames} filled/>
                       :   <Chip label={historyRow.foodItemNames} filled color="primary"/> 
                      
                      
                      }</TableCell>
                      <TableCell >{historyRow.foodItemPrices}</TableCell>
                       <TableCell >{historyRow.quantitys}</TableCell>
                        <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotals)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            
              </Grid>
               <Grid item xs={6} md={6}>
<Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History-(Fancy Item)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell >Item Weight</TableCell>
                     <TableCell >Rate</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.fancyitems.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                      <TableCell>{historyRow.foodItemName}</TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.rate}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
              </Grid>
               <Grid item xs={6} md={6}>
<Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History-(Piece Item)
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell >Item Rate</TableCell>
                     <TableCell >quantity</TableCell>
                    <TableCell >Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.pieceitems.map((historyRow) => (
                    <TableRow key={historyRow.salesdate}>
                      <TableCell >
                        {historyRow.salesdate}
                      </TableCell>
                      <TableCell>{historyRow.foodItemName}</TableCell>
                      <TableCell >{historyRow.foodItemPrice}</TableCell>
                       <TableCell >{historyRow.quantity}</TableCell>
                      <TableCell>{NumberFormat(historyRow.subtotal)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
              </Grid>
            </Grid>
            
              
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    orderNumber: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    mobile: PropTypes.number.isRequired,
    hireDate:PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        foodItemName: PropTypes.string.isRequired,
        foodItemPrice: PropTypes.string.isRequired,
        salesdate: PropTypes.string.isRequired,
        tax: PropTypes.string.isRequired
      }),
    ).isRequired,
   
  }).isRequired,
};

const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
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
    searchInput: {
        marginLeft: useTheme().spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: useTheme().spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function History() {

    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [open, setOpen] = useState(false);
const classes = useStyles();
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.STANDARDGST).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])
let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey])
  return (
      <>
       <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search  Customer" />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>

    <TableContainer component={Paper} style={{ minHeight: "1000px" }}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
             <TableCell>Image</TableCell>
            <TableCell>OrderId</TableCell>
             <TableCell>Date</TableCell>
             <TableCell >Name</TableCell>
            <TableCell>Mobile</TableCell>
           <TableCell>City</TableCell>
           <TableCell>GTotal</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {searchList.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
