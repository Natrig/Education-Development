import React, { useEffect, useState } from 'react';
import { TicketDTO } from '../../models/TicketDTO';
import { TicketFilterBtnTypeEnum } from '../../enums/aviasales/TicketFilterBtnTypeEnum';
import TicketService from '../../services/aviasales/TicketService';
import AviasalesService, { AviasalesTicketResponse } from '../../services/AviasalesService';
import AviasalesContainer from './AviasalesContainer';

const Aviasales = () => {
  const [backendTickets, setBackendTickets] = useState([] as TicketDTO[]);
  const [filterType, setFilterType] = useState(TicketFilterBtnTypeEnum.Cheapest);
  const [transferCounts, setTransferCounts] = useState([0, 1, 2, 3]);
  const [tickets, setTickets] = useState(
    TicketService.ticketSortBy(backendTickets, transferCounts, filterType).slice(0, 5));

  const setType = (type: TicketFilterBtnTypeEnum) => setFilterType(type);
  const filterTransferTypes = (types: number[]) => setTransferCounts(types);

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

  return (
    <AviasalesContainer
      tickets={tickets}
      onFilterChange={setType}
      onTransferChange={filterTransferTypes}
    />
  );
};

export default Aviasales;
