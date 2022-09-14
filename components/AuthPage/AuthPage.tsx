import React, { useState } from "react";
import styles from "./Auth.module.css";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

enum AuthPageName {
    LOGIN,
    REGISTER
}

// TODO: if someone goes to /auth and is already logged in, redirect to /excelai
// TODO: implement secure routes 

export function AuthPage() {

    const [currentAuthPage, setCurrentAuthPage] = useState(AuthPageName.REGISTER);

    const loginInstead = () => {
        setCurrentAuthPage(AuthPageName.LOGIN)
    };

    const registerInstead = () => {
        setCurrentAuthPage(AuthPageName.REGISTER)
    };

  return (
    <div className={styles.page}>
        {currentAuthPage == AuthPageName.LOGIN? <LoginPage registerInstead={registerInstead}></LoginPage> : <RegisterPage loginInstead={loginInstead}></RegisterPage>}
    </div>
  );
}
