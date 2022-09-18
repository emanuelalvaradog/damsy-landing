import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const enum AuthPageName {
  LOGIN,
  REGISTER,
}

// TODO: if someone goes to /auth and is already logged in, redirect to /excelai
// TODO: implement secure routes

export function AuthPage() {
  const router = useRouter();
  const [currentAuthPage, setCurrentAuthPage] = useState(AuthPageName.REGISTER);
  const { uid } = useSelector((store) => store.user);

  useEffect(() => {
    // check if url is /auth?login or /auth?register
    if (router.asPath.includes("login")) {
      setCurrentAuthPage(AuthPageName.LOGIN);
    } else {
      setCurrentAuthPage(AuthPageName.REGISTER);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      console.log(uid);
      console.log("logged-in");
      router.push("/excelai");
    }
  });
  // check if user is already logged in and redirect to app if true

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
        <RegisterPage loginInstead={loginInstead}></RegisterPage>
      )}
    </div>
  );
}
