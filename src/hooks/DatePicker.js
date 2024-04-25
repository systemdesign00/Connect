import React from 'react'
import TextField from '@mui/material/TextField';
//import  AdapterDateFns  from '@mui/lab/AdapterDateFns';
//import { LocalizationProvider } from '@mui/lab';
//import { MobileDatePicker } from '@mui/lab';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
export default function Testdate(props) {

    const { name, label, value, onChange ,inputFormat,orientation} = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (

         <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
           label={label}
            inputFormat={inputFormat}
        orientation={orientation}
          value={value}
              name={name}
          onChange={date => onChange(convertToDefEventPara(name, date))}
           renderInput={(params) => <TextField {...params} fullWidth  size="small"/>}
        />
       
       
    
    </LocalizationProvider>
    
    )
}