import React, { useState } from 'react';

import classes from './TransferSelector.module.less';
import classNames from 'classnames';

interface IProps {
  onFilter: (types: number[]) => void;
}

const TransferSelector = (props: IProps) => {
  const _default = [0, 1, 2, 3];
  const [types, setTypes] = useState([..._default]);

  const click = (type: number): void => {
    let newTypes;

    if (types.includes(type)) {
      newTypes = types.filter(t => t !== type);
    } else if (type === -1) {
      newTypes = _default.every(t => types.includes(t)) ? [] : [..._default];
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
        <div className={
          classNames(
            classes.checkbox,
            _default.every(t => types.includes(t)) && classes.checkbox_active)}
        />
        <div className={classes.text}>Все</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(0)}>
        <div className={classNames(classes.checkbox, types.includes(0) && classes.checkbox_active)}/>
        <div className={classes.text}> Без пересадок</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(1)}>
        <div className={classNames(classes.checkbox, types.includes(1) && classes.checkbox_active)}/>
        <div className={classes.text}> 1 пересадка</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(2)}>
        <div className={classNames(classes.checkbox, types.includes(2) && classes.checkbox_active)}/>
        <div className={classes.text}> 2 пересадки</div>
      </div>

      <div className={classes.checkbox_container} onClick={() => click(3)}>
        <div className={classNames(classes.checkbox, types.includes(3) && classes.checkbox_active)}/>
        <div className={classes.text}> 3 пересадки</div>
      </div>
    </div>
  );
};

export default TransferSelector;
