import {Component} from "angular2/core";
import {MessageService} from "./message.service";
import {Message} from "./message";
import {CommandFactory, ICommand} from "./command";
import {Authentification} from "./authentification";

@Component({
    selector: "message-add",
    styles: [`
    .input-group, .input-group input, .input-group button { line-height:40px }
    `],
    template: `    
      <form (ngSubmit)="sendMessage()">
        <div class="input-group">
          <span class="input-group-addon bg-primary">@{{nickname}}</span>
          <input [(ngModel)]="message" class="form-control"
                  placeholder="your message... (try /nick newNickname or /clean)"
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
  public message: string = "";

  constructor(private messageService: MessageService,
              private authentification: Authentification,
              private commandFactory: CommandFactory) {
    authentification.getNickname().subscribe(nickname => this.nickname = nickname);
  }

  public sendMessage() {
    let command = this.commandFactory.createFromUserInput(new Message(this.nickname, this.message));
    command.execute();
    this.cleanInput();
  }

  private cleanInput() {
    this.message = "";
  }
}
