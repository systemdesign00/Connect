import React, { useState, useEffect ,useRef} from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { ButtonGroup} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { roundTo2DecimalPoint } from "../../utils/index";
import TableCell from '@mui/material/TableCell';
import  Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import KeyOffTwoToneIcon from '@mui/icons-material/KeyOffTwoTone';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import { COLORS } from '../../layouts/Colors';
import TableHead from '@mui/material/TableHead';
import { MdTipsAndUpdates } from "react-icons/md";
  import { TbFileDescription } from "react-icons/tb";
import { FaWeightScale } from "react-icons/fa6";
import { GiWeightScale } from "react-icons/gi";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import Silver from './Silver';
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
import PropTypes, { number } from 'prop-types';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ReactToPrint from 'react-to-print';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, green ,blue} from '@mui/material/colors';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import OldCal from './OldCal';
import SearchFoodItems from './SearchFoodItems';
import OldSilver from './OldSilver';
import ItemPopup from '../../layouts/ItemPopup';
import PieceItems from './PieceItems';
import Popup from '../../layouts/Popup';
//import companyLogo from '../../img/intro.png';
import Gold from '../../img/gold.png'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Notification from "../../layouts/Notification";
import { styled } from '@mui/material/styles';
import NonStock from './NonStock';
import {NumberFormat} from '../../Services/NumberFormat';
import FancyItem from './FancyItem';
//import NonStockwastage from './NonStockwastage'
import Non_stocksilver from './Non_stocksilver';
import Non_stockfancy from './Non_stockfancy';
import Rategcut from './Rategcut';
import Pdf from "react-to-pdf";
import html2canvas from 'html2canvas';
import WallpaperOutlinedIcon from '@mui/icons-material/WallpaperOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { ConfirmProvider } from "material-ui-confirm";
import Cash from './Cash';
import Printimg from '../../Icons/print.png'
import OGold from '../../Icons/goldo.png';
import OSilver from '../../Icons/silvero.png';
import WGold from '../../Icons/wgold.png';
import Cashimg from '../../Icons/cash.png';
import Taximg from '../../Icons/tax.png';
import Oldcash from './Oldcash';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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
         color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
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
     tablerow: {
        '& thead th': {
            fontWeight: '600',
          color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '600',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        },
      },
    table: {
        '& thead th': {
            fontWeight: '600',
           color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
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
    }
}))



export default function Pendinglist(props,initialFValues,initialFValuesilver,initialFValuescash,initialFValuesold,initialFValueswastage,initialFValueswastagecash,initialFValuesfancy,
  initialFValuesratecut,initialFValuespiece,setOrderId) {
    const classes = useStyles();

  const [valuetabs, setValuetabs] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValuetabs(newValue);
  };
  
const { values, setValues,ops } = props;

    let orderedFoodItems = values.orderDetails;
    let orderedFoodItemsilver = values.ordersilverDetails
    let orderedratecutitems = values.ratecutitems;
    let orderpieceitems = values.pieceitems;
    
    
    let oldorderedFoodItems = values.oldorderDetails;
    let ordercash = values.ordercashDetails;
    let orderedfancyitems = values.fancyitems;
    let ordercashitems = values.cashitems;

    let ordereditems = values.watageitems;
   
   const [valuetab, setValuetab] = React.useState(0);

   const [isDialogOpensales, setIsDialogOpensales] = useState(false);
const [editingIndexsales, setEditingIndexsales] = useState(null);

const [editedDatasales, setEditedDatasales] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogsales = () => {
  setIsDialogOpensales(false);
  setEditingIndexsales(null);
};


const [isDialogOpenpurchase, setIsDialogOpenpurchase] = useState(false);
const [editingIndexpurchase, setEditingIndexpurchase] = useState(null);

const [editedDatapurchase, setEditedDatapurchase] = useState({
  foodItemNames: '',
  foodItemPrices: '',
  quantitys: '',
   taxs:'',
   lessweights:'',
   netweights:'',
   Tfinesss:'',
  rate:'',
 discounts:'',
  subtotals:''

  // Add other fields as needed
});
  
const handleCloseDialogpurchase = () => {
  setIsDialogOpenpurchase(false);
  setEditingIndexpurchase(null);
};

const [isDialogOpennetrate, setIsDialogOpennetrate] = useState(false);
const [editingIndexnetrate, setEditingIndexnetrate] = useState(null);

const [editedDatanetrate, setEditedDatanetrate] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialognetrate = () => {
  setIsDialogOpennetrate(false);
  setEditingIndexnetrate(null);
};

const [isDialogOpenpurchasenetrate, setIsDialogOpenpurchasenetrate] = useState(false);
const [editingIndexpurchasenetrate, setEditingIndexpurchasenetrate] = useState(null);

const [editedDatapurchasenetrate, setEditedDatapurchasenetrate] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogpurchasenetrate = () => {
  setIsDialogOpenpurchasenetrate(false);
  setEditingIndexpurchasenetrate(null);
};

const [isDialogOpenratecut, setIsDialogOpenratecut] = useState(false);
const [editingIndexratecut, setEditingIndexratecut] = useState(null);

const [editedDataratecut, setEditedDataratecut] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogratecut = () => {
  setIsDialogOpenratecut(false);
  setEditingIndexratecut(null);
};


const [isDialogOpenpurchaseratecut, setIsDialogOpenpurchaseratecut] = useState(false);
const [editingIndexpurchaseratecut, setEditingIndexpurchaseratecut] = useState(null);

const [editedDatapurchaseratecut, setEditedDatapurchaseratecut] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogpurchaseratecut = () => {
  setIsDialogOpenpurchaseratecut(false);
  setEditingIndexpurchaseratecut(null);
};

 const [isDialogOpencash, setIsDialogOpencash] = useState(false);
const [editingIndexcash, setEditingIndexcash] = useState(null);

const [editedDatacash, setEditedDatacash] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogcash = () => {
  setIsDialogOpencash(false);
  setEditingIndexcash(null);
};

 const [isDialogOpenpurchasecash, setIsDialogOpenpurchasecash] = useState(false);
const [editingIndexpurchasecash, setEditingIndexpurchasecash] = useState(null);

const [editedDatapurchasecash, setEditedDatapurchasecash] = useState({
  foodItemName: '',
  foodItemPrice: '',
  quantity: '',
   tax:'',
   lessweight:'',
   netweight:'',
   Tfiness:'',
  rate:'',
 discount:'',
  subtotal:''

  // Add other fields as needed
});
  
const handleCloseDialogpurchasecash = () => {
  setIsDialogOpenpurchasecash(false);
  setEditingIndexpurchasecash(null);
};


  const handleChangetab = (event, newValue) => {
    setValuetab(newValue);
  };
    const removeFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const removeFoodItemsilver = (index, id) => {
      //debugger;
      let x = { ...values };
      x.ordersilverDetails = x.ordersilverDetails.filter((_, i) => i !== index);
      if (id !== 0)
          x.deletedOrderItemIds += id + ',';
      setValues({ ...x });
  }
  const removecash = (index, id) => {
    //debugger;
    let x = { ...values };
    x.ordercashDetails = x.ordercashDetails.filter((_, i) => i !== index);
    if (id !== 0)
        x.deletedOrderItemIds += id + ',';
    setValues({ ...x });
}
     const removeFoodItempiece = (index, id) => {
        //debugger;
        let x = { ...values };
        x.pieceitems = x.pieceitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }

    const removeFoodItemfancy = (index, id) => {
        //debugger;
        let x = { ...values };
        x.fancyitems = x.fancyitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const removeFoodItemratecut = (index, id) => {
      //debugger;
      let x = { ...values };
      x.ratecutitems = x.ratecutitems.filter((_, i) => i !== index);
      if (id !== 0)
          x.deletedOrderItemIds += id + ',';
      setValues({ ...x });
  }

     const removeFoodItemwastage = (index, id) => {
        //debugger;
        let x = { ...values };
        x.watageitems = x.watageitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
  const removeFoodItemcash = (index, id) => {
        //debugger;
        let x = { ...values };
        x.cashitems = x.cashitems.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const oldremoveFoodItem = (index, id) => {
        //debugger;
        let x = { ...values };
        x.oldorderDetails = x.oldorderDetails.filter((_, i) => i !== index);
        if (id !== 0)
            x.deletedOrderItemIds += id + ',';
        setValues({ ...x });
    }
    const newval = 'silver';
   
  const update = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderDetails[idx];

         foodItem.foodItemName = data.foodItemName
           foodItem.foodItemPrice = data.foodItemPrice
              foodItem.quantity= data.quantity
              foodItem.tax = data.tax
             foodItem.lessweight= data.lessweight
                  foodItem.netweight= Number(data.foodItemPrice - data.lessweight)
                    foodItem.Tfiness = Number((Number(data.foodItemPrice - data.lessweight) * data.tax ) / 100).toFixed(3);
                   foodItem.rate = data.rate
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ? Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate : Number(((data.foodItemPrice - data.lessweight) * data.tax) / 100) * data.rate;

        setValues({...x});
        setIsEditing(false)
      
      }

const updatesales = (idx, editedDatasales) => {
  setValues((prevValues) => {
    const updatedOrderDetailssales = prevValues.orderDetails.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatasales.foodItemName,
          foodItemPrice: editedDatasales.foodItemPrice,
          quantity: editedDatasales.quantity,
          tax: editedDatasales.tax,
          lessweight: editedDatasales.lessweight,
          netweight: Number(editedDatasales.foodItemPrice - editedDatasales.lessweight),
          Tfiness : Number((Number(editedDatasales.foodItemPrice - editedDatasales.lessweight) * editedDatasales.tax ) / 100).toFixed(3),
          rate:editedDatasales.rate,
           discount:editedDatasales.discount,
          subtotal:
           newval === editedDatasales.type ? Number(((editedDatasales.foodItemPrice - editedDatasales.lessweight) * editedDatasales.tax ) / 100) * editedDatasales.rate : Number(((editedDatasales.foodItemPrice - editedDatasales.lessweight) * editedDatasales.tax) / 100) * editedDatasales.rate
        };
      }
      return item;
    });

    return {
      ...prevValues,
      orderDetails: updatedOrderDetailssales,
    };
  });

  setIsEditing(false);
};

const handleDialogSubmitsales = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatesales(editingIndexsales, editedDatasales);

  setIsDialogOpensales(false);
  setEditingIndexsales(null);
};


      const updates = (idx) => {
        let x ={...values};
      
        let foodItem = x.orderDetails[idx];
        foodItem.foodItemName = data.foodItemName
           foodItem.foodItemPrice = data.foodItemPrice
              foodItem.quantity = data.quantity
              foodItem.tax = data.tax
             foodItem.lessweight = data.lessweight
                  foodItem.netweight = Number(data.foodItemPrice - data.lessweight)
                    foodItem.Tfiness = Number((data.netweight * data.tax ) / 100).toFixed(3);
                   foodItem.rate = data.rate
              foodItem.discount = data.discount
 foodItem.subtotal = newval === data.type ?  (data.foodItemPrice * data.rate) + Number(data.tax) : Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate;
        setValues({...x});
        setIsEditing(false)
        //resetInputField()
      }

      const updatesilver = (idx) => {
        let x ={...values};
      
        let foodItem = x.ordersilverDetails[idx];
        foodItem.foodItemName = datasilver.foodItemName
           foodItem.foodItemPrice = datasilver.foodItemPrice
              foodItem.quantity = datasilver.quantity
              foodItem.tax = datasilver.tax
             foodItem.lessweight = datasilver.lessweight
                  foodItem.netweight = Number(datasilver.foodItemPrice - datasilver.lessweight)
                    foodItem.Tfiness = Number((datasilver.netweight * datasilver.tax ) / 100).toFixed(3);
                   foodItem.rate = datasilver.rate
              foodItem.discount = datasilver.discount
 foodItem.subtotal = Number(datasilver.foodItemPrice * datasilver.rate);
        setValues({...x});
        setIsEditingsilver(false)
        //resetInputField()
      }

      const updatenetrate = (idx, editedDatanetrate) => {
  setValues((prevValues) => {
    const updatedOrderDetailsnetrate = prevValues.ordersilverDetails.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatanetrate.foodItemName,
          foodItemPrice: editedDatanetrate.foodItemPrice,
          quantity: editedDatanetrate.quantity,
          tax: editedDatanetrate.tax,
          lessweight: editedDatanetrate.lessweight,
          netweight: Number(editedDatanetrate.foodItemPrice - editedDatanetrate.lessweight),
          Tfiness : Number((Number(editedDatanetrate.foodItemPrice - editedDatanetrate.lessweight) * editedDatanetrate.tax ) / 100).toFixed(3),
          rate:editedDatanetrate.rate,
           discount:editedDatanetrate.discount,
          subtotal: Number(editedDatanetrate.foodItemPrice * editedDatanetrate.rate)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      ordersilverDetails: updatedOrderDetailsnetrate,
    };
  });

  setIsEditingsilver(false);
};

const handleDialogSubmitnetrate = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatenetrate(editingIndexnetrate, editedDatanetrate);

  setIsDialogOpennetrate(false);
  setEditingIndexnetrate(null);
};

      const updatecashold = (idx) => {
        let x ={...values};
      
        let foodItem = x.ordercashDetails[idx];
        foodItem.foodItemName = datacashitems.foodItemName
           foodItem.foodItemPrice = datacashitems.foodItemPrice
              foodItem.quantity = datacashitems.quantity
              foodItem.tax = datacashitems.tax
             foodItem.lessweight = datacashitems.lessweight
                  foodItem.netweight = Number(datacashitems.foodItemPrice - datacashitems.lessweight)
                    foodItem.Tfiness = Number((datacashitems.netweight * datacashitems.tax ) / 100).toFixed(3);
                   foodItem.rate = datacashitems.rate
              foodItem.discount = datacashitems.discount
 foodItem.subtotal = Number(datacashitems.foodItemPrice * datacashitems.rate);
        setValues({...x});
        setIsEditingcash(false)
        //resetInputField()
      }

      const updatepurchasenetrate = (idx, editedDatapurchasenetrate) => {
  setValues((prevValues) => {
    const updatedOrderDetailspurchasenetrate = prevValues.ordercashDetails.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatapurchasenetrate.foodItemName,
          foodItemPrice: editedDatapurchasenetrate.foodItemPrice,
          quantity: editedDatapurchasenetrate.quantity,
          tax: editedDatapurchasenetrate.tax,
          lessweight: editedDatapurchasenetrate.lessweight,
          netweight: Number(editedDatapurchasenetrate.foodItemPrice - editedDatapurchasenetrate.lessweight),
          Tfiness : Number((Number(editedDatapurchasenetrate.foodItemPrice - editedDatapurchasenetrate.lessweight) * editedDatapurchasenetrate.tax ) / 100).toFixed(3),
          rate:editedDatapurchasenetrate.rate,
           discount:editedDatapurchasenetrate.discount,
         subtotal: Number(editedDatapurchasenetrate.foodItemPrice * editedDatapurchasenetrate.rate)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      ordercashDetails: updatedOrderDetailspurchasenetrate,
    };
  });

  setIsEditingcash(false);
};

const handleDialogSubmitpurchasenetrate = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatepurchasenetrate(editingIndexpurchasenetrate, editedDatapurchasenetrate);

  setIsDialogOpenpurchasenetrate(false);
  setEditingIndexpurchasenetrate(null);
};
      const newkey = 'fancy';
      const updatefancy = (idx) => {
        let x ={...values};
      
        let foodItem = x.fancyitems[idx];
        foodItem.foodItemName = datafancy.foodItemName
           foodItem.foodItemPrice = datafancy.foodItemPrice
              foodItem.quantity = datafancy.quantity
              foodItem.tax = Number((datafancy.foodItemPrice * 1)/datafancy.rate).toFixed(3)
              foodItem.rate = datafancy.rate
              foodItem.discount = datafancy.discount
 foodItem.subtotal = newkey === datafancy.type ?  (datafancy.foodItemPrice * 1)  : (datafancy.foodItemPrice * 1)
        setValues({...x});
        setIsEditingfancy(false)
        //resetInputField()
      }

           const updatepurchaseratecut = (idx, editedDatapurchaseratecut) => {
  setValues((prevValues) => {
    const updatedOrderDetailspurchaseratecut = prevValues.fancyitems.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatapurchaseratecut.foodItemName,
          foodItemPrice: editedDatapurchaseratecut.foodItemPrice,
          quantity: editedDatapurchaseratecut.quantity,
          tax: Number((editedDatapurchaseratecut.foodItemPrice * 1)/editedDatapurchaseratecut.rate).toFixed(3),
          //lessweight: editedDatapurchaseratecut.lessweight,
          //netweight: Number(editedDatapurchaseratecut.foodItemPrice - editedDatapurchaseratecut.lessweight),
          //Tfiness : Number((Number(editedDatapurchaseratecut.foodItemPrice - editedDatapurchaseratecut.lessweight) * editedDatapurchaseratecut.tax ) / 100).toFixed(3),
          rate:editedDatapurchaseratecut.rate,
           discount:editedDatapurchaseratecut.discount,
          subtotal:
          newkey === editedDatapurchaseratecut.type ?  (editedDatapurchaseratecut.foodItemPrice * 1)  : (editedDatapurchaseratecut.foodItemPrice * 1)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      fancyitems: updatedOrderDetailspurchaseratecut,
    };
  });

  setIsEditingfancy(false);
};

const handleDialogSubmitpurchaseratecut = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatepurchaseratecut(editingIndexpurchaseratecut, editedDatapurchaseratecut);

  setIsDialogOpenpurchaseratecut(false);
  setEditingIndexpurchaseratecut(null);
};


      const updateratecutold = (idx) => {
        let x ={...values};
      
        let foodItem = x.ratecutitems[idx];
        foodItem.foodItemName = dataratecut.foodItemName
           foodItem.foodItemPrice = dataratecut.foodItemPrice
              foodItem.quantity = dataratecut.quantity
              foodItem.tax = Number((dataratecut.foodItemPrice * 1)/dataratecut.rate).toFixed(3)
              foodItem.rate = dataratecut.rate
              foodItem.discount = dataratecut.discount
 foodItem.subtotal = newkey === dataratecut.type ?  (dataratecut.foodItemPrice * 1)  : (dataratecut.foodItemPrice * 1)
        setValues({...x});
        setIsEditingratecut(false)
        //resetInputField()
      }

      const updateratecut = (idx, editedDataratecut) => {
  setValues((prevValues) => {
    const updatedOrderDetailsratecut = prevValues.ratecutitems.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDataratecut.foodItemName,
          foodItemPrice: editedDataratecut.foodItemPrice,
          quantity: editedDataratecut.quantity,
          tax: Number((editedDataratecut.foodItemPrice * 1)/editedDataratecut.rate).toFixed(3),
          //lessweight: editedDataratecut.lessweight,
          //netweight: Number(editedDataratecut.foodItemPrice - editedDataratecut.lessweight),
          //Tfiness : Number((Number(editedDataratecut.foodItemPrice - editedDataratecut.lessweight) * editedDataratecut.tax ) / 100).toFixed(3),
          rate:editedDataratecut.rate,
           discount:editedDataratecut.discount,
          subtotal:
          newkey === editedDataratecut.type ?  (editedDataratecut.foodItemPrice * 1)  : (editedDataratecut.foodItemPrice * 1)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      ratecutitems: updatedOrderDetailsratecut,
    };
  });

  setIsEditingratecut(false);
};

const handleDialogSubmitratecut = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updateratecut(editingIndexratecut, editedDataratecut);

  setIsDialogOpenratecut(false);
  setEditingIndexratecut(null);
};


       const newpcs = 'pcs';
      const updatepiece = (idx,value) => {
        let x ={...values};
      
        let foodItem = x.pieceitems[idx];
        //foodItem.foodItemName = datapiece.foodItemName
           //foodItem.foodItemPrice = datapiece.foodItemPrice
              if (foodItem.quantity + value > 0) {
            foodItem.quantity += value;
          
        }
              //foodItem.tax = datafancy.tax
              //foodItem.rate = datafancy.rate
              //foodItem.discount = datafancy.discount
 foodItem.subtotal = foodItem.foodItemPrice * foodItem.quantity
        setValues({...x});
        setIsEditingfancy(false)
        //resetInputField()
      }

      const itemwastages = 'pcs';
       const updatewastage = (idx) => {
        let x ={...values};
      
        let foodItem = x.pieceitems[idx];
        foodItem.foodItemName = datawastage.foodItemName
           foodItem.foodItemPrice = datawastage.foodItemPrice
              foodItem.quantity = datawastage.quantity
              foodItem.tax = datawastage.tax
              foodItem.discount = datawastage.discount
 foodItem.subtotal = datawastage.foodItemPrice * datawastage.quantity;
        setValues({...x});
        setIsEditingwastage(false)
        //resetInputField()
      }

      const updatecash = (idx, editedDatacash) => {
  setValues((prevValues) => {
    const updatedOrderDetailscash = prevValues.pieceitems.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatacash.foodItemName,
          foodItemPrice: editedDatacash.foodItemPrice,
          quantity: editedDatacash.quantity,
          tax: editedDatacash.tax,
        rate:editedDatacash.rate,
           discount:editedDatacash.discount,
          subtotal: Number(editedDatacash.foodItemPrice * editedDatacash.quantity)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      pieceitems: updatedOrderDetailscash,
    };
  });

  setIsEditingwastage(false);
};

const handleDialogSubmitcash = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatecash(editingIndexcash, editedDatacash);

  setIsDialogOpencash(false);
  setEditingIndexcash(null);
};

      const updatewastagecash = (idx) => {
        let x ={...values};
      
        let foodItem = x.cashitems[idx];
        foodItem.foodItemName = datawastagecash.foodItemName
           foodItem.foodItemPrice = datawastagecash.foodItemPrice
              foodItem.quantity = datawastagecash.quantity
              foodItem.tax = datawastagecash.tax
              foodItem.discount = datawastagecash.discount
 foodItem.subtotal = datawastagecash.foodItemPrice * datawastagecash.quantity;
        setValues({...x});
        setIsEditingwastagecash(false)
        //resetInputField()
      }


      const updatepurchasecash = (idx, editedDatapurchasecash) => {
  setValues((prevValues) => {
    const updatedOrderDetailspurchasecash = prevValues.cashitems.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemName: editedDatapurchasecash.foodItemName,
          foodItemPrice: editedDatapurchasecash.foodItemPrice,
          quantity: editedDatapurchasecash.quantity,
          tax: editedDatapurchasecash.tax,
        rate:editedDatapurchasecash.rate,
           discount:editedDatapurchasecash.discount,
          subtotal: Number(editedDatapurchasecash.foodItemPrice * editedDatapurchasecash.quantity)
        };
      }
      return item;
    });

    return {
      ...prevValues,
      cashitems: updatedOrderDetailspurchasecash,
    };
  });

  setIsEditingwastagecash(false);
};

const handleDialogSubmitpurchasecash = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatepurchasecash(editingIndexpurchasecash, editedDatapurchasecash);

  setIsDialogOpenpurchasecash(false);
  setEditingIndexpurchasecash(null);
};
const oldnewval = 'oldsilver';

     const oldupdate = (idx) => {
        let x ={...values};
      
        let foodItem = x.oldorderDetails[idx];

         foodItem.foodItemNames = dataold.foodItemNames
           foodItem.foodItemPrices = dataold.foodItemPrices
              foodItem.quantitys = dataold.quantitys
              foodItem.taxs = dataold.taxs
             foodItem.lessweights = dataold.lessweights
                  foodItem.netweights = Number(dataold.foodItemPrices - dataold.lessweights)
                    foodItem.Tfinesss = Number((Number(dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100).toFixed(3);
                   foodItem.rate = dataold.rate
              foodItem.discounts = dataold.discounts
 foodItem.subtotals = oldnewval === dataold.type ? Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate : Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate;

        setValues({...x});
        setIsEditingold(false)
      
      }

const updatepurchase = (idx, editedDatapurchase) => {
  setValues((prevValues) => {
    const updatedOrderDetailspurchase = prevValues.oldorderDetails.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          foodItemNames: editedDatapurchase.foodItemNames,
          foodItemPrices: editedDatapurchase.foodItemPrices,
          quantitys: editedDatapurchase.quantitys,
          taxs: editedDatapurchase.taxs,
          lessweights: editedDatapurchase.lessweights,
          netweights: Number(editedDatapurchase.foodItemPrices - editedDatapurchase.lessweights),
          Tfinesss : Number((Number(editedDatapurchase.foodItemPrices - editedDatapurchase.lessweights) * editedDatapurchase.taxs ) / 100).toFixed(3),
          rate:editedDatapurchase.rate,
           discounts:editedDatapurchase.discounts,
          subtotals:
           oldnewval === editedDatapurchase.type ? Number(((editedDatapurchase.foodItemPrices - editedDatapurchase.lessweights) * editedDatapurchase.taxs ) / 100) * editedDatapurchase.rate : Number(((editedDatapurchase.foodItemPrices - editedDatapurchase.lessweights) * editedDatapurchase.taxs) / 100) * editedDatapurchase.rate
        };
      }
      return item;
    });

    return {
      ...prevValues,
      oldorderDetails: updatedOrderDetailspurchase,
    };
  });

  setIsEditingold(false);
};

const handleDialogSubmitpurchase = (e) => {
  e.preventDefault();
  // Perform validation or other actions if needed
  
  updatepurchase(editingIndexpurchase, editedDatapurchase);

  setIsDialogOpenpurchase(false);
  setEditingIndexpurchase(null);
};

  
const [oldListVisibility, setOldListVisibility] = useState(false);
const [oldListVisibilitycash, setOldListVisibilitycash] = useState(false);
const [silverListVisibility, setsilverListVisibility] = useState(false);
const [nonstockListVisibility, setnonstockListVisibility] = useState(false);
const [oldsilverListVisibility, setOldsilverListVisibility] = useState(false);
const [oldsilverListVisibilitycut, setOldsilverListVisibilitycut] = useState(false);
const [wastageListVisibility,setwastageListVisibility] = useState(false);
 
const openListOfOld = () => {
        setOldListVisibility(true);
    }

    const openListOfOldcash = () => {
      setOldListVisibilitycash(true);
  }
const openListOfOldsilver = () => {
   setOldsilverListVisibility(true);
}


const openListOfOldsilvercut = () => {
  setOldsilverListVisibilitycut(true);
}
const openListsilver = () => {
        setsilverListVisibility(true);
    }

const openListnonstock = () => {
  setnonstockListVisibility(true);
}

const openListwastage = () => {
  setwastageListVisibility(true);
}
const [orderListVisibility, setOrderListVisibility] = useState(false);
const openListOfOrders = () => {
        setOrderListVisibility(true);
    }
       const { recordForEdit } = props;
    //let orderedFoodItems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    //const [searchList, setSearchList] = useState([]);
    //const [searchKey, setSearchKey] = useState('');

  
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
            if (recordForEdit != null)
            setDatasilver({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatacashitems({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatafancy({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDataratecut({
                ...recordForEdit,
                
            })
            
            if (recordForEdit != null)
            setDataold({
                ...recordForEdit,
                
            })
            if (recordForEdit != null)
            setDatawastage({
                ...recordForEdit,
                
            })
             if (recordForEdit != null)
            setDatawastagecash({
                ...recordForEdit,
                
            })
    }, [recordForEdit])
   
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
   let today = new Date();

const tday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    const resetInputField = () => {
        setData(initialFValues);

    };

    initialFValuescash = {
      id: '',
      type:'silver',
      netweight:'',
      lessweight:'',
      foodItemId: '',
      Tfiness:'',
       salesdate:new Date(),
      foodItemName: '',
      quantity:'',
      foodItemPrice: '',
      rate:'',
      tax: '',
      discount:'',
      subtotal:0
  }
    initialFValuesilver = {
      id: '',
      type:'silver',
      netweight:'',
      lessweight:'',
      foodItemId: '',
      Tfiness:'',
       salesdate:new Date(),
      foodItemName: '',
      quantity:'',
      foodItemPrice: '',
      rate:'',
      tax: '',
      discount:'',
      subtotal:0
  }
    initialFValues = {
        id: '',
        type:'silver',
        netweight:'',
        lessweight:'',
        foodItemId: '',
        Tfiness:'',
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotal:0
    }

    initialFValuesfancy = {
        id: '',
        type:'fancy',
        model:'pcs',
        foodItemId: '',
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotal:0
    }
    initialFValuesratecut= {
      id: '',
      type:'fancy',
      model:'pcs',
      foodItemId: '',
       salesdate:new Date(),
      foodItemName: '',
      quantity:'',
      foodItemPrice: '',
      rate:'',
      tax: '',
      discount:'',
      subtotal:0
  }
     initialFValuespiece = {
        id: '',
        type:'pcs',
        model:'pcs',
        foodItemId: '',
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        subtotal:0
    }
      initialFValueswastage = {
        id: '',
        type:'wastage',
        foodItemId: '',
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotalwastage:0
    }

    initialFValueswastagecash = {
        id: '',
        type:'wastage',
        foodItemId: '',
         salesdate:new Date(),
        foodItemName: '',
        quantity:'',
        foodItemPrice: '',
        rate:'',
        tax: '',
        discount:'',
        subtotalwastage:0
    }
     initialFValuesold = {
        id: '',
        foodItemId: '',
         type:'oldsilver',
          salesdate:new Date(),
           netweights:'',
        lessweights:'',
        foodItemNames: '',
         Tfinesss:'',
        quantitys:'',
        foodItemPrices: '',
        rate:'',
        taxs: '',
        discounts:'',
        subtotals:0
    }
    const [data, setData] = useState(initialFValues)
    const [datacashitems, setDatacashitems] = useState(initialFValuescash)
    const [datasilver, setDatasilver] = useState(initialFValuesilver)
   // const [datapiece, setDatapiece] = useState(initialFValuespiece)
     const [datafancy, setDatafancy] = useState(initialFValuesfancy)
     const [dataratecut, setDataratecut] = useState(initialFValuesratecut)

  const [dataold, setDataold] = useState(initialFValuesold)

  const [datawastage, setDatawastage] = useState(initialFValueswastage)
   const [datawastagecash, setDatawastagecash] = useState(initialFValueswastagecash)
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
}
function handlesilver(e) {
  const newdata = { ...datasilver }
  newdata[e.target.id] = e.target.value
  setDatasilver(newdata)
}
function handlecash(e) {
  const newdata = { ...datacashitems }
  newdata[e.target.id] = e.target.value
  setDatacashitems(newdata)
}
 function handlefancy(e) {
        const newdatafancy = { ...datafancy }
        newdatafancy[e.target.id] = e.target.value
        setDatafancy(newdatafancy)
}
function handleratecut(e) {
  const newdatafancy = { ...dataratecut }
  newdatafancy[e.target.id] = e.target.value
  setDataratecut(newdatafancy)
}
 function handlewastage(e) {
        const newdatawastage = { ...datawastage }
        newdatawastage[e.target.id] = e.target.value
        setDatawastage(newdatawastage)
}
 function handlewastagecash(e) {
        const newdatawastage = { ...datawastagecash }
        newdatawastage[e.target.id] = e.target.value
        setDatawastagecash(newdatawastage)
}
 function handleold(e) {
        const newdataold = { ...dataold }
        newdataold[e.target.id] = e.target.value
        setDataold(newdataold)
}

    const handleChange = (e) => {
        e.preventDefault()
       
       
    }

   
     const [notify, setNotify] = useState({ isOpen: false })
 const [currentId, setCurrentId] = useState(0)
const [isEditing, setIsEditing] = useState(false)

const [currentIdsilver, setCurrentIdsilver] = useState(0)
const [isEditingsilver, setIsEditingsilver] = useState(false)

const [currentIdcash, setCurrentIdcash] = useState(0)
const [isEditingcash, setIsEditingcash] = useState(false)

 const [currentIdfancy, setCurrentIdfancy] = useState(0)
const [isEditingfancy, setIsEditingfancy] = useState(false)

const [currentIdratecut, setCurrentIdratecut] = useState(0)
const [isEditingratecut, setIsEditingratecut] = useState(false)

 const [currentIdwastage, setCurrentIdwastage] = useState(0)
const [isEditingwastage, setIsEditingwastage] = useState(false)
 const [currentIdold, setCurrentIdold] = useState(0)
const [isEditingold, setIsEditingold] = useState(false)

const [isEditingwastagecash, setIsEditingwastagecash] = useState(false)
 const [currentIdwastagecash, setCurrentIdwastagecash] = useState(0)

  useEffect(() => {
        if (currentId != 0) {
            setData({
                ...orderedFoodItems.find(x => x.id == currentId)
            })
            
        }
        if (currentIdsilver != 0) {
          setDatasilver({
              ...orderedFoodItemsilver.find(x => x.id == currentIdsilver)
          })
          
      }
      if (currentIdcash != 0) {
        setDatacashitems({
            ...ordercash.find(x => x.id == currentIdcash)
        })
        
    }
         if (currentIdfancy != 0) {
            setDatafancy({
                ...orderedfancyitems.find(x => x.id == currentIdfancy)
            })
            
        }

        if (currentIdratecut != 0) {
          setDataratecut({
              ...orderedratecutitems.find(x => x.id == currentIdratecut)
          })
          
      }


         if (currentIdold != 0) {
            setDataold({
                ...oldorderedFoodItems.find(x => x.id == currentIdold)
            })
            
        }
         if (currentIdwastage != 0) {
            setDatawastage({
                ...orderpieceitems.find(x => x.id == currentIdwastage)
            })
         }
           if (currentIdwastagecash != 0) {
            setDatawastagecash({
                ...ordercashitems.find(x => x.id == currentIdwastagecash)
            })
         }
    }, [currentId,currentIdsilver,currentIdcash,currentIdold,currentIdfancy,currentIdratecut,currentIdwastage,currentIdwastagecash])
 
    const [display, setdisplay] = useState([]);
   const [displaysil, setdisplaysil] = useState([]);
    const [displaysilold, setdisplaysilold] = useState([]);
     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))

             createAPIEndpoint(ENDPIONTS.SILVER).fetchAll()
            .then(res => {
              
                setdisplaysil(res.data)
            })
            .catch(err => console.log(err))
              createAPIEndpoint(ENDPIONTS.OLD_SILVER).fetchAll()
            .then(res => {
              
                setdisplaysilold(res.data)
            })
            .catch(err => console.log(err))
    }, [])
const rates =   display.map(item => (item.rate))
const silrate = displaysil.map(item => (item.rate))
const oldsilrate = displaysilold.map(item => (item.rate))
const oldrategold = rates - 100
const subtotals = values.orderDetails.reduce((prev, curr) => {
   
      return prev + (curr.foodItemPrice * curr.quantity * rates) - (curr.discount * curr.foodItemPrice * curr.quantity * rates) / 100 + curr.tax * (curr.foodItemPrice * curr.quantity * rates) / 100;
    
  }, 0);
{/*const tot = values.orderDetails.reduce((prev, curr) => {
   
      return prev + (curr.foodItemPrices - curr.quantitys) * cd;
    
  }, 0);
*/}
   const [open, setOpen] = React.useState(false);
   const submitOrder = e => {
    //e.preventDefault();
    
        if (values.id == 0) {
         // setNotify({ isOpen: true, message: 'New order is created.',severity:"success" });
                createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
                //.catch(
                  //      errorsound.play(),
                  //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" ,variant:"filled"}));
        }
        else {
            createAPIEndpoint(ENDPIONTS.PURCHASESILVER).update(values.id, values)
                .then(res => {
                 // audioupdate.play()
                    setOrderId(0);
                     //getFreshModelObject()
                    setNotify({ isOpen: true, message: 'The order is updated.',severity:"info" });
                })
                 .catch(err => console.log(err))
                 reloadgpurchase();
               // .catch(
             //errorsound.play(),
                //  setNotify({ isOpen: true, message: "Error Updating Data",severity:"warning" ,variant:"filled"}));
        
    }

}
  const handleClickOpen = () => {
    setOpen(true);
    submitOrder();
    reloadgpurchase();
  
  };
  const [opens, setOpens] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy here
  
    const copyToClipBoard = async copyMe => {
      setOpens(true);
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };
  const handleClose = () => {
    setOpen(false);
  };
  const [productspg, setProductspg] = useState([]);
  const [allProductspg, setAllProductspg] = useState([]);

  const [productspgs, setProductspgs] = useState([]);
  const [allProductspgs, setAllProductspgs] = useState([]);

  const [productspgrc, setProductspgrc] = useState([]);
  const [allProductspgrc, setAllProductspgrc] = useState([]);

  const [productspgc, setProductspgc] = useState([]);
  const [allProductspgc, setAllProductspgc] = useState([]);

  
 //let oldorderedFoodItems = values.oldorderDetails;
  const [productspgod, setProductspgod] = useState([]);
  const [allProductspgod, setAllProductspgod] = useState([]);
//   let ordercash = values.ordercashDetails;
  const [productspgoc, setProductspgoc] = useState([]);
  const [allProductspgoc, setAllProductspgoc] = useState([]);
//let orderedfancyitems = values.fancyitems;
  const [productspgf, setProductspgf] = useState([]);
  const [allProductspgf, setAllProductspgf] = useState([]);
// let ordercashitems = values.cashitems;
  const [productspgci, setProductspgci] = useState([]);
  const [allProductspgci, setAllProductspgci] = useState([]);

    var resultpcs = 0
  var resultpcs = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultcash = 0
  var resultcash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0

  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + resultfancy + resultcash;
//var cashbalance =  values.ordersilverDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var orderpieceitemscash  = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldorderpieceitemscash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldcashbalances =  values.ordercashDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage  + resultpcs ;
 var totalfinesss = values.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0) + values.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0) + Number(values.cashreceivedonline);
  
 var totalfinessss = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
 
 const [transactions, setTransactions] = useState([]);

//const purchasewtsil = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
//let a = (purchasewtsil?.reduce((total,currentValue) => total = total + currentValue,0));

const a = orderedFoodItems
          .filter((row) =>   new Date(row.salesdate).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])
          .reduce((total, currentValue) => total + Number(currentValue.Tfiness), 0)
      

      
//const a = purchaseWtsil?.reduce((total, currentValue) => total + currentValue, 0);


const b =  orderedratecutitems
          .filter((row) =>   new Date(row.salesdate).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])
          .reduce((total, currentValue) => total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
     
  

//const b = purchasewtsils.reduce((total, currentValue) => total + currentValue, 0);

var totalfiness = ((Number(a)+Number(b))).toFixed(3)


const aod = oldorderedFoodItems
       .filter((row) =>   new Date(row.salesdate).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])
          .reduce((total, currentValue) => total + Number(currentValue.Tfinesss), 0)
   

//const aod = purchasewtod.reduce((total, currentValue) => total + currentValue, 0);


const bf = orderedfancyitems
  
          .filter((row) =>   new Date(row.salesdate).toISOString().split('T')[0] ===  new Date().toISOString().split('T')[0])
          .reduce((total, currentValue) => total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
    

//const bf = purchasewtf.reduce((total, currentValue) => total + currentValue, 0);

var adjustfiness = (Number(aod)+Number(bf))

const currentDate = new Date(); 




  useEffect(() => {
     createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    // Fetch data from API
   }, []);

   
const purchasewtsilaa = transactions.map(item =>
  item.orderNumber === values.orderNumber ?
    item.orderDetails
      .filter(detail => new Date(detail.salesdate) < currentDate) // Adjust the date filter logic
      .reduce((total, currentValue) => total + Number(currentValue.Tfiness), 0)
    : 0
);




// Pure Calculations
const todayOrders = transactions.filter(order =>
  order.orderDetails.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString()
  )
);

// Extract Tfiness values from today's orders
const todayTfinessValues = todayOrders.flatMap(order =>
  order.orderDetails
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString())
    .map(detail => Number(detail.Tfiness))
);

const todayDateString = today.toLocaleDateString();

// for top previous OB
const previousOrders = transactions.filter(order => order.orderNumber == values.orderNumber ?
  order.orderDetails.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() !== todayDateString
  ) : ""
);

// for top previous OB
const previousTfinessValues = previousOrders.flatMap(order =>
  order.orderDetails
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() !== todayDateString)
    .map(detail => Number(detail.Tfiness))
);
const sumOfPreviousTfiness = previousTfinessValues.reduce((sum, value) => sum + value, 0);
console.log('Today\'s Tfiness Values:', todayTfinessValues);
console.log('Previous Tfiness Values:', sumOfPreviousTfiness);

// --------------------------------------------------------------------------------

// Rate Cut calculate
const todayOrdersrc = transactions.filter(order =>
  order.ratecutitems.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString()
  )
);

// Extract Tfiness values from today's orders
const todayTfinessValuesrc = todayOrdersrc.flatMap(order =>
  order.ratecutitems
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString())
    .map(detail => Number(detail.tax))
);

const todayDateStringrc = today.toLocaleDateString();

// for top previous OB
const previousOrdersrc = transactions.filter(order => order.orderNumber == values.orderNumber ? 
  order.ratecutitems.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() !== todayDateStringrc
  ) : ""
);

// for top previous OB
const previousTfinessValuesrc = previousOrdersrc.flatMap(order =>
  order.ratecutitems
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() !== todayDateString)
    .map(detail => Number(detail.tax))
);
const sumOfPreviousTfinessrc = previousTfinessValuesrc.reduce((sum, value) => sum + value, 0);
console.log('Today\'s Tfiness Values:', todayTfinessValuesrc);
console.log('Previous Tfiness Values:', sumOfPreviousTfinessrc);

// -----------------------------------------------------------------------------------
// for Bottom previous OB
const previousOrdersbottom = transactions.filter(order => order.orderNumber == values.orderNumber ?
  order.oldorderDetails.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() !== todayDateString
  ) : ""
);

// for Bottom previous OB
const previousTfinessValuesbottom = previousOrdersbottom.flatMap(order =>
  order.oldorderDetails
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() !== todayDateString)
    .map(detail => Number(detail.Tfinesss))
);
const sumOfPreviousTfinessbottom = previousTfinessValuesbottom.reduce((sum, value) => sum + value, 0);
console.log('Today\'s Tfiness Values:', todayTfinessValues);
console.log('Previous Tfiness Values:', sumOfPreviousTfinessbottom);

// --------------------------------------------------------------------------------

// Rate Cut calculate
const todayOrdersorc = transactions.filter(order =>
  order.fancyitems.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString()
  )
);

// Extract Tfiness values from today's orders
const todayTfinessValuesorc = todayOrdersorc.flatMap(order =>
  order.fancyitems
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() === today.toLocaleDateString())
    .map(detail => Number(detail.tax))
);

const todayDateStringorc = today.toLocaleDateString();

// for top previous OB
const previousOrdersorc = transactions.filter(order => order.orderNumber == values.orderNumber ?
  order.fancyitems.some(detail =>
    new Date(detail.salesdate).toLocaleDateString() !== todayDateStringorc
  ) : ""
);

// for top previous OB
const previousTfinessValuesorc = previousOrdersorc.flatMap(order =>
  order.fancyitems
    .filter(detail => new Date(detail.salesdate).toLocaleDateString() !== todayDateString)
    .map(detail => Number(detail.tax))
);
const sumOfPreviousTfinessorc = previousTfinessValuesorc.reduce((sum, value) => sum + value, 0);
console.log('Today\'s Tfiness Values:', todayTfinessValuesorc);
console.log('Previous Tfiness Values:', sumOfPreviousTfinessorc);

// ----------------------------------------------------------------------------------

const totalTfiness = purchasewtsilaa.reduce((total, currentValue) => total + currentValue, 0);

const totalTfinessToday = productspg.map(item =>
  item.orderNumber === values.orderNumber ?
    item.orderDetails
      .filter(detail => new Date(detail.salesdate) === currentDate) // Adjust the date filter logic
      .reduce((total, currentValue) => total + Number(currentValue.Tfiness), 0)
    : 0
);

console.log("to"+totalTfinessToday);
console.log(totalTfiness);
//const purchasewtsils = productspgrc.map(item =>item.orderNumber == values.orderNumber ?(item?.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
//let b = (purchasewtsils?.reduce((total,currentValue) => total = total + currentValue,0));
 const purchasewtsildate = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
let datea = (purchasewtsildate?.reduce((total,currentValue) => total = total + currentValue,0));

const purchasewtsils = productspgrc.map(item =>item.orderNumber == values.orderNumber ?(item?.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
let dateb = (purchasewtsils?.reduce((total,currentValue) => total = total + currentValue,0));

var totaldate = Number(Number(datea) + Number(dateb)).toFixed(3)


const purchasewtod = productspgod.map(item =>item.orderNumber == values.orderNumber ?(item?.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0)):"")
let aodadj = (purchasewtod?.reduce((total,currentValue) => total = total + currentValue,0));

const purchasewtf = productspgf.map(item =>item.orderNumber == values.orderNumber ?(item?.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
let bfadj = (purchasewtf?.reduce((total,currentValue) => total = total + currentValue,0));

var adjusttotaldate = Number(Number(aodadj) + Number(bfadj)).toFixed(3)


var totalab = ((Number(a)+Number(b))).toFixed(3)
const silcal = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.ordersilverDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let aa = (silcal?.reduce((total,currentValue) => total = total + currentValue,0));

const cascal = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.pieceitems.reduce((total, currentValue) =>  total = total + currentValue.subtotal,0)):"")
let bb = (cascal?.reduce((total,currentValue) => total = total + currentValue,0));

const purerate = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) =>  total = total + currentValue.subtotal,0)):"")
let cc = (purerate?.reduce((total,currentValue) => total = total + currentValue,0));

var cashbalance = (Number(aa)+Number(bb)+Number(cc))


//const purchasewtod = productspgod.map(item =>item.orderNumber == values.orderNumber ?(item?.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0)):"")
//let aod = (purchasewtod?.reduce((total,currentValue) => total = total + currentValue,0));

//const purchasewtf = productspgf.map(item =>item.orderNumber == values.orderNumber ?(item?.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
//let bf = (purchasewtf?.reduce((total,currentValue) => total = total + currentValue,0));

//var adjustfiness = (Number(aod)+Number(bf))






var abcde = (Number(totalab) - Number(adjustfiness)).toFixed(3)
const abcd = new Date().toLocaleDateString != new Date().toLocaleDateString ? 0 : abcde
const orderc = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.ordercashDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let aoc = (orderc?.reduce((total,currentValue) => total = total + currentValue,0));

const orderci = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)):"")
let bci = (orderci?.reduce((total,currentValue) => total = total + currentValue,0));

const ordercifiness = transactions.map(item =>item.orderNumber == values.orderNumber ?(item?.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0)):"")
let cci = (ordercifiness?.reduce((total,currentValue) => total = total + currentValue,0));

var oldcashbalance = (Number(aoc)+Number(bci)+Number(cci))

 // var totalfiness = values.orderDetails.reduce((total, currentValue) => total = total +   Number(((currentValue.foodItemPrice - currentValue.lessweight) * currentValue.tax)/100),0)
  var cashfiness = values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
  
   //var adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(((currentValue.foodItemPrices - currentValue.lessweights) * currentValue.taxs)/100),0)         
var adjustfinesss = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0) + Number(cashfiness)
   
   var netbalancefiness =  Number(totalfiness - adjustfiness)
   const Total = data.foodItemPrice * data.quantity

   let  Equity = Number(values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0)) +
         values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);

         
        let filtered = allProductspg.map(product => ({
          ...product,
          orderDetails: product.orderDetails.filter(child => {
            let productDate = new Date(child["salesdate"]);
            return productDate.salesdate !== today.salesdate;
          })
        }))
       
let netnew  = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")        
//let netnew = filtered?.map(item =>item.orderNumber == values.orderNumber ? item.orderDetails.map(row=>row.salesdate) == item.orderDetails.map(row=>row.salesdate)?"":(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
//let netnew = (?.reduce((total,currentValue) => total = Number(total + currentValue.Tfiness),0));
         
//const purchasewtsils = productspgrc.map(item =>item.orderNumber == values.orderNumber ?(item?.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)):"")
//let b = (purchasewtsils?.reduce((total,currentValue) => total = total + currentValue,0));




         const componentRef = useRef();
  const Print = () => {  
    window.print();
  }
  const visible = 'hideedit'
const noId = 0;
const vat = Number(values.cgst) + Number(values.sgst);
const taxRate = (vat * Math.round(newitem).toFixed(2)) / 100;
const scgst = Math.round(newitem).toFixed(2)  + taxRate;
  const edited = "Balance";
   let totalcash =  (Number(values.cashreceived) + Number(values.cashreceivedonline));

   const [alignment, setAlignment] = React.useState('InGots');

  const handleChanges = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  

  const reloadgpurchase = () =>{
     createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
  }
  const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());

    useEffect(()=>{
    createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
            .then(res => {
              
                setTransactions(res.data)
            })
            .catch(err => console.log(err))

        },[])
  const handleSelectpg = (date) =>{
    // let filtered = allProductspg.filter((product) => {item.oldorderDetails.filter((row) =>{
 let filtered = allProductspg.map(product => ({
   ...product,
   orderDetails: product.orderDetails.filter(child => {
     let productDate = new Date(child["salesdate"]);
     return(productDate>= date.selection.startDate &&
       productDate<= date.selection.endDate);
   })
 }))
 .filter(item => item.orderDetails.length > 0)
     setStartDate(date.selection.startDate);
     setEndDate(date.selection.endDate);
     setProductspg(filtered);

     let filtereds = allProductspgs.map(products => ({
      ...products,
      ordersilverDetails: products.ordersilverDetails.filter(child => {
        let productDate = new Date(child["salesdate"]);
        return(productDate>= date.selection.startDate &&
          productDate<= date.selection.endDate);
      })
    }))
    .filter(item => item.ordersilverDetails.length > 0)
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
        setProductspgs(filtereds);

        let filteredrc = allProductspgrc.map(productrc => ({
          ...productrc,
          ratecutitems: productrc.ratecutitems.filter(child => {
            let productDate = new Date(child["salesdate"]);
            return(productDate>= date.selection.startDate &&
              productDate<= date.selection.endDate);
          })
        }))
        .filter(item => item.ratecutitems.length > 0)
            setStartDate(date.selection.startDate);
            setEndDate(date.selection.endDate);
            setProductspgrc(filteredrc);

            let filteredc = allProductspgc.map(productc => ({
              ...productc,
              pieceitems: productc.pieceitems.filter(child => {
                let productDate = new Date(child["salesdate"]);
                return(productDate>= date.selection.startDate &&
                  productDate<= date.selection.endDate);
              })
            }))
            .filter(item => item.pieceitems.length > 0)
                setStartDate(date.selection.startDate);
                setEndDate(date.selection.endDate);
                setProductspgc(filteredc);

                let filteredod = allProductspgod.map(productod => ({
                  ...productod,
                  oldorderDetails: productod.oldorderDetails.filter(child => {
                    let productDate = new Date(child["salesdate"]);
                    return(productDate>= date.selection.startDate &&
                      productDate<= date.selection.endDate);
                  })
                }))
                .filter(item => item.oldorderDetails.length > 0)
                    setStartDate(date.selection.startDate);
                    setEndDate(date.selection.endDate);
                    setProductspgod(filteredod);

                    let filteredoc = allProductspgoc.map(productoc => ({
                      ...productoc,
                      ordercashDetails: productoc.ordercashDetails.filter(child => {
                        let productDate = new Date(child["salesdate"]);
                        return(productDate>= date.selection.startDate &&
                          productDate<= date.selection.endDate);
                      })
                    }))
                    .filter(item => item.ordercashDetails.length > 0)
                        setStartDate(date.selection.startDate);
                        setEndDate(date.selection.endDate);
                        setProductspgoc(filteredoc);

                        let filteredf = allProductspgf.map(productf => ({
                          ...productf,
                          fancyitems: productf.fancyitems.filter(child => {
                            let productDate = new Date(child["salesdate"]);
                            return(productDate>= date.selection.startDate &&
                              productDate<= date.selection.endDate);
                          })
                        }))
                        .filter(item => item.fancyitems.length > 0)
                            setStartDate(date.selection.startDate);
                            setEndDate(date.selection.endDate);
                            setProductspgf(filteredf);


                            let filteredci = allProductspgci.map(productci => ({
                              ...productci,
                              cashitems: productci.cashitems.filter(child => {
                                let productDate = new Date(child["salesdate"]);
                                return(productDate>= date.selection.startDate &&
                                  productDate<= date.selection.endDate);
                              })
                            }))
                            .filter(item => item.cashitems.length > 0)
                                setStartDate(date.selection.startDate);
                                setEndDate(date.selection.endDate);
                                setProductspgci(filteredci);

                        
   };

       var resultpcs = 0
  var resultpcs = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultcash = 0
  var resultcash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultwastage =  values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var resultswastage = 0
   var resultfancy =  values.fancyitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var result = 0
  var resultpcss = 0
  var results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage + resultpcs;
  var oldresult = 0
  var oldresults = 0

  var news = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0) + resultfancy + resultcash;
//var cashbalance =  values.ordersilverDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var orderpieceitemscash  = values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldorderpieceitemscash = values.cashitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
var oldcashbalances =  values.ordercashDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
  var newitem = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage  + resultpcs ;
 var totalfinesss = values.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0) + values.ratecutitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0) + Number(values.cashreceivedonline);
  
 var totalfinessss = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")
 
 const purchasewtsil = productspg.map(item =>item.orderNumber == values.orderNumber ?(item?.orderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfiness),0)):"")






console.log("to"+totalTfinessToday);
console.log(totalTfiness);


var totalfiness = ((Number(a)+Number(b)) + Number(values.cashreceivedonline)).toFixed(3)

var totalab = ((Number(a)+Number(b))).toFixed(3)


var cashbalance = (Number(aa)+Number(bb)+Number(cc))



var adjustfiness = (Number(aod)+Number(bf) + Number(values.onlinecash)).toFixed(3)

var abcde = (Number(totalab) - Number(adjustfiness)).toFixed(3)


var oldcashbalance = (Number(aoc)+Number(bci)+Number(cci))

 // var totalfiness = values.orderDetails.reduce((total, currentValue) => total = total +   Number(((currentValue.foodItemPrice - currentValue.lessweight) * currentValue.tax)/100),0)
  var cashfiness = values.fancyitems.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice * 1)/currentValue.rate,0)
  
   //var adjustfiness = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(((currentValue.foodItemPrices - currentValue.lessweights) * currentValue.taxs)/100),0)         
var adjustfinesss = values.oldorderDetails.reduce((total, currentValue) => total = total + Number(currentValue.Tfinesss),0) + Number(cashfiness)
   
   var netbalancefiness =  Number(totalfiness - adjustfiness)
 

 
         
       
       



 useEffect(()=>{
     createAPIEndpoint(ENDPIONTS.PURCHASESILVER).fetchAll()
              .then(res => {
                setProductspg(res.data);
                setAllProductspg(res.data);
                setProductspgs(res.data);
                setAllProductspgs(res.data);
                setProductspgrc(res.data);
                setAllProductspgrc(res.data);
                setProductspgc(res.data);
                setAllProductspgc(res.data);

                setProductspgod(res.data);
                setAllProductspgod(res.data);
                setProductspgoc(res.data);
                setAllProductspgoc(res.data);
                setProductspgf(res.data);
                setAllProductspgf(res.data);
                setProductspgci(res.data);
                setAllProductspgci(res.data);

                
              })
              .catch(err => console.log(err))

        },[])
   const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  const convertToImage = async (componentRef) => {
    const canvas = await html2canvas(componentRef);
    return canvas.toDataURL('image/png');
  };
  const downloadImage = (dataUrl, fileName) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleConvertToImage = async () => {
    const imageDataUrl = await convertToImage(componentRef.current);
    //const fileName = "myImage.png";
    const fileName = `${values.shopName}.png`;
    console.log('Image Data URL:', imageDataUrl);
    downloadImage(imageDataUrl, fileName);
    // Now you can use the imageDataUrl as needed (e.g., display it or save it).
  };
let obw = ((Number(sumOfPreviousTfiness) + Number(sumOfPreviousTfinessrc)) - (Number(sumOfPreviousTfinessbottom) + Number(sumOfPreviousTfinessorc))).toFixed(3)
let obws = ((Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc)+Number(totalfiness)) - (Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness)))).toFixed(3)  
let netwt = (Number(obw) + Number(totalfiness)).toFixed(3)

let adobw = ((Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)).toFixed(3))
let netadwt = (Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness))).toFixed(3)

  return (
    
    <Grid container spacing={2}>
    <Grid item xs={6}>
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar
    
    >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6" >
      EQUITY
        </Typography>
        <Grid
  container
  
  direction="column"
  
 
  
>

  <Grid >
  <ThemeProvider theme={blackTheme}>
            <Button className={`${classes.root} `}  >
              <Badge badgeContent={orderedFoodItems.length} color="primary" > 
      <Tooltip title="Add Item"   arrow> 
        <img src={Printimg} height={35} onClick={handleClickOpen}/> 
         </Tooltip>
    </Badge>
        
          </Button>
   </ThemeProvider>
     
  </Grid>   
   
</Grid> 
 
  {/* <IconButton onClick={openListwastage}>
 <img src="https://img.icons8.com/material/30/FAB005/increase-decimal.png"/>
       
 
        </IconButton> */}


    <IconButton onClick={openListnonstock}>
  
    <Stack>
    <img src={Cashimg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >CASH</Box>
    </Stack>
  </IconButton>
  <Tooltip title="RATE CUT"   arrow> 
        <IconButton onClick={openListOfOldsilvercut}>
        <Stack>
        <img src={Taximg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >RATE CUT</Box>
    </Stack>  


  </IconButton>
         </Tooltip>
    <IconButton onClick={openListsilver}>
    <Stack>
    <img src={OSilver} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >Net Rate</Box>
    </Stack>
      
  </IconButton>

<IconButton onClick={openListOfOrders}>

<Stack>
<img src={OGold} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >GOLD</Box>
    </Stack>    
 
</IconButton>
    </Toolbar>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className={classes.table }>
        <TableHead>
          <TableRow>
             <TableCell>Date</TableCell>
            <TableCell>ItemName</TableCell>
            <TableCell>Gross Weight</TableCell>
            <TableCell>Loss Weight</TableCell>
             <TableCell>Net Weight</TableCell>
               <TableCell>Purity</TableCell>
                <TableCell>Finess</TableCell>
                <TableCell>Rate</TableCell>
            <TableCell>Cash</TableCell>
                  <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          orderedFoodItems.map((item ,idx) => {
          resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
         //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
          results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
          result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                    {/*   <TableCell  component="th" scope="row">{
              noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
              <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
              </TableCell>
                                        <TableCell  onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                         
                                   {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Item" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={data.foodItemName} onChange={(e) => handle(e)} />
                </form>
                : <Div >{item.foodItemName}</Div>
            }
                                        </TableCell>
             
                                        <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                            <>
{
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Gross Weight" 
                name="foodItemPrice" id="foodItemPrice" value={data.foodItemPrice} onChange={(e) => handle(e)} />
                </form>
                : <Div > {item.foodItemPrice}g</Div>
            }
                                 </>
                                        </TableCell>


                                        <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                            <>
{
                isEditing === idx ? newval === item.type ? "-" :
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Loss Weight" 
                name="lessweight" id="lessweight" value={data.lessweight} onChange={(e) => handle(e)} />
                </form>
                : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
            }
                                 </>
                                        </TableCell>

                                        <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                          
                    {
                isEditing ===idx ? 
                      <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(data.foodItemPrice  - data.lessweight))}</Div>
                :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
            }
          </TableCell>
                                             <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                           {
                isEditing ===idx ? newval === item.type ? "-" :
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Purity" name="tax" id="tax" 
           value={data.tax} onChange={(e) => handle(e)} />
                </form>
                : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
            }
                                           
                                        </TableCell>
                     <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                               { 

      
             isEditing ===idx ? newval === data.type ?  0 : (((data.foodItemPrice - data.lessweight) * data.tax ) / 100).toFixed(3)
             :    <Div > {
              newval === item.type ?  0 :
              (((item.foodItemPrice - item.lessweight) * item.tax) / 100).toFixed(3) }</Div>
                                         }
                                          </TableCell>
                                         
                                   <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                                      {/*newval === item.type ? item.rate :rates */}
                                        {
                isEditing === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={data.rate} onChange={(e) => handle(e)} />
                </form>
                : <Div >{item.rate}</Div>
            }
                                          </TableCell> 
                              
          
                                     
                            
                                       <TableCell onClick={() => {
    setEditingIndexsales(idx);
    setEditedDatasales({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpensales(true);
  }}>
                              
 {  isEditing ===idx ? newval === data.type ?  Math.round((data.foodItemPrice * data.rate) + Number(data.tax)) : NumberFormat(Math.round(Number(((data.foodItemPrice - data.lessweight) * data.tax ) / 100) * data.rate))
             :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {/*
                                             isEditing === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>update(idx)}>
                                                
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
                                        */  }
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
              
              {
    orderedFoodItemsilver.map((item ,idx) => {
    resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
   //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
    result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
          return (
              <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              {/*   <TableCell  component="th" scope="row">{
        noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
        <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
          <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
        </TableCell>
                                  <TableCell  onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                   
                             {
          isEditingsilver === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Item" name="foodItemName" id="foodItemName" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datasilver.foodItemName} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div >{item.foodItemName}</Div>
      }
                                  </TableCell>
       
                                  <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                      <>
{
          isEditingsilver === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField 
    size="small"
    variant="standard"
    InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <PaidOutlinedIcon />
      </InputAdornment>
    }}
          inputProps={{ inputMode: 'numeric' }} label="Gross Weight" 
          name="foodItemPrice" id="foodItemPrice" value={datasilver.foodItemPrice} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {item.foodItemPrice}g</Div>
      }
                           </>
                                  </TableCell>


                                  <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                      <>
{
          isEditingsilver === idx ? newval === item.type ? "-" :
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField 
    size="small"
    variant="standard"
    InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <PaidOutlinedIcon />
      </InputAdornment>
    }}
          inputProps={{ inputMode: 'numeric' }} label="Loss Weight" 
          name="lessweight" id="lessweight" value={datasilver.lessweight} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
      }
                           </>
                                  </TableCell>

                                  <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                    
              {
          isEditingsilver ===idx ? 
                <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(datasilver.foodItemPrice  - datasilver.lessweight))}</Div>
          :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
      }
    </TableCell>
                                       <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                     {
          isEditingsilver ===idx ? newval === item.type ? "-" :
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
     <TextField 
      size="small"
    variant="standard"
     InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <BalanceOutlinedIcon />
      </InputAdornment>
    }}
     inputProps={{ inputMode: 'numeric' }} label="Purity" name="tax" id="tax" 
     value={datasilver.tax} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
      }
                                     
                                  </TableCell>
                                    <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>

{  isEditingsilver ===idx ? newval === datasilver.type ? "-": (((datasilver.foodItemPrice - datasilver.lessweight) * datasilver.tax ) / 100).toFixed(3)
       :  <Div > {newval === item.type ? "-" : (((item.foodItemPrice - item.lessweight) * item.tax ) / 100).toFixed(3) }</Div>    
                                   }
                               
                            </TableCell>
                             <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                                {/*newval === item.type ? item.rate :rates */}
                                  {
          isEditingsilver === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Rate" name="rate" id="rate" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datasilver.rate} onChange={(e) => handlesilver(e)} />
          </form>
          : <Div >{item.rate}</Div>
      }
                                    </TableCell> 
                        
    
                               
                      
                                 <TableCell onClick={() => {
    setEditingIndexnetrate(idx);
    setEditedDatanetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpennetrate(true);
  }}>
                        
{  isEditingsilver ===idx ? newval === datasilver.type ?  Math.round((datasilver.foodItemPrice * datasilver.rate) + Number(datasilver.tax)) : NumberFormat(Math.round(Number(((datasilver.foodItemPrice - datasilver.lessweight) * datasilver.tax ) / 100) * datasilver.rate))
       :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                   }
                                 </TableCell>

                                  <TableCell >
                                    {/*
                                       isEditingsilver === idx ? 
                                     
                                    <ThemeProvider theme={blueTheme}>
                                         
                                        
                                            <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                         onClick={(e)=>updatesilver(idx)}>
                                          
                                          <SaveAsOutlinedIcon  fontSize="medium"/>
                                          </Button>
                                          
                                          
                                    
                                      </ThemeProvider>
          :
                                    <ThemeProvider theme={greenTheme}>
                                          <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                   onClick={()=>{
                                        setCurrentIdsilver(item.id) 
                                        setIsEditingsilver(idx,true)
                                   }} >
                                           
                                              <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                          
                                      </ThemeProvider>
                                  */}
                                      <ThemeProvider theme={redTheme}>
                                          <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                          onClick={e => removeFoodItemsilver(idx, item.orderDetailId)}
                                          > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                          </Button>
                                      </ThemeProvider>
                                  </TableCell>

                                  

                              </TableRow>
          );
        })}
        
              {
               orderedratecutitems.map((dataaratecut,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}>
                  <Div >{new Date(dataaratecut.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemName} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}><Div >-</Div></TableCell>
                                           <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}><Div >-</Div></TableCell>
                                             <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}><Div >-</Div></TableCell>
                                              <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}><Div >-</Div></TableCell>
                                               <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}>
                                                {
                                                   isEditingratecut === idx ?  <Div >{((dataaratecut.foodItemPrice * 1) / dataratecut.rate).toFixed(3)}</Div> :
                                                    <Div >{dataaratecut.tax}</Div>
                                                }
                                               </TableCell>
                                      {/*  <TableCell >
                                            <>
{
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          
                            
            <TableCell>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell> */}
                <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}>

                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.rate}</Div>
            }
                                        </TableCell>

              
                   <TableCell onClick={() => {
    setEditingIndexratecut(idx);
    setEditedDataratecut({
        foodItemName: dataaratecut.foodItemName,
      foodItemPrice: dataaratecut.foodItemPrice,
      quantity: dataaratecut.quantity,
      rate:dataaratecut.rate,
      tax:dataaratecut.tax,
      discount:dataaratecut.discount,
      subtotal: dataaratecut.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenratecut(true);
  }}>
                { 

      
             isEditingratecut ===idx ? newkey === dataratecut.type ?  <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form> : 
                 <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
             :   <Div > {Math.round(dataaratecut.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          
                                           {/*
                                             isEditingratecut === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updateratecut(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdratecut(dataaratecut.id) 
                                              setIsEditingratecut(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
                                        */}
              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemratecut(idx, dataaratecut.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}

              {
               orderpieceitems.map((datapcs,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/*  <TableCell  component="th" scope="row">{
              noId == datapcs.foodItemId ?  <KeyOffTwoToneIcon/> :datapcs.foodItemId  }</TableCell> */}
                <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}>
                <Div >{new Date(datapcs.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}> 
                {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastage.foodItemName} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div >{datapcs.foodItemName}</Div>
            }
                
                </TableCell>
              <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}> -</TableCell>
            
          <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}><Div> -</Div> </TableCell>
              <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}><Div> -</Div> </TableCell>
                  <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}><Div> -</Div> </TableCell>
              <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}><Div> -</Div> </TableCell>
           <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}>-</TableCell>
             
                   <TableCell onClick={() => {
    setEditingIndexcash(idx);
    setEditedDatacash({
        foodItemName: datapcs.foodItemName,
      foodItemPrice: datapcs.foodItemPrice,
      quantity: datapcs.quantity,
      rate:datapcs.rate,
      tax:datapcs.tax,
      discount:datapcs.discount,
      subtotal: datapcs.subtotal

      // Set other fields as needed
    });
    setIsDialogOpencash(true);
  }}>
               
             
                {
                isEditingwastage === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastage.foodItemPrice} onChange={(e) => handlewastage(e)} />
                </form>
                : <Div >{datapcs.foodItemPrice}</Div>
            }
                
                
                                       </TableCell>
            <TableCell >
                                          {/*
                                             isEditingwastage === idx ? 
                                          <ThemeProvider theme={blueTheme}>
                                              <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatewastage(idx)}>
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                               </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdwastage(datapcs.id) 
                                              setIsEditingwastage(idx,true)
                                         }} >
                                               <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                        </ThemeProvider>
                                        */}                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItempiece(idx, datapcs.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
             
            </TableRow>
          ))}

         
           <TableRow className={classes.tablerow}>
                             <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Pure :</TableCell>
                            <TableCell>
                                <Typography  display="block"  style={{color:'green'}}>
                            {((totalfiness))}G
                            </Typography>
                            </TableCell>
                          <TableCell>Cash :</TableCell>
                          <TableCell>
                            <Typography  display="block"  style={{color:'green'}}>
                            {NumberFormat(Math.round(newitem))}
                            </Typography></TableCell>
                           </TableRow>
            <TableRow className={classes.tablerow}>
                            <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Equity:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'blue'}}>
                            {((adjustfiness))}G
                            </Typography></TableCell>
                          <TableCell>Equity :</TableCell>
                          <TableCell> 
                             <Typography  display="block"  style={{color:'blue'}}>
                            {
                            //NumberFormat(Math.round(values.onlinecash))
                           NumberFormat(Math.round(news))
                          }
                             </Typography>
                             </TableCell>
                           </TableRow>
                           <TableRow className={classes.tablerow}>
                         <TableCell></TableCell>
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Balance:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'red'}}>
                            {((netbalancefiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Balance :</TableCell>
                          <TableCell>
                             <Typography  display="block"  style={{color:'red'}}>
                            {
                              
                            //NumberFormat(values.gTotal - ( Number(values.gCash) - Number(values.onlinecash)) - Math.round(news))
                            NumberFormat((Number(values.gTotal)) - Number(Math.round(news)) - (-totalcash))
                            
                            }
                          </Typography>
                          </TableCell>
                           </TableRow>

          

        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
    
            <ItemPopup
                title="Cash"
                openPopupitem={wastageListVisibility}
                setOpenPopupitem={setwastageListVisibility}>
                 
               <Cash
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
             <ItemPopup
                title="Silver"
                openPopupitem={silverListVisibility}
                setOpenPopupitem={setsilverListVisibility}>
               {/*  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabs} onChange={handleChangetabs} textColor="secondary"
        indicatorColor="secondary" >
          <Tab label="Silver" {...a11yProps(0)} />
          <Tab label="Fancy" {...a11yProps(1)} />
         <Tab label="Non_Stock_Silver" {...a11yProps(2)} />
        
        </Tabs>
      </Box>
     <TabPanel value={valuetabs} index={0}>
        <Silver
                    {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
                />
      </TabPanel>

       <TabPanel value={valuetabs} index={1}>
         <FancyItem 
          {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         
         />
     
      </TabPanel>
       <TabPanel value={valuetabs} index={2}>
        <Non_stocksilver
         {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         />
     
                  </TabPanel> */}
               <Non_stocksilver
         {...{
                      setsilverListVisibility,
                        values,
                        setValues
                    }}
         />   
              
            </ItemPopup>
              <ItemPopup
                title="Cash"
                openPopupitem={nonstockListVisibility}
                setOpenPopupitem={setnonstockListVisibility}>
                 
                <PieceItems
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
    </Paper>
    </Grid>
     <Grid item xs={6}>
 <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
         <Toolbar
    
    >
     
        <Typography
          sx={{ flex: '1 1 50%' }}
          variant="h6" >
      PURCHASE
        </Typography>
     

 <Tooltip title="CASH"   arrow> 
        <IconButton onClick={openListwastage}>
      

        <Stack>
        <img src={Cashimg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >CASH</Box>
    </Stack>    
 
  </IconButton>
         </Tooltip>

      <Tooltip title="RATE CUT"   arrow> 
        <IconButton onClick={openListOfOldsilver}>
        <Stack>
        <img src={Taximg} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >RATE CUT</Box>
    </Stack>  


  </IconButton>
         </Tooltip>
         <Tooltip title="Net Rate"   arrow> 
        <IconButton onClick={openListOfOldcash}>
        <Stack>
        <img src={OSilver} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >Net Rate</Box>
    </Stack>  

</IconButton>
         </Tooltip>
 
 <Tooltip title="GOLD-SILVER INGOTS"   arrow> 
        <IconButton onClick={openListOfOld}>
        <Stack>
        <img src={WGold} height={35}/>
   <Box fontWeight="bold" style={{ fontSize: 7 }} >GOLD INGOTS</Box>
    </Stack>  

</IconButton>
         </Tooltip>
 

    </Toolbar>

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" stickyHeader className={classes.table }>
        <TableHead>
          <TableRow>
             <TableCell>Date</TableCell>
            <TableCell>ItemName</TableCell>
            <TableCell>Gross Weight</TableCell>
             <TableCell>Less Weight</TableCell>
              <TableCell>Net Weight</TableCell>
             <TableCell>Purity</TableCell>
              <TableCell>Finess</TableCell>
             <TableCell>Cash</TableCell>
             <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
         oldorderedFoodItems.map((item ,idx) => {
          oldresults = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
          oldresult = values.oldorderDetails.reduce((total, currentValue) => total = total + currentValue.subtotals,0);           
                return (
                    <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                         <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
              </TableCell>
                                        <TableCell  component="th" scope="row" onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                         
                                   {
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
          <TextField label="foodItemName" name="foodItemNames" id="foodItemNames" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataold.foodItemNames} onChange={(e) => handleold(e)} />
                </form>
                : <Div >{item.foodItemNames}</Div>
            }
                                        </TableCell>
                                        <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                            <>
{
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrices" id="foodItemPrices" value={dataold.foodItemPrices} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.foodItemPrices}g</Div>
            } </>
                                        </TableCell>
                                             <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                            <>
{
                isEditingold === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="Less Weight" 
                name="lessweights" id="lessweights" value={dataold.lessweights} onChange={(e) => handleold(e)} />
                </form>
                : <Div > {oldnewval === dataold.type ? item.lessweights : item.lessweights   }</Div>
            } </>
                                        </TableCell>
           <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                          
                    {
                isEditingold ===idx ? 
                      <Div > {oldnewval === dataold.type ? roundTo2DecimalPoint(Number(dataold.foodItemPrices  - dataold.lessweights)) : roundTo2DecimalPoint(Number(dataold.foodItemPrices  - dataold.lessweights))}</Div>
                :    <Div > {oldnewval === dataold.type? roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights)) :roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights))}</Div>
            }
          </TableCell>
                                        
                                        <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                           {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Purity" name="taxs" id="taxs" 
           value={dataold.taxs} onChange={(e) => handleold(e)} />
                </form>
                : <Div > { item.taxs }%</Div>
            }
                                           
                                        </TableCell>
                                        <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                                               { 

      
             isEditingold ===idx ? oldnewval === dataold.type ?  0 : (((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100).toFixed(3)
             :    <Div > {(((item.foodItemPrices - item.lessweights) * item.taxs ) / 100).toFixed(3) }</Div>
                                         }
                                          </TableCell>
                                        <TableCell> 
                                        {
                isEditingold ===idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
           <TextField 
            size="small"
          variant="standard"
           InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <BalanceOutlinedIcon />
            </InputAdornment>
          }}
           inputProps={{ inputMode: 'numeric' }} label="Rate" name="rate" id="rate" 
           value={dataold.rate} onChange={(e) => handleold(e)} />
                </form>
                : <Div >{item.rate}</Div>
            }
                                        
                                        </TableCell>
                                       <TableCell onClick={() => {
    setEditingIndexpurchase(idx);
    setEditedDatapurchase({
        foodItemNames: item.foodItemNames,
      foodItemPrices: item.foodItemPrices,
      quantitys: item.quantitys,
      rate:item.rate,
      lessweights:item.lessweights,
      netweights:item.netweights,
      Tfinesss:item.Tfinesss,
      taxs:item.taxs,
      discounts:item.discounts,
      subtotals: item.subtotals

      // Set other fields as needed
    });
    setIsDialogOpenpurchase(true);
  }}>
                               

                                         { 
                                            isEditingold ===idx ? oldnewval === dataold.type ? Math.round(Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate )  : Math.round(Number(((dataold.foodItemPrices - dataold.lessweights) * dataold.taxs ) / 100) * dataold.rate )         
                                            :  <Div > {Math.round(item.subtotals)}</Div>
                                         }
                                       </TableCell>

                                        <TableCell >
                                          {/*
                                             isEditingold === idx ? 
                 
                                          <ThemeProvider theme={blueTheme}>
                                               
                                                <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>oldupdate(idx)
                                             
                                            }>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdold(item.id) 
                                              setIsEditingold(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
                                        */ }
                                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => oldremoveFoodItem(idx, item.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>

                                        

                                    </TableRow>
                );
              })}
     {
    ordercash.map((item ,idx) => {
    resultwastage = values.watageitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
   //resultpcss= values.pieceitems.reduce((total, currentValue) => total = total + currentValue.subtotal,0);
    results = values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ;           
    result = (values.orderDetails.reduce((total, currentValue) => total = total + currentValue.subtotal,0) + resultwastage ) - values.discou;           
          return (
              <TableRow key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              {/*   <TableCell  component="th" scope="row">{
        noId == item.foodItemId ?  <KeyOffTwoToneIcon/> :item.foodItemId  }</TableCell> */}
        <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
          <Div >{new Date(item.salesdate).toLocaleDateString()}</Div>
        </TableCell>
                                  <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }} >
                                   
                             {
          isEditingcash === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Item" name="foodItemName" id="foodItemName" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datacashitems.foodItemName} onChange={(e) => handlecash(e)} />
          </form>
          : <Div >{item.foodItemName}</Div>
      }
                                  </TableCell>
       
                                  <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                                      <>
{
          isEditingcash === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField 
    size="small"
    variant="standard"
    InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <PaidOutlinedIcon />
      </InputAdornment>
    }}
          inputProps={{ inputMode: 'numeric' }} label="Gross Weight" 
          name="foodItemPrice" id="foodItemPrice" value={datacashitems.foodItemPrice} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {item.foodItemPrice}g</Div>
      }
                           </>
                                  </TableCell>


                                  <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                                      <>
{
          isEditingcash === idx ? newval === item.type ? "-" :
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField 
    size="small"
    variant="standard"
    InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <PaidOutlinedIcon />
      </InputAdornment>
    }}
          inputProps={{ inputMode: 'numeric' }} label="Loss Weight" 
          name="lessweight" id="lessweight" value={datacashitems.lessweight} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {newval === item.type ? "-" : item.lessweight   }</Div>
      }
                           </>
                                  </TableCell>

                                  <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                                    
              {
          isEditingcash ===idx ? 
                <Div > {newval === item.type ? "-" : roundTo2DecimalPoint(Number(datacashitems.foodItemPrice  - datacashitems.lessweight))}</Div>
          :    <Div > {newval === item.type ? "-" :roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight))}</Div>
      }
    </TableCell>
                                       <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                                     {
          isEditingcash ===idx ? newval === item.type ? "-" :
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
     <TextField 
      size="small"
    variant="standard"
     InputProps={{
 startAdornment:
      <InputAdornment position="start">
        <BalanceOutlinedIcon />
      </InputAdornment>
    }}
     inputProps={{ inputMode: 'numeric' }} label="Purity" name="tax" id="tax" 
     value={datacashitems.tax} onChange={(e) => handlecash(e)} />
          </form>
          : <Div > {newval === item.type ? "-" :item.tax+"%"}</Div>
      }
                                     
                                  </TableCell>
                                    <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>

{  isEditingcash ===idx ? newval === datacashitems.type ? "-": (((datacashitems.foodItemPrice - datacashitems.lessweight) * datacashitems.tax ) / 100).toFixed(3)
       :  <Div > {newval === item.type ? "-" : (((item.foodItemPrice - item.lessweight) * item.tax ) / 100).toFixed(3) }</Div>    
                                   }
                               
                            </TableCell>
                             <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                                {/*newval === item.type ? item.rate :rates */}
                                  {
          isEditingcash === idx ? 
             <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
   <TextField label="Rate" name="rate" id="rate" 
        size="small"
    variant="standard"
        InputProps={{ startAdornment:
      <InputAdornment position="start">
        <CategoryOutlinedIcon />
      </InputAdornment>
    }}
       value={datacashitems.rate} onChange={(e) => handlecash(e)} />
          </form>
          : <Div >{item.rate}</Div>
      }
                                    </TableCell> 
                        
    
                               
                      
                                 <TableCell onClick={() => {
    setEditingIndexpurchasenetrate(idx);
    setEditedDatapurchasenetrate({
        foodItemName: item.foodItemName,
      foodItemPrice: item.foodItemPrice,
      quantity: item.quantity,
      rate:item.rate,
      lessweight:item.lessweight,
      netweight:item.netweight,
      Tfiness:item.Tfiness,
      tax:item.tax,
      discount:item.discount,
      subtotal: item.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasenetrate(true);
  }}>
                        
{  isEditingcash ===idx ? newval === datacashitems.type ?  Math.round((datacashitems.foodItemPrice * datacashitems.rate) + Number(datacashitems.tax)) : NumberFormat(Math.round(Number(((datacashitems.foodItemPrice - datacashitems.lessweight) * datacashitems.tax ) / 100) * datacashitems.rate))
       :   <Div > { NumberFormat(Math.round((item.subtotal)))}</Div>
                                   }
                                 </TableCell>

                                  <TableCell >
                                    {/*
                                       isEditingcash === idx ? 
                                     
                                    <ThemeProvider theme={blueTheme}>
                                         
                                        
                                            <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                         onClick={(e)=>updatecash(idx)}>
                                          
                                          <SaveAsOutlinedIcon  fontSize="medium"/>
                                          </Button>
                                          
                                          
                                    
                                      </ThemeProvider>
          :
                                    <ThemeProvider theme={greenTheme}>
                                          <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                   onClick={()=>{
                                        setCurrentIdcash(item.id) 
                                        setIsEditingcash(idx,true)
                                   }} >
                                           
                                              <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                          
                                      </ThemeProvider>
                                  */}
                                      <ThemeProvider theme={redTheme}>
                                          <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                          onClick={e => removecash(idx, item.orderDetailId)}
                                          > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                          </Button>
                                      </ThemeProvider>
                                  </TableCell>

                                  

                              </TableRow>
          );
        })}
        {
               orderedfancyitems.map((dataafancy,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}> 
                  <Div >{new Date(dataafancy.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemName} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}><Div >-</Div></TableCell>
                                           <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}><Div >-</Div></TableCell>
                                             <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}><Div >-</Div></TableCell>
                                              <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}><Div >-</Div></TableCell>
                                               <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}>
                                                {
                                                   isEditingfancy === idx ?  <Div >{((dataafancy.foodItemPrice * 1) / datafancy.rate).toFixed(3)}</Div> :
                                                    <Div >{dataafancy.tax}</Div>
                                                }
                                               </TableCell>
                                      {/*  <TableCell >
                                            <>
{
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          
                            
            <TableCell>
                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.rate} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell> */}
                <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}>

                 {
                isEditingfancy === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.rate} onChange={(e) => handlefancy(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell>

              
                   <TableCell onClick={() => {
    setEditingIndexpurchaseratecut(idx);
    setEditedDatapurchaseratecut({
        foodItemName: dataafancy.foodItemName,
      foodItemPrice: dataafancy.foodItemPrice,
      quantity: dataafancy.quantity,
      rate:dataafancy.rate,
      tax:dataafancy.tax,
      discount:dataafancy.discount,
      subtotal: dataafancy.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchaseratecut(true);
  }}>
                { 

      
             isEditingfancy ===idx ? newkey === data.type ?  <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form> : 
                 <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datafancy.foodItemPrice} onChange={(e) => handlefancy(e)} />
                </form>
             :   <Div > {Math.round(dataafancy.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          
                                           {/*
                                             isEditingfancy === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatefancy(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdfancy(dataafancy.id) 
                                              setIsEditingfancy(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
                                        */}
              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemfancy(idx, dataafancy.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}
        
                {
               ordercashitems.map((datacash,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {/*  <TableCell  component="th" scope="row">{
              noId == datapcs.foodItemId ?  <KeyOffTwoToneIcon/> :datapcs.foodItemId  }</TableCell> */}
                <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}>
                <Div >{new Date(datacash.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}> 
                {
                isEditingwastagecash === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastagecash.foodItemName} onChange={(e) => handlewastagecash(e)} />
                </form>
                : <Div >{datacash.foodItemName}</Div>
            }
                
                </TableCell>
              <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}> -</TableCell>
            
          <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}><Div> -</Div> </TableCell>
              <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}><Div> -</Div> </TableCell>
                  <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}><Div> -</Div> </TableCell>
              <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}><Div> -</Div> </TableCell>
           <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}>-</TableCell>
             
                   <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}>
               
             
                {
                isEditingwastagecash === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={datawastagecash.foodItemPrice} onChange={(e) => handlewastagecash(e)} />
                </form>
                : <Div >{datacash.foodItemPrice}</Div>
            }
                
                
                                       </TableCell>
            <TableCell onClick={() => {
    setEditingIndexpurchasecash(idx);
    setEditedDatapurchasecash({
        foodItemName: datacash.foodItemName,
      foodItemPrice: datacash.foodItemPrice,
      quantity: datacash.quantity,
      rate:datacash.rate,
      tax:datacash.tax,
      discount:datacash.discount,
      subtotal: datacash.subtotal

      // Set other fields as needed
    });
    setIsDialogOpenpurchasecash(true);
  }}>
                                          {/*
                                             isEditingwastagecash === idx ? 
                                          <ThemeProvider theme={blueTheme}>
                                              <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updatewastagecash(idx)}>
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                               </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdwastagecash(datacash.id) 
                                              setIsEditingwastagecash(idx,true)
                                         }} >
                                               <EditLocationOutlinedIcon  fontSize="medium" />
                                          </Button>
                                        </ThemeProvider>
                                        */ }                            <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemcash(idx, datacash.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
             
            </TableRow>
          ))}
                
           <TableRow className={classes.tablerow}>
                            
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Pure :</TableCell>
                            <TableCell>
                                <Typography  display="block"  style={{color:'green'}}>
                                {((totalfiness))}G
                            </Typography>
                            </TableCell>
                          <TableCell>Cash :</TableCell>
                          <TableCell>
                            <Typography  display="block"  style={{color:'green'}}>
                            {NumberFormat(Math.round(newitem))}
                            </Typography></TableCell>
                           </TableRow>
            <TableRow className={classes.tablerow}>
                           
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Equity:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'green'}}>
                            {((adjustfiness))}G
                            </Typography></TableCell>
                          <TableCell>Equity :</TableCell>
                          <TableCell> 
                             <Typography  display="block"  style={{color:'blue'}}>
                              {
                            //NumberFormat(Math.round(values.onlinecash))
                           NumberFormat(Math.round(news))
                          }
                             </Typography>
                             </TableCell>
                           </TableRow>
                           <TableRow className={classes.tablerow}>
                        
                              <TableCell></TableCell>
                               <TableCell></TableCell>
                          <TableCell></TableCell>
                           <TableCell></TableCell>
                          <TableCell>Balance:</TableCell>
                            <TableCell>  <Typography  display="block"  style={{color:'green'}}>
                           {((netbalancefiness)).toFixed(3)}G
                            </Typography></TableCell>
                          <TableCell>Balance :</TableCell>
                          <TableCell>
                             <Typography  display="block"  style={{color:'red'}}>
                         {
                         //NumberFormat(values.gTotal - ( Number(values.gCash) - Number(values.onlinecash)) - Math.round(news))
                            NumberFormat((Number(values.gTotal)) - Number(Math.round(news)) - (-totalcash))
                       }
                          </Typography>
                          </TableCell>
                           </TableRow>
             
           
        
        </TableBody>
      </Table>
    </TableContainer>
  
     
              <Notification
                {...{ notify, setNotify }} />
      <ItemPopup
                title="Gold"
                openPopupitem={orderListVisibility}
                setOpenPopupitem={setOrderListVisibility}>
                 
                 
          {/*       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={valuetabs} onChange={handleChangetabs} textColor="secondary"
        indicatorColor="secondary" >
          <Tab label="Stock" {...a11yProps(0)} />
         <Tab label="Non_Stock" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <TabPanel value={valuetabs} index={0}>
            <ConfirmProvider>
     <SearchFoodItems
                    {...{
                      setOrderListVisibility,
                        values,
                        setValues
                    }}
                />
    </ConfirmProvider>
      
      </TabPanel>
     
      <TabPanel value={valuetabs} index={1}>
        <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
                  </TabPanel>*/}
                   <NonStock
                    {...{
                      setnonstockListVisibility,
                        values,
                        setValues
                    }}
                />
                 
            </ItemPopup> 
               <ItemPopup
                title="Ingots"
                openPopupitem={oldListVisibility}
                setOpenPopupitem={setOldListVisibility}>
                 
                <OldCal
                    {...{
                      setOldListVisibility,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
            <ItemPopup
                title="Net Rate"
                openPopupitem={oldListVisibilitycash}
                setOpenPopupitem={setOldListVisibilitycash}>
                 
                <Oldcash
                    {...{
                      setOldListVisibilitycash,
                        values,
                        setValues
                    }}
                />
            </ItemPopup>
            <ItemPopup
                title="Rate Cut"
                openPopupitem={oldsilverListVisibility}
                setOpenPopupitem={setOldsilverListVisibility}>
                 
                <Non_stockfancy 
       {...{ops,
                      //setsilverListVisibility,
                        values,
                        setValues
                    }}
       />
            </ItemPopup>
           
            <ItemPopup
                title="Rate Cut ---"
                openPopupitem={oldsilverListVisibilitycut}
                setOpenPopupitem={setOldsilverListVisibilitycut}>
                 
                <Rategcut 
       {...{ops,
                      //setsilverListVisibility,
                        values,
                        setValues
                    }}
       />
            </ItemPopup>
             <Dialog
        maxWidth={50}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         
        <DialogContent>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={valuetab} onChange={handleChangetab} centered>
        <Tab label="Partial" />
        <Tab label="Full Description" />
        <Tab label="Selective" />
      </Tabs>
    
    </Box>

          <DialogContentText ref={componentRef}>
              <TabPanel value={valuetab} index={0}>
              <Box className="watermarksales">
         <Box height='10px'>
           
        </Box>

 
 <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
           <TableCell><h3>{values.shopName}</h3></TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ><h3>{new Date().toLocaleDateString('en-GB', {
               day: 'numeric',
    month: 'short',
    year: 'numeric',
                
            })}</h3></TableCell>
           
          
          </TableRow>
           
          <TableRow>
       {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Date</TableCell>*/}
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Item</TableCell>
            {/*    <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net WT</TableCell>
         <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> 
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Less WT</TableCell>*/}
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Weight</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}}  >Purity</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Balance </TableCell>
        {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Debit</TableCell>*/}
            
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
      
            <TableCell sx={{ fontWeight:"bold"}}></TableCell>
            <TableCell></TableCell>
            
      
            <TableCell sx={{ fontWeight:"bold",color:'#FF0000'}}>OB:</TableCell>
        <TableCell sx={{ fontWeight:"bold",color:'#FF0000'}}>{(Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc)).toFixed(3)}G</TableCell>
        {/* {todayTfinessValues}{sumOfPreviousTfiness}    
        <TableCell sx={{ fontWeight:"bold"}}>{Number(values.cashreceivedonline).toFixed(3)}G</TableCell>*/}
                                          
            </TableRow>
            
           {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          orderedFoodItems?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
              <TableRow key={row.id}>
                {/* Add your table cells here */}
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice + 'G'}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.tax === 0 ? '-' : row.tax + '%'}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{newval === row.type ? '-' : row.Tfiness + 'G'}</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}
 
      
       {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
         orderedratecutitems?.map((row) => {
            // Check if the date is today's date
          const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
             <TableRow key={row.id}>
     
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                    </TableRow>
            ) : null;
          })
        ) : null
      )}

  {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          orderedFoodItemsilver?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
                <TableRow key={row.id}>
   
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}


  {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          orderpieceitems?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
                <TableRow key={row.id}>
   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                     
                            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                        
                              
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}



        
      
         
         

<TableRow sx={{border: "none",
  boxShadow: "none"}}>

              <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(cashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",color:'#54B500',
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
       
      <TableCell sx={{fontWeight:"bold",color:'#FF0000',}} > {(((Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc))+Number(totalfiness))).toFixed(3)}G</TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
              <TableCell sx={{fontWeight:"bold"}} >Purchase</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
                   
       
  {
    /*
    ------------------------------------------------------------------------
    */
  } 
                   <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",
  boxShadow: "none"}} ></TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>OB:</TableCell>
                   
<TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>{((Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)).toFixed(3))}G</TableCell> 
      
              
            </TableRow>
            <Snackbar
           
        message="Copied"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpens(false)}
        open={opens}
      >
         <Alert  severity="info"  variant="filled">
          Copied! Closing Balance:{(Number(sumOfPreviousTfinessbottom)+Number(totalfiness) - Number(adjustfiness)).toFixed(3)}G
        </Alert></Snackbar>      
         
      
          {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          oldorderedFoodItems?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
              <TableRow key={row.id}>
                {/* Add your table cells here */}
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemNames}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrices + 'G'}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.taxs === 0 ? '-' : row.taxs + '%'}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{newval === row.type ? '-' : row.Tfinesss + 'G'}</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}
            
 {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          orderedfancyitems?.map((row) => {
            // Check if the date is today's date
        const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
              <TableRow key={row.id}>

             {/* <TableCell >{item.foodItemName}</TableCell>*/}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
            {/* <TableCell >-</TableCell> 
             <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
            
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
               </TableRow>
            ) : null;
          })
        ) : null
      )}



{transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          ordercash?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
                <TableRow key={row.id}>
   
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}


  {transactions.map((item) =>
        item.orderNumber === values.orderNumber ? (
          ordercashitems?.map((row) => {
            // Check if the date is today's date
         const isToday =
        new Date(row.salesdate).toISOString().split('T')[0] ===
        new Date().toISOString().split('T')[0];

            // Display data only if it's for today
            return isToday ? (
                <TableRow key={row.id}>
   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                     
                            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                        
                              
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
              </TableRow>
            ) : null;
          })
        ) : null
      )}







 

              
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(oldcashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
<TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>{(Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness))).toFixed(3)}G</TableCell> 
      
              
            </TableRow>
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Closing Cash Bal:{NumberFormat((Number(cashbalance)) - (Number(oldcashbalance)))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>Closing Balance:</TableCell>
 <TableCell sx={{fontWeight:"bold",color:'#FF0000'}} >
 {((Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc)+Number(totalfiness)) - (Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness)))).toFixed(3)}G
{ /* (Number(values.purchasewt)+Number(values.cashreceivedonline) - Number(values.pannumber)).toFixed(3)G*/}
  </TableCell>
              
            </TableRow>
 </TableBody>
      </Table>
    </TableContainer> 
  </Box>
      </TabPanel>

      <TabPanel value={valuetab} index={1}>
               <Box className="watermarksales">
         <Box height='0px'>
           
        </Box>

 <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
           <TableCell><h3>{values.shopName}</h3></TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ><h3>{new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</h3></TableCell>
           
          
          </TableRow>
           
          <TableRow>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Date</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Item</TableCell>
            {/*    <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net WT</TableCell>
         <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> 
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Less WT</TableCell>*/}
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Weight</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}}  >Purity</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Balance </TableCell>
        {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Debit</TableCell>*/}
            
          </TableRow>
        </TableHead>
        <TableBody>


            
            {
           
            (orderedFoodItems?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
          {
          row.rate == 0 ?
          <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>
{
row.lessweight == 0 ? 
 row.foodItemName : row.foodItemName+"["+Number(row.foodItemPrice)+"G-"+Number(row.lessweight)+"G]"

}
          </TableCell>
          :
           <TableCell sx={{color:'#6928AB',fontWeight:'bold',height: '50px'}}>
{
  row.lessweight == 0 ?
  row.foodItemName : row.foodItemName+"["+Number(row.foodItemPrice)+"G-"+Number(row.lessweight)+"G]"
} <TableCell sx={{color:'#6928AB',fontWeight:'bold',height: '0px',border:'none'}}>
 { "("+row.Tfiness+"G"+"x"+row.rate+"="+NumberFormat(row.subtotal)+")"}
</TableCell>
          </TableCell>
          }



<TableCell sx={{color:'#6928AB',fontWeight:'bold'}} >
  { Number(Number(row.foodItemPrice) - Number(row.lessweight)).toFixed(3)+"G"}
  </TableCell>
                    <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.tax == 0 ? "-" : row.tax+"%"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{newval === row.type ? "-" :row.Tfiness+"G"}</TableCell>
                  </TableRow>
                      ))}
{
        
            (orderedratecutitems?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                    </TableRow>
                      ))}


                       

    
{
            (orderedFoodItemsilver?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
            
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
             <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
          
          
            </TableRow>
                      ))}



    

        
        {
           
            (orderpieceitems?.map((row) =>
            <TableRow key={row.id}>
        <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
             <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
             <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                                {/*    <TableCell >-</TableCell>
                                <TableCell >-</TableCell>
                  <TableCell >{item.foodItemPrice}</TableCell> 
                     <TableCell >-</TableCell>*/}
                      
                    </TableRow>
                      ))}
         
         

<TableRow sx={{border: "none",
  boxShadow: "none"}}>
 <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
              <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash:{NumberFormat(Number(cashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
       
      <TableCell sx={{fontWeight:"bold",color:'#FF0000'}} > {(((Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc))+Number(totalfiness))).toFixed(3)}G</TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
              <TableCell sx={{fontWeight:"bold"}} >Purchase</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
                   
       
  {
    /*
    ------------------------------------------------------------------------
    */
  } 
                   <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
              
            </TableRow>

          {
           
            (oldorderedFoodItems?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
          {
          row.rate == 0 ?
          <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>
{
row.lessweights == 0 ? 
 row.foodItemNames : row.foodItemNames+"["+Number(row.foodItemPrices)+"G-"+Number(row.lessweights)+"G]"

}
          </TableCell>
          :
           <TableCell sx={{color:'#6928AB',fontWeight:'bold',height: '50px'}}>
{
  row.lessweights == 0 ?
  row.foodItemNames : row.foodItemNames+"["+Number(row.foodItemPrices)+"G-"+Number(row.lessweights)+"G]"
} <TableCell sx={{color:'#6928AB',fontWeight:'bold',height: '0px',border:'none'}}>
 { "("+row.Tfinesss+"G"+"x"+row.rate+"="+NumberFormat(row.subtotals)+")"}
</TableCell>
          </TableCell>
          }



<TableCell sx={{color:'#6928AB',fontWeight:'bold'}} >
  { Number(Number(row.foodItemPrices) - Number(row.lessweights)).toFixed(3)+"G"}
  </TableCell>
                    <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.taxs == 0 ? "-" : row.taxs+"%"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.Tfinesss+"G"}</TableCell>
                  </TableRow>
                      ))}
                   
                   

           


{
       
            (orderedfancyitems?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
             {/* <TableCell >{item.foodItemName}</TableCell>*/}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
            {/* <TableCell >-</TableCell> 
             <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
            
               <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
               </TableRow>
                      ))}


    
{
            (ordercash?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
                 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
                  
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
                   
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
                  
                  
                    </TableRow>
                      ))}




{
            (ordercashitems?.map((row) =>
            <TableRow key={row.id}>
 <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}><>{new Date(row.salesdate).toLocaleDateString('en-GB', {
                day: 'numeric',
    month: 'short',
    year: 'numeric',
               
                
            })}</></TableCell>
            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
          
             
              </TableRow>
                      ))} 
 

              
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash:{NumberFormat(Number(oldcashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
<TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>{(Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness))).toFixed(3)}G</TableCell> 
      
              
            </TableRow>
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Closing Cash Bal:{NumberFormat((Number(cashbalance)) - (Number(oldcashbalance)))}</TableCell>
                
                    <TableCell sx={{border: "none",color:'#FF0000',
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>Closing Balance:</TableCell>
 <TableCell sx={{fontWeight:"bold",color:'#FF0000'}} >
 {((Number(sumOfPreviousTfiness)+Number(sumOfPreviousTfinessrc)+Number(totalfiness)) - (Number(sumOfPreviousTfinessbottom)+Number(sumOfPreviousTfinessorc)+(Number(adjustfiness)))).toFixed(3)}G
{ /* (Number(values.purchasewt)+Number(values.cashreceivedonline) - Number(values.pannumber)).toFixed(3)G*/}
  </TableCell>
              
            </TableRow>

           

 

       
    
         
        </TableBody>
      </Table>
    </TableContainer> 



         
              
         </Box>
      </TabPanel>
         <TabPanel value={valuetab} index={2}>

 
 <TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
           <TableCell><h3>{values.shopName}</h3></TableCell>
           <TableCell ></TableCell>
            <TableCell ></TableCell>
            <TableCell ><h3>{new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
               
                
            })}</h3></TableCell>
           
          
          </TableRow>
           
          <TableRow>
       {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Date</TableCell>*/}
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Item</TableCell>
            {/*    <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Net WT</TableCell>
         <TableCell >Qty</TableCell>
            <TableCell >Wastage</TableCell> 
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Less WT</TableCell>*/}
               <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Weight</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}}  >Purity</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Balance </TableCell>
        {/*   <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Credit</TableCell>
           <TableCell sx={{ backgroundColor: "#c0c0c0"}} >Debit</TableCell>*/}
            
          </TableRow>
        </TableHead>
        <TableBody>
       
            
            {productspg.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.orderDetails?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName}</TableCell>
                        {/*   <TableCell >{item.quantity}</TableCell> */}
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
                      {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
                <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.tax == 0 ? "-" : row.tax+"%"}</TableCell>
                   
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{newval === row.type ? "-" :row.Tfiness+"G"}</TableCell>
                  
                  
                    </TableRow>
                      )):"")}
{productspgrc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ratecutitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                 
                     <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                         <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                   {/* <TableCell >-</TableCell> */}
                    {/* <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
                    <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
                    
                   
                  
                   </TableRow>
                      )):"")}
{productspgs.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ordersilverDetails?.map((row) =>
            <TableRow key={row.id}>
    {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
                {/*   <TableCell >{item.quantity}</TableCell> */}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
              {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
        <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
           
           <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
          
          
            </TableRow>
                      )):"")}



        
        {productspgc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.pieceitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                         {/*  <TableCell >{item.quantity}</TableCell> */}
                            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                           {/*   <TableCell >-</TableCell>
                                <TableCell >-</TableCell>*/}
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                                {/*    <TableCell >-</TableCell>
                                <TableCell >-</TableCell>
                  <TableCell >{item.foodItemPrice}</TableCell> 
                     <TableCell >-</TableCell>*/}
                      
                    </TableRow>
                      )):"")}
         
         

<TableRow sx={{border: "none",
  boxShadow: "none"}}>

              <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(cashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
       
      <TableCell sx={{fontWeight:"bold",color:'#FF0000'}} > {((totaldate))}G</TableCell>
              
            </TableRow>

            <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
              <TableCell sx={{fontWeight:"bold"}} >Purchase</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
                   
       
   
                   <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
              
            </TableRow>

             
            {productspgod.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.oldorderDetails?.map((row) =>
            <TableRow key={row.id}>
      {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemNames}</TableCell>
              
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrices+"G"}</TableCell>
           {/* <TableCell>{oldnewval === dataold.type ? "-" : item.lessweights+"G"}</TableCell> 
              <TableCell >{roundTo2DecimalPoint(Number(item.foodItemPrices  - item.lessweights)).toFixed(3)+"G"}</TableCell> */}
            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.taxs +"%"}</TableCell>
        
                  <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{(((row.foodItemPrices - row.lessweights) * row.taxs ) / 100).toFixed(3)+"G"}</TableCell>
               
            
            </TableRow>
                      )):"")}


{productspgf.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.fancyitems?.map((row) =>
            <TableRow key={item.id}>
    {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
             {/* <TableCell >{item.foodItemName}</TableCell>*/}
              <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"("+row.foodItemPrice+"/"+row.rate+")"}</TableCell>
                  <TableCell >{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
            {/* <TableCell >-</TableCell> 
             <TableCell >{((item.foodItemPrice * 1) / item.rate).toFixed(3)+"G"}</TableCell>*/}
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>100%</TableCell>
            
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{((row.foodItemPrice * 1) / row.rate).toFixed(3)+"G"}</TableCell>
               
            
           
            </TableRow>
                      )):"")}

{productspgoc.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.ordercashDetails?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(item.salesdate).toLocaleDateString()}</TableCell>*/}
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(Math.round((row.subtotal)))+"/"+row.rate+")"}</TableCell>
                        {/*   <TableCell >{item.quantity}</TableCell> */}
                      <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemPrice+"G"}</TableCell>
                      {/* <TableCell>{newval === item.type ?  "-" : item.lessweight+"G"}</TableCell>
                <TableCell >{newval === item.type ? "-" : roundTo2DecimalPoint(Number(item.foodItemPrice  - item.lessweight)).toFixed(3)+"G"}</TableCell> */}
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
                   
                   <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{ "-" }</TableCell>
                  
                  
                    </TableRow>
                      )):"")}




{productspgci.map(item =>
            item.orderNumber == values.orderNumber ?
            (item?.cashitems?.map((row) =>
            <TableRow key={row.id}>
            {/* <TableCell > {new Date(datacash.salesdate).toLocaleDateString()}</TableCell>*/}
            <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>{row.foodItemName+"-->"+"("+NumberFormat(row.foodItemPrice)+")"}</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
                <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
               <TableCell sx={{color:'#6928AB',fontWeight:'bold'}}>-</TableCell>
          
             
              </TableRow>
                      )):"")} 
 

              
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Cash Bal:{NumberFormat(Number(oldcashbalance))}</TableCell>
                
                    <TableCell sx={{border: "none",
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{border: "none",fontWeight:"bold",color:'#FF0000',
  boxShadow: "none"}}>Net WT:</TableCell>
                   
                   <TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>{((adjusttotaldate))}G</TableCell> 
      
              
            </TableRow>
              <TableRow sx={{border: "none",
  boxShadow: "none"}}>
   
   <TableCell sx={{border: "none", fontWeight:"bold",color:'#54B500',
  boxShadow: "none"}} >Closing Cash Bal:{NumberFormat((Number(cashbalance)) - (Number(oldcashbalance)))}</TableCell>
                
                    <TableCell sx={{border: "none",color:'#54B500',
  boxShadow: "none"}}></TableCell>
               
                        <TableCell sx={{fontWeight:"bold",color:'#FF0000'}}>Closing Balance:</TableCell>
 <TableCell sx={{fontWeight:"bold",color:'#FF0000'}} onClick={() => copyToClipBoard((Number(totalfiness) - Number(adjustfiness)).toFixed(3))}>
  {(Number(totaldate) - Number(adjusttotaldate)).toFixed(3)}G
{ /* (Number(values.purchasewt)+Number(values.cashreceivedonline) - Number(values.pannumber)).toFixed(3)G*/}
  </TableCell>
              
            </TableRow>

           





       
    
         
        </TableBody>
      </Table>
    </TableContainer> 
         
     <Button onClick={reloadgpurchase}>REload</Button>
            <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelectpg}
      />
  </TabPanel>
 
          </DialogContentText>
          
          <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChanges}
      aria-label="Platform"
    >
      <ToggleButton value="InGots" >
       <Pdf targetRef={componentRef} filename={`${values.shopName}.pdf`}>
                        {({ toPdf }) => <PictureAsPdfOutlinedIcon onClick={toPdf}/>}
                      </Pdf>
           
      </ToggleButton>
      <ToggleButton value="Cash" onClick={handleConvertToImage}> 
     <WallpaperOutlinedIcon onClick={handleConvertToImage}/>
   </ToggleButton>
    
      <ToggleButton value="Print" > 
     <ReactToPrint
        trigger={() =>  <IconButton  >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}/> 
   </ToggleButton>
    
    </ToggleButtonGroup>


          {
            /*
            
             <ReactToPrint
        trigger={() =>  <IconButton  >
          <LocalPrintshopOutlinedIcon  />
        </IconButton>}
        content={() => componentRef.current}
/> */
          } 
  
           
        </DialogContent>
       
      </Dialog>


       <ItemPopup
                title="SALES EDIT"
                openPopupitem={isDialogOpensales}
                setOpenPopupitem={handleCloseDialogsales}>
               
                <form id="editForm" onSubmit={handleDialogSubmitsales}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatasales.foodItemName}
          onChange={(e) => setEditedDatasales({ ...editedDatasales, foodItemName: e.target.value })}
        /> 
         <TextField
          label="GROSS WEIGHT"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatasales.foodItemPrice}
          onChange={(e) => setEditedDatasales({ ...editedDatasales, foodItemPrice: e.target.value })}
        />
         <TextField
          label="LESS WEIGHT"
          name="lessweight"
          id="lessweight"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatasales.lessweight}
          onChange={(e) => setEditedDatasales({ ...editedDatasales, lessweight: e.target.value })}
        />

         <TextField
          label="NET WEIGHT"
          name="netweight"
          id="netweight"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={(Number(editedDatasales.foodItemPrice) - Number(editedDatasales.lessweight)).toFixed(3)}
          onChange={(e) => setEditedDatasales({ ...editedDatasales, netweight: e.target.value })}
        />
         <TextField
          label="Finess"
          name="tax"
          id="tax"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatasales.tax}
          onChange={(e) => setEditedDatasales({ ...editedDatasales, tax: e.target.value })}
        />
        
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={(((editedDatasales.foodItemPrice - editedDatasales.lessweight) * editedDatasales.tax) / 100).toFixed(3)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>


<ItemPopup
                title="PURCHASE EDIT"
                openPopupitem={isDialogOpenpurchase}
                setOpenPopupitem={handleCloseDialogpurchase}>
               
                <form id="editForm" onSubmit={handleDialogSubmitpurchase}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemNames"
          id="foodItemNames"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchase.foodItemNames}
          onChange={(e) => setEditedDatapurchase({ ...editedDatapurchase, foodItemNames: e.target.value })}
        /> 
         <TextField
          label="GROSS WEIGHT"
          name="foodItemPrices"
          id="foodItemPrices"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchase.foodItemPrices}
          onChange={(e) => setEditedDatapurchase({ ...editedDatapurchase, foodItemPrices: e.target.value })}
        />
         <TextField
          label="LESS WEIGHT"
          name="lessweights"
          id="lessweights"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchase.lessweights}
          onChange={(e) => setEditedDatapurchase({ ...editedDatapurchase, lessweights: e.target.value })}
        />

         <TextField
          label="NET WEIGHT"
          name="netweights"
          id="netweights"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={(Number(editedDatapurchase.foodItemPrices) - Number(editedDatapurchase.lessweights)).toFixed(3)}
          onChange={(e) => setEditedDatapurchase({ ...editedDatapurchase, netweights: e.target.value })}
        />
         <TextField
          label="Finesss"
          name="taxs"
          id="taxs"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchase.taxs}
          onChange={(e) => setEditedDatapurchase({ ...editedDatapurchase, taxs: e.target.value })}
        />
        
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={(((editedDatapurchase.foodItemPrices - editedDatapurchase.lessweights) * editedDatapurchase.taxs) / 100).toFixed(3)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>


 <ItemPopup
                title="NETRATE EDIT"
                openPopupitem={isDialogOpennetrate}
                setOpenPopupitem={handleCloseDialognetrate}>
               
                <form id="editForm" onSubmit={handleDialogSubmitnetrate}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatanetrate.foodItemName}
          onChange={(e) => setEditedDatanetrate({ ...editedDatanetrate, foodItemName: e.target.value })}
        /> 
         <TextField
          label="WEIGHT"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatanetrate.foodItemPrice}
          onChange={(e) => setEditedDatanetrate({ ...editedDatanetrate, foodItemPrice: e.target.value })}
        />
         <TextField
          label="RATE"
          name="rate"
          id="rate"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatanetrate.rate}
          onChange={(e) => setEditedDatanetrate({ ...editedDatanetrate, rate: e.target.value })}
        />
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={NumberFormat(editedDatanetrate.foodItemPrice * editedDatanetrate.rate)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>


 <ItemPopup
                title="PURCHASE NETRATE EDIT"
                openPopupitem={isDialogOpenpurchasenetrate}
                setOpenPopupitem={handleCloseDialogpurchasenetrate}>
               
                <form id="editForm" onSubmit={handleDialogSubmitpurchasenetrate}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchasenetrate.foodItemName}
          onChange={(e) => setEditedDatapurchasenetrate({ ...editedDatapurchasenetrate, foodItemName: e.target.value })}
        /> 
         <TextField
          label="WEIGHT"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchasenetrate.foodItemPrice}
          onChange={(e) => setEditedDatapurchasenetrate({ ...editedDatapurchasenetrate, foodItemPrice: e.target.value })}
        />
    
         <TextField
          label="RATE"
          name="rate"
          id="rate"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchasenetrate.rate}
          onChange={(e) => setEditedDatapurchasenetrate({ ...editedDatapurchasenetrate, rate: e.target.value })}
        />
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={NumberFormat(editedDatapurchasenetrate.foodItemPrice * editedDatapurchasenetrate.rate)}
          
        />
         
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>

  <ItemPopup
                title="RATECUT EDIT"
                openPopupitem={isDialogOpenratecut}
                setOpenPopupitem={handleCloseDialogratecut}>
               
                <form id="editForm" onSubmit={handleDialogSubmitratecut}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDataratecut.foodItemName}
          onChange={(e) => setEditedDataratecut({ ...editedDataratecut, foodItemName: e.target.value })}
        /> 
         <TextField
          label="AMOUNT"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDataratecut.foodItemPrice}
          onChange={(e) => setEditedDataratecut({ ...editedDataratecut, foodItemPrice: e.target.value })}
        />
         
<TextField
          label="RATE"
          name="rate"
          id="rate"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDataratecut.rate}
          onChange={(e) => setEditedDataratecut({ ...editedDataratecut, rate: e.target.value })}
        />
        <TextField
          label="Finess"
          name="tax"
          id="tax"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={Number(editedDataratecut.foodItemPrice / editedDataratecut.rate).toFixed(3)}
          onChange={(e) => setEditedDataratecut({ ...editedDataratecut, tax: e.target.value })}
        />
        
        {/* <TextField
          label="Finess"
          name="tax"
          id="tax"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDataratecut.tax}
          onChange={(e) => setEditedDataratecut({ ...editedDataratecut, tax: e.target.value })}
        />*/}
        
        
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>

  <ItemPopup
                title="PURCHASE RATECUT EDIT"
                openPopupitem={isDialogOpenpurchaseratecut}
                setOpenPopupitem={handleCloseDialogpurchaseratecut}>
               
                <form id="editForm" onSubmit={handleDialogSubmitpurchaseratecut}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchaseratecut.foodItemName}
          onChange={(e) => setEditedDatapurchaseratecut({ ...editedDatapurchaseratecut, foodItemName: e.target.value })}
        /> 
         <TextField
          label="AMOUNT"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchaseratecut.foodItemPrice}
          onChange={(e) => setEditedDatapurchaseratecut({ ...editedDatapurchaseratecut, foodItemPrice: e.target.value })}
        />
         
<TextField
          label="RATE"
          name="rate"
          id="rate"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchaseratecut.rate}
          onChange={(e) => setEditedDatapurchaseratecut({ ...editedDatapurchaseratecut, rate: e.target.value })}
        />
        <TextField
          label="Finess"
          name="tax"
          id="tax"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={Number(editedDatapurchaseratecut.foodItemPrice / editedDatapurchaseratecut.rate).toFixed(3)}
          onChange={(e) => setEditedDatapurchaseratecut({ ...editedDatapurchaseratecut, tax: e.target.value })}
        />
        
        {/* <TextField
          label="Finess"
          name="tax"
          id="tax"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
              <GiWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchaseratecut.tax}
          onChange={(e) => setEditedDatapurchaseratecut({ ...editedDatapurchaseratecut, tax: e.target.value })}
        />*/}
        
        
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>



       <ItemPopup
                title="CASH EDIT"
                openPopupitem={isDialogOpencash}
                setOpenPopupitem={handleCloseDialogcash}>
               
                <form id="editForm" onSubmit={handleDialogSubmitcash}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatacash.foodItemName}
          onChange={(e) => setEditedDatacash({ ...editedDatacash, foodItemName: e.target.value })}
        /> 
         <TextField
          label="CASH"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatacash.foodItemPrice}
          onChange={(e) => setEditedDatacash({ ...editedDatacash, foodItemPrice: e.target.value })}
        />
        
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={NumberFormat(editedDatacash.foodItemPrice)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>



       <ItemPopup
                title="PURCHASE CASH EDIT"
                openPopupitem={isDialogOpenpurchasecash}
                setOpenPopupitem={handleCloseDialogpurchasecash}>
               
                <form id="editForm" onSubmit={handleDialogSubmitpurchasecash}>
                  <Stack
  direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }} useFlexGap flexWrap="wrap"
>

        <TextField
          label="Description"
          name="foodItemName"
          id="foodItemName"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            //readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <TbFileDescription />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchasecash.foodItemName}
          onChange={(e) => setEditedDatapurchasecash({ ...editedDatapurchasecash, foodItemName: e.target.value })}
        /> 
         <TextField
          label="CASH"
          name="foodItemPrice"
          id="foodItemPrice"
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            // readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
             <FaWeightScale />
              </InputAdornment>
            ),
          }}
          value={editedDatapurchasecash.foodItemPrice}
          onChange={(e) => setEditedDatapurchasecash({ ...editedDatapurchasecash, foodItemPrice: e.target.value })}
        />
        
        
         <TextField
          label="SUBTOTAL"
          
          color="error"
          focused
          size="small"
          variant="standard"
          InputProps={{
            readOnly:'true',
            startAdornment: (
              <InputAdornment position="start">
            <GiPriceTag />
              </InputAdornment>
            ),
          }}
          value={NumberFormat(editedDatapurchasecash.foodItemPrice)}
          
        />
     </Stack>
      </form>
    
<Stack direction="row" spacing={2} sx={{marginLeft:"70%",marginTop:"2%"}}>
   
      <Button type="submit" form="editForm"  variant='contained'
      startIcon={<MdTipsAndUpdates/>}>
      UPDATE
    </Button>
</Stack>
 </ItemPopup>

    </Paper>
    </Grid>
    </Grid>
   
  );
}
