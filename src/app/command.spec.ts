import {describe, it, expect, beforeEach} from "angular2/testing";
import {CommandFactory} from "./command";
import {Authentification} from "./authentification";
import {MessageService} from "./message.service";
import {MessageStorage} from "./message-storage";
import {Message} from "./message";

describe("CommandFactory", () => {
  describe("createFromUserInput", () => {
    it("should send a message when is not a valide command", () => {
      let messageService = new MessageService(new MessageStorage());
      spyOn(messageService, "add").and.stub();
      let commandFactory = new CommandFactory(null, messageService);
      let command = commandFactory.createFromUserInput(new Message("", "/helo"));
      command.execute();
      expect(messageService.add).toHaveBeenCalled();
    });
    it("should change nickname with NickCommand", () => {
      let authentification = new Authentification();
      let commandFactory = new CommandFactory(authentification, null);
      let command = commandFactory.createFromUserInput(new Message("", "/nick mercadis"));
      let actualNickname: string;
      authentification.getNickname().subscribe(nickname => {
       actualNickname = nickname;
      });
      command.execute();
      expect(actualNickname).toBe("mercadis");
    });
    it("should delete all messages with CleanCommand", () => {
      let messageService = new MessageService(new MessageStorage());
      spyOn(messageService, "deleteAll").and.stub();
      let commandFactory = new CommandFactory(null, messageService);
      let command = commandFactory.createFromUserInput(new Message("", "/clean"));
      command.execute();
      expect(messageService.deleteAll).toHaveBeenCalled();
    });
  });
});