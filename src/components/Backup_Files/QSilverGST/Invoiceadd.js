import React, {  useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import incrementString from '../Invoice/incrementString';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card,TextField } from '@mui/material';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import IconButton from '@mui/material/IconButton';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import PaidOutlinedIcon  from '@mui/icons-material/PaidOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import PointOfSaleOutlinedIcon from '@mui/icons-material/PointOfSaleOutlined';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = (props, initialFValues) => {
      const [foodItems, setFoodItems] = useState([]);
      const { values, setValues, setOrderListVisibility,recordForEdit } = props;
      useEffect(() => {

        createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data);
                //setSearchList(res.data);
            })
            .catch(err => console.log(err))


    }, [])


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
            name: foodItem.foodItemName || data.foodItemName,
            qty: foodItem.qty || data.qty,
            price: foodItem.price || data.price,
           // quantity: 1,
            //tax: foodItem.tax || data.tax,
            //foodItemPrice: foodItem.foodItemPrice || data.foodItemPrice,  //data.prices
            //foodItemName: foodItem.foodItemName || data.foodItemName, //data.fullname 
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }
    const resetInputField = () => {
        setData(initialFValues);

    };
    initialFValues = {
        id: '',
        name: '',
        qty: '',
        price: '',
      
    }
    const [data, setData] = useState(initialFValues)
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)


        //console.log(newdata)
    }
    // const [title,setTitle] = useState('');
    //const [titles,setTitles] = useState('');
    const handleChange = (e) => {
        e.preventDefault()
      }
const additems = (e) => {
       addFoodItem(data)
        setOrderListVisibility(false);
        resetInputField()
   
   }

   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const generateIdrNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: generateIdrNumber(),
      name: '',
      qty: 1,
      price: '1',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
   handleChange(event);
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: generateIdrNumber(),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = generateIdrNumber();
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  
  

  const edtiItemHandler = (event) => {
        console.log(event.target.id && event.target.name);
    const editedItem = {
      
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };
const printReceipt = () => {
    window.print();
  }
  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;


  const SaveAsPDFHandler = () => {
    const dom = document.getElementById('print');
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = 'annoymous';
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement('canvas');
          const pageCtx = pageCanvas.getContext('2d');
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = 'white';
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
      };
  return (
    <Card>
     <form
      //className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
    <Box>
      <Grid >
        <Grid item xs={9}>
          

         <Div>{"Invoice"}</Div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
  
        <TextField irequired
        focused
         color="secondary"
               size="small"
           style={{ width: '60%' }}
               label="Current Date"
              //disabled
            value={new Date().toLocaleDateString()}
            //placeholder={new Date().toLocaleDateString()}
             variant="outlined" />
  </Grid>
  <Grid item xs={6}>

    <TextField irequired
               size="small"
               focused
                   color="secondary"
           style={{ width: '60%' }}
            label="Invoice No"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)} variant="outlined" />
                
  </Grid> 
  <Grid item xs={6}>

      <TextField  required
      color="primary"
           size="small"
           focused
           label="Cashier name"
           style={{ width: '60%' }}
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)} variant="outlined" />
  </Grid>
  <Grid item xs={6}>
   
      <TextField required
      color="primary"
      focused
           size="small"
            label="Customer name"
           style={{ width: '60%' }}
           
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)} variant="outlined" />
  </Grid>
          
     <Grid item xs={6}>
   
    
       <TextField  
       label="Tax Price"
           size="small"
           focused
             color="secondary"
           style={{ width: '60%' }}
           type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}/>
  </Grid>
  <Grid item xs={6}>

    <TextField  
    label="Discount Price"
    focused
     color="secondary"
           size="small"
           style={{ width: '60%' }}
            type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}/>
                
  </Grid> 
        
         
        
          
        </Grid>
        
           <TableContainer component={Paper}>
       <Button type="submit" variant="contained" size="small" onClick={additems} >Submit</Button>
 <Button type="submit" variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Table sx={{ minWidth: 950 }} >
      <TableHead>
          <TableRow>
             <TableCell>Item No</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell >Quantity</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Total</TableCell>
            <TableCell >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {items.map((data) => (
               <TableRow
              key={data.id}
             
            >
              <TableCell>{data.id}</TableCell>
                 <TableCell >
                 <TextField
                 InputProps={{
            startAdornment: <InputAdornment position="start"><CategoryOutlinedIcon /></InputAdornment>,
          }}
       
    variant="standard"
  // InputProps={cellData.InputProps}
     //className={cellData.className}
      type="text"
      placeholder="Item-Name"
      //disabled={cellData.disabled}
      name="name"
      id={data.id}
      value={data.name}
    
      onChange={edtiItemHandler}
      required
    />
              </TableCell>
                <TableCell >
                 <TextField
                   InputProps={{
            startAdornment: <InputAdornment position="start"><BalanceOutlinedIcon /></InputAdornment>,
          }}
    variant="standard"
  // InputProps={cellData.InputProps}
     //className={cellData.className}
      type="number"
      placeholder="Quantity"
      //disabled={cellData.disabled}
      name="qty"
      id={data.id}
      value={data.qty}
      onChange={edtiItemHandler}
      required
    />
              </TableCell>
              <TableCell >
                 <TextField
                   InputProps={{
            startAdornment: <InputAdornment position="start"><PaidOutlinedIcon /></InputAdornment>,
          }}
    variant="standard"
  // InputProps={cellData.InputProps}
     //className={cellData.className}
      type="number"
      placeholder="Price"
      //disabled={cellData.disabled}
      name="price"
      id={data.id}
      value={data.price}
      onChange={edtiItemHandler}
      required
    />
    </TableCell>
    <TableCell >
                 <TextField
                   InputProps={{
            startAdornment: <InputAdornment position="start"><PointOfSaleOutlinedIcon /></InputAdornment>,
          }}
    variant="standard"
  // InputProps={cellData.InputProps}
     //className={cellData.className}
      type="number"
      //placeholder="Price"
      disabled
      name="Amount"
      id={data.id}
      value={data.qty * data.price}
      //onChange={edtiItemHandler}
      //required
    />
    </TableCell>
    <TableCell >
       <IconButton  >
     <DeleteSweepOutlinedIcon  color="error" onClick={()=>deleteItemHandler(data.id)} />
       
  
  </IconButton>
    </TableCell>
                </TableRow>
            ))}
            
             <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell >${subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Discount</TableCell>
            <TableCell >${discountRate.toFixed(2)}</TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} >Tax</TableCell>
            <TableCell >${taxRate.toFixed(2)}</TableCell>
            
          </TableRow>
           
          <TableRow>
            <TableCell colSpan={3} >Total</TableCell>
            <TableCell > $
                        {total % 1 === 0
                          ? total
                          : total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="outlined"   onClick={addItemHandler}>Add Item</Button>

      
        
    </TableContainer>
       
        </Grid>
     
         
       <Dialog
        maxWidth={50}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1 className="text-center text-lg font-bold text-gray-900">
                  INVOICE
                </h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div class="print-receipt">
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
         Invoice No:{invoiceNumber}
        </Grid>
        <Grid item xs={6}>
         Date:{today}
        </Grid>
         <Grid item xs={6}>
         Cashier:{cashierName}
        </Grid>
        <Grid item xs={6}>
         Customer:{customerName}
        </Grid>
      </Grid>
      
            
              
             
                 
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell >Qty.</TableCell>
            <TableCell >Price</TableCell>
            <TableCell >Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell >{item.qty}</TableCell>
              <TableCell >  ${Number(item.price).toFixed(2)}</TableCell>
              <TableCell >   ${Number(item.price * item.qty).toFixed(2)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell >${subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Discount</TableCell>
            <TableCell >${discountRate.toFixed(2)}</TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} >Tax</TableCell>
            <TableCell >${taxRate.toFixed(2)}</TableCell>
            
          </TableRow>
            <TableCell rowSpan={3} />
          <TableRow>
            <TableCell colSpan={2} >Total</TableCell>
            <TableCell > $
                        {total % 1 === 0
                          ? total
                          : total.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                  

                 
                
              <div className="mt-4 flex space-x-2 px-4 pb-6" class="hide-on-print">
                 <IconButton color="success" >
          <DownloadingOutlinedIcon   onClick={SaveAsPDFHandler}/>
        </IconButton>
                 <IconButton color="error" >
          <SkipNextOutlinedIcon   onClick={addNextInvoiceHandler}/>
        </IconButton>
        <IconButton color="info" >
          <LocalPrintshopOutlinedIcon   onClick={printReceipt}/>
        </IconButton>
     
              </div>
         </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        
         
        
       
        
        </Grid>
        
    
    </Box>
    </form>
    </Card>
  );
};

export default InvoiceForm;
