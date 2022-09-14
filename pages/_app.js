import { useEffect } from 'react'
import '../styles/globals.css'
import Fire from "../components/Fire"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    let _ = new Fire()
    Fire.initialize()
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
