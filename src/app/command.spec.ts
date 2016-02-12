import {describe, it, expect, beforeEach} from "angular2/testing";
import {CommandFactory} from "./command";
import {Authentification} from "./authentification";
import {MessageService} from "./message.service";
import {MessageStorage} from "./message-storage";

describe("CommandFactory", () => {
  describe("createFromUserInput", () => {
    it("should null when command is invalide", () => {
      let commandFactory = new CommandFactory(null, null);
      let command = commandFactory.createFromUserInput("/fake");
      expect(command).toBeNull();
    });
    it("should null when command is invalide small", () => {
      let commandFactory = new CommandFactory(null, null);
      let command = commandFactory.createFromUserInput("/");
      expect(command).toBeNull();
    });
    it("should null when is a message", () => {
      let commandFactory = new CommandFactory(null, null);
      let command = commandFactory.createFromUserInput("Hello");
      expect(command).toBeNull();
    });
    it("should change nickname with NickCommand", () => {
      let authentification = new Authentification();
      let commandFactory = new CommandFactory(authentification, null);
      let command = commandFactory.createFromUserInput("/nick mercadis");
      command.execute();
      expect(command.name).toBe("Nick");
      expect(authentification.nickname).toBe("mercadis");
    });
    it("should delete all messages with CleanCommand", () => {
      let messageService = new MessageService(new MessageStorage());
      spyOn(messageService, "deleteAll").and.stub();
      let commandFactory = new CommandFactory(null, messageService);
      let command = commandFactory.createFromUserInput("/clean");
      command.execute();
      expect(command.name).toBe("Clean");
      expect(messageService.deleteAll).toHaveBeenCalled();
    });
  });
});