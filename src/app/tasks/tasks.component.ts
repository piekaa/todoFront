import { Component } from '@angular/core';
import { TasksService } from '../services/tasks_service'
import { Task } from '../model/task';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'tasks',
	templateUrl: './tasks.html',
	styleUrls: ['./tasks.css'],
	providers: [TasksService]
})
export class TasksComponent {
	tasks: Task[];
	errorMessage : string; 
	currentTask : Task;

	id : number;
	sub :any;

	constructor(private tasksService: TasksService, private route : ActivatedRoute, private router : Router) {
		this.id = 0 ; 
	}

	ngOnInit(): void {


		this.currentTask = new Task();
		this.currentTask.id = 0;

		this.sub = this.route.params.subscribe
								(
									params => {
										if( params['id'])
											this.id = params['id']; 
										this.getTasks();	
										this.getCurrentTask();		

									}
								);

	}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



	taskDone(id : number)
	{
		this.tasksService.setDone(id)
							.subscribe(data => { 
								         this.getTasks();
								      }, error => { 
								          console.log(error.json());
								      }); 
	}

	taskUndone(id : number)
	{
		this.tasksService.setUndone(id) 
							.subscribe(data => {
								        this.getTasks();
								      }, error => {
								          console.log(error.json());
								      }); 
	}


	getTasks() : void
	{
		this.tasksService.getTasks(this.id)
						 .subscribe(
							tasks => this.tasks = tasks,
							error => this.errorMessage = <any>error);
	}

	getCurrentTask() : void
	{
		this.tasksService.getTask(this.id)
						 .subscribe(
							task => this.currentTask = task,
							error => this.errorMessage = <any>error);
	}


	subtask(id : number) : void
	{
		this.router.navigate( ["/todo/", id] );
	}

	parentTask() : void
	{
		console.log( this.currentTask );
		console.log("go to parent task");
		this.router.navigate( ["/todo/", this.currentTask.parent_task] );
	}


}
