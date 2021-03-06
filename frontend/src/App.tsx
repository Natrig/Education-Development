import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import logo from './assets/logo.svg';
import Chat from './components/Chat';

import classes from './App.module.less';
import RatingSelector from './components/RatingSelector';
import Aviasales from './components/Aviasales';

// https://github.com/KosyanMedia/Front-end_TP_test/tree/2f7367956e00233b0a85a4501cb66d8d81865ca0
// https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend

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
        <Link className={classes.nav_item} to={'/'}>WebSocket</Link>
        <Link className={classes.nav_item} to={'/stars'}>Stars</Link>
        <Link className={classes.nav_item} to={'/aviasales'}>Aviasales</Link>
        <Link className={classes.nav_item} to={'/graphQL'}>GraphQL</Link>
        <Link className={classes.nav_item} to={'/redux'}>Redux</Link>
      </nav>

      <div className={classes.intro}>
        <Route path={'/aviasales'}>
          <Aviasales/>
        </Route>

        <Route path={'/redux'}>
          <div>Hello REDUX-RESELECT-MEMO</div>
        </Route>

        <Route path={'/graphQL'}>
          <div>Hello GraphQL</div>
        </Route>

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
