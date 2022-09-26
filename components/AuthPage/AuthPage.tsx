import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const enum AuthPageName {
  LOGIN,
  REGISTER,
  NONE,
}

export function AuthPage() {
  const auth = getAuth();
  const router = useRouter();

  const [currentAuthPage, setCurrentAuthPage] = useState(AuthPageName.REGISTER);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
      setCurrentAuthPage(AuthPageName.NONE);
    } else {
      if (user === null) {
        // check if url is /auth?login or /auth?register
        if (router.asPath.includes("login")) {
          setCurrentAuthPage(AuthPageName.LOGIN);
        } else {
          setCurrentAuthPage(AuthPageName.REGISTER);
        }
      } else {
        router.push("/excelai");
      }
    }
  }, [loading]);

  const loginInstead = () => {
    setCurrentAuthPage(AuthPageName.LOGIN);
  };

  const registerInstead = () => {
    setCurrentAuthPage(AuthPageName.REGISTER);
  };

  return (
    <div className={styles.page}>
      {currentAuthPage == AuthPageName.LOGIN ? (
        <LoginPage registerInstead={registerInstead}></LoginPage>
      ) : (
        <></>
      )}
      {currentAuthPage == AuthPageName.REGISTER ? (
        <RegisterPage loginInstead={loginInstead}></RegisterPage>
      ) : (
        <></>
      )}
    </div>
  );
}
