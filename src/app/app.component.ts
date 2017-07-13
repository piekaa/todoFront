import { Component } from '@angular/core';
import { TasksComponent} from "./tasks/tasks.component";

@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `
  , 
})
 
export class AppComponent  { name = 'Angular'; }
