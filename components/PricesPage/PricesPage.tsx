import React, { useEffect, useState } from "react";
import styles from "./PricesPage.module.css";
import Router from "next/router";
import { RootState } from "../../store/store";
import { stripeCheckout } from "./stripeCheckout";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export function PricesPage() {
  const auth = getAuth();
  const { email } = useSelector((store: RootState) => store.user);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user === null) Router.push("/");
  }, []);

  return (
    <>
      <div className={styles.pricing}>
        <section className={styles.cards}>
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
                onClick={() =>
                  stripeCheckout({
                    lineItems: [
                      {
                        price: "price_1LmNaWD1ZyZsk1mPPxSfTAN0",
                        quantity: 1,
                      },
                    ],
                    userEmail: email,
                  })
                }
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
                name="anual"
                onClick={() =>
                  stripeCheckout({
                    lineItems: [
                      {
                        price: "price_1LmNaQD1ZyZsk1mPnhXR47iX",
                        quantity: 1,
                      },
                    ],
                    userEmail: email,
                  })
                }
              >
                Comprar
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
