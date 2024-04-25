import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import * as userService from "../../../Services/userService";

//const newval = userService.initialFValuess
export function useForm(initialsilveritems, validateOnChange = false, validate) {


 const [ values, setValues]=useState(userService.initialsilveritems)

    const [errors, setErrors] = useState({});

     const handleChange=e=>{
    const {name, value}=e.target;
    setValues(prevState=>({
      ...prevState,
      [name]: value
    }))
  if (validateOnChange)
            validate({ [name]: value })
  }
  

    const resetForm = () => {
        setValues(userService.initialsilveritems);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: useTheme().spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}