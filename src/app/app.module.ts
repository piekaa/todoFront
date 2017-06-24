import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';

import { AppComponent }  from './app.component';

const appRoutes: Routes = [
  { path: 'tasks', component: TasksComponent },
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, TasksComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
