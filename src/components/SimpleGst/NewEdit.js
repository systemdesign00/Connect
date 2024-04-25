import { Form, Button } from "react-bootstrap"
import { useState} from 'react';

const NewEdit = ({theEmployee,props}) =>{
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
    const id = theEmployee.id;
    const [foodItemName, setfoodItemName] = useState(theEmployee.foodItemName);
    const [foodItemPrice, setfoodItemPrice] = useState(theEmployee.foodItemPrice);
    const [tax, settax] = useState(theEmployee.tax);
  

  
    const [employees, setemployees] = useState(
{
        id: '',
        foodItemId: '',
        foodItemName: '',
        foodItemPrice: '',
        tax: ''
    }
    )
   

    const updatedEmployee = {id, foodItemName, foodItemPrice, tax}
const updateEmployee = (id, updatedEmployee) => {
    setemployees(employees.map((values) => values.id === id ? updatedEmployee : values))
}
    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(id, updatedEmployee)
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
                Edit Employee
            </Button>
        </Form>

     )
}

export default NewEdit;