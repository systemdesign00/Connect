import React, { useRef } from "react";
import OrderedItems from "./OrderedItems";
import { UseorderForm } from "./useorderForm";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import SearchItem from "./SearchItem";
import OrdersForm from "./OrdersForm";
import jsPDF from "jspdf";
import Pdf from "react-to-pdf";
import html2pdf from "html2pdf.js";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
let today = new Date();
const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const defaultImageSrc =
  "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
const getFreshModelitemObject = () => ({
  id: "",
  orderNumber: generateOrderNumber(),
  customerUID: 0,
  ventorName: "",
  mobile: "",
  city: "",
  type: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
  status: "",
  ventortype: "",
  //discou:'',
  //gCash:'',
  //onlinecash:'',
  //gTotal: 0,
  deletedOrderItemIds: "",
  hireDate:
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear(),
  //hireDate:new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
  orderDetails: [],
  //oldorderDetails: [],
  //watageitems:[],
});

export default function Mainordersearch() {
  const {
    Order,
    setOrder,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = UseorderForm(getFreshModelitemObject);
  const reportTemplateRef = useRef(null);
  // values.city = searchSelectedCountry &&searchSelectedCountry.city
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    // Adding the fonts
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };
  const theme = React.useMemo(
    () =>
      createTheme({
        /*palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },*/
        palette: {
          primary: {
            main: "#333996",
            light: "#3c44b126",
          },
          secondary: {
            main: "#f83245",
            light: "#f8324526",
          },
          background: {
            //default: "#f4f5fd"
          },
        },
      }),
    [] // [prefersDarkMode]
  );
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <OrdersForm
              {...{
                Order,
                setOrder,
                errors,
                setErrors,
                handleInputChange,
                resetFormControls,
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
            <Button
              onClick={() => {
                html2pdf(reportTemplateRef.current, {
                  margin: 10,
                  filename: `${formattedDate}-${Order.ventorName}.pdf`, // Set the desired filename
                  //filename: 'your_custom_filename.pdf', // Set the desired filename
                  image: { type: "jpeg", quality: 2 },
                  html2canvas: { scale: 2 },
                  jsPDF: {
                    unit: "pt",
                    format: [900, 620],
                    orientation: "portrait",
                  },
                  output: "file", // Specify 'file' to save the PDF to a file
                  save: true,
                  returnPromise: true,
                  //filePath: '/path/to/custom/location/your_custom_filename.pdf', // Specify the desired custom location
                })
                  .then((pdf) => {
                    console.log("PDF generated:", pdf);
                  })
                  .catch((error) => {
                    console.error("Error generating PDF:", error);
                  });
              }}
            >
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
      </ThemeProvider>
    </DashboardLayout>
  );
}
