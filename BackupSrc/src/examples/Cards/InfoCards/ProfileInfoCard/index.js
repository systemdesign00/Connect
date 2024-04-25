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
import React, {useEffect, useState} from 'react';
// react-routers components
import { Link } from "react-router-dom";
import axios from 'axios';
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Popup from "layouts/Popup";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function ProfileInfoCard({ title, description, info, social, action, shadow }) {
  const labels = [];
  const values = [];
  const { socialMediaColors } = colors;
  const { size } = typography;
const [orderListVisibilityEdits, setOrderListVisibilityEdits] = useState(false);
 const openListOfOrdersEdits = () => {
        setOrderListVisibilityEdits(true);
    }

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

 const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const filterCondition = (user) => user.id === sessionValue;
  const filteredUsers = data.filter(filterCondition);
  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://serdb.onrender.com/api/User');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (id, currentData) => {
    setEditingId(id);
    setEditedData(currentData);
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };
 

  const handleSaveClick = async (id) => {
    try {
     
      // Make an API call to update the data
      await axios.put(`https://serdb.onrender.com/api/User/${id}`, editedData);

      // Update the local state with the new data
      const updatedList = data.map((item) =>
        item.id === id ? { ...item, ...editedData } : item
      );
      setData(updatedList);

      // Reset the editing state
      setEditingId(null);
      setEditedData({});
      
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  return (
    <><Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography component={Link} to={action.route} variant="body2" color="secondary">
          <Tooltip title={action.tooltip} placement="top">
            <Icon onClick={ openListOfOrdersEdits}>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
          <MDBox display="flex" py={1} pr={2}>
            <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
              social: &nbsp;
            </MDTypography>
            {renderSocial}
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
    
    <Popup 
     title="Edit Profile"
        openPopup={orderListVisibilityEdits}
        setOpenPopup={setOrderListVisibilityEdits}>
  <div>
     
      <table border="1">
        <thead>
          <tr> 
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((item) => (
            <tr key={item.id}>
            
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editedData.id || ''}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                  />
                ) : (
                  item.id
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editedData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editedData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                ) : (
                  item.phone
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input
                    type="password"
                    value={editedData.password || ''}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                  />
                ) : (
                  item.password
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => handleSaveClick(item.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(item.id, item)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </Popup></>
  );
}

// Setting default props for the ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
