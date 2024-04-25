import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { createAPIEndpoint, ENDPIONTS } from './index'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import { useNavigate } from "react-router-dom";
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';

import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import PointOfSaleTwoToneIcon from '@mui/icons-material/PointOfSaleTwoTone';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import SvgIcon from '@mui/material/SvgIcon';
//import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {COLORS} from '../layouts/Colors';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FullPopup from '../layouts/FullPopup';
import Order from '../components/EditOrder/index';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import SportsGolfOutlinedIcon from '@mui/icons-material/SportsGolfOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import close from '../img/close.gif';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import SimpleGst from '../components/SimpleGst/index';
import QSilverGST from '../components/QSilverGST/index';
import Oldpurchase from '../components/OldGoldPurchase/index';
import Oldsilverpurchase from '../components/OldSilverPurchase/index';
import Home from '../Icons/home.png'
import Gold from '../Icons/gold.png'
import Silver from '../Icons/silver.png'
import Stock from '../Icons/stock.png'
import Sales_Report from '../Icons/salesreport.png'
import Gpurchase from '../Icons/Gpurchase.png'
import Spurchase from '../Icons/Spurchase.png'
import Bill from '../Icons/bill.png'

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} ArrowDropDownIcon classes={{ popper: className }} placement="top"/>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function FixedBottomNavigation() {
  
 const navigate = useNavigate();
  const ref = React.useRef(null);
  const [value, setValue] = React.useState('Home');
const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);

const [goldbill, setGoldbill] = useState(false);
const [silverbill, setSilverbill] = useState(false);

const [oldgoldbill, setoldGoldbill] = useState(false);
const [oldsilverbill, setoldSilverbill] = useState(false);


const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

    const openListOfOrdersFull = () => {
        setOrderListVisibilityFull(true);
    }
    const openGoldbill = () => {
      setGoldbill(true);
  }

  const openSilverbill = () => {
    setSilverbill(true);
}

const openoldGoldbill = () => {
  setoldGoldbill(true);
}

const openoldSilverbill = () => {
setoldSilverbill(true);
}
  const audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-message-pop-alert-2354.mp3')
  //https://assets.mixkit.co/sfx/download/mixkit-hard-pop-click-2364.wav
 const [displaygold, setdisplaygold] = useState([]);
const [displayorder, setdisplayorder] = useState([]);
useEffect(() => {
   createAPIEndpoint(ENDPIONTS.PLACEORDER).fetchAll()
            .then(res => {
              
                setdisplaygold(res.data)
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setdisplayorder(res.data)
            })
            .catch(err => console.log(err))
  },[]);
const FetchData = () => {
  createAPIEndpoint(ENDPIONTS.PLACEORDER).fetchAll()
            .then(res => {
              
                setdisplaygold(res.data)
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setdisplayorder(res.data)
            })
            .catch(err => console.log(err))
}
const orderbadge = displaygold.length;
const pendingbadge = displayorder.length;
const totalbadge = orderbadge + pendingbadge;
  const actions = [
  { icon:
    <Badge badgeContent={pendingbadge} color="error"> 
  <EditLocationOutlinedIcon onClick={(e) => {
 audio.play()
navigate('/Pending')
}}/>
</Badge>, name: 'Pending ' },
  { icon: 
     <Badge badgeContent={orderbadge} color="error"> 
  <EditLocationOutlinedIcon onClick={(e) => {
 audio.play()
navigate('/Placeorder')
}}/>
</Badge>, name: 'Order ' }
 
];

const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
  
    <Box sx={{ pb: 7 }} ref={ref}>
      
      <CssBaseline />
    
      <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,height: '70px'}} elevation={20}
      style={{backgroundColor:COLORS.AppBottom}}
      >
      
     
        <BottomNavigation 
        style={{backgroundColor:COLORS.AppBottom}}
          showLabels 
          value={value}
           onChange={(event, newValue) => {
            setValue(newValue);
          }}
          >
        
            <BottomNavigationAction 
            
        style={{color:'white'}}
        onClick={(e)=>{
            audio.play()
  navigate('/Home')
        }}
        label="HOME"
        value="Home"
        icon={<img src={Home} height="30" /> }
      />

<BottomNavigationAction  label="GOLD" style={{color:'white'}} onClick={(e) => {
  audio.play()
  openGoldbill()
 //navigate('/SimpleGst') 
}}    icon={<img src={Gold}  height="35" /> } /> 


 <BottomNavigationAction label="SILVER" style={{color:'white'}} onClick={(e) => {
  
    audio.play()
    openSilverbill()
  //navigate('/QSilverGST')
}}  icon={<img src={Silver}  height="35"/> }/>


  <BottomNavigationAction label="Inventory" style={{color:'white'}} onClick={(e) => {
  audio.play()
   navigate('/Inventory') 
}} icon={<img src={Stock} height="35"/> }/>   

{/*<Badge badgeContent={totalbadge} color="error"> 
   <StyledFab color={COLORS.AppBottom} >
<Backdrop open={open} />
<SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 1,color:COLORS.AppBottom }}
        icon={<EditLocationOutlinedIcon onClick={FetchData}/>}
        onClose={handleClose}
        backgroundColor={COLORS.AppBottom}
         color={COLORS.AppBottom}
        onOpen={handleOpen}
        open={open}>
        {actions.map((action) => (
          <SpeedDialAction
          backgroundColor={COLORS.AppBottom}
          color={COLORS.AppBottom}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    
    </StyledFab>
    </Badge> 

  <BottomNavigationAction  label="Pending" style={{color:'white'}}  onClick={(e) => {
  audio.play()
 navigate('/Pending') 
}} icon={ <Badge badgeContent={pendingbadge} color="error"> 
  <EditLocationOutlinedIcon  style={{color:'whitesmoke'}} sx={{ fontSize: 25 }} onClick={(e) => {
 audio.play()
navigate('/Pending')
}}/>
</Badge>} />

  <BottomNavigationAction  label="Order" style={{color:'white'}}  onClick={(e) => {
  audio.play()
 navigate('/Placeorder') 
}} icon={<Badge badgeContent={orderbadge} color="error"> 
  <EditLocationOutlinedIcon style={{color:'whitesmoke'}} sx={{ fontSize: 25 }} onClick={(e) => {
 audio.play()
navigate('/Placeorder')
}}/>
</Badge> } />
  */}        
          
          <BottomNavigationAction  label="Sales Report" style={{color:'white'}}  onClick={(e) => {
  audio.play()
 navigate('/stocks') 
}} icon={<img src={Sales_Report}  height="35"/> } /> 


<BottomNavigationAction label="Old Gold Purchase" style={{color:'white'}} onClick={(e) => {
  audio.play()
  openoldGoldbill()
  //navigate('/Oldpurchase') 
}} icon={<img src={Gpurchase} /> } /> 

<BottomNavigationAction label="Old Silver Purchase" style={{color:'white'}} onClick={(e) => {
  audio.play()
  openoldSilverbill()
  //navigate('/Oldsilverpurchase') 
}} icon={<img src={Spurchase} /> } /> 
{/*
<BottomNavigationAction label="BILL" style={{color:'white'}} onClick={(e) => {
  audio.play()
  navigate('/GSEstimate') 
}} icon={<img src={Bill} height="35"/> } /> */}

        </BottomNavigation>
   
              

      </Paper>
    </Box>
   

  <FullPopup
       openPopup={orderListVisibilityFull}
        setOpenPopup={setOrderListVisibilityFull}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
   <Order />
</Container>
</FullPopup>

<FullPopup
           title="GOLD INVOICE"
       openPopup={goldbill}
        setOpenPopup={setGoldbill}>
  <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
  <SimpleGst />
</Container>
</FullPopup>

<FullPopup
           title="SILVER INVOICE"
       openPopup={silverbill}
        setOpenPopup={setSilverbill}>
  <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
  <QSilverGST />
</Container>
</FullPopup>

<FullPopup
           title="OLD GOLD INVOICE"
       openPopup={oldgoldbill}
        setOpenPopup={setoldGoldbill}>
  <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
  <Oldpurchase />
</Container>
</FullPopup>

<FullPopup
           title="OLD SILVER INVOICE"
       openPopup={oldsilverbill}
        setOpenPopup={setoldSilverbill}>
  <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
  <Oldsilverpurchase />
</Container>
</FullPopup>


</>

  );
}


