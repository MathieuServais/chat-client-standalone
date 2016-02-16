import {Observable, Subject} from "rxjs/Rx";

export class Authentification {
  private static DEFAULT_NICKNAME: string = "anonymous";
  private subjectNickname: Subject<string>;
  constructor() {
    this.subjectNickname = new Subject();
  }
  public getNickname(): Observable<string> {
    return this.subjectNickname.merge(Observable.of(Authentification.DEFAULT_NICKNAME));
  }
  public setNickname(nickname: string) {
    this.subjectNickname.next(nickname);
  }
}