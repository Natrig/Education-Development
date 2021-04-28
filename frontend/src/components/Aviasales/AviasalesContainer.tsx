import React from 'react';
import TransferSelector from './TransferSelector';
import TicketFilter from './TicketFilter';
import TicketContainer from './TicketContainer';

import classes from './Aviasales.module.less';
import aviasales from '../../assets/aviasales.svg';
import { TicketFilterBtnTypeEnum } from '../../enums/aviasales/TicketFilterBtnTypeEnum';
import { TicketDTO } from '../../models/TicketDTO';

interface IProps {
  tickets: TicketDTO[];
  onTransferChange: (transfers: number[]) => void;
  onFilterChange: (type: TicketFilterBtnTypeEnum) => void;
}

const AviasalesContainer = ({ tickets, onFilterChange, onTransferChange }: IProps) => {
  return (
    <div className={classes.aviasales}>
      <div className={classes.logo}>
        <img src={aviasales} alt={'aviasales_logo'}/>
      </div>

      <div className={classes.content}>
        <div>
          <TransferSelector onFilter={onTransferChange}/>
        </div>
        <div>
          <TicketFilter onClick={onFilterChange}/>
          <TicketContainer tickets={tickets}/>
        </div>
      </div>
    </div>
  );
};

export default AviasalesContainer;
