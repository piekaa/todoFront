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



	getEndpoint(url: string)
	{
		if( url.split(",")[0] == "n" )
			return AppConst.endpoint;
		return AppConst.endpointNotKoba;
	}


	getTask(id : Number, url: string) : Observable<Task>
	{
		return this.http.get(this.getEndpoint(url) + 'task/'+id)
					.map(this.extractData)
					.catch(this.handleError);
  }

	getTasks(id : Number, url: string) : Observable<Task[]>
	{ 
		;
		return this.http.get(this.getEndpoint(url) + 'subtasks/'+id)
					.map(this.extractData)
					.catch(this.handleError);
  }

	setDone(id : Number, url: string) : Observable<any>
	{
		return this.http.put(this.getEndpoint(url) + 'task/done/'+id, {} );
	}

	setUndone(id : Number, url: string) : Observable<any>
	{
		return this.http.put(this.getEndpoint(url) + 'task/undone/'+id, {} );
	}



	addTask(name : string, description : string, parentId : number, url: string) : Observable<any>
	{

		let timestamp = new Date().getTime();

		let task : Task = new Task();
		task.description = description;
		task.name = name;
		task.parent_task = parentId;
		task.id = timestamp;
 
		return this.http.post(this.getEndpoint(url) + 'task', task );
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
