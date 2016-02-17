import {Injector, Injectable} from "angular2/core";
import {Authentification} from "./authentification";
import {MessageService} from "./message.service";
import {Message} from "./message";

/**
 * Every command need to implement this interface
 */
export interface ICommand {
  execute(): void;
}

/**
 * Command for send message
 */
class SendMessageCommand implements ICommand {
  public static get pattern() { return "default"; }
  public constructor(private messageService: MessageService,
                     private message: Message) {}
  public execute() {
    this.messageService.add(this.message);
  }
}

/**
 * Command for cleanning the chat
 */
class CleanCommand implements ICommand {
  public static get pattern() { return "clean"; }
  public constructor(private messageService: MessageService) {}
  public execute() {
    this.messageService.deleteAll();
  }
}

/**
 * Command for changing the nickname
 */
class NickCommand implements ICommand {
  public static get pattern() { return "nick"; }
  public constructor(private authentification: Authentification,
                     private nickname: string) {}
  public execute() {
    this.authentification.setNickname(this.nickname);
  }
}

/**
 * Build a command from the user input in chat
 */
@Injectable()
export class CommandFactory {
  private commandRegex = new RegExp("^/(\\S+)[ ]*(\\S*)");

  public constructor(private authentification: Authentification,
                     private messageService: MessageService) {}

  public createFromUserInput(message: Message): ICommand {
    let cmdGroup = this.commandRegex.exec(message.body);
    let command: ICommand = null;
    if (cmdGroup !== null && cmdGroup.length >= 2)
      command = this.create(message, cmdGroup[1], cmdGroup[2]);
    // Default command = send message on chat
    console.log(command);

    if (command === null)
      command = this.create(message, SendMessageCommand.pattern);

    return command;
  }

  private create(message: Message, name: string, arg?: string): ICommand {
    switch (name) {
      case SendMessageCommand.pattern:
        return new SendMessageCommand(this.messageService, message);
      case CleanCommand.pattern:
        return new CleanCommand(this.messageService);
      case NickCommand.pattern:
        return new NickCommand(this.authentification, arg);
     // ADD new command here
    }
    return null;
  }
}