import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Select from "react-select";
import Head from "next/head";
import axios from "axios";

import LANGUAGES from "../../../utils/languages";

import Button from "../../../components/Button";
import NotSupported from "../../../components/NotSupported";
import Navbar from "../../../components/Navbar";
import InputBox from "../../../components/InputBox";
const Editor = dynamic(import("../../../components/Editor"), { ssr: false })

const EditCode = ({
    authorName,
    language,
    code,
    editPass
}) => {

    const [currUsername, setAuthorName] = useState(authorName);
    const [currLanguage, setLanguage] = useState(language);
    const [currCode, setCode] = useState(code);
    const [currEditPass, setEditPass] = useState(editPass);

    //errors
    const [authorNameError, setAuthorNameError] = useState(false);
    const [editPassError, setEditPassError] = useState(false);

    const router = useRouter();

    const {
        edit_pass,
        id
    } = router.query


    const isAllFieldsFilled = () => {
        return !!currUsername && !!currLanguage.value && !!currLanguage.label && !!currCode && !!currEditPass;
    }

    const formHandler = (e) => {
        e.preventDefault();
        if (isAllFieldsFilled()) {
            toast.info("Please wait while we save your code", {
                autoClose: 20000
            });

            axios.post(`${process.env.DOMAIN ? process.env.DOMAIN : "https://mongshare.vercel.app"}/api/edit/${id}`, {
                authorName: currUsername,
                language_label: currLanguage.label,
                language: currLanguage.value,
                code: currCode,
                edit_pass: currEditPass
            })
                .then((res) => {
                    router.push(`/code/${currUsername}/${res.data.value._id}`, undefined, { shallow: true })
                })
                .catch((err) => {

                })
        }
        else {
            toast.error("Please fill in all the fields")

            setEditPassError(!currEditPass);
            setAuthorNameError(!currUsername)
        }
    }

    return (
        <div className="p-3">
            <ToastContainer />
            <Head>
                <title>MongShare | Edit Code</title>
            </Head>
            <Navbar />
            {edit_pass === editPass ? (
                < div className="p-10 hidden lg:block">
                    <form>
                        <div className="flex">
                            <InputBox
                                value={currUsername}
                                placeholder="Author Name"
                                isError={authorNameError}
                                onchange={(e) => { setAuthorName(e.target.value) }}
                            />
                            <Select
                                value={currLanguage}
                                className={`font-display w-40 h-0 m-4`}
                                options={LANGUAGES}
                                isSearchable={true}
                                onChange={setLanguage}
                                placeholder="Language"
                            />
                            <InputBox
                                value={currEditPass}
                                width="25"
                                placeholder="Edit pass"
                                isError={editPassError}
                                otherProps="mr-0"
                                onchange={(e) => { setEditPass(e.target.value) }}
                                disabled={true}
                            />
                            <div className="ml-auto">
                                <Button value="Save" onclick={formHandler} otherProps="float-right w-24 h-9 mr-0" />
                            </div>
                        </div>
                        <Editor
                            language={currLanguage.value}
                            onchange={(e) => { setCode(e) }}
                            value={currCode}
                        />
                    </form>
                </div>) : (<></>)
            }
            <NotSupported />
        </div >
    );

}

EditCode.getInitialProps = async (req) => {
    const id = req.query.id
    const res = await axios.get(`${process.env.DOMAIN ? process.env.DOMAIN : "https://mongshare.vercel.app"}/api/code/${id}`)
    const json = await res.data;
    return {
        authorName: json.authorName,
        language: {
            value: json.language,
            label: json.language_label,
        },
        code: json.code,
        editPass: json.edit_pass
    }
}

export default EditCode;