import React, { useState } from "react";
import styles from "./Auth.module.css";
import Link from "next/link";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { FireDB } from "../Utils/Fire";
import { User } from "../Utils/User";
import { generateUUID } from "../Utils/Utils";
import Router from "next/router";

export function RegisterPage({ loginInstead }) {
  const [nameInputValue, setNameInputValue] = React.useState("");

  const [emailInputValue, setEmailInputValue] = React.useState("");
  const [passwordInputValue, setPasswordInputValue] = React.useState("");

  const [termsOfServiceChecked, setTermsOfServiceChecked] = useState(false);

  const [error, setError] = useState("");

  // There is probably a smarter way to do this
  const validated = () => {
    if (nameInputValue === "") {
      setError("Recuerda ingresar tu nombre!");
      return false;
    }

    if (emailInputValue === "") {
      setError("Recuerda ingresar un correo!");
      return false;
    }

    if (passwordInputValue === "") {
      setError("Recuerda ingresar una contraseña!");
      return false;
    }

    if (termsOfServiceChecked === false) {
      setError(
        "Para crear una cuenta por favor acepta los términos y condiciones, así como la política de privacidad!"
      );
      return false;
    }

    setError("");
    return true;
  };

  const createAccount = () => {
    if (validated()) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
        .then((userCredential) => {
          const user = userCredential.user;
          const userRef = doc(FireDB, "users", user.uid);

          setPersistence(auth, browserSessionPersistence).then(() => {
            const userStruct: User = {
              name: nameInputValue,
              email: emailInputValue,
              isAdmin: false,
              stripeId: "",
              created: Date.now(),
              uid: generateUUID(),
              plan: "Free",
              lastBought: 0,
            };
            setDoc(userRef, userStruct).then(() => {
              Router.push("/excelai");
            });

            return signInWithEmailAndPassword(
              auth,
              emailInputValue,
              passwordInputValue
            );
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/email-already-in-use":
              {
                setError("Email ya está en uso. Intenta con uno nuevo.");
              }
              break;
            case "auth/invalid-email":
              {
                setError("Correo no valido. ¿Lo escribiste bien?");
              }
              break;
            case "auth/weak-password":
              {
                setError(
                  "Contraseá debil. Intenta agregar símbolos y números."
                );
              }
              break;
            //TODO: Set an email for Damsy.
            case "auth/operation-not-allowed":
              {
                setError("Cuenta deshabilitada, contactanos en []@gmail.com");
              }
              break;
          }
        });
    }
  };

  return (
    <div className={styles.page}>
      <h1>Registrate Gratis!🥳</h1>

      <input
        type="text"
        placeholder="Nombre completo"
        onChange={(e) => setNameInputValue(e.target.value)}
        value={nameInputValue}
      ></input>

      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmailInputValue(e.target.value)}
        value={emailInputValue}
      ></input>

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPasswordInputValue(e.target.value)}
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

        <h3>
          Acepto los{" "}
          <Link href="/TOS">
            <span className={styles.spanlink}>Términos y Condiciones</span>
          </Link>
          , así como la{" "}
          <Link href="/privacy">
            <span className={styles.spanlink}>Política de privacidad</span>
          </Link>
        </h3>
      </div>

      {error === "" ? <></> : <h2 className={styles.error}>{error}</h2>}

      <button onClick={() => createAccount()} className={styles.continueBtn}>
        Continuar
      </button>
      <hr className={styles.smolHr} />
      <h2 className={styles.suggestionText}>¿Ya tienes una cuenta?</h2>
      <button className={styles.greenBtn} onClick={() => loginInstead()}>
        Inicia Sesion
      </button>
    </div>
  );
}
