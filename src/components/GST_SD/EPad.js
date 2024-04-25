import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TaxEstimatePad from 'components/GST_SD/index'
import Esestimate from "components/SD_Bill/index";
import PosEstimate from 'components/Pos/index'
import EstimateFormat from 'components/EstimateFormat/index'
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

export default function Epad() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Estimate Pad Format_1" {...a11yProps(0)} />
              <Tab label="Estimate Pad Format_2" {...a11yProps(1)} />
          <Tab label="Tax Estimate Pad" {...a11yProps(2)} />
             <Tab label="POS PAD" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <Esestimate/>
      </CustomTabPanel>
       <CustomTabPanel value={value} index={1}>
       <EstimateFormat/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <TaxEstimatePad/>
      </CustomTabPanel>
       <CustomTabPanel value={value} index={3}>
      <PosEstimate/>
      </CustomTabPanel>
   
    </Box>
     </ThemeProvider>
          </DashboardLayout>
  );
}
