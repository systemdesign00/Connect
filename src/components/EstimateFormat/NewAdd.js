import { useState} from 'react';
import { Form, Button } from "react-bootstrap"
const NewAdd = (props) =>{
    const { values, setValues, setOrderListVisibility,recordForEdit } = props;
    const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
   
const addFoodItem = foodItem => {
        let x = {
            id: generateOrderNumber(), //values.id
            orderDetailId: 0,
            foodItemId: foodItem.id || generateOrderNumber(),
            quantity: 1,
            tax: tax,
            foodItemPrice: foodItemPrice, //data.prices
            foodItemName: foodItemName //data.fullname 
        }
        setValues({
            ...values,
            orderDetails: [...values.orderDetails, x]
        })
    }
     const [foodItemName, setfoodItemName] = useState();
    const [foodItemPrice, setfoodItemPrice] = useState();
    const [tax, settax] = useState();
    
    const [newEmployee, setNewEmployee] = useState({
       id: "",
        foodItemId: "",
        foodItemName: "",
        foodItemPrice:"",
        tax: ""
    });

       
   
   

    const handleSubmit = (e) => {
        e.preventDefault();
        addFoodItem(foodItemName, foodItemPrice,tax);
    }

     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={foodItemName}
                                     onChange={(e)=> setfoodItemName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="number"
                    placeholder="foodItemPrice"
                    name="foodItemPrice"
                    value={foodItemPrice}
                                    onChange={(e)=> setfoodItemPrice(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                   type="number"
                    placeholder="tax"
                    rows={3}
                    name="tax"
                    value={tax}
                                    onChange={(e)=> settax(e.target.value)}
                />
            </Form.Group>
            
            <Button variant="success" type="submit" block>
                Add New Employee
            </Button>
        </Form>

     )
}

export default NewAdd;