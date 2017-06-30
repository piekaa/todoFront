import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';
import {NewTaskComponent} from './new_task/new_task.component';
import { AppComponent }  from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'todo', component: TasksComponent },
  { path: 'todo/new', component: NewTaskComponent },
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule ],
  declarations: [ AppComponent, TasksComponent, NewTaskComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
