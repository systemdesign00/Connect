import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AdbIcon from '@mui/icons-material/Adb';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import Tooltip from '@mui/material/Tooltip'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import {COLORS} from '../layouts/Colors';
import ConfirmDialog from './ConfirmDialog';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function FullPopup(props) {

    const { title, children, openPopup, setOpenPopup,handleClickOpen } = props;
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3')
    const onDelete = id => {
      setConfirmDialog({
          ...confirmDialog,
          isOpen: false
       }) }
    return (
        <><Dialog
        fullScreen
        open={openPopup}
        onClose={setOpenPopup}
        TransitionComponent={Transition}
      >


        <AppBar sx={{ position: 'relative', background: COLORS.AppBottom }}>
          <Toolbar>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"

              sx={{
                ml: 2, flex: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {title}
            </Typography>
            {/*
     <IconButton
        edge="start"
        color="inherit"
       
        aria-label="close"
      >
        
       <Tooltip title="Print Invoice"   arrow>
  <LocalPrintshopOutlinedIcon onClick={handleClickOpen}/>
   </Tooltip>
      </IconButton>
    */}
            <IconButton
              edge="start"
              color="inherit"

              aria-label="close"
            >
              <CloseOutlined onClick={() => {
                audio.play();
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to Exit this Invoice?',
                  subTitle: "You can't undo this operation",
                  onConfirm: () => { onDelete(setOpenPopup(false)); }
                });
              } } />
              {/*   <CloseOutlined  onClick={()=>{setOpenPopup(false)}}/> */}
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog><ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog} /></>
    )
}