import React, { useState } from 'react'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [uyam, setUyam] = useState("'sup @#$%^");
  const [isDisabled, setIsDisabled] = useState(false);

  async function sendMessage() {
    setIsDisabled(true);
    let params = {};

    if (apiKey !== "") {
      params = {
        "prompt": message,
        apiKey
      };
    } else {
      params = {
        "prompt": message
      };
    }

    setUyam("Mag alat kang hamag ka...");

    const response = await fetch("https://uyam-server.vercel.app/api/uyam", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();

    setUyam(data.message);
    setIsDisabled(false);
  }

  function handleInput(event : any) {
    setMessage(event.target.value);
  }

  function handleInputAPI(event : any) {
    setApiKey(event.target.value);
  }

  function handleEnter(event : any) {
    if (event.key == 'Enter' && message != "") {
      sendMessage();
    }
  }

  return (
    <>
      <Head>
        <title>UyamGPT</title>
        <meta name="description" content="Sarcastic and rude mofo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={inter.className}>
          <h1>UyamGPT</h1>
        </div>
        <div className={inter.className}>
          <p id="uyam">UyamGPT: <span className={styles.span}>{uyam}</span></p>
        </div>
        <div className={`${inter.className} ${styles["input-wrapper"]}`}>
          <input disabled={isDisabled} type="text" className={styles.input} onChange={handleInput} onKeyDown={handleEnter} value={message} placeholder="What's on your @#$%^&* mind?" />
          <button disabled={isDisabled} className={styles.button} onClick={sendMessage}>Send</button>
        </div>
      </main>
      <footer>
        <input type="text" onChange={handleInputAPI} value={apiKey} placeholder="Enter ChatGPT API key" />
      </footer>
    </>
  )
}
