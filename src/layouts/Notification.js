import React from 'react'
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles(theme => ({
    root: {
        top: useTheme().spacing(9),
        
        
        
    }
}))

export default function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            autoHideDuration={3000}
            className={classes.root}
            open={notify.isOpen}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert variant={notify.variant} severity={notify.severity}
                autoHideDuration={notify.autoHideDuration}
                onClose={handleClose} >
                
                {notify.message}
            </Alert>
        </Snackbar>
    )
}