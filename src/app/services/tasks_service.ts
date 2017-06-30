import {Injectable} from '@angular/core';
import {Task} from '../model/task';

@Injectable()
export class TasksService
{
 
	getTask() : Task
	{
		let task  : Task = new Task();
		task.name = "Siemke";
		task.description = "To jest jakis tam testowy task";
		task.timestamp = new Date().getTime();
		task.isDone = true;
		return task;
	}

	test(): string
	{
		return "message from service!"
	}

	getTasks() : Task[]
	{
		let tasks : Task[] = new Array(0);
		for(let i = 0 ; i < 10 ; i++)
			tasks.push( this.getTask() );
		return tasks;
	}

}
	