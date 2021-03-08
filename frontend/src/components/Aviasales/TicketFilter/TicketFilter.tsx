import React, { useState } from 'react';

import classes from './TicketFilter.module.less';
import classNames from 'classnames';
import { TicketFilterBtnTypeEnum } from '../../../enums/aviasales/TicketFilterBtnTypeEnum';

interface IProps {
  onClick: (type: TicketFilterBtnTypeEnum) => void;
}

const TicketFilter = (props: IProps) => {
  const [activeType, setActiveType] = useState(TicketFilterBtnTypeEnum.Cheapest);

  const click = (type: TicketFilterBtnTypeEnum): void => {
    props.onClick(type);
    setActiveType(type);
  };

  return (
    <div className={classes.container}>
      <div
        onClick={() => click(TicketFilterBtnTypeEnum.Cheapest)}
        className={classNames(classes.button, activeType === TicketFilterBtnTypeEnum.Cheapest && classes.active)}>
        Самый дешевый
      </div>
      <div
        onClick={() => click(TicketFilterBtnTypeEnum.Fastest)}
        className={classNames(classes.button, activeType === TicketFilterBtnTypeEnum.Fastest && classes.active)}>
        Самый быстрый
      </div>
    </div>
  );
};

export default TicketFilter;
