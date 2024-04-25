import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
const currentDate = new Date();

// Format the date to "day, month, year"
const formattedDate = currentDate.toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const headCellsuser = [
  { id: "imageSrc", label: "Image" },
  { id: "id", label: "User" },
  { id: "fullName", label: "Name" },
  { id: "mobile", label: "Mobile" },
  { id: "city", label: "City" },
  { id: "status", label: "Email" },

  { id: "actions", label: "Actions", disableSorting: true },
];
export const headCells = [
  { id: "imageSrc", label: "Customer Image" },
  { id: "id", label: "Customer ID" },
  { id: "fullName", label: "Customer Name" },
  { id: "mobile", label: "Mobile Number " },
  { id: "city", label: "City" },
  { id: "status", label: "Aadhaar Number" },
  { id: "rating", label: "Rating" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsventors = [
  { id: "imageSrc", label: "Ventor Image" },
  { id: "id", label: "Ventor ID" },
  { id: "ventorName", label: "Ventor Name" },
  { id: "mobile", label: "Mobile Number " },
  { id: "city", label: "City" },
  { id: "status", label: "Status" },
  { id: "type", label: "Type" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsitem = [
  //{ id: "imageSrc", label: "ITEM ID" },
  //{id:'id',label:'Item Code'},
  { id: "hireDate", label: "DATE" },
  { id: "HUID", label: "HUID" },
  { id: "itemname", label: "Item Name" },
  { id: "itemType", label: "Item Type " },
  { id: "itemWeight", label: "Item Weight " },
  // { id: 'itemPrice', label: 'Item Price' },
  { id: "Finess", label: "Finess" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellssilveritemocc = [
  { id: "itemName", label: "Item Name" },
  { id: "", label: "" },
  { id: "occurrence", label: "Occurance" },
  { id: "itemWeight", label: "Net Weight" },
];
export const headCellssilveritem = [
  { id: "imageSrc", label: "ITEM ID" },
  //{id:'id',label:'Item Code'},
  { id: "hireDate", label: "DATE" },
  { id: "HUID", label: "HUID" },
  { id: "itemname", label: "Item Name" },
  { id: "itemType", label: "Item Type " },
  { id: "itemSize", label: "Item Size" },
  { id: "itemWeight", label: "Item Weight " },
  { id: "itemPrice", label: "Item Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsfancyitem = [
  { id: "imageSrc", label: "ITEM ID" },
  { id: "hireDate", label: "DATE" },
  { id: "id", label: "Item Code" },
  { id: "itemname", label: "Item Name" },
  { id: "itemType", label: "Item Type " },
  { id: "itemModel", label: "Item Model" },
  { id: "itemWeight", label: "Item Weight " },
  { id: "itemPrice", label: "Item Price" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellshistory = [
  { id: "id", label: "Order No" },
  { id: "fullName", label: "Customer" },
  { id: "city", label: "City/Town" },
  { id: "mobile", label: "Mobile" },
  { id: "hireDate", label: "Date" },
  { id: "itemWeight", label: "Grand Total" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsitems = [
  { id: "imageSrc", label: "Item Image" },
  { id: "orderNumber", label: "Item No" },
  { id: "itemName", label: "Item Name" },
  { id: "itemType", label: "Item Model" },
  { id: "itemWeight", label: "Item Weight" },

  { id: "itemfiness", label: "Finess" },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsestimate = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Customer Name" },
  { id: "city", label: "City" },
  { id: "mobile", label: "Mobile Number " },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "granttotal", label: "Grant Total", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellsgst = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Customer Name" },
  { id: "city", label: "City" },
  { id: "mobile", label: "Mobile Number " },
  { id: "hireDate", label: "Date" },
  { id: "aadhaarnumber", label: "Aadhar Number" },
  { id: "granttotal", label: "Net Weight" },
  { id: "granttotal", label: "Grant Total", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellssilvergst = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Customer Name" },
  { id: "city", label: "City" },
  { id: "mobile", label: "Mobile Number " },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "granttotal", label: "Grant Total", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
//  {/* id: 'granttotal', label: 'Grant Total',disableSorting: true */},
export const headcellsVentors = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Ventors Name" },
  { id: "city", label: "City" },
  { id: "mobile", label: "Mobile Number " },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];
export const headCellsworkvoucher = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Ventors" },
  { id: "city", label: "City" },
  { id: "mobile", label: "GSTIN" },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "granttotal", label: "Gross Weight", disableSorting: true },
  { id: "granttotal", label: "NetPurity Weight", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

export const headCellssilvervoucher = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Ventors" },
  { id: "city", label: "City" },
  { id: "mobile", label: "GSTIN" },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "granttotal", label: "Gross Weight", disableSorting: true },
  { id: "amount", label: "Amount", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];
export const headCellsoldgold = [
  { id: "id", label: "Bill No" },
  { id: "fullName", label: "Customer Name" },
  { id: "city", label: "City" },
  { id: "mobile", label: "Mobile" },
  { id: "hireDate", label: "Date" },
  { id: "status", label: "Aadhar No" },
  { id: "status", label: "Gross Weight" },
  { id: "granttotal", label: "Grant Total", disableSorting: true },
  { id: "actions", label: "Actions", disableSorting: true },
];

const generateOrderNumber = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const getRandomNumber = () => {
  let min = 1000;
  let max = 9999;
  return Math.round(Math.random() * (max - min) + min);
};

export const defaultImageSrc =
  "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";

export const userRegister = () => ({
  userId: getRandomNumber(),
  username: "",
  //username:'',
  fullName: "",
  mobile: "",
  city: "",
  gender: "male",
  email: "",
  password: "",
  cpassword: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
  hireDate: new Date(),
  //hireDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
});

export const rateUpdate = () => ({
  id: 0,
  goldname: "GOLD",
  gold: "",
  goldpurename: "24KARAT",
  goldpure: "",
  silvername: "SILVER",
  silver: "",
  silverpurename: "24KARAT",
  silverpure: "",
});

export const initialFValuess = () => ({
  customerId: getRandomNumber(),
  id: 0,
  fullName: "",
  mobile: "",
  city: "",
  //gender: 'male',pannumber aadhaarnumber
  aadhaarnumber: "",
  pannumber: "",
  rating: "5",
  joins: "",
  notes: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
  hireDate: new Date(),
  //hireDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
});

export const initialFValuesventor = () => ({
  ventorId: getRandomNumber(),
  id: 0,
  fullName: "",
  mobile: "",
  secondarymobile: "GSTIN",
  city: "",
  status: "Done",
  type: "None",
  balance: "0",
  imageName: "",
  joins: "",
  notes: "",
  acname: "",
  acno: "",
  isfccode: "",
  branch: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
  hireDate: new Date(),
  // hireDate: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date()),
});
//const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
export const initialitems = () => ({
  id: "",
  orderNumber: generateOrderNumber(),
  HUID: "",
  hireDate: formattedDate,
  itemName: "",
  itemType: "",
  itemPrice: "12",
  itemWeight: "",
  finess: "91.60",
  SalesPrice: "15",
  AddPrice: "450",
  joins: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
});

export const initialsilveritems = () => ({
  id: "",
  orderNumber: generateOrderNumber(),
  HUID: "",
  hireDate: formattedDate,
  itemName: "",
  itemType: "",
  itemPrice: "10",
  itemWeight: "",
  itemSize: "",
  joins: "",
  joins: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
});

export const initialadditems = () => ({
  id: "",
  orderNumber: generateOrderNumber(),
  itemName: "",
  itemType: "",
  itemQuantity: 1,
  itemWeight: "",
  itemfiness: 91.6,
  imageSrc: defaultImageSrc,
  imageFile: null,
  joins: "",
  isdelivered: 1,
});

export const initialfancyitems = () => ({
  id: "",
  orderNumber: generateOrderNumber(),
  hireDate: formattedDate,
  itemName: "",
  itemType: "",
  itemPrice: "180",
  itemWeight: "",
  itemModel: "",
  joins: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
});

export const optionsss = [
  { label: "Kadayanallur" },
  { label: "Tenkasi" },
  { label: "Madurai" },
  { label: "Thrichy" },
  { label: "Thirunelveli" },
];

export const ornamentitem = [
  { label: "EARRING", id: 1 },
  { label: "CHAIN", id: 2 },
  { label: "Braclet", id: 3 },
  { label: "Jummikki", id: 4 },
  { label: "Drops", id: 5 },
  { label: "Coins", id: 6 },
  { label: "Cermony Dollar", id: 7 },
  { label: "Dollar", id: 8 },
  { label: "Ring", id: 9 },
  { label: "Necklace", id: 10 },
  { label: "Haram", id: 11 },
  { label: "Coker", id: 12 },
  { label: "Turkey Necklace", id: 13 },
  { label: "Turkey Haram", id: 14 },
  { label: "BackCHAIN", id: 15 },
  { label: "Maatal", id: 16 },
];

export const ornamentitemsilver = [
  { label: "Anklet", id: 1 },
  { label: "Metti", id: 2 },
  { label: "Kodi", id: 3 },
  { label: "Muthu Kodi", id: 4 },
  { label: "Fancy Anklet", id: 5 },
  { label: "Silver Spoon", id: 6 },
  { label: "Silver Plate", id: 7 },
  { label: "Silver Tumler", id: 8 },
];

export const fancyornaments = [
  { label: "92.5 CHAIN", id: 1 },
  { label: "92.5 Braclet", id: 2 },
  { label: "92.5 Ring", id: 3 },
  { label: "92.5 Earring", id: 4 },
  { label: "92.5 Anklet", id: 5 },
  { label: "92.5 Necklace", id: 6 },
];
export const getstatus = [
  { label: "Rebate", id: 1 },
  { label: "Balance", id: 2 },
  { label: "Done", id: 3 },
];

export const getsalesadjustment = [
  { label: "FORMAL", id: 1 },
  { label: "SALES_ADJUSTMENT", id: 2 },
];

export const getorder = [
  { label: "DONE", id: 1 },
  { label: "ORDER", id: 2 },
];
export const getDepartmentCollection = () => [
  { id: "1", title: "DONE" },
  { id: "2", title: "BALANCE" },
];
export const ventortypeMethods = [
  { id: "Gold", title: "Gold" },
  { id: "Silver", title: "Silver" },
  { id: "Fancy", title: "Fancy" },
  { id: "Gold and Silver", title: "Gold and Silver" },
];
export const OrderMethods = [
  { id: "Done", title: "Done" },
  { id: "Pending", title: "Pending" },
  { id: "Order", title: "Order" },
];
export const gettypestatus = [
  { id: "1", label: "Done" },
  { id: "2", label: "Pending" },
  { id: "3", label: "Balance" },
  { id: "4", label: "Order" },
];

export const gettype = [
  { id: "1", label: "Gold" },
  { id: "2", label: "Silver" },
  { id: "3", label: "Sterling Silver" },
];

export const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

export const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};
export const SterlingType = [
  { id: 1, label: "GENS CHAIN" },
  { id: 2, label: "GENS BRACLET" },
  { id: 3, label: "GENS RING" },
  { id: 4, label: "GENS BANGLE [KADA]" },
  { id: 5, label: "BABY CHAIN" },
  { id: 6, label: "BABY BRACLET" },
  { id: 7, label: "LADIES CHAIN" },
  { id: 8, label: "LADIES BRACLET" },
  { id: 9, label: "LADIES RING" },
  { id: 10, label: "LADIES BANGLE" },
];
export const itemTypesilver = [
  { id: 1, label: "ANKLET 5" },
  { id: 2, label: "ANKLET 5 CHAIN" },
  { id: 3, label: "ANKLET 5 MUTHU" },
  { id: 4, label: "ANKLET 5.5" },
  { id: 5, label: "ANKLET 5.5 CHAIN" },
  { id: 6, label: "ANKLET 5.5 MUTHU" },
  { id: 7, label: "ANKLET 6" },
  { id: 8, label: "ANKLET 6 CHAIN" },
  { id: 9, label: "ANKLET 6 MUTHU" },
  { id: 10, label: "ANKLET 6.5" },
  { id: 11, label: "ANKLET 6.5 CHAIN" },
  { id: 12, label: "ANKLET 6.5 MUTHU" },
  { id: 13, label: "ANKLET 7" },
  { id: 14, label: "ANKLET 7 CHAIN" },
  { id: 15, label: "ANKLET 7 MUTHU" },
  { id: 16, label: "ANKLET 7.5" },
  { id: 17, label: "ANKLET 7.5 CHAIN" },
  { id: 18, label: "ANKLET 7.5 MUTHU" },
  { id: 19, label: "ANKLET 8" },
  { id: 20, label: "ANKLET 8 CHAIN" },
  { id: 21, label: "ANKLET 8 MUTHU" },
  { id: 22, label: "ANKLET 8.5" },
  { id: 23, label: "ANKLET 8.5 CHAIN" },
  { id: 24, label: "ANKLET 8.5 MUTHU" },
  { id: 25, label: "ANKLET 9" },
  { id: 26, label: "ANKLET 9 CHAIN" },
  { id: 27, label: "ANKLET 9 MUTHU" },
  { id: 28, label: "ANKLET 9.5" },
  { id: 29, label: "ANKLET 9.5 CHAIN" },
  { id: 30, label: "ANKLET 9.5 MUTHU" },
  { id: 31, label: "ANKLET 10" },
  { id: 32, label: "ANKLET 10 CHAIN" },
  { id: 33, label: "ANKLET 10 MUTHU" },
  { id: 34, label: "ANKLET 10.5" },
  { id: 35, label: "ANKLET 10.5 CHAIN" },
  { id: 36, label: "ANKLET 10.5 MUTHU" },
  { id: 35, label: "ANKLET 11" },
  { id: 35, label: "ANKLET 11 CHAIN" },
  { id: 36, label: "ANKLET 11 MUTHU" },
  { id: 36, label: "ANKLET 12" },
  { id: 37, label: "FANCY ANKLET 5" },
  { id: 38, label: "FANCY ANKLET 5.5" },
  { id: 39, label: "FANCY ANKLET 6" },
  { id: 40, label: "FANCY ANKLET 6.5" },
  { id: 41, label: "FANCY ANKLET 7" },
  { id: 42, label: "FANCY ANKLET 7.5" },
  { id: 43, label: "FANCY ANKLET 8" },
  { id: 44, label: "FANCY ANKLET 8.5" },
  { id: 45, label: "FANCY ANKLET 9" },
  { id: 46, label: "FANCY ANKLET 9.5" },
  { id: 47, label: "FANCY ANKLET 10" },
  { id: 48, label: "FANCY ANKLET 10.5" },
  { id: 49, label: "FANCY ANKLET 11" },
  { id: 45, label: "BOMBAY ANKLET 9" },
  { id: 46, label: "BOMBAY ANKLET 9.5" },
  { id: 47, label: "BOMBAY ANKLET 10" },
  { id: 48, label: "BOMBAY ANKLET 10.5" },
  { id: 49, label: "BOMBAY ANKLET 11" },
  { id: 50, label: "METTI" },
  { id: 55, label: "KOODI + SET" },
  { id: 58, label: "CERMONY SILVER BANGLE" },
  { id: 59, label: "THANDA" },
  { id: 59, label: "MUTHU KOODI" },
];

export const itemType = [
  { id: 1, label: "EARRING 1G" },
  { id: 2, label: "EARRING 2G" },
  { id: 3, label: "EARRING 3G" },
  { id: 4, label: "EARRING 4G" },
  { id: 5, label: "EARRING 5G" },
  { id: 6, label: "EARRING 6G" },
  { id: 7, label: "EARRING 8G" },
  { id: 8, label: "JUMMIKKI 1G" },
  { id: 9, label: "JUMMIKKI 2G" },
  { id: 10, label: "JUMMIKKI 3G" },
  { id: 11, label: "JUMMIKKI 4G" },
  { id: 12, label: "JUMMIKKI 6G" },
  { id: 13, label: "JUMMIKKI 8G" },
  { id: 14, label: "ROUND STUDS 1G" },
  { id: 15, label: "ROUND STUDS 2G" },
  { id: 16, label: "ROUND STUDS 3G" },
  { id: 17, label: "ROUND STUDS 4G" },
  { id: 18, label: "STUDS 1G" },
  { id: 19, label: "STUDS 2G" },
  { id: 20, label: "STUDS 3G" },
  { id: 21, label: "STUDS 4G" },
  { id: 22, label: "STUDS 6G" },
  { id: 23, label: "STUDS 8G" },
  { id: 24, label: "LADIES RING" },
  { id: 30, label: "LADIES RING CASTING" },
  { id: 36, label: "GENS RING" },
  { id: 37, label: "GENS RING 2G" },
  { id: 38, label: "GENS RING 3G" },
  { id: 39, label: "GENS RING 4G" },
  { id: 40, label: "GENS RING 6G" },
  { id: 41, label: "GENS RING 8G" },
  { id: 42, label: "GENS RING CASTING" },
  { id: 43, label: "GENS RING CASTING 2G" },
  { id: 44, label: "GENS RING CASTING 3G" },
  { id: 45, label: "GENS RING CASTING 4G" },
  { id: 46, label: "GENS RING CASTING 6G" },
  { id: 47, label: "GENS RING CASTING 8G" },
  { id: 48, label: "BABY RING" },

  { id: 55, label: "LADIES BRACLET 2G" },
  { id: 56, label: "LADIES BRACLET 3G" },
  { id: 57, label: "LADIES BRACLET 4G" },
  { id: 58, label: "LADIES BRACLET 6G" },
  { id: 59, label: "LADIES BRACLET 8G" },
  { id: 60, label: "LADIES BRACLET 16G" },
  { id: 61, label: "LADIES BRACLET 24G" },

  { id: 62, label: "GENS BRACLET 2G" },
  { id: 63, label: "GENS BRACLET 3G" },
  { id: 64, label: "GENS BRACLET 4G" },
  { id: 65, label: "GENS BRACLET 6G" },
  { id: 66, label: "GENS BRACLET 8G" },
  { id: 67, label: "GENS BRACLET 16G" },
  { id: 68, label: "GENS BRACLET 24G" },

  { id: 69, label: "BABY BRACLET 1G" },
  { id: 70, label: "BABY BRACLET 2G" },
  { id: 71, label: "BABY BRACLET 3G" },
  { id: 72, label: "BABY BRACLET 4G" },

  { id: 73, label: "BANGLE 6G" },
  { id: 74, label: "BANGLE 8G" },
  { id: 75, label: "BANGLE 10G" },
  { id: 76, label: "BANGLE 16G" },
  { id: 77, label: "BANGLE 24G" },
  { id: 78, label: "BANGLE 32G" },
  { id: 79, label: "BANGLE 40G" },
  { id: 80, label: "BANGLE 48G" },

  { id: 81, label: "BABY BANGLE 4G" },
  { id: 82, label: "BABY BANGLE 6G" },
  { id: 83, label: "BABY BANGLE 8G" },
  { id: 84, label: "BABY BANGLE 10G" },
  { id: 85, label: "BABY BANGLE 12G" },
  { id: 86, label: "BABY BANGLE 16G" },

  { id: 87, label: "PLAIN MATTAL 2G" },
  { id: 88, label: "PLAIN MATTAL 3G" },
  { id: 89, label: "PLAIN MATTAL 4G" },
  { id: 90, label: "MODEL MATTAL 4G" },
  { id: 100, label: "H.PIN MATTAL 6G" },
  { id: 100, label: "H.PIN MATTAL 8G" },
  { id: 101, label: "DOLLAR" },
  { id: 101, label: "DOLLAR 1G" },
  { id: 102, label: "DOLLAR 2G" },
  { id: 103, label: "DOLLAR 3G" },
  { id: 104, label: "DOLLAR 4G" },
  { id: 105, label: "DOLLAR 5G" },
  { id: 106, label: "DOLLAR 6G" },
  { id: 107, label: "DOLLAR 8G" },

  { id: 102, label: "KARUGAMANI DOLLAR 2G" },
  { id: 103, label: "KARUGAMANI DOLLAR 3G" },
  { id: 104, label: "KARUGAMANI DOLLAR 4G" },
  { id: 105, label: "KARUGAMANI DOLLAR 5G" },
  { id: 106, label: "KARUGAMANI DOLLAR 6G" },
  { id: 107, label: "KARUGAMANI DOLLAR 8G" },

  { id: 102, label: "LINGAM DOLLAR 2G" },
  { id: 103, label: "LINGAM DOLLAR 3G" },
  { id: 104, label: "LINGAM DOLLAR 4G" },
  { id: 105, label: "LINGAM DOLLAR 5G" },
  { id: 106, label: "LINGAM DOLLAR 6G" },
  { id: 107, label: "LINGAM DOLLAR 8G" },

  { id: 102, label: "C.CROSS DOLLAR 2G" },
  { id: 103, label: "C.CROSS DOLLAR 3G" },
  { id: 104, label: "C.CROSS DOLLAR 4G" },
  { id: 105, label: "C.CROSS DOLLAR 5G" },
  { id: 106, label: "C.CROSS DOLLAR 6G" },
  { id: 107, label: "C.CROSS DOLLAR 8G" },
  { id: 108, label: "DOLLAR 16G" },

  { id: 101, label: "OHM DOLLAR 1G" },
  { id: 102, label: "OHM DOLLAR 2G" },
  { id: 103, label: "OHM DOLLAR 3G" },
  { id: 104, label: "OHM DOLLAR 4G" },
  { id: 105, label: "OHM DOLLAR 5G" },
  { id: 106, label: "OHM DOLLAR 6G" },
  { id: 107, label: "OHM DOLLAR 8G" },

  { id: 101, label: "CROSS DOLLAR 1G" },
  { id: 102, label: "CROSS DOLLAR 2G" },
  { id: 103, label: "CROSS DOLLAR 3G" },
  { id: 104, label: "CROSS DOLLAR 4G" },
  { id: 105, label: "CROSS DOLLAR 5G" },
  { id: 106, label: "CROSS DOLLAR 6G" },
  { id: 107, label: "CROSS DOLLAR 8G" },

  { id: 101, label: "IDOL DOLLAR 1G" },
  { id: 102, label: "IDOL DOLLAR 2G" },
  { id: 103, label: "IDOL DOLLAR 3G" },
  { id: 104, label: "IDOL DOLLAR 4G" },
  { id: 105, label: "IDOL DOLLAR 5G" },
  { id: 106, label: "IDOL DOLLAR 6G" },
  { id: 107, label: "IDOL DOLLAR 8G" },

  { id: 109, label: "GENS DOLLAR" },
  { id: 110, label: "CHAIN  4G" },

  { id: 111, label: "CHAIN  6G" },
  { id: 112, label: "CHAIN  8G" },
  { id: 113, label: "CHAIN  10G" },
  { id: 114, label: "CHAIN  12G" },
  { id: 115, label: "CHAIN  16G" },
  { id: 116, label: "CHAIN  20G" },
  { id: 117, label: "CHAIN  24G" },
  { id: 118, label: "CHAIN  32G" },

  { id: 119, label: "HARAM" },
  { id: 120, label: "NECKLACE" },
  { id: 121, label: "COKER" },
  { id: 122, label: "TURKEY HARAM" },
  { id: 123, label: "TURKEY NECKLACE" },
  { id: 124, label: "TURKEY COKER" },
  { id: 125, label: "CHAIN MUGAPPU" },
  { id: 126, label: "CHAIN HOLLOW ROPE" },
];
