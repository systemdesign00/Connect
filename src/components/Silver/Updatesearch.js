import React, { useState, useEffect } from 'react'
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Grid from '@mui/material/Grid';
//import IconButton from '@mui/material/IconButton';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
//import ListItemText from '@mui/material/ListItemText';
//import PlusOneIcon from '@mui/icons-material/PlusOne';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//import CustomizedInputBase from '../../api/Search';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: useTheme().spacing(1)
        }
    },
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

export default function Updatesearch(props, initialFValues) {

    const { values, setValues, setOrderListVisibility,recordForEdit } = props;
    //let orderedFoodItems = values.orderDetails;

    const [foodItems, setFoodItems] = useState([]);
    //const [searchList, setSearchList] = useState([]);
    //const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {

        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                //setSearchList(res.data);
            })
            .catch(err => console.log(err))


    }, [])

/*  */
useEffect(() => {
        if (recordForEdit != null)
            setData({
                ...recordForEdit,
                
            })
    }, [recordForEdit])
    /* useEffect(() => {
         let x = [...foodItems];
         x = x.filter(y => {
             return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                // && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
         });
         setSearchList(x);
     }, [searchKey, orderedFoodItems]) */ // [searchKey, orderedFoodItems]
    //const tree= values.small
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
    const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            foodItemId: foodItem.id || generateOrderNumber(),
            quantity: 1,
            tax: foodItem.tax,
            foodItemPrice: foodItem.foodItemPrice ,  //data.prices
            foodItemName: foodItem.foodItemName , //data.fullname 
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
        setOrderListVisibility(false);
        resetInputField()
    }
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        foodItemId: '',
        foodItemName: '',
        foodItemPrice: '',
        tax: ''
    }
    const [foodItem, setData] = useState(initialFValues)
    function handle(e) {
        const newdata = { ...foodItem }
        newdata[e.target.id] = e.target.value
        setData(newdata)


        //console.log(newdata)
    }
    // const [title,setTitle] = useState('');
    //const [titles,setTitles] = useState('');
    const handleChange = (e) => {
        e.preventDefault()
       
       
    }


    return (
        <>


           


            { /*
            <Paper className={classes.searchPaper}>
                
              <InputBase
                    className={classes.searchInput}
                    // value={searchKey}
                    // onChange={e => setSearchKey(e.target.value)}
                    placeholder="Search food items" />
                <IconButton>
                    <SearchTwoToneIcon />
               </IconButton> 
            </Paper>
            */}


           <Grid container spacing={0.5} >

  <Grid xs={2}>

                <TextField label="foodItemName" name="foodItemName" id="foodItemName" value={foodItem.foodItemName} onChange={(e) => handle(e)} />
        </Grid>
          <Grid xs={2}>
                <TextField 
       
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" value={foodItem.foodItemPrice} onChange={(e) => handle(e)} />
               </Grid>
              <Grid xs={2}>
                <TextField inputProps={{ inputMode: 'numeric' }} label="tax" name="tax" id="tax" value={foodItem.tax} onChange={(e) => handle(e)} />
        </Grid>
           
      
            <Grid xs={1}>
                <Button type="submit" variant="contained" size="small" onClick={e => addFoodItem(foodItem)} >Submit</Button>
         </Grid>
          <Grid  >
                  <Button  variant="contained" size="small" onClick={ resetInputField} >Reset</Button>
                   
</Grid>
          

    
 
</Grid>
    
            
        

            {/*
                <List className={classes.listRoot}>
                    {
                        foodItems.map((item, idx) => (                      //searchList=foodItems
                            <ListItem
                                key={idx}
                                onClick={e => addFoodItem(item)}>

                                <LabelImportant />

                                <ListItemText
                                    primary={item.foodItemName}
                                    secondary={'$' + item.price}

                                />
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

                */}
        </>
    )
}
