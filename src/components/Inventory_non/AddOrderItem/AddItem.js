import React, {useEffect, useState} from 'react';
//import './App.css';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {InputAdornment , Container,Button, TextField, IconButton ,Typography,Toolbar} from '@mui/material';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import Badge from '@mui/material/Badge';
import TableCell from '@mui/material/TableCell';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import UpdateDisabledOutlinedIcon from '@mui/icons-material/UpdateDisabledOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import SendTimeExtensionOutlinedIcon from '@mui/icons-material/SendTimeExtensionOutlined';
import { Autocomplete } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Select from '../../hooks/Select';
import RadioGroup from '../../hooks/RadioGroup';
import DatePicker from '../../hooks/DatePicker';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Search } from "@mui/icons-material";
import Popup from '../../layouts/Popup';
import Rating from '@mui/material/Rating';
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import Box from '@mui/material/Box';
//import { TableBody, TableCell ,TableHead ,TableRow} from '@material-ui/core';
import Check from '@mui/icons-material/Check';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Order from '../Order/index';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Notification from "../../layouts/Notification";
import useTable from './useTables';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
//import { FormControl } from '@material-ui/core';
//import { FormControlLabel } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { PRIMARY_URL ,createAPIEndpoint, ENDPIONTS} from '../../api';
import { useForm, Form } from './useForm';
import Input from './Input';
import * as userService from "../../Services/userService";
import FullPopup from '../../layouts/FullPopup';
import OrFo from '../Order/OrFo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { red, green ,blue} from '@mui/material/colors';

const Inputs = styled('input')({
  display: 'none',
});

const redTheme = createTheme({ palette: { primary: red } })
const greenTheme = createTheme({ palette: { primary: green } })
const blueTheme = createTheme({ palette: { primary: blue } })
const blackTheme = createTheme({ palette: { primary: blue } })

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



function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{userService.customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(2.5);
  }
  `}`;
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff3d47',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const useStyles = makeStyles((theme) => ({
 
  icons:{
    cursor: 'pointer'
  }, 
  adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },

  pageContent: {
    margin: useTheme().spacing(5),
    padding: useTheme().spacing(3),
    
},
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


table:{
  marginTop: useTheme().spacing(3),
  
  '& thead th': {
      fontWeight: '600',
      color: "#333996",
      backgroundColor: "#3c44b126",
  },
  '& tbody td': {
      fontWeight: '300',
  },
  '& tbody tr:hover': {
      backgroundColor: '#f4f5fd',
      cursor: 'pointer',
  },
  pageContent:{
      margin:useTheme().spacing(5),
      padding:useTheme().spacing(3)

  },
},

menuButton: {
  marginRight: useTheme().spacing(2),
},
title: {
  flexGrow: 1,
},
newButton: {
  position: 'absolute',
  right: '1px'
  
},
searchInput: {
  width: '65%'
},
background: {
  default: "#f4f5fd"
},



}));

 


export default function AddItem() {
   const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
       palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
    },
  },
      }),
    [], // [prefersDarkMode]
  );
const styles= useStyles();
 const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
const [orderListVisibility, setOrderListVisibility] = useState(false);
const [orderListVisibilityEdit, setOrderListVisibilityEdit] = useState(false);

const [orderListVisibilityEdits, setOrderListVisibilityEdits] = useState(false);
const openListOfOrders = () => {
        setOrderListVisibility(true);
        resetForm()
    }

const openListOfOrdersEdit = () => {
        setOrderListVisibilityEdit(true);
    }

    const openListOfOrdersEdits = () => {
        setOrderListVisibilityEdits(true);
    }
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' ,variant:''})
  const [data, setData]=useState([]);
  

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })


  const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCellsitems);




 
 
    
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.itemName.toLowerCase().includes(target.value))
                
        }
    })
}

  
const navigate = useNavigate();
  const Fetchuser=()=>{
      createAPIEndpoint(ENDPIONTS.ADDITEM).primaryfetchAll()
   
    .then(response=>{
      setData(response.data);
    })
  }

  const Createuser=async()=>{
      createAPIEndpoint(ENDPIONTS.BOOKS).primarycreate(values)
          
    .then(response=>{
      setData(data.concat(response.data))
      console.log(response.data)
      
      setOrderListVisibility(false);
      
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        severity: 'success',
        //variant:"filled"
    })
    })
        
    
  }

  const Updateuser=async()=>{
     createAPIEndpoint(ENDPIONTS.ADDITEM).primaryupdate(values.id,values)
   
    .then(response=>{
       Fetchuser();
      var dataNew=data;
       setOrderListVisibilityEdit(false);
       dataNew.forEach(users=>{
        if(values.id===users.id){
          users.itemName=values.itemName;
          users.itemType=values.itemType;
          users.itemquantity=values.itemquantity;
          users.itemWeight=values.itemWeight;
           users.itemSize=values.itemSize;
          users.imageSrc=values.imageSrc;
          users.joins=values.joins;
        }
      })
      setData(dataNew);
     setNotify({
        isOpen: true,
        message: 'Updated Successfully',
        severity:"info",
        //variant:"filled"

    })
    })
  }
const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);



    const openListOfOrdersFull = () => {
        setOrderListVisibilityFull(true);
    }
  {/*const Deleteuser=async()=>{
    await axios.delete(PRIMARY_URL+user.id)
    .then(response=>{
      setData(data.filter(users=>users.id!==user.id));
     setConfirmDialog(false)
      setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        severity: 'error',
        //variant:"filled"
    })
    })
  }*/}


  
  const  passcode = '1234';
 const onDelete = id => {
        setConfirmDialog(false)
       
       createAPIEndpoint(ENDPIONTS.ADDITEM).primarydelete(id)
                   .then(res => {
                   Fetchuser();
                resetForm()
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.', severity: 'error' }));
       
    
  }
  const EditOrRemove=(users)=>{
    setValues(users);
   openListOfOrdersEdit()
  }
const EditOrRemoves=(users)=>{
    setValues(users);
   openListOfOrdersEdits()
  }
  const [copySuccess, setCopySuccess] = useState('');

// your function to copy here

  const copyToClipBoard = async copyMe => {
    openListOfOrdersFull()
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };
  const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
               temp.itemName = fieldValues.itemName ? "" : "This field is required!"
        if ('mobile' in fieldValues)
            temp.itemWeight = fieldValues.itemWeight  ? "" : "Minimum 10 numbers required!"
      
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
     const {
        values,
        setValues,
        codes,
        setcodes,
        errors,
        setErrors,
        handleChange,
        handleChangecode,
        resetForm
    } = useForm(userService.initialadditems, true, validate);
const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            createAPIEndpoint(ENDPIONTS.ADDITEM).primarycreate(values)
          
    .then(response=>{
      setData(data.concat(response.data))
      console.log(response.data)
      
      setOrderListVisibility(false);
      
      setNotify({
        isOpen: true,
        message: 'Submitted Successfully',
        severity: 'success',
        //variant:"filled"
    })
    })
        }
    }
  useEffect( () =>{
    Fetchuser();
 },[])


 const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: userService.defaultImageSrc
            })
        }
    }
const resetImg = () =>{
  values.imageSrc = ''
}
  
const reset=()=>{
  document.getElementById("create-course-form").reset();
}

 
 const edited = "Pending";

  const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    let min = 1000;
    let max = 9999;
  const  getRandomNumber = () => Math.round(Math.random() * (max - min) + min).toString();

 values.joins = values.itemName+''+values.itemWeight +''+values.itemType;
 //values.customerId =values.fullName.charAt(0) + values.customerId;
  return (

       <>
          
     <ThemeProvider theme={theme} >
      <CssBaseline />
          < >
      <Toolbar>

        <TextField
          label="Search Item"
          variant="outlined"
          className={styles.searchInput}
          InputProps={{
            startAdornment: (<InputAdornment position="start">
              <Search onClick={openListOfOrdersFull} />
            </InputAdornment>)
          }}
          onChange={handleSearch} />

        <Button variant="outlined"
          size="small"
          onClick={openListOfOrders}
          color="primary" className={styles.newButton} startIcon={<AddTaskOutlinedIcon />}>
          Add New
        </Button>

      </Toolbar>
      <Table className={styles.table}>
        <TblHead />

        <TableBody>
          {datas().map(users => (
            <TableRow key={users.id}>
              <TableCell>
                  <StyledAvatar src={users.imageSrc} sx={{ bgcolor: 'grey'}}>
                   <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='primary'>
                               {users.itemName.charAt(0)}
                                </Box>
                  </StyledAvatar>
              
              </TableCell>
              <TableCell>{users.orderNumber}</TableCell>
              <TableCell >{users.itemName}</TableCell>
              <TableCell>{users.itemType}</TableCell>
              <TableCell>{users.itemWeight}</TableCell>
               <TableCell>{users.itemQuantity}</TableCell>
             <TableCell>{users.itemfiness}</TableCell>
             
               <TableCell>
                          <ThemeProvider theme={greenTheme}>
                                               
                                                <Button className={`${styles.roots}`} style={{ backgroundColor: "#cdffcd"}} 
                                         onClick={
                                         ()=>copyToClipBoard(users.itemName)
                                         }>
                                             
                                            
                                                
                                                <ReceiptLongTwoToneIcon  fontSize="small"/>
                                                </Button>
                                            </ThemeProvider>
                                             &nbsp;&nbsp;
                           <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${styles.roots}`} style={{ backgroundColor: "#ABD1FF"}} 
                                           onClick={() => EditOrRemove(users)}>
                                             
                                            
                                                
                                                <AutoFixHighOutlinedIcon  fontSize="small"/>
                                                </Button>
                                            </ThemeProvider>
                

                &nbsp;&nbsp;
                 <ThemeProvider theme={redTheme}>
                                                <Button className={`${styles.roots}`} style={{  backgroundColor: '#ffbfbf'}} 
                                             
                                                > <DeleteSweepTwoToneIcon  fontSize="small" onClick={() => {
                     setConfirmDialog({
                      isOpen: true,
                      //avatarimage:item.imageSrc,
                      title: 'Are you sure to delete this record?',
                       subTitle: 'Action Cannot be Reverted?' ,
                        onConfirm: () => { onDelete(users.id) }
                    });
                  } }  />
                                                </Button>
                                            </ThemeProvider>
                

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TblPagination />

    </>
    <Popup
      title="ADD Item"
      openPopup={orderListVisibility}
      setOpenPopup={setOrderListVisibility}>
 
         <Form onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
               <Input
                label="ItemCode"
                name="itemCode"
                fullWidth
                disabled
                   //error={errors.itemType}
                  value={values.id}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
              
     
 <TextField
                label="itemFiness"
                name="itemfiness"
                fullWidth
                  value={values.itemfiness}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
            
 <TextField
 disabled
                label="Item Quality"
                name="itemQuantity"
                fullWidth
                  value={values.itemQuantity}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
          <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
      </StyledBadge>
       
                          <label htmlFor="image-uploader">
        <Inputs accept="image/*"  onChange={showPreview} id="image-uploader" type="file"  />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                  </Stack> 
            </Grid>
            <Grid item xs={6}>
                <Input
                name="itemName"
                label="Item Name"
                fullWidth
                   error={errors.itemName}
                value={values.itemName}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

               <Input
                label="itemType"
                name="itemType"
                fullWidth
                   error={errors.itemType}
                  value={values.itemType}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
           <TextField
                label="Item Weight"
                name="itemWeight"
                fullWidth
                error={errors.itemName}
                  value={values.itemWeight}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
             
        
            

             

              <div>
                <Grid container spacing={2} >
  <Grid item > 
  
    <Button variant="contained"  startIcon={<SendTimeExtensionOutlinedIcon />}  type="submit">Submit</Button>
  </Grid>
  <Grid item >
     <Button variant="contained" startIcon={<RotateLeftOutlinedIcon />}  onClick={resetForm} >reset</Button>
  </Grid>
</Grid>
               
            
                
              </div>
            </Grid>
          </Grid>
        </Form>
      </Popup>
      <Popup
        title="Edit Item"
        openPopup={orderListVisibilityEdit}
        setOpenPopup={setOrderListVisibilityEdit}>

        <form className={styles.root} id="create-course-form">
             <Grid container>
            <Grid item xs={6}>
               <Input
                label="ItemCode"
                name="itemCode"
                fullWidth
                disabled
                   //error={errors.itemType}
                  value={values && values.id}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
              
     
 <TextField
                label="ItemFiness"
                name="itemfiness"
                fullWidth
                  value={values && values.itemfiness}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
            
 <TextField
 disabled
                label="Item Quality"
                name="itemQuantity"
                fullWidth
                  value={values && values.itemQuantity}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
          <Stack direction="row" alignItems="center" spacing={2}>
               <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
      <Avatar  src={values && values.imageSrc} sx={{ width: 50, height: 50 ,bgcolor: 'white'}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
      </StyledBadge>
       
                          <label htmlFor="image-uploader">
        <Inputs accept="image/*"  onChange={showPreview} id="image-uploader" type="file"  />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
                  </Stack> 
            </Grid>
            <Grid item xs={6}>
                <Input
                name="itemName"
                label="Item Name"
                fullWidth
                   error={errors.itemName}
                value={values && values.itemName}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

               <Input
                label="itemType"
                name="itemType"
                fullWidth
                   error={errors.itemType}
                  value={values && values.itemType}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>
           <TextField
                label="Item Weight"
                name="itemWeight"
                fullWidth
                error={errors.itemName}
                  value={values && values.itemWeight}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
             
        <div>
                <Button variant="contained" startIcon={<UpdateDisabledOutlinedIcon />} onClick={() => Updateuser()}>Update</Button>
               
              </div>
            </Grid>
          </Grid>
        </form>
      </Popup>
      <FullPopup
       openPopup={orderListVisibilityFull}
        setOpenPopup={setOrderListVisibilityFull}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      
   
    
<Order />

    </Container>
       
      
      </FullPopup>
      <Popup
        title="Customer Details"
        openPopup={orderListVisibilityEdits}
        setOpenPopup={setOrderListVisibilityEdits}>
  
        <Grid container spacing={30} >
             <Grid item xs="auto">
              <Div>{"Full Name : "}{values && values.fullName}</Div>
              <Div>{"City : "}{values && values.city}</Div>
  <Div>{"Gender : "}{values && values.gender}</Div>
     <Div>{"Rating : "}{<StyledRating
      name="highlight-selected-only"
     value={values.rating}
      IconContainerComponent={IconContainer}
      highlightSelectedOnly
      readOnly
    />}</Div>
           
            </Grid>
       <Grid item xs="auto">
              <Div>{"Mobile Number : "}{values && values.mobile}</Div>
              <Div>{"Status : "}{values && values.status}</Div>
               <Div>{"Balance : "}{"$"}{values && values.balance}{"/-"}</Div>
                <Div>{"Last Visited : "}{values && values.hireDate}</Div>
            

             
            </Grid>
          </Grid>
            <Div >{"Notes : "}{values && values.notes}</Div>
           <Grid  spacing={16} >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> <Grid container  spacing={2}>
  <Grid item xs="auto">
   <PersonAddAltOutlinedIcon color="primary"/>
  </Grid>
  <Grid item xs="auto">
 CUSTOMER INFO
  </Grid>
  
</Grid> </Typography>
        </AccordionSummary>
        <AccordionDetails>
         
        <Grid container spacing={30} >
             <Grid item xs="auto">
               <Avatar  src={values && values.imageSrc} variant="rounded" sx={{height:150,width:150}}>
             <img src='https://img.icons8.com/fluency/65/image.png'/>
      </Avatar>
              
              
            </Grid>
       <Grid item xs="auto">
              <Div>{"Mobile Number : "}{values && values.mobile}</Div>
              <Div>{"Status : "}{values && values.status}</Div>
               <Div>{"Balance : "}{"$"}{values && values.balance}{"/-"}</Div>
                <Div>{"Last Visited : "}{values && values.hireDate}</Div>
            

             
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
     </Grid>
      
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog} />
        <Notification
        notify={notify}
        setNotify={setNotify} />
        
        </ThemeProvider>
        </>
     

    
  );
}


