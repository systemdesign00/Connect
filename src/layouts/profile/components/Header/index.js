/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import Sig from '../../../../layouts/authentication/sign-up/sig'
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
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
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 4,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
             {filteredUsers.length > 0 ? (
       filteredUsers.map((user) => (
             <Avatar  sx={{height:100,width:100 }} src= {user.imageSrc} >
               
            </Avatar>
     ))) : (
        <p>WELCOME</p>
      )}
          
          </Grid>

          <Sig/>

          
       
        </Grid>
      
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
