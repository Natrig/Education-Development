import React, { Component, ReactNode, SyntheticEvent } from 'react';
import { MessageDTO } from '../../../models/MessageDTO';
import classes from './MessageSender.module.less';

type IState = {
  text?: string;
  error?: string;
};

type IProps = {
  onSend: (message: MessageDTO) => boolean,
};

export default class MessageSender extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      text: '',
    };
  }

  public onChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;

    this.setState({
      text: target.value,
    });
  };

  public onClick = (): void => {
    if (!this.state.text) {
      return;
    }

    const message = { message: this.state.text } as MessageDTO;
    const isSuccess = this.props.onSend(message);

    if (isSuccess) {
      this.setState({
        text: '',
        error: '',
      });
    } else {
      this.setState({
        error: 'Cannot send the message. Something went wrong.',
      });
    }
  };

  public render(): ReactNode {
    return (
      <div className={classes.container}>
        <input value={this.state.text} onChange={this.onChange}/>
        <button onClick={this.onClick} className={classes.button}>Send message</button>
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}
