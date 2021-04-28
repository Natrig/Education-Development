import React from 'react';
import Ticket from '../Ticket';
import { TicketDTO } from '../../../models/TicketDTO';

interface IProps {
  tickets: TicketDTO[],
}

const getKey = (ticket: TicketDTO) => {
  return ticket.carrier +
    ticket.price.toString() +
    ticket.segments.reduce((acc, curr) => acc + curr.date, '');
};

const TicketContainer = (props: IProps) => {
  return (
    <div>
      {props.tickets.map(ticket =>
        <Ticket key={getKey(ticket)} ticket={ticket}/>)}
    </div>
  );
};

export default TicketContainer;
