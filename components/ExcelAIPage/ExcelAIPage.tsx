import React from "react";
import { CreateFormulaPage } from "./CreateFormulaPage/CreateFormulaPage";

import styles from "./ExcelAIPage.module.css";
import { HistoryPage } from "./HistoryPage/HistoryPage";
import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
import { MyAccountPage } from "./MyAccountPage/MyAccountPage";

const enum Screens {
  CREATE_FORMULA,
  HISTORY,
  ACCOUNT,
}

export function ExcelAIPage() {
  const [currentScreen, setCurrentScreen] = React.useState(Screens.HISTORY);
  const auth = getAuth();

  function handleSignOut() {
    signOut(auth);
    Router.push("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <h1 className={styles.title}>Menú</h1>
        <hr className={styles.smallhr} />

        <div
          className={styles.item}
          onClick={() => setCurrentScreen(Screens.CREATE_FORMULA)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={
              currentScreen === Screens.CREATE_FORMULA ? "#32936F" : "#8C9099"
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
          <h1
            className={
              currentScreen === Screens.CREATE_FORMULA
                ? styles.itemSelected
                : styles.itemNotSelected
            }
          >
            Crear formula
          </h1>
        </div>

        <div
          className={styles.item}
          onClick={() => setCurrentScreen(Screens.HISTORY)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={currentScreen === Screens.HISTORY ? "#32936F" : "#8C9099"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1
            className={
              currentScreen === Screens.HISTORY
                ? styles.itemSelected
                : styles.itemNotSelected
            }
          >
            Historial
          </h1>
        </div>

        <div
          className={styles.item}
          onClick={() => setCurrentScreen(Screens.ACCOUNT)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={currentScreen === Screens.ACCOUNT ? "#32936F" : "#8C9099"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h1
            className={
              currentScreen === Screens.ACCOUNT
                ? styles.itemSelected
                : styles.itemNotSelected
            }
          >
            Mi cuenta
          </h1>
          <div className={styles.item} onClick={handleSignOut}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#8C9099"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>

            <h1 className={styles.itemNotSelected}>Cerrar sesión</h1>
          </div>

          <div className={styles.secondPannel}>
            {currentScreen === Screens.CREATE_FORMULA ? (
              <CreateFormulaPage />
            ) : (
              <></>
            )}
            {currentScreen === Screens.HISTORY ? <HistoryPage /> : <></>}
            {currentScreen === Screens.ACCOUNT ? <MyAccountPage /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
}
