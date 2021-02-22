import React, { Component, ReactNode } from 'react';
import { MessageDTO } from '../../../models/MessageDTO';

type IProps = {
  messages: MessageDTO[] | null;
};

export default class MessageContainer extends Component<IProps, unknown> {
  public renderMessage = (messages: MessageDTO[]) => {
    return messages.map(msg =>
      <div key={msg.id}>{msg.id} ({msg.createDate}) : {msg.message}</div>,
    );
  };

  public render(): ReactNode {
    const { messages } = this.props;

    if (messages == null) {
      return <>No messages yet</>;
    }

    return this.renderMessage(messages);
  }
}
