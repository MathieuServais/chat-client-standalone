import { Injectable } from "angular2/core";
import { Observable } from "rxjs/observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MessageService {
  private messageList: string[];

  public constructor() {
    this.messageList = new Array<string>();
  }

  public Add(message: string) {
    this.messageList.push(message);
    console.log(this.messageList);
  }
}
