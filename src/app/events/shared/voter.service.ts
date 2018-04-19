import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { ISession } from './event.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class VoterService {
    private server : string = "http://localhost:3000";
    constructor(private http: Http){

    }
    deleteVoter(eventId: number, session: ISession, voterName: string){
        session.voters = session.voters.filter(voter=> voter !== voterName);
        let url = this.server + `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.delete(url).subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string){
        let headers = new Headers({
            'Content-Type':'application/json'
          });
          let options = new RequestOptions({ headers: headers});
          let url = this.server +`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
          this.http.post(url, {}, options).catch(this.handleError).subscribe();

        session.voters.push(voterName);
    }
    
    userHasVoted(session: ISession, voterName: string){
        return session.voters.some(voter => voter === voterName);
    }

    private handleError(error: Response){
        console.log('ERROR HBAPPPENED!')
        return Observable.throw(error.statusText);
    }

}