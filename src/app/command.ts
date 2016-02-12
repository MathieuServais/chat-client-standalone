import {Injector, Injectable} from "angular2/core";
import {Authentification} from "./authentification";

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
    throw Error("Not Implemented");
  }
}

class CleanCommand extends Command {
  public static get pattern() { return "clean"; }
  public get name() { return "Clean"; }
}

class NickCommand extends Command {
  public static get pattern() { return "nick"; }
  public get name() { return "Nick"; }
  public constructor(private authentification: Authentification) {
    super();
  }
  public execute() {
    this.authentification.nickname = this.arg1;
  }
}

@Injectable()
export class CommandFactory {
  private commandRegex = new RegExp("^/(\\S+)[ ]*(\\S*)[ ]*(\\S*)");
  public constructor(private authentification: Authentification) {}
  public createFromUserInput(userInput: string) {
    if (!userInput.startsWith("/")) return null;
    let cmdGroup = this.commandRegex.exec(userInput);
    if (cmdGroup === null || cmdGroup.length === 0) return null;
    switch (cmdGroup[1]) {
      case CleanCommand.pattern: return new CleanCommand();
      case NickCommand.pattern:
        let cmd = new NickCommand(this.authentification);
        cmd.arg1 = cmdGroup[2];
        return cmd;
    }
    return null;
  }
}