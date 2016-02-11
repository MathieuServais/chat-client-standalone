export interface ICommand {
  name: string;
  arg1: string;
  arg2: string;
}

export abstract class Command implements ICommand {
  public name: string;
  public arg1: string;
  public arg2: string;
}

class CleanCommand extends Command {
  public static get pattern() { return "clean"; }
  public get name() { return "Clean"; }
}

class NickCommand extends Command {
  public static get pattern() { return "nick"; }
  public get name() { return "Nick"; }
  public constructor(arg1: string) {
    super();
    this.arg1 = arg1;
  }
}

export class CommandFactory {
  private commandRegex = new RegExp("^/(\\S+)[ ]*(\\S*)[ ]*(\\S*)");
  public createFromUserInput(userInput: string) {
    if (!userInput.startsWith("/")) return null;
    let cmdGroup = this.commandRegex.exec(userInput);
    if (cmdGroup === null || cmdGroup.length === 0) return null;
    switch (cmdGroup[1]) {
      case CleanCommand.pattern: return new CleanCommand();
      case NickCommand.pattern: return new NickCommand(cmdGroup[2]);
    }
    return null;
  }
}