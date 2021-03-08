import React, { useState } from 'react';

import classes from './TransferSelector.module.less';

interface IProps {
  onFilter: (types: number[]) => void;
}

const TransferSelector = (props: IProps) => {
  const [types, setTypes] = useState([0, 1, 2, 3]);

  const click = (type: number): void => {
    let newTypes;

    if (types.includes(type)) {
      newTypes = types.filter(t => t !== type);
    } else if (type === -1) {
      newTypes = [0, 1, 2, 3];
    } else {
      newTypes = [...types, type];
    }

    setTypes(newTypes);
    props.onFilter(newTypes);
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>Количество пересадок</div>

      <div className={classes.checkbox_container} onClick={() => click(-1)}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> Все</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(0)}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> Без пересадок</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(1)}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 1 пересадка</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(2)}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 2 пересадки</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(3)}>
        <div className={classes.checkbox}></div>
        <div className={classes.text}> 3 пересадки</div>
      </div>
    </div>
  );
};

export default TransferSelector;
