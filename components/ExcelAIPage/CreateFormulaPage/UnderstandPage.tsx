import React, { useState } from "react";
import styles from "./CreateFormulaPage.module.css";
const { Configuration, OpenAIApi } = require("openai");
import toast, { Toaster } from "react-hot-toast";
import { HistoryInterface } from "../../Utils/History";
import { getAuth } from "firebase/auth";
import { FireDB } from "../../Utils/Fire";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const enum LevelSelector {
  BASIC,
  NORMAL,
  VERY_DETAILED,
}

export function UnderstandPage() {
  const [level, setLevel] = useState(LevelSelector.VERY_DETAILED);

  const [result, setResult] = useState("");

  const [inputValue, setInputValue] = useState("");

  function showExplanation() {
    return (
      <div>
        <Toaster />

        <div className={styles.explainHeader}>
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
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
          <h3>Explicación generada con inteligencia artificial</h3>
        </div>

        <h3 className={styles.explanation}>{result}</h3>
      </div>
    );
  }

  async function doPrompt() {
    let msg = inputValue;
    let modifier;

    switch (level) {
      case LevelSelector.BASIC: {
        modifier = "as simple as possible, in spanish.";
      }

      case LevelSelector.NORMAL: {
        modifier = "in spanish.";
      }

      case LevelSelector.VERY_DETAILED: {
        modifier = "as detailed as possible, in spanish.";
      }
    }

    // let prompt = "Explain the following excel formula: \n\n" + msg + + modifier;

    let prompt =
      'Explain the following excel formula "' + msg + '"' + modifier + "\n";

    const auth = getAuth();
    const user = auth.currentUser;
    const historyRef = doc(FireDB, "history", user.uid);

    return new Promise(async (resolve, reject) => {
      const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      let history: HistoryInterface = {
        type: "Explain",
        query: msg,
        result: response.data.choices[0].text,
        date: Date.now(),
        uid: user.uid,
      };

      let docc = {
        past: arrayUnion(history),
      };

      updateDoc(historyRef, docc);

      setResult(response.data.choices[0].text);
    });
  }

  function understandFormula() {
    toast.promise(
      doPrompt(),
      {
        loading: "Generando explicación...",
        success: "Explicación generada exitosamente!",
        error: "Ocurrio un error al generar la explicación!",
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

      <h2>Ingresa la fórmula que quieres entender.</h2>

      <input
        className={styles.understandinput}
        type="text"
        placeholder='=SUMIF(C:C, "&gt;5", A:B)'
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />

      <h2>Nivel de explicación</h2>

      <div className={styles.lvlSelector}>
        <button
          onClick={() => setLevel(LevelSelector.BASIC)}
          className={
            level === LevelSelector.BASIC
              ? styles.lvlSelected
              : styles.lvlNotSelected
          }
        >
          Básico
        </button>
        <button
          onClick={() => setLevel(LevelSelector.NORMAL)}
          className={
            level === LevelSelector.NORMAL
              ? styles.lvlSelected
              : styles.lvlNotSelected
          }
        >
          Normal
        </button>
        <button
          onClick={() => setLevel(LevelSelector.VERY_DETAILED)}
          className={
            level === LevelSelector.VERY_DETAILED
              ? styles.lvlSelected
              : styles.lvlNotSelected
          }
        >
          Muy detallado
        </button>
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={() => understandFormula()}
          className={styles.createButton}
        >
          Explicar
        </button>
      </div>

      {result !== "" ? showExplanation() : <></>}
    </div>
  );
}
