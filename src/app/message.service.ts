import {Injectable, EventEmitter} from "angular2/core";
import {BrowserDomAdapter} from "angular2/platform/browser";
import {Observable, Subject} from "rxjs/Rx";
import {Observer} from "rxjs/Observer";
import "rxjs/add/operator/map";
import {Message} from "./message";
import {MessageStorage} from "./message-storage";

@Injectable()
export class MessageService {
  private subject: Subject<Message>;

  public cleanMessageEvent: EventEmitter<Message>;

  public constructor(private store: MessageStorage) {
    this.subject = new Subject();
    this.cleanMessageEvent = new EventEmitter();
    this.store.newMessageEvent.subscribe(message => {
      this.subject.next(message);
    });
  }

  public getList(): Observable<Message> {
    return this.subject.merge(this.getHistory());
  }

  public add(message: Message) {
    this.subject.next(message);
    this.store.set(message);
  }

  public deleteAll() {
    this.store.delete();
    this.cleanMessageEvent.emit(null);
  }

  private getHistory() {
    return Observable.from(this.store.getList());
  }
}