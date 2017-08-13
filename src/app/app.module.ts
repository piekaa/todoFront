import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks/tasks.component';
import {NewTaskComponent} from './new_task/new_task.component';
import { AppComponent }  from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpModule, JsonpModule} from '@angular/http';


const appRoutes: Routes = [
    { path: 'todo/:id', component: TasksComponent },
    { path: 'todo', component: TasksComponent },
    { path: 'todo/new/:id', component: NewTaskComponent },
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, HttpModule, JsonpModule ],
  declarations: [ AppComponent, TasksComponent, NewTaskComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
