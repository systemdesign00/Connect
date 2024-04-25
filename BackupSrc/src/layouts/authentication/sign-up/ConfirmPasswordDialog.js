// ConfirmPasswordDialog.js
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const ConfirmPasswordDialog = ({ open, onClose, onConfirm, onPasswordConfirmed, resetPassword }) => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = () => {
    // Perform password validation here
    // For simplicity, this example just checks if the password is 'password'
    if (password === '1100') {
      onConfirm();
      onPasswordConfirmed(); // Run additional function after password confirmation
      resetPassword(); 
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Password</DialogTitle>
      <DialogContent>
        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="dense"
          value={password}
          onChange={handlePasswordChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPasswordDialog;
