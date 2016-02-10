import {Component} from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";
import {CommandFactory, ICommand} from "./command";

@Component({
    selector: "message-add",
    template: `    
      <form (ngSubmit)="sendMessage()">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">@{{nickname}}</span>
          <input [(ngModel)]="message" class="form-control"
                  placeholder="your message..."
                  #inputMessage />
          <span class="input-group-btn">
            <button type="submit" class="btn btn-primary"
                    (click)="inputMessage.focus()">Send</button>
          </span>
        </div>
      </form>
    `,
    providers: [CommandFactory]
})
export class MessageAddComponent {
  public nickname: string;
  public message: string;

  constructor(private messageService: MessageService,
              private commandFactory: CommandFactory) {
    this.nickname = "anonymous";
  }

  public sendMessage() {
    let command = this.commandFactory.createFromUserInput(this.message);
    if (command != null) {
      if (command.name === "Nick") {
        this.nickname = command.arg1;
      }
    }
    this.messageService.add(new Message(this.nickname, this.message));
    this.cleanInput();
  }

  private cleanInput() {
    this.message = "";
  }
}
