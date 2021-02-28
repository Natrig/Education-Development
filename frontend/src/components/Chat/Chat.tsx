import React, { Component, ReactNode } from 'react';
import MessageContainer from './MessageContainer';
import MessageSender from './MessageSender';

import classes from './Chat.module.less';
import WebSocketService from '../../services/WebSocketService';
import { MessageDTO } from '../../models/MessageDTO';

type IProps = {
  width: string;
}

type IState = {
  messages: MessageDTO[];
}

export default class Chat extends Component<IProps, IState> {
  private webSocketService: WebSocketService;

  constructor(props: IProps) {
    super(props);
    this.state = {
      messages: [],
    };

    this.webSocketService = new WebSocketService();
  }

  updateMessages = (message: MessageDTO): void => {
    this.setState((prev) => {
      return {
        messages: [...prev.messages, message],
      };
    });
  };

  sendMessage = (message: MessageDTO): boolean => {
    return this.webSocketService.sendMessage(message);
  };

  componentDidMount(): void {
    this.webSocketService.openWebSocket(this.updateMessages);
  }

  componentWillUnmount(): void {
    this.webSocketService.closeWebSocket();
  }

  public render(): ReactNode {
    return (
      <div className={classes.container} style={{ width: this.props.width }}>
        <MessageContainer messages={this.state.messages}/>
        <MessageSender onSend={this.sendMessage}/>
      </div>
    );
  }
}
