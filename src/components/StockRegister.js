// StockRegister.js
import React, { useState ,useEffect} from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createAPIEndpoint, ENDPIONTS } from '../api';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
   Button,
   TextField,
   CssBaseline
} from '@mui/material';



export default function Stocksegister  ()  {
  const [stockItems, setStockItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  const handleAddItem = () => {
    setStockItems((prevItems) => [...prevItems, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

    const [products, setProducts] = useState([]);
    const [productsil, setProductsil] = useState([]);
   

 useEffect(() => {
   createAPIEndpoint(ENDPIONTS.SIMPLEGST).fetchAll()
            .then(res => {
              setProducts(res.data);
            })
            .catch(err => console.log(err))

 createAPIEndpoint(ENDPIONTS.QSILVERGST).fetchAll()
            .then(res => {
              setProductsil(res.data);
             })
            .catch(err => console.log(err))
    }, [])



const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
       palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
    },
  },
      }),
    [], // [prefersDarkMode]
  );
  const a = products.map(item => (item?.stockaddorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
  const b = products.map(item => (item?.orderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
  const c = products.map(item => (item?.orderPercent?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
  const d = products.map(item => (item?.addorderDetails?.reduce((total, currentValue) => total = total + Number(currentValue.foodItemPrice),0)));
  const e = Number(a + b + c + d);
    return (
      <>
      <DashboardLayout>
        <DashboardNavbar/>
       
     <ThemeProvider theme={theme} >
      <CssBaseline />
   

      <TextField
        label="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <TextField
        type="number"
        label="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 0 })}
      />
      <Button variant="contained" onClick={handleAddItem}>
        Add Item
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DATE</TableCell>
             <TableCell>DESCRIPTION</TableCell>
              <TableCell>SALES WEIGHT</TableCell>
               <TableCell>NET WEIGHT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
               <TableRow>
              <TableCell>JAN 2 2024</TableCell>
             <TableCell>SJ1</TableCell>
              <TableCell>-</TableCell>
               <TableCell>500</TableCell>
            </TableRow>
       {products?.map((item) => {
            let runningTotal = 500; // Set the initial value

            return (
              <React.Fragment key={item.id}>
                {/* Map over stockaddorderDetails */}
                {item?.stockaddorderDetails?.map((row) => {
                  const netWeight = runningTotal - row.foodItemPrice;
                  runningTotal = netWeight;

                  return (
                    <TableRow key={row.billNo}>
                      <TableCell>{new Date(item.hireDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell>{item.billNo + item.id}</TableCell>
                      <TableCell>{row.foodItemPrice + 'G'}</TableCell>
                      <TableCell>{netWeight + 'G'}</TableCell>
                    </TableRow>
                  );
                })}

                {/* Map over orderDetails */}
                {item?.orderDetails?.map((row) => {
                  const netWeight = runningTotal - row.foodItemPrice;
                  runningTotal = netWeight;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>{new Date(item.hireDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell>{item.billNo + item.id}</TableCell>
                      <TableCell>{row.foodItemPrice + 'G'}</TableCell>
                      <TableCell>{netWeight + 'G'}</TableCell>
                    </TableRow>
                  );
                })}

                {/* Map over orderPercent */}
                {item?.orderPercent?.map((row) => {
                  const netWeight = runningTotal - row.foodItemPrice;
                  runningTotal = netWeight;

                  return (
                    <TableRow key={row.id}>
                      <TableCell>{new Date(item.hireDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                      <TableCell>{item.billNo + item.id}</TableCell>
                      <TableCell>{row.foodItemPrice + 'G'}</TableCell>
                      <TableCell>{netWeight + 'G'}</TableCell>
                    </TableRow>
                  );
                })}

               
              </React.Fragment>
            );
          })}

          {/* Additional rows for stockItems */}
          {stockItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
            </TableRow>
          ))}

          </TableBody>
        </Table>
      </TableContainer>
   
      </ThemeProvider>
         </DashboardLayout>
        </>
  );
};


