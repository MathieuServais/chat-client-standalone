import {describe, it, expect, beforeEach} from "angular2/testing";
import {CommandFactory} from "./command";

describe("CommandFactory", () => {
  let commandFactory: CommandFactory;

  beforeEach(() => {
    commandFactory = new CommandFactory();
  });

  describe("createFromUserInput", () => {
    it("should null when command is invalide", () => {
      let command = commandFactory.createFromUserInput("/fake");
      expect(command).toBeNull();
    });
    it("should null when command is invalide small", () => {
      let command = commandFactory.createFromUserInput("/");
      expect(command).toBeNull();
    });
    it("should null when is a message", () => {
      let command = commandFactory.createFromUserInput("Hello");
      expect(command).toBeNull();
    });
    it("should have a NickCommand with 1 argument", () => {
      let command = commandFactory.createFromUserInput("/nick mercadis");
      expect(command.name).toBe("Nick");
      expect(command.arg1).toBe("mercadis");
    });
    it("should have a CleanCommand without argmument", () => {
      let command = commandFactory.createFromUserInput("/clean");
      expect(command.name).toBe("Clean");
    });
  });
});