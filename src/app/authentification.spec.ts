import {describe, it, expect, beforeEach} from "angular2/testing";
import {Authentification} from "./authentification";

describe("Authentification", () => {
  it("should have default nickname", () => {
    let auth = new Authentification();
    auth.getNickname().subscribe(nickname => {
      expect(nickname).toBe("anonymous");
    });
  });
  it("should have nickname property set", () => {
    let auth = new Authentification();
    let actual: string;
    auth.getNickname().subscribe(nickname => {
      actual = nickname;
    });
    auth.setNickname("mercadis");
    expect(actual).toBe("mercadis");
  });
});