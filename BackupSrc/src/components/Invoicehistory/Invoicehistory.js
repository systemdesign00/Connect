import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { List, ListItem, ListItemText, Paper, InputBase, IconButton, ListItemSecondaryAction, Container } from '@mui/material';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Grid , Chip ,Badge,TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {NumberFormat} from '../../Services/NumberFormat';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: 'red',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
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
const useStyles = makeStyles(theme => ({
    searchPaper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: useTheme().spacing(1.5),
        flex: 1,
    },
    listRoot: {
        marginTop: useTheme().spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'block',
            color: '#000',
        },
        '& .MuiButtonBase-root': {
            display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

export default function Invoicehistory(props) {

    const { values, setValues } = props;
    //let orderedFoodItems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])
let today = new Date();

const isToday = today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.fullName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                //&& orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        });
        setSearchList(x);
    }, [searchKey])

    

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search food items" />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <Container fixed> 
                {
                    searchList.map((data, idx) => (
                        <Paper key={data.id}

            sx={{
              p: 1,
              margin: 4,
              maxWidth: 'auto',
              flexGrow: 1,
              backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={2}>

              <><Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt={data.fullName} src={data.imageSrc} />
                </ButtonBase>
                <Typography variant="body2" className={classes.ordernumber}>
                  ID: {data.orderDetails.map((step, i) => step.foodItemName)}
                </Typography>
              </Grid><Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div" className={classes.name}>
                        {data.fullName}
                      </Typography>
                      <Typography variant="body2" gutterBottom className={classes.city}>
                        {data.city}
                      </Typography>
                      <Typography variant="body2" gutterBottom className={classes.mobile}>
                        {data.mobile}
                      </Typography>
                    </Grid>
                    <Grid item>

                      {isToday == data.hireDate ?
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                        >
                          <Chip label={data.hireDate} color="error" variant="outlined" />
                        </StyledBadge>
                        : <Chip label={data.hireDate} color="default" variant="filled" />}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Chip label={NumberFormat(Number(data.gCash) + Number(data.onlinecash))} color="success" variant="outlined" />

                  </Grid>

                </Grid></>

            </Grid>
          </Paper>
                       
                    ))
                }
         </Container>
            
        </>
    )
}