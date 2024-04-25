import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArchitectureOutlinedIcon from '@mui/icons-material/ArchitectureOutlined';
import { useNavigate } from "react-router-dom";
//import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {COLORS} from '../layouts/Colors';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
export default function Bott() {
const navigate = useNavigate();
  const ref = React.useRef(null);
  const [value, setValue] = React.useState('Home');

  const audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-message-pop-alert-2354.mp3')
  //https://assets.mixkit.co/sfx/download/mixkit-hard-pop-click-2364.wav
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
       <>
       <Box sx={{ pb: 7 }} >
                <CssBaseline />
       <Paper sx={{ position:"fixed", bottom: 0, left: 0, right: 0 ,height: '80px'}} elevation={3}>
     <BottomNavigation  value={value} onChange={handleChange}>
        <BottomNavigationAction 
        style={{color:'blue'}}
        onClick={(e)=>{
            audio.play()
  navigate('/')
        }}
        label="Home"
        value="Home"
        icon={<CottageOutlinedIcon  style={{color:'blue'}}/>}
      />
     

  <BottomNavigationAction label="Favorites" style={{color:'red'}} onClick={(e) => {
  audio.play()
  navigate('/invoice')
}} icon={<FavoriteIcon  style={{color:'red'}}/>} />

{
  /*
   <StyledFab color="primary" aria-label="add">
            <AddIcon />
          </StyledFab>
  */
}
          
          <BottomNavigationAction label="New" style={{color:'violet'}} onClick={(e) => {
  audio.play()
  navigate('/hello')
}} icon={<ArchitectureOutlinedIcon style={{color:'violet'}}/>} />
          <BottomNavigationAction  label="Settings" style={{color:'black'}} onClick={(e) => {
  audio.play()
  navigate('/set')
}} icon={<SettingsOutlinedIcon style={{color:'black'}}/>} />
        </BottomNavigation>
     </Paper>
     </Box>
     </>
  );
}
