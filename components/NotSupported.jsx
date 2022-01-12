import React from "react";

const NotSupported = () => {
    return (
        <div className="text-white block lg:hidden mt-10 text-center mb-10">
            <div className="text-center font-display">
                <div className="font-medium">
                    Support for Phones/Tablets is not supported.
                </div>
                <div className="font-bold text-lg">
                    Try Desktop Version.
                </div>
            </div>
        </div>
    )
}

export default NotSupported;