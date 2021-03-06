import React from 'react';
import TransferSelector from './TransferSelector';
import TicketFilter from './TicketFilter';
import TicketContainer from './TicketContainer';

import classes from './Aviasales.module.less';
import aviasales from '../../assets/aviasales.svg';

const Aviasales = () => {
  return (
    <div className={classes.aviasales}>
      <div className={classes.logo}>
        <img src={aviasales} alt={'aviasales_logo'}/>
      </div>

      <div className={classes.content}>
        <div className={classes.container}>
          <TransferSelector/>
        </div>
        <div className={classes.container}>
          <TicketFilter/>
          <TicketContainer/>
        </div>
      </div>
    </div>
  );
};

export default Aviasales;
