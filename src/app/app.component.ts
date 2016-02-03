import {Component} from "angular2/core";
import {MessageAddComponent} from "./message-add.component";
import {MessageListComponent} from "./message-list.component";

@Component({
    selector: "app",
    template: `
      <message-list></message-list>
      <message-add></message-add>
    `,
    directives: [MessageAddComponent, MessageListComponent]
})
export class AppComponent { }
