import * as React from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Itemsgold from './Items/Itemsgold';
import Silver_Itemsnon from './SilverItems/Silver_Itemsnon';
import Fancy_Itemsnon from './FancyItems/Fancy_Itemsnon';
//import AddItems from './AddOrderItem/AddItem';
import AddItems from '../AddOrderItem/AddItem';
import Goldicon from '../../Icons/gold.png'
import Silvericon from '../../Icons/silver.png'
import Fancyicon from '../../Icons/fancyreport.png'

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

export default function Inventory_non() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}  centered aria-label="basic tabs example">
               <Tab icon={<img src={Goldicon}  height={30}/>} label="GOLD" {...a11yProps(0)}/>
      <Tab icon={<img src={Silvericon}  height={30}/>} label="SILVER"  {...a11yProps(1)}/>
      <Tab icon={<img src={Fancyicon} height={30}/>} label="FANCY" {...a11yProps(2)} />
      <Tab  label="ORDER ENTRY" {...a11yProps(3)} />
        
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Itemsgold/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <Silver_Itemsnon />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Fancy_Itemsnon />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AddItems />
      </TabPanel>
    </Box>
  );
}
