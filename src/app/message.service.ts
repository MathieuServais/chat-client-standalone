import {Injectable} from "angular2/core";
import {Observable} from "rxjs/observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import {Message} from "./message";

@Injectable()
export class MessageService {
  private messageList: Message[];

  public constructor() {
    this.messageList = new Array<Message>();
  }

  public GetList() {
    return this.messageList;
  }

  public Add(message: Message) {
    this.messageList.push(message);
  }
}
