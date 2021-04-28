import React, { useEffect, useState } from 'react';
import TransferSelector from './TransferSelector';
import TicketFilter from './TicketFilter';
import TicketContainer from './TicketContainer';

import classes from './Aviasales.module.less';
import aviasales from '../../assets/aviasales.svg';
import { TicketDTO } from '../../models/TicketDTO';
import { TicketFilterBtnTypeEnum } from '../../enums/aviasales/TicketFilterBtnTypeEnum';
import TicketService from '../../services/aviasales/TicketService';
import AviasalesService, { AviasalesTicketResponse } from '../../services/AviasalesService';

const Aviasales = () => {
  const [backendTickets, setBackendTickets] = useState([] as TicketDTO[]);
  const [filterType, setFilterType] = useState(TicketFilterBtnTypeEnum.Cheapest);
  const [transferCounts, setTransferCounts] = useState([0, 1, 2, 3]);
  const [tickets, setTickets] = useState(
    TicketService.ticketSortBy(backendTickets, transferCounts, filterType).slice(0, 5));

  const loadTickets = (service: AviasalesService, prevBackendTickets: TicketDTO[]) => {
    void service.loadTickets()
      .then((response: AviasalesTicketResponse) => {
        const result = [...prevBackendTickets, ...response.tickets];

        setBackendTickets(result);

        if (!response.stop) {
          loadTickets(service, result);
        }
      });
  };

  useEffect(() => {
    const service = new AviasalesService();
    void service.initToken().then(() => loadTickets(service, backendTickets));
  }, []);

  useEffect(() => {
    setTickets(TicketService.ticketSortBy(backendTickets, transferCounts, filterType).slice(0, 5));
  }, [filterType, transferCounts, backendTickets]);

  const setType = (type: TicketFilterBtnTypeEnum) => {
    setFilterType(type);
  };

  const filterTransferTypes = (types: number[]) => {
    setTransferCounts(types);
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
