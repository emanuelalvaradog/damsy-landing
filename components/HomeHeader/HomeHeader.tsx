import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

export function HomeHeader({ displayLogin }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <h1>DAMSY</h1>
      </Link>

      <Link href="/precios">
        <h3>Precios</h3>
      </Link>

      {displayLogin && (
        <Link href="auth?login">
          <button>Inicia sesión</button>
        </Link>
      )}
    </header>
  );
}
