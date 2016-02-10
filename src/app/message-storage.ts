import {Message} from "./message";

export class MessageStorage {
  private static KEY_STORE: string = "messages";

  public getList(): Message[] {
    return JSON.parse(localStorage.getItem(MessageStorage.KEY_STORE) || "[]");
  }

  public set(message: Message) {
    let messageList = this.getList();
    messageList.push(message);
    this.setList(messageList);
  }

  public setList(messageList: Message[]) {
     localStorage.setItem(MessageStorage.KEY_STORE, JSON.stringify(messageList));
  }

  public delete() {
    localStorage.removeItem(MessageStorage.KEY_STORE);
  }
}