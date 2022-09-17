import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { useRouter } from 'next/router';


const enum AuthPageName {
    LOGIN,
    REGISTER
}

// TODO: if someone goes to /auth and is already logged in, redirect to /excelai
// TODO: implement secure routes 

export function AuthPage() {
    const { asPath } = useRouter()
    const [currentAuthPage, setCurrentAuthPage] = useState(AuthPageName.REGISTER);

    useEffect(() => {
        // check if url is /auth?login or /auth?register
        if(asPath.includes("login")){
            setCurrentAuthPage(AuthPageName.LOGIN)
        }else{
            setCurrentAuthPage(AuthPageName.REGISTER)
        }
    }, [])

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
