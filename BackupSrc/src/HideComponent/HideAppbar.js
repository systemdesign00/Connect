import React,{useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'

const HideAppbar = ({children}) =>{
const location = useLocation();
const [currPath, setCurrPath] = useState(false)
const [currPathR, setCurrPathR] = useState(false)

useEffect(() => {
    if(location.pathname === '/'){
        setCurrPath(false)
    }else{
        setCurrPath(true)
    }
    if(location.pathname === '/register'){
        setCurrPathR(false)
    }else{
        setCurrPathR(true)
    }
    console.log("location",location)
},[location])
    return(
        <div>
            {currPath && currPathR && children}
        
        </div>
    )
}

export default HideAppbar

