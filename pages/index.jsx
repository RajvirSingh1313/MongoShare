import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Select from "react-select";
import Head from "next/head";
import axios from "axios";

import LANGUAGES from "../utils/languages";

import Button from "../components/Button";
import Navbar from "../components/Navbar";
import NotSupported from "../components/NotSupported";
import InputBox from "../components/InputBox";
const Editor = dynamic(import("../components/Editor"), { ssr: false })

const Home = () => {
  const [authorName, setAuthorName] = useState("");
  const [language, setLanguage] = useState({ value: undefined, label: undefined });
  const [code, setCode] = useState("");
  const [editPass, setEditPass] = useState("");

  const router = useRouter();

  //errors
  const [authorNameError, setAuthorNameError] = useState(false);
  const [editPassError, setEditPassError] = useState(false);

  const isAllFieldsFilled = () => {
    return !!authorName && !!language.value && !!language.label && !!code && !!editPass;
  }

  const formHandler = (e) => {
    e.preventDefault();
    if (isAllFieldsFilled()) {
      toast.info("Please wait while we save your code", {
        autoClose: 20000
      });

      axios.post(`${process.env.DOMAIN ? process.env.DOMAIN : "https://mongshare.vercel.app"}/api/code`, {
        authorName: authorName,
        language_label: language.label,
        language: language.value,
        code: code,
        edit_pass: editPass
      })
        .then((res) => {
          router.push(`/code/${res.data.ops[0].authorName}/${res.data.ops[0]._id}`, undefined, { shallow: true })
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      toast.error("Please fill in all the fields")

      setEditPassError(!editPass);
      setAuthorNameError(!authorName)
    }
  }

  return (
    <div className="p-3 bg-gray-900">
      <ToastContainer />
      <Head>
        <title>MongShare | New Code</title>
        <meta name="description" content="Share code" />
        <meta name="title" content={`MongShare | Sharing Code With MongShare!`} />
        <meta name="image" content="/favicon.ico" />
        <meta property="og:title" content={`MongShare | Sharing Code With MongShare!`} />
        <meta property="og:description" content="Share code" />
        <meta property="og:image" content="/Banner.png" />
      </Head>
      <Navbar />
      <div className="p-10 hidden lg:block">
        <form>
          <div className="flex">
            <InputBox
              value={authorName}
              placeholder="Author Name"
              isError={authorNameError}
              onchange={(e) => { setAuthorName(e.target.value) }}
            />
            <Select
              className={`font-display w-40 h-0 m-4`}
              options={LANGUAGES}
              isSearchable={true}
              onChange={setLanguage}
              placeholder="Language"
            />
            <InputBox
              value={editPass}
              placeholder="Edit password"
              isError={editPassError}
              otherProps="mr-0"
              onchange={(e) => { setEditPass(e.target.value) }}
            />
            <div className="ml-auto">
              <Button value="Save" onclick={formHandler} otherProps="text-xl" />
            </div>
          </div>
          <Editor
            language={language.value}
            onchange={(e) => { setCode(e) }}
            value={code}
          />
        </form>
      </div>
      <NotSupported />
    </div>
  );
}

export default Home;