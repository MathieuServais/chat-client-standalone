import {describe, it, expect, beforeEach} from "angular2/testing";
import {Authentification} from "./authentification";

describe("Authentification", () => {
  it("should have default nickname", () => {
    let auth = new Authentification();
    expect(auth.nickname.length).toBeGreaterThan(0);
  });
  it("should have nickname property set", () => {
    let auth = new Authentification();
    auth.nickname = "mercadis";
    expect(auth.nickname).toBe("mercadis");
  });
});