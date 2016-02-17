import {Component} from "angular2/core";

@Component({
    selector: "header",
    template: `
      <nav class="navbar navbar-fixed-top navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Chat Client Standalone</a>
        <ul class="nav navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/" target="_blank">Add user</a>
          </li>
        </ul>
      </nav>
    `,
})
export class HeaderComponent {
}
