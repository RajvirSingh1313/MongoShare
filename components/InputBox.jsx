import React from "react";

const InputBox = ({ value, placeholder, isError, onchange, width, otherProps, disabled }) => {
    return (
        <input
            className={`custom-input h-10 outline-none disabled:bg-gray-400 ${width ? `w-${width}` : ""} rounded-md p-2 m-4 font-display font-regular border-2 ml-0 ${isError ? 'border-red-500' : 'border-blue-200'} ${otherProps ? otherProps : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onchange}
            disabled={disabled}
        />
    )
}

export default InputBox;