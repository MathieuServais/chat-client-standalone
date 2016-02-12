import {bootstrap}    from "angular2/platform/browser";
import {AppComponent} from "./app.component";
import {MessageService} from "./message.service";
import {MessageStorage} from "./message-storage";
import {Authentification} from "./authentification";

bootstrap(AppComponent, [MessageService, MessageStorage, Authentification]);
