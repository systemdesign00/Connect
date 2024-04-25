import  React,{ useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPIONTS } from './index';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import {NumberFormat} from '../Services/NumberFormat';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red ,blue} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
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
      height: 250,
      //transition: "transform 0.15s ease-in-out",
   // "&:hover": { transform: "scale3d(1.50, 1.50, 1)" }
 },
 root: {
    //height: 200,
    maxHeight:490,
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

export default function RecipeReviewCard() {

  
   const [expanded, setExpanded] = React.useState(false);
const styles= useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [display, setdisplay] = useState([]);

   const [searchKey, setSearchKey] = useState('');
    const [searchList, setSearchList] = useState([]);
   // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    useEffect(() => {
       
        createAPIEndpoint(ENDPIONTS.GSTGOLDSTOCK).fetchAll()
            .then(res => {
                setOrderList(res.data)
                setLoading(false);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))


        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let x = [...orderList];
        
        x = x.filter(y => {
            return y.orderNumber.includes(searchKey.toLocaleLowerCase())
         });
        
       setSearchList(x);
    
    }, [searchKey])
    const rates =   display.map(item => (item.rate))
    const defaultImage="https://mui.com/static/images/cards/contemplative-reptile.jpg";
    const [state, setState] = useState({
    raised:false,
    shadow:1,
  })

  return (
    <>
    
    <Box style={ {marginRight:10,marginLeft:20 ,marginBottom:50 }} >
      <Grid container justifyContent="center">
<Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignContent: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
       value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search By HUID"
        inputProps={{ 'aria-label': 'Search By Code in Tag || அட்டையில் ஐடி மூலம் தேடவும்' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
</Grid>

       <Grid container spacing={0.5} columns={{ xs: 4, sm: 4, md: 12 }}> 
        {
            searchList.map((item) => (
 
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
            <StyledAvatar src={item.imageSrc} sx={{ bgcolor: 'grey'}}>
                   <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.itemName.charAt(0)}
                                </Box>
                  </StyledAvatar>
           
        }
        action={
           <Chip
            variant='outlined'
  label="916"
  icon={<DiamondOutlinedIcon style={{ fill: 'blue' }} />}
/>
        }
        title={item.itemName + '---' + item.itemType} 
        subheader={item.HUID}
      />
      
      <CardMedia
      
      className={styles.media}
        component="img"
        height="200"
        image={item.imageSrc}
        defaultValue={item.defaultImage}
        alt={item.itemName.charAt(0)}
        style={{ overflow: "hidden" }}
      onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(2.25)", overflow: "hidden" })}
      onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(2)", overflow: "hidden" })}
      />
      <CardContent>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
     <Typography variant="button" display="block" gutterBottom> 
         {"Name:" +item.itemName} 
        </Typography>

      <Typography variant="button" display="block" gutterBottom> 
         {"பொருள்:" +item.itemName} 
        </Typography>
  </Grid>
  <Grid item xs={6}>
     <Typography variant="button"  gutterBottom display="block" sx={{ color: "#AA6C39" ,fontSize: 15,
      fontFamily: "Montserrat",
      fontWeight: 300 }}> 
         {"Weight:" + item.itemWeight + "g      "}
        </Typography>


        <Typography variant="button"  gutterBottom display="block" sx={{ color: "#AA6C39" ,fontSize: 15,
      fontFamily: "Montserrat",
      fontWeight: 300}}> 
         {"எடை:" + item.itemWeight + "g"}
        </Typography>
  </Grid>
  <Grid item xs={6}>
    <Chip
    color='error'
    label={<Typography variant="button"  gutterBottom> 
         {NumberFormat(Math.round((item.itemWeight * rates) + Math.round(Number(item.SalesPrice) * (item.itemWeight * rates)) / 100) + Math.round(Number(3/100)*Math.round((item.itemWeight * rates) + (Number(item.SalesPrice) * (item.itemWeight * rates)) / 100))) }
        </Typography>
        }
  
  icon={<CurrencyRupeeTwoToneIcon style={{ fill: '#f3b33d' }} />}
  variant='outlined'
/>
     <Typography variant="button"  gutterBottom> 
    S.gst:1.500% + C.gst:1.500%
        </Typography>
  </Grid>
  <Grid item xs={6}>
    <Chip
     color='info'
 label={<Typography variant="button"  gutterBottom> 
         {NumberFormat(Math.round((item.itemWeight * rates) + (Number(item.SalesPrice) * (item.itemWeight * rates)) / 100))}
        </Typography>}
  icon={<CurrencyRupeeTwoToneIcon style={{ fill: '#f3b33d' }} />}
  variant='outlined'
/>

  </Grid>
</Grid>
       
      </CardContent>
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
