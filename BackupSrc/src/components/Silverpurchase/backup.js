  
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