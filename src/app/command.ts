import {Injector, Injectable} from "angular2/core";
import {Authentification} from "./authentification";
import {MessageService} from "./message.service";

export interface ICommand {
  name: string;
  arg1: string;
  arg2: string;
  execute(): void;
}

export abstract class Command implements ICommand {
  public name: string;
  public arg1: string;
  public arg2: string;
  public execute() {
    throw Error("Abstract method");
  }
}

/**
 * Command for cleanning the chat
 */
class CleanCommand extends Command {
  public static get pattern() { return "clean"; }
  public get name() { return "Clean"; }
  public constructor(private messageService: MessageService) {
    super();
  }
  public execute() {
    this.messageService.deleteAll();
  }
}

/**
 * Command for changing the nickname
 */
class NickCommand extends Command {
  public static get pattern() { return "nick"; }
  public get name() { return "Nick"; }
  public constructor(private authentification: Authentification) {
    super();
  }
  public execute() {
    this.authentification.setNickname(this.arg1);
  }
}

/**
 * Build a command from the user input in chat
 */
@Injectable()
export class CommandFactory {
  private commandRegex = new RegExp("^/(\\S+)[ ]*(\\S*)[ ]*(\\S*)");

  public constructor(private authentification: Authentification,
                     private messageService: MessageService) {}

  public createFromUserInput(userInput: string): ICommand {
    if (!userInput.startsWith("/")) return null;
    let cmdGroup = this.commandRegex.exec(userInput);
    if (cmdGroup === null || cmdGroup.length === 0) return null;

    return this.create(cmdGroup[1], cmdGroup[2], cmdGroup[3]);
  }

  private create(name: string, arg1: string, arg2: string): ICommand {
    switch (name) {
      case CleanCommand.pattern:
        return new CleanCommand(this.messageService);
      case NickCommand.pattern:
        let cmd = new NickCommand(this.authentification);
        cmd.arg1 = arg1;
        return cmd;
    }
    return null;
  }
}