// StockRegister.js
import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  
  Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
export default function Stocksegister  ()  {
  const [stockItems, setStockItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });

  const handleAddItem = () => {
    setStockItems((prevItems) => [...prevItems, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  return (
    <div>
      <h1>Stock Register</h1>

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
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


