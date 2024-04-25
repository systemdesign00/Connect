import React  from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ChainList from './Goldmgt';
import EarringManage from './Silvermgt';
import MaatalList from './Sterlingsilvermgt';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


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

export default function ListQuantityItems() {
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
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="GOLD STOCK_MANAGEMENT" {...a11yProps(0)} />
          <Tab label="SILVER STOCK_MANAGEMENT" {...a11yProps(1)} />
          <Tab label="92.5 STERLING SILVER STOCK_MANAGEMENT" {...a11yProps(2)} />
          

        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
    <ChainList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <EarringManage/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <MaatalList/>
      </TabPanel>
   
    </Box>
     </ThemeProvider>
          </DashboardLayout>
  );
}
