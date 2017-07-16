import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Task} from '../model/task';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as AppConst from '../app.const';
@Injectable()
export class TasksService{


	constructor(private http: Http)
	{

	}

	getTask(id : Number) : Observable<Task>
	{
		return this.http.get(AppConst.endpoint + 'task/'+id)
					.map(this.extractData)
					.catch(this.handleError);
  }

	getTasks(id : Number) : Observable<Task[]>
	{
		return this.http.get(AppConst.endpoint + 'subtasks/'+id)
					.map(this.extractData)
					.catch(this.handleError);
  }

	setDone(id : Number) : Observable<any>
	{
		return this.http.put(AppConst.endpoint + 'task/done/'+id, {} );
	}

	setUndone(id : Number ) : Observable<any>
	{
		return this.http.put(AppConst.endpoint + 'task/undone/'+id, {} );
	}



	addTask(name : string, description : string, parentId : number) : Observable<any>
	{

		let timestamp = new Date().getTime();

		let task : Task = new Task();
		task.description = description;
		task.name = name;
		task.parent_task = parentId;
		task.id = timestamp;

		
		console.log("add task method:");
		console.log( task );
		
		console.log( AppConst.endpoint + 'task' );

		return this.http.post(AppConst.endpoint + 'task', task );
  }


	private extractData(res: Response) {
    return res.json() || { } ;
  }
 
  private handleError (error: Response | any) {

		console.log( "error" ) ;

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
