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
import GoldPurchase from 'components/Goldpurchase/Mainpending'
import SilverPurchase from 'components/Silverpurchase/Mainpending'
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

export default function GoldandSilverpurchase() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const theme = createTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126',
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526',
      },
      background: {
        //default: "#f4f5fd"
      },
    },
  });
    return (
      <DashboardLayout>
        <DashboardNavbar/>
       
     <ThemeProvider theme={theme} >
      <CssBaseline />
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Gold Purchase" {...a11yProps(0)} />
          <Tab label="Silver purchase" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <GoldPurchase/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <SilverPurchase/>
      </CustomTabPanel>
   
    </Box>
     </ThemeProvider>
          </DashboardLayout>
  );
}
