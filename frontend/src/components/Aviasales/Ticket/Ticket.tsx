import React from 'react';

import classes from './Ticket.module.less';
import Detail from '../TicketDetail';

const Ticket = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.price}>
          13 400 Р
        </div>
        <div className={classes.logo_container}>
          <img src={'http://pics.avs.io/99/36/TK.png'}
            className={classes.logo}
            alt={'IATA-company-logo'}/>
        </div>
      </div>

      <div className={classes.details}>
        <Detail title={'MOW - HKT'} text={'10:45 - 08:00'}/>
        <Detail title={'В пути'} text={'21ч 15м'}/>
        <Detail title={'2 пересадки'} text={'HKG, JNB'}/>
      </div>
      <div className={classes.details}>
        <Detail title={'MOW - HKT'} text={'11:20 - 00:50'}/>
        <Detail title={'В пути'} text={'13ч 30м'}/>
        <Detail title={'1 пересадка'} text={'HKG'}/>
      </div>
    </div>
  );
};

export default Ticket;
