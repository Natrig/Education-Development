import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './assets/logo.svg';
import Chat from './components/Chat';

import classes from './App.module.less';
import RatingSelector from './components/RatingSelector';

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

      <nav className={classes.nav}>
        <Link className={classes.nav_item} to={'/'}>Main</Link>
        <Link className={classes.nav_item} to={'/stars'}>Stars</Link>
      </nav>

      <div className={classes.intro}>
        <Route path={'/stars'}>
          <RatingSelector/>
        </Route>

        <Route exact path={'/'}>
          <Chat width={'600px'}/>
        </Route>
      </div>
    </div>
  );
}

export default App;
