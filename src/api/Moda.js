import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button,InputAdornment,TextField,Grid} from '@mui/material';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
const baseUrl='https://serdb.onrender.com/api/Gol/'  
const baseUrls='https://serdb.onrender.com/api/Silver/'
const purebaseUrls='https://serdb.onrender.com/api/Pure/'
const baseUrlold='https://serdb.onrender.com/api/old_silver/'
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: useTheme().palette.background.paper,
    border: '2px solid #000',
    boxShadow: useTheme().shadows[5],
    padding: useTheme().spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function Moda() {
const styles= useStyles();
  const [data, setData]=useState([]);
  const [puredata, setpureData]=useState([]);
    const [datasilver, setDatasilver]=useState([]);
     const [datasilverold, setDatasilverold]=useState([]);
  const [modalInsert, setmodalInsert]=useState(false);
  const [modelEditpure, setmodelEditpure]=useState(false);
  const [modelEdit, setmodelEdit]=useState(false);
  const [modelDelete, setmodelDelete]=useState(false);
    const [modelEditsilver, setmodelEditsilver]=useState(false);
const [modelEditsilverold, setmodelEditsilverold]=useState(false);

  const [goldrate, setgoldrate]=useState({
    name: '',
    rate:'',
   
  })
const [puregold, setpuregold]=useState({
    name: '',
    rate:'',
   
  })

   const [silver, setSilver]=useState({
    name: '',
    rate:'',
   })

   const [silverold, setSilverold]=useState({
    name: '',
    rate:'',
   
  })
  const handleChange=e=>{
    const {name, value}=e.target;
    setgoldrate(prevState=>({
      ...prevState,
      [name]: value
    }))
   // console.log(goldrate);
  }
   const handleChangepure=e=>{
    const {name, value}=e.target;
    setpuregold(prevState=>({
      ...prevState,
      [name]: value
    }))
    //console.log(goldrate);
  }
const handleChangesilver=e=>{
    const {name, value}=e.target;
    setSilver(prevState=>({
      ...prevState,
      [name]: value
    }))
    //console.log(silver);
  }

  const handleChangesilverold=e=>{
    const {name, value}=e.target;
    setSilverold(prevState=>({
      ...prevState,
      [name]: value
    }))
    //console.log(silver);
  }


  const fetchdata=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    })
  }

  const pureget=async()=>{
    await axios.get(purebaseUrls)
    .then(response=>{
      setpureData(response.data);
    })
  }
   const fetchdatasilver=async()=>{
    await axios.get(baseUrls)
    .then(response=>{
      setDatasilver(response.data);
    })
  }

    const fetchdatasilverold=async()=>{
    await axios.get(baseUrlold)
    .then(response=>{
      setDatasilverold(response.data);
    })
  }
  
  const peticionPost=async()=>{
    await axios.post(baseUrl, goldrate)
    .then(response=>{
      setData(data.concat(response.data))
      openClosemodelInsert()
    })
  }

  const peticionPostsilver=async()=>{
    await axios.post(baseUrls, silver)
    .then(response=>{
      setDatasilver(datasilver.concat(response.data))
      openClosemodelInsert()
    })
  }

  const updatedata=async()=>{
    await axios.put(baseUrl+goldrate.id, goldrate)
    .then(response=>{
      var newData=data;
      newData.map(console=>{
        if(goldrate.id===console.id){
          console.name=goldrate.name;
          console.rate=goldrate.rate;
         
        }
      })
      setData(newData);
      openClosemodelEdit();
    })
  }

  const pureput=async()=>{
    await axios.put(purebaseUrls+puregold.id, puregold)
    .then(response=>{
      var newData=puredata;
      newData.map(console=>{
        if(puregold.id===console.id){
          console.name=puregold.name;
          console.rate=puregold.rate;
         
        }
      })
      setpureData(newData);
      openClosemodelInsertpure();
    })
  }

  const updatedatasilver=async()=>{
    await axios.put(baseUrls+silver.id, silver)
    .then(response=>{
      var newData=datasilver;
      newData.map(console=>{
        if(silver.id===console.id){
          console.name=silver.name;
          console.rate=silver.rate;
         
        }
      })
      setDatasilver(newData);
      openClosemodelEditsilver();
    })
  }

   const updatedatasilverold=async()=>{
    await axios.put(baseUrlold+silverold.id, silverold)
    .then(response=>{
      var newData=datasilverold;
      newData.map(console=>{
        if(silverold.id===console.id){
          console.name=silverold.name;
          console.rate=silverold.rate;
         
        }
      })
      setDatasilverold(newData);
      openClosemodelEditsilverold();
    })
  }

  const deleteData=async()=>{
    await axios.delete(baseUrl+goldrate.id)
    .then(response=>{
      setData(data.filter(console=>console.id!==goldrate.id));
      openClosemodelDelete();
    })
  }

  const openClosemodelInsert=()=>{
    setmodalInsert(!modalInsert);
  }
const openClosemodelInsertpure=()=>{
    setmodelEditpure(!modelEditpure);
  }

  const openClosemodelEdit=()=>{
    setmodelEdit(!modelEdit);
  }
const openClosemodelEditsilver=()=>{
    setmodelEditsilver(!modelEditsilver);
  }
const openClosemodelEditsilverold=()=>{
    setmodelEditsilverold(!modelEditsilverold);
  }
  const openClosemodelDelete=()=>{
    setmodelDelete(!modelDelete);
  }

  const selectconsole=(console, conditioncase)=>{
    setgoldrate(console);
    (conditioncase==='ToEdit')?openClosemodelEdit():openClosemodelDelete()
  }


  const selectpure=(console, conditioncase)=>{
    setpuregold(console);
    (conditioncase==='ToEdit')?openClosemodelInsertpure():openClosemodelDelete()
  }

  const selectconsolesilver=(console, conditioncase)=>{
    setSilver(console);
    (conditioncase==='ToEdit')?openClosemodelEditsilver():openClosemodelDelete()
  }

   const selectconsolesilverold=(console, conditioncase)=>{
    setSilverold(console);
    (conditioncase==='ToEdit')?openClosemodelEditsilverold():openClosemodelDelete()
  }
  useEffect(async()=>{
    await fetchdata();
    await pureget();
    await fetchdatasilver();
     await fetchdatasilverold();
  },[])



  const EditWidget=(
    <div className={styles.modal}>
      <h3>Update Gold Rate</h3>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
    <TextField disabled name="name" className={styles.inputMaterial} label="Name" onChange={handleChange} 
     InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceCheckOutlinedIcon />
            </InputAdornment>
          ),
        }}
    value={goldrate && goldrate.name}/>
  </Grid>
  <Grid item xs={6}>
        <TextField name="rate" className={styles.inputMaterial} label="Rate" onChange={handleChange}
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={goldrate && goldrate.rate}/>
  
  </Grid>
  <Grid item xs={6}>
    
  </Grid>
  <Grid item xs={6}>
   
 <Button variant="outlined" size="small" color="primary" onClick={()=>updatedata()}>Update</Button>
 <Button variant="outlined" size="small" color="error"  onClick={()=>openClosemodelEdit()}>Cancel</Button>
  </Grid>
</Grid>
  
    </div>
  )

  const EditWidgetpure=(
    <div className={styles.modal}>
      <h3>Update Pure_Gold  Rate</h3>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
    <TextField disabled name="name" className={styles.inputMaterial} label="Name" onChange={handleChangepure} 
     InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceCheckOutlinedIcon />
            </InputAdornment>
          ),
        }}
    value={puregold && puregold.name}/>
  </Grid>
  <Grid item xs={6}>
        <TextField name="rate" className={styles.inputMaterial} label="Rate" onChange={handleChangepure}
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={puregold && puregold.rate}/>
  
  </Grid>
  <Grid item xs={6}>
    
  </Grid>
  <Grid item xs={6}>
   
 <Button variant="outlined" size="small" color="primary" onClick={()=>pureput()}>Update</Button>
 <Button variant="outlined" size="small" color="error"  onClick={()=>openClosemodelInsertpure()}>Cancel</Button>
  </Grid>
</Grid>
  
    </div>
  )

  const EditWidgetsilver=(
    <div className={styles.modal}>
      <h3>Update Silver Rate</h3>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
     <TextField disabled name="name" className={styles.inputMaterial} label="Name" onChange={handleChangesilver} 
      InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceCheckOutlinedIcon/>
            </InputAdornment>
          ),
        }}
     value={silver && silver.name}/>
  </Grid>
  <Grid item xs={6}>
        <TextField name="rate" className={styles.inputMaterial} label="Rate" onChange={handleChangesilver} 
         InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeOutlinedIcon />
            </InputAdornment>
          ),
        }}
        value={silver && silver.rate}/>
  
  </Grid>
  <Grid item xs={6}>
    
  </Grid>
  <Grid item xs={6}>
   
 <Button variant="outlined"  size="small" color="primary" onClick={()=>updatedatasilver()}>Update</Button>
  <Button variant="outlined" size="small" color="error"  onClick={()=>openClosemodelEditsilver()}>Cancel</Button>
  </Grid>
</Grid>
  
    </div>
  )
  const RemoveWidget=(
    <div className={styles.modal}>
      <p>Are You Sure to Delete ?<b>{goldrate && goldrate.name}</b> ? </p>
      <div align="right">
        <Button color="secondary" size="small" onClick={()=>deleteData()} >Sí</Button>
        <Button size="small" onClick={()=>openClosemodelDelete()}>No</Button>

      </div>

    </div>
  )

  const EditWidgetsilverold=(
    <div className={styles.modal}>
      <h3>Update Pure_Silver Rate</h3>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  <Grid item xs={6}>
       <TextField disabled name="name" className={styles.inputMaterial} label="Name" onChange={handleChangesilverold} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PriceCheckOutlinedIcon/>
            </InputAdornment>
          ),
        }}
       value={silverold && silverold.name}/>
  </Grid>
  <Grid item xs={6}>
          <TextField name="rate" className={styles.inputMaterial} label="Rate" onChange={handleChangesilverold} 
           InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeOutlinedIcon />
            </InputAdornment>
          ),
        }}
          value={silverold && silverold.rate}/>
  
  </Grid>
  <Grid item xs={6}>
    
  </Grid>
  <Grid item xs={6} rowSpacing={1}>
 <Button  variant="outlined" size="small" color="primary" onClick={()=>updatedatasilverold()}>Update</Button>
  <Button variant="outlined" size="small" color="error" onClick={()=>openClosemodelEditsilverold()}>Cancel</Button>
  </Grid>
</Grid>
   </div>
  )
const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
       palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
      
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      //default: "#f4f5fd"
    },
  },
      }),
    [], // [prefersDarkMode]
  );

  return (
   <>
    <ThemeProvider theme={theme} >
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Icon</TableCell>
             <TableCell>Name</TableCell>
             <TableCell>Rate</TableCell>
           <TableCell>Actions</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           
           {data.map(console=>(
             <TableRow key={console.id}>
               <TableCell>{/*<DiamondOutlinedIcon style={{ color: "#D4AF37" }} />*/
               <img src="https://img.icons8.com/external-nawicon-flat-nawicon/30/000000/external-gold-finance-nawicon-flat-nawicon.png"/>
               }</TableCell>
               <TableCell>{console.name}</TableCell>
               <TableCell>{console.rate}</TableCell>
               
               <TableCell>
                 <SaveIcon className={styles.iconos} onClick={()=>selectconsole(console, 'ToEdit')}/>
               
                 </TableCell>
             </TableRow>
           ))}
              {puredata.map(console=>(
             <TableRow >
                 <TableCell>{/*<DiamondOutlinedIcon style={{ color: "#D4AF37" }}/>*/
                 <img src="https://img.icons8.com/plasticine/30/000000/gold-bars.png"/>
                 }</TableCell>
              <TableCell>{console.name}</TableCell>
               <TableCell>{console.rate }</TableCell>
               
               <TableCell>
                 <SaveIcon className={styles.iconos} onClick={()=>selectpure(console, 'ToEdit')}/>
               
                 </TableCell>
             </TableRow>
           ))}
           {datasilver.map(console=>(
             <TableRow key={console.id}>
                 <TableCell>{/*<ModeStandbyOutlinedIcon style={{ color: "#71706E" }}/>*/
                 <img src="https://img.icons8.com/color/30/000000/silver-bars.png"/>
                 }</TableCell>
               <TableCell>{console.name}</TableCell>
               <TableCell>{console.rate}</TableCell>
               
               <TableCell>
                 <SaveIcon className={styles.iconos} onClick={()=>selectconsolesilver(console, 'ToEdit')}/>
                
                 </TableCell>
             </TableRow>
           ))}

             {datasilverold.map(console=>(
             <TableRow key={console.id}>
                 <TableCell>{/*<ModeStandbyOutlinedIcon style={{ color: "#71706E" }}/>*/
                 <img src="https://img.icons8.com/color/30/000000/silver-ore.png"/>
                 }</TableCell>
               <TableCell>{console.name}</TableCell>
               <TableCell>{console.rate}</TableCell>
               
               <TableCell>
                 <SaveIcon className={styles.iconos} onClick={()=>selectconsolesilverold(console, 'ToEdit')}/>
              
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>

     <Modal hideBackdrop sx={{bottom:50}}
     open={modelEdit}
     onClose={openClosemodelEdit}>
        {EditWidget}
     </Modal>
     
   <Modal hideBackdrop sx={{bottom:50}}
     open={modelEditsilver}
     onClose={openClosemodelEditsilver}>
        {EditWidgetsilver}
     </Modal>
  <Modal hideBackdrop sx={{bottom:50}}
     open={modelEditsilverold}
     onClose={openClosemodelEditsilverold}>
        {EditWidgetsilverold}
     </Modal>

  <Modal hideBackdrop sx={{bottom:50}}
     open={modelDelete}
     onClose={openClosemodelDelete}>
        {RemoveWidget}
     </Modal>
  <Modal hideBackdrop sx={{bottom:50}}
     open={modelEditpure}
     onClose={openClosemodelInsertpure}>
        {EditWidgetpure}
     </Modal>
     </ThemeProvider>
</>
  );
}

export default Moda;