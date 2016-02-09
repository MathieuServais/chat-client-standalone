import {Component} from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";

@Component({
    selector: "message-add",
    template: `    
      <form (ngSubmit)="sendMessage()">
        <input [(ngModel)]="message" class="form-control"
                  placeholder="your message..."
                  #inputMessage />
        <button type="submit" class="btn btn-primary"
                (click)="inputMessage.focus()">Send</button>
      </form>
    `
})
export class MessageAddComponent {
  public message: string;

  constructor(private messageService: MessageService) {}

  public sendMessage() {
    this.messageService.Add(new Message(this.message));
    this.cleanInput();
  }

  private cleanInput() {
    this.message = "";
  }
}
