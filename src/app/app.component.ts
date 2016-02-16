import {Component} from "angular2/core";
import {MessageAddComponent} from "./message-add.component";
import {MessageListComponent} from "./message-list.component";

@Component({
    selector: "app",
    template: `
      <nav class="navbar navbar-fixed-top navbar-light bg-faded">
        <a class="navbar-brand" href="#">Chat Client Standalone</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000" target="_blank">Add user</a>
          </li>
        </ul>
      </nav>
      <div id="wrapper-static-bar">
        <message-list></message-list>
      </div>
      <message-add class="navbar-fixed-bottom"></message-add>
    `,
    directives: [MessageAddComponent, MessageListComponent]
})
export class AppComponent { }
