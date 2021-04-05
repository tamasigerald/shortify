import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [ data, setData ] = useState(null);
  const [ origin, setOrigin ] = useState(null);
  const [ host, setHost ] = useState(null);

  const getLocation = () => {
    if (typeof window !== undefined) {
      setOrigin(window.location.origin);
      setHost(window.location.host);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;

    axios.post('/api/shorturl/new', {url: inputValue})
    .then(res => setData(res.data))
    .catch(err => setData(err.response.data));
  }

  useEffect(getLocation, []);

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
        <form className="form" onSubmit={handleSubmit} >
          <label className="form__label">Insert link</label>
          <div>
            <input 
            className="form__input"
            name="original" 
            type="text" 
            placeholder="www.shortify.com"
            />
            <button className="btn btn--primary form_btn">Shortify</button>
          </div>
        </form>
        <div className={`grid ${data && 'response'}`}>
        {data && data.original_url ? <div className="response--success">Original url: <span><a href={`https://${data.original_url}`} target="_blank" >{data.original_url}</a></span></div> : ''}
        {data && data.short_url ? <div className="response--success">Short url: <span><a href={`${origin}/api/shorturl/${data.short_url}`} target="_blank" >{host}/{data.short_url}</a></span></div> : ''}
        {data && data.error ? <div className="response--error">{data.error}</div> : ''}
        </div>
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
