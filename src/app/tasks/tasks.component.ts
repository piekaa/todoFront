import { Component } from '@angular/core';
import { TasksService } from '../services/tasks_service'
import { Task } from '../model/task';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'tasks',
	templateUrl: './tasks.html',
	styleUrls: ['./tasks.css'],
	providers: [TasksService]
})
export class TasksComponent {
	tasks: Task[];
	errorMessage : string;

	id : number;
	sub :any;

	constructor(private tasksService: TasksService, private route : ActivatedRoute) {
		this.id = 0 ;

	}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe
								(
									params => {
										if( params['id'])
											this.id = params['id'];
										this.getTasks();									
									}
								);

	}

	getTasks() : void
	{
		this.tasksService.getTasks(this.id)
						 .subscribe(
							tasks => this.tasks = tasks,
							error => this.errorMessage = <any>error);
	}
}
