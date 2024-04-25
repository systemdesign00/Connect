import React ,{useRef}from 'react'
import OrderedItems from './OrderedItems'
import { UseorderForm } from './useorderForm';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import SearchItem from './SearchItem';
import OrdersForm from './OrdersForm';
import jsPDF from "jspdf";

let today = new Date();
const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const getFreshModelitemObject = () => ({
    id: '',
    orderNumber: generateOrderNumber(),
    customerUID:0,
    ventorName: '',
    mobile: '',
    city:'',
    type:'',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null,
    status:'',
    ventortype:'',
    //discou:'',
    //gCash:'',
    //onlinecash:'',
    //gTotal: 0,
    deletedOrderItemIds: '',
    hireDate:today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear(),
    //hireDate:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
    orderDetails: [],
    //oldorderDetails: [],
    //watageitems:[],
   
})




export default function Mainordersearch() {

    const {
        Order,
        setOrder,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = UseorderForm(getFreshModelitemObject);
   const reportTemplateRef = useRef(null);
 // values.city = searchSelectedCountry &&searchSelectedCountry.city   
const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a3",
      unit: "px"
    });

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      }
    });
  };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <OrdersForm
                    {...{
                        Order,
                        setOrder,
                        errors,
                        setErrors,
                        handleInputChange,
                        resetFormControls
                    }}
                />
            </Grid>

            <Grid item xs={6}>
                <SearchItem
                    {...{
                       Order,
                        setOrder,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                  <Button  onClick={handleGeneratePdf}>
        Generate PDF
      </Button>
                  <div ref={reportTemplateRef}>
              <OrderedItems
                    {...{
                      Order,
                        setOrder,
                    }}
                />
            </div>
            </Grid>
        </Grid>
    )
}