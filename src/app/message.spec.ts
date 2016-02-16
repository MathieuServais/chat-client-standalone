import {describe, it, expect, beforeEach} from "angular2/testing";
import {Message} from "./message";

describe("Message", () => {
  it("should have a nickname", () => {
    let message = new Message("nick", "body of message");
    expect(message.nickname).toBe("nick");
  });
  it("should have a body", () => {
    let message = new Message("nick", "body of message");
    expect(message.body).toBe("body of message");
  });
});