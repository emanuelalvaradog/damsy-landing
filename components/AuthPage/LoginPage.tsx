import React, { useState } from "react";
import styles from "./Auth.module.css";

export function LoginPage({registerInstead}) {

    const [emailInputValue, setEmailInputValue] = React.useState("");
    const [passwordInputValue, setPasswordInputValue] = React.useState("");

    const [error, setError] = useState("");

    const validated = () => {
        if(emailInputValue === ""){
            setError("No olvides ingresar un correo!")
            return false;
        }

        if(passwordInputValue === ""){
            setError("No olvides ingresar una contraseña!")
            return false;
        }

        setError("");
        return true;
    }

    const loginAccount = () => {
        if(validated()){

        }
    }


  return (
    <div className={styles.page}>
        <h1>Iniciar Sesión</h1>

        <input
            type="email"
            placeholder="Correo"
            onChange={e => setEmailInputValue(e.target.value)}
            value={emailInputValue}
        ></input>

        <input
            type="password"
            placeholder="Contraseña"
            onChange={e => setPasswordInputValue(e.target.value)}
            value={passwordInputValue}
        ></input>

        {error === ""? <></> : <h2 className={styles.error}>{error}</h2>}

        <button onClick={() => loginAccount()} className={styles.continueBtn}>Continuar</button>
        <button className={styles.forgotPasswordBtn}>¿Olvidaste tu contraseña?</button>
        <hr className={styles.smolHr} />
        <button  onClick={() => registerInstead()} className={styles.greenBtn}>Crear una cuenta</button>
    </div>
  );
}
