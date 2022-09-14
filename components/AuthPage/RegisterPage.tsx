import React, { useState } from "react";
import styles from "./Auth.module.css";
import Link from 'next/link'

export function RegisterPage({loginInstead}) {

    const [nameInputValue, setNameInputValue] = React.useState("");

    const [emailInputValue, setEmailInputValue] = React.useState("");
    const [passwordInputValue, setPasswordInputValue] = React.useState("");

    const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);

    const [error, setError] = useState("");


    // There is probably a smarter way to do this
    const validated = () => {

        if(nameInputValue === ""){
            setError("No olvides ingresar tu nombre!")
            return false;
        }

        if(emailInputValue === ""){
            setError("No olvides ingresar un correo!")
            return false;
        }

        if(passwordInputValue === ""){
            setError("No olvides ingresar una contraseña!")
            return false;
        }

        if(termsOfServiceChecked === false){
            setError("Para crear una cuenta por favor acepta los términos y condiciones, así como la política de privacidad!")
            return false;
        }
        
        setError("");
        return true;
    }


    const createAccount = () => {
        if(validated()){

        }
    }

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


        <div className={styles.TOSDiv}>
            <input
            type="checkbox"
            id="topping"
            name="topping"
            value="Paneer"
            checked={termsOfServiceChecked}
            onChange={() => setTermsOfServiceChecked(!termsOfServiceChecked)}
            />

            <h3>Acepto los <Link href="/TOS"><span className={styles.spanlink}>Términos y Condiciones</span></Link>, así como la <Link href="/privacy"><span className={styles.spanlink}>Política  de privacidad</span></Link></h3>

        </div>

        {error === ""? <></> : <h2 className={styles.error}>{error}</h2>}

        <button onClick={() => createAccount()} className={styles.continueBtn}>Continuar</button>
        <hr className={styles.smolHr} />
        <h2 className={styles.suggestionText} >¿Ya tienes una cuenta?</h2>
        <button className={styles.greenBtn} onClick={() => loginInstead()}>Inicia Sesion</button>
    </div>
  );
}
