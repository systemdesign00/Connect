import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog';
import Table from '@mui/material/Table';
import Chip from '@mui/material/Chip';
import { COLORS } from '../../layouts/Colors';
import Container from '@mui/material/Container';
import  Snackbar  from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Check from '@mui/icons-material/Check';
import Checkbox from '@mui/material/Checkbox';
import Badge from '@mui/material/Badge';
import * as userService from "../../Services/userService";
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useTable from '../GSEstimate/useTables';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Popup from '../../layouts/Popup';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DatePicker from '../../hooks/DatePicker';
import {NumberFormat} from '../../Services/NumberFormat';
import axios from 'axios';
import { SlCalender } from "react-icons/sl";
import ButtonGroup from '@mui/material/ButtonGroup';
import OpenInNewOffOutlinedIcon from '@mui/icons-material/OpenInNewOffOutlined';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import '../../assets/css/material-dashboard.css?v=3.1.0'
const useStyles = makeStyles(theme => ({

    table: {
        '& thead th': {
            fontWeight: '600',
          color: COLORS.TableHeadColor,
      backgroundColor: COLORS.TableBgColor,
        },
        '& tbody td': {
            fontWeight: '600',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    }

}))
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function OrderList(props) {
    const classes = useStyles();
    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

const errorsound = new Audio('https://www.myinstants.com/media/sounds/erro.mp3')
const [data, setData]=useState([]);
const [opens, setOpens] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy here
  
    const copyToClipBoard = async copyMe => {
      setOpens(true);
      try {
        await navigator.clipboard.writeText(copyMe);
        setCopySuccess('Copied!');
      } catch (err) {
        setCopySuccess('Failed to copy!');
      }
    };
  

const [selectedIds, setSelectedIds] = useState([]);
const [deleting, setDeleting] = useState(false);


const [products, setProducts] = useState([]);
const [allProducts, setAllProducts] = useState([]);

const [startDate,setStartDate]= useState(new Date());
const [endDate,setEndDate]= useState(new Date());
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
     
    
    const [Equalizepg, setEqualizepg] = useState(false);
const openEqualizepg = () => {
        setEqualizepg(true);
    }
    const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
             .catch(err => console.log(err))
            //.catch(
              //    errorsound.play(),
                //setNotify({ isOpen: true, message: "Error Check Your Network",severity:"warning" }))
    }
      useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
            })
            .catch(err => console.log(err))
}, [])
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }
    /*   const deleteOrder = id => {
           setConfirmDialog({
               ...confirmDialog,
               isOpen: false
           })
    }*/

     const {
   
    TblPagination,
    datas,
    TblHead,
} = useTable(data, filterFn,userService.headcellsVentors);

const handleSearchcustomersss = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            else
                return items.filter(x => x.shopName.toLowerCase().includes(target.value))
                
        }
    })
}
const handleSelect = (date) =>{
  let filtered = allProducts.filter((product)=>{
    let productDate = new Date(product["hireDate"]);
    return(productDate>= date.selection.startDate &&
      productDate<= date.selection.endDate);
  })
  setStartDate(date.selection.startDate);
  setEndDate(date.selection.endDate);
  setData(filtered);
};
const generateNewId = () => {
  // Implement your logic to generate a new ID
  // You can use a library like uuid or generate it based on your requirements
  // For simplicity, we're using a random number here
  return Math.floor(Math.random() * 1000);
};
const selectionRange = {
  startDate: startDate,
  endDate: endDate,
  key: 'selection',
}
const [deletedData, setDeletedData] = useState(null);
const [responseMessage, setResponseMessage] = useState(null);
const onDelete = async (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
            
        })
       createAPIEndpoint(ENDPIONTS.PURCHASE).delete(id)
                   .then(res => {
                createAPIEndpoint(ENDPIONTS.PURCHASE).fetchAll()
            .then(res => {
              
              setData(res.data);
              setAllProducts(res.data);
            })
            .catch(err => console.log(err))
                   resetFormControls();
                   })
                   .catch(
                       //errorsound.play(),
                   // setNotify({ isOpen: true, message: "Deleting Failed",severity:"warning" }))
                   setNotify({ isOpen: true, message: 'Deleted successfully.' }));

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
               const deletedItem = {
                ...data.find(item => item.id === id),
                id: newId,
                 hireDate: formattedDate,
              };
                     const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
                     setData(updatedData);
                     setDeletedData(deletedItem);
                     fetchAlled();
                     try {
                      const response =  axios.post('https://serdb.onrender.com/api/DelGoldpurchase', deletedItem);
                       //const apiUrl = 'https://serdb.onrender.com/api/DelEstimatebill'; // Replace with your API endpoint
                       
               
                       if (response.ok) {
                         const responseData = await response.json();
                         fetchAlled();
                         setResponseMessage(responseData.message);
                       } else {
                         const errorData = await response.json();
                         setResponseMessage(`Error: ${errorData.message}`);
                       }
                     } catch (error) {
                       console.error('Error posting deleted data to API:', error);
                       setResponseMessage('Error posting deleted data to API');
                     }
                    
                   }
       
    }
    /*
       const deleteOrder = id => {
           if (window.confirm('Are you sure to delete this record?')) {
               createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                   .then(res => {
                       setOrderListVisibility(false);
                       setOrderId(0);
                       resetFormControls();
                       setNotify({ isOpen: true, message: 'Deleted successfully.' });
                   })
                   .catch(err => console.log(err))
           }
       }*/
  let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
       
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3')

//const inputTS = Date.parse(input);
//const result = orderList.filter(d=> d.hireDate === isToday);
const edited = "Balance";
const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };
  
  const handleSearchcustomer = e => {
    const searchText = e.target.value.toLowerCase();
    setFilterFn({
        fn: items => {
            if (searchText === "")
                return items;
            else {
                const filteredItems = items.filter(x => 
                    x.shopName.toLowerCase().includes(searchText) ||
                    x.city.toLowerCase().includes(searchText) || 
                    x.mobile.toLowerCase().includes(searchText) ||
                    x.status.toLowerCase().includes(searchText)
                );

                // Map through filtered items and apply highlighting
                const highlightedItems = filteredItems.map(item => {
                    return {
                        ...item,
                        shopName: highlightText(item.shopName, searchText),
                        city: highlightText(item.city, searchText),
                        mobile: highlightText(item.mobile, searchText),
                          status: highlightText(item.status, searchText)
                    };
                });

                return highlightedItems;
            }
        }
    });
};

const highlightText = (text, searchText) => {
    const regex = new RegExp(`(${searchText})`, 'gi');
    return text.split(regex).map((part, index) => {
        return part.match(regex) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part;
    });
};


useEffect(() => {
  // Fetch data from the API
  axios.get('https://serdb.onrender.com/api/PURCHASE')
    .then(response => setData(response.data))
    .catch(error => console.error('Error fetching data:', error));
}, []);

const [showDeleteButton, setShowDeleteButton] = useState(true)
  const handleCheckboxChange = (id) => {
     const isSelected = selectedIds.includes(id);
    // Update the visibility of the delete button
    setShowDeleteButton(isSelected);
    // Update the selected IDs array based on checkbox changes
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (id) => {
     const isSelected = selectedIds.includes(id);
    // Update the visibility of the delete button
    setShowDeleteButton(isSelected);
    // Select all items if not all are already selected, otherwise clear selection
    if (selectedIds.length < datas().length) {
      setSelectedIds(datas().map(item => item.id));
    } else {
      setShowDeleteButton(!isSelected);
      setSelectedIds([]);
    }
  };
const handleDeleteSelected = () => {
  // Start the deletion process
  setDeleting(true);
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

        axios.delete(`https://serdb.onrender.com/api/Purchase/${idToDelete}`)
          .then(response => {
            console.log('Deletion successful:', response.data);
            // Update the local data state after deletion
            setData(datas().filter(item => item.id !== idToDelete));
            // Remove the deleted item from the selectedIds array
            setSelectedIds(selectedIds.slice(1));
          })
          .catch(error => console.error('Error deleting data:', error));

      const itemIndex = data.findIndex((item) => item.id === idToDelete);
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
                ...data.find(item => item.id === idToDelete),
                id: newId,
                 hireDate: formattedDate,
              };
            const updatedData = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
            setData(updatedData);
            setDeletedData(deletedItem);
            fetchAlled();
            try {
              const response =  axios.post('https://serdb.onrender.com/api/DelGoldpurchase', deletedItem);
            /*  const apiUrl = 'https://serdb.onrender.com/api/DelEstimatebill'; // Replace with your API endpoint
              const response =  fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(deletedItem),
                
              }
              );*/
      
              if (response.ok) {
                const responseData =  response.json();
                fetchAlled();
                setResponseMessage(responseData.message);
              } else {
                const errorData =  response.json();
                setResponseMessage(`Error: ${errorData.message}`);
              }
            } catch (error) {
              console.error('Error posting deleted data to API:', error);
              setResponseMessage('Error posting deleted data to API');
            }
           
          }
      }
    }, 1000); // Interval duration in milliseconds (adjust as needed)
  }

  // Clean up the interval when the component unmounts or when deletion is complete
  return () => clearInterval(intervalId);
}, [deleting, selectedIds, datas()]);
    return (
        <>
         <Container component={Paper}>    
      <div >
      <div >
        <div>
          <div class="card-header p-0 position-relative mt-n2 mx-1 z-index-2">
            <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
              <h6 class="text-white text-capitalize ps-3">LIST OF PURCHASES</h6>
            </div>
          </div>
          <Toolbar>
        <div>
          {/* Input field */}
          {showDeleteButton && (

          
  <Grid item xs={8}>
<FormControl  sx={{ m: 3 }} autocomplete="off">
          <InputLabel htmlFor="outlined-adornment-amount">Search Ventors</InputLabel>
          <OutlinedInput
          sx={{width:'200%'}}
            id="outlined-adornment-amount"
            onChange={handleSearchcustomer}
            startAdornment={<InputAdornment position="start"><SlCalender onClick={openEqualizepg} color='info' /></InputAdornment>}
         label="Search Customer"
          />
</FormControl>
  </Grid>
 
  





            
          )}
          {/* Delete button */}
          {!showDeleteButton && (
            <Button onClick={handleDeleteSelected} variant="contained" color="secondary" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Selected'}
            </Button>
          )}
        </div>
      </Toolbar>
          <div class="card-body px-0 pb-2">
            <div class="table-responsive p-0">
              <table class="table align-items-center mb-0">
                <thead>
                  <tr>
<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" > <Checkbox {...label} onClick={handleSelectAll} disabled={deleting} />  </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" 
                    onClick={() => handleSort('shopName')}>author  </th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    onClick={() => handleSort('city')}>city/town</th>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                                    onClick={() => handleSort('mobile')}>contact</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" 
                    onClick={() => handleSort('hireDate')}>date</th>
                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                   onClick={() => handleSort('Purebalance')} >status</th>
                    <th class="text-secondary opacity-7"></th>
                  </tr>
                </thead>
                <tbody>
                    {
                            datas().map(item => (
<tr class="hover-effect"> <td class="hover-effect">
                      <div class="d-flex px-2 py-1">
                        <div>
                          <Checkbox {...label}  size="small" 
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}/>
                        </div>
                        
                      
                      </div>
                    </td>
                    <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <div class="d-flex px-2 py-1">
                        <div>
                          <img src="https://img.icons8.com/fluency/48/user-male-circle--v1.png" class="avatar avatar-sm me-3 border-radius-lg" />
                        </div>
                    
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="mb-0 text-xl">{item.shopName}</h6>
                          <p class="text-xs text-secondary mb-0">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <h6 class="text-xl font-weight-bold mb-0 ">{item.city}</h6>
                      <h6 class="text-xl font-weight-bold mb-1"></h6>
                    </td>
                     <td onClick={e => showForUpdate(item.id)} class="hover-effect" class="cell-with-space">
                      <h6 class="text-xl font-weight-bold mb-2"></h6>
                      <h6 class="text-xl font-weight-bold mb-2">{item.mobile}</h6>
                    </td>
                    <td class="align-middle text-center text-sm" class="hover-effect"  class="cell-with-space"
                    onClick={e => showForUpdate(item.id)}>
                      
                     {
             new Date().toLocaleDateString() == new Date(item.hireDate).toLocaleDateString() ? 
                      <span class="badge badge-sm bg-gradient-danger">{
                        new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
                      }</span> :
                         <span class="badge badge-sm bg-gradient-secondary">{
                          new Date(item.hireDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
                         }</span>
                     }
                    </td>
                 <td class="align-middle text-center hover-effect" onClick={e => showForUpdate(item.id)}>
  {

    (edited === "Balance" && item.Purebalance > 0 ) ?
      <span class="badge badge-sm bg-gradient-success">{item.Purebalance+"G"}</span> :
      <span class="badge badge-sm bg-gradient-primary">{item.Purebalance+"G"}</span>
  }
</td>

  <td class="align-middle" class="cell-with-space">
{

    (edited === "Balance" && item.status === "Balance") ?
    <ButtonGroup size="small" aria-label="small button group">
      </ButtonGroup> :
       <ButtonGroup size="small" aria-label="small button group">
        <>
          <Button color="secondary" variant="contained">
         <DeleteOutlineTwoToneIcon
                                      
                                      //onClick={() => {onDelete(item.id)
                                     // audio.play();
                                      //}} 
                                          onClick={() => {
                                       //deleteOrder(item.id)
                                        audio.play();
                                               setConfirmDialog({
                                                  isOpen: true,
                                                    //avatarimage:item.imageSrc,
                                                   title: 'Are you sure to delete this record?',
                                                  subTitle: "You can't undo this operation",
                                                  onConfirm: () => { onDelete(item.id) }
                                               })
                                           }}
                                            />
         </Button>
&nbsp;
         
        </>
      </ButtonGroup>
    
  }
    </td>
                    
                  </tr>
                            ))}
                  
                
                 
                 
                  
                  
                </tbody>
              </table>
               <TblPagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>    
      
            <Popup
                title="DATE FILTER"
                openPopup={Equalizepg}
                setOpenPopup={setEqualizepg}>
                 
                 <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
