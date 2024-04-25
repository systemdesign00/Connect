import React, { useEffect, useState, useCallback } from "react";
//import './App.css';
import axios from "axios";

import { alpha } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AutoDeleteOutlinedIcon from "@mui/icons-material/AutoDeleteOutlined";
import ProgressBar from "../../layouts/Spinner";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import SearchIcon from "@mui/icons-material/Search";

import * as XLSX from "xlsx";

import { roundTo2DecimalPoint, roundTo2DecimalPoints } from "../../utils/index";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import {
  InputAdornment,
  Container,
  Button,
  TextField,
  IconButton,
  Typography,
  Checkbox,
  Toolbar,
} from "@mui/material";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import Badge from "@mui/material/Badge";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import UpdateDisabledOutlinedIcon from "@mui/icons-material/UpdateDisabledOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import SendTimeExtensionOutlinedIcon from "@mui/icons-material/SendTimeExtensionOutlined";
import { Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import { COLORS } from "../../layouts/Colors";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Select from "../../hooks/Select";
import RadioGroup from "../../hooks/RadioGroup";
import DatePicker from "../../hooks/DatePicker";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";

import { Search } from "@mui/icons-material";
import OccuranceItem from "./Occurance/OccuranceItem";
import Popup from "../../layouts/Popup";
import Rating from "@mui/material/Rating";
//import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from '@material-ui/core/DialogContentText';
import Box from "@mui/material/Box";
//import { TableBody, TableCell ,TableHead ,TableRow} from '@material-ui/core';
import Check from "@mui/icons-material/Check";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Order from "../Order/index";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid } from "@mui/material";
import ConfirmDialog from "../../layouts/ConfirmDialog";
import Notification from "../../layouts/Notification";
import useTable from "./useTables";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import SaveIcon from "@mui/icons-material/Save";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
//import { FormControl } from '@material-ui/core';
//import { FormControlLabel } from '@material-ui/core';
import AddIcon from "@mui/icons-material/Add";
import { PRIMARY_URL, createAPIEndpoint, ENDPIONTS } from "../../api";
import { useForm, Form } from "./useForm";
import Input from "./Input";
import * as userService from "../../Services/userService";
import FullPopup from "../../layouts/FullPopup";
import OrFo from "../Order/OrFo";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { red, green, blue } from "@mui/material/colors";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "../../context";

// Material Dashboard 2 React components
import Card from "@mui/material/Card";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDBadge from "../MDBadge";
import MDAvatar from "../MDAvatar";
import MDInput from "../MDInput";
import MDButton from "../MDButton";
import DataTable from "examples/Tables/DataTable";
import ExcelUploader from "./ExcelUploader";
const Inputs = styled("input")({
  display: "none",
});

const redTheme = createTheme({ palette: { primary: red } });
const greenTheme = createTheme({ palette: { primary: green } });
const blueTheme = createTheme({ palette: { primary: blue } });
const blackTheme = createTheme({ palette: { primary: blue } });

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "red",
    color: "red",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{userService.customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(["background-color", "transform"], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(2.5);
  }
  `}
`;
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const useStyles = makeStyles((theme) => ({
  icons: {
    cursor: "pointer",
  },

  pageContent: {
    margin: useTheme().spacing(5),
    padding: useTheme().spacing(3),
  },
  roots: {
    minWidth: 0,
    margin: useTheme().spacing(0.2),
  },
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: useTheme().spacing(1),
    },
  },

  table: {
    marginTop: useTheme().spacing(3),

    "& thead th": {
      fontWeight: "600",
      color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#f4f5fd",
      cursor: "pointer",
    },
    pageContent: {
      margin: useTheme().spacing(5),
      padding: useTheme().spacing(3),
    },
  },

  menuButton: {
    marginRight: useTheme().spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  newButton: {
    position: "absolute",
    right: "1px",
  },
  searchInput: {
    width: "65%",
  },
  background: {
    default: "#f4f5fd",
  },
}));

export default function Items() {
  const styles = useStyles();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderListVisibilityEdit, setOrderListVisibilityEdit] = useState(false);
  const [orderListVisibilityocc, setOrderListVisibilityocc] = useState(false);
  const [orderListVisibilityEdits, setOrderListVisibilityEdits] =
    useState(false);
  const openListOfOrders = () => {
    setOrderListVisibility(true);
    resetForm();
  };

  const openListOfOrdersEdit = () => {
    setOrderListVisibilityEdit(true);
  };

  const openListOfOrdersEdits = () => {
    setOrderListVisibilityEdits(true);
  };
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    variant: "",
  });
  const [data, setData] = useState([]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblPagination, datas, TblHead } = useTable(
    data,
    filterFn,
    userService.headCellsitem
  );

  {
    /*const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.HUID.toLowerCase().includes(target.value))
                
        }
    })
}

const handleSearchweight = e => {
  let target = e.target;
  setFilterFn({
      fn: items => {
          if (target.value === "")
              return items;
          else
              return items.filter(x => x.itemWeight.toLowerCase().includes(target.value))
              
      }
  })
}*/
  }
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.HUID.toLowerCase().includes(target.value) ||
              x.itemName.toLowerCase().includes(target.value) ||
              x.itemType.toLowerCase().includes(target.value) ||
              x.itemWeight.toLowerCase().includes(target.value) ||
              x.orderNumber.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const openListOfOrdersOcc = () => {
    setOrderListVisibilityocc(true);
  };
  const [displaygoldstk, setdisplaygoldstk] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .fetchAll()
      .then((res) => {
        setdisplaygoldstk(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const FetchStk = () => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .fetchAll()
      .then((res) => {
        setdisplaygoldstk(res.data);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const Fetchuser = () => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .primaryfetchAllitems()

      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    Fetchuser();
  }, []);
  const resetImg = () => {
    values.imageSrc = "";
  };

  const Createuser = async () => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .primarycreateitem(values)

      .then((response) => {
        setData(data.concat(response.data));
        console.log(response.data);

        setOrderListVisibility(false);

        setNotify({
          isOpen: true,
          message: "Submitted Successfully",
          severity: "success",
          //variant:"filled"
        });
      });
  };

  const Updateuser = async () => {
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .primaryupdateitem(values.id, values)

      .then((response) => {
        Fetchuser();
        FetchStk();
        var dataNew = data;
        setOrderListVisibilityEdit(false);
        dataNew.forEach((users) => {
          if (values.id === users.id) {
            users.HUID = values.HUID;
            users.itemName = values.itemName;
            users.itemType = values.itemType;
            users.itemPrice = values.itemPrice;
            users.itemWeight = values.itemWeight;
            users.finess = values.finess;
            users.AddPrice = values.AddPrice;
            users.SalesPrice = values.SalesPrice;
            users.imageSrc = values.imageSrc;
          }
        });
        setData(dataNew);
        setNotify({
          isOpen: true,
          message: "Updated Successfully",
          severity: "info",
          //variant:"filled"
        });
      });
  };
  const [orderListVisibilityFull, setOrderListVisibilityFull] = useState(false);

  const openListOfOrdersFull = () => {
    setOrderListVisibilityFull(true);
  };
  const audio = new Audio(
    "https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3"
  );

  const generateNewId = useCallback(() => {
    // ... generate new ID logic ...
    return Math.floor(Math.random() * 100000);
  }, []); // dependencies if needed

  // const generateNewId = () => {
  // Implement your logic to generate a new ID
  // You can use a library like uuid or generate it based on your requirements
  // For simplicity, we're using a random number here
  // return Math.floor(Math.random() * 100000);
  //};
  const [deletedData, setDeletedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const onDelete = async (id) => {
    setConfirmDialog(false);
    createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
      .primarydeleteitem(id)
      .then((res) => {
        FetchStk();
        Fetchuser();
        resetForm();
      })
      .catch(
        //audio.play(),
        // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
        setNotify({
          isOpen: true,
          message: "Deleted successfully.",
          severity: "error",
        })
      );

    const itemIndex = data.findIndex((item) => item.id === id);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    if (itemIndex !== -1) {
      const newId = generateNewId();
      //const deletedItem = data[itemIndex];
      // const deletedItem = {
      // ...data.find(item => item.id === id),
      // id: newId,

      //};
      // const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
      //const deletedItem = apiData[itemIndex];
      const deletedItem = {
        ...data.find((item) => item.id === id),
        id: newId,
        hireDate: formattedDate,
      };
      const updatedData = [
        ...data.slice(0, itemIndex),
        ...data.slice(itemIndex + 1),
      ];

      setData(updatedData);
      setDeletedData(deletedItem);
      FetchStk();
      Fetchuser();

      try {
        const response = axios.post(
          "https://serdb.onrender.com/api/DelInventory",
          deletedItem
        );
        //const apiUrl = 'https://serdb.onrender.com/api/DelEstimatebill'; // Replace with your API endpoint

        if (response.ok) {
          const responseData = await response.json();
          FetchStk();
          Fetchuser();

          setResponseMessage(responseData.message);
        } else {
          const errorData = await response.json();
          setResponseMessage(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error posting deleted data to API:", error);
        setResponseMessage("Error posting deleted data to API");
      }
    }
  };

  const EditOrRemove = (users) => {
    setValues(users);
    openListOfOrdersEdit();
  };
  const EditOrRemoves = (users) => {
    setValues(users);
    openListOfOrdersEdits();
  };
  const [copySuccess, setCopySuccess] = useState("");

  // your function to copy here

  const copyToClipBoard = async (copyMe) => {
    openListOfOrdersFull();
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    //if ('HUID' in fieldValues)
    // temp.HUID = fieldValues.HUID ? "" : "This field is required!"
    if ("itemName" in fieldValues)
      temp.itemName = fieldValues.itemName ? "" : "This field is required!";
    // if ('itemType' in fieldValues)
    // temp.itemType = fieldValues.itemType ? "" : "This field is required!"
    if ("itemWeight" in fieldValues)
      temp.itemWeight = fieldValues.itemWeight ? "" : "This field is required!";
    if ("itemPrice" in fieldValues)
      temp.itemPrice = fieldValues.itemPrice ? "" : "This field is required!";
    if ("SalesPrice" in fieldValues)
      temp.SalesPrice = fieldValues.SalesPrice ? "" : "This field is required!";
    if ("AddPrice" in fieldValues)
      temp.AddPrice = fieldValues.AddPrice ? "" : "This field is required!";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const { values, setValues, errors, setErrors, handleChange, resetForm } =
    useForm(userService.initialitems, true, validate);
  const generateOrderNumber = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
  const resetWT = () => {
    values.orderNumber = generateOrderNumber();
    values.itemWeight = "";
    values.HUID = "";
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK)
        .primarycreateitem(values)

        .then((response) => {
          setData(data.concat(response.data));
          console.log(response.data);

          // setOrderListVisibility(false);
          //resetForm()
          resetWT();
          Fetchuser();
          FetchStk();
          setNotify({
            isOpen: true,
            message: "Submitted Successfully",
            severity: "success",
            //variant:"filled"
          });
        });
    }
  };

  // console.log(country);

  // console.log(data);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: userService.defaultImageSrc,
      });
    }
  };

  const reset = () => {
    document.getElementById("create-course-form").reset();
  };

  const edited = "Pending";
  const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
        palette: {
          primary: {
            main: "#333996",
            light: "#3c44b126",
          },
          secondary: {
            main: "#f83245",
            light: "#f8324526",
          },
          background: {
            //default: "#f4f5fd"
          },
        },
      }),
    [] // [prefersDarkMode]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id) => {
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < data.length) {
      setSelectedIds(data.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(0);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    let intervalId;
    let isMounted = true;
    if (deleting) {
      intervalId = setInterval(async () => {
        const idToDelete = selectedIds[0];
        const totalItems = selectedIds.length;
        let completedItems = 0;
        try {
          // Delete the first selected item from the API
          await axios.delete(
            `https://serdb.onrender.com/api/GstGoldStock/${idToDelete}`
          );
          console.log("Deletion successful:", idToDelete);

          // Update local data state after deletion
          setData(data.filter((item) => item.id !== idToDelete));

          // Remove the deleted item from the selectedIds array
          setSelectedIds(selectedIds.slice(1));

          // Create a new ID for the deleted item
          const newId = generateNewId();
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
          // Modify the deleted item with the new ID

          const deletedItem = {
            ...data.find((item) => item.id === idToDelete),
            id: newId,
            hireDate: formattedDate,
          };
          // Post the modified deleted item to the API
          await axios.post("https://serdb.onrender.com/api/DelInventory", deletedItem);
          console.log(
            "Posted modified deleted item to DelInventory:",
            deletedItem
          );
          setSuccessMessage(
            `Item ${idToDelete} successfully deleted and posted.`
          );
          completedItems++;
          const newProgress = (completedItems / totalItems) * 100;
          setProgress(newProgress);
          setBuffer(newProgress);

          // You can also update your state or perform other actions here
        } catch (error) {
          console.error("Error deleting or posting data:", error);
        }

        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeleting(false);
          clearInterval(intervalId);
        }
      }, 1000); // Interval duration in milliseconds (adjust as needed)
    }
    let timeoutId;

    if (successMessage) {
      // Set a timeout to clear the success message after 5000 milliseconds (adjust as needed)
      timeoutId = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
    // Cleanup: Clear interval on component unmount
    //return () => clearInterval(intervalId);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      isMounted = false;
    };
  }, [deleting, selectedIds, data, successMessage]);

  const handleDeleteSelected = async () => {
    // Start the deletion process
    setDeleting(true);
  };

  const [exportedData, setExportedData] = React.useState([]);

  // Add a function to handle export
  /*const handleExport = () => {
  // Extract relevant data for export
  const exportData = data.map((item) => ({
    hireDate: new Date().toLocaleDateString(),
   HUID: item.HUID,
    itemName: item.itemName,
    finess: "22K916",
    itemWeight: item.itemWeight,
    itemPrice:12,
SalesPrice:15,
AddPrice:450
   
  }));

  // Create a worksheet and set the data
  const ws = XLSX.utils.json_to_sheet(exportData);

  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate an ArrayBuffer from the workbook
  const arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Create a Blob from the ArrayBuffer
  const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Save the Blob as a file
  const fileName = 'exported_data.xlsx';
  saveAs(blob, fileName);
};*/

  const handleExport = () => {
    if (data.length > 0) {
      // Extract relevant data for export
      const exportData = data.map((item) => ({
        hireDate: new Date().toLocaleDateString(),
        HUID: item.HUID,
        itemName: item.itemName,
        finess: "22K916",
        itemWeight: item.itemWeight,
        itemPrice: 12,
        SalesPrice: 15,
        AddPrice: 450,
      }));

      // Create a worksheet and set the data
      const ws = XLSX.utils.json_to_sheet(exportData);

      // Create a workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Generate an ArrayBuffer from the workbook
      const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Create a Blob from the ArrayBuffer
      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Save the Blob as a file
      const fileName = "GoldInventory.xlsx";
      saveAs(blob, fileName);
    } else {
      // If no data, export only the header
      const header = [
        "hireDate",
        "HUID",
        "itemName",
        "itemWeight",
        "itemPrice",
        "SalesPrice",
        "AddPrice",
      ];
      const ws = XLSX.utils.aoa_to_sheet([header]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const arrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([arrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const fileName = "GoldInventory.xlsx";
      saveAs(blob, fileName);
    }
  };

  // ...

  // Add this function to handle the file download
  const saveAs = (blob, fileName) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ItemCompt = ({ description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="button" fontWeight="medium">
        {description}
      </MDTypography>
    </MDBox>
  );

  const Job = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        variant="caption"
        display="block"
        color="white"
        fontWeight="medium"
      >
        {" "}
        {title}{" "}
      </MDTypography>
    </MDBox>
  );
  var goldstk = displaygoldstk.reduce(
    (total, currentValue) => (total = total + Number(currentValue.itemWeight)),
    0
  );
  var stk = 0;
  const highlightSearchTerm = (text) => {
    if (!searchTerm) {
      return text;
    }

    const searchTermRegex = new RegExp(`(${searchTerm})`, "gi");
    return text
      .split(searchTermRegex)
      .map((part, index) =>
        searchTermRegex.test(part) ? <mark key={index}>{part}</mark> : part
      );
  };
  stk = datas().reduce(
    (total, currentValue) => (total = total + Number(currentValue.itemWeight)),
    0
  );
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
  } = controller;
  const columns = [
    {
      Header: (
        <>
          <Checkbox
            checked={
              selectedIds.length > 0 &&
              selectedIds.length === selectedIds.length
            }
            {...label}
            onClick={handleSelectAll}
            disabled={deleting}
          />
          DATE
        </>
      ),
      accessor: "author",
      align: "left",
    },
    { Header: "UID", accessor: "function", align: "left" },
    { Header: "ITEM NAME", accessor: "status", align: "center" },
    { Header: "KARAT", accessor: "employed", align: "center" },
    { Header: "WEIGHT", accessor: "weight", align: "center" },
    { Header: "ACTIONS", accessor: "action", align: "center" },
  ];

  const rows = data
    .filter((item) => {
      // Customize the conditions based on your data structure
      return (
        item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.HUID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.itemWeight.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.AddPrice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.SalesPrice.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.hireDate.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .map((item) => ({
      author:
        new Date(item.hireDate).toLocaleDateString() ===
        new Date().toLocaleDateString() ? (
          <>
            <Checkbox
              {...label}
              size="small"
              disabled={deleting}
              checked={selectedIds.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />

            <Chip
              size="small"
              label={
                <Box fontWeight="fontWeightBold" fontSize={16}>
                  {highlightSearchTerm(
                    new Date(item.hireDate).toLocaleDateString()
                  )}
                </Box>
              }
              color="error"
              variant="outlined"
            />
          </>
        ) : (
          <>
            <Stack direction="row" spacing={2}>
              <Checkbox
                {...label}
                size="small"
                disabled={deleting}
                checked={selectedIds.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <ItemCompt description={highlightSearchTerm(item.hireDate)} />
            </Stack>
          </>
        ),

      function: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={<Job title={highlightSearchTerm(item.orderNumber)} />}
            color="success"
            size="sm"
          />
        </MDBox>
      ),
      status: <ItemCompt description={highlightSearchTerm(item.itemName)} />,
      employed: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={<Job title={"22K" + item.finess * 10} />}
            color="warning"
            size="sm"
          />
        </MDBox>
      ),
      weight: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={
              <Job title={highlightSearchTerm(item.itemWeight + "G")} />
            }
            color="error"
            size="sm"
          />
        </MDBox>
      ),
      action: (
        <>
          <ThemeProvider theme={blueTheme}>
            <Button
              className={`${styles.roots}`}
              style={{ backgroundColor: "#ABD1FF" }}
              onClick={() => EditOrRemove(item)}
            >
              <AutoFixHighOutlinedIcon
                fontSize="small"
                onClick={() => EditOrRemove(item)}
              />
            </Button>
          </ThemeProvider>
          &nbsp;&nbsp;
          <ThemeProvider theme={redTheme}>
            <Button
              className={`${styles.roots}`}
              style={{ backgroundColor: "#ffbfbf" }}
            >
              <DeleteSweepOutlinedIcon
                fontSize="small"
                onClick={() => {
                  //deleteOrder(item.id)
                  setConfirmDialog({
                    isOpen: true,
                    //avatarimage:item.imageSrc,
                    title: "Are you sure to delete this record?",
                    subTitle: "Action Cannot be Reverted?",
                    onConfirm: () => {
                      onDelete(item.id);
                    },
                  });
                }}
              />
            </Button>
          </ThemeProvider>
        </>
      ),
    }));

  values.joins = values.itemName + " " + "⤅" + values.itemWeight;
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  // variant="gradient"
                  //bgColor="info"
                  bgColor="#D3AF37"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDBox>
                    <MDBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <MDTypography
                        variant="h6"
                        color="white"
                        onClick={handleExport}
                      >
                        GOLD INVENTORY MANAGEMENT
                      </MDTypography>

                      <MDTypography variant="h6" color="black">
                        NET WEIGHT ➼➼ {roundTo2DecimalPoint(goldstk).toFixed(3)}
                        G
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>

                <MDBox pt={3}>
                  <Toolbar
                    sx={{
                      borderRadius: 1.5,
                      pl: { sm: 2 },
                      pr: { xs: 1, sm: 1 },
                      ...(selectedIds.length > 0 && {
                        bgcolor: (theme) =>
                          alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                          ),
                      }),
                    }}
                  >
                    {selectedIds.length > 0 ? (
                      <Typography
                        sx={{ flex: "1 1 100%" }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                      >
                        {selectedIds.length} selected
                      </Typography>
                    ) : (
                      <Grid container spacing={3}>
                        <Grid item xs>
                          <MDBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                          >
                            <MDBox>
                              <MDButton
                                onClick={openListOfOrders}
                                variant="gradient"
                                color={sidenavColor}
                                fullWidth
                                startIcon={
                                  <AddTaskOutlinedIcon
                                    onClick={openListOfOrders}
                                  />
                                }
                              >
                                Add
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </Grid>
                        <Grid item>
                          <ExcelUploader />
                        </Grid>
                        <Grid item xs>
                          <MDBox width="12rem" ml="auto">
                            <MDInput
                              type="text"
                              placeholder="Search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </MDBox>
                        </Grid>
                      </Grid>
                    )}

                    {selectedIds.length > 0 ? (
                      <Tooltip title="Delete">
                        {deleting ? (
                          <div style={{ marginTop: "10px" }}>
                            <ProgressBar
                              label="Deleting..."
                              trackColor="#333"
                              indicatorColor="#f7c"
                              size={50}
                              progress={25}
                              trackWidth={5}
                              indicatorWidth={5}
                              spinnerMode={true}
                            />
                            {/* <span>{progress.toFixed(2)}%</span>*/}
                          </div>
                        ) : (
                          <IconButton>
                            <DeleteOutlineTwoToneIcon
                              color="error"
                              onClick={handleDeleteSelected}
                              variant="outlined"
                              disabled={deleting}
                            />
                          </IconButton>
                        )}
                      </Tooltip>
                    ) : (
                      <Tooltip title="Filter list"></Tooltip>
                    )}
                  </Toolbar>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={true}
                    canSearch={true}
                    entriesPerPage={true}
                    showTotalEntries={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <Popup
          title="GOLD QTY"
          openPopup={orderListVisibilityocc}
          setOpenPopup={setOrderListVisibilityocc}
        >
          <OccuranceItem />
        </Popup>
        <Popup
          title="New Items"
          openPopup={orderListVisibility}
          setOpenPopup={setOrderListVisibility}
        >
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={6}>
                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <Input
                      label="ItemCode"
                      name="itemCode"
                      fullWidth
                      disabled
                      //error={errors.itemType}
                      value={values.orderNumber}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneInTalkOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="HUID"
                      name="HUID"
                      fullWidth
                      value={values.HUID}
                      error={errors.HUID}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="itemPrice"
                      name="itemPrice"
                      fullWidth
                      value={values.itemPrice}
                      error={errors.itemPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="AddPrice"
                      name="AddPrice"
                      fullWidth
                      value={values.AddPrice}
                      error={errors.AddPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Finess"
                      name="finess"
                      fullWidth
                      value={values.finess}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="SalesPrice"
                      name="SalesPrice"
                      fullWidth
                      error={errors.SalesPrice}
                      value={values.SalesPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      src={values.imageSrc}
                      sx={{ width: 50, height: 50, bgcolor: "white" }}
                    >
                      <img src="https://img.icons8.com/fluency/65/image.png" />
                    </Avatar>
                  </StyledBadge>

                  <label htmlFor="image-uploader">
                    <Inputs
                      accept="image/*"
                      onChange={showPreview}
                      id="image-uploader"
                      type="file"
                    />
                    <IconButton
                      color="info"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={userService.itemType}
                  freeSolo
                  onChange={handleChange}
                  value={values.itemName}
                  renderInput={(params) => {
                    const inputProps = params.inputProps;
                    inputProps.autoComplete = "off";
                    return (
                      <TextField
                        {...params}
                        name="itemName"
                        error={errors.itemName}
                        value={values.itemName}
                        inputProps={inputProps}
                        focused
                        label="Item Name"
                        variant="outlined"
                        onBlur={handleChange}
                        fullWidth
                      />
                    );
                  }}
                />
                {/*
                <Input
                name="itemName"
                label="Item Name"
                fullWidth
                   error={errors.itemName}
                value={values.itemName}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

               <Input
                label="itemType"
                name="itemType"
                fullWidth
                   error={errors.itemType}
                  value={values.itemType}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/> */}
                <TextField
                  label="Item Weight"
                  name="itemWeight"
                  fullWidth
                  error={errors.itemWeight}
                  value={values.itemWeight}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ThumbsUpDownOutlinedIcon
                          style={{ color: "#007FFF" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <div>
                  <Grid container spacing={2}>
                    <Grid item>
                      <MDBox pt={2}>
                        <MDBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={1}
                        >
                          <MDBox>
                            <MDButton
                              type="submit"
                              variant="gradient"
                              color="info"
                              //color={sidenavColor}
                              fullWidth
                              startIcon={<SendTimeExtensionOutlinedIcon />}
                            >
                              Add Item
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item>
                      <MDBox pt={2}>
                        <MDBox
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={1}
                        >
                          <MDBox>
                            <MDButton
                              onClick={resetForm}
                              variant="gradient"
                              color="info"
                              //color={sidenavColor}
                              fullWidth
                              startIcon={
                                <RotateLeftOutlinedIcon onClick={resetForm} />
                              }
                            >
                              Reset
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Popup>
        <Popup
          title="Edit Items"
          openPopup={orderListVisibilityEdit}
          setOpenPopup={setOrderListVisibilityEdit}
        >
          <form className={styles.root} id="create-course-form">
            <Grid container>
              <Grid item xs={6}>
                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <Input
                      label="ItemCode"
                      name="itemCode"
                      fullWidth
                      disabled
                      //error={errors.itemType}
                      value={values && values.orderNumber}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneInTalkOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="HUID"
                      name="HUID"
                      fullWidth
                      value={values && values.HUID}
                      error={errors.HUID}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="itemPrice"
                      name="itemPrice"
                      fullWidth
                      value={values && values.itemPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="AddPrice"
                      name="AddPrice"
                      fullWidth
                      value={values && values.AddPrice}
                      error={errors.AddPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ThumbsUpDownOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container columnSpacing={{ md: 0.5 }}>
                  <Grid item xs={6}>
                    <TextField
                      label="Finess"
                      name="finess"
                      fullWidth
                      value={values && values.finess}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="SalesPrice"
                      name="SalesPrice"
                      fullWidth
                      error={errors.SalesPrice}
                      value={values && values.SalesPrice}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountBalanceOutlinedIcon
                              style={{ color: "#007FFF" }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      src={values && values.imageSrc}
                      sx={{ width: 50, height: 50, bgcolor: "white" }}
                    >
                      <img src="https://img.icons8.com/fluency/65/image.png" />
                    </Avatar>
                  </StyledBadge>

                  <label htmlFor="image-uploader">
                    <Inputs
                      accept="image/*"
                      onChange={showPreview}
                      id="image-uploader"
                      type="file"
                    />
                    <IconButton
                      color="info"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    <IconButton
                      color="info"
                      component="span"
                      onClick={resetImg}
                    >
                      <RotateLeftOutlinedIcon />
                    </IconButton>
                  </label>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={userService.itemType}
                  freeSolo
                  onChange={handleChange}
                  value={values && values.itemName}
                  renderInput={(params) => {
                    const inputProps = params.inputProps;
                    inputProps.autoComplete = "off";
                    return (
                      <TextField
                        {...params}
                        name="itemName"
                        label="Item Name"
                        error={errors.itemName}
                        value={values && values.itemName}
                        inputProps={inputProps}
                        variant="outlined"
                        onBlur={handleChange}
                        fullWidth
                      />
                    );
                  }}
                />

                {/*
                <Input
                name="itemName"
                label="Item Name"
                fullWidth
                   error={errors.itemName}
                value={values && values.itemName}
                onChange={handleChange} 
                InputProps={{
     startAdornment: <InputAdornment position="start"><PersonAddAltOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>

               <Input
                label="itemType"
                name="itemType"
                fullWidth
                   error={errors.itemType}
                  value={values && values.itemType}
                onChange={handleChange} 
                InputProps={{
            startAdornment: <InputAdornment position="start"><PhoneInTalkOutlinedIcon style={{color:'#007FFF'}}/></InputAdornment>,
          }}/>*/}
                <TextField
                  label="Item Weight"
                  name="itemWeight"
                  fullWidth
                  error={errors.itemName}
                  value={values && values.itemWeight}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ThumbsUpDownOutlinedIcon
                          style={{ color: "#007FFF" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <div>
                  <MDBox p={2} width="50%">
                    <MDButton
                      onClick={() => Updateuser()}
                      variant="gradient"
                      color={sidenavColor}
                      fullWidth
                      startIcon={
                        <UpdateDisabledOutlinedIcon
                          onClick={() => Updateuser()}
                        />
                      }
                    >
                      Update Item
                    </MDButton>
                  </MDBox>
                </div>
              </Grid>
            </Grid>
          </form>
        </Popup>
        <FullPopup
          openPopup={orderListVisibilityFull}
          setOpenPopup={setOrderListVisibilityFull}
        >
          <Container
            justifycontent="center"
            style={{ paddingBottom: 20 }}
            maxWidth="xd"
          >
            <Order />
          </Container>
        </FullPopup>
        <Popup
          title="Customer Details"
          openPopup={orderListVisibilityEdits}
          setOpenPopup={setOrderListVisibilityEdits}
        >
          <Grid container spacing={30}>
            <Grid item xs="auto">
              <Div>
                {"Full Name : "}
                {values && values.fullName}
              </Div>
              <Div>
                {"City : "}
                {values && values.city}
              </Div>
              <Div>
                {"Gender : "}
                {values && values.gender}
              </Div>

              <Div>
                {"Rating : "}
                {
                  <StyledRating
                    name="highlight-selected-only"
                    value={values.rating}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    readOnly
                  />
                }
              </Div>
            </Grid>
            <Grid item xs="auto">
              <Div>
                {"Mobile Number : "}
                {values && values.mobile}
              </Div>
              <Div>
                {"Status : "}
                {values && values.status}
              </Div>
              <Div>
                {"Balance : "}
                {"$"}
                {values && values.balance}
                {"/-"}
              </Div>
              <Div>
                {"Last Visited : "}
                {values && values.hireDate}
              </Div>
            </Grid>
          </Grid>
          <Grid spacing={16}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  {" "}
                  <Grid container spacing={2}>
                    <Grid item xs="auto">
                      <PersonAddAltOutlinedIcon color="primary" />
                    </Grid>
                    <Grid item xs="auto">
                      CUSTOMER INFO
                    </Grid>
                  </Grid>{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={30}>
                  <Grid item xs="auto">
                    <Avatar
                      src={values && values.imageSrc}
                      variant="rounded"
                      sx={{ height: 150, width: 150 }}
                    >
                      <img src="https://img.icons8.com/fluency/65/image.png" />
                    </Avatar>
                  </Grid>
                  <Grid item xs="auto">
                    <Div>
                      {"Mobile Number : "}
                      {values && values.mobile}
                    </Div>
                    <Div>
                      {"Status : "}
                      {values && values.status}
                    </Div>
                    <Div>
                      {"Balance : "}
                      {"$"}
                      {values && values.balance}
                      {"/-"}
                    </Div>
                    <Div>
                      {"Last Visited : "}
                      {values && values.hireDate}
                    </Div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Popup>
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <Notification notify={notify} setNotify={setNotify} />
      </DashboardLayout>
    </>
  );
}
