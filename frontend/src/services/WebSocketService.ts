import { MessageDTO } from "../models/MessageDTO";

export default class WebSocketService {
  private websocket: WebSocket | undefined;
  private chatMessages: MessageDTO[] = [];

  public openWebSocket(updateHandler: Function) {
    this.websocket = new WebSocket(String(process.env.REACT_APP_WEBSOCKET_ADDRESS));

    this.websocket.onmessage = (event) => {
      const chatMessagesDTO = JSON.parse(event.data);
      this.chatMessages.push(chatMessagesDTO);

      updateHandler(chatMessagesDTO);
    };
  }

  public closeWebSocket() {
    this.websocket?.close();
  }

  public sendMessage(message: MessageDTO): boolean {
    const messageJSON = JSON.stringify(message);
    this.websocket?.send(messageJSON);

    return !!this.websocket;
  }
}
