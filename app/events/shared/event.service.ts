import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { IEvent, ISession } from '.';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EventService {
  private server : string = "http://localhost:3000";

  constructor(private http: Http){

  }
    getEvents():Observable<IEvent[]> {
      return this.http.get(this.server + "/api/events").map((response:Response)=>{
        return <IEvent[]>response.json();
      }).catch(this.handleError);
    }

    getEvent(id:number):Observable<IEvent>{
      return this.http.get(this.server + "/api/events/" + id).map((response: Response) =>{
        return <IEvent>response.json();
      })
    }

    saveEvent(event: IEvent) : Observable<IEvent>{
      let headers = new Headers({
        'Content-Type':'application/json'
      });
      let options = new RequestOptions({ headers: headers});
      return this.http.post(this.server + "/api/events", JSON.stringify(event), options).map(
        (response: Response)=>{
          return response.json();
        }
      ).catch(this.handleError);
    }

    searchSessions(searchTerm: string) {
      return this.http.get(this.server + "/api/sessions/search?search=" + searchTerm).map((response: Response) =>{
        return response.json();
      });
    }

    private handleError(error: Response){
        console.log('Error!');
        return Observable.throw(error.statusText);
    }
}