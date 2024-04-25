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
import RestoreFromTrash from "@mui/icons-material/RestoreFromTrash";
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
//import OccuranceItem from "./Occurance/OccuranceItem";
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
//import useTable from "./useTables";
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
//import { useForm, Form } from "./useForm";
//import Input from "./Input";
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
//import ExcelUploader from "./ExcelUploader";
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

export default function Silverinventoryrestore() {
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
    // resetForm();
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
    createAPIEndpoint(ENDPIONTS.SILVERRESTORE)
      .fetchAll()
      .then((res) => {
        setdisplaygoldstk(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const FetchStk = () => {
    createAPIEndpoint(ENDPIONTS.SILVERRESTORE)
      .fetchAll()
      .then((res) => {
        setdisplaygoldstk(res.data);
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();
  const Fetchuser = () => {
    createAPIEndpoint(ENDPIONTS.SILVERRESTORE)
      .primaryfetchAllitems()

      .then((response) => {
        setData(response.data);
      });
  };

  useEffect(() => {
    Fetchuser();
  }, []);

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
  const [deletings, setDeletings] = useState(false);
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

  //const { values, setValues, errors, setErrors, handleChange, resetForm } =
  // useForm(userService.initialitems, true, validate);
  const generateOrderNumber = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // console.log(country);

  // console.log(data);

  const reset = () => {
    document.getElementById("create-course-form").reset();
  };

  const edited = "Pending";

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
  const handleDelete = () => {
    // Start the deletion process
    setDeletings(true);
  };
  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;
    const totalItems = selectedIds.length;
    let completedItems = 0;
    if (deletings) {
      intervalId = setInterval(() => {
        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeletings(false);
          clearInterval(intervalId);
        } else {
          // Delete the first selected item from the API
          const idToDelete = selectedIds[0];

          axios
            .delete(`https://serdb.onrender.com/api/DelSilverstk/${idToDelete}`)
            .then((response) => {
              console.log("Deletion successful:", response.data);
              // Update the local data state after deletion
              setData(data.filter((item) => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
              completedItems++;
              const newProgress = (completedItems / totalItems) * 100;
              setProgress(newProgress);
              setBuffer(newProgress);
            })
            .catch((error) => console.error("Error deleting data:", error));
        }
      }, 1000);
      // Interval duration in milliseconds (adjust as needed)
    }

    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deletings, selectedIds, data]);
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
            `https://serdb.onrender.com/api/DelSilverstk/${idToDelete}`
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
          await axios.post("https://serdb.onrender.com/api/GstSilverStock", deletedItem);
          console.log(
            "Posted modified deleted item to GstGoldStock:",
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
    { Header: "PRICE/GMS", accessor: "employed", align: "center" },
    { Header: "WEIGHT", accessor: "weight", align: "center" },
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
                    new Date(item.hireDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
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
              <ItemCompt
                description={highlightSearchTerm(
                  new Date(item.hireDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                )}
              />
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
            badgeContent={<Job title={item.itemPrice + "/GMS"} />}
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
    }));

  return (
    <>
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
                bgColor="#A1A2A3"
                //bgColor={sidenavColor}
                borderRadius="lg"
                coloredShadow="#BEC0C2"
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
                      //onClick={handleExport}
                    >
                      SILVER INVENTORY RESTORE
                    </MDTypography>

                    <MDTypography variant="h6" color="black"></MDTypography>
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
                                //onClick={openListOfOrders}
                                />
                              }
                            >
                              SILVER
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Grid>
                      <Grid item>{/*<ExcelUploader />*/}</Grid>
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
                      {deleting || deletings ? (
                        <div style={{ marginTop: "10px" }}>
                          <ProgressBar
                            label={
                              deleting
                                ? "Restoring..."
                                : "Deleting..." || deletings
                                ? "Deleting..."
                                : "Restoring..."
                            }
                            trackColor="#333"
                            indicatorColor="#f7c"
                            size={50}
                            progress={25}
                            trackWidth={5}
                            indicatorWidth={5}
                            spinnerMode={true}
                          />
                          <span>{progress.toFixed(2)}%</span>
                        </div>
                      ) : (
                        <>
                          <IconButton>
                            <RestoreFromTrash
                              color="error"
                              onClick={handleDeleteSelected}
                              variant="outlined"
                              disabled={deleting}
                            />
                          </IconButton>
                          <IconButton>
                            <DeleteOutlineTwoToneIcon
                              color="error"
                              onClick={handleDelete}
                              variant="outlined"
                              disabled={deleting}
                            />
                          </IconButton>
                        </>
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

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
