
export class Authentification {
  private static DEFAULT_NICKNAME: string = "anonymous";
  public nickname: string;
  constructor() {
    this.nickname = Authentification.DEFAULT_NICKNAME;
  }
}