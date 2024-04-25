import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Sig from 'layouts/authentication/sign-up/sig';
import User from "components/Users/User";
import Ventors from "layouts/tables/Ventors";
import Items from "components/Items/Inv";
import SilverItems from "components/SilverItems/Site";
import FancyItems from "components/FancyItems/fan";
import GoldInvoice from 'components/SimpleGst/index'
import SilverInvoice from 'components/QSilverGST/index'
import OldGoldInvoice from 'components/OldGoldPurchase/index'
import OldSilverInvoice from 'components/OldSilverPurchase/index'
import GoldWorkvoucher from 'components/WorkVoucher/index';
import SilverWorkvoucher from 'components/SilverVoucher/index';
import Salesreport from 'components/Stocks/Stock';
import Stockmanagement from 'components/StockManagement/StockManagement';
import Restorepoint from 'components/Restore/Restore';
import TaxEstimatePad from 'components/GST_SD/index'
import GoldandSilverpurchase from "components/Goldpurchase/GoldandSilverpurchase";
import GSinvoice from "components/SimpleGst/GSInvoice";
import OldGSpurchase from "components/OldGoldPurchase/OldGSpurchase";
import GSworkvoucher from "components/WorkVoucher/GSworkvoucher";
import Esestimate from "./components/SD_Bill/index";
import PosEstimate from 'components/Pos/index'
import Pendingblack from 'components/Pending/Mainpending';
import Stocksegister from "components/StockRegister"
 // @mui icons
import Icon from "@mui/material/Icon";
import { GiRingBox } from "react-icons/gi";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { ImUserTie } from "react-icons/im";
import { GiGoldMine } from "react-icons/gi";
import { GiGemChain } from "react-icons/gi";
import { GiDoubleNecklace } from "react-icons/gi";
import { FaUserSecret } from "react-icons/fa6";
import { RestoreFromTrash } from "@mui/icons-material";
import Epad from "./components/GST_SD/EPad";

const styles = {
    backgroundImage: 'url("your-image-url.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px', // Set a height for your component
    color: 'white', // Set text color to make it readable
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
const routes = [
  {
    //type: "collapse",
    name: "Sign In",
    key: "signin",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/signin",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "DASHBOARD",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboards",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "CUSTOMER'S",
    key: "user",
    icon: <PeopleAltIcon />,
    route: "/user",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "VENTOR'S",
    key: "ventors",
    icon:<ImUserTie />,
    route: "/ventors",
    component: <Ventors />,
  },
  {
    type: "collapse",
    name: "GOLD INVENTORY",
    key: "goldinventory",
    icon: <GiRingBox />,
    route: "/goldinventory",
    component: <Items />,
  },
  {
    type: "collapse",
    name: "SILVER INVENTORY",
    key: "silverinventory",
    icon: <GiGoldMine />,
    route: "/silverinventory",
    component: <SilverItems />,
  },
  {
    type: "collapse",
    name: "STERLING INVENTORY",
    key: "sterlinginventory",
    icon: <GiGemChain />,
    route: "/sterlinginventory",
    component: <FancyItems />,
  },
   {
    type: "collapse",
    name: "GOLD BILL",
    key: "Invoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/Invoice",
    component: <GSinvoice />,
  },
  {
    type: "collapse",
    name: "SILVER BILL",
    key: "OldInvoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/OldInvoice",
    component: <OldGSpurchase />,
  },
   {
    type: "collapse",
    name: "Work Voucher",
    key: "workvoucher",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/workvoucher",
    component: <GSworkvoucher />,
  },
  {
    //type: "collapse",
    name: "Gold Invoice",
    key: "goldinvoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/goldinvoice",
    component: <GoldInvoice />,
  },
   {
    //type: "collapse",
    name: "Silver Invoice",
    key: "silverinvoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/silverinvoice",
    component: <SilverInvoice />,
  },
  {
    //type: "collapse",
    name: "Old Gold Invoice",
    key: "oldgoldinvoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/oldgoldinvoice",
    component: <OldGoldInvoice />,
  },
  {
   // type: "collapse",
    name: "Old Silver Invoice",
    key: "oldsilverdinvoice",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/oldsilverdinvoice",
    component: <OldSilverInvoice />,
  },
   {
   // type: "collapse",
    name: "Gold WorkVoucher",
    key: "goldworkvoucher",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/goldworkvoucher",
    component: <GoldWorkvoucher />,
  },
  {
    //type: "collapse",
    name: "Silver WorkVoucher",
    key: "silverworkvoucher",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/silverworkvoucher",
    component: <SilverWorkvoucher />,
  },
  {
    type: "collapse",
    name: "Sales Report",
    key: "salesreport",
    icon: <RestoreFromTrash />,
    route: "/salesreport",
    component: <Salesreport />,
  },
  {
    type: "collapse",
    name: "Stockmanagement",
    key: "stockmanagement",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/stockmanagement",
    component: <Stockmanagement />,
  },
    {
    type: "collapse",
    name: "Restore",
    key: "restore",
    icon: <RestoreFromTrash />,
    route: "/restore",
    component: <Restorepoint />,
  },
  
 {
    type: "collapse",
    name: "Purchase",
    key: "purchase",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/purchase",
    component: <GoldandSilverpurchase />,
  },
    {
    //type: "collapse",
    name: "TaxEstimatePad",
    key: "taxestimatePad",
    icon: <FaUserSecret />,
    route: "/taxestimatePad",
    component: <TaxEstimatePad />,
  },
   {
    type: "collapse",
    name: "EstimatePad",
    key: "estimatePad",
    icon: <FaUserSecret />,
    route: "/estimatePad",
    component: <Epad />,

  },
   {
    type: "collapse",
    name: "StockRegister",
    key: "stockregister",
    icon: <FaUserSecret />,
    route: "/stockregister",
    component: <Stocksegister />,
  },
    {
    type: "collapse",
    name: "Outblack",
    key: "Outblack",
    icon: <FaUserSecret />,
    route: "/Outblack",
    component: <Pendingblack />,
  },
  
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <FaUserSecret />,
    route: "/profile",
    component: <Profile />,
  },
  
  {
    type: "",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
