import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton } from '@mui/material'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
     
    },
    dialog: {
        //padding: useTheme().spacing(2),
        position: 'absolute',
        top: 30
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifycontent: 'center'
    },
    titleIcon: {
        backgroundColor: '#ffbfbf',
        color: '#f83245',
        '&:hover': {
            backgroundColor: '#ffbfbf',
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function Sd(props) {

    const { confirmDialog, setConfirmDialog, onClose, onOk, visible = false } = props;
    const classes = useStyles()

    return (
        <Dialog open={visible} classes={{ paper: classes.dialog }} 
        hideBackdrop
  disableEscapeKeyDown
        TransitionComponent={Transition}>
            <DialogTitle className={classes.dialogTitle} >
             
                <IconButton disableRipple className={classes.titleIcon}>
                    <NotListedLocationIcon />
                </IconButton>
                <IconButton 
                 color="secondary"
               
          aria-label="close"
         onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
           
          }}
        >
        
          <CloseOutlined style={{color: '#f83245'}}/>
        </IconButton>
                   
            </DialogTitle>
            <DialogContent className={classes.dialogContent} >
                <Typography variant="h6">
                   Warning
                </Typography>
                <Typography variant="subtitle2">
                   Warning
                </Typography>
            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Button
                    size="medium"
                 
                   
                    style={{  color:'#333996', backgroundColor: '#3c44b126'}} 
                    type="submit" onClick={onOk}>No</Button>
                <Button
                   size="medium"
                    //color="secondary"
                    style={{ color:'#f83245' , backgroundColor: '#ffbfbf'}} 
                    type="submit"   onClick={onClose}>Yes</Button>

            </DialogActions>
        </Dialog>
    )
}