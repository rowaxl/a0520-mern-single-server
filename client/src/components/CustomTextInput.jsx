import React from 'react'
import { useField } from 'formik'

const CustomTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <>
            <label htmlFor={props.id || props.name} >{label}</label>
            <input style={{ marginBottom: "5px"}} className="text-input" {...field} {...props} />
            {meta.error && meta.touched ? (
                <div className="red-text" style={{ marginBottom: "20px"}}>
                    {meta.error}
                </div>
            ) : null}
        </>
    )
}

export default CustomTextInput
