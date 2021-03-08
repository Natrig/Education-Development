import React from 'react';

import classes from './Ticket.module.less';
import Detail from '../Detail';
import { TicketDTO } from '../../../models/TicketDTO';
import TicketService from '../../../services/aviasales/TicketService';

const IATA_IMG_URL = 'http://pics.avs.io/99/36';

interface IProps {
  ticket: TicketDTO,
}

const renderHeader = (ticket: TicketDTO) => {
  return (
    <div className={classes.header}>
      <div className={classes.price}>
        {ticket.price.toLocaleString()} Р
      </div>
      <div>
        <img
          src={`${IATA_IMG_URL}/${ticket.carrier}.png`}
          alt={'IATA-company-logo'}
        />
      </div>
    </div>
  );
};

const renderDetails = (ticket: TicketDTO) => {
  return ticket.segments.map((segment, index) => {
    return (
      <div key={index} className={classes.details}>
        <Detail
          title={`${segment.origin} - ${segment.destination}`}
          text={TicketService.getTimeLine(segment.date, segment.duration)}
        />
        <Detail
          title={'В пути'}
          text={TicketService.getTravelTime(segment.duration)}
        />
        {
          segment.stops &&
          <Detail
            title={TicketService.getRUStopsTitle(segment.stops.length)}
            text={`${segment.stops.reduce((acc, curr) => acc += acc.length > 1 ? `, ${curr}` : curr, '')}`}
          />
        }
      </div>
    );
  });
};

const Ticket = (props: IProps) => {
  const { ticket } = props;

  return (
    <div className={classes.container}>
      {renderHeader(ticket)}
      {renderDetails(ticket)}
    </div>
  );
};

export default Ticket;
