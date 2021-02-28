import React, { useState, useEffect } from 'react';
import logo from './assets/logo.svg';
import Chat from './components/Chat';

import classes from './App.module.less';

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
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo"/>
        <h1 className={classes.title}>{message}</h1>
      </header>
      <div className={classes.intro}>
        <Chat width={'600px'}/>
      </div>
    </div>
  );
}

export default App;
