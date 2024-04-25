  
              {
               orderedratecutitems.map((dataaratecut,idx) => (
            <TableRow
              key={idx}   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                  <Div >{new Date(dataaratecut.salesdate).toLocaleDateString()}</Div>
              </TableCell>
              <TableCell>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemName" name="foodItemName" id="foodItemName" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemName} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.foodItemName}</Div>
            }
                                        </TableCell>
                                         <TableCell><Div >-</Div></TableCell>
                                           <TableCell><Div >-</Div></TableCell>
                                             <TableCell><Div >-</Div></TableCell>
                                              <TableCell><Div >-</Div></TableCell>
                                               <TableCell>
                                                {
                                                   isEditingratecut === idx ?  <Div >{((dataaratecut.foodItemPrice * 1) / dataratecut.rate).toFixed(3)}</Div> :
                                                    <Div >{dataaratecut.tax}</Div>
                                                }
                                               </TableCell>
                                      {/*  <TableCell >
                                            <>
{
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField 
          size="small"
          variant="standard"
          InputProps={{
       startAdornment:
            <InputAdornment position="start">
              <PaidOutlinedIcon />
            </InputAdornment>
          }}
                inputProps={{ inputMode: 'numeric' }} label="foodItemPrice" 
                name="foodItemPrice" id="foodItemPrice" value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div > {dataafancy.foodItemPrice  }</Div>
            }</>
                                        </TableCell>
                                        
                              
          
                                          
                            
            <TableCell>
                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataafancy.rate}</Div>
            }
                                        </TableCell> */}
                <TableCell>

                 {
                isEditingratecut === idx ? 
                   <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="rate" id="rate" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.rate} onChange={(e) => handleratecut(e)} />
                </form>
                : <Div >{dataaratecut.rate}</Div>
            }
                                        </TableCell>

              
                   <TableCell>
                { 

      
             isEditingratecut ===idx ? newkey === data.type ?  <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="foodItemPrice" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form> : 
                 <form onSubmit={handleChange} className={classes.root} noValidate autoComplete="off">
         <TextField label="Rate" name="foodItemPrice" id="foodItemPrice" 
              size="small"
          variant="standard"
              InputProps={{ startAdornment:
            <InputAdornment position="start">
              <CategoryOutlinedIcon />
            </InputAdornment>
          }}
             value={dataratecut.foodItemPrice} onChange={(e) => handleratecut(e)} />
                </form>
             :   <Div > {Math.round(dataaratecut.subtotal)}</Div>
                                         }
                                       </TableCell>
          
               <TableCell >
                                          
                                           {
                                             isEditingratecut === idx ? 
                                           
                                          <ThemeProvider theme={blueTheme}>
                                               
                                              
                                                  <Button className={`${classes.root}`} style={{ backgroundColor: "#ABD1FF"}} 
                                               onClick={(e)=>updateratecut(idx)}>
                                                
                                                <SaveAsOutlinedIcon  fontSize="medium"/>
                                                </Button>
                                                
                                                
                                          
                                            </ThemeProvider>
                :
                                          <ThemeProvider theme={greenTheme}>
                                                <Button className={`${classes.root}`} style={{ backgroundColor: '#cdffcd'}} 
                                         onClick={()=>{
                                              setCurrentIdratecut(dataaratecut.id) 
                                              setIsEditingratecut(idx,true)
                                         }} >
                                                 
                                                    <EditLocationOutlinedIcon  fontSize="medium" />
                                                </Button>
                                                
                                            </ThemeProvider>
            }
              <ThemeProvider theme={redTheme}>
                                                <Button className={`${classes.root}`} style={{  backgroundColor: '#ffbfbf'}} 
                                                onClick={e => removeFoodItemratecut(idx, dataaratecut.orderDetailId)}
                                                > <DeleteSweepOutlinedIcon  fontSize="medium" />
                                                </Button>
                                            </ThemeProvider>
                                        </TableCell>
            </TableRow>
          ))}


          /*

  <Stack
   direction={{ xs: 'column', sm: 'row' }}
   spacing={{ xs: 1, sm: 2, md: 4 }}
>

<FormControl  sx={{ m: 3 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Search Ventors</InputLabel>
              <OutlinedInput
             sx={{width:'100%'}}
                id="outlined-adornment-amount"
                onChange={handleSearchcustomer}
                startAdornment={<InputAdornment position="start"><SearchIcon color='info' /></InputAdornment>}
             label="Search Customer"
              />
    </FormControl>
    <FormControl  sx={{ m: 3 }}>
            <IconButton  onClick={openEqualizepg}>
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/calendar.png" alt="calendar"/>
    </IconButton>
     </FormControl> 

     <FormControl  sx={{ m: 3 }}>
    <Chip icon={<DeleteOutlineTwoToneIcon />}  onClick={handleDeleteSelected} 
    label=  {deleting ? 'Deleting...' : 'Delete Selected'} variant="outlined"  disabled={deleting}/>
    
    </FormControl>
</Stack>

          
            <TableContainer component={Paper} sx={{marginRight:0,marginLeft:0 }}>
                <Table className={classes.table}>
                    {/*  <TblHead />*/}
                   <TableHead>
                        <TableRow>
                        <TableCell><Checkbox {...label} onClick={handleSelectAll} disabled={deleting} /> </TableCell>
                            <TableCell >Bill No</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>City/Town</TableCell>
                            <TableCell>Mobile</TableCell>
                              <TableCell>Date</TableCell>
                          <TableCell>Balance</TableCell> 
                          <TableCell>Cash Balance</TableCell> 
                            <TableCell></TableCell>
                        </TableRow>
    </TableHead> 
                    <TableBody>
                        {
                             datas().map(item => (
                                <TableRow key={item.id}>
                                   <Snackbar
           
           message="Copied"
           anchorOrigin={{ vertical: "top", horizontal: "center" }}
           autoHideDuration={2000}
           onClose={() => setOpens(false)}
           open={opens}
         >
            <Alert  severity="info"  variant="filled">
             Copied! Closing Balance:{(item.Purebalance)}G
           </Alert></Snackbar>  
                                    <TableCell
                                      >
                                      <Box fontWeight="fontWeightBold" fontSize={16}>
                                      <Checkbox {...label}  size="small" 
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}/>
                                     
      </Box>   
                                      {/*  <Avatar  src={item.imageSrc} sx={{ bgcolor: 'white'}}>
                            <Box fontWeight="fontWeightBold" fontFamily="sans-serif" color='#007FFF'>
                               {item.fullName.charAt(0)}
                                </Box>
                                         
                            </Avatar> */}
                                    </TableCell>
                                    <TableCell>
                                          <Box fontWeight="fontWeightBold" fontSize={16}>
        {item.id}
      </Box>   </TableCell>
                                    <TableCell  onClick={e => showForUpdate(item.id)}>{item.shopName}</TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.city}
                                    </TableCell>
                                    <TableCell
                                        onClick={e => showForUpdate(item.id)}>
                                        {item.mobile}
                                    </TableCell >
                                     {
               new Date().toLocaleDateString() == new Date(item.hireDate).toLocaleDateString() ? 
                <TableCell onClick={e => showForUpdate(item.id)}>
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Chip label={new Date(item.hireDate).toLocaleDateString()} onClick={e => showForUpdate(item.id)} color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell   onClick={e => showForUpdate(item.id)}> 
        {new Date(item.hireDate).toLocaleDateString()}
          </TableCell>
      
              }
             
                                    <TableCell >
                                         {
               item.Purebalance > 0 ? 
                <TableCell  >
                  <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        onClick={() => copyToClipBoard(item.Purebalance)}
      >
        <Chip onClick={() => copyToClipBoard(item.Purebalance)} label={item.Purebalance+"G"}  color="error" variant="outlined"/>
      </StyledBadge>
         
        </TableCell>
     
       : 
          <TableCell > 
          <Chip  onClick={() => copyToClipBoard(item.Purebalance)} label={item.Purebalance+"G"}  color="info" variant="outlined" 
          />
          </TableCell>
      
              }
                                   
            </TableCell> 
                                    <TableCell>

                                           {
                item.Purebalance > 0 ? 
                <TableCell  >
                  
         
        </TableCell>
     
       : 
          <TableCell  > 
        <DeleteOutlineTwoToneIcon
                                            sx={{color:'red'}}
                                            //onClick={e => deleteOrder(item.id)} 
                                          onClick={() => {
                               //deleteOrder(item.id)
                                audio.play();
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    //avatarimage:item.imageSrc,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                  })
                                            }} />
          </TableCell>
      
              }
                                        

                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>

                </Table>
                  <TblPagination />
            </TableContainer>
          */