import {describe, it, expect, inject, beforeEachProviders} from "angular2/testing";
import {MessageService} from "./message.service";
import {MessageStorage} from "./message-storage";
import {Message} from "./message";

describe("MessageService", () => {
  let service: MessageService;

  describe("GetList", () => {
    it("should return a message", () => {
      let storage = new MessageStorage();
      let service = new MessageService(storage);
      let message = new Message("nick", "msg");
      spyOn(storage, "getList").and.returnValue([message]);
      let listMessage = new Array<Message>();
      service.getList().subscribe(message => {
        expect(message.body).toBe(message.body);
      });
    });
  });

  describe("Add", () => {
    it("should add message in store", () => {
      let storage = new MessageStorage();
      let service = new MessageService(storage);
      spyOn(storage, "set").and.stub();
      let message = new Message("nick1", "msg1");
      service.add(message);
      expect(storage.set).toHaveBeenCalledWith(message);
    });
  });
});