import React, { useEffect, useState } from "react";
import styles from "./CreateFormulaPage.module.css";
const { Configuration, OpenAIApi } = require("openai");
import toast, { Toaster } from "react-hot-toast";
import { HistoryInterface } from "../../Utils/History";
import { getAuth } from "firebase/auth";
import { FireDB } from "../../Utils/Fire";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI,
});

const openai = new OpenAIApi(configuration);

export function CreatePage() {
  const [formulaInputValue, setFormulaInputValue] = useState("");

  const [formulaResult, setFormulaResult] = useState("");

  function showFormulaResult() {
    return (
      <div className={styles.result}>
        <h3>Tu fórmula es:</h3>
        <div className={styles.resultformula}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#32936F"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
            />
          </svg>

          <h3> ${formulaResult} </h3>
        </div>
      </div>
    );
  }

  async function req() {
    // let msg = "Sum first ten items of row A and row B and place them in row C.";
    let msg = formulaInputValue;
    // let prompt =
    //   "Generate an excel formula and don´t reply with something that isn't a formula using the format above for: \n\n{input: " +
    //   msg +
    //   "}";


    let prompt = "Generate an excel formula using spanish version that \"" + msg + "\"";
    
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setFormulaResult(response.data.choices[0].text);
  }

  async function doPrompt() {
    let msg = formulaInputValue;
    // let prompt = "Generate an excel formula and don't reply with something that isn't a formula using the format above for the following: \n\n{input: " + msg + "}";

    const auth = getAuth();
    const user = auth.currentUser;
    const historyRef = doc(FireDB, "history", user.uid);

    // let prompt =
    //   "Generate an excel formula and don´t reply with something that isn't a formula using the format above for the following: {input: \"" +
    //   msg +
    //   '"}';
    let prompt = "Generate an excel formula using spanish version that \"" + msg + "\"";

    return new Promise(async (resolve, reject) => {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      let history: HistoryInterface = {
        type: "Formula",
        query: msg,
        result: response.data.choices[0].text,
        date: Date.now(),
        uid: user.uid,
      };

      let docc = {
        past: arrayUnion(history),
      };

      const dsnap = getDoc(historyRef).then(doc => {
        if(doc.exists()){
          updateDoc(historyRef, docc);
        }else{
          setDoc(historyRef, docc)
        }
      })

      setFormulaResult(response.data.choices[0].text);
      resolve("listo!");
    });
  }

  function createFormula() {
    toast.promise(
      doPrompt(),
      {
        loading: "Generando formula...",
        success: "Formula generada exitosamente!",
        error: "Ocurrio un error al generar la formula!",
      },
      {
        style: {
          fontSize: "1.25rem",
        },
      }
    );
  }

  return (
    <div className={styles.createPage}>
      <Toaster />

      <h2>
        Ingresa la fórmula que quieres crear, intenta ser lo más especifico
        posible, mencionando las columnas y celdas.
      </h2>

      <textarea
        name="Formula Description"
        id="formdesc"
        value={formulaInputValue}
        onChange={(e) => setFormulaInputValue(e.target.value)}
        placeholder="Suma todos los valores de la columna A y la columna B cuando la columna C sea mayor que 5"
      ></textarea>

      <div className={styles.buttonContainer}>
        <button onClick={() => createFormula()} className={styles.createButton}>
          Crear
        </button>
      </div>
      {formulaResult !== "" ? showFormulaResult() : <></>}
    </div>
  );
}
