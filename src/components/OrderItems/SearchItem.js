import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { List, ListItem, ListItemText, Paper, Grid,InputBase, IconButton, ListItemAvatar,Avatar,ListItemSecondaryAction } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/material/styles';
const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;

  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    
    transform: scale(2.0);
  }
  `}`;
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
        //maxHeight: 450,
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

export default function SearchItem(props) {

    const { Order, setOrder } = props;
    let orderedFoodItems = Order.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ADDITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                setSearchList(res.data);
            })
            .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        let x = [...foodItems];
        x = x.filter(y => {
            return y.joins.toLowerCase().includes(searchKey.toLocaleLowerCase())
                && orderedFoodItems.every(item => item.orderNumber != y.orderNumber)
        });
        setSearchList(x);
    }, [searchKey, orderedFoodItems])

    const addFoodItem = foodItem => {
        let x = {
            orderMasterId: Order.orderMasterId,
            orderDetailId: 0,
            orderNumber: foodItem.orderNumber,
            itemName: foodItem.itemName,
            joins:foodItem.joins,
            itemQuantity: 1,
            itemfiness:foodItem.itemfiness,
            itemWeight: foodItem.itemWeight,
            itemType: foodItem.itemType,
            imageSrc:foodItem.imageSrc,
            isdelivered:1
        }
        setOrder({
            ...Order,
            orderDetails: [...Order.orderDetails, x]
        })
    }

    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search Items" />
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
            </Paper>
            <List className={classes.listRoot}>
                {
                    searchList.map((item, idx) => (
                        <ListItem
                            key={idx}
                            onClick={e => addFoodItem(item)}>
                                 
                                <ListItemAvatar>
         <StyledAvatar src={item.imageSrc} >
                   
                  </StyledAvatar>
        </ListItemAvatar>
                            <ListItemText
                                primary={<Grid container spacing={3}>
  <Grid item xs>
    {item.itemName}
  </Grid>
  <Grid item xs>
   {item.itemType}
  </Grid>
  <Grid item xs>
   {item.itemWeight}
  </Grid>
</Grid>}
                                secondary={item.itemfiness } />
                            <ListItemSecondaryAction>
                                <IconButton onClick={e => addFoodItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}

