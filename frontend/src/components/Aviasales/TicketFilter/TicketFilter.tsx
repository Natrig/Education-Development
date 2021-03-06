import React from 'react';

import classes from './TicketFilter.module.less';
import classNames from 'classnames';

const TicketFilter = () => {
  return (
    <div className={classes.container}>
      <div className={classNames(classes.button, classes.active)}>Самый дешевый</div>
      <div className={classes.button}>Самый быстрый</div>
    </div>
  );
};

export default TicketFilter;
