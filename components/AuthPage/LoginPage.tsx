import React, { useState } from "react";
import styles from "./Auth.module.css";

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import Router from "next/router";
import { FireDB } from "../Utils/Fire";
import { User } from "../Utils/User";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUserState, setUserStripeId } from "../../store/slices/userSlice";

const mapPlans = {
  prod_MVONfIZrzdggde: "Anual",
  prod_MVONyTQecS9Hiw: "Mensual",
};

export function LoginPage({ registerInstead }) {
  const [emailInputValue, setEmailInputValue] = React.useState("");
  const [passwordInputValue, setPasswordInputValue] = React.useState("");
  const [error, setError] = useState("");
  const [stripeSubs, setStripeSubs] = useState([]);
  const [userData, setUserData] = useState<User>();
  const dispatch = useDispatch();
  const { uid } = useSelector((store: RootState) => store.user);

  const validated = () => {
    if (emailInputValue === "") {
      setError("Recuerda ingresar un correo!");
      return false;
    }

    if (passwordInputValue === "") {
      setError("Recuerda ingresar una constraseña!");
      return false;
    }

    setError("");
    return true;
  };

  const fetchCustomers = async () => {
    await fetch(
      "https://damsy-landing-arbc2iq8n-emanuelalvaradog.vercel.app/api/list-customers",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setStripeSubs(res.subscriptions.data);
      });
  };

  const loginAccount = async () => {
    if (validated()) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, emailInputValue, passwordInputValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          const plan = stripeSubs.find((el) => el.customer === user.email);
          const productId = plan?.items?.data[0]?.price?.product;

          const userData: User = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            stripeId: user.photoURL || "",
            isAdmin: false,
            plan: mapPlans[productId] || "Free",
            lastBought: 0,
            created: user.metadata.createdAt,
          };

          dispatch(setUserState(userData));

          setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(
              auth,
              emailInputValue,
              passwordInputValue
            );
          });

          Router.push("/excelai");
        })
        .catch((err) => {
          const errorCode = err.code;

          switch (errorCode) {
            case "auth/wrong-password":
              {
                setError("Usuario no encontrado, ¿lo escribiste bien?");
              }
              break;
            case "auth/user-not-found":
              {
                setError("Contraseña incorrecta, ¿la escribiste bien?");
              }
              break;
          }
        });
    }
  };

  return (
    <div className={styles.page}>
      <h1>Iniciar Sesión</h1>

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

      {error === "" ? <></> : <h2 className={styles.error}>{error}</h2>}

      <button onClick={() => loginAccount()} className={styles.continueBtn}>
        Continuar
      </button>
      <button className={styles.forgotPasswordBtn}>
        ¿Olvidaste tu contraseña?
      </button>
      <hr className={styles.smolHr} />
      <button onClick={() => registerInstead()} className={styles.greenBtn}>
        Crear una cuenta
      </button>
    </div>
  );
}
