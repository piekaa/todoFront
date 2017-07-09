import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Task} from '../model/task';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as AppConst from '../app.const';
@Injectable()
export class TasksService{
	getTask() : Task
	{
		let task  : Task = new Task();
		task.name = "Siemke";
		task.description = "To jest jakis tam testowy task";
		task.id = new Date().getTime();
		task.done = true;
		return task;
	}

	constructor(private http: Http)
	{

	}

	test(): string
	{
		return "message from service!"
	}


	getTasks(id : Number) : Observable<Task[]>
	{
		return this.http.get(AppConst.endpoint + 'subtasks/'+id)
					.map(this.extractData)
					.catch(this.handleError);
    }

	private extractData(res: Response) {
	
    return res.json() || { } ;
  }
 
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
