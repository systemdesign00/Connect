import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {COLORS} from '../layouts/Colors';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { roundTo2DecimalPoint,roundTo2DecimalPoints } from "../utils/index";
import Popover from '@mui/material/Popover';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Link, useLocation, useNavigate } from "react-router-dom";
import TableCell from '@mui/material/TableCell';
import {NumberFormat} from '../Services/NumberFormat';
import Grid from '@mui/material/Grid';
import PurityChart from '../img/puritychart.png';
import CircularProgress from '@mui/material/CircularProgress';
import SilverPurity from '../img/SilverPurity.png';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import NearbyErrorOutlinedIcon from '@mui/icons-material/NearbyErrorOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsPowerOutlinedIcon from '@mui/icons-material/SettingsPowerOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StackedBarChartOutlinedIcon from '@mui/icons-material/StackedBarChartOutlined';
import SsidChartOutlinedIcon from '@mui/icons-material/SsidChartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
//import MoreIcon from '@mui/icons-material/MoreVert';
//import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import SportsGolfOutlinedIcon from '@mui/icons-material/SportsGolfOutlined';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import DiamondSharpIcon from '@mui/icons-material/DiamondSharp';
import ModelTrainingOutlinedIcon from '@mui/icons-material/ModelTrainingOutlined';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Container from '@mui/material/Container';
import { createAPIEndpoint, ENDPIONTS } from './index'
import Popup from '../layouts/Popup';
import FullPopup from "../layouts/FullPopup";
import ConfirmDialog from "../layouts/ConfirmDialog";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Moda from './Moda';
import Equalizer from './Equalizer'
import Purchasegold from '../components/Purchase/Mainpending';
import Purchasesilver from '../components/Purchasesilver/Mainpending';
import WorkVoucher from '../components/WorkVoucher/index';
import SilverVoucher from '../components/SilverVoucher/index';
import Logo from '../Icons/logo.png'
import Power from '../Icons/power.png'
import Reload from '../Icons/reload.png'
import Stack from '../Icons/stack.png'
import Menubar from '../Icons/menu.png'
import Ereport from '../Icons/ereport.png'
import Gestimate from '../Icons/gestimate.png'
import Sestimate from '../Icons/sestimate.png'

import Wgold from '../Icons/wgold.png'
import Wsilver from '../Icons/wsilver.png'
import Purchase from '../Icons/purchase.png'
import Dvoucher from '../Icons/dvoucher.png'
import Inventorysd from '../Icons/inventorysd.png'
import Pendingsales from '../Icons/pending.png'
import Placeorder from '../Icons/order.png'
import Gbill from '../Icons/gbill.png'
import Sbill from '../Icons/sbill.png'
import Wvoucher from '../Icons/wvoucher.png'
import Svoucher from '../Icons/svoucher.png'
import Displaystk from '../Icons/stock.png'
import Invoicehistory from '../Icons/history.png'


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

export default function PrimarySearchAppBar() {
  //𝕯𝖍𝖆𝖓𝖎𝖘𝖍 𝕵𝖊𝖜𝖊𝖑𝖑𝖘 𝓪𝓷𝓭 𝓢𝓲𝓵𝓿𝓮𝓻𝓼
  //Singapore Jewellers 
  const titles = {
  "/Home": "𝕯𝖍𝖆𝖓𝖎𝖘𝖍 𝕵𝖊𝖜𝖊𝖑𝖑𝖘 𝖆𝖓𝖉 𝕾𝖎𝖑𝖛𝖊𝖗𝖘",
  "/Inventory": "𝕴𝖓𝖛𝖊𝖓𝕿𝖔𝖗𝖞",
  "/order": "OrdeR",
  "/NewInvoice":"InvoicE",
  "/StockManagement":"Stock Management",
  "/GST": "🌕 𝖌𝖔𝖑𝖉",
  "/SILVERGST": "🪙 𝖘𝖎𝖑𝖛𝖊𝖗",
  "/pending": "PendinG",
  "/Estimate":"Silver EstimatE PaD",
  "/GstEstimate":"Gold EstimatE PaD",
  "/Invoicehistory":"Invoice HistorY",
  "/orderitems":"Order ItemS",
  "/stocks":"𝖘𝖆𝖑𝖊𝖘 𝖗𝖊𝖕𝖔𝖗𝖙",
  "/hello": "Jewells Catalog",
  "/set": "SeT",
  "/in": "In",
  "/orderlist": "OrderLisT",
  "/Exchange":"ExchangE",
   "/EDITGOLD":"SalE",
   "/EDITSILVER":"Edit Silver",
   "/Oldpurchase": "𝖔𝖑𝖉 gold 𝖕𝖚𝖗𝖈𝖍𝖆𝖘𝖊",
    "/Oldsilverpurchase": "𝖔𝖑𝖉 silver 𝖕𝖚𝖗𝖈𝖍𝖆𝖘𝖊",
   "/Pending":"PendinG",
   "/Placeorder":"PlaceOrdeR",
   "/Estimatereport":"EstimatEReporT",
   "/Deliverychellan":"DeliveryChellaN",
   "/SimpleGst":"🌕 𝖌𝖔𝖑𝖉",
   "/WorkVoucher":"W𝖔𝖗𝖐𝖛𝖔𝖚𝖈𝖍𝖊𝖗",
   "/QSilverGST":"🪙 𝖘𝖎𝖑𝖛𝖊𝖗",
   "/Purchase":"🛒 Gold 𝔭𝔲𝔯𝔠𝔥𝔞𝔰𝔢",
   "/Purchasesilver":"🛒 Silver 𝔭𝔲𝔯𝔠𝔥𝔞𝔰𝔢",
   "/SilverVoucher":"Silver Voucher",
   "/Gallery":"GallerY",
   "/Inventory_SD":'Inventory SD'
};


 


const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

   const [displaypending, setdisplaypending] = useState([]);
const [displayorder, setdisplayorder] = useState([]);
useEffect(() => {
   createAPIEndpoint(ENDPIONTS.PLACEORDER).fetchAll()
            .then(res => {
              
                setdisplaypending(res.data)
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
              
                setdisplaypending(res.data)
            })
            .catch(err => console.log(err))

            createAPIEndpoint(ENDPIONTS.PENDINGORDER).fetchAll()
            .then(res => {
              
                setdisplayorder(res.data)
            })
            .catch(err => console.log(err))
}
const orderbadge = displaypending.length;
const pendingbadge = displayorder.length;
const totalbadge = orderbadge + pendingbadge;
const [Goldpurchase, setGoldpurchase] = useState(false);
const [Silverpurchase, setSilverpurchase] = useState(false);
const [Goldjobwork, setGoldjobwork] = useState(false);
const [Silverjobwork, setSilverjobwork] = useState(false);


const openGoldpurchase = () => {
setGoldpurchase(true);
}

const openSilverpurchase = () => {
setSilverpurchase(true);
}

const openGoldjobwork = () => {
  setGoldjobwork(true);
  }
  
  const openSilverjobwork = () => {
  setSilverjobwork(true);
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/*
       <List>
              <ListItem button key='Whole Sale' onClick={(e) => { navigate('/EDITGOLD')}}>
                <ListItemIcon><img src={Wgold} height="30" onClick={(e) => {navigate('/EDITGOLD')}}/>
                </ListItemIcon>
                <ListItemText primary='Whole Sale [GOLD]' />
              </ListItem>
            </List>
      <List>
              <ListItem button key='Whole Sale [GOLD]' onClick={(e) => { navigate('/EDITSILVER')}}>
                <ListItemIcon><img src={Wsilver} height="30"Icon  onClick={(e) => { navigate('/EDITSILVER')}}/>
                </ListItemIcon>
                <ListItemText primary='Whole Sale [SILVER]' />
              </ListItem>
            </List>
  */}
             <List>
              <ListItem button key='GOLD PURCHASE' onClick={(e) => { //navigate('/Purchase')
              openGoldpurchase()
            }}>
                <ListItemIcon><img src={Purchase} height="30"  onClick={(e) => {//navigate('/Purchase')
                  openGoldpurchase() }}/>
                </ListItemIcon>
                <ListItemText primary='GOLD PURCHASE' />
              </ListItem>
            </List>
            <List>
              <ListItem button key='SILVER PURCHASE' onClick={(e) => {// navigate('/Purchasesilver')
             openSilverpurchase() }}>
                <ListItemIcon><img src={Purchase} height="30"  onClick={(e) => {//navigate('/Purchasesilver')
               openSilverpurchase() }}/>
                </ListItemIcon>
                <ListItemText primary='SILVER PURCHASE' />
              </ListItem>
            </List>
            {/*
             <List>
              <ListItem button key='Delivery Voucher' onClick={(e) => { navigate('/Deliverychellan')}}>
                <ListItemIcon><img src={Dvoucher} height="30"  onClick={(e) => {navigate('/Deliverychellan')}}/>
                </ListItemIcon>
                <ListItemText primary='Delivery Voucher' />
              </ListItem>
            </List>

             <List>
              <ListItem button key='Inventory SD' onClick={(e) => { navigate('/Inventory_SD')}}>
                <ListItemIcon><img src={Inventorysd} height="30"  onClick={(e) => {navigate('/Inventory_SD')}}/>
                </ListItemIcon>
                <ListItemText primary='Inventory SD' />
              </ListItem>
            </List>
      <Divider />
     <List>
              <ListItem button key='Pending' onClick={(e) => { navigate('/Pending')}}>
                <ListItemIcon>
                    <Badge badgeContent={pendingbadge} color="error">
 <img src={Pendingsales} height="30"  onClick={(e) => {navigate('/Pending')}}/>
                    </Badge>
                  </ListItemIcon>
                <ListItemText primary='Pending' />
              </ListItem>
            </List>
      <List>
              <ListItem button key='Place Order' onClick={(e) => { navigate('/Placeorder')}}>
                <ListItemIcon>
                       <Badge badgeContent={orderbadge} color="error">
  <img src={Placeorder} height="30"xIcon  onClick={(e) => { navigate('/Placeorder')}}/>
                    </Badge>
                  </ListItemIcon>
                <ListItemText primary='Place Order' />
              </ListItem>
            </List>
*/}
           {/*  <List>
              <ListItem button key='QGOLD GST' onClick={(e) => { navigate('/GST')}}>
                <ListItemIcon><img src={Gbill} height="30"  onClick={(e) => {navigate('/GST')}}/>
                </ListItemIcon>
                <ListItemText primary='QGold GST' />
              </ListItem>
            </List>
            <List>
              <ListItem button key='QSilver GST' onClick={(e) => { navigate('/SILVERGST')}}>
                <ListItemIcon><img src={Sbill} height="30"  onClick={(e) => {navigate('/SILVERGST')}}/>
                </ListItemIcon>
                <ListItemText primary='QSilver GST' />
              </ListItem>
</List>*/}
            <List>
              <ListItem button key='Work Voucher' onClick={(e) => {// navigate('/WorkVoucher')
            openGoldjobwork()  }}>
                <ListItemIcon><img src={Wvoucher} height="30"  onClick={(e) => {//navigate('/WorkVoucher')
             openGoldjobwork() }}/>
                </ListItemIcon>
                <ListItemText primary='Work Voucher' />
              </ListItem>
            </List>
              <List>
              <ListItem button key='Silver Voucher' onClick={(e) => { //navigate('/SilverVoucher')
         openSilverjobwork()   }}>
                <ListItemIcon><img src={Svoucher} height="30"  onClick={(e) => {//navigate('/SilverVoucher')
                   openSilverjobwork()      }}/>
                </ListItemIcon>
                <ListItemText primary='Silver Voucher' />
              </ListItem>
            </List>
            <List>
              <ListItem button key='SD_BILL' onClick={(e) => { navigate('/SDbill')}}>
                <ListItemIcon><img src={Invoicehistory} height="30"  onClick={(e) => {navigate('/SDbill')}}/>
                </ListItemIcon>
                <ListItemText primary='SD_BILL' />
              </ListItem>
            </List>
           {/*  <List>
              <ListItem button key='Display STK' onClick={(e) => { navigate('/hello')}}>
                <ListItemIcon><img src={Displaystk} height="30"  onClick={(e) => {navigate('/hello')}}/>
                </ListItemIcon>
                <ListItemText primary='Display STK' />
              </ListItem>
            </List>
              <List>
              <ListItem button key='Invoice History' onClick={(e) => { navigate('/Invoicehistory')}}>
                <ListItemIcon><img src={Invoicehistory} height="30"  onClick={(e) => {navigate('/Invoicehistory')}}/>
                </ListItemIcon>
                <ListItemText primary='Invoice History' />
              </ListItem>
</List>*/}
    </Box>
  );

const navigate = useNavigate();
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 const [anchorEl, setAnchorEl] = React.useState(null);
 const [anchorElp, setAnchorElp] = React.useState(null);
  const [anchorElws, setAnchorElws] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

const handlePopoverOpenp = (event) => {
    setAnchorElp(event.currentTarget);
  };

  const handlePopoverClosep = () => {
    setAnchorElp(null);
  };

  const openp = Boolean(anchorElp);

  const handlePopoverOpenws = (event) => {
    setAnchorElws(event.currentTarget);
  };

  const handlePopoverClosews = () => {
    setAnchorElws(null);
  };

  const openws = Boolean(anchorElws);
  
const location = useLocation();
const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
  
const [oldListVisibility, setOldListVisibility] = useState(false);
const [Equalize, setEqualize] = useState(false);
const [Purityopen, setPurityopen] = useState(false);

const openListOfOld = () => {
        setOldListVisibility(true);
    }

const openEqualize = () => {
        setEqualize(true);
    }

    const openPurity = () => {
        setPurityopen(true);
    }
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/winxpshutdown.mp3')
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


var wgold = displaygold.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var wsilver = displaysilver.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
var silverstk = displaysilverstk.reduce((total, currentValue) => total = total + Number(currentValue.itemWeight),0);
const purerate = displaypure.map(item => (item.rate))
const rates =   display.map(item => (item.rate))
const Silver =   displays.map(item => (item.rate))
const a = rates - 100
const silverpure =   displaysold.map(item => (item.rate))

  return (
    <>
    <Box sx={{ flexGrow: 2 }}>
      
      <AppBar position="fixed"  sx={{ top: 0 }} style={{ background: COLORS.AppBottom }}>
        <Toolbar>
       
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
              aria-owns={openws ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
       // onMouseEnter={handlePopoverOpenws}
        //onMouseLeave={handlePopoverClosews}
          >
            <Badge badgeContent={totalbadge} color="error">
               <img src={Menubar} onClick={toggleDrawer(anchor, true)}/>
            </Badge>
      
          </IconButton>
        
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
   
           <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            //  aria-owns={openws ? 'mouse-over-popover' : undefined}
        //aria-haspopup="true"
        //onMouseEnter={handlePopoverOpenws}
       // onMouseLeave={handlePopoverClosews}
          >
           
             <img src={Logo} height="30" onClick={(e) => {
  
  navigate('/StockManagement')
}}/>
          
          </IconButton>

       
          
          
          <Box fontWeight="fontWeightBold" fontSize={25} fontFamily="Zanzabar" onClick={openPurity}>
      {titles[location.pathname]}
         </Box>
         
         
          <Box sx={{ flexGrow: 1 }} />
           
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              
       {   <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
              aria-owns={openp ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpenp}
        onMouseLeave={handlePopoverClosep}
          >
          
            <img src={Gestimate} height="30" onClick={(e) => {
         //navigate('/GstEstimate')
         navigate('/GSEstimate')
}}/>
         
          </IconButton>
}
    {/*  <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
              aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
          >
           
            <img src={Sestimate} height="30" onClick={(e) => {
 navigate('/Estimate')
}}/>
           
</IconButton> */}
             
    
     
   
      {/*
             <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img src={Ereport} height="30" onClick={(e) => {
 navigate('/Estimatereport')
}}/>
</IconButton>*/}
          
           <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial" onClick={(e) => {fetchallarea()}}>
           <img src={Wgold} height="20" />{"Gold =>" +rates}
      <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial" onClick={(e) => {fetchallarea()}}>
      <img src={Wgold} height="20"/>{"24Karat =>" +rates}
      </Box>
        </Box>

          <Box width='5vh'/>
          <Box sx={{position: 'relative' }}>
             {loading && (
          <CircularProgress
            size={40}
            sx={{
              color:'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-20px',
              marginLeft: '-20px',
            }}
          />
        )}
             <IconButton
              disabled={loading}
          onClick={(e) => {fetchallarea()}}
        >
            <img src={Reload} onClick={(e) => {fetchallarea()}} width="35"/>
        </IconButton>
      </Box>
 
 <Box width='5vh'/>
          <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial" onClick={(e) => {fetchallarea()}}>
       <img src={Wsilver} height="20"/>{"Silver =>" +Silver}
      <Box fontWeight="fontWeightBold" fontSize={15} fontFamily="arial" onClick={(e) => {fetchallarea()}}>
      <img src={Wsilver} height="20"/> {"Silver_Pure =>" +silverpure}
      
         </Box>
         </Box>

         <Box width='5vh'>
      </Box>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge  color="error">
            
                <img src={Stack} height="30" onClick={openListOfOld}/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
            
               <img src={Power} height="30" onClick={(e) => {
  //audio.play()
  //fetchallarea()
  navigate('/')
}}/>
       
            </IconButton>
       
             
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
             <Box fontWeight="fontWeightBold" fontSize={30} fontFamily="Zanzabar">
      {rates}
         </Box>
            <Typography>{rates}</Typography>
             <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge  color="error">
                <SsidChartOutlinedIcon />
              </Badge>
            </IconButton>
           
            <IconButton
              size="large"
              aria-label="show more"
             // aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={null}
              color="inherit"
            >
                <SettingsPowerOutlinedIcon onClick={(e) => {

  fetchallarea()
  navigate('/')
}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    
  
    </Box>
    <Box
          sx={{
            marginBottom: 9,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        
          <Popup
                title="Rate"
                openPopup={oldListVisibility}
                setOpenPopup={setOldListVisibility}>
                 
               <Moda/>
            </Popup>
            <Popup
                title="Equalize"
                openPopup={Equalize}
                setOpenPopup={setEqualize}>
                 
               <Equalizer/>
            </Popup>
            <Popup
                title="Purity Chart"
                openPopup={Purityopen}
                setOpenPopup={setPurityopen}>
                 
                  
   <Grid container justifyContent="center" >
  <img src={PurityChart} height="490px" width="800px"/>
  <img src={SilverPurity} height="490px" width="800px"/>
</Grid>
            </Popup>

            <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>SILVER ESTIMATE</Typography>
       { /*<Typography sx={{ p: 1 }}>Currently {orderList.length} Orders.</Typography>
            <Table  size="small" >
        <TableHead>
          <TableRow>
            <TableCell>VentorName</TableCell>
            <TableCell >Mobile No</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item) => (
            <TableRow
              key={item.ventorName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.ventorName}
              </TableCell>
              <TableCell >{item.mobile}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table> */}
      </Popover>

       <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={openp}
        anchorEl={anchorElp}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClosep}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>GOLD ESTIMATE</Typography>
      { /* 
      <Typography sx={{ p: 1 }}>Currently {orderListpending.length} Pending.</Typography>
      <Table  size="small" >
        <TableHead>
          <TableRow>
            <TableCell>ShopName</TableCell>
            <TableCell >Mobile No</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {orderListpending.map((item) => (
            <TableRow
              key={item.shopName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.shopName}
              </TableCell>
              <TableCell >{item.mobile}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
       */}
      </Popover>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={openws}
        anchorEl={anchorElws}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClosews}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Gold and Silver Stock</Typography>
        <Table  size="small" >
        <TableHead>
          <TableRow>
            <TableCell>Element</TableCell>
            <TableCell >WholeStock</TableCell>
             <TableCell >In_Rupees</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
           <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                GOLD
              </TableCell>
              <TableCell component="th" scope="row">
                {roundTo2DecimalPoint(wgold)}
              </TableCell>
              <TableCell >{NumberFormat(Math.round(wgold * purerate))}</TableCell>
             </TableRow>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                SILVER
              </TableCell>
              <TableCell component="th" scope="row">
                {roundTo2DecimalPoint(wsilver)}
              </TableCell>
              <TableCell >{NumberFormat(Math.round(wsilver * silverpure))}</TableCell>
             </TableRow>
<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                SILVER-92.5
              </TableCell>
              <TableCell component="th" scope="row">
                {roundTo2DecimalPoint(silverstk)}
              </TableCell>
              <TableCell >{NumberFormat(Math.round(silverstk * silverpure))}</TableCell>
             </TableRow>
             <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
              <TableCell component="th" scope="row">
                
              </TableCell>
              <TableCell component="th" scope="row">
               Total
              </TableCell>
              <TableCell > {NumberFormat((Math.round(wgold * purerate)) + Math.round(wsilver * silverpure) + Math.round(silverstk * silverpure))} </TableCell>
             </TableRow>
        </TableBody>
      </Table>
       
      </Popover>


      <FullPopup
       title="GOLD PURCHASE" 
       openPopup={Goldpurchase}
        setOpenPopup={setGoldpurchase}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      <Purchasegold />
       </Container>
  </FullPopup>

  <FullPopup
    title="SILVER PURCHASE" 
       openPopup={Silverpurchase}
        setOpenPopup={setSilverpurchase}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      <Purchasesilver />
       </Container>
  </FullPopup>

  <FullPopup
       title="GOLD JOBWORK" 
       openPopup={Goldjobwork}
        setOpenPopup={setGoldjobwork}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      <WorkVoucher />
       </Container>
  </FullPopup>

  <FullPopup
    title="SILVER JOBWORK" 
       openPopup={Silverjobwork}
        setOpenPopup={setSilverjobwork}>
           <Container  justifycontent="center" style={{ paddingBottom:20}} maxWidth='xd'>
      <SilverVoucher />
       </Container>
  </FullPopup>


        </>
  );
}
