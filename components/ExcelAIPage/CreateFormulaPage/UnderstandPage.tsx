import React, { useState } from "react";
import styles from "./CreateFormulaPage.module.css";

const enum LevelSelector {
  BASIC,
  NORMAL,
  VERY_DETAILED,
}

export function UnderstandPage() {
  const [level, setLevel] = useState(LevelSelector.VERY_DETAILED);

  const [result, setResult] = useState("");

  function showExplanation() {
    return (
      <div>
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

        <h3 className={styles.explanation}>
          Lorem ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam
          ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum
          dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor
          bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam
          ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum
          dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor
          bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam
          ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum
          dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor bam ipsum dolor
          baskjnafsklfjaslkfj
        </h3>
      </div>
    );
  }

  return (
    <div className={styles.createPage}>
      <h2>Ingresa la fórmula que quieres entender.</h2>

      <input
        className={styles.understandinput}
        type="text"
        placeholder='=SUMIF(C:C, "&gt;5", A:B)'
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
        <button className={styles.createButton}>Explicar</button>
      </div>

      {result !== "" ? showExplanation() : <></>}
    </div>
  );
}
