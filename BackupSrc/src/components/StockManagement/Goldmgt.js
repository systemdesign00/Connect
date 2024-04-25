import React, {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {InputAdornment ,TextField,Toolbar,Grid} from '@mui/material';
import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import Badge from '@mui/material/Badge';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from "react-router-dom";
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { Search } from "@mui/icons-material";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import useTable from '../Inventory_non/Items/Occurance/useTables';
import { styled } from '@mui/material/styles';
import { PRIMARY_URL ,createAPIEndpoint, ENDPIONTS} from '../../api';
import { useForm } from '../Inventory_non/Items/Occurance/useForm';
import * as userService from "../../Services/userService";
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

 


export default function ChainList() {
 
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
        createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).fetchAll()
            .then(res => {
              
                setData(res.data)
            })
            .catch(err => console.log(err))
}, [])
 
  const FetchStk=()=>{
       createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).fetchAll()
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
      createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).primaryfetchAllsilveritems()
   
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
            createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).primarycreatesilveritem(values)
          
          
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
let countpcs = findOcc(datas(), key).filter(person => person.itemName === person.itemName).reduce((total, currentValue) => total = Number(total + Number(currentValue.occurrence)),0);
let countwt =  datas().filter(person => person.itemName === person.itemName).reduce((total, currentValue) => total = Number(total + Number(currentValue.itemWeight)),0).toFixed(3)
let countpcss =  datas().filter(person => person.itemName === person.itemName).reduce((total, currentValue) => total = Number(total + Number(currentValue.itemName)),0).toFixed(3)
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
&nbsp;&nbsp;
<Grid container spacing={2} columns={16}>
  <Grid item xs={8}>
  <Box fontWeight="fontWeightBold" fontSize={16} color="red">NET WEIGHT: {countwt}G</Box>

  </Grid>
  <Grid item xs={8}>
  <Box fontWeight="fontWeightBold" fontSize={16} color="blue">NET PCS: {countpcs}</Box>
  </Grid>
</Grid>
       </Toolbar>
     
      <Table className={styles.table}>
        <TblHead />

        <TableBody>
          {findOcc(datas(), key).map(users => (
            <TableRow key={users.id}>
              
            
        
          {
    equ ===  users.occurrence ?   <TableCell sx={{background:'red'}}>
    <Box fontWeight="fontWeightBold" fontSize={16}>{users.itemName}</Box>
    </TableCell> :
     <TableCell >
      <Box fontWeight="fontWeightBold" fontSize={16}>{users.itemName}</Box>
      </TableCell>
}


{
    equ ===  users.occurrence ?   <TableCell sx={{background:'red'}}>
  
    </TableCell> :
     <TableCell >
  
      </TableCell>
}
       
           
             
              {
    equ ===  users.occurrence ?   <TableCell sx={{background:'red'}}>
    <Box fontWeight="fontWeightBold" fontSize={16}>{users.occurrence}</Box>
    </TableCell> :
     <TableCell >
      <Box fontWeight="fontWeightBold" fontSize={16}>{users.occurrence}</Box>
      </TableCell>
}

              {/*  <Box fontWeight="fontWeightBold" fontSize={16}>{
              equ === users.occurrence ? <Box fontWeight="fontWeightBold" color='red' fontSize={16}>{
                 users.occurrence  }</Box> : <Box fontWeight="fontWeightBold"  fontSize={16}>{
                 users.occurrence  }</Box> }</Box>*/}
            

{
    equ ===  users.occurrence ?   <TableCell sx={{background:'red'}}>
    <Box fontWeight="fontWeightBold" fontSize={16}>{
getOccurrencewt(datas(),users.itemName)}G</Box>
    </TableCell> :
     <TableCell >
   <Box fontWeight="fontWeightBold" fontSize={16}>{
getOccurrencewt(datas(),users.itemName)}G</Box>
      </TableCell>
}
 


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
