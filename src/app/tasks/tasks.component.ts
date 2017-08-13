import { Component } from '@angular/core';
import { TasksService } from '../services/tasks_service'
import { RouteService } from '../services/route_service'
import { Task } from '../model/task';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'tasks',
	templateUrl: './tasks.html',
	styleUrls: ['./tasks.css'],
	providers: [TasksService, RouteService]
})
export class TasksComponent {
	tasks: Task[];
	errorMessage : string; 
	currentTask : Task;

	id : number
	sub :any
	sub2 :any
	url : string
	subCount : number
	constructor(private tasksService: TasksService, private route : ActivatedRoute, private router : Router, private routerService : RouteService) {
		this.id = 0 ; 
	}

	ngOnInit(): void {
		
		this.subCount = 0
		this.currentTask = new Task();
		this.currentTask.id = 0; 
		this.sub = this.route.params.subscribe
											(
												params => {
													if( params['id'])
														this.id = params['id'];  
														this.loadAll()
												}
											);

		this.sub2 = this.route.url.subscribe
											(
												url => { 
													this.url = url.toString()
													this.loadAll()
												}
											);
	}


  loadAll(){ 
		this.subCount++

		if( this.subCount == 2)
		{
			this.getTasks();	
			this.getCurrentTask();
			this.subCount = 0
		}	
  }

  ngOnDestroy() {  
	this.sub2.unsubscribe();
	this.sub.unsubscribe();
	
  }


  getTaskClass(done : boolean)
  {
	if( done )
		return "taskDone"
	return ""  
}



	taskDone(event : Event, id : number)
	{
		event.stopPropagation();
		this.tasksService.setDone(id, this.url)
							.subscribe(data => { 
								         this.getTasks();
								      }, error => { 
								          console.log(error.json());
								      }); 
	}

	taskUndone(event : Event, id : number)
	{
		event.stopPropagation();
		this.tasksService.setUndone(id, this.url) 
							.subscribe(data => {
								        this.getTasks();
								      }, error => {
								          console.log(error.json());
								      }); 
	}


	getTasks() : void
	{
		this.tasksService.getTasks(this.id, this.url)
						 .subscribe(
							tasks => this.tasks = tasks,
							error => this.errorMessage = <any>error);
	}

	getCurrentTask() : void
	{
		this.tasksService.getTask(this.id, this.url)
						 .subscribe(
							task => this.currentTask = task,
							error => this.errorMessage = <any>error);
	}


	subtask(id : number) : void
	{
		this.router.navigate( [this.routerService.getUrl("todo", this.url), id] );
	}

	parentTask() : void
	{ 
		this.router.navigate( [this.routerService.getUrl("todo", this.url), this.currentTask.parent_task] );
	}

	toNewTask(id : number)
	{
		this.router.navigate( [this.routerService.getUrl("todo/new", this.url), id] );
	}


}
