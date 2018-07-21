import { Component } from '@angular/core';
import { OrderBy } from "./pipes/orderBy.pipe";
import { Filter } from "./pipes/filter.pipe";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Llantrisant Squash Club - Upgraded';
}
