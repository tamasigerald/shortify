import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [ data, setData ] = useState(null);

  const getAPI = () => {
    fetch('/api/hello')
    .then(res => res.json())
    .then(res => setData(res))
    .catch(err => console.error(err));
  }

  useEffect(getAPI, []);

  return (
    <div className="container">
      <Head>
        <title>Shortify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <h1 className="title">Shortify</h1>
      </header>

      <main className="main">
        {data && data.name}
      </main>

      <footer className="footer">
      <div>
        Made by {''}
          <a
            className="link footer__link"
            href="https://www.tamasigerald.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gerald Andrei Tamasi
          </a>
      </div>
      </footer>
    </div>
  )
}
