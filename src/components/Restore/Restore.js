import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, ScrollableTabsButtonAuto } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Inventoryrestore from "./Inventoryrestore";
import SilverRestoreInventory from "./Silverinventoryrestore";
import SterlingRestoreInventory from "./Sterlingrestoreinventory";
import Estimatebillrestore from "./Estimatebillrestore";
import GoldRestore from "./GoldRestore";
import Wholesalerestore from "./Wholesalerestore";
import SilverRestore from "./SilverRestore";
import OldGoldRestore from "./Goldpurchasebill";
import OldSilverRestore from "./Silverpurchasebill";
import GoldVoucherRestore from "./WorkVoucherRestore";
import SilverVoucherRestore from "./SilverVoucherRestore";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
    "aria-controls": `simple-tabpanel-${index}`,
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

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <CssBaseline />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
            <Tab label="ESTIMATE PAD" {...a11yProps(3)} />
            <Tab label="OUT SALE" {...a11yProps(4)} />

            <Tab label="GOLD PURCHASE" {...a11yProps(5)} />
            <Tab label="SILVER PURCHASE" {...a11yProps(6)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <Inventoryrestore />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <SilverRestoreInventory />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <SterlingRestoreInventory />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <Estimatebillrestore />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={4}>
          <Wholesalerestore />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={5}>
          <OldGoldRestore />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={6}>
          <OldSilverRestore />
        </CustomTabPanel>
      </Box>
    </DashboardLayout>
  );
}
