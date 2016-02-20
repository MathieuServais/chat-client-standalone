import {Component} from "angular2/core";
import {HeaderComponent} from "./header.component";
import {MessageListComponent} from "./message-list.component";
import {MessageAddComponent} from "./message-add.component";


@Component({
    selector: "app",
    template: `
      <header></header>
      <div id="wrapper-static-bar">
        <message-list></message-list>
      </div>
      <message-add class="navbar-fixed-bottom"></message-add>
    `,
    directives: [MessageAddComponent, MessageListComponent, HeaderComponent]
})
export class AppComponent {}
