import React, { useState } from "react";
import styles from "./Auth.module.css";

export function RegisterPage({loginInstead}) {

    const [nameInputValue, setNameInputValue] = React.useState("");

    const [emailInputValue, setEmailInputValue] = React.useState("");
    const [passwordInputValue, setPasswordInputValue] = React.useState("");

  return (
    <div className={styles.page}>
        <h1>Registrate Gratis!🥳</h1>

        <input
            type="text"
            placeholder="Nombre completo"
            onChange={e => setNameInputValue(e.target.value)}
            value={nameInputValue}
        ></input>

        <input
            type="text"
            placeholder="Correo"
            onChange={e => setEmailInputValue(e.target.value)}
            value={emailInputValue}
        ></input>

        <input
            type="text"
            placeholder="Contraseña"
            onChange={e => setPasswordInputValue(e.target.value)}
            value={passwordInputValue}
        ></input>

        <button className={styles.continueBtn}>Continuar</button>
        <hr className={styles.smolHr} />
        <h2 className={styles.suggestionText} >¿Ya tienes una cuenta?</h2>
        <button className={styles.greenBtn} onClick={() => loginInstead()}>Inicia Sesion</button>
    </div>
  );
}
