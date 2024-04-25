import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography ,Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Closeicon from '../Icons/close.png'
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const useStyles = makeStyles(theme => ({
      root: {
        minWidth: 0,
       right:30
        
    },
    dialogWrapper: {
        padding: useTheme().spacing(0),
        position: 'absolute',
        top: useTheme().spacing(0)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup}   maxWidth="lg" hideBackdrop 
          aria-labelledby="draggable-dialog-title"
         PaperComponent={PaperComponent}
       classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button className={`${classes.root}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={()=>{setOpenPopup(false)}}>
                    <img src={Closeicon} height={20}/>
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}