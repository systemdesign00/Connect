import React from "react";
import {
  List,
  ListItemText,
  Paper,
  ListItem,
  ListItemSecondaryAction,
  Grid,
  IconButton,
  ButtonGroup,
  Button,
  Box,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Checkbox from "@mui/material/Checkbox";
import { roundTo2DecimalPoint } from "../../utils/index";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: "15px 0px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#E3E3E3",
    borderRadius: 8,
    "& .MuiButtonBase-root ": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "1.2em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
    "& .MuiButtonBase-root": {
      color: "#E81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 10px",
  },
  listRoot: {
    marginTop: useTheme().spacing(1),
    maxHeight: 450,
    overflow: "auto",
  },
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: useTheme().spacing(1.5),
    flex: 1,
  },
}));

export default function OrderedItems(props) {
  const { Order, setOrder } = props;
  const classes = useStyles();

  let orderedFoodItems = Order.orderDetails;

  const removeFoodItem = (index, id) => {
    debugger;
    let x = { ...Order };
    x.orderDetails = x.orderDetails.filter((_, i) => i != index);
    if (id != 0) x.deletedOrderItemIds += id + ",";
    setOrder({ ...x });
  };

  const updateQuantity = (idx, value) => {
    let x = { ...Order };
    let foodItem = x.orderDetails[idx];
    if (foodItem.itemQuantity + value > 0) {
      foodItem.itemQuantity += value;
      setOrder({ ...x });
    }
  };
  const updatecheck = (idx, valuee) => {
    let x = { ...Order };
    let foodItem = x.orderDetails[idx];
    if (foodItem.isdelivered + valuee > -1) {
      foodItem.isdelivered += valuee;
      setOrder({ ...x });
    }
  };
  let checked = 0;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box fontWeight="fontWeightBold" fontSize={16}>
            &nbsp; &nbsp; {Order.ventorName}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box fontWeight="fontWeightBold" fontSize={16}>
            &nbsp; &nbsp; {Order.mobile}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box fontWeight="fontWeightBold" fontSize={16}>
            &nbsp; &nbsp; {Order.city}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box fontWeight="fontWeightBold" fontSize={16}>
            &nbsp; &nbsp; {formattedDate}
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          stickyHeader
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Delivery Status</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Model</TableCell>
              {/*     <TableCell >Item Weight</TableCell>*/}
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedFoodItems.map((item, idx) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={idx}
              >
                <TableCell component="th" scope="row">
                  {checked == item.isdelivered ? (
                    <>
                      <Checkbox
                        onClick={(e) => updatecheck(idx, 1)}
                        icon={<BookmarkIcon color="success" />}
                        checkedIcon={<BookmarkIcon color="success" />}
                      />
                    </>
                  ) : (
                    <>
                      <Checkbox
                        onClick={(e) => updatecheck(idx, -1)}
                        icon={<BookmarkIcon color="error" />}
                        checkedIcon={<BookmarkIcon color="error" />}
                      />
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold" fontSize={16}>
                    {item.itemName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box fontWeight="fontWeightBold" fontSize={16}>
                    {item.itemType}
                  </Box>
                </TableCell>

                <TableCell>
                  <ButtonGroup className={classes.buttonGroup} size="small">
                    <Button onClick={(e) => updateQuantity(idx, -1)}>-</Button>
                    <Button disabled>
                      <Box fontWeight="fontWeightBold" fontSize={16}>
                        {item.itemQuantity}
                      </Box>
                    </Button>
                    <Button onClick={(e) => updateQuantity(idx, 1)}>+</Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>
                  {" "}
                  <IconButton
                    disableRipple
                    onClick={(e) => removeFoodItem(idx, item.orderDetailId)}
                  >
                    <DeleteTwoToneIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
