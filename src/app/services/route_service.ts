import {Injectable} from '@angular/core';
@Injectable()
export class RouteService{
    
    getUrl(path : string, url : string) : string
    { 
        let host = url.split(",")[0]; 
        return host + "/" + path;
    }

}
