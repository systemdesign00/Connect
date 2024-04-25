import  React,{ useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPIONTS } from '../index';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge';
import {NumberFormat} from '../../Services/NumberFormat';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red ,blue} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { margin } from '@mui/system';
import DoneIcon from '@mui/icons-material/Done';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}
const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(1.5);
  }
  `}
`;

const useStyles = makeStyles((theme) => ({
 
  media: {
      height: 300,
 },
 root: {
   // height: 350,
    maxHeight:470,
    maxWidth:'auto',
    
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  
  },
  cardHovered: {
    transform: "scale3d(1.10, 1.10, 1)"
  }
 
}));
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '150%',
      height: '150%',
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
export default function BracletList() {
 
  
   const [expanded, setExpanded] = React.useState(false);
const styles= useStyles();
  
  const [orderList, setOrderList] = useState([]);
  const [display, setdisplay] = useState([]);

  
    const [searchList, setSearchList] = useState([]);



   

   
 
 
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ITEMS).fetchAll()
            .then(res => {
                setOrderList(res.data)
                setSearchList(res.data);
            })
            .catch(err => console.log(err))


        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
    }, [])

   
    const rates =   display.map(item => (item.rate))
    const defaultImage="https://mui.com/static/images/cards/contemplative-reptile.jpg";
    const [state, setState] = useState({
    raised:false,
    shadow:1,
  })
 let key = 'itemType'
///let key2 = 'imageSrc'
//let key3 = 'itemName'

const findgold = (arr, key) => {
  let arr2 = [];
    
  arr.forEach((x)=>{
       
    // Checking if there is any object in arr2
    // which contains the key value
     if(arr2.some((val)=>{ return val[key] == x[key] })){
         
       // If yes! then increase the occurrence by 1
       arr2.forEach((k)=>{
         if(k[key] === x[key]){ 
           
           k["occurrence"]++
         }
      })
         
     }else{
       // If not! Then create a new object initialize 
       // it with the present iteration key's value and 
       // set the occurrence to 1
       let a = {}
       a[key] = x[key]
           
             
             
       a["occurrence"] = 1
       arr2.push(a);
     }
  })
    
  return arr2
}

 // console.log(findgold(orderList,key,key2))
 

//const chainfilter =  findgold(orderList,key).map((items) => items.itemType) === 'Chain'


  return (
    <>
     
    <Box style={ {marginRight:10,marginLeft:20 ,marginBottom:50 }} >
      <Grid container justifyContent="center">

</Grid>

       <Grid container spacing={0.5} columns={{ xs: 4, sm: 4, md: 12 }}> 
        {
            findgold(orderList,key).filter(item => item.itemType.substring(0,7) === 'Braclet').map((item) => ( 
 
          <Grid item lg={2} sm={4} md={3} key={item.id}>
            
      
                       <Card key={item.id} variant="outlined" 
                       className={styles.root} 
    styles={{root: state.raised ? styles.cardHovered : ""}}
    onMouseOver={()=>setState({ raised: true, shadow:3})} 
    onMouseOut={()=>setState({ raised:false, shadow:1 })} 
    raised={state.raised} zdepth={state.shadow}
                       >
      <CardHeader
        avatar={
         <img src="https://img.icons8.com/color/48/null/bracelet.png"/>
           
        }
        action={
          item.occurrence <=1 ?
         <IconButton aria-label={notificationsLabel(item.occurrence)} disabled style={{color:'black'}}>
  <Badge badgeContent={item.occurrence} color="error">
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        variant="dot"
      >
   <ShoppingCartOutlinedIcon sx={{ height: 30, width: 30 ,color:'red'}} />
     </StyledBadge>
  </Badge>

</IconButton>
:
 <IconButton aria-label={notificationsLabel(item.occurrence)} disabled style={{color:'black'}}>
  <Badge badgeContent={item.occurrence} color="primary">
   <ShoppingCartOutlinedIcon sx={{ height: 30, width: 30 ,color:'primary' }} />
  </Badge>
</IconButton>
            
        }
        title={item.itemType} 
        subheader={item.itemName}
      />
      { /*
      <CardMedia
      className={styles.media}
        component="img"
        height="500"
        image={item.imageSrc}
        defaultValue={item.imageSrc}
       
        style={{ overflow: "hidden" }}
      onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(2.25)", overflow: "hidden" })}
      onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(2)", overflow: "hidden" })}
      /> 
      */ }
     
      <CardActions disableSpacing>

        { /*<IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: red[500] }}/>
        </IconButton>
        <IconButton aria-label="share" >
          <ShareIcon sx={{ color: blue[500] }} onClick={
            () => {
              alert(item.itemName);
            }
          }/>
        </IconButton> */}
       
      </CardActions>
  
    </Card>
    
       
      
          </Grid>
        ))}
      </Grid>
      
    </Box>
    </>
  );
}
