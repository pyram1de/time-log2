import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'
import { Http, RequestOptions, Response, Headers } from '@angular/http'

@Injectable()
export class AuthService {
    currentUser:IUser;
    private server: string = "http://localhost:3000";
    constructor(private http:Http) {

    }

    loginUser(userName: string, password: string){
        console.log('in login user');
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Papa'
        }
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        return this.http.post(this.server + "/api/loginfromsite", JSON.stringify(this.currentUser), options).map(
        (response: Response)=>{
            console.log('returned value', response);
            
            return response.json();
        }
        ).catch(this.handleError).subscribe();
    }

    isAuthenticated() {
        if(this.currentUser===null){
            this.http.get(this.server + '/api/currentUser').map((response: Response) => {
                console.log('got response');
                console.log(response);
            }).subscribe();
        } else {
            console.log(this.currentUser);
        }
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }

    private handleError(error: Response){
        console.log('Error!');
        return Observable.throw(error.statusText);
    }
}