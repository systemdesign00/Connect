import React, {useEffect, useState} from 'react';
import { roundTo2DecimalPoint,roundTo2DecimalPoints } from "../../../../utils/index";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {InputAdornment , Container,Button, TextField, IconButton ,Typography,Toolbar} from '@mui/material';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';

import Badge from '@mui/material/Badge';
import TableCell from '@mui/material/TableCell';
import Modal from '@mui/material/Modal';
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

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { Search } from "@mui/icons-material";
import Popup from '../../../../layouts/Popup';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Grid } from '@mui/material';

import useTable from './useTables';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
//import { FormControl } from '@material-ui/core';
//import { FormControlLabel } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { PRIMARY_URL ,createAPIEndpoint, ENDPIONTS} from '../../../../api';
import { useForm, Form } from './useForm';
import Input from './Input';
import * as userService from "../../../../Services/userService";
import FullPopup from '../../../../layouts/FullPopup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { red, green ,blue} from '@mui/material/colors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  `}
`;
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

 


export default function OccuranceItem() {
 
const styles= useStyles();
 const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
const [orderListVisibility, setOrderListVisibility] = useState(false);
const [orderListVisibilityEdit, setOrderListVisibilityEdit] = useState(false);

const [orderListVisibilityEdits, setOrderListVisibilityEdits] = useState(false);
const [orderListVisibilityocc, setOrderListVisibilityocc] = useState(false);
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

    const openListOfOrdersOcc = () => {
        setOrderListVisibilityocc(true);
    }
const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' ,variant:''})
  const [data, setData]=useState([]);
  

  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })


  const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headCellssilveritemocc);

const [displaysilverstk, setdisplaysilverstk] = useState([]);

useEffect(() => {
        createAPIEndpoint(ENDPIONTS.SDGOLDSTOCK).fetchAll()
            .then(res => {
              
                setData(res.data)
            })
            .catch(err => console.log(err))
}, [])
 
  const FetchStk=()=>{
       createAPIEndpoint(ENDPIONTS.SDGOLDSTOCK).fetchAll()
            .then(res => {
              
                setdisplaysilverstk(res.data)
            })
            .catch(err => console.log(err))
  }
    
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
      createAPIEndpoint(ENDPIONTS.SDGOLDSTOCK).primaryfetchAllsilveritems()
   
    .then(response=>{
      setData(response.data);
    })
  }


        
    
  

const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);



    const openListOfOrdersFull = () => {
        setOrderListVisibilityFull(true);
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
        if ('itemName' in fieldValues)
               temp.itemName = fieldValues.itemName ? "" : "This field is required!"
        if ('itemType' in fieldValues)
            temp.itemType = fieldValues.itemType ? "" : "This field is required!"
         if ('itemWeight' in fieldValues)
            temp.itemWeight = fieldValues.itemWeight ? "" : "This field is required!"
      
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
     const {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        resetForm
    } = useForm(userService.initialitems, true, validate);
const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            createAPIEndpoint(ENDPIONTS.SDGOLDSTOCK).primarycreatesilveritem(values)
          
          
    .then(response=>{
      setData(data.concat(response.data))
      console.log(response.data)
      
      setOrderListVisibility(false);
      resetForm()
      FetchStk()
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

  
const reset=()=>{
  document.getElementById("create-course-form").reset();
}

 
 const edited = "Pending";
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
 var stk =0
var silverstk = displaysilverstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
 stk = datas().reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0); 
values.joins = values.itemWeight + "-" + "["+values.itemName+"]" 

const findOcc = (arr, key) => {
  let arr2 = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
}
  let equ = 1
let keys = "itemType"
let key = "itemName"
//console.log(findOcc(datas(), key))
 const [openm, setOpenm] = React.useState(false);
  const handleOpenm = () => setOpenm(true);
  const handleClosem = () => setOpenm(false);
  let mat = 'Chain'
let newt =  findOcc(datas(), key).map((users) => users.itemName); 
let nets = datas().reduce((total, currentValue) => "Chain" === "Chain " ?
total = Number(total + Number(currentValue.itemWeight)) : total = Number(total + Number(currentValue.itemWeight)),0); 
const  getOccurrencewt = (array, value) =>{
  return array.filter((v) => (v.itemName === value)).reduce((total, currentValue) => total = Number(total + Number(currentValue.itemWeight)),0).toFixed(3);
}  
const  getOccurrencecount = (array, value) => {
  return array.filter((v) => (v.itemName === value)).length;
}




return (

       <>
       
     <ThemeProvider theme={theme} >
      <CssBaseline />
      <Toolbar>

<TextField
  label="Search Records"
  variant="outlined"
  className={styles.searchInput}
  InputProps={{
    startAdornment: (<InputAdornment position="start">
    <Search onClick={openListOfOrdersOcc} />
    </InputAdornment>)
  }}
  onChange={handleSearch}
  //onChange={filterBySearch}
  />
{/* {getOccurrencewt(datas(), "Earring 1G")} ||
  {getOccurrencecount(datas(), "Earring 1G")} ||
  {getOccurrencewt(datas(), "Chain lotus 4G")} ||
{getOccurrencecount(datas(), "Chain lotus 4G")} */ }
       </Toolbar>
     
      <Table className={styles.table}>
        <TblHead />

        <TableBody>
          {findOcc(datas(), key).map(users => (
            <TableRow key={users.id}>
              
            
          <TableCell><Box fontWeight="fontWeightBold" fontSize={16}>{users.itemName}</Box></TableCell>
           <TableCell></TableCell>
              <TableCell ><Box fontWeight="fontWeightBold" fontSize={16}>{
              equ === users.occurrence ? <Box fontWeight="fontWeightBold" color='red' fontSize={16}>{
                 users.occurrence  }</Box> : <Box fontWeight="fontWeightBold"  fontSize={16}>{
                  users.occurrence  }</Box> }</Box></TableCell>
<TableCell><Box fontWeight="fontWeightBold" fontSize={16}>{
getOccurrencewt(datas(),users.itemName)}G</Box></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    
   </ThemeProvider>
        </>
     

    
  );
}

{
  /*

  const [Earring1G, setEarring1G] =  useState(employees);


const filterBySearch = (event) => {
  // Access input value
  const query = event.target.value;
  // Create copy of item list
  var updatedList = [...employees];
  // Include all elements which includes the search query
  updatedList = updatedList.filter((item) => 
  {  return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
  // Trigger render with updated values
  setEarring1G(updatedList);
};

   <Table className={styles.table}>
        <TblHead />
  <TableBody>
 {employees.map((item, index) => (
  <TableRow key={index}>
  <TableCell><Box fontWeight="fontWeightBold" fontSize={16}>{item.fname}</Box></TableCell>
  <TableCell></TableCell>
  <TableCell ><Box fontWeight="fontWeightBold" fontSize={16}>{
  equ === 1 ? <Box fontWeight="fontWeightBold" color='red' fontSize={16}>{
    item.ct  }</Box> : <Box fontWeight="fontWeightBold"  fontSize={16}>{
      item.ct}</Box> }</Box></TableCell>
 <TableCell><Box fontWeight="fontWeightBold" fontSize={16}>{item.wt}</Box></TableCell>
</TableRow>
          ))}
          
        </TableBody>
      </Table>
      <TblPagination />

      
 <Table className={styles.table}>
        <TblHead />

        <TableBody>
          {findOcc(datas(), key).map(users => (
            <TableRow key={users.id}>
              
            
          <TableCell><Box fontWeight="fontWeightBold" fontSize={16}>{users.itemName}</Box></TableCell>
           <TableCell></TableCell>
              <TableCell ><Box fontWeight="fontWeightBold" fontSize={16}>{
              equ === users.occurrence ? <Box fontWeight="fontWeightBold" color='red' fontSize={16}>{
                 users.occurrence  }</Box> : <Box fontWeight="fontWeightBold"  fontSize={16}>{
                  users.occurrence  }</Box> }</Box></TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>

      const employees = [
  {
    id: 1,
    fname: "EARRING 1G",
    ct: getOccurrencecount(datas(), "EARRING 1G"),
    wt:getOccurrencewt(datas(), "EARRING 1G")
  },
  {
    id: 2,
    fname: "EARRING 2G",
    ct: getOccurrencecount(datas(), "EARRING 2G"),
    wt: getOccurrencewt(datas(), "EARRING 2G"),
  },
  {
    id: 3,
    fname: "EARRING 3G",
    ct: getOccurrencecount(datas(), "EARRING 3G"),
    wt: getOccurrencewt(datas(), "EARRING 3G"),
  },
  {
    id: 4,
    fname: "EARRING 4G",
    ct: getOccurrencecount(datas(), "EARRING 4G"),
    wt: getOccurrencewt(datas(), "EARRING 4G"),
  },
  {
    id: 6,
    fname: "EARRING 6G",
    ct: getOccurrencecount(datas(), "EARRING 6G"),
    wt: getOccurrencewt(datas(), "EARRING 6G"),
  },
  {
    id: 8,
    fname: "EARRING 8G",
    ct: getOccurrencecount(datas(), "EARRING 8G"),
    wt: getOccurrencewt(datas(), "EARRING 8G"),
  },
  {
    id: 9,
    fname: "JUMMIKKI 2G",
    ct: getOccurrencecount(datas(), "JUMMIKKI 2G"),
    wt: getOccurrencewt(datas(), "JUMMIKKI 2G"),
  },
  {
    id: 10,
    fname: "JUMMIKKI 3G",
    ct: getOccurrencecount(datas(), "JUMMIKKI 3G"),
    wt: getOccurrencewt(datas(), "JUMMIKKI 3G"),
  },
  {
    id: 11,
    fname: "JUMMIKKI 4G",
    ct: getOccurrencecount(datas(), "JUMMIKKI 4G"),
    wt: getOccurrencewt(datas(), "JUMMIKKI 4G"),
  },
  {
    id: 12,
    fname: "JUMMIKKI 6G",
    ct: getOccurrencecount(datas(), "JUMMIKKI 6G"),
    wt: getOccurrencewt(datas(), "JUMMIKKI 6G"),
  },
  {
    id: 13,
    fname: "JUMMIKKI 8G",
    ct: getOccurrencecount(datas(), "JUMMIKKI 8G"),
    wt: getOccurrencewt(datas(), "JUMMIKKI 8G"),
  },
  {
    id: 14,
    fname: "CASTING EARRING 1G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 1G"),
    wt:getOccurrencewt(datas(), "CASTING EARRING 1G")
  },
  {
    id: 15,
    fname: "CASTING EARRING 2G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 2G"),
    wt: getOccurrencewt(datas(), "CASTING EARRING 2G"),
  },
  {
    id: 16,
    fname: "CASTING EARRING 3G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 3G"),
    wt: getOccurrencewt(datas(), "CASTING EARRING 3G"),
  },
  {
    id: 17,
    fname: "CASTING EARRING 4G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 4G"),
    wt: getOccurrencewt(datas(), "CASTING EARRING 4G"),
  },
  {
    id: 18,
    fname: "CASTING EARRING 6G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 6G"),
    wt: getOccurrencewt(datas(), "CASTING EARRING 6G"),
  },
  {
    id: 8,
    fname: "CASTING EARRING 8G",
    ct: getOccurrencecount(datas(), "CASTING EARRING 8G"),
    wt: getOccurrencewt(datas(), "CASTING EARRING 8G"),
  },
]

  */
}
