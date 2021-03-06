import React from 'react';

import classes from './Detail.module.less';

interface IProps {
  title: string,
  text: string,
}

const Detail = (props: IProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.text}>{props.text}</div>
    </div>
  );
};

export default Detail;
