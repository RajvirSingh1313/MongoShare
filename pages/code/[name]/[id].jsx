import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Select from "react-select";
import Head from "next/head";
import axios from "axios";

import NotSupported from "../../../components/NotSupported";
import Navbar from "../../../components/Navbar";
import InputBox from "../../../components/InputBox";
const Editor = dynamic(import("../../../components/Editor"), { ssr: false })

const Code = ({
    authorName,
    language,
    code,
    editPass,
    url
}) => {
    const router = useRouter();

    const {
        name,
        id
    } = router.query

    const [isEditVisible, setIsEditVisible] = useState(false);
    const [currUser, setCurrUser] = useState({ editPass: "" })
    const [isCopied, setIsCopied] = useState(false);
    //errors
    const [editPassError, setEditPassError] = useState(false);

    const EditButton = () => {
        return (
            <button
                className="bg-blue-300 focus:outline-none w-10 ml-auto hover:shadow-xl rounded-full font-display h-10 m-3"
                onClick={() => { setIsEditVisible(true) }}
            >
                <img className="mx-auto" src="/pencil.svg" />
            </button>
        )
    }

    const copyHandler = () => {
        let tempInput = document.createElement("input");
        tempInput.value = url
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setIsCopied(true);
    };


    const isAllFieldsFilled = () => {
        return !!currUser.editPass;
    }

    const formHandler = (e) => {
        e.preventDefault()
        if (isAllFieldsFilled()) {

            if (editPass === currUser.editPass) {
                router.push(`/edit/${currUser.editPass}/${id}`, undefined, { shallow: true })
            }
            else {
                toast.error("Edit pass doesn't match, try again ...");
            }

        }
        else {
            toast.error("Please fill in all the fields")
            setEditPassError(true)
        }
    }

    return (
        <div className="p-3">
            <ToastContainer />
            <Head>
                <title>MongoShare | Code by {name}</title>
                <meta name="description" content="Share code" />
                <meta name="title" content={`MongoShare | Code by ${name}`} />
                <meta name="image" content="/favicon.ico" />
                <meta property="og:title" content={`MongoShare | Code by ${name}`} />
                <meta property="og:description" content="Share code" />
                <meta property="og:image" content="/MongoShare Banner.png" />
            </Head>
            <Navbar />
            <div className="p-10 hidden lg:block">
                <form>
                    <div className="flex">
                        <InputBox
                            value={authorName}
                            placeholder="Author Name"
                            onchange={() => { }}
                            disabled={true}
                        />
                        <Select
                            value={language}
                            className={`font-display w-40 h-0 m-4`}
                            placeholder="Language"
                        />
                        {isEditVisible
                            ? (
                                <>
                                    <div className="ml-auto">
                                        <InputBox
                                            value={currUser.editPass}
                                            width="25"
                                            placeholder="Edit pass"
                                            isError={editPassError}
                                            otherProps="mr-0"
                                            onchange={(e) => { setCurrUser({ editPass: e.target.value }) }}
                                        />
                                    </div>
                                    <button
                                        className="bg-blue-300 pass-btn focus:outline-none w-10 hover:shadow-xl rounded-full font-display h-10 m-3"
                                        onClick={formHandler}
                                    >
                                        <img className="mx-auto pass-logo" src="/triangle.svg" />
                                    </button>
                                </>)
                            : <EditButton />
                        }
                    </div>
                    <Editor
                        language={language.value}
                        value={code}
                        readonly={true}
                        onchange={() => { }}
                    />
                </form>
                <div className="flex justify-center mt-5">
                    <InputBox
                        value={url}
                        disabled={true}
                        placeholder="Share Link"
                        onchange={() => { }}
                        otherProps="h-10 mr-0 mt-0 rounded-r-none w-8/12"
                    />
                    <button
                        className="bg-blue-300 focus:outline-none w-12 ml-0 mt-0 hover:shadow-xl rounded-r-md font-display h-10 m-3"
                        onClick={copyHandler}
                    >
                        {isCopied ? <img className="mx-auto" src="/copied.svg" /> : <img className="mx-auto" src="/clipboard.svg" />}
                    </button>
                </div>
            </div>
            <NotSupported />
        </div>
    );

}

Code.getInitialProps = async (req) => {
    const id = req.query.id;
    const url = req.asPath;
    const res = await axios.get(`${process.env.DOMAIN ? process.env.DOMAIN : "https://mongoshare.vercel.app"}/api/code/${id}`)
    const json = await res.data;
    return {
        authorName: json.authorName,
        language: {
            value: json.language,
            label: json.language_label,
        },
        code: json.code,
        editPass: json.edit_pass,
        url: `${process.env.DOMAIN ? process.env.DOMAIN : "https://mongoshare.vercel.app"}${url}`
    }
}

export default Code;