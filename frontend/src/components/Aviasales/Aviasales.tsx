import React, { useState } from 'react';
import TransferSelector from './TransferSelector';
import TicketFilter from './TicketFilter';
import TicketContainer from './TicketContainer';

import classes from './Aviasales.module.less';
import aviasales from '../../assets/aviasales.svg';
import { TicketDTO } from '../../models/TicketDTO';
import { TicketFilterBtnTypeEnum } from '../../enums/aviasales/TicketFilterBtnTypeEnum';

let backendTickets = [
  {
    price: 13400,
    carrier: 'S7',
    segments: [
      {
        origin: 'MOW',
        destination: 'CIT',
        date: '2021-03-16T04:52:00.000Z',
        stops: [
          'HKG', 'ALA',
        ],
        duration: 110,
      },
      {
        origin: 'CIT',
        destination: 'MOW',
        date: '2021-04-05T10:59:00.000Z',
        stops: [],
        duration: 140,
      },
    ],
  },
  {
    price: 25400,
    carrier: 'BA',
    segments: [
      {
        origin: 'KZN',
        destination: 'HKG',
        date: '2021-03-16T04:52:00.000Z',
        stops: [
          'MOW',
        ],
        duration: 120,
      },
      {
        origin: 'HKG',
        destination: 'KZN',
        date: '2021-04-05T10:59:00.000Z',
        stops: [
          'UKY', 'ALA',
        ],
        duration: 100,
      },
    ],
  },
  {
    price: 12400,
    carrier: 'KC',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-03-16T04:52:00.000Z',
        stops: [
          'HKG', 'ALA',
        ],
        duration: 45,
      },
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-04-05T10:59:00.000Z',
        stops: [
          'HKG', 'ALA',
        ],
        duration: 50,
      },
    ],
  },
  {
    price: 11400,
    carrier: 'DV',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-03-16T04:52:00.000Z',
        stops: [
          'HKG', 'ALA',
        ],
        duration: 100,
      },
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-04-05T10:59:00.000Z',
        stops: [
          'HKG',
        ],
        duration: 100,
      },
    ],
  },
  {
    price: 13400,
    carrier: 'AA',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-03-16T04:52:00.000Z',
        stops: [],
        duration: 90,
      },
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-03-17T10:59:00.000Z',
        stops: [],
        duration: 90,
      },
    ],
  },
  {
    price: 10400,
    carrier: 'AA',
    segments: [
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-03-16T04:52:00.000Z',
        stops: [],
        duration: 180,
      },
      {
        origin: 'MOW',
        destination: 'HKG',
        date: '2021-04-05T10:59:00.000Z',
        stops: [],
        duration: 150,
      },
    ],
  },
] as TicketDTO[];

const Aviasales = () => {
  const [tickets, setTickets] = useState(backendTickets
    .sort((a, b) => a.price - b.price).slice(0, 5));

  const setType = (type: TicketFilterBtnTypeEnum) => {
    switch (type) {
      case TicketFilterBtnTypeEnum.Cheapest:
        backendTickets = backendTickets.sort((a, b) =>
          a.price - b.price);

        setTickets(backendTickets.slice(0, 5));
        break;
      case TicketFilterBtnTypeEnum.Fastest:
        backendTickets = backendTickets.sort((a, b) =>
          a.segments[0].duration - b.segments[0].duration);

        setTickets(backendTickets.slice(0, 5));
        break;
    }
  };

  const filterTransferTypes = (types: number[]) => {
    console.log('types', types);
    setTickets(backendTickets.filter(ticket => types.includes(ticket.segments[0].stops.length)));
  };

  return (
    <div className={classes.aviasales}>
      <div className={classes.logo}>
        <img src={aviasales} alt={'aviasales_logo'}/>
      </div>

      <div className={classes.content}>
        <div className={classes.container}>
          <TransferSelector onFilter={filterTransferTypes}/>
        </div>
        <div className={classes.container}>
          <TicketFilter onClick={setType}/>
          <TicketContainer tickets={tickets}/>
        </div>
      </div>
    </div>
  );
};

export default Aviasales;
