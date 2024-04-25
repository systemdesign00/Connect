import React, { useState, useEffect ,useRef} from 'react'
import { Link, useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import { Grid } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import ReactToPrint from 'react-to-print';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green ,blue} from '@mui/material/colors';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Estimate from '../../img/sinestimate.png';
import {NumberFormat} from '../../Services/NumberFormat';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Divider  from '@mui/material/Divider';
import './style.css'
import { Button } from '@mui/material';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: useTheme().spacing(0.2)
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
        '& .MuiTableCell-root': {
            border: 'none'
        }
    },
    table: {
        '& thead th': {
            fontWeight: '600',
           //color: useTheme().palette.primary.main,
            backgroundColor: useTheme().palette.primary.light,
        },
       /* '& tbody td': {
            fontWeight: '300',
        }, */
        '& tbody tr:hover': {
            //backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
       /* '& .MuiTableCell-root': {
            border: 'none'
        } */
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


export default function Read() {

 const classes = useStyles();
    const {id} = useParams()
    const navigate = useNavigate()
    const [Data,setdata] = useState([])

    useEffect(() => {
        axios.get('https://serdb.onrender.com/api/Gsestimate/'+id)
        .then(res => setdata(res.data))
        .catch(err => console.log(err))
    }, [])

    const componentRef = useRef();

     var resultpcs = 0
  var resultpcs = Data?.pieceitems?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  Data?.watageitems?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    var resultadd =  Data?.addorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
       var stockresultadd =  Data?.stockaddorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  Number(Data?.fancyitems?.reduce((total, currentValue) => total = total + Number(currentValue.subtotal),0));
  var result = 0
  var resultpcss = 0
  var results = Data?.orderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0
  var oldresultsilver = 0
  var addpercent = Data?.orderPercent?.reduce((total, currentValue) => total = total + currentValue.subtotal,0)
  var newitem = Data?.orderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + Number(resultfancy) + resultpcs + Number(resultadd) + Number(stockresultadd) + Number(addpercent);
  var oldsilver = Data?.oldorderDetailsilver?.reduce((total, currentValue) => total = total + currentValue.subtotals,0)  
  var news = Data?.oldorderDetails?.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + Number(oldsilver)          
  return (
      <>
         <Button className={`${classes.rootbutton}`}
                        color="info"
                        style={{  backgroundColor: 'lightblue'}} 
                       // onClick={handleClickQuery}
                        >
                           
                        <ReactToPrint
                        trigger={() =><LocalPrintshopOutlinedIcon  />}
                        content={() => componentRef.current}/>
                    </Button>
     <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  //style={{ minHeight: '100vh' }}
  ref={componentRef}
>
 <Box width='794px' height="800px" className="watermark">
    <img src={Estimate} height="20%" width="100%" /> 
          <Box height='50px'>

          </Box>
          <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
                  <TableHead>
                      <TableRow>
                          <TableCell></TableCell>
                          <TableCell>{Data.fullName}</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>{Data.hireDate}</TableCell>
                      </TableRow>
                  </TableHead>
              </Table>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
                  <TableHead>
                      <TableRow>
                          <TableCell sx={{ color: 'blue' }}>Item</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Qty</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Weight</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Wastage</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>+Rate</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Debit</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Credit</TableCell>
                          <TableCell sx={{ color: 'blue' }}>Net Balance</TableCell>
                      </TableRow>
                  </TableHead>

                  <TableBody>

                      {Data?.orderPercent?.map((item, idx) => (
                          //totalweigth = Number(addorderedFoodItems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>{item.tax}</TableCell>

                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                      {Data?.addorderDetails?.map((item, idx) => (
                         // wastageweight = Number(ordereditems.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}</TableCell>

                              <TableCell>{item.tax}</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell> {NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                      {Data?.watageitems?.map((item, idx) => (
                          //totalweigthpercent = Number(orderedFoodItemspercent.reduce((total, currentValue) => total = Number(total + currentValue.quantity), 0)),
                      <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.foodItemPrice}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>{item.rate}</TableCell>
                              <TableCell> { item.tax + '%'}</TableCell>
                              <TableCell>
                              { NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                      {Data?.orderDetails?.map((item, idx) => (
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemName}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                                 <TableCell>{item.foodItemPrice}</TableCell>
                              <TableCell>-</TableCell>
                                <TableCell>{item.rate}</TableCell>
                           

                               <TableCell>{item.tax}</TableCell>
                              <TableCell>{NumberFormat(Math.round(item.subtotal))}</TableCell>
                              <TableCell>-</TableCell>
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                       {Data?.fancyitems?.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                  <TableCell >{item.quantity}</TableCell>
              <TableCell>{item.foodItemPrice}</TableCell>
              <TableCell >-</TableCell>
               <TableCell >{item.rate}</TableCell>
                  <TableCell >-</TableCell>

                      
              <TableCell >   
                 { 
NumberFormat(Math.round(item.subtotal))
                                         }                           
</TableCell>
            <TableCell >-</TableCell>
              <TableCell >-</TableCell>
            </TableRow>
          ))}
          {Data?.pieceitems?.map((item,idx) => (
            <TableRow key={item.id}>
              <TableCell >{item.foodItemName}</TableCell>
                   <TableCell >{item.quantity}</TableCell>
                    <TableCell >-</TableCell>
                     <TableCell >-</TableCell>
              <TableCell >{item.foodItemPrice}</TableCell>
               
               <TableCell >-</TableCell>
               <TableCell >{NumberFormat(Math.round(item.subtotal)) }</TableCell>
               <TableCell >-</TableCell>
                <TableCell >-</TableCell>
            </TableRow>
          ))}
                      {Data?.oldorderDetails?.map((item, idx) => (
                          //totalweigth = orderedFoodItems.reduce((total, currentValue) => total = total + currentValue.quantity,0), 
                          <TableRow key={item.id}>
                              <TableCell>{item.foodItemNames}</TableCell>
                               <TableCell>-</TableCell>
                              <TableCell>{item.foodItemPrices}</TableCell>
                               <TableCell>{item.quantitys}</TableCell>
                            
                              <TableCell>{item.rate}</TableCell>
                                 <TableCell>-</TableCell>
                                    <TableCell>-</TableCell>
                              <TableCell>
                                
                                   { NumberFormat(Math.round(item.subtotals))}</TableCell>
                             
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}


                      {Data?.oldorderDetailsilver?.map((item, idx) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.foodItemNames}</TableCell>
                               <TableCell>-</TableCell>
                              <TableCell>{item.foodItemPrices}</TableCell>
                               <TableCell>{item.quantitys}</TableCell>
                            
                              <TableCell>{item.rate}</TableCell>
                                 <TableCell>-</TableCell>
                                    <TableCell>-</TableCell>
                              <TableCell>
                                
                                   { NumberFormat(Math.round(item.subtotals))}</TableCell>
                           
                              <TableCell>-</TableCell>
                          </TableRow>
                      ))}
                       </TableBody>
              </Table>
          

          <Divider/>


       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
       
        <TableBody>
          
              <TableRow >
               
  <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}> {"Cash :" +NumberFormat((Number(Data.gCash)))}</TableCell>
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
  }}>Net Value</TableCell>
                
              <TableCell sx={{
    color: 'black',
    fontWeight: "600"
  }} >{NumberFormat(Math.round(newitem))}</TableCell>
          <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Math.round(news))}</TableCell> 

  <TableCell sx={{
    
color: 'black',
fontWeight: "600"
  }}>{NumberFormat(Data.gTotal )}</TableCell>
            </TableRow>

              <TableRow >
              
          <TableCell sx={{color: 'blue',
fontWeight: "600"
  }}>
    {"Online :"+ NumberFormat(Number(Data.onlinecash))}
  
  </TableCell>
    <TableCell></TableCell>
     <TableCell></TableCell>
            <TableCell></TableCell>
 <TableCell></TableCell>
  <TableCell></TableCell>
                          <TableCell></TableCell>
 <TableCell></TableCell>
         <TableCell    sx={{

    color: 'black',
    fontWeight:"600",

  }}>Net Cash</TableCell>
                
              
           {
           
  Math.sign((Data.gTotal - (Number(Data.gCash) + Number(Data.onlinecash)) + (Number(Data.debitcash)) )) === -1 ? 
          <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(Data.debitcash)))}</TableCell> :
            <TableCell  sx={{color: 'green',
fontWeight: "600"
  }}>{NumberFormat( (Number(Data.debitcash)))}</TableCell>
  
}

    
               
            {
  Math.sign((Data.gTotal - (Number(Data.gCash) + Number(Data.onlinecash)) + (Number(Data.debitcash)) )) === 1 ? 
          <TableCell   sx={{color: 'red',
fontWeight: "600"
  }}>
    {NumberFormat((Number(Data.gCash) + Number(Data.onlinecash))  )}

  </TableCell>
   :
            <TableCell  sx={{color: 'red',
fontWeight: "600"
  }}>{NumberFormat((Number(Data.gCash) + Number(Data.onlinecash))  )}</TableCell>
}


           </TableRow>
           
        </TableBody>
       
      </Table>


                           
             

          </TableContainer>




      </Box>
      </Grid>
      {/*
      <div className='container'>

              <div className='container p-5'>
                  <p>{Data.id}</p>
                  <p>{Data.fullName}</p>
                  <p>{Data.city}</p>
                  <p>{Data.mobile}</p>


                  {Data?.orderPercent?.map(row => (
                      <>
                          <p>{row.salesdate}</p>
                          <p>{row.foodItemName}</p>
                          <p>{row.foodItemPrice}</p>
                      </>
                  ))}
                  <Link to="/">Back</Link>
              </div>


          </div> */}
          
          </>
  )
}
