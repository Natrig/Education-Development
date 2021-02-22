import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import './App.css';
import Chat from './components/Chat';

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
      <div className="App-intro">
        <Chat width={'600px'}/>
      </div>
    </div>
  );
}

export default App;
