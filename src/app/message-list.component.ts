import {Component} from "angular2/core";
import {MessageService} from "./message.service";

@Component({
    selector: "message-list",
    template: `    
      <ul class="list-group">
        <li class="list-group-item" *ngFor="#message of messageList">
          {{message}}
        </li>
      </ul>
    `
})
export class MessageListComponent {
  public messageList: string[];
  constructor(private messageService: MessageService) {
    this.messageList = messageService.GetList();
  }
}
