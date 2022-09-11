import Image from "next/image";
import React from "react";
import styles from "./Ask.module.css";

export function AskPage({ img }) {
  return (
    <section className={styles.ask}>
      <div className={styles.askData}>
        <h1>Solo pregunta. Nosotros te respondemos</h1>
        <p>Trabaja inteligente: pregunta, copia, pega y entiende</p>
      </div>
      <div className={styles.askImg}>
        <Image layout="responsive" src={img} alt="app preview" />
      </div>
    </section>
  );
}
