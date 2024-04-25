import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Grid ,ScrollableTabsButtonAuto} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Inventoryrestore from './Inventoryrestore';
import SilverRestoreInventory from './Silverinventoryrestore'
import SterlingRestoreInventory from './Sterlingrestoreinventory';
import GoldRestore from './GoldRestore';
import Wholesalerestore from './Wholesalerestore';
import SilverRestore from './SilverRestore';
import OldGoldRestore from './OldGoldRestore';
import OldSilverRestore from './OldSilverRestore';
import GoldVoucherRestore from './WorkVoucherRestore';
import SilverVoucherRestore from './SilverVoucherRestore';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function Restore() {
  
const [value, setValue] = useState(0);
 
const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [valuea, setValuea] = useState(0);
 
const handleChangea = (event, newValuea) => {
    setValuea(newValuea);
  };
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
  return (
      <DashboardLayout>
        <DashboardNavbar/>
       
     <ThemeProvider theme={theme} >
      <CssBaseline />
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
         <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="GOLD INVENTORY" {...a11yProps(0)} />
          <Tab label="SILVER INVENTORY" {...a11yProps(1)} />
          <Tab label="STERLING INVENTORY" {...a11yProps(2)} />
            <Tab label="Gold Bill" {...a11yProps(3)} />
           <Tab label="Silver Bill" {...a11yProps(4)} />

            <Tab label="Old Gold Purchase Bill" {...a11yProps(5)} />
          <Tab label="Old Silver Purchase Bill" {...a11yProps(6)} />
           <Tab label="Gold Voucher" {...a11yProps(7)} />
          <Tab label="Silver Voucher" {...a11yProps(8)} />
        </Tabs>
       
      </Box>
      
   
      <CustomTabPanel value={value} index={0}>
   <Inventoryrestore/>
  </CustomTabPanel>

 <CustomTabPanel value={value} index={1}>
     <SilverRestoreInventory/>
   </CustomTabPanel>

    <CustomTabPanel value={value} index={2}>
     <SterlingRestoreInventory/>
   </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
     <GoldRestore/>
   </CustomTabPanel>

      <CustomTabPanel value={value} index={4}>
       <SilverRestore/>
      </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
       <OldGoldRestore/>
      </CustomTabPanel>

        <CustomTabPanel value={value} index={6}>
       <OldSilverRestore/>
      </CustomTabPanel>

        <CustomTabPanel value={value} index={7}>
       <GoldVoucherRestore/>
      </CustomTabPanel>

        <CustomTabPanel value={value} index={8}>
       <SilverVoucherRestore/>
      </CustomTabPanel>
    </Box>
        </ThemeProvider>
          </DashboardLayout>
  );
}
