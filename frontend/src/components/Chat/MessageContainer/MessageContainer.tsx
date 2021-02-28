import React, { Component, ReactNode } from 'react';
import { MessageDTO } from '../../../models/MessageDTO';
import classes from './MessageContainer.module.less';
import moment from 'moment';

type IProps = {
  messages: MessageDTO[] | null;
};

export default class MessageContainer extends Component<IProps, unknown> {
  public renderMessage = (messages: MessageDTO[]) => {
    return messages.map(msg =>
      <div key={msg.id} className={classes.message}>
        <div className={classes.message_content}>anonymous: {msg.message}</div>
        <div className={classes.message_date}>{moment(msg.createDate).format('DD.MM.yyyy hh:mm:ss')}</div>
      </div>,
    );
  };

  public render(): ReactNode {
    const { messages } = this.props;

    if (messages == null) {
      return <>No messages yet</>;
    }

    return (
      <div className={classes.container}>
        {this.renderMessage(messages)}
      </div>
    );
  }
}
