import {Component} from "angular2/core";
import {MessageAddComponent} from "./message-add.component";

@Component({
    selector: "app",
    template: `<message-add></message-add>`,
    directives: [MessageAddComponent]
})
export class AppComponent { }
