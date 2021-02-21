import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('/rest/hello')
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">{message}</h1>
      </header>
      <p className="App-intro">
        To geta started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

export default App;
