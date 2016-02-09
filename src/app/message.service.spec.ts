import {describe, it, expect, inject, beforeEachProviders} from "angular2/testing";
import {MessageService} from "./message.service";

describe("MessageService", () => {
  let service: MessageService;

  beforeEachProviders(() => [MessageService]);

  describe("GetList", () => {
    it("should return empty array", inject([MessageService], (service: MessageService) => {
      expect(service.GetList().length).toBe(0);
    }));
  });

  describe("Add", () => {
    it("should contient 1 message", inject([MessageService], (service) => {
      service.Add("1msg");
      expect(service.messageList.length).toBe(1);
    }));
  });
});