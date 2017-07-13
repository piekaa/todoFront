import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
import { TasksService } from '../services/tasks_service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'tasks',
  templateUrl: './new_task.html',
  styleUrls: ["./new_task.css"],
  providers: [TasksService]
})
export class NewTaskComponent 
{

	id : number;
	sub :any;
	constructor(private tasksService: TasksService, private route : ActivatedRoute, private router: Router) {
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

									}
								);

	}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	onSubmit( {value, valid} : { value: Task, valid: boolean})
	{
		
		console.log("before add");
		this.tasksService.addTask(value.name, value.description, this.id )
							.subscribe(data => {
								          this.backToList();
								      }, error => {
								          console.log(error.json());
								      });
		console.log("after add"); 
	}

	backToList()
	{
		this.router.navigate(['/todo/', this.id]);
	}
 

}

// export interface Task
// {
// 	name : string,
// 	description : string
// }