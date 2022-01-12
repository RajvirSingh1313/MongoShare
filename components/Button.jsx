import React from "react";

const Button = ({ value, onclick, otherProps }) => {
    return (
        <button
            className={`bg-blue-300 text-white focus:outline-none hover:shadow-xl rounded-full font-display h-12 w-24 m-3 ${otherProps ? otherProps : ""}`}
            onClick={onclick}
        >
            {value}
        </button>
    )
}

export default Button;