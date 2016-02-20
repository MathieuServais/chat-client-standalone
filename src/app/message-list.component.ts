import {Component, AfterViewInit, AfterViewChecked } from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
    selector: "message-list",
    styles: [`
    .list-group { margin:15px }
    .list-group-item { line-height:18px }
    `],
    template: `    
      <ul class="list-group">
        <li class="list-group-item" *ngFor="#message of messageList">
          <div class="media">
            <div class="media-left">
              <span class="text-primary"><{{message.nickname}}></span>
            </div>
            <div class="media-body">
              {{message.body}}
            </div>
          </div>
        </li>
      </ul>
    `
})
export class MessageListComponent implements AfterViewChecked {
  public messageList: Message[] = new Array<Message>();

  constructor(private messageService: MessageService) {
    // Subscribe event add message and clean message
    messageService.getList().subscribe(message => this.addNewMessage(message));
    messageService.cleanMessageEvent.subscribe(m => this.cleanMessages());
  }

  ngAfterViewChecked() {
    this.updateScrollToBottom();
  }

  cleanMessages() {
    this.messageList = new Array<Message>();
  }

  addNewMessage(message: Message) {
    this.messageList.push(message);
  }

  updateScrollToBottom() {
    window.scrollTo(window.scrollX, document.body.scrollHeight);
  }
}
