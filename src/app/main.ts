import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {MessageService} from "./message.service";

bootstrap(AppComponent, [MessageService]);
