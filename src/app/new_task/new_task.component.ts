import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import { TasksService } from '../services/tasks_service'
import { RouteService } from '../services/route_service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tasks',
  templateUrl: './new_task.html',
  styleUrls: ["./new_task.css"],
  providers: [TasksService, RouteService]
})
export class NewTaskComponent 
{

	id : number;
	
	sub :any;
	sub2 :any;
	url : string;

	constructor(
		private tasksService: TasksService, 
		private route : ActivatedRoute, 
		private router: Router, 
		private routerService : RouteService) {
		this.id = 0 ;

	}
	task: FormGroup;
	ngOnInit()
	{
		this.task = new FormGroup(
		{
			name: new FormControl(''),
			description: new FormControl('')
		});
 
		this.sub = this.route.params.subscribe
								(
									params => {
										if( params['id'])
											this.id = params['id']; 

										this.sub2 = this.route.url.subscribe
										(
											url => {
												this.url = url.toString();	 
											}
										);
									}
								);

	}

  ngOnDestroy() { 
	this.sub.unsubscribe();
	this.sub2.unsubscribe();
  }

	onSubmit( {value, valid} : { value: Task, valid: boolean})
	{ 
		this.tasksService.addTask(value.name, value.description, this.id, this.url )
							.subscribe(data => {
								          this.backToList();
								      }, error => {
								          console.log(error.json());
								      }); 
	}

	backToList()
	{
		this.router.navigate( [this.routerService.getUrl("todo", this.url), this.id] );
	}
 

}