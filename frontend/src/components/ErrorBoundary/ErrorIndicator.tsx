import React, { ReactElement } from 'react';
import classes from './ErrorIndicator.module.less';

type ErrorIndicatorProps = {
  error: string;
}

export const ErrorIndicator = (props: ErrorIndicatorProps): ReactElement => {
  return (
    <div className={classes.container}>
      <h1>Внимание! Возникла ошибка!</h1>
      <div>{props.error}</div>
    </div>
  );
};
