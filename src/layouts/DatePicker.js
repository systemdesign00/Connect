import React from 'react'
import  AdapterDateFns  from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import { MobileDatePicker } from '@mui/lab';
import TextField  from '@mui/material/TextField';

export default function DatePicker(props) {

    const { name, label, value, inputFormat, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
           label={label}
            inputFormat={inputFormat}
        
          value={value}
              name={name}
          onChange={date => onChange(convertToDefEventPara(name, date))}
        
        />
       
        
    </LocalizationProvider>
       
    )
}
