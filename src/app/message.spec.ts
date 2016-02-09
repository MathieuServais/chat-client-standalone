import {describe, it, expect, beforeEach} from "angular2/testing";
import {Message} from "./message";

describe("Message", () => {
  let message: Message;

  beforeEach(() => {
    message = new Message("body of message");
  });

  it("should have a body", () => {
    expect(message.body).toBe("body of message");
  });
});