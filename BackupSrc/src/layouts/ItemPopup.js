import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography ,Button,Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material/styles';
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
        
    },
    dialogWrapper: {
        padding: useTheme().spacing(1),
        position: 'absolute',
        top: useTheme().spacing(0)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function ItemPopup(props) {

    const { title, children, openPopupitem, setOpenPopupitem } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopupitem}   maxWidth="xd"  aria-labelledby="draggable-dialog-title"
       classes={{ paper: classes.dialogWrapper }}  PaperComponent={PaperComponent} hideBackdrop>
            <DialogTitle className={classes.dialogTitle} style={{ cursor: 'move' }} id="draggable-dialog-title">
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Button className={`${classes.root}`}
                        color="error"
                        style={{  backgroundColor: '#ffbfbf'}} 
                        onClick={()=>{setOpenPopupitem(false)}}>
                  <img src={Closeicon} height={25}/>
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}