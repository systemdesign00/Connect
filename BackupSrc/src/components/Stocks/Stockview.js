import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { List, ListItemText, ListItem, ListItemSecondaryAction, } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';

import PaidOutlinedIcon  from '@mui/icons-material/PaidOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green ,blue} from '@mui/material/colors';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Notification from "../../layouts/Notification";
import { styled } from '@mui/material/styles';

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
    }
}))



export default function Stockview(props,initialFValues,initialFValuesold) {
    const classes = useStyles();

  
  
const { values, setValues } = props;
  
    let orderedFoodItems = values.orderDetails;
  

    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

  
    
     {/* const update = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderDetails[idx];
        foodItem.itemname = data.itemname
           foodItem.size = data.size
              foodItem.weight = data.weight
             
      foodItem.subtotal = data.subtotal
        setValues({...x});
        setIsEditing(false)
  
      }
    */}


 
       

  
const [oldListVisibility, setOldListVisibility] = useState(false);
const [silverListVisibility, setsilverListVisibility] = useState(false);
const [oldsilverListVisibility, setOldsilverListVisibility] = useState(false);

const openListOfOld = () => {
        setOldListVisibility(true);
    }

const openListOfOldsilver = () => {
   setOldsilverListVisibility(true);
}
const openListsilver = () => {
        setsilverListVisibility(true);
    }
const [orderListVisibility, setOrderListVisibility] = useState(false);
const openListOfOrders = () => {
        setOrderListVisibility(true);
    }
       const { recordForEdit } = props;
    

    const [foodItems, setFoodItems] = useState([]);

  
    useEffect(() => {

        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                //setSearchList(res.data);
            })
            .catch(err=>console.log(err))


    }, [])


useEffect(() => {
        if (recordForEdit != null)
            setData({
                ...recordForEdit,
                
            })
           
    }, [recordForEdit])
   
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
  
    const addFoodItem = foodItem => {
        
        
      
        let x = {
            id: generateOrderNumber(), 
            orderDetailId: 0,
          
            itemname: foodItem.itemname ,
            size:foodItem.size,
            weight:Number(foodItem.weight),
            subtotal:0
        
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
      
    }
    
    initialFValues = {
        id: '',
        //tagId:generateOrderNumber(),
      
        itemname: '',
        weight:'',
        size:'',
        tcount:'',
        subtotal:Number()
    }
     
    const [foodItem, setData] = useState(initialFValues)

 

    

    const handleChange = (e) => {
        e.preventDefault()
       
       
    }
const [notify, setNotify] = useState({ isOpen: false })
 const [currentId, setCurrentId] = useState(0)
const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
        if (currentId != 0) {
            setData({
                ...orderedFoodItems.find(x => x.id == currentId)
            })
            
        }
     }, [currentId])
 

   
  
 
  var result = 0
  var results = 0
 

   const handleInputChange = e => {
        const { name, value } = e.target
        setData({
            ...foodItem,
            [name]: value
        })
    }
  return (
    
    <Grid container spacing={2}>
    
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar
    
    >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6"
         
          
        >
       NEW Items
        </Typography>
        <Grid
  container
  
  direction="column"
  
 
  
>

  <Grid >
      
           <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Itemname" name="itemname" id="itemname" value={foodItem.itemname} onChange={handleInputChange} />
               <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="size" name="size" id="size" value={foodItem.size} onChange={handleInputChange} />
                   <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Weight" name="weight" id="weight" value={foodItem.weight} onChange={handleInputChange} />
   <Button type="submit" variant="contained" size="small" onClick={e => addFoodItem(foodItem)} >Submit</Button>
  </Grid>   
   
</Grid> 
   <Badge badgeContent={orderedFoodItems.length} color="primary" > 
      <Tooltip title="Add Item"   arrow> 
      <QueryStatsOutlinedIcon />
         </Tooltip>
    </Badge>
        
   

<IconButton onClick={openListOfOrders}>
<img src="https://img.icons8.com/external-vectorslab-flat-vectorslab/40/000000/external-gold-bar-project-management-and-web-marketing-vectorslab-flat-vectorslab.png"/>
       
 
</IconButton>
    </Toolbar>

  
      <TableContainer sx={{ maxHeight: 470 }}>
        <Table stickyHeader size="small" aria-label="a dense table" className={classes.table}> 
         <TableHead >
                            <TableRow>
                            
                                <TableCell>Tag Id</TableCell>
                                   <TableCell>Item Name</TableCell>
                                <TableCell>Size</TableCell> 
                                   <TableCell>Weight</TableCell>
                                 <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
          <TableBody >
             {orderedFoodItems.length == 0 ?
            <>
            <List
      sx={{ width: '380%', bgcolor: 'background.paper' }}
      
    >
            <ListItem>
                <ListItemText
                  primary="No Items"

                  primaryTypographyProps={{
                    style: {
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }
                  }} />
              </ListItem>
    </List>
</>
                :
            orderedFoodItems.map((item ,idx) => {
          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.weight,0);           
          result = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) - values.discou;           
                return (
                    <TableRow key={idx} >
                       
                                        <TableCell>
                                         
                                
              
                 <Div >{item.id}</Div>
           
                                        </TableCell>
                                        <TableCell >
                                          
                           <Div >{item.itemname}</Div>
                                              
                                     
                                        </TableCell>
                  
                                          <TableCell >
                                                           
                           <Div >{item.size}</Div>
            
                                           
                                        </TableCell>
                                              
                                       <TableCell>
                              
 
         
 <Div >{item.weight} g </Div>
                                         
                                       </TableCell>

                                        <TableCell >
                                          {
                                             isEditing === idx ? 
                 
                                          <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               //</ThemeProvider>onClick={(e)=>update(idx)}
                                               >
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentId(item.id) 
                                              setIsEditing(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItem(idx, item.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}
              <TableRow>
            <TableCell rowSpan={3} />
       <TableCell colSpan={2}>SubTotal</TableCell>
            <TableCell >${results}</TableCell>
          </TableRow>
          
          
           
          
          </TableBody>
        </Table>
      </TableContainer>
     
              <Notification
                {...{ notify, setNotify }} />
   
            
    </Paper>
    </Grid>

   
  );
}
