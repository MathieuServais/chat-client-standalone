import {EventEmitter} from "angular2/core";
import {BrowserDomAdapter} from "angular2/platform/browser";
import {Message} from "./message";

export class MessageStorage {
  private static KEY_STORE: string = "messages";

  public newMessageEvent: EventEmitter<Message>;

  public constructor() {
    this.newMessageEvent = new EventEmitter();
    this.initSubscribStorageEvent();
  }

  private initSubscribStorageEvent() {
    let dom = new BrowserDomAdapter();
    let windowEvent = dom.getGlobalEventTarget("window");
    windowEvent.addEventListener("storage", (event: StorageEvent) => {
      if (event.key !== MessageStorage.KEY_STORE) return;
      let messageList: Message[] = JSON.parse(event.newValue || "[]");
      let lastMessage = messageList.pop();
      this.newMessageEvent.emit(lastMessage);
    }, false);
  }

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