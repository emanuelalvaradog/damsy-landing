import React, { useState } from "react";
import styles from "../styles/AppForm.module.css";

export default function AppForm() {
  const [formType, setFormType] = useState("Crear");
  const [explainType, setExplainType] = useState("basico");
  const [formSent, setFormSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // CALL API
    setFormSent(true);
  }

  function toggleButton(e) {
    e.preventDefault();
    setExplainType(e.target.id);
  }

  function toggleMenu(e) {
    setFormType(e.target.id);
    setFormSent(false);
  }

  return (
    <section className={styles.appForm}>
      <div className={styles.appFormData}>
        <h1>
          Inténtalo. Es <span>muy fácil</span>
        </h1>
      </div>
      <form className={styles.form}>
        <div className={styles.formMenu}>
          <button
            type="button"
            id="Crear"
            style={formType === "Crear" ? { border: "2px solid #52a444" } : {}}
            onClick={toggleMenu}
          >
            Crea una fórmula
          </button>
          <p>o</p>
          <button
            type="button"
            id="Explicar"
            style={
              formType === "Explicar" ? { border: "2px solid #52a444" } : {}
            }
            onClick={toggleMenu}
          >
            Entiende una fórmula
          </button>
        </div>
        <textarea
          disabled
          className={styles.formText}
          placeholder="Suma todos los valores de la columna A y B cuando la C sea mayor a 5"
        />

        {formType === "Explicar" && (
          <div className={styles.explainBar}>
            <p>Nivel de explicación:</p>

            <div className={styles.selectBar}>
              <div>
                <label htmlFor="basico">Basico</label>
                <button
                  style={
                    explainType === "basico"
                      ? { backgroundColor: "#52a444" }
                      : {}
                  }
                  id="basico"
                  type="button"
                  onClick={toggleButton}
                >
                  {" "}
                </button>
              </div>
              <div>
                <label htmlFor="normal">Normal</label>
                <button
                  style={
                    explainType === "normal"
                      ? { backgroundColor: "#52a444" }
                      : {}
                  }
                  id="normal"
                  type="button"
                  onClick={toggleButton}
                >
                  {" "}
                </button>
              </div>
              <div>
                <label htmlFor="detallado">Detallado</label>
                <button
                  style={
                    explainType === "detallado"
                      ? { backgroundColor: "#52a444" }
                      : {}
                  }
                  id="detallado"
                  type="button"
                  onClick={toggleButton}
                >
                  {" "}
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          className={styles.formButton}
          type="submit"
          onClick={handleSubmit}
        >
          {formType}
        </button>
      </form>
      {formSent && (
        <div className={styles.answer}>
          <h6>Tu formula:</h6>
          <p> =sum(A,B)</p>
        </div>
      )}
    </section>
  );
}
