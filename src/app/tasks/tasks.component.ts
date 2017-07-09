import { Component } from '@angular/core';
import { TasksService } from '../services/tasks_service'
import { Task } from '../model/task';
@Component({
	selector: 'tasks',
	templateUrl: './tasks.html',
	styleUrls: ['./tasks.css'],
	providers: [TasksService]
})
export class TasksComponent {
	value: string = "";
	tasks: Task[];
	errorMessage : string;

	constructor(private tasksService: TasksService) {

	}

	ngOnInit(): void {
		this.value = this.tasksService.test();

		this.tasksService.getTasks(0)
						 .subscribe(
							tasks => this.tasks = tasks,
							error => this.errorMessage = <any>error);
						 
	}
}
