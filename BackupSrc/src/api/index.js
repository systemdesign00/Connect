import axios from "axios";

export const BASE_URL =  'https://serdb.onrender.com/api/';
//export const BASE_URL = "http://192.168.1.159:3001/"
//export const PRIMARY_URL = 'https://serdb.onrender.com/api/'
//export const PRIMARY_URLS = 'https://serdb.onrender.com/api/'

//const BASE_URL=  'https://607458f4066e7e0017e79ae9.mockapi.io/';
//const BASE_URL = 'http://192.168.1.102:3001/';
//export const SECONDARY_URL = BASE_URL;
const usersUrlfancy = BASE_URL+'FancyStockitem';
const usersUrl = BASE_URL+'GstGoldStock';
const usersUrlsilver = BASE_URL+'GstSilverStock';

const usersUrlfancynon = BASE_URL+'Sdfancystock';
const usersUrlnon = BASE_URL+'Sdgoldstock';
const usersUrlsilvernon = BASE_URL+'Sdsilverstock';

export const ENDPIONTS = {
    CUSTOMER: 'Customer',
    VENTOR: 'Ventors',
    FOODITEM: 'FoodItem',
    ORDER: 'Order',
    EXCHANGE:'Exchange',
    ORDERITEM: 'Orderitem',
    ADDITEM:'Additem',
    STOCK: 'Stock',
    BOOKS:'books',
    PRICE:'Gol',
    PURE:'Pure',
    GST:'gstbill',
    SILVER:'silver',
    OLD_SILVER:'old_silver',
    WHOLE:'wholestock',
    ITEMS:'Items',
    SILVERITEMS:'SilverItems',
    FANCYITEMS:'FancyStockitem',
    SALESREPORT:'SalesReport',
    SALESREPORTSILVER:'SalesReportsilver',
    SALESOLDGOLDREPORT:'SalesoldgoldReport',
    SALESOLDSILVERREPORTSILVER:'SalesoldsilverReportsilver',
    SALESFANCYITEMS:'fancyitem',
    SALESPCSITEMS:'pieceitems',
    SILVERESTIMATE:'SilverEstimate',
    GSTESTIMATE:'GSTEstimate',
    GSTGOLDSTOCK:'GstGoldStock',
    GSTSILVERSTOCK:'GstSilverStock',
    STANDARDGST:'StandardGST',
    STANDARDGSTSILVER:'StandardGSTSilver',
    GSTSALESREPORT:'GSTSalesReport',
    GSTSALESREPORTSILVER:'GSTSalesReportSilver',
    OLDGOLDPURCHASE:'Oldgoldpurchase',
    OLDGOLDPURCHASEREPORT:'Oldgoldpurchasereport',
    GSESTIMATE:'Gsestimate',
    SHOPBILL:'Shopbill',
    SHOPBILLSILVER:'Shopbillsilver',
    PLACEORDER:'Placeorder',
    PENDINGORDER:'Pending',
    DELIVERYCHELLAN:'Deliverychellan',
    SIMPLEGST:'SimpleGST',
    QSILVERGST:'QSilverGST',
    WORKVOUCHER:'WorkVoucher',
    OLDSILVERPURCHASE:'Oldsilverpurchase',
    SILVERVOUCHER:'SilverVoucher',
    PURCHASE:'Purchase',
    PURCHASESILVER:'Purchasesilver',
    USER:'User',
    RATES:'Rates',
    SDGOLDSTOCK:'Sdgoldstock',
    SDSILVERSTOCK:'Sdsilverstock',
    SDFANCYSTOCK:'Sdfancystock',
   
   
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const deleteUsersilver = async (id) => {
    return await axios.delete(`${usersUrlsilver}/${id}`);
}

export const deleteUserfancy = async (id) => {
    return await axios.delete(`${usersUrlfancy}/${id}`);
}

export const deleteUsernon = async (id) => {
    return await axios.delete(`${usersUrlnon}/${id}`);
}

export const deleteUsersilvernon = async (id) => {
    return await axios.delete(`${usersUrlsilvernon}/${id}`);
}

export const deleteUserfancynon = async (id) => {
    return await axios.delete(`${usersUrlfancynon}/${id}`);
}
export const createAPIEndpoint = endpoint => {
    
    //let url = BASE_URL + endpoint + '/';
    let primaryurl = BASE_URL + endpoint + '/';
    return {
        fetchAll: () => axios.get(primaryurl),
        primaryfetchAll: () => axios.get(primaryurl),
        fetchById: id => axios.get(primaryurl + id),
        fetchByIds: id => axios.get(primaryurl + id),
         //checkAll : () => axios.head(primaryurl),

        createventor: newRecord => axios.post(primaryurl, newRecord),
        updateventor: (id, updatedRecord) => axios.put(primaryurl + id, updatedRecord),
        deleteventor: id => axios.delete(primaryurl + id),

        salesprimarydelete: id => axios.delete(primaryurl + id),
        salesprimaryfetchAll: () => axios.get(primaryurl),
        salescreate: newRecord => axios.post(primaryurl, newRecord),

        salespcsdelete: id => axios.delete(primaryurl + id),
        salespcscreate: newRecord => axios.post(primaryurl, newRecord), 
        salespcsfetchAll: () => axios.get(primaryurl),

        salesfancydelete: id => axios.delete(primaryurl + id),
        salesfancyfetchAll: () => axios.get(primaryurl),
        salesfancycreate: newRecord => axios.post(primaryurl, newRecord),


        salesoldgolddelete: id => axios.delete(primaryurl + id),
        salesoldgoldprimaryfetchAll: () => axios.get(primaryurl),
        salesoldgoldcreate: newRecord => axios.post(primaryurl, newRecord),

        salessilverprimarydelete: id => axios.delete(primaryurl + id),
        salessilverprimaryfetchAll: () => axios.get(primaryurl),
        salessilvercreate: newRecord => axios.post(primaryurl, newRecord),

        salesoldsilverprimarydelete: id => axios.delete(primaryurl + id),
        salesoldsilverprimaryfetchAll: () => axios.get(primaryurl),
        salesoldsilvercreate: newRecord => axios.post(primaryurl, newRecord),

        create: newRecord => axios.post(primaryurl, newRecord),
        primarycreate: newRecords => axios.post(primaryurl, newRecords),
        update: (id, updatedRecord) => axios.put(primaryurl + id, updatedRecord),
        primaryupdate: (id, updatedRecords) => axios.put(primaryurl + id, updatedRecords),
        delete: id => axios.delete(primaryurl + id),
        primarydelete: id => axios.delete(primaryurl + id),
         primaryfetchAllitems: () => axios.get(primaryurl),
        primarycreateitem: newRecords => axios.post(primaryurl, newRecords),
         primaryupdateitem: (id, updatedRecords) => axios.put(primaryurl + id, updatedRecords),
          primarydeleteitem: id => axios.delete(primaryurl + id),

            primaryfetchAllsilveritems: () => axios.get(primaryurl),
        primarycreatesilveritem: newRecords => axios.post(primaryurl, newRecords),
         primaryupdatesilveritem: (id, updatedRecords) => axios.put(primaryurl + id, updatedRecords),
          primarydeletesilveritem: id => axios.delete(primaryurl + id),

          primaryfetchAllfancyitems: () => axios.get(primaryurl),
        primarycreatefancyitem: newRecords => axios.post(primaryurl, newRecords),
         primaryupdatefancyitem: (id, updatedRecords) => axios.put(primaryurl + id, updatedRecords),
          primarydeletefancyitem: id => axios.delete(primaryurl + id),
        //stockdelete: id => axios.delete(url + id)

        fancydelete: id => axios.delete(primaryurl + id),
    }
}