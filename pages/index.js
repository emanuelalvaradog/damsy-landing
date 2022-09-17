import Head from "next/head";
import styles from "../styles/Home.module.css";
import appPreview from "../public/app-preview-1.png";
import { HomePage, AskPage, HomeHeader } from "../components/";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DAMSY</title>
        <meta name="description" content="Don't deal with data, talk to it" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeHeader displayLogin />

      <main className={styles.main}>
        <HomePage img={appPreview} />
        <AskPage img={appPreview} />
      </main>
    </div>
  );
}
