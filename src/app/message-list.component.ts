import {Component, AfterViewInit } from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
    selector: "message-list",
    styles: [".list-group-item { line-height:10px }"],
    template: `    
      <ul class="list-group">
        <li class="list-group-item" *ngFor="#message of messageList">
          <span class="text-info">[{{message.nickname}}]:</span> {{message.body}}
        </li>
      </ul>
    `
})
export class MessageListComponent implements AfterViewInit {
  public messageList: Message[];
  constructor(private messageService: MessageService) {
    this.messageList = new Array<Message>();
    messageService.getList().subscribe(message => {
      this.messageList.push(message);
      this.updateScrollPosition();
    });
    messageService.cleanMessageEvent.subscribe(m => {
      this.messageList = new Array<Message>();
    });
  }
  ngAfterViewInit() {
    this.updateScrollPosition();
  }
  private updateScrollPosition() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
  }
}
