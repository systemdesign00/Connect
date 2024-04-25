import React, { useState, useEffect ,useMemo} from 'react'
import { Grid , Paper } from '@mui/material';
import Table from '@mui/material/Table';
import Autocomplete from '@mui/material/Autocomplete';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createAPIEndpoint, ENDPIONTS } from '../api/index'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CardContent from '@mui/material/CardContent';
import {ListSubheader,InputAdornment} from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

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
            //display: 'block',
            //color: '#000',
        },
        '& .MuiButtonBase-root': {
           // display: 'none'
        },
        '& .MuiButtonBase-root:hover': {
            //backgroundColor: 'transparent'
        }
    }
}))

export default function Equalizer() {


   
    
 
  
const wordify = (num) => {
   const single = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
   const double = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
   const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
   const formatTenth = (digit, prev) => {
      return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit])
   };
   const formatOther = (digit, next, denom) => {
      return (0 != digit && 1 != next ? " " + single[digit] : "") + (0 != next || digit > 0 ? " " + denom : "")
   };
   let res = "";
   let index = 0;
   let digit = 0;
   let next = 0;
   let words = [];
   if (num += "", isNaN(parseInt(num))){
      res = "";
   }
   else if (parseInt(num) > 0 && num.length <= 10) {
      for (index = num.length - 1; index >= 0; index--) switch (digit = num[index] - 0, next = index > 0 ? num[index - 1] - 0 : 0, num.length - index - 1) {
         case 0:
            words.push(formatOther(digit, next, ""));
         break;
         case 1:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 2:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "") : "");
            break;
         case 3:
            words.push(formatOther(digit, next, "Thousand"));
            break;
         case 4:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 5:
            words.push(formatOther(digit, next, "Lakh"));
            break;
         case 6:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 7:
            words.push(formatOther(digit, next, "Crore"));
            break;
         case 8:
            words.push(formatTenth(digit, num[index + 1]));
            break;
         case 9:
            words.push(0 != digit ? " " + single[digit] + " Hundred" + (0 != num[index + 1] || 0 != num[index + 2] ? " and" : " Crore") : "")
      };
      res = words.reverse().join("")
   } else res = "";
   return res
};
const [display, setdisplay] = useState([]);


     useEffect(() => {
        createAPIEndpoint(ENDPIONTS.PRICE).fetchAll()
            .then(res => {
              
                setdisplay(res.data)
            })
            .catch(err => console.log(err))
            
    }, [])
const rates =   display.map(item => (item.rate))


    const [money, setmoney] = useState('');
    const [weight, setweight] = useState('');
      
   const [permoney, setpermoney] = useState('');
    const [perweight, setperweight] = useState('');
      
    const total = ((money / weight) - rates ) 
    const overtotal = ((money / weight) - rates ); 

    const pertotal = ((rates + permoney)  * perweight)
    const perovertotal = ((Number(rates) + Number(permoney))  * Number(perweight))
    
    return (
        <>
<TableContainer component={Paper}>
      <Table style={{ Width: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
            <TableCell >Cash or PerGram</TableCell>
         <TableCell >Weight</TableCell>
            <TableCell>Total or Cash</TableCell>
          </TableRow>
        </TableHead>
          
        <TableBody>
             
           <TableRow>
            <TableCell>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Cash"
          name="foodItemPrice" id="foodItemPrice" value={money} onChange={(e) => setmoney(e.target.value)} />
 </TableCell>
        <TableCell>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Weight" 
         name="tax" id="tax" value={weight }  onChange={(e) => setweight(e.target.value)} />
  </TableCell>
 <TableCell>
     <TextField 
      inputProps={{ readOnly: true }}
     focused size="small"   style = {{width: 100}} label="Total" name="total" id="total" value={Math.round(overtotal)} />
            </TableCell> 
         </TableRow>


         <TableRow>
            <TableCell>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Cash"
          name="foodItemPrice" id="foodItemPrice" value={permoney} onChange={(e) => setpermoney(e.target.value)} />
 </TableCell>
        <TableCell>
          <TextField focused size="small" style = {{width: 100}} inputProps={{ inputMode: 'numeric' }} label="Weight" 
         name="tax" id="tax" value={perweight }  onChange={(e) => setperweight(e.target.value)} />
  </TableCell>
 <TableCell>
     <TextField 
      inputProps={{ readOnly: true }}
     focused size="small"   style = {{width: 100}} label="Total" name="total" id="total" value={Math.round(Number(perovertotal))} />
            </TableCell> 
         </TableRow>

        </TableBody>
 
      </Table>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
  <Grid item xs={6}>
      <Div>{"Item Name : "}{}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Grant Total: ₹ "}{Math.round(total)}</Div>
  </Grid>
  <Grid item xs={6}>
       <Div>{"Weight : "}{weight}</Div>
        <Div>{"Rate : "}{rates}</Div>
  </Grid>
  <Grid item xs={6}>
      <Div>{"Cash : "}{money}</Div>
      <Div>{"Rupees in Words : "}{wordify(Math.round(overtotal))}{" /-"}</Div>
  </Grid>
</Grid>
  
    </TableContainer>

        </>
    )
}
 