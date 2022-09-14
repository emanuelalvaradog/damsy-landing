import React, { useState } from "react";
import styles from "./Auth.module.css";

export function LoginPage({registerInstead}) {

    const [emailInputValue, setEmailInputValue] = React.useState("");
    const [passwordInputValue, setPasswordInputValue] = React.useState("");

  return (
    <div className={styles.page}>
        <h1>Iniciar Sesión</h1>

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
        <button className={styles.forgotPasswordBtn}>¿Olvidaste tu contraseña?</button>
        <hr className={styles.smolHr} />
        <button  onClick={() => registerInstead()} className={styles.greenBtn}>Crear una cuenta</button>
    </div>
  );
}
