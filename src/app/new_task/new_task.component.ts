import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from '../model/task';
@Component({
  selector: 'tasks',
  templateUrl: './new_task.html',
  styleUrls: ["./new_task.css"] 
})
export class NewTaskComponent 
{
	constructor(){}

	task: FormGroup;
	ngOnInit()
	{
		this.task = new FormGroup(
		{
			name: new FormControl(''),
			description: new FormControl('')
		});
	}

	onSubmit( {value, valid} : { value: Task, valid: boolean})
	{
		console.log("On submit");
		console.log(value.name);
	}


}

// export interface Task
// {
// 	name : string,
// 	description : string
// }