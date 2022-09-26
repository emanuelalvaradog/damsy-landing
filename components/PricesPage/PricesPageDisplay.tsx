import React, { useEffect, useState } from "react";
import styles from "./PricesPage.module.css";
import Router from "next/router";
import { HomeHeader } from "../HomeHeader/HomeHeader";

export function PricesPageDisplay() {
  return (
    <>
      <HomeHeader displayLogin />
      <div className={styles.pricing}>
        <h1>Incrementa tu productividad</h1>
        <p>Crea fórmulas como un experto con Damsy ExcelAI</p>
        <section className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plan Gratuito</h2>
              <p>$0</p>
            </div>
            <div className={styles.cardBenefits}>
              <h3>Acceso limitado a Damsy ExcelAI</h3>
              <ul>
                <li>Limitado a 5 fórmulas por mes</li>
                <li>Acceso limitado a historial de fórmulas</li>
              </ul>
              <button
                name="free"
                onClick={() => {
                  Router.push("/auth?login");
                }}
              >
                Comprar
              </button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plan Mensual</h2>
              <p>$99 MXN</p>
            </div>
            <div className={styles.cardBenefits}>
              <h3>Acceso completo a Damsy ExcelAI</h3>
              <ul>
                <li>Fórmulas ilimitadas</li>
                <li>Explicaciones ilimitadas</li>
                <li>Acceso completo al historial de fórmulas</li>
              </ul>
              <button
                name="monthly"
                onClick={() => {
                  Router.push("/auth?login");
                }}
              >
                Comprar
              </button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Plan Anual</h2>
              <p>$799 MXN</p>
            </div>
            <div className={styles.cardBenefits}>
              <h3>Acceso completo a Damsy ExcelAI</h3>
              <ul>
                <li>Fórmulas ilimitadas</li>
                <li>Explicaciones ilimitadas</li>
                <li>Acceso completo al historial de fórmulas</li>
              </ul>
              <button name="anual" onClick={() => Router.push("/auth?login")}>
                Comprar
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
