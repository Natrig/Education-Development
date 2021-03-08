import React from 'react';
import Ticket from '../Ticket';

import classes from './TicketContainer.module.less';
import { TicketDTO } from '../../../models/TicketDTO';

interface IProps {
  tickets: TicketDTO[],
}

const SLIZE_SIZE = 5;

const TicketContainer = (props: IProps) => {
  return (
    <div>
      {props.tickets.slice(0, SLIZE_SIZE).map(ticket =>
        <Ticket key={ticket.carrier + ticket.price.toString()} ticket={ticket}/>)}
    </div>
  );
};

export default TicketContainer;
