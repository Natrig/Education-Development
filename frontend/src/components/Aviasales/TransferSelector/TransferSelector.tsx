import React from 'react';

import classes from './TransferSelector.module.less';

const TransferSelector = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>Количество пересадок</div>

      <div className={classes.checkbox_container}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> Все </div>
      </div>

      <div className={classes.checkbox_container}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> Без пересадок </div>
      </div>

      <div className={classes.checkbox_container}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 1 пересадка </div>
      </div>

      <div className={classes.checkbox_container}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 2 пересадки </div>
      </div>

      <div className={classes.checkbox_container}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 3 пересадки  </div>
      </div>
    </div>
  );
};

export default TransferSelector;
