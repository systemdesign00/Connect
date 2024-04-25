import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Chip } from "@mui/material";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RestoreFromTrash from "@mui/icons-material/RestoreFromTrash";
import Checkbox from "@mui/material/Checkbox";
import { COLORS } from "../../layouts/Colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: COLORS.TableHeadColor,
    backgroundColor: COLORS.TableBgColor,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f4f5fd",
    cursor: "pointer",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Inventoryrestore() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000000);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [value, setValue] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [apiDataeb, setApiDataeb] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedData, setDeletedData] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [deletings, setDeletings] = useState(false);
  const handleCheckboxChange = (id) => {
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleSelectAll = () => {
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < apiData.length) {
      setSelectedIds(apiData.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };
const generateNewId = () => {
  // Implement your logic to generate a new ID
  // You can use a library like uuid or generate it based on your requirements
  // For simplicity, we're using a random number here
  return Math.floor(Math.random() * 1000);
};
  const handleDeleteSelected = () => {
    // Start the deletion process
    setDeleting(true);
  };

  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;

    if (deleting) {
      intervalId = setInterval(() => {
        if (selectedIds.length === 0) {
          // Stop the interval if there are no more selected items
          setDeleting(false);
          clearInterval(intervalId);
        } else {
          // Delete the first selected item from the API
          const idToDelete = selectedIds[0];

          axios
            .delete(`https://serdb.onrender.com/api/DelInventory/${idToDelete}`)
            .then((response) => {
              console.log("Deletion successful:", response.apiData);
              // Update the local data state after deletion
              setApiData(apiData.filter((item) => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch((error) => console.error("Error deleting data:", error));

         const currentDate = new Date();
       const formattedDate = currentDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
            if (itemIndex !== -1) {
               const newId = generateNewId();
               //const deletedItem = data[itemIndex];
               const deletedItem = {
                ...apiData.find(item => item.id === idToDelete),
                id: newId,
                 hireDate: formattedDate,
              };
            const updatedData = [
              ...apiData.slice(0, itemIndex),
              ...apiData.slice(itemIndex + 1),
            ];
            setApiData(updatedData);
            setDeletedData(deletedItem);

            try {
              const apiUrl = "https://serdb.onrender.com/api/GstGoldStock"; // Replace with your API endpoint
              const response = fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(deletedItem),
              });

              if (response.ok) {
                const responseData = response.json();
                setResponseMessage(responseData.message);
              } else {
                const errorData = response.json();
                setResponseMessage(`Error: ${errorData.message}`);
              }
            } catch (error) {
              console.error("Error posting deleted data to API:", error);
              setResponseMessage("Error posting deleted data to API");
            }
          }
        }
      }, 1000);
      // Interval duration in milliseconds (adjust as needed)
    }

    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deleting, selectedIds, apiData]);

  const handleDelete = () => {
    // Start the deletion process
    setDeletings(true);
  };

  useEffect(() => {
    // Delete selected items at intervals when the "deleting" state is true
    let intervalId;

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
            .delete(`https://serdb.onrender.com/api/DelInventory/${idToDelete}`)
            .then((response) => {
              console.log("Deletion successful:", response.apiData);
              // Update the local data state after deletion
              setApiData(apiData.filter((item) => item.id !== idToDelete));
              // Remove the deleted item from the selectedIds array
              setSelectedIds(selectedIds.slice(1));
            })
            .catch((error) => console.error("Error deleting data:", error));
        }
      }, 1000);
      // Interval duration in milliseconds (adjust as needed)
    }

    // Clean up the interval when the component unmounts or when deletion is complete
    return () => clearInterval(intervalId);
  }, [deletings, selectedIds, apiData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://serdb.onrender.com/api/DelInventory"; // Replace with your API endpoint
        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setApiData(data);
        } else {
          setError("Error fetching data from API");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setError("Error fetching data from API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={2}>
              <Box fontWeight="fontWeightBold" fontSize={15}>
                {selectedIds.length}
              </Box>
            </Grid>

            <Grid item xs={2}>
              <Chip
                icon={<RestoreFromTrash />}
                color="info"
                onClick={handleDeleteSelected}
                label={deleting ? "Restoring..." : "Restore"}
                variant="outlined"
                disabled={deleting}
              />
            </Grid>
            <Grid item xs={2}>
              <Chip
                icon={<DeleteOutlineTwoToneIcon />}
                color="error"
                onClick={handleDelete}
                label={deleting ? "Deleting..." : "Delete"}
                variant="outlined"
                disabled={deleting}
              />
            </Grid>
          </Grid>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox
                    {...label}
                    size="small"
                    onClick={handleSelectAll}
                    disabled={deleting}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    ITEM ID
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    DATE
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    HUID
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    ITEM NAME
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    ITEM WEIGHT
                  </Box>
                </StyledTableCell>
                <StyledTableCell>
                  <Box fontWeight="fontWeightBold" fontSize={15}>
                    FINESS
                  </Box>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>
                        <Checkbox
                          {...label}
                          size="small"
                          checked={selectedIds.includes(row.id)}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {row.orderNumber}
                        </Box>{" "}
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {new Date(row.hireDate).toLocaleDateString()}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {row.HUID}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {row.itemName}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {row.itemWeight}G
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>
                        {" "}
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          {row.finess}
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[{ label: "All", value: 1000000 }, 5, 10, 25]}
          component="div"
          count={apiData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
