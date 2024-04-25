import React from 'react'
import { FormControl, InputLabel, Select as  MuiSelect, MenuItem, FormHelperText } from '@mui/material';

export default function Select(props) {

    const { name, label, value, varient, onChange, options, error = null } = props;

    return (
        <FormControl
        fullWidth
            variant={varient || "outlined"}
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
            fullWidth
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                   
            
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}