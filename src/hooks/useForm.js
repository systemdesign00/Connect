import { useState } from 'react'

export function useForm(getFreshModelObject) {
const defaultImageSrc = "https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg";
    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            orderDetails: [...values.orderDetails],
          
            [name]: value,

        })
    }

    const resetFormControls = () => {
        setValues(getFreshModelObject());
        setErrors({})
    }

 const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls,
        showPreview
    }
}

