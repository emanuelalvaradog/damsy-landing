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

    const [currentAuthPage, setCurrentAuthPage] = useState(AuthPageName.LOGIN);

  return (
    <div className={styles.page}>
        {currentAuthPage == AuthPageName.LOGIN? <LoginPage></LoginPage> : <RegisterPage></RegisterPage>}
    </div>
  );
}
