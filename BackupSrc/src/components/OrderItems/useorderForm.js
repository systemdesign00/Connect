import React, { useState } from 'react'

export function UseorderForm(getFreshModelitemObject) {

    const [Order, setOrder] = useState(getFreshModelitemObject());
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setOrder({
            ...Order,
            [name]: value
        })
    }

    const resetFormControls = () => {
        setOrder(getFreshModelitemObject());
        setErrors({})
    }

    return {
        Order,
        setOrder,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }
}

