import  React,{ useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import ConfirmDialog from '../../layouts/ConfirmDialog';
export default function MobileComponent(props) {

  
    const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } = props;

    const [orderList, setOrderList] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const fetchAlled = () => {
         createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
            .then(res => {
                setOrderList(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const showForUpdate = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }
   

       const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
            
        })
       createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                   .then(res => {
                   fetchAlled();
                   resetFormControls();
                   })
                   .catch(err => console.log(err))
                   setNotify({ isOpen: true, message: 'Deleted successfully.' });
       
    }
  /*
       const deleteOrder = id => {
         createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
                   .then(res => {
                     handleClose()
                       fetchAlled();
                       setOrderListVisibility(false);
                      
                       resetFormControls();
                       setNotify({ isOpen: true, message: 'Deleted successfully.' });
                   })
                   .catch(err => console.log(err))
           
       }
       */
  
   
const audio = new Audio('https://www.winhistory.de/more/winstart/mp3/vistashutdown.mp3')
  return (
   <><Box style={{ marginRight: 10, marginLeft: 10, marginBottom: 50 }}>
          {orderList.map((item) => (
              <List sx={{ width: '100%', bgcolor: 'background.paper' }} key={item.id}>
                  <ListItem alignItems="flex-start"
                      secondaryAction={<IconButton>
                          <DeleteSweepOutlinedIcon style={{ color: "#FF0000" }} 
                           onClick={() => {
                               //deleteOrder(item.id)
                                audio.play();
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                        
                                                    
                                                })
                                            }}
                          

                        />
                      </IconButton>}
                  >
                      <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={item.imageSrc} />
                      </ListItemAvatar>
                      <ListItemText
                          primary={item.customerId}
                          secondary={item.Phone} />

                  </ListItem>


                  <Divider />

              </List>
          ))}
      </Box>
      <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog} />
              </>
  );
}
