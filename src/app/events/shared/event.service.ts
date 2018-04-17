import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { IEvent, ISession } from '.';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventService {
  private server : string = "http://localhost:3000";
  headers :Headers;
  options :RequestOptions;

  constructor(private http: Http){
    this.headers = new Headers({'Content-Type':'application/json'});
    this.options = new RequestOptions({headers:this.headers, withCredentials: true});
  }
  
  getEvents():Observable<IEvent[]> {
    return this.http.get(this.server + "/api/events", this.options).map((response:Response)=>{
      return <IEvent[]>response.json();
    }).catch(this.handleError);
  }

  getEvent(id:number):Observable<IEvent>{
    return this.http.get(this.server + "/api/events/" + id, this.options)
      .map((response: Response) =>{
        return <IEvent>response.json();
    })
  }

  saveEvent(event: IEvent) : Observable<IEvent>{
    return this.http.post(this.server + "/api/events", JSON.stringify(event), this.options)
      .map((response: Response)=>{
        return response.json();
      })
      .catch(this.handleError);
  }

  searchSessions(searchTerm: string) {
    return this.http.get(this.server + "/api/sessions/search?search=" + searchTerm, this.options)
      .map((response: Response) =>{
        return response.json();
    });
  }

  private handleError(error: Response){
      console.log('Error!');
      return Observable.throw(error.statusText);
  }
}