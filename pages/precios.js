import React from "react";
import styles from "../styles/Pricing.module.css";
import Router from "next/router";
import { axios } from "axios";

export default function precios() {
  async function paymentHandler(e) {
    const subscription = e.target.name;
    if (subscription[1] === "free") {
      Router.push("/auth?login");
      return;
    }

    fetch("http://localhost:3000/api/checkout-sessions", {
      method: "POST",
      body: JSON.stringify({
        planId: subscription[0],
        price: subscription[1],
      }),
    });
  }

  return (
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
            <button name="free" onClick={paymentHandler}>
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
              name={["prod_MRUEhIBpz0QHAR", "price_1LibGCD1ZyZsk1mP8Cpry7o4"]}
              onClick={paymentHandler}
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
            <button
              name="price_1LibGcD1ZyZsk1mPbkdchSyC"
              onClick={paymentHandler}
            >
              Comprar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
