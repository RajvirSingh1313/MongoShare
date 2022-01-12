import React from "react";

const Navbar = () => {
    return (
        <nav className="w-full flex justify-center align-center items-center mt-10">
            <a href="/"><img src="/favicon.ico" alt="" className="h-10 pr-2" /></a>
            <a href="/"><h1 className="text-center text-6xl text-blue-300 font-black">MongShare</h1></a>
        </nav>
    )
}

export default Navbar;