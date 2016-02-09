import {Component} from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
    selector: "message-list",
    template: `    
      <ul class="list-group">
        <li class="list-group-item" *ngFor="#message of messageList">
          {{message.body}}
        </li>
      </ul>
    `
})
export class MessageListComponent {
  public messageList: Message[];
  constructor(private messageService: MessageService) {
    this.messageList = messageService.GetList();
  }
}
