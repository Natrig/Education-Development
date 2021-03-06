import React from 'react';
import Ticket from '../Ticket';

import classes from './TicketContainer.module.less';

const TicketContainer = () => {
  return (
    <div>
      <Ticket/>
      <Ticket/>
      <Ticket/>
      <Ticket/>
      <Ticket/>
    </div>
  );
};

export default TicketContainer;
