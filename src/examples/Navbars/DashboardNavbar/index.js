import React, {useEffect, useState} from 'react';
import Input from './Rates/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Form } from './Rates/useForm';
import * as userService from "../../../Services/userService";
import Notification from "../../../layouts/Notification";
import * as TownCity from "../../../Services/TownCity";
import useTable from './Rates/useTables';
import {InputAdornment,  TextField,TableBody, TableRow,TableCell,Badge,Rating,Autocomplete,Table} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { red, green ,blue} from '@mui/material/colors';
import { COLORS } from '../../../layouts/Colors';

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import UpdateDisabledOutlinedIcon from '@mui/icons-material/UpdateDisabledOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';



// react-router components
import { useLocation, Link,useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import './ca.css'
import { createAPIEndpoint, ENDPIONTS } from '../../.././api/index'
// @material-ui core components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
// Material Dashboard 2 React components
import Popup from 'layouts/Popup';
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { deepOrange, deepPurple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Moda from '../../../api/Moda';
import Wgold from '../../../Icons/wgold.png'
import Wsilver from '../../../Icons/wsilver.png'
import Reload from '../../../Icons/reload.png'
import Stack from '../../../Icons/stack.png'
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
import { FaPowerOff } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { Avatar, Button, Container,Grid } from "@mui/material";


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
       //fontSize:'40',
       fontWeight: '900',
      color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
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

  
function DashboardNavbar({ absolute, light, isMini }) {
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
   
    
    datas,

} = useTable(data, filterFn,userService.headCells);




 
 
    
 
  
const navigate = useNavigate();
  const Fetchuser=()=>{
      createAPIEndpoint(ENDPIONTS.RATES).primaryfetchAll()
   
    .then(response=>{
      setData(response.data);
    })
  }



  const Updateuser=async()=>{
     createAPIEndpoint(ENDPIONTS.RATES).primaryupdate(values.id,values)
   
    .then(response=>{
       Fetchuser();
      var dataNew=data;
       setOrderListVisibilityEdit(false);
       dataNew.forEach(users=>{
        if(values.id===users.id){
          users.goldname=values.goldname;
          users.gold=values.gold;
          users.goldpurename=values.goldpurename;
          users.goldpure=values.goldpure;
           users.silvername=values.silvername;
          users.silver=values.silver;
           users.silverpurename=values.silverpurename;
            users.silverpure=values.silverpure;
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
 


  const EditOrRemove=(users)=>{
    setValues(users);
   openListOfOrdersEdit()
  }
const EditOrRemoves=(users)=>{
    setValues(users);
   openListOfOrdersEdits()
  }



  const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
               temp.fullName = fieldValues.fullName ? "" : "This field is required!"
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required!"
      
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
        handleChangecode,
        resetForm
    } = useForm(userService.rateUpdate, true, validate);

  useEffect( () =>{
    Fetchuser();
 },[])


 
const resetImg = () =>{
  values.imageSrc = ''
}
  
const reset=()=>{
  document.getElementById("create-course-form").reset();
}

 
const styles= useStyles();

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const [sessionValue, setSessionValue] = useState('');
   useEffect(() => {
    // Retrieve the value from session storage
    const storedValue = sessionStorage.getItem('username'); // Replace 'yourKey' with your actual key
    setSessionValue(storedValue);
  }, []);
   const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch or set your user data
    const fetchData = async () => {
      // Fetch data from the API or set it as needed
      const response = await fetch('https://serdb.onrender.com/api/User', {
        method: 'GET',
      
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  // Define the condition for filtering (e.g., age greater than 30)
  const filterCondition = (user) => user.id === sessionValue;
  const filteredUsers = userData.filter(filterCondition);

 const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

    const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }
  };

const [displaypure, setdisplaypure] = useState([]);
  const [display, setdisplay] = useState([]);
const [displays, setdisplays] = useState([]);
const [displaysold, setdisplaysold] = useState([]);
  const [orderList, setOrderList] = useState([]);
   const [orderListpending, setOrderListpending] = useState([]);

    const [displaygold, setdisplaygold] = useState([]);
    
     const [displaysilver, setdisplaysilver] = useState([]);
     const [displaysilverstk, setdisplaysilverstk] = useState([]);

      useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ITEMS).fetchAll()
            .then(res => {
              
                setdisplaygold(res.data)
            })
            .catch(err => console.log(err))
  createAPIEndpoint(ENDPIONTS.SILVERITEMS).fetchAll()
            .then(res => {
              
                setdisplaysilver(res.data)
            })
            .catch(err => console.log(err))
  createAPIEndpoint(ENDPIONTS.FANCYITEMS).fetchAll()
            .then(res => {
              
                setdisplaysilverstk(res.data)
            })
            .catch(err => console.log(err))
    }, [])



     useEffect(() => {
       createAPIEndpoint(ENDPIONTS.ORDERITEM).fetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
       createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setOrderListpending(res.data)
            })
            .catch(err => console.log(err))
        createAPIEndpoint(ENDPIONTS.PURE).fetchAll()
            .then(res => {
              
                setdisplaypure(res.data)
            })
            .catch(err => console.log(err))


        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
            .then(res => {
              
                setdisplays(res.data)
            })
            .catch(err => console.log(err))

               
        createAPIEndpoint(ENDPIONTS.OLD_SILVER).fetchAll()
            .then(res => {
              
                setdisplaysold(res.data)
            })
            .catch(err => console.log(err))
    }, [])

const fetchallarea = () =>{
  createAPIEndpoint(ENDPIONTS.ITEMS).fetchAll()
            .then(res => {
              
                setdisplaygold(res.data)
            })
            .catch(err => console.log(err))
  createAPIEndpoint(ENDPIONTS.SILVERITEMS).fetchAll()
            .then(res => {
              
                setdisplaysilver(res.data)
            })
            .catch(err => console.log(err))

   createAPIEndpoint(ENDPIONTS.ORDERITEM).fetchAll()
            .then(res => {
              
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
            createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setOrderListpending(res.data)
            })
            .catch(err => console.log(err))
  createAPIEndpoint(ENDPIONTS.PURE).fetchAll()
            .then(res => {
              
                setdisplaypure(res.data)
            })
            .catch(err => console.log(err))


        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
            .then(res => {
              
                setdisplays(res.data)
            })
            .catch(err => console.log(err))

               
        createAPIEndpoint(ENDPIONTS.OLD_SILVER).fetchAll()
            .then(res => {
              
                setdisplaysold(res.data)
            })
            .catch(err => console.log(err))
            handleButtonClick()
}
const [oldListVisibility, setOldListVisibility] = useState(false);


const openListOfOld = () => {
        setOldListVisibility(true);
    }

var wgold = displaygold.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var wsilver = displaysilver.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var silverstk = displaysilverstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
const purerate = displaypure.map(item => (item.rate))
const rates =   display.map(item => (item.rate))
const Silver =   displays.map(item => (item.rate))
const silverpure =   displaysold.map(item => (item.rate))
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
           {filteredUsers.length > 0 ? (
        <>
          {filteredUsers.map((user) => (
            <Avatar alt="Remy Sharp" src={user.imageSrc} />
            ))}
        </>
      ) : (
        <p></p>
      )}
          
        </ListItemAvatar>
        <ListItemText
        
          primary={filteredUsers.length > 0 ? (
        <>
        
          {filteredUsers.map((user) => (
             <Typography variant="h6" gutterBottom>
         { user.fullName}
      </Typography>
     
            ))}
        </>
      ) : (
        <p></p>
      )}
          secondary={
            <React.Fragment>
              <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {filteredUsers.length > 0 ? (
        <>
          {filteredUsers.map((user) => (
     user.mobile
            ))}
        </>
      ) : (
        <p></p>
      )}
              </Typography>
        </Grid>
        <Grid item xs={6}>
       
              
       
        </Grid>
        <Grid item xs={6}>
       
               <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
    {filteredUsers.length > 0 ? (
        <>
          {filteredUsers.map((user) => (
      user.email
            ))}
        </>
      ) : (
        <p></p>
      )}
                 </Typography>
       
        </Grid>
        <Grid item xs={6}>
    
       
        </Grid>
        <Grid item xs={6}>
       <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
    {filteredUsers.length > 0 ? (
        <>
          {filteredUsers.map((user) => (
       user.city
            ))}
        </>
      ) : (
        <p></p>
      )}
                 </Typography>
        </Grid>
      </Grid>
    </Box>
             
            </React.Fragment>
          }
        />
            <ListItemText
         
          
        />
      </ListItem>
     <Divider/>
      <Container class="icons">
              <PeopleAltRoundedIcon color="inherit" />
               <VerifiedUserRoundedIcon color="inherit" />
             <KeyRoundedIcon color="inherit" />
            
        </Container>
     
    
      
    </List>
   
    
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });
const handleBackup = async () => {
    try {
      const response = await fetch('http://localhost:3002/backup', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Backup successful');
      } else {
        console.error('Backup failed');
      }
    } catch (error) {
      console.error('Error sending backup request:', error.message);
    }
  };
  return (
      <>
     
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              <MDBox pr={1}>
               <>
        
     <ThemeProvider theme={theme} >
      <CssBaseline />
          < >
     {datas().map(users => (
        
          <><Box sx={{ display: { xs: 'none', md: 'flex' } }}>
         <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial">
                <img src={Wgold} height="20" />{"24Karat =>" + users.goldpure}
        <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial">
         <img src={Wgold} height="20" />{"Gold =>" + users.gold}
           </Box>
         </Box>
         <MDBox sx={{ position: 'relative' }}>
           {loading && (
             <CircularProgress
               size={40}
               sx={{
                 color: 'white',
                 position: 'absolute',
                 top: '50%',
                 left: '50%',
                 marginTop: '-20px',
                 marginLeft: '-20px',
               }} />
           )}
           <IconButton
             disabled={loading}
             //onClick={handleBackup}
           >
             <img src={Reload} onClick={handleBackup} width="35" />
           </IconButton>
         </MDBox>
         <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial">
            <img src={Wsilver} height="20" /> {"Silver_Pure =>" + users.silverpure}
       <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial">
               <img src={Wsilver} height="20" />{"Silver =>" + users.silver}
           </Box>
         </Box>

         <IconButton
         size="small"
         disableRipple
         color="inherit"
         //sx={navbarIconButton}
         onClick={() => EditOrRemove(users)}
       >
           <img src={Stack} height="30" onClick={() => EditOrRemove(users)} />
         </IconButton>
       </Box>
       
       </>
      
    
         
          ))}
     
   
     

    </>
   
      <Popup
        title="UPDATE RATES"
        openPopup={orderListVisibilityEdit}
        setOpenPopup={setOrderListVisibilityEdit}>

        <form className={styles.root} id="create-course-form">
          <Grid container>
            <Grid item xs={6}>
               <TextField
                label="DESCRIPTION"
                name="goldpurename"
                fullWidth
                onChange={handleChange}
                value={values && values.goldpurename}
                   InputProps={{
                      readOnly:true,
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />

              <TextField
                name="goldname"
                label="DESCRIPTION"
                fullWidth
                onChange={handleChange}
                value={values && values.goldname} 
                  InputProps={{
                    readOnly:true,
            startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />

              <TextField
                label="DESCRIPTION"
                name="silverpurename"
                fullWidth
                onChange={handleChange}
                value={values && values.silverpurename}
                   InputProps={{
                    readOnly:true,
            startAdornment: <InputAdornment position="start"><ThumbsUpDownOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />
            <TextField
                label="DESCRIPTION"
                name="silvername"
                fullWidth
                onChange={handleChange}
                value={values && values.silvername}
                   InputProps={{
                        readOnly:true,
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:"#9678b6"}}/></InputAdornment>,
          }} />
         

        
            </Grid>
            <Grid item xs={6}>
          

 <TextField
                label="22KARAT RATE"
                name="goldpure"
                fullWidth
                  value={values && values.goldpure}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
                 <TextField
                label="GOLD RATE"
                name="gold"
                fullWidth
                onChange={handleChange}
                 value={values && values.gold}
                InputProps={{
            startAdornment: <InputAdornment position="start"><AccountBalanceOutlinedIcon style={{color:'#9678b6'}}/></InputAdornment>,
          }} />
           <TextField
        
                label="SILVER PURE RATE"
                name="silverpure"
                fullWidth
                  value={values && values.silverpure}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><DescriptionTwoToneIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
                <TextField
        
                label="SILVER RATE"
                name="silver"
                fullWidth
                  value={values && values.silver}
                onChange={handleChange}
                InputProps={{
            startAdornment: <InputAdornment position="start"><DescriptionTwoToneIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }} />
         
           

              <div>
                <Button variant="contained" startIcon={<UpdateDisabledOutlinedIcon />} onClick={() => Updateuser()}>Update</Button>
               
              </div>
            </Grid>
          </Grid>
        </form>
      </Popup>
    
     
     
        <Notification
        notify={notify}
        setNotify={setNotify} />
        
        </ThemeProvider>
       
        </>

              </MDBox>
              <MDBox color={light ? "white" : "inherit"}>

                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon sx={iconsStyle} fontSize="medium">
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>

              

                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <IoSettingsSharp />
                </IconButton>

                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"

                >
                  {filteredUsers.length > 0 ? (
                    <>

                      {filteredUsers.map((user) => (
                        <StyledAvatar src={user.imageSrc}
                          onClick={handleOpenMenu}
                          sx={{ bgcolor: 'grey', bottom: 5, width: 40, height: 40 }}>
                          <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='primary'>
                            {user.fullName.charAt(0)}
                          </Box>
                        </StyledAvatar>





                      ))}
                    </>
                  ) : (
                    <p></p>
                  )}

                </IconButton>
                {renderMenu()}
                <Link to="/authentication/sign-in/basic">
                  <IconButton>
                    <FaPowerOff />
                  </IconButton>
                </Link>

              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar></>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
